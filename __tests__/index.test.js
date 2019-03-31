import fs from 'fs';
import genDiff from '../src';

describe('gendiff tests', () => {
  const pathToJson1 = './__tests__/__fixtures__/before.json';
  const pathToNestedJson1 = './__tests__/__fixtures__/before_nested.json';
  const pathToJson2 = './__tests__/__fixtures__/after.json';
  const pathToNestedJson2 = './__tests__/__fixtures__/after_nested.json';
  const pathToYml1 = './__tests__/__fixtures__/before.yml';
  const pathToNestedYml1 = './__tests__/__fixtures__/before_nested.yml';
  const pathToYml2 = './__tests__/__fixtures__/after.yml';
  const pathToNestedYml2 = './__tests__/__fixtures__/after_nested.yml';
  const pathToIni1 = './__tests__/__fixtures__/before.ini';
  const pathToIni2 = './__tests__/__fixtures__/after.ini';
  const pathToExpected = './__tests__/__fixtures__/expected';
  const pathToNestedExpected = './__tests__/__fixtures__/nested_expected';

  test.each([
    [pathToJson1, pathToJson2, pathToExpected],
    [pathToYml1, pathToYml2, pathToExpected],
    [pathToIni1, pathToIni2, pathToExpected],
    [pathToNestedJson1, pathToNestedJson2, pathToNestedExpected],
    [pathToNestedYml1, pathToNestedYml2, pathToNestedExpected],
  ])(
    '.gendDiff(%s, %s)',
    (path1, path2, path3) => {
      const actual = genDiff(path1, path2);
      const expected = fs.readFileSync(path3, 'utf-8');
      expect(actual).toBe(expected);
    },
  );
});
