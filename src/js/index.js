/**
 * @author Yoichiro Hirano
 * @description Develop Environment Model
 * @created 2019/06/14
 * @link https://
 */

// import CONSTANT from './helper/CONSTANT';
// import { getIndexValueOfGivenPercentage } from './helper/util';
import '../scss/index.scss';

export default class Index {
  /**
   * constructor
   */
  constructor() {
    console.log(Index.getNumber());
  }

  static getNumber() {
    return 10;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.DEV_ENV_MODEL = window.DEV_ENV_MODEL || {};
  window.DEV_ENV_MODEL.INDEX = window.DEV_ENV_MODEL.INDEX || new Index();
});
