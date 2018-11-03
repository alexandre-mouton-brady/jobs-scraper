import { Controller, Get, Req } from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as puppeteer from 'puppeteer';
import scrapers from './scrapers';
import { SyncService } from './sync.service';
import { JobsService } from '../jobs/jobs.service';

@Controller('sync')
export class SyncController {
  constructor(
    private readonly syncService: SyncService,
    private readonly jobService: JobsService,
  ) {}

  @Get()
  async scrap(@Req() req) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const yesterday = dayjs().subtract(1, 'day');
    const latest = await this.syncService.lastUpdate();
    const lastUpdate = latest ? dayjs(latest.createdAt) : null;

    if (lastUpdate && lastUpdate.isAfter(yesterday)) {
      return {
        success: false,
        error: {
          data: {
            lastUpdate,
            timeLeft: lastUpdate ? lastUpdate.diff(yesterday, 'hour') : null,
          },
          message: 'The database can only be updated once every day',
        },
      };
    }

    this.syncService.jobFetchStart();

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    for (const company of Object.keys(scrapers)) {
      await scrapers[company](page, this.syncService);
    }

    await browser.close();

    await this.syncService.newLog({ ip });

    return {
      success: true,
    };
  }
}
