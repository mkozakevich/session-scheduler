'use client';

import { Project } from '@/components/project/component';
import { data } from './data.';
import { useState } from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import {
    SortableContext,
    arrayMove,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

export default function Home() {
    const [projects, setProjects] = useState(data);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setProjects((projects) => {
                const oldIndex = projects.findIndex(
                    (project) => project.id === active.id
                );
                const newIndex = projects.findIndex(
                    (project) => project.id === over?.id
                );

                return arrayMove(projects, oldIndex, newIndex);
            });
        }
    };

    return (
        <DndContext
            onDragEnd={handleDragEnd}
            collisionDetection={closestCenter}
        >
            <SortableContext
                items={projects}
                strategy={verticalListSortingStrategy}
            >
                {projects.map((project) => (
                    <Project key={project.id} project={project} />
                ))}
            </SortableContext>
        </DndContext>
    );
}
