import _ from 'lodash';
import { types } from '../buildDiff.js';

const stringifyPath = (path) => path.join('.');
const stringifyValue = (value) => {
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
    const lines = currentDiff.flatMap((el) => {
      const newPath = [...path, el.key];
      switch (el.type) {
        case types.NESTED:
          return iter(el.children, newPath);
        case types.ADDED:
          return `Property '${stringifyPath(newPath)}' was added with value: ${stringifyValue(el.value)}`;
        case types.REMOVED:
          return `Property '${stringifyPath(newPath)}' was removed`;
        case types.UPDATED:
          return `Property '${stringifyPath(newPath)}' was updated. From ${stringifyValue(el.value1)} to ${stringifyValue(el.value2)}`;
        case types.UNCHANGED:
          return [];
        default:
          throw new Error(`Unexpected type of property: ${el.type}`);
      }
    });

    return lines.join('\n');
  };

  return iter(diff, []);
};
