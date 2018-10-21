import { Controller, Get } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { Job } from './jobs.entity';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  async allJobs(): Promise<Job[]> {
    return await this.jobsService.findAll();
  }
}
