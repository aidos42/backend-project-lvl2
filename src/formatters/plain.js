import _ from 'lodash';

const makePlain = (diff) => {
  const iter = (currentDiff, path) => {
    const line = currentDiff.flatMap((el) => {
      const value = _.isPlainObject(el.value) ? '[complex value]' : el.value;
      let valueOld;
      let valueNew;
      if (el.status === 'changed') {
        valueOld = (typeof el.valueOld === 'string') ? `'${el.valueOld}'` : `${el.valueOld}`;
        valueOld = _.isPlainObject(el.valueOld) ? '[complex value]' : valueOld;
        valueNew = (typeof el.valueNew === 'string') ? `'${el.valueNew}'` : `${el.valueNew}`;
        valueNew = _.isPlainObject(el.valueNew) ? '[complex value]' : valueNew;
      }

      switch (el.status) {
        case 'nested':
          return iter(el.children, [...path, el.key]);
        case 'added':
          return `Property '${[...path, el.key].join('.')}' was added with value: ${(typeof el.value === 'string') ? `'${value}'` : `${value}`}`;
        case 'deleted':
          return `Property '${[...path, el.key].join('.')}' was removed`;
        case 'changed':
          return `Property '${[...path, el.key].join('.')}' was updated. From ${valueOld} to ${valueNew}`;
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
