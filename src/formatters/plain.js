import _ from 'lodash';
import { types } from '../buildDiff.js';

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

export default (diff) => {
  const iter = (currentDiff, path) => {
    const line = currentDiff.flatMap((el) => {
      const newPath = [...path, el.key];
      switch (el.type) {
        case types.NESTED:
          return iter(el.children, newPath);
        case types.ADDED:
          return `Property '${getName(newPath)}' was added with value: ${getFormattedValue(el.value)}`;
        case types.REMOVED:
          return `Property '${getName(newPath)}' was removed`;
        case types.UPDATED:
          return `Property '${getName(newPath)}' was updated. From ${getFormattedValue(el.value.previous)} to ${getFormattedValue(el.value.current)}`;
        case types.UNCHANGED:
          return [];
        default:
          throw new Error(`Unexpected property: ${el.type}`);
      }
    });

    return line.join('\n');
  };

  return iter(diff, []);
};
