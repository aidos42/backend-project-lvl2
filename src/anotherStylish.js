import _ from 'lodash';

const spacesCount = 2;

const getIndent = (depth, sign = ' ') => ' '.repeat(depth * spacesCount).concat(`${sign} `);

const getFormattedValue = (currentValue, depth) => {
  if (!_.isPlainObject(currentValue)) {
    return currentValue;
  }

  const line = Object.entries(currentValue)
    .map(([key, value]) => `${getIndent(depth + 1)}${key}: ${getFormattedValue(value, depth + 1)}`);

  return `{\n${line.join('\n')}\n${getIndent(depth)}}`;
};

const stylish = (diff) => {
  const iter = (currentDiff, depth) => {
    const line = currentDiff.flatMap((el) => {
      switch (el.status) {
        case 'nested':
          return `${getIndent(depth)}${el.key}: ${iter(el.children, depth + 1)}`;
        case 'added':
          return `${getIndent(depth, '+')}${el.key}: ${getFormattedValue(el.value, depth)}`;
        case 'deleted':
          return `${getIndent(depth, '-')}${el.key}: ${getFormattedValue(el.value, depth)}`;
        case 'changed':
          return [
            `${getIndent(depth, '-')}${el.key}: ${getFormattedValue(el.valueOld, depth)}`,
            `${getIndent(depth, '+')}${el.key}: ${getFormattedValue(el.valueNew, depth)}`,
          ];
        default:
          return `${getIndent(depth)}${el.key}: ${getFormattedValue(el.value, depth)}`;
      }
    });

    return `{\n${line.join('\n')}\n${getIndent(depth - 1)}}`;
  };

  const result = iter(diff, 1);
  return result;
};

export default stylish;
