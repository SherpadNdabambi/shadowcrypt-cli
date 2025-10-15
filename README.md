<!-- Top anchor -->
<div id="top">

<!-- Project Shields -->

<div align=center>

[![Contributors shield][Contributors shield url]][Contributors url]
[![Issues shield][Issues shield url]][Issues url]
[![License shield][License shield url]][License url]

</div>

<div align=center>

[![ShadowCrypt CLI logo][Logo url]][Repo url]

</div>

<div align=center>

# ShadowCrypt CLI

</div>

## Table of Contents

<details>

   <summary>Contents</summary>

1. [About](#about)
   1. [Built With](#built-with)
1. [How to Install](#how-to-install)
   1. [Prerequisites](#prerequisites)
   1. [Installation](#installation)
1. [Usage](#usage)
1. [Roadmap](#roadmap)
1. [Contributing](#contributing)
1. [Changelog](#changelog)
1. [Contact Me](#contact-me)
1. [License](#license)
1. [Acknowledgments](#acknowledgments)

</details>

## About

Node.js CLI utility to encrypt and decrypt files with various symmetric ciphers.

[![ShadowCrypt CLI screenshot][ShadowCrypt CLI screenshot url]][ShadowCrypt CLI url]

<div align=right>

([back to top](#top))

</div>

### Built With

[![Node.js shield][Node.js shield url]][Node.js url]
[![Typescript][Typescript shield url]][Typescript url]

<div align=right>

([back to top](#top))

</div>

## How to Install

To install ShadowCrypt CLI, follow these simple steps.

### Prerequisites

Make sure you have the following packages installed globally on your machine to use this template.

1. [Node.js 20.6.0+][Node.js url]. The latest Node.js version known to work with ShadowCrypt CLI is v24.10.0 (Run `nvm use` (if using nvm) to switch to v24.10.0.).
1. [npm][npm url].

### Installation

1. Run the installation command to install ShadowCrypt CLI:

   ```sh
   npm install --global shadowcrypt-cli
   ```

<div align=right>

([back to top](#top))

</div>

## Usage

To encrypt a file, run:

```sh
shadowcrypt-cli encrypt <source_filename> --outFile <destination_filename>
```

To decrypt a file, run:

```sh
shadowcrypt-cli decrypt <source_filename> --outFile <destination_filename>
```

_For more examples, please refer to the [Documentation][Documentation url]_

<div align=right>

([back to top](#top))

</div>

## Roadmap

- [ ] Add AES Encryption
  - [ ] Support multiple modes (CBC, GCM, CTR)
  - [ ] Key derivation with PBKDF2
- [ ] Add ChaCha20-Poly1305 support
  - [ ] Authenticated encryption
- [ ] Add Camellia support
  - [ ] Various key sizes (128, 192, 256 bits)
- [ ] Add ARIA support
  - [ ] Integration with Node.js crypto module
- [ ] Add batch processing for multiple files

See the [open issues][Issues url] for a full list of proposed features (and known issues).

<div align=right>

([back to top](#top))

</div>

## Contributing

To add a feature or fix a bug, fork the repo and create a pull request.

Example instructions to add a feature:

1. Fork the Project
1. Create your Feature Branch (`git checkout -b feature/amazing-feature-YourName`)
1. Commit your Changes (`git commit -m 'Add some amazing feature'`)
1. Push to the Branch (`git push origin feature/amazing-feature-YourName`)
1. Open a Pull Request

To suggest a new feature or report a bug, open an issue.

<div align=right>

([back to top](#top))

</div>

## Changelog

See the changelog [here][changelog url].

<div align=right>

([back to top](#top))

</div>

## Contact Me

Sherpad Ndabambi

<span title="Personal website">[<img alt="Website icon" src="./assets/img/website-ui-web-svgrepo-com.svg" style="height: 32px">][Personal website url]</span>
<span title="Email">[<img alt="Gmail icon" src="./assets/img/gmail-old-svgrepo-com.svg" style="height: 32px">][Email address]<span>

<div align=right>

([back to top](#top))

</div>

## License

Distributed under the ISC License. See [LICENSE][License url] for more information.

<div align=right>

([back to top](#top))

## Acknowledgments

1. [Website icon][Website icon url] edited from [Website SVG vector][Website SVG vector url] from [SVG Repo][SVG Repo url].

1. [Gmail icon][Gmail icon url] edited from [Gmail SVG vector][Gmail SVG vector url] from [SVG Repo][SVG Repo url].

1. Images in this project have been compressed using [TinyPNG][TinyPNG url].

1. Parts of this README are based on the [Best-README-Template][Best-README-Template url] template.

<div align=right>

([back to top](#top))

</div>

<!-- References -->

[Contributors shield url]: https://img.shields.io/github/contributors/sherpadndabambi/shadowcrypt-cli.svg?style=flat
[Contributors url]: https://github.com/sherpadndabambi/shadowcrypt-cli/graphs/contributors
[Issues shield url]: https://img.shields.io/github/issues/sherpadndabambi/shadowcrypt-cli.svg?style=flat
[Issues url]: https://github.com/sherpadndabambi/shadowcrypt-cli/issues
[License shield url]: https://img.shields.io/github/license/sherpadndabambi/shadowcrypt-cli
[License url]: ./LICENSE
[Logo url]: ./assets/img/logo.svg
[Repo url]: https://github.com/sherpadndabambi/shadowcrypt-cli/
[Node.js shield url]: https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white
[Node.js url]: https://nodejs.org/
[ShadowCrypt CLI screenshot url]: ./assets/img/og-image.png
[ShadowCrypt CLI url]: https://github.com/sherpadndabambi/shadowcrypt-cli/
[HTML5 shield url]: https://img.shields.io/badge/HTML5-e54c22?style=for-the-badge&logo=html5&logoColor=white
[HTML5 url]: https://html.spec.whatwg.org/multipage/
[Bootstrap shield url]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Node.js url]: https://getbootstrap.com
[CSS3 shield url]: https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white
[CSS3 url]: https://www.w3.org/TR/CSS/#css
[Typescript shield url]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[Typescript url]: https://www.typescriptlang.org/
[jQuery shield url]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[jQuery url]: https://jquery.com/
[Node.js url]: https://nodejs.org/
[npm url]: https://www.npmjs.com/
[latest release url]: https://github.com/sherpadndabambi/shadowcrypt-cli/releases/latest
[Documentation url]: https://sherpadndabambi.github.io/shadowcrypt-cli/
[changelog url]: ./CHANGELOG.md
[Personal website url]: https://sherpadndabambi.github.io/
[Email address]: mailto:sgndabambi@gmail.com
[Window Vector SVG Icon url]: https://www.svgrepo.com/svg/362186/window
[Public Domain License url]: https://creativecommons.org/publicdomain/zero/1.0/deed.en
[SVG Repo url]: https://www.svgrepo.com/
[Node.js® Mascot url]: https://nodejs.org/static/images/node-mascot.svg
[Angela Angelini LinkedIn public profile URL]: https://www.linkedin.com/in/angeliningl/
[Node.js® Light Horizontal Logo url]: https://nodejs.org/static/logos/nodejsLight.svg
[Website icon url]: ./assets/img/website-ui-web-svgrepo-com.svg
[Website SVG vector url]: https://www.svgrepo.com/svg/415803/website-ui-web
[Gmail icon url]: ./assets/img/gmail-old-svgrepo-com.svg
[Gmail SVG vector url]: https://www.svgrepo.com/svg/349379/gmail-old
[TinyPNG url]: https://tinypng.com/
[Best-README-Template url]: https://github.com/othneildrew/Best-README-Template
