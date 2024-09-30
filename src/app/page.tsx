'use client';

import { data } from './data.';
import { useId, useState } from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { Day } from '@/components/day/component';
import {
    addDays,
    differenceInDays,
    formatISO,
    isSameDay,
    isValid,
} from 'date-fns';
import { IProject } from '@/interfaces/IProject';

export default function Home() {
    const [dateFrom, setDateFrom] = useState(new Date('2024-04-01'));
    const [dateTo, setDateTo] = useState(new Date('2024-04-02'));

    const [timeline, setTimeline] = useState(
        mapDataToTimeline(data, dateFrom, dateTo)
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        // if (active.id !== over?.id) {
        //     setTimeline((projects) => {
        //         const oldIndex = projects.findIndex(
        //             (project) => project.id === active.id
        //         );
        //         const newIndex = projects.findIndex(
        //             (project) => project.id === over?.id
        //         );

        //         return arrayMove(projects, oldIndex, newIndex);
        //     });
        // }
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

    const id = useId();

    return (
        <DndContext
            onDragEnd={handleDragEnd}
            collisionDetection={closestCenter}
            id={id}
        >
            {getDaysContent()}
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
