# PIMD

<img src="https://travis-ci.org/hagenburger/pimd.svg?branch=master" alt="Build status (Travis CI)"> <img src="https://badges.greenkeeper.io/hagenburger/pimd.svg" alt="Dependency status (Greenkeeper)">
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


**P**rocessing **I**nstructions for **M**ark**D**own.

PIMD will be the base for the JavaScript version of [LivingStyleGuide] – an API to extend Markdown by DOM manipulations as known from the browsers.

#### Main targets

- Easy to use in JavaScript projects – in build tools and within the browser
- Focus on extendibility: The [DOM] tree known from the browser will be the main API
- Compliance with the [CommonMark specs] – Markdown files will render perfectly on GitHub; all additional commands will be CommanMark compliant and won’t leave ugly artifacts when used in `README.md` files on GitHub

[LivingStyleGuide]: https://github.com/livingstyleguide/livingstyleguide
[DOM]: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
[CommonMark specs]: https://commonmark.org


#### RailsGirls Summer of Code

This project is as part of [LivingStyleGuide] chosen for the [RailsGirls Summer of Code 2018]: Our team is @artnerdnet and @dianavile

[RailsGirls Summer of Code 2018]: https://railsgirlssummerofcode.org


#### Documentation

It’s part of the RailsGirls Summer of Code to [extend this Readme file](https://github.com/hagenburger/pimd/issues/12). This will be done when PIMD officially gets released. For now: **All functionality is documented in the tests** which you can find in the `tests` folder and `test.js` of each plugin found in `plugins/*`.


---


## Coding style

PIMD uses the [StandardJS] style.


---


## Copyright

Copyright 2018++ [Nico Hagenburger](https://www.hagenburger.net).
See [MIT-LICENSE](MIT-LICENSE) for details.
Get in touch with [@hagenburger](https://twitter.com/hagenburger) on Twitter or
[open an issue](https://github.com/hagenburger/pimd/issues/new).


[standardjs]: https://standardjs.com
