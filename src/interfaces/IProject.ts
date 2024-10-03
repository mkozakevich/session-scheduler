export interface IProjectBm {
    id: number;
    name: string;
    numberOfParticipants: number;
    startDateTime: string;
}

export interface IProject extends Omit<IProjectBm, 'startDateTime'> {
    startDateTime: Date;
    endDateTime: Date;
}
