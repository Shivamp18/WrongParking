export const up = (pgm) => {
  pgm.createTable('users', {
    id: { type: 'serial', primaryKey: true },
    first_name: { type: 'varchar(1000)', notNull: true },
    last_name: { type: 'varchar(1000)', notNull: true },
    email: { type: 'varchar(1000)', notNull: true},
    password: { type: 'varchar(1000)', notNull: true },
    mobile: { type: 'varchar(15)', notNull: true },
    vehicle_number: { type: 'varchar(20)', notNull: true },
    profile_image: { type: 'text' },
  });
};

export const down = (pgm) => {
  pgm.dropTable('users');
};
