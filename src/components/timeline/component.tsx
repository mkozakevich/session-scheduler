'use client';

import { useContext, useId, useState } from 'react';
import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    closestCenter,
} from '@dnd-kit/core';
import { Day } from '@/components/day/component';
import { isValid } from 'date-fns';
import { Project } from '@/components/project/component';
import { arrayMove } from '@dnd-kit/sortable';
import { rebuildTimeline } from '@/functions/rebuildTimeline';
import { data } from '@/consts/data.';
import { TimelineContext } from '@/app/page';

export default function Timeline() {
    const { timeline, dateFrom, dateTo, setTimeline } =
        useContext(TimelineContext);
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

        let buildTimeline = () => timeline;

        if (typeof over?.id === 'string' && activeContainerKey !== over.id) {
            buildTimeline = () => {
                if (!activeContainerKey) {
                    return timeline;
                }

                const movedElement = timeline[activeContainerKey][activeIndex];
                const updatedActiveArray = timeline[activeContainerKey].filter(
                    (v) => v.id !== active.id
                );
                const updatedOverArray = [...timeline[over.id], movedElement];

                return rebuildTimeline(
                    {
                        ...timeline,
                        [activeContainerKey]: updatedActiveArray,
                        [over.id]: updatedOverArray,
                    },
                    dateFrom,
                    dateTo
                );
            };
        } else if (activeContainerKey === overContainerKey) {
            buildTimeline = () => {
                if (!activeContainerKey) {
                    return timeline;
                }

                const updatedArray = arrayMove(
                    timeline[activeContainerKey],
                    activeIndex,
                    overIndex
                );

                return rebuildTimeline(
                    {
                        ...timeline,
                        [activeContainerKey]: updatedArray,
                    },
                    dateFrom,
                    dateTo
                );
            };
        } else {
            buildTimeline = () => {
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

                return rebuildTimeline(
                    {
                        ...timeline,
                        [activeContainerKey]: updatedActiveArray,
                        [overContainerKey]: updatedOverArray,
                    },
                    dateFrom,
                    dateTo
                );
            };
        }

        setTimeline(buildTimeline());
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
                        noTime
                    />
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}
