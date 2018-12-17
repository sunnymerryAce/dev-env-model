import Index from '../index';
import CONST from '../helper/CONST';

const { NUMBER_10 } = CONST;
beforeAll(() => {});

// getNumber
describe('getNumber', () => {
  test.only('正常系', () => {
    expect(Index.getNumber()).toEqual(NUMBER_10);
  });
});
