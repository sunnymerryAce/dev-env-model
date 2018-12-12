/**
 * @author Yoichiro Hirano
 * @description Develop Environment Model
 * @created 2018/12/03
 * @link https://
 */

import CONST from './CONST';

const { TEST_TEXT, number } = CONST;

class Index {
  /**
   * constructor
   */
  constructor() {
    console.log(TEST_TEXT);
    console.log(number);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.DEV_ENV_MODEL = window.DEV_ENV_MODEL || {};
  window.DEV_ENV_MODEL.INDEX = window.DEV_ENV_MODEL.INDEX || new Index();
});
