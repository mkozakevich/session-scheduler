'use client';

import { EditSchedule } from '@/components/edit-schedule/component';
import Timeline from '@/components/timeline/component';
import styles from './page.module.scss';
import { createContext, useState } from 'react';
import { mapDataToTimeline } from '@/functions/mapDataToTimeline';
import { data } from '@/consts/data.';
import { IProject } from '@/interfaces/IProject';
import { TTimeline } from '@/types/TTimeline';

export const TimelineContext = createContext<{
    timeline: TTimeline;
    dateFrom: Date;
    dateTo: Date;
    setTimeline: (timeline: TTimeline) => void;
    setDateFrom: (date: Date) => void;
    setDateTo: (date: Date) => void;
}>({
    timeline: { reserve: [] },
    dateFrom: new Date(),
    dateTo: new Date(),
    setTimeline: (timeline: TTimeline) => {},
    setDateFrom: (date: Date) => {},
    setDateTo: (date: Date) => {},
});

export default function Home() {
    const [dateFrom, setDateFrom] = useState(new Date('2024-04-01T10:00:00'));
    const [dateTo, setDateTo] = useState(new Date('2024-04-02T19:00:00'));
    const [timeline, setTimeline] = useState(
        mapDataToTimeline(data, dateFrom, dateTo)
    );

    return (
        <TimelineContext.Provider
            value={{
                timeline,
                dateFrom,
                dateTo,
                setTimeline,
                setDateFrom,
                setDateTo,
            }}
        >
            <div className={styles.buttons}>
                <EditSchedule />
            </div>
            <Timeline />
        </TimelineContext.Provider>
    );
}
