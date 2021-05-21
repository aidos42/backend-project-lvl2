import makeStylish from './stylish.js';
import makePlain from './plain.js';

export default (formatter, diff) => {
  const formatters = {
    plain: makePlain,
    stylish: makeStylish,
    json: JSON.stringify,
  };

  try {
    return formatters[formatter](diff);
  } catch (e) {
    throw new Error(`Unexpected format: ${formatter}`);
  }
};
