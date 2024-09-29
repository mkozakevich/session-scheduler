import { IProject } from '@/interfaces/IProject';
import styles from './styles.module.scss';
import declineWord from 'decline-word';

export const Project = ({ project }: { project: IProject }) => {
    const { id, name, numberOfParticipants } = project;

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div>
                    <div className={styles.timing}>10:00 – 10:25</div>
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
