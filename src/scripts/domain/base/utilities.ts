import { BreakPoint } from 'qoobee';

export const sortById = (p1, p2) => p2.id! - p1.id!;

export const isSmallDevice = (breakPoint: BreakPoint) => breakPoint === 'sm';