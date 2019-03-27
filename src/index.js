import fs from 'fs';
import path from 'path';
import has from 'lodash/has';
import union from 'lodash/union';

const parse = (before, after) => {
  const allKeys = union(Object.keys(before), Object.keys(after));
  const result = allKeys.reduce((acc, key) => {
    if (has(before, key) && !has(after, key)) {
      return `${acc}  - ${key}: ${before[key]}\n`;
    }
    if (!has(before, key) && has(after, key)) {
      return `${acc}  + ${key}: ${after[key]}\n`;
    }
    const oldValue = before[key];
    const newValue = after[key];
    if (oldValue === newValue) {
      return `${acc}    ${key}: ${oldValue}\n`;
    }
    return `${acc}  + ${key}: ${after[key]}\n  - ${key}: ${before[key]}\n`;
  }, '');
  return `{\n${result}}\n`;
};

const genDiff = (firstConfig, secondConfig) => {
  const beforeFileContent = fs.readFileSync(path.normalize(path.resolve(firstConfig)));
  const afterFileContent = fs.readFileSync(path.normalize(path.resolve(secondConfig)));
  const before = JSON.parse(beforeFileContent);
  const after = JSON.parse(afterFileContent);
  return parse(before, after);
};

export default genDiff;
