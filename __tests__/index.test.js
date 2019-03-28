import fs from 'fs';
import genDiff from '../src';

describe('gendiff tests', () => {
  const beforeJson = './__tests__/__fixtures__/before.json';
  const afterJson = './__tests__/__fixtures__/after.json';
  const beforeYml = './__tests__/__fixtures__/before.yml';
  const afterYml = './__tests__/__fixtures__/after.yml';
  const expected = fs.readFileSync('./__tests__/__fixtures__/expected', 'utf-8');

  test('genDiff json should return ', () => {
    expect(genDiff(beforeJson, afterJson)).toBe(expected);
  });

  test('genDiff yml should return ', () => {
    expect(genDiff(beforeYml, afterYml)).toBe(expected);
  });
});
