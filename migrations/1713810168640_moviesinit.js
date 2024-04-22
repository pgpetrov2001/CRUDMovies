'use strict';

exports.up = (pgm) => {
	pgm.createTable('users', {
		id: 'id',
		name: { type: 'varchar(1000)', notNull: true },
		createdAt: {
			type: 'timestamp',
			notNull: true,
			default: pgm.func('current_timestamp'),
		},
	})
	pgm.sql(`
		CREATE TABLE "movies" (
			id SERIAL PRIMARY KEY,
			genre TEXT,
			title TEXT
		)
	`);
}

exports.down = function (pgm) {
	pgm.sql('DROP TABLE users;');
	pgm.sql('DROP TABLE movies;');
};
