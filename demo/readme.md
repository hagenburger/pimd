# PIMD Live Demo

The PIMD Live Demo gives you the chance of trying out the Processing Instructions for Markdown in your browser.

**P**rocessing **I**nstructions for **M**ark**D**own.

PIMD will be the base for the JavaScript version of [LivingStyleGuide] – an API to extend Markdown by DOM manipulations as known from the browsers.

#### Main targets

- Easy to use in JavaScript projects – in build tools and within the browser
- Focus on extendibility: The [DOM] tree known from the browser will be the main API
- Compliance with the [CommonMark specs] – Markdown files will render perfectly on GitHub; all additional commands will be CommanMark compliant and won’t leave ugly artifacts when used in `README.md` files on GitHub

[livingstyleguide]: https://github.com/livingstyleguide/livingstyleguide
[dom]: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
[commonmark specs]: https://commonmark.org

## How to use it

You can use the Live Demo online or you can download it to your computer. If you wish to do so, clone the repository in this link and run in your terminal:

```
npm install
```

If you don’t have gulp installed globally, run:

```
npm install --global gulp-cli
```

You are ready to run the PIMD Live Demo, to start the Gulp build and server, run in your terminal:

```
Gulp
```

You can now test PIMD Live Demo in your browser. If you wish to modify the style go to `css/style.css`

## FAQ

#### Do you want to learn more, contact us or have more questions?

Visit our [website](http://www.livingstyleguide.org), join our [Slack Community](http://livingstyleguide.slack.com) or contact us on [Twitter](http://www.twitter.com/LSGorg)

#### Want to contribute, report a bug or request a feature?

Check out the PIMD [repository](https://github.com/hagenburger/pimd) and join our [Slack Community](http://livingstyleguide.slack.com). See the [issues](https://github.com/hagenburger/pimd/issues) with the “good first issue” label to get started

![Build status (Travis CI)](https://travis-ci.org/hagenburger/pimd.svg?branch=master)
![Dependency status (Greenkeeper)](https://badges.greenkeeper.io/hagenburger/pimd.svg)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-prettier-brightgreen.svg)](https://prettier.io)

## Copyright

Copyright 2018++ [Nico Hagenburger](https://www.hagenburger.net). See
[MIT-LICENSE](https://github.com/hagenburger/pimd/blob/master/MIT-LICENSE) for
details. Get in touch with [@hagenburger](https://twitter.com/hagenburger) on
Twitter or [open an issue](https://github.com/hagenburger/pimd/issues/new)
