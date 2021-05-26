import _ from 'lodash';
import { types } from '../buildDiff.js';

const getName = (path) => path.join('.');
const stringify = (value) => {
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
          return `Property '${getName(newPath)}' was added with value: ${stringify(el.value)}`;
        case types.REMOVED:
          return `Property '${getName(newPath)}' was removed`;
        case types.UPDATED:
          return `Property '${getName(newPath)}' was updated. From ${stringify(el.value.previous)} to ${stringify(el.value.current)}`;
        case types.UNCHANGED:
          return [];
        default:
          throw new Error(`Unexpected property: ${el.type}`);
      }
    });

    return lines.join('\n');
  };

  return iter(diff, []);
};
