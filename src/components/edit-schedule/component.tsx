'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ScheduleModal } from './schedule-modal/component';
import PencilIcon from '@/assets/pencil.svg';
import styles from './styles.module.scss';

export const EditSchedule = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className={styles.button}
            >
                <PencilIcon />
                Редактировать график
            </button>
            {showModal &&
                createPortal(
                    <ScheduleModal close={() => setShowModal(false)} />,
                    document.body
                )}
        </>
    );
};
