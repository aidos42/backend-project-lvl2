import makeStylish from './stylish.js';
import makePlain from './plain.js';

const formatters = {
  plain: makePlain,
  stylish: makeStylish,
  json: JSON.stringify,
};

export default (formatter, diff) => formatters[formatter](diff);
