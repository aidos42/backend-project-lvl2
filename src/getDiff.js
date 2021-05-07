import _ from 'lodash';

const getDiff = (data1, data2) => {
  const data1Keys = Object.keys(data1).sort();
  const data2Keys = Object.keys(data2).sort();
  const dataKeys = [...new Set([...data1Keys, ...data2Keys])].sort();

  const result = dataKeys.map((key) => {
    if (!_.has(data1, key)) {
      return { key, status: 'added', value: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { key, status: 'deleted', value: data1[key] };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, status: 'nested', value: getDiff(data1[key], data2[key]) };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key, status: 'changed', valueOld: data1[key], valueNew: data2[key],
      };
    }
    return { key, status: 'unchanged', value: data1[key] };
  });

  return result;
};

export default getDiff;
