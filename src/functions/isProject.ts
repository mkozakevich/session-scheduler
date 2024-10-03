import { IBreak } from '@/interfaces/IBreak';
import { IProject } from '@/interfaces/IProject';

export const isProject = (item: IProject | IBreak): item is IProject => {
    return typeof item.id === 'number';
};
