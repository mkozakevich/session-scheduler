import styles from './styles.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export const ScheduleModal = ({ close }: { close: Function }) => {
    return (
        <div className={styles.modal}>
            <div className={styles.header}>
                <button onClick={() => close()}>close</button>
            </div>
            <div className={styles.content}></div>
            <div className={styles.footer}>
                <button
                    className={cx(styles.button, styles.discardButton)}
                    onClick={() => close()}
                >
                    Отменить
                </button>
                <button className={cx(styles.button, styles.saveButton)}>
                    Сохранить
                </button>
            </div>
        </div>
    );
};
