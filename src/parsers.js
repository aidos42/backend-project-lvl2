import yaml from 'js-yaml';

export default (file, extension) => {
  const formats = {
    '.json': JSON.parse,
    '.yaml': yaml.load,
    '.yml': yaml.load,
  };

  try {
    return formats[extension](file);
  } catch (e) {
    throw new Error(`Unexpected extension: ${extension}`);
  }
};
