import { IProject } from '@/interfaces/IProject';
import { IBreak } from '@/interfaces/IBreak';
import { addDays, compareAsc, differenceInDays, formatISO } from 'date-fns';
import { calculateEndDate } from './calculateEndDate';
import { TTimeline } from '@/types/TTimeline';
import { isProject } from './isProject';

export const rebuildTimeline = (
    timeline: TTimeline,
    dateFrom: Date,
    dateTo: Date
): TTimeline => {
    const newTimeline: TTimeline = {};
    const reserve = [];
    const diffDays = differenceInDays(dateTo, dateFrom) + 1;
    let currentDayDateFrom = dateFrom;
    let currentDayDateTo = addDays(dateTo, 1 - diffDays);

    for (let i = 1; i <= diffDays; i++) {
        const key = formatISO(currentDayDateFrom, { representation: 'date' });
        const currentDayProjects = timeline[key];
        const newCurrentDayProjects: IProject | IBreak[] = [];
        const breakItem: IBreak | undefined = currentDayProjects.find(
            (i) => typeof i.id === 'string'
        ) as IBreak | undefined;
        let breakItemPushed = false;

        for (let i = 0; i < currentDayProjects.length; i++) {
            const item = currentDayProjects[i];

            if (isProject(item)) {
                const project = item;
                const newProject = { ...project };

                if (i === 0) {
                    newProject.startDateTime = currentDayDateFrom;
                } else {
                    const prevProject = newCurrentDayProjects[i - 1];
                    newProject.startDateTime = prevProject.endDateTime;
                }

                newProject.endDateTime = calculateEndDate(
                    newProject.startDateTime,
                    newProject.numberOfParticipants
                );

                if (
                    breakItem &&
                    !breakItemPushed &&
                    compareAsc(
                        newProject.endDateTime,
                        breakItem.startDateTime
                    ) === 1
                ) {
                    breakItemPushed = true;
                    newCurrentDayProjects.push(breakItem);
                    newProject.startDateTime = breakItem.endDateTime;
                    newProject.endDateTime = calculateEndDate(
                        newProject.startDateTime,
                        newProject.numberOfParticipants
                    );
                }

                if (
                    compareAsc(newProject.endDateTime, currentDayDateTo) === 1
                ) {
                    reserve.push(...currentDayProjects.slice(i));
                    break;
                } else {
                    newCurrentDayProjects.push(newProject);
                }
            }
        }

        newTimeline[key] = newCurrentDayProjects;

        currentDayDateFrom = addDays(currentDayDateFrom, 1);
        currentDayDateTo = addDays(currentDayDateTo, 1);
    }

    for (const [key, value] of Object.entries(timeline)) {
        if (!Object.keys(newTimeline).includes(key)) {
            reserve.push(...value);
        }
    }

    return {
        ...newTimeline,
        reserve,
    };
};
