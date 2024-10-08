import { DateArg, addMinutes } from 'date-fns';

/**
 * Вычисляет дату окончания проекта
 * @param startDate - Дата начала проекта
 * @param numberOfParticipants - Число участников
 * @returns 
 */
export const calculateEndDate = (
    startDate: DateArg<Date>,
    numberOfParticipants: number
): Date => addMinutes(startDate, 20 + 5 * numberOfParticipants);
