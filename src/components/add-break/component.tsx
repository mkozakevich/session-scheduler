'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { BreakModal } from './break-modal/component';
import PlusIcon from '@/assets/plus.svg';
import styles from './styles.module.scss';

export const AddBreak = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className={styles.button}
            >
                <PlusIcon />
                Добавить перерыв
            </button>
            {showModal &&
                createPortal(
                    <BreakModal close={() => setShowModal(false)} />,
                    document.body
                )}
        </>
    );
};
