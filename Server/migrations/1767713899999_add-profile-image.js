export const up = (pgm) => {
  pgm.addColumn('users', {
    profile_image: { type: 'text' },
  });
};

export const down = (pgm) => {
  pgm.dropColumn('users', 'profile_image');
};
