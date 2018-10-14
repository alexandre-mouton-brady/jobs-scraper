export default function(sequelize, type) {
	return sequelize.define('job', {
		id: {
			type: type.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		title: type.STRING,
		location: type.STRING,
		link: type.STRING,
		description: type.STRING,
	});
}
