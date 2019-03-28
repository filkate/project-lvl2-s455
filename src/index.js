import fs from 'fs';
import path from 'path';
import has from 'lodash/has';
import union from 'lodash/union';
import parse from './parsers';

const render = content => `{\n${content.join('\n')}\n}\n`;

const process = (before, after) => {
  const allKeys = union(Object.keys(before), Object.keys(after));
  const result = allKeys.reduce((acc, key) => {
    if (has(before, key) && !has(after, key)) {
      return [...acc, `  - ${key}: ${before[key]}`];
    }
    if (!has(before, key) && has(after, key)) {
      return [...acc, `  + ${key}: ${after[key]}`];
    }
    const oldValue = before[key];
    const newValue = after[key];
    if (oldValue === newValue) {
      return [...acc, `    ${key}: ${oldValue}`];
    }
    return [...acc, `  + ${key}: ${after[key]}`, `  - ${key}: ${before[key]}`];
  }, []);
  return render(result);
};

const getContent = pathToFile => fs.readFileSync(path.normalize(path.resolve(pathToFile)));
const getExtension = pathToFile => path.extname(pathToFile).substr(1);

const genDiff = (pathToFile1, pathToFile2) => {
  const oldContent = getContent(pathToFile1);
  const newContent = getContent(pathToFile2);
  const extName = getExtension(pathToFile1);
  const parsedOldContent = parse(extName)(oldContent);
  const parsedNewContent = parse(extName)(newContent);
  return process(parsedOldContent, parsedNewContent);
};

export default genDiff;
