import { IBreak } from '@/interfaces/IBreak';
import { IProject } from '@/interfaces/IProject';

export type TTimeline = Record<string, Array<IProject | IBreak>>;
