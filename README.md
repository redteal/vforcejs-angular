# vforcejs-angular

A working template for building a Visualforce+Angular SPA on a Salesforce public
site. Attempts to follow the [Angular 1.x Style Guide][style-guide] as closely as possible.

[Demo](https://vforcejs-developer-edition.na30.force.com/vforcejs)

## Features

- ES2015 (Babel)
- [Webpack] (with code-splitting examples)
- AngularJS 1.x
- Configurable CDN resources
- Promisified Apex Javascript Remoting
- Hot reloading during development (via [ngrok](https://ngrok.com) proxy)
- HTML5 URL routing ([angular-ui-router](https://github.com/angular-ui/ui-router))
- [Jasmine](http://jasmine.github.io/) test framework and [Karma](https://karma-runner.github.io) runner
- [Twitter Bootstrap](http://getbootstrap.com)
- [FontAwesome](http://fontawesome.io/)
- [Sass](http://sass-lang.com) stylesheets
- PostCSS runners ([cssnext](http://cssnext.io), [focus](https://github.com/postcss/postcss-focus))
- [ESLint](http://eslint.org) syntax and code style checks

## Install

Clone this repository, then run install to retrieve dependencies:

```bash
npm install
```

### Config

Create the config file. At some point in the future, this will be done through a script.
But for now it is a manual step.

*\<root>/.jsforce.config.json*
```json
{
  "loginUrl": "https://login.salesforce.com",
  "username": "<username>",
  "password": "<password>",
  "token": "<security token>"
}
```
*\<root>/.config.json*
```json
{
  "appTitle": "<page title of app>",
  "sitePrefix": "<site path prefix; eg. vforcejs>",
  "apexPrefix": "<prefix of controller, page, and static resource; eg. VForceJS>",
  "apiVersion": "<sfdc api version; eg. 35.0>"
}
```

### Development

Run `npm start`

This command will take the following steps:

1. Opens a connection to the configured org
2. Opens a public ngrok connection and starts an Express server Webpack middleware
3. Compiles the bundled app sources
4. Deploys the bundle
5. If it does not exist, creates `VForceJSUrlRewriter.cls`
6. If it does not exist, creates a default `<apexPrefix>Controller.cls`
7. Deploys the compiled ApexPage named as the configured apexPrefix

Now, open your *public* Salesforce site.

Webpack will watch for changes related to the app and automatically recompile and
hot-reload the page, and re-deploy the Visualforce page when necessary. Bundle
sources will be publicly served from the local Webpack server via ngrok.

### Production

Run `npm run build`. Builds and deploys page and resource bundle.

## Contributing

Pull requests are welcome! Code should pass tests and the ESLint style guide,
preferably with no warnings emitted.

[style-guide]: https://github.com/johnpapa/angular-styleguide/tree/master/a1
[Webpack]: http://webpack.github.io
