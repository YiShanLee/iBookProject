import { tween, styler, easing } from "popmotion";

class Animater {
  moveToRight(element, callback) {
    const elementStyler = styler(element);
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
    const elementStyler = styler(element);

    tween({
      from: { opacity: 0 },
      to: { opacity: 1 },
      duration: 2000,
      ease: easing.backOut
    }).start(elementStyler.set);
  }

  hideElement(element, callback) {
    const elementStyler = styler(element);

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

export default Animater;
