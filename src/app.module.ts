import { SyncGateway } from './sync/sync.gateway';
import { Module } from '@nestjs/common';
import { JobsModule } from './jobs/jobs.module';
import { SyncModule } from './sync/sync.module';
import { JobsService } from './jobs/jobs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SyncService } from 'sync/sync.service';
import { RouterModule } from 'nest-router';
import { routes } from 'routes';

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    JobsModule,
    SyncModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: `${__dirname}/../db/jobs.db`,
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      synchronize: true,
    }),
  ],
  providers: [JobsService, SyncService, SyncGateway],
})
export class AppModule {}
