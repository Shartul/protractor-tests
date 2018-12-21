browser.ignoreSynchronization = true;
var basePage = require('../pages/BasePage');

var LoginPage = function() {

    this.userInput = element(by.name('USER'));
    this.passInput = element(by.name('PASSWORD'));
    this.loginButton = element(by.id('btnLogin'));
    this.myTool = element(by.id('el1'));
    this.CDT = element(by.id('lnk15')); //el15

    this.getLoginPageTitle = function () {
        return browser.getTitle();
    };

    this.loginAs = function(userObj) {
        this.login(userObj.username, userObj.password);
    };
    this.login = function(user, pass) {
        this.userInput.sendKeys(user);
        this.passInput.sendKeys(pass);
        this.loginButton.click();
    };
    this.selectCDT = function() {
        browser.actions()
            .mouseMove(this.myTool).perform();
        this.CDT.click();
        browser.ignoreSynchronization = 'true';
        browser.sleep(20000);

        var winHandles=browser.getAllWindowHandles();
        winHandles.then(function(handles)
        {
            var parentWindow=handles[0];
            var popUpWindow=handles[1];
            browser.switchTo().window(popUpWindow);
            browser.sleep(20000);
            browser.driver.manage().window().maximize();

            // browser.switchTo().window(parentWindow);
        })
    };
};
LoginPage.prototype = basePage; // extend basePage...
module.exports = new LoginPage();