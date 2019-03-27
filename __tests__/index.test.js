import fs from 'fs';
import genDiff from '../src';

const beforePath = './__tests__/__fixtures__/before.json';
const afterPath = './__tests__/__fixtures__/after.json';
const expected = fs.readFileSync('./__tests__/__fixtures__/expected', 'utf-8');

test('genDiff should return ', () => {
  expect(genDiff(beforePath, afterPath)).toBe(expected);
});
