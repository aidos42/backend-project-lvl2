import _ from 'lodash';

const getName = (path) => path.join('.');
const getFormattedValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  return value;
};

const makePlain = (diff) => {
  const iter = (currentDiff, path) => {
    const line = currentDiff.flatMap((el) => {
      const newPath = [...path, el.key];
      switch (el.status) {
        case 'complex value':
          return iter(el.children, newPath);
        case 'added':
          return `Property '${getName(newPath)}' was added with value: ${getFormattedValue(el.value)}`;
        case 'removed':
          return `Property '${getName(newPath)}' was removed`;
        case 'updated':
          return `Property '${getName(newPath)}' was updated. From ${getFormattedValue(el.valueOld)} to ${getFormattedValue(el.valueNew)}`;
        case 'unchanged':
          return [];
        default:
          throw new Error(`Unexpected property: ${el.key}`);
      }
    });

    return line.join('\n');
  };

  const result = iter(diff, []);

  return result;
};

export default makePlain;
