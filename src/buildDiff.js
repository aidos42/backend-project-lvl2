import _ from 'lodash';

export const types = {
  ADDED: 'added',
  REMOVED: 'removed',
  UPDATED: 'updated',
  UNCHANGED: 'unchanged',
  NESTED: 'nested',
};

export const buildDiff = (data1, data2) => {
  const iter = (innerData1, innerData2) => {
    const unitedKeys = _.union(Object.keys(innerData1), Object.keys(innerData2));
    const sortedKeys = _.sortBy(unitedKeys);

    return sortedKeys.map((key) => {
      if (!_.has(innerData1, key)) {
        return { key, type: types.ADDED, value: innerData2[key] };
      }

      if (!_.has(innerData2, key)) {
        return { key, type: types.REMOVED, value: innerData1[key] };
      }

      if (_.isPlainObject(innerData1[key]) && _.isPlainObject(innerData2[key])) {
        return { key, type: types.NESTED, children: iter(innerData1[key], innerData2[key]) };
      }

      if (!_.isEqual(innerData1[key], innerData2[key])) {
        return {
          key, type: types.UPDATED, value1: innerData1[key], value2: innerData2[key],
        };
      }

      return { key, type: types.UNCHANGED, value: innerData1[key] };
    });
  };

  return iter(data1, data2);
};
