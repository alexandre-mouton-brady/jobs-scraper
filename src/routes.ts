import { Routes } from 'nest-router';
import { JobsModule } from './jobs/jobs.module';
import { SyncModule } from './sync/sync.module';

export const routes: Routes = [
  {
    path: '/api',
    children: [JobsModule, SyncModule],
  },
];
