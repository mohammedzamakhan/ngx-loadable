const capitalize = ([first, ...rest]: string) =>
  first.toUpperCase() + rest.join('');

export const pascalCase = (word) => {
  return word.split('-').map(w => capitalize(w)).join('');
};
