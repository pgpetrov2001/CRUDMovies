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
}

exports.down = function (pgm) {
  pgm.sql('DROP TABLE movies;');
};