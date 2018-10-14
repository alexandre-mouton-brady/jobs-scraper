import Sequelize from 'sequelize';
import { resolve } from 'path';
import JobModel from './models/job';
import CompanyModel from './models/company';

const sequelize = new Sequelize({
	host: 'localhost',
	dialect: 'sqlite',
	storage: resolve(__dirname, 'jobs.db'),
	logging: false,
});

export const Job = JobModel(sequelize, Sequelize);
export const Company = CompanyModel(sequelize, Sequelize);

Job.belongsTo(Company);

sequelize.sync().then(_ => console.log(`Database & tables created!`));