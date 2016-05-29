# vforcejs-angular

A working template for building a Visualforce+Angular SPA on a Salesforce public site.

## Features

- ES2015 (Babel)
- [Webpack](http://webpack.github.io) (with code-splitting)
- AngularJS 1.x (with lazy loading)
- Apex Javascript Remoting
- Hot reloading during development (via [ngrok](https://ngrok.com) proxy)
- HTML5 URL routing ([angular-ui-router](https://github.com/angular-ui/ui-router))
- [Karma](https://karma-runner.github.io) unit test runner (with PhantomJS browser)
- [Twitter Bootstrap](http://getbootstrap.com)
- [FontAwesome](http://fontawesome.io/)
- [Sass](http://sass-lang.com) stylesheets
- PostCSS runners ([cssnext](http://cssnext.io), [focus](https://github.com/postcss/postcss-focus))
- [ESLint](http://eslint.org) and [JSCS](http://jscs.info) syntax checkers

## Install

Clone this repository, then run install to retrieve dependencies:

```bash
npm install
```

### Config

Create the config file. At some point in the future, this will be done through a script.
But for now it is a manual step.

*\<root>/.config.json*
```json
{
  "loginUrl": "https://login.salesforce.com",
  "username": "<username>",
  "password": "<password>",
  "token": "<security token>",
  "appTitle": "<page title of app>",
  "sitePrefix": "<site path prefix; eg: vforcejs>",
  "apexPrefix": "<prefix of controller, page, and static resource; eg: VForceJS>"
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

Webpack will watch for changes and automatically hot-reload the page during development.

**Note**: there's currently a "myAction" link that assumes that there is a "myAction" `@RemoteAction`
method defined in the Apex controller.

### Production

Run `npm run build`

## Contributing

Pull requests are welcome. Code should pass tests and style guides with no warnings emitted.
