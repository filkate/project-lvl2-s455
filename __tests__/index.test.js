import fs from 'fs';
import genDiff from '../src';

describe('gendiff tests', () => {
  const pathToJson1 = './__tests__/__fixtures__/before.json';
  const pathToJson2 = './__tests__/__fixtures__/after.json';
  const pathToYml1 = './__tests__/__fixtures__/before.yml';
  const pathToYml2 = './__tests__/__fixtures__/after.yml';
  const pathToIni1 = './__tests__/__fixtures__/before.ini';
  const pathToIni2 = './__tests__/__fixtures__/after.ini';
  const pathToExpected = './__tests__/__fixtures__/expected';

  test.each([
    [pathToJson1, pathToJson2, pathToExpected],
    [pathToYml1, pathToYml2, pathToExpected],
    [pathToIni1, pathToIni2, pathToExpected],
  ])(
    '.gendDiff(%s, %s)',
    (path1, path2, path3) => {
      const actual = genDiff(path1, path2);
      const expected = fs.readFileSync(path3, 'utf-8');
      expect(actual).toBe(expected);
    },
  );
});
