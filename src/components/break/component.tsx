import styles from './styles.module.scss';
import { format } from 'date-fns';
import { IBreak } from '@/interfaces/IBreak';

export const Break = ({ item }: { item: IBreak }) => {
    const { start, end } = item;

    const timeFormatStr = 'HH:mm';
    const startTime = format(start, timeFormatStr);
    const endTime = format(end, timeFormatStr);

    return (
        <div className={styles.wrapper}>
            <div>
                {startTime} – {endTime}
            </div>
            <div className={styles.name}>Перерыв</div>
        </div>
    );
};
