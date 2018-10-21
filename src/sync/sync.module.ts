import { Module } from '@nestjs/common';
import { Job, Company } from 'jobs/jobs.entity';
import { Log } from './logs.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SyncService } from './sync.service';
import { SyncController } from './sync.controller';
import { JobsService } from 'jobs/jobs.service';

@Module({
  imports: [TypeOrmModule.forFeature([Job, Log, Company])],
  controllers: [SyncController],
  providers: [SyncService, JobsService],
})
export class SyncModule {}
