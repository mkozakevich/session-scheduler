import { IProject } from '@/interfaces/IProject';
import styles from './styles.module.scss';
import declineWord from 'decline-word';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DraggableIcon from '../../assets/draggable-icon.svg';
import { format } from 'date-fns';
import { calculateEndDate } from '@/functions/calculateEndDate';

export const Project = ({ project }: { project: IProject }) => {
    const { id, name, numberOfParticipants, startDateTime } = project;

    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const timeFormatStr = 'HH:mm';
    const endDate = calculateEndDate(startDateTime, numberOfParticipants);
    const startTime = format(startDateTime, timeFormatStr);
    const endTime = format(endDate, timeFormatStr);

    return (
        <div
            className={styles.wrapper}
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
            <div className={styles.draggable}>
                <DraggableIcon />
                <DraggableIcon />
            </div>
            <div className={styles.container}>
                <div>
                    <div className={styles.timing}>
                        {startTime} – {endTime}
                    </div>
                </div>
                <div>
                    <div className={styles.title}>
                        <span className={styles.id}>{id}</span> {name}
                    </div>
                    <div>
                        {numberOfParticipants}{' '}
                        {declineWord(
                            numberOfParticipants,
                            'участник',
                            '',
                            'а',
                            'ов'
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
