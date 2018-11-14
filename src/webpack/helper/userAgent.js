const ua = navigator.userAgent.toLowerCase();

export const isIOS = () => {
  return /iphone|ipad|ipod/.test(ua);
};

export const isSp = () => {
  return /iphone|ipod|android/.test(ua);
};

export const isIE = () => {
  return /msie|trident/.test(ua);
};
