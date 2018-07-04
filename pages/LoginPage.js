browser.ignoreSynchronization = true;
var basePage = require('../pages/BasePage.js');

var LoginPage = function() {

    this.userInput = element(by.name('USER'));
    this.passInput = element(by.name('PASSWORD'));
    this.loginButton = element(by.id('btnLogin'));

    this.loginAs = function(userObj) {
        this.login(userObj.username, userObj.password);
    };
    this.login = function(user, pass) {
        this.userInput.sendKeys(user);
        this.passInput.sendKeys(pass);
        this.loginButton.click();
    };

};
LoginPage.prototype = basePage; // extend basePage...
module.exports = new LoginPage();