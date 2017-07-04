# UID skeleton v4

### Installation

Install [Yarn](https://yarnpkg.com/en/) if you don't have it yet!<br>
Once Yarn is installed run `yarn install` (or just `yarn`)!<br>
And that's it! 😎

### Available Yarn commands:
```json
{
    "deploy": "yarn run build-css-release && yarn run build-fonts && yarn run build-js-release && yarn run optimize-images-release && yarn run build-svg && yarn run build-html && yarn run deploy-files",
    "build": "yarn run build-css-release && yarn run build-fonts && yarn run build-js-release && yarn run optimize-images-release && yarn run build-svg && yarn run build-html",
    "build-with-inject": "yarn run build-css-release && yarn run build-js-release && yarn run optimize-images-release && yarn run build-svg && yarn run build-html && yarn run critical-css && yarn run inject-css",
    "build-css": "gulp postcss --lint true --production false",
    "build-css-nolint": "gulp postcss --lint false --production false",
    "build-css-release": "gulp postcss --lint true --production true",
    "build-js": "gulp webpack --lint true --production false",
    "build-js-nolint": "gulp webpack --lint false --production false",
    "build-js-release": "gulp webpack --lint true --production true",
    "build-svg": "gulp svg",
    "build-fonts": "gulp fonts",
    "build-html": "gulp pug",
    "deploy-files": "gulp deploy",
    "critical-css": "gulp critical",
    "inject-css": "gulp inject",
    "optimize-images": "gulp imagemin --production false",
    "optimize-images-release": "gulp imagemin --production true",
    "start": "yarn run build-css && yarn run build-js && gulp start",
    "watch": "gulp watch",
    "lint": "eslint src/js/**/*.js && stylelint src/css/**/*.pcss"
}
```

To build the project just run `yarn build`.<br>
To start the project on localhost (only static version) just run `yarn start`.

### SVG generation:
Size: 256x256 (viewbox)<br>
Always use presentation attributes and not styles!<br>
No clip paths!<br>
Add `-keepfill` postfix to keep fill rules (e.g. coloring)!

