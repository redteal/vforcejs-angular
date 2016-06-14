const Jasmine = require('jasmine');
const SpecReporter = require('jasmine-spec-reporter');

const noop = () => {};

const jrunner = new Jasmine();
jrunner.configureDefaultReporter({ print: noop });
jasmine.getEnv().addReporter(new SpecReporter());
jrunner.loadConfig({
  spec_dir: './',
  spec_files: [
    'internals/**/*.spec.js',
  ],
});
jrunner.execute();
