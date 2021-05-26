import _ from 'lodash';
import { types } from '../buildDiff.js';

const spacesCount = 2;

const getIndent = (depth) => ' '.repeat(depth * spacesCount);
const getSign = (sign = ' ') => `${sign} `;
const getPrefix = (depth, sign) => {
  if (depth <= 0) {
    return '';
  }

  return `${getIndent(depth)}${getSign(sign)}`;
};

const placeBrackets = (lines, depth) => `{\n${lines.join('\n')}\n${getPrefix(depth)}}`;

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return value;
  }

  const line = Object.entries(value)
    .map(([key, currentValue]) => `${getPrefix(depth + 2)}${key}: ${stringify(currentValue, depth + 2)}`);

  return placeBrackets(line, depth);
};

export default (diff) => {
  const iter = (currentDiff, depth) => {
    const lines = currentDiff.flatMap((el) => {
      switch (el.type) {
        case types.NESTED:
          return `${getPrefix(depth)}${el.key}: ${iter(el.children, depth + 2)}`;
        case types.ADDED:
          return `${getPrefix(depth, '+')}${el.key}: ${stringify(el.value, depth)}`;
        case types.REMOVED:
          return `${getPrefix(depth, '-')}${el.key}: ${stringify(el.value, depth)}`;
        case types.UPDATED:
          return [
            `${getPrefix(depth, '-')}${el.key}: ${stringify(el.value.previous, depth)}`,
            `${getPrefix(depth, '+')}${el.key}: ${stringify(el.value.current, depth)}`,
          ];
        case types.UNCHANGED:
          return `${getPrefix(depth)}${el.key}: ${stringify(el.value, depth)}`;
        default:
          throw new Error(`Unexpected property: ${el.key}`);
      }
    });

    return placeBrackets(lines, depth - 2);
  };
  return iter(diff, 1);
};
