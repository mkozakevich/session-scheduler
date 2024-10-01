import { IProject } from '@/interfaces/IProject';
import {
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Project } from '../project/component';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale/ru';
import { useDroppable } from '@dnd-kit/core';
import styles from './styles.module.scss';

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
            <h2 className={styles.title}>
                {date
                    ? format(date, 'd MMMM', { locale: ru })
                    : 'Резервный список'}
            </h2>
            <SortableContext
                items={projects}
                strategy={verticalListSortingStrategy}
            >
                <div className={styles.projectsContainer} ref={setNodeRef}>
                    {projects.map((project) => (
                        <Project key={project.id} project={project} />
                    ))}
                </div>
            </SortableContext>
        </>
    );
};
