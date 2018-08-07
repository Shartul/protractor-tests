var loginPage = require('../pages/LoginPage');
var homePage = require('../pages/HomePage');
var editTreePage = require('../pages/EditTreePage');
var OR = require('../elements/OR.json');
var logger = require('../utils/log.js');
//var locator = require("../elements/uniqueLocator.js");
var userData = require('../utils/userData');



describe("Edit Tree page validations", function() {

    beforeEach(function () {
        browser.ignoreSynchronization = true;
    });

    it("Validate that other user can access the locked tree", function () {
        loginPage.to();
        expect(loginPage.getPageTitle()).toEqual('Nielsen Answers Login');
        loginPage.loginAs(userData.lockedUser);
        loginPage.selectCDT();
        browser.sleep(5000);
        browser.isInternetExplorer = function () {
            loginPage.loginAs(userData.lockedUser);

        };
        expect(homePage.getPageTitle()).toEqual('Consumer Decision Tree');
        homePage.searchlockedCard().then(function (text) {
            //expect(text).toEqual('Locked by');
            console.log('Locked card is ' + text);
            logger.log('info', 'Locked status of the card is verified');
        });
    });


});

