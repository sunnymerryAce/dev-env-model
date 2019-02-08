export const getNumberFromString = string => parseInt(string, 10);

export const isSpView = () => matchMedia('(max-width: 768px)').matches;

/**
 * イベントをキャンセルする
 * @param {eventTarget} e
 */
export const cancelEvent = (e) => {
  e.preventDefault();
};

/**
 * スクロールを固定/固定解除する
 * @param {boolean} fix 固定はtrue、解除はfalse
 */
export const toggleScroll = ({ fix }) => {
  const wheelEvent = window.WheelEvent ? 'wheel' : 'mousewheel';
  if (fix) {
    window.addEventListener(wheelEvent, cancelEvent, { passive: false });
    window.addEventListener('touchmove', cancelEvent, { passive: false });
  } else {
    window.removeEventListener(wheelEvent, cancelEvent, false);
    window.removeEventListener('touchmove', cancelEvent, false);
  }
};

/**
 * RequestAnimationFrameを初期化し、現在日時を取得する
 * @return {Number}
 */
export const getTimeForRequestAnimationFrame = () => {
  const requestAnimationFrame = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;

  const now = window.performance
    && (performance.now
      || performance.mozNow
      || performance.msNow
      || performance.oNow
      || performance.webkitNow);

  return now ? now.call(performance) : new Date().getTime();
};

/**
 * 英数字をspanタグで囲む
 * @param {object} args
 * @param {string} args.string
 * @param {string} args.className
 * @return {string}
 */
export const wrapAlphanumericWithSpan = ({ string, className }) => string.replace(/([a-zA-Z0-9,¥\.\-]+)/g, `<span class="${className}">$1</span>`);

/**
 * 乱数取得
 * min から max までの乱整数を返す関数
 * Math.round() を用いると非一様分布
 * @param {Object} args
 * @param {Number} args.min
 * @param {Number} args.max
 * @returns {Number}
 */
export const getRandomInt = ({ min, max }) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * oddsの確率に応じて、確率に対応するインデックスを返す
 * @param {Object} args
 * @param {Array} args.odds
 * @param {Array} args.results
 */
export const getIndexValueOfGivenPercentage = ({ odds, results }) => {
  // 確率と返す結果が同じ長さ出ない場合、エラ＝
  if (odds.length !== results.length) {
    throw new TypeError('Lengths are not equal.');
  }
  const incrementor = (accumulator, currentValue) => accumulator + currentValue;
  // 確率の合計が100でない場合、エラー
  if (odds.reduce(incrementor) !== 100) {
    throw new TypeError('Total odds must be 100.');
  }

  // 計算用配列を作成
  const calcOdds = odds.map((percentage, index) => {
    const res = odds.concat().splice(index, odds.length);
    return res.reduce(incrementor);
  });

  // 乱数作成
  const number = Math.floor(Math.random() * 100) + 1;
  let result = '';
  calcOdds.forEach((percentage, index) => {
    // 確率の範囲内であればインデックスを更新
    if (number <= percentage) result = results[index];
  });
  return result;
};

/*
 * Outer Width With Margin
 */
export const getOuterWidth = (el) => {
  let width = el.offsetWidth;
  const style = getComputedStyle(el);
  width += parseInt(style.marginLeft, 10) + parseInt(style.marginRight, 10);
  return width;
};

/**
 * passive:trueが使えるかどうかを判定する
 */
export const enablePassiveEventListeners = () => {
  let result = false;

  const opts = Object.defineProperty
    && Object.defineProperty({}, 'passive', {
      get: () => {
        result = true;
      },
    });

  document.addEventListener('test', () => {}, opts);

  return result;
};

export const getComputedTranslateXY = (dom) => {
  const transArr = [];
  if (!window.getComputedStyle) return;

  const style = getComputedStyle(dom);
  const transform = style.transform || style.webkitTransform || style.mozTransform;

  let mat = transform.match(/^matrix3d\((.+)\)$/);
  if (mat) return parseFloat(mat[1].split(', ')[13]);
  mat = transform.match(/^matrix\((.+)\)$/);
  mat ? transArr.push(parseFloat(mat[1].split(', ')[4])) : 0;
  mat ? transArr.push(parseFloat(mat[1].split(', ')[5])) : 0;
  return transArr;
};

export const setComputedTranslateXY = (dom, position) => {
  const style = getComputedStyle(dom);
  const transform = style.transform || style.webkitTransform || style.mozTransform;

  if (transform) {
    let mat = transform.match(/^matrix3d\((.+)\)$/);
    if (mat) {
      dom.style.transform = `matrix3d(${position.x}px,${position.y}px)`;
      return;
    }
    mat = transform.match(/^matrix\((.+)\)$/);
    if (mat) {
      dom.style.transform = `matrix(${position.x}px,${position.y}px)`;
    }
  } else {
    dom.style.transform = `matrix(${position.x}px,${position.y}px)`;
  }
};

export const getTransitionendName = () => {
  const el = document.createElement('test');
  const transitions = {
    transition: 'transitionend',
    OTransition: 'oTransitionEnd',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd',
  };
  let key;

  for (key in transitions) {
    if (el.style[key] !== undefined) {
      return transitions[key];
    }
  }

  return false;
};

export const hasCssProperty = (key) => {
  const styles = getComputedStyle(document.body);
  const vendors = ['', 'ms', 'moz', 'webkit', 'o'];
  let result = false;
  let style;

  vendors.forEach((vendor) => {
    if (result) return;

    if (vendor === '') {
      style = key;
    } else {
      style = key.replace(/^[a-z]/, key.charAt(0).toUpperCase());
    }

    result = styles.hasOwnProperty(`${vendor}${style}`);
  });

  return result;
};

export const getQueryObject = () => {
  const object = {};

  const arrQueries = location.search.replace(/^\?/, '').split('&');

  arrQueries.forEach((query) => {
    const key = query.split('=')[0];
    const val = query.split('=')[1];

    object[key] = val;
  });

  return object;
};

/**
 * [getQueryParameters description]
 *
 * location.search.substr(1)
 * element.getAttribute('href').replace(/^http(.*?)\?/, '')
 */
export const getQueryParameters = (target) => {
  const text = target;
  return text.split('&').reduce((obj, v) => {
    const pair = v.split('=');
    obj[pair[0]] = pair[1];
    if (obj[pair[0]]) return obj;
  }, {});
};

export const getCookieParameters = () => document.cookie.split(';').reduce((obj, v) => {
  const pair = v.split('=');
  obj[pair[0]] = pair[1];
  if (obj[pair[0]]) return obj;
}, {});

export const shuffleArray = (array) => {
  let n = array.length;

  let t;

  let i;

  while (n) {
    i = Math.floor(Math.random() * n--);
    t = array[n];
    array[n] = array[i];
    array[i] = t;
  }

  return array;
};
