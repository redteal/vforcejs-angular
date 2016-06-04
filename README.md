# vforcejs-angular

A working template for building a Visualforce+Angular SPA on a Salesforce public
site. Attempts to follow the [Angular 1.x Style Guide][style-guide] as closely as possible.

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
  "apexPrefix": "<prefix of controller, page, and static resource; eg. VForceJS>"
}
```

Next steps (of which will hopefully be automated in the future):

1. Create an Apex controller class with the name "(apexPrefix)Controller"
2. Create your public site with the configured sitePrefix variable
3. Create an Apex class named "(apexPrefix)UrlRewriter" using the
   code in `src/templates/UrlRewriter.cls`

Note: A Visualforce page and static resource bundle will be uploaded automatically,
so they do not need to be created.

### Development

Run `npm start`

Open your **public** Salesforce site.

Webpack will watch for changes and automatically hot-reload the page during
development.

**Note** there's a "Next Fib" button that makes a remote action call, and assumes
there is a "nextFib" `@RemoteAction` method defined in the Apex controller. This
is only for demonstration purposes.

```java
global with sharing class VForceJSController {

	@RemoteAction
	global static Double nextFib(Prev prev) {
		Double a = prev.a, b = prev.b;
		return a == null ? 1 : a + b;
	}

	global class Prev {
		global Double a;
		global Double b;
	}
}
```

### Production

Run `npm run build`. Builds and deploys page and resource bundle.

## Contributing

Pull requests are welcome! Code should pass tests and the ESLint style guide,
preferably with no warnings emitted.


[style-guide]: https://github.com/johnpapa/angular-styleguide/tree/master/a1
[Webpack]: http://webpack.github.io
