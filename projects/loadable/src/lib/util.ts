export const capitalize = ([first, ...rest]: string) =>
  first.toUpperCase() + rest.join('');
