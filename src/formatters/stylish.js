import _ from 'lodash';

const spacesCount = 2;

const getIndent = (depth, sign = ' ') => {
  if (depth <= 0) {
    return '';
  }

  return ' '.repeat(depth * spacesCount).concat(`${sign} `);
};

const getFormattedValue = (currentValue, depth) => {
  if (!_.isPlainObject(currentValue)) {
    return currentValue;
  }

  const line = Object.entries(currentValue)
    .map(([key, value]) => `${getIndent(depth + 2)}${key}: ${getFormattedValue(value, depth + 2)}`);

  return `{\n${line.join('\n')}\n${getIndent(depth)}}`;
};

const makeStylish = (diff) => {
  const iter = (currentDiff, depth) => {
    const line = currentDiff.flatMap((el) => {
      switch (el.status) {
        case 'nested':
          return `${getIndent(depth)}${el.key}: ${iter(el.children, depth + 2)}`;
        case 'added':
          return `${getIndent(depth, '+')}${el.key}: ${getFormattedValue(el.value, depth)}`;
        case 'deleted':
          return `${getIndent(depth, '-')}${el.key}: ${getFormattedValue(el.value, depth)}`;
        case 'changed':
          return [
            `${getIndent(depth, '-')}${el.key}: ${getFormattedValue(el.valueOld, depth)}`,
            `${getIndent(depth, '+')}${el.key}: ${getFormattedValue(el.valueNew, depth)}`,
          ];
        case 'unchanged':
          return `${getIndent(depth)}${el.key}: ${getFormattedValue(el.value, depth)}`;
        default:
          throw new Error(`Unexpected property: ${el.key}`);
      }
    });
    return `{\n${line.join('\n')}\n${getIndent(depth - 2)}}`;
  };

  const result = iter(diff, 1);
  return result;
};

export default makeStylish;
