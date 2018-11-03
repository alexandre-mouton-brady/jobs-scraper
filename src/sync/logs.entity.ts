import { Base } from '../jobs/jobs.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Log extends Base {
  @Column()
  ip: string;

  @Column({ nullable: true })
  country: string;
}
