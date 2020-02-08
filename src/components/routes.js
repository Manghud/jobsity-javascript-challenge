import { createLodable } from './router.utils';

export const Reminders = createLodable(() => import('./reminders'));