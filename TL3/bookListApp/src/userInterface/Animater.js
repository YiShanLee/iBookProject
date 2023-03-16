const easing = window.popmotion.easing;
const tween = window.popmotion.tween;
const styler = window.popmotion.styler;

class Animater {
  constructor() {
  }
  
  moveToRight(element, callback) {
    let elementStyler = styler(element);
    tween({
      from: { x: 0 },
      to: { x: 200 },
      duration: 500,
      ease: easing.linear
    }).start({
      update: elementStyler.set,
      complete: () => {
        callback();
      }
    });
  }

  showElement(element) {
    let elementStyler = styler(element);

    tween({
      from: { opacity: 0 },
      to: { opacity: 1 },
      duration: 2000,
      ease: easing.backOut
    }).start(elementStyler.set);
  }

  hideElement(element, callback) {
    let elementStyler = styler(element);

    tween({
      from: { opacity: 1 },
      to: { opacity: 0 },
      duration: 2000,
      ease: easing.backOut
    }).start({
      update: elementStyler.set,
      complete: () => {
        callback();
      }
    });
  }

}

export {Animater};
