var loginPage = require('../pages/LoginPage');
var homePage = require('../pages/HomePage');
var editTreePage = require('../pages/EditTreePage');
var OR = require('../elements/OR.json');
var logger = require('../utils/log.js');
//var locator = require("../elements/uniqueLocator.js");
var userData = require('../utils/userData');
var JSONReader = require('../treeMetaData.json');



describe("CDT Navigation Bar Test", function() {
    beforeEach(function () {
        browser.ignoreSynchronization = true;
    });
    /*CDT-1: IE 11 popup and Chrome new tab navigation to CDT from answers dev portal site*/
    it("Validate navigation to CDT Home Page", function () {
        loginPage.to();
        expect(loginPage.getLoginPageTitle()).toEqual('Nielsen Answers Login');
        loginPage.loginAs(userData.testUser);
        loginPage.selectCDT();
        browser.sleep(10000);
        browser.isInternetExplorer = function () {
            loginPage.loginAs(userData.testUser);
        };
        expect(homePage.getHomePageTitle()).toEqual('Consumer Decision Tree');
    });


    /*CDT-8: Validation for Tree Navigation Bar*/
   /* it("Validate that Name of the application and its logo is displayed", function () {
        expect(homePage.getHomePageTitle()).toEqual('Consumer Decision Tree');
        console.log("Name of the application is displayed");
        homePage.navigationBar();

    });*/

    /*CDT-3: Validate tha Cards are displayed and count is verified */
    it("Validate the Card names on CDT Home Page", function () {
        homePage.cards().then(function (text) {
            console.log("Total : " + text.length);
            logger.log('info', 'Card names are saved');
            expect(text.length).toBe(text.count); //Jasmine test to check total card count
            logger.log('info', 'Card count is verified');
            browser.sleep(3000);
            console.log(text);
            logger.log('info', 'All card names are logged in the order');
        });
    });
    /*CDT-3: Verify that Tree are visible in alphabetical order on Home Page*/
    it("Validate that Card names are sorted", function () {
        var sorted = [],
            unSorted = [];
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
    /*CDT-4: Check the unlocked card name from API response and then use it to click and verify that card is locked */
    it("Validate that user can open the unlocked tree", function () {
        for (var j = 0; j < JSONReader.result.length; j++) {
            if (JSONReader.result[j].lockedByEmail === null) {
                break;
            }
        } var cardname = JSONReader.result[j].name;
        homePage.clickatUnlockCard(cardname);
        console.log("The locked card name is" + cardname);
        expect(editTreePage.getEditTreePageTitle()).toEqual(cardname);
    });

    /*CDT-5: Check the card name to reflect multiple categories with modifiedOn and updatedby*/
    it("Validate that card name to reflect multiple categories", function () {
        homePage.cards().then(function (text1) {
            homePage.cardcontent().then(function (text2) {
                homePage.modifieddate().then(function (text3) {
                    homePage.updateByName().then(function (text4) {
                        for (var i = 0; i < text1.length; i++) {
                            console.log(+ "|" + "|" + "|" + "|" + "|" + "|" + "|"   + "|" + "|" + "|" + "|" + "|" + "|"+ "|"+
                                "|" +   + "|" + "The Tree Name:----"     + text1[i] + "|" + "|" + "|" + "|" + "|" + "|" +"|"+
                                "|" +   + "|" + "|" + "|" + "|" + "|" + "|" + "|"   + "|" + "|" + "|" + "|" + "|" + "|" +"|"+
                                "|" +   + "|" + "DateModified on:----"   + text3[i] + "|" +"UpdateBy:----"+text4[i]+"|" +"|"+
                                "|" +   + "|" + "|" + "|" + "|" + "|" + "|" + "|"   + "|" + "|" + "|" + "|" + "|" + "|" +"|"+
                                "|" +   + "|" + "MultipleCategories----"  +text2[i] + "|" + "|" + "|" + "|" + "|" + "|" +"|"+
                                "|" +   + "|" + "|" + "|" + "|" + "|" + "|" + "|"   + "|" + "|" + "|" + "|" + "|" + "|" +"|"+
                                "|" +   + "|" + "|" + "|" + "|" + "|" + "|" + "|"   + "|" + "|" + "|" + "|" + "|" + "|" +"|"+
                                "|" +   + "|" + "|" + "|" + "|" + "|" + "|" + "|"   + "|" + "|" + "|" + "|" + "|" + "|" );
                        }
                        expect(homePage.getHomePageTitle()).toEqual('Consumer Decision Tree');
                    });
                });
            });
        });
    });
    /*CDT-5: Card names with Unclassified Product number are verfied */
    it("Validate that card name with unclassified names are displayed", function () {
        for (var j = 0; j < JSONReader.result.length; j++) {
            if (JSONReader.result[j].numberOfUnclassifiedProducts != null)
                console.log("The Tree with Unclassified Products are" +JSONReader.result[j].name + "Unclassified count is " + JSONReader.result[j].numberOfUnclassifiedProducts);
        }
        expect(homePage.getHomePageTitle()).toEqual('Consumer Decision Tree');
    });
    /*CDT-6: Each Tree on Home page has Kebab Menu with Copy Rename and Delete options*/
    it("Validate that kebab menu is displayed", function () {
        homePage.clickatKebabMenu();
        console.log("The Kebab Menu is clicked and open");
    });
});