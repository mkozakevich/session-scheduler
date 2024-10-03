'use client';

import styles from './styles.module.scss';
import classNames from 'classnames/bind';
import AtomIcon from '@/assets/atom.svg';
import CrossIcon from '@/assets/cross.svg';
import { DatePicker, TimePicker } from 'antd';
import { TimelineContext } from '@/app/page';
import { useContext, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { rebuildTimeline } from '@/functions/rebuildTimeline';

const { RangePicker } = DatePicker;
const cx = classNames.bind(styles);

export const ScheduleModal = ({ close }: { close: Function }) => {
    const { timeline, dateFrom, dateTo, setTimeline, setDateFrom, setDateTo } =
        useContext(TimelineContext);

    const [dateFromModel, setDateFromModel] = useState<Dayjs | null>(
        dayjs(dateFrom)
    );
    const [dateToModel, setDateToModel] = useState<Dayjs | null>(dayjs(dateTo));

    const submit = () => {
        if (dateFromModel && dateToModel) {
            const newDateFrom = dateFromModel.toDate();
            const newDateTo = dateToModel.toDate();
            setDateFrom(newDateFrom);
            setDateTo(newDateTo);
            setTimeline(rebuildTimeline(timeline, newDateFrom, newDateTo));
            close();
        }
    };

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
                            <div className={styles.comissionNumber}>
                                Комиссия №1
                            </div>
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

            <div className={styles.content}>
                <div className={styles.inputContainer}>
                    <div>Даты</div>
                    <RangePicker
                        value={[dateFromModel, dateToModel]}
                        onChange={(dates) => {
                            if (dates) {
                                const [from, to] = dates;
                                setDateFromModel(from);
                                setDateToModel(to);
                            }
                        }}
                    />
                </div>
                <div className={styles.timeContainer}>
                    <div className={styles.inputContainer}>
                        <div>C</div>
                        <TimePicker
                            value={dateFromModel}
                            onChange={(time: Dayjs) => setDateFromModel(time)}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <div>До</div>
                        <TimePicker
                            value={dateToModel}
                            onChange={(time: Dayjs) => setDateToModel(time)}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.footer}>
                <button
                    className={cx(styles.button, styles.discardButton)}
                    onClick={() => close()}
                >
                    Отменить
                </button>
                <button
                    className={cx(styles.button, styles.saveButton)}
                    onClick={() => submit()}
                >
                    Сохранить
                </button>
            </div>
        </div>
    );
};
