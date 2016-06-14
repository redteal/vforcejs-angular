require('babel-polyfill');
const chalk = require('chalk');
const inquirer = require('inquirer');
const jsforce = require('jsforce');
const logger = require('../logger');
const Store = require('jfs');
const yargs = require('yargs');

const argv = yargs
  .option('c', {
    alias: 'connection',
    describe: 'Name of a pre-configured connection',
    type: 'string',
  })
  .argv;

const db = new Store('./.jsforce.config.json', { single: false, pretty: true });

const CREATE_NEW = 'Create New';

class Configure {

  get connections() {
    let res = db.getSync('connections');
    if (res instanceof Error) {
      db.saveSync('connections', res = []);
    }
    return res;
  }

  set connections(value) {
    db.saveSync('connections', value);
  }

  get serverList() {
    return [CREATE_NEW].concat(this.connections.map(c => c.alias).filter(n => !!n));
  }

  findConnection(alias) {
    const connections = db.getSync('connections');
    return connections.find(c => c.alias === alias);
  }

  testConnection({ loginUrl, username, password, securityToken }) {
    const conn = new jsforce.Connection({ loginUrl });
    return conn.login(username, password + securityToken);
  }

  creds() {
    return new Promise((resolve, reject) => {
      if (this.serverList.includes(argv.c)) {
        resolve(this.findConnection(argv.c));
      } else {
        this.promptCreds(resolve, reject);
      }
    });
  }

  promptCreds(resolve) {
    let _answers;
    const doPrompt = answers => (_answers = answers) && answers.chosen_alias === CREATE_NEW;

    const prompts = [{
      type: 'list',
      name: 'chosen_alias',
      message: 'Choose which connection to use:',
      choices: this.serverList,
      default: CREATE_NEW,
      when: () => !this.serverList.includes(argv.c),
    }, {
      type: 'input',
      name: 'alias',
      message: 'Enter a unique alias for this connection:',
      validate: input => input.length > 0 && !this.serverList.includes(input),
      when: doPrompt,
    }, {
      type: 'input',
      name: 'loginUrl',
      message: 'Enter the login URL:',
      default: 'https://test.salesforce.com',
      validate: input => input.startsWith('https://'),
      when: doPrompt,
    }, {
      type: 'input',
      name: 'username',
      message: 'Enter your username:',
      validate: input => input.length > 0,
      when: doPrompt,
    }, {
      type: 'password',
      name: 'password',
      message: 'Enter your password:',
      validate: input => input.length > 0,
      when: doPrompt,
    }, {
      type: 'input',
      name: 'securityToken',
      message: 'Enter your security token:',
      validate: input => input.length > 0,
      when: doPrompt,
    }];
    inquirer.prompt(prompts).then((answers) => {
      if (!_answers) {
        answers = { chosen_alias: argv.c };
      }
      let creds;
      if (answers.chosen_alias === CREATE_NEW) {
        creds = answers;
      } else {
        const connection = this.findConnection(answers.chosen_alias);
        creds = connection;
      }
      this.testConnection(creds).then(() => resolve(answers)).catch((err) => {
        logger.error(chalk.red(err.message));
        return this.creds();
      });
    });
  }

  app() {
  }
  cdn() {
  }

  run() {
    return this.creds().then((answers) => {
      const connections = this.connections;
      connections.forEach(c => (c.active = false));
      if (answers.chosen_alias === CREATE_NEW) {
        connections.push({
          active: true,
          alias: answers.alias,
          loginUrl: answers.loginUrl,
          username: answers.username,
          password: answers.password,
          securityToken: answers.securityToken,
        });
      } else {
        connections.find(c => c.alias === answers.chosen_alias).active = true;
      }
      db.saveSync('connections', connections);
    });
  }
}

module.exports.Configure = Configure;

const configure = new Configure();
configure.run();
