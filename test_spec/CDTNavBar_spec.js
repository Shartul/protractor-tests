var loginPage =  require('../pages/LoginPage');
var homePage = require('../pages/HomePage');
var OR = require('../elements/OR.json');
var logger = require('../utils/log.js');
//var locator = require("../elements/uniqueLocator.js");
var userData = require('../utils/userData');


describe("CDT Navigation Bar Test",function() {

    beforeEach(function () {
        browser.ignoreSynchronization = true;
    });

    it("Validate navigation to CDT Home Page", function () {
        loginPage.to();
        expect(loginPage.getPageTitle()).toEqual('Nielsen Answers Login');
        //loginPage.as();
        loginPage.loginAs(userData.testUser);
        expect(homePage.getPageTitle()).toEqual('Consumer Decision Tree');

    });
    it("Validate the Card names on CDT Home Page", function () {
        homePage.cards().then(function (text) {
            console.log("Total : " + text.length);
            logger.log('info', 'Card names are saved');
            expect(text.length).toBe(7); //Jasmine test to check total card count
            logger.log('info', 'Card count is verified');
            browser.sleep(3000);
            console.log(text);
            logger.log('info', 'All card names are logged in console');
        });
    });

    it("Validate that Card names are sorted", function () {
        var sorted = [], unSorted = [];
        homePage.cards().map(function (eachName) {
            return eachName.getText().then(function (unSorted) {
                return unSorted;
            });
        }).then(function (unSorted) {
            var sorted = unSorted.slice();
            sorted = sorted.sort(); //sort the array
            console.log("These are sorted Cards:" + sorted);
            expect(sorted).toEqual(unSorted); //check if both sorted and unsorted arrays are same
            logger.log('info', 'Card names are sorted on CDT Home Page');
        });
    });
});