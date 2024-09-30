import { IProject } from '@/interfaces/IProject';
import {
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Project } from '../project/component';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale/ru';
import { useDroppable } from '@dnd-kit/core';

export const Day = ({
    id,
    projects,
    date,
}: {
    id: string;
    projects: IProject[];
    date?: Date;
}) => {
    const { setNodeRef } = useDroppable({
        id,
    });

    return (
        <>
            <div>
                {date
                    ? format(date, 'd MMMM', { locale: ru })
                    : 'Резервный список'}
            </div>
            <SortableContext
                items={projects}
                strategy={verticalListSortingStrategy}
            >
                <div ref={setNodeRef}>
                    {projects.map((project) => (
                        <Project key={project.id} project={project} />
                    ))}
                </div>
            </SortableContext>
        </>
    );
};
