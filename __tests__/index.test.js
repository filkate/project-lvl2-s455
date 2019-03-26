import fs from 'fs';
import genDiff from '../src';

test('genDiff should return ', () => {
  expect(genDiff(1, 2)).toBe('');
});
