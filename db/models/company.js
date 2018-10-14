export default function(sequelize, type) {
	return sequelize.define('company', {
		id: {
			type: type.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		slug: type.STRING,
		name: type.STRING,
		logo: type.STRING,
		url: type.STRING,
	});
}
