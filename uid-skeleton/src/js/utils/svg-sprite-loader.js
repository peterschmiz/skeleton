import 'whatwg-fetch';

const addSpriteToDOM = (sprite) => {
  const svgElement = document.createElement('div');

  svgElement.style.display = 'none';
  svgElement.innerHTML = sprite;
  document.body.appendChild(svgElement);
};

const loadSvgSprite = () => {
  const svgUrl = document.body.getAttribute('data-svg-url') || '/images/svg-sprite.svg';

  fetch(svgUrl)
    .then(response => (response.text()))
    .then((body) => {
      addSpriteToDOM(body);
    });
};

export default loadSvgSprite;
