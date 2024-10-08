import { IProject } from '@/interfaces/IProject';
import { TTimeline } from '@/types/TTimeline';
import { addDays, differenceInDays, formatISO, isSameDay } from 'date-fns';

export const mapDataToTimeline = (
    data: IProject[],
    dateFrom: Date,
    dateTo: Date
): TTimeline => {
    const timeline: TTimeline = {};
    const diffDays = differenceInDays(dateTo, dateFrom) + 1;
    let currentDate = dateFrom;
    let projects = [...data];

    for (let i = 1; i <= diffDays; i++) {
        const currentDayProjects = projects.filter((project) =>
            isSameDay(project.startDateTime, currentDate)
        );

        const otherProjects = projects.filter(
            (project) => !isSameDay(project.startDateTime, currentDate)
        );

        timeline[formatISO(currentDate, { representation: 'date' })] =
            currentDayProjects;

        currentDate = addDays(currentDate, 1);

        projects = otherProjects;
    }

    timeline.reserve = projects;

    return timeline;
};
