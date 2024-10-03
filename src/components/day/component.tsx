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
import { IBreak } from '@/interfaces/IBreak';
import { isProject } from '@/functions/isProject';
import { Break } from '../break/component';

export const Day = ({
    id,
    items,
    date,
}: {
    id: string;
    items: Array<IProject | IBreak>;
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
                items={items}
                strategy={verticalListSortingStrategy}
            >
                <div className={styles.projectsContainer} ref={setNodeRef}>
                    {items.map((item) => {
                        if (isProject(item)) {
                            return (
                                <Project
                                    key={item.id}
                                    project={item}
                                    noTime={!date}
                                />
                            );
                        } else {
                            return <Break key={item.id} item={item}></Break>;
                        }
                    })}
                </div>
            </SortableContext>
        </>
    );
};
