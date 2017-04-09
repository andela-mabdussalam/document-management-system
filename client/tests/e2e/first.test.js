var config = require('../../../nightwatch.conf.js');

module.exports = { // adapted from: https://git.io/vodU0
  'Document Manager Title': (browser) => {
    browser
      .url('http://localhost:7070/login')
      .pause(1000)
      .waitForElementVisible('body')
      .assert.title('Document manager')
      .setValue('input[name="identifier"]', 'mariam3105@gmail.com')
      .setValue('input[type=password]', 'oluwakemi2012')
      .click('button[type=submit]')
      .pause(1000)
      .assert.urlEquals('http://localhost:7070/dashboard')
      .assert.elementPresent('#home')
      .assert.elementPresent('#myDocument')
      .assert.elementPresent('#createDocument')
      .assert.elementPresent('#manageUsers')
      .assert.elementPresent('#manageRoles')
      .assert.elementPresent('#pagination')
      .setValue('input[name=search]', 'the')
      .click('button[id=search]')
      .assert.elementPresent('#gridlist')
      .click('button[id=search]')
      .assert.elementPresent('#gridlist')
      .setValue('input[name=search]', 'jhydnk')
      .click('button[id=search]')
      .click('button[id=reset]')
      .pause(1000)
      .assert.elementPresent('#gridlist')
      .end();
  }
};
