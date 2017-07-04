export const requestTimeout = (fn, delay) => {
  if (
    !window.requestAnimationFrame && !window.webkitRequestAnimationFrame && !(
      window.mozRequestAnimationFrame &&
      window.mozCancelRequestAnimationFrame
    ) && !window.oRequestAnimationFrame && !window.msRequestAnimationFrame
  ) {
    return window.setTimeout(fn, delay);
  }

  const start = new Date().getTime();
  const handle = {};

  function loop() {
    const current = new Date().getTime();
    const delta = current - start;

    if (delta >= delay) {
      fn.call();
    } else {
      handle.value = window.requestAnimationFrame(loop);
    }
  }

  handle.value = window.requestAnimationFrame(loop);
  return handle;
};

/* eslint-disable no-nested-ternary, no-unused-expressions */
export const clearRequestTimeout = (handle) => {
  window.cancelAnimationFrame ?
    window.cancelAnimationFrame(handle.value) :
    window.webkitCancelAnimationFrame ?
      window.webkitCancelAnimationFrame(handle.value) :
      window.webkitCancelRequestAnimationFrame ?
        window.webkitCancelRequestAnimationFrame(handle.value) :
        window.mozCancelRequestAnimationFrame ?
          window.mozCancelRequestAnimationFrame(handle.value) :
          window.oCancelRequestAnimationFrame ?
            window.oCancelRequestAnimationFrame(handle.value) :
            window.msCancelRequestAnimationFrame ?
              window.msCancelRequestAnimationFrame(handle.value) :
              clearTimeout(handle);
};
