import _ from 'lodash';
import { types } from '../buildDiff.js';

const spacesCount = 4;

const getIndent = (depth) => ' '.repeat(depth);

const placeBrackets = (lines, depth) => `{\n${lines.join('\n')}\n${getIndent(depth)}}`;

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return value;
  }

  const innerDepth = depth + spacesCount;

  const line = Object.entries(value)
    .map(([key, currentValue]) => `${getIndent(innerDepth)}${key}: ${stringify(currentValue, innerDepth)}`);

  return placeBrackets(line, depth);
};

export default (diff) => {
  const iter = (currentDiff, depth) => {
    const lines = currentDiff.flatMap((el) => {
      switch (el.type) {
        case types.NESTED:
          return `${getIndent(depth)}    ${el.key}: ${iter(el.children, depth + spacesCount)}`;
        case types.ADDED:
          return `${getIndent(depth)}  + ${el.key}: ${stringify(el.value, depth + spacesCount)}`;
        case types.REMOVED:
          return `${getIndent(depth)}  - ${el.key}: ${stringify(el.value, depth + spacesCount)}`;
        case types.UPDATED:
          return [
            `${getIndent(depth)}  - ${el.key}: ${stringify(el.value1, depth + spacesCount)}`,
            `${getIndent(depth)}  + ${el.key}: ${stringify(el.value2, depth + spacesCount)}`,
          ];
        case types.UNCHANGED:
          return `${getIndent(depth)}    ${el.key}: ${stringify(el.value, depth + spacesCount)}`;
        default:
          throw new Error(`Unexpected type of property: ${el.key}`);
      }
    });

    return placeBrackets(lines, depth);
  };

  return iter(diff, 0);
};
