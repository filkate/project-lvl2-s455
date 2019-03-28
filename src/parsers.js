import { safeLoad, safeDump } from 'js-yaml';

const jsonParser = {
  parse: JSON.parse,
  stringify: JSON.stringify,
};

const yamlParser = {
  parse: safeLoad,
  stringify: safeDump,
};

const parsers = {
  json: jsonParser,
  yml: yamlParser,
};

const getParser = ext => parsers[ext];

export default ext => getParser(ext).parse;
