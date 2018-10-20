export default function(sequelize, type) {
	return sequelize.define('log', {
		id: {
			type: type.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		ip: type.STRING,
		country: type.STRING,
	});
}
