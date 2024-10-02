import { calculateEndDate } from '@/functions/calculateEndDate';
import { IProject, IProjectBm } from '../interfaces/IProject';

const dataBm: IProjectBm[] = [
    {
        id: 858,
        name: 'DataFlow вычислительная система: Телекоммуникационная система суперкомпьютера',
        numberOfParticipants: 1,
        startDateTime: '2024-04-01T10:00:00',
    },
    {
        id: 736,
        name: 'SmartLMS 2.0',
        numberOfParticipants: 4,
        startDateTime: '2024-04-01T10:25:00',
    },
    {
        id: 313,
        name: 'ToDo List',
        numberOfParticipants: 5,
        startDateTime: '2024-04-01T11:05:00',
    },
    {
        id: 999,
        name: 'Hello World',
        numberOfParticipants: 6,
        startDateTime: '2024-04-01T11:50:00',
    },
    {
        id: 111,
        name: 'lorem ipsum',
        numberOfParticipants: 7,
        startDateTime: '2024-04-01T12:40:00',
    },
];

export const data: IProject[] = dataBm.map((item) => {
    const startDateTime = new Date(item.startDateTime);

    return {
        ...item,
        startDateTime,
        endDateTime: calculateEndDate(startDateTime, item.numberOfParticipants),
    };
});
