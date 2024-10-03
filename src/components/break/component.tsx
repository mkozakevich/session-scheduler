import styles from './styles.module.scss';
import { format } from 'date-fns';
import { IBreak } from '@/interfaces/IBreak';

export const Break = ({ item }: { item: IBreak }) => {
    const { startDateTime, endDateTime } = item;

    const timeFormatStr = 'HH:mm';
    const startTime = format(startDateTime, timeFormatStr);
    const endTime = format(endDateTime, timeFormatStr);

    return (
        <div className={styles.wrapper}>
            <div>
                {startTime} – {endTime}
            </div>
            <div className={styles.name}>Перерыв</div>
        </div>
    );
};
