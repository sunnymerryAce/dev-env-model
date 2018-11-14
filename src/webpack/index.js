import { CONST } from './CONST';

class Index {
  /**
   * constructor
   */
  constructor() {
    this.initialize();
  }

  initialize() {
    console.log(CONST.TEST_TEXT);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.DEV_ENV_MODEL = window.DEV_ENV_MODEL || {};
  window.DEV_ENV_MODEL.INDEX = window.DEV_ENV_MODEL.INDEX || new Index();
});
