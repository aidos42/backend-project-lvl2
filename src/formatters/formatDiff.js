import makeStylish from './stylish.js';
import makePlain from './plain.js';

const formatDiff = (formatter, diff) => {
  switch (formatter) {
    case 'plain':
      return makePlain(diff);
    case 'stylish':
      return makeStylish(diff);
    default:
      return JSON.stringify(diff);
  }
};

export default formatDiff;
