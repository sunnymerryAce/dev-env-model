/**
 * @author Yoichiro Hirano
 * @description Develop Environment Model
 * @created 2018/12/03
 * @link https://
 */

import CONST from './helper/CONST';

const { TEST_TEXT, NUMBER_10 } = CONST;

export default class Index {
  /**
   * constructor
   */
  constructor() {
    console.log(Index.getNumber());
  }

  static getNumber() {
    return NUMBER_10;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.DEV_ENV_MODEL = window.DEV_ENV_MODEL || {};
  window.DEV_ENV_MODEL.INDEX = window.DEV_ENV_MODEL.INDEX || new Index();
});
