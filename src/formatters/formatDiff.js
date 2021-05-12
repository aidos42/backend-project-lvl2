import makeStylish from './stylish.js';
import makePlain from './plain.js';

const formatDiff = (formatter, diff) => {
  switch (formatter) {
    case 'plain':
      return makePlain(diff);
    case 'stylish':
      return makeStylish(diff);
    case 'json':
      return JSON.stringify(diff);
    default:
      throw new Error(`Unexpected format: ${formatter}`);
  }
};

export default formatDiff;
