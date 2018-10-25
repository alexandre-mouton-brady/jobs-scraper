import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

export abstract class Base {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt;

  @UpdateDateColumn()
  updatedAt;
}

@Entity()
export class Company extends Base {
  @Column({ unique: true })
  slug: string;

  @Column()
  name: string;

  @Column()
  logo: string;

  @Column()
  url: string;

  @OneToMany(type => Job, job => job.company)
  jobs: Job[];
}

@Entity()
export class Job extends Base {
  @Column()
  title: string;

  @Column()
  location: string;

  @Column()
  link: string;

  @Column()
  description: number;

  @ManyToOne(type => Company, company => company.jobs)
  company: Company;
}
