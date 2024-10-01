import { DateArg, addMinutes } from 'date-fns';

export const calculateEndDate = (
    startDate: DateArg<Date>,
    numberOfParticipants: number
): Date => addMinutes(startDate, 20 + 5 * numberOfParticipants);
