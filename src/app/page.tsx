'use client';

import { data } from './data.';
import { useId, useState } from 'react';
import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    closestCenter,
} from '@dnd-kit/core';
import { Day } from '@/components/day/component';
import {
    addDays,
    differenceInDays,
    formatISO,
    isSameDay,
    isValid,
} from 'date-fns';
import { IProject } from '@/interfaces/IProject';
import { Project } from '@/components/project/component';
import { arrayMove } from '@dnd-kit/sortable';

export default function Home() {
    const [dateFrom, setDateFrom] = useState(new Date('2024-04-01'));
    const [dateTo, setDateTo] = useState(new Date('2024-04-02'));
    const [timeline, setTimeline] = useState(
        mapDataToTimeline(data, dateFrom, dateTo)
    );
    const [activeId, setActiveId] = useState(null);
    const id = useId();

    function handleDragStart(event: any) {
        const { active } = event;

        setActiveId(active.id);
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        setActiveId(null);

        if (active.id === over?.id) {
            return;
        }

        let activeContainerKey: string | null = null;
        let overContainerKey: string | null = null;
        let activeIndex = 0;
        let overIndex = 0;

        for (const [key, value] of Object.entries(timeline)) {
            const activeResultOfIndexSearch = value.findIndex(
                (v) => v.id === active.id
            );
            const overResultOfIndexSearch = value.findIndex(
                (v) => v.id === over?.id
            );

            if (activeResultOfIndexSearch !== -1) {
                activeContainerKey = key;
                activeIndex = activeResultOfIndexSearch;
            }

            if (overResultOfIndexSearch !== -1) {
                overContainerKey = key;
                overIndex = overResultOfIndexSearch;
            }
        }

        if (activeContainerKey === overContainerKey) {
            setTimeline((timeline) => {
                if (!activeContainerKey) {
                    return timeline;
                }

                const updatedArray = arrayMove(
                    timeline[activeContainerKey],
                    activeIndex,
                    overIndex
                );

                return {
                    ...timeline,
                    [activeContainerKey]: updatedArray,
                };
            });
        } else {
            setTimeline((timeline) => {
                if (!activeContainerKey || !overContainerKey) {
                    return timeline;
                }

                const movedElement = timeline[activeContainerKey][activeIndex];
                const updatedActiveArray = timeline[activeContainerKey].filter(
                    (v) => v.id !== active.id
                );
                const updatedOverArray = [
                    ...timeline[overContainerKey],
                    movedElement,
                ];

                return {
                    ...timeline,
                    [activeContainerKey]: updatedActiveArray,
                    [overContainerKey]: updatedOverArray,
                };
            });
        }
    };

    const getDaysContent = () => {
        const content = [];

        for (const [key, value] of Object.entries(timeline)) {
            const date = new Date(key);

            content.push(
                <Day
                    key={key}
                    id={key}
                    projects={value}
                    date={isValid(date) ? date : undefined}
                ></Day>
            );
        }

        return content;
    };

    return (
        <DndContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            collisionDetection={closestCenter}
            id={id}
        >
            {getDaysContent()}
            <DragOverlay>
                {activeId ? (
                    <Project
                        project={
                            data.find((project) => project.id === activeId)!
                        }
                    />
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}

const mapDataToTimeline = (
    data: IProject[],
    dateFrom: Date,
    dateTo: Date
): Record<string, IProject[]> => {
    const timeline: Record<string, IProject[]> = {};
    const diffDays = differenceInDays(dateTo, dateFrom) + 1;
    let currentDate = dateFrom;
    let projects = [...data];

    for (let i = 1; i <= diffDays; i++) {
        const currentDayProjects = projects.filter((project) =>
            isSameDay(new Date(project.startDateTime), currentDate)
        );

        const otherProjects = projects.filter(
            (project) =>
                !isSameDay(new Date(project.startDateTime), currentDate)
        );

        currentDate = addDays(currentDate, 1);

        timeline[formatISO(currentDate, { representation: 'date' })] =
            currentDayProjects;

        projects = otherProjects;
    }

    timeline.reserve = projects;

    return timeline;
};
