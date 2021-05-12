import _ from 'lodash';

const getDiff = (data1, data2) => {
  const rawDataKeys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedDataKeys = _.sortBy(rawDataKeys);

  const result = sortedDataKeys.map((key) => {
    if (!_.has(data1, key)) {
      return { key, status: 'added', value: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { key, status: 'removed', value: data1[key] };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, status: 'complex value', children: getDiff(data1[key], data2[key]) };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key, status: 'updated', valueOld: data1[key], valueNew: data2[key],
      };
    }

    return { key, status: 'unchanged', value: data1[key] };
  });

  return result;
};

export default getDiff;
