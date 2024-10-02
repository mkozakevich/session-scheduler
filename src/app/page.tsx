import { EditSchedule } from '@/components/edit-schedule/component';
import Timeline from '@/components/timeline/component';
import styles from './page.module.scss';

export default function Home() {
    return (
        <>
            <div className={styles.buttons}>
                <EditSchedule />
            </div>
            <Timeline />
        </>
    );
}
