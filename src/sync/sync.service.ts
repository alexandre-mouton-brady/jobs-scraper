import { SyncGateway } from './sync.gateway';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job, Company } from '../jobs/jobs.entity';
import { Log } from './logs.entity';

@Injectable()
export class SyncService {
  constructor(
    @InjectRepository(Job) private readonly jobRepo: Repository<Job>,
    @InjectRepository(Log) private readonly logRepo: Repository<Log>,
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
    private readonly syncGateway: SyncGateway,
  ) {}

  async lastUpdate() {
    return await this.logRepo.findOne({ order: { createdAt: 'DESC' } });
  }

  async newLog({ ip }) {
    await this.logRepo.save({ ip });
  }

  async deleteJobs(conditions) {
    return await this.jobRepo.delete(conditions);
  }

  async createJob(job) {
    const insertedJob = await this.jobRepo.save(job);
    this.syncGateway.emit('job', insertedJob);
  }

  jobFetchStart() {
    this.syncGateway.emit('fetchStart');
  }

  async getCompany({ name, url, logo, slug }) {
    let company = await this.companyRepo.findOne({ slug });

    if (!company) {
      company = await this.companyRepo.create({ name, url, logo, slug });
      await this.companyRepo.save(company);
    }

    return company;
  }
}
