import { IProject } from '@/interfaces/IProject';
import { addDays, differenceInDays, formatISO, isSameDay } from 'date-fns';

export const mapDataToTimeline = (
    data: IProject[],
    dateFrom: Date,
    dateTo: Date
): Record<string, IProject[]> => {
    const timeline: Record<string, IProject[]> = {};
    const diffDays = differenceInDays(dateTo, dateFrom) + 1;
    let currentDate = dateFrom;
    let projects = [...data];

    for (let i = 1; i <= diffDays; i++) {
        const currentDayProjects = projects.filter((project) =>
            isSameDay(new Date(project.startDateTime), currentDate)
        );

        const otherProjects = projects.filter(
            (project) =>
                !isSameDay(new Date(project.startDateTime), currentDate)
        );

        timeline[formatISO(currentDate, { representation: 'date' })] =
            currentDayProjects;

        currentDate = addDays(currentDate, 1);

        projects = otherProjects;
    }

    timeline.reserve = projects;

    return timeline;
};
