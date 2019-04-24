import 'intersection-observer';

export default class ScrollObserver {
  constructor() {
    this.$targets1 = [...document.querySelectorAll('.')];
    this.$targets2 = [...document.querySelectorAll('.')];
    this.defaultOptions = {
      // ビューポート デフォルトでブラウザのビューポートが適用
      root: null,
      rootMargin: '0% 0% -20% 0%',
      // 閾値 targetがrootでどのくらいの割合見えているか
      // 1.0 の値はターゲット(not ビューポート！)の全てのピクセルが見えるようになったら
      threshold: 0,
    };

    this.initializeView();
    this.oneTimeObserver = ScrollObserver.startObserve({
      $targets: this.$targets1,
      callback: this.onIntersecting,
      options: this.defaultOptions,
      isOnce: true,
    });
    this.permanentObserver = ScrollObserver.startObserve({
      $targets: this.$targets2,
      callback: this.onIntersecting,
      options: this.defaultOptions,
      isOnce: false,
    });
  }

  /**
   * 初期表示
   */
  initializeView() {
    this.$targets1.forEach(($target) => {
      // $target.style.opacity = 0;
    });
  }

  /**
   * 交差時の処理
   * @param {IntersectionObserverEntry} entry
   */
  onIntersecting(entry) {
    //   entry.target ターゲット
    //   entry.boundingClientRect ターゲットの位置寸法 ().top > 0 でターゲット上辺と判定できる
    //   entry.intersectionRect ビューポートとターゲットの重なる矩形
    //   entry.intersectionRatio 重なる矩形のビューポートに対する比率
    //   entry.isIntersecting 重なっているかどうか（ビューポート内かどうか）
    if (entry.isIntersecting && entry.boundingClientRect.top > 0) {
      // do something
      this.show();
    }
  }

  /**
   * create IntersectionObserver object and start observing
   * @param {object} params
   * @param {array} params.$targets array of elements to be observed
   * @param {function} params.callback function to trigger
   * @param {object} params.options
   * @param {boolean} params.isOnce whether it trigger only once or not
   * @returns {IntersectionObserver}
   */
  static startObserve({
    $targets, callback, options, isOnce,
  }) {
    const observer = new IntersectionObserver((entries) => {
      // 閾値(thresholds)を前後するたびにトリガー
      // entriesには閾値を超えたターゲットのみが[]で入ってくる
      entries.forEach((entry) => {
        callback(entry);
        if (isOnce) {
          // 一回のみの発火の場合は監視を解除
          observer.unobserve(entry.target);
        }
      });
    }, options);
    // ターゲットを登録
    [...$targets].forEach(($target) => {
      observer.observe($target);
    });
    return observer;
  }
}
