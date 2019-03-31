import fs from 'fs';
import path from 'path';
import union from 'lodash/union';
import has from 'lodash/has';
import parse from './parsers';
import render from './render';

const makeAst = (before, after) => {
  const propertyActions = [
    {
      type: 'nested',
      check: (key, data1, data2) => (data1[key] instanceof Object && data2[key] instanceof Object),
      process: (value1, value2) => ({ children: makeAst(value1, value2) }),
    },
    {
      type: 'added',
      check: (key, data1, data2) => !has(data1, key) && has(data2, key),
      process: (value1, value2) => ({ newValue: value2 }),
    },
    {
      type: 'deleted',
      check: (key, data1, data2) => has(data1, key) && !has(data2, key),
      process: value1 => ({ oldValue: value1 }),
    },
    {
      type: 'changed',
      check: (key, data1, data2) => has(data2, key) && (data1[key] !== data2[key]),
      process: (value1, value2) => ({ oldValue: value1, newValue: value2 }),
    },
    {
      type: 'unchanged',
      check: (key, data1, data2) => has(data2, key) && (data1[key] === data2[key]),
      process: value1 => ({ oldValue: value1 }),
    },
  ];
  const getPropertyAction = (key, data1, data2) => propertyActions
    .find(({ check }) => check(key, data1, data2));
  const allKeys = union(Object.keys(before), Object.keys(after));
  return allKeys.reduce((acc, key) => {
    const { type, process } = getPropertyAction(key, before, after);
    return [...acc, { key, type, ...process(before[key], after[key]) }];
  }, []);
};

const getContent = pathToFile => fs.readFileSync(path.resolve(path.normalize(pathToFile)), 'utf-8');
const getFormat = pathToFile => path.extname(pathToFile).substr(1);

const genDiff = (pathToFile1, pathToFile2) => {
  const oldContent = getContent(pathToFile1);
  const newContent = getContent(pathToFile2);
  const format = getFormat(pathToFile1);
  const parsedOldContent = parse(format)(oldContent);
  const parsedNewContent = parse(format)(newContent);
  const ast = makeAst(parsedOldContent, parsedNewContent);
  return render(ast, 1);
};

export default genDiff;
