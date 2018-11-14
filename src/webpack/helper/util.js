export const getNumberFromString = (string) => {
  return parseInt(string, 10);
};

export const isSpView = () => {
  return matchMedia('(max-width: 768px)').matches;
};

/**
 * 乱数取得
 * min から max までの乱整数を返す関数
 * Math.round() を用いると非一様分布
 * @param {Number} min
 * @param {Number} max
 */
export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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

  const opts =
    Object.defineProperty &&
    Object.defineProperty({}, 'passive', {
      get: () => {
        result = true;
      }
    });

  document.addEventListener('test', () => {}, opts);

  return result;
};

export const getComputedTranslateXY = (dom) => {
  const transArr = [];
  if (!window.getComputedStyle) return;

  const style = getComputedStyle(dom);
  const transform =
    style.transform || style.webkitTransform || style.mozTransform;

  let mat = transform.match(/^matrix3d\((.+)\)$/);
  if (mat) return parseFloat(mat[1].split(', ')[13]);
  mat = transform.match(/^matrix\((.+)\)$/);
  mat ? transArr.push(parseFloat(mat[1].split(', ')[4])) : 0;
  mat ? transArr.push(parseFloat(mat[1].split(', ')[5])) : 0;
  return transArr;
};

export const setComputedTranslateXY = (dom, position) => {
  const style = getComputedStyle(dom);
  const transform =
    style.transform || style.webkitTransform || style.mozTransform;

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
    return;
  }
};

export const getTransitionendName = () => {
  const el = document.createElement('test');
  const transitions = {
    transition: 'transitionend',
    OTransition: 'oTransitionEnd',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd'
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
  let object = {};

  let arrQueries = location.search.replace(/^\?/, '').split('&');

  arrQueries.forEach((query) => {
    let key = query.split('=')[0];
    let val = query.split('=')[1];

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

export const getCookieParameters = () => {
  return document.cookie.split(';').reduce(function(obj, v) {
    const pair = v.split('=');
    obj[pair[0]] = pair[1];
    if (obj[pair[0]]) return obj;
  }, {});
};

export const shuffleArray = (array) => {
  let n = array.length,
    t,
    i;

  while (n) {
    i = Math.floor(Math.random() * n--);
    t = array[n];
    array[n] = array[i];
    array[i] = t;
  }

  return array;
};
