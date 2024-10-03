import styles from './styles.module.scss';
import classNames from 'classnames/bind';
import AtomIcon from '@/assets/atom.svg';
import CrossIcon from '@/assets/cross.svg';

const cx = classNames.bind(styles);

export const ScheduleModal = ({ close }: { close: Function }) => {
    return (
        <div className={styles.modal}>
            <div className={styles.header}>
                <div className={styles.leftContent}>
                    <h2 className={styles.title}>
                        Редактирование графика работы
                    </h2>
                    <div className={styles.subtitle}>
                        <AtomIcon />
                        <div className={styles.comission}>
                            <div className={styles.comissionNumber}>Комиссия №1</div>
                            <div className={styles.comissionName}>НИР</div>
                        </div>
                    </div>
                </div>

                <div className={styles.rightContent}>
                    <CrossIcon
                        className={styles.crossIcon}
                        onClick={() => close()}
                    />
                </div>
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
