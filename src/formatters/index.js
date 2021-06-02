import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const formatters = {
  plain: formatPlain,
  stylish: formatStylish,
  json: JSON.stringify,
};

export default (diff, formatter) => formatters[formatter](diff);
