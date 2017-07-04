let deviceProperties;

const initDeviceProperties = () => {
  const w = window;
  const d = document;
  const e = d.documentElement;
  const g = d.getElementsByTagName('body')[0];
  const W = w.innerWidth || e.clientWidth || g.clientWidth;
  const H = w.innerHeight || e.clientHeight || g.clientHeight;

  deviceProperties = {
    connection: navigator.connection ? navigator.connection : 'unknown',
    pixelRatio: window.devicePixelRatio,
    window: {
      width: W,
      height: H,
    },
  };
};

const getDeviceProperties = () => deviceProperties;

initDeviceProperties();

export default getDeviceProperties();
