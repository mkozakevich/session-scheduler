'use client';

import styles from './styles.module.scss';
import classNames from 'classnames/bind';
import CrossIcon from '@/assets/cross.svg';
import { DatePicker, Select } from 'antd';
import { TimelineContext } from '@/app/page';
import { useContext, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LabeledValue } from 'antd/es/select';

const cx = classNames.bind(styles);

const selectOptions: LabeledValue[] = [
    {
        value: 5,
        label: '5 минут',
    },
    {
        value: 10,
        label: '10 минут',
    },
    {
        value: 15,
        label: '15 минут',
    },
];

export const BreakModal = ({ close }: { close: Function }) => {
    const { timeline, dateFrom, dateTo, setTimeline, setDateFrom, setDateTo } =
        useContext(TimelineContext);

    const [dateModel, setDateModel] = useState(dayjs(dateFrom));
    const [duration, setDuration] = useState(selectOptions[0]);

    const submit = () => {};

    return (
        <div className={styles.modal}>
            <div className={styles.header}>
                <div className={styles.leftContent}>
                    <h2 className={styles.title}>Добавление перерыва</h2>
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
                    <div>Дата</div>
                    <DatePicker
                        value={dateModel}
                        onChange={(date: Dayjs) => setDateModel(date)}
                        showTime
                    />
                </div>
                <div className={styles.inputContainer}>
                    <div>Продолжительность перерыва</div>
                    <Select
                        value={duration}
                        options={selectOptions}
                        onChange={(value: LabeledValue) => setDuration(value)}
                    />
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
                    Добавить перерыв
                </button>
            </div>
        </div>
    );
};
