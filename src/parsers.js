import { safeLoad, safeDump } from 'js-yaml';
import ini from 'ini';

const jsonParser = {
  parse: JSON.parse,
  stringify: JSON.stringify,
};

const yamlParser = {
  parse: safeLoad,
  stringify: safeDump,
};

const iniParser = {
  parse: ini.parse,
  stringify: ini.stringify,
};

const parsers = {
  json: jsonParser,
  yml: yamlParser,
  ini: iniParser,
};

const getParser = ext => parsers[ext];

export default ext => getParser(ext).parse;
