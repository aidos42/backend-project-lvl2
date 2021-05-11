import makeStylish from './stylish.js';
import makePlain from './plain.js';

const formatDiff = (formatter, diff) => {
  switch (formatter) {
    case 'plain':
      return makePlain(diff);
    default:
      return makeStylish(diff);
  }
};

export default formatDiff;
