/**
 * @author Yoichiro Hirano
 * @description Develop Environment Model
 * @created 2019/06/14
 * @link https://
 */

import EventEmitter from './helper/EventEmitter';
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
  window.DEV_ENV_MODEL_INDEX = window.DEV_ENV_MODEL_INDEX || new Index();
});
