var base = require('../pages/BasePage.js');
var homepage = require('../pages/HomePage.js');
var OR = require('../elements/OR.json');
var logger = require('../utils/log.js');
var locator = require("../elements/uniqueLocator.js");

describe("CDT Navigation Bar Test",function(){

    beforeEach(function() {
        browser.ignoreSynchronization = true;
    });

    it("Validate navigation to CDT Home Page",function(){

        //Test script ...

        base.navigateToURL(OR.testsiteurl);
        logger.log('info','Navigating to CDT app');
        browser.sleep(3000);

    });

    it("Validate the Card names on CDT Home Page",function(){

        element.all(by.css('span.tileHeader')).getText().then(function(text) {
        console.log("Total : " + text.length);
        logger.log('info','Card names are saved');
        expect(text.length).toBe(22); //Jasmine test to check total card count
        logger.log('info','Card count is verified');
        browser.sleep(3000);
        console.log(text);
        logger.log('info','All card names are logged in console');

        });

    });
    it("Validate that Card names are sorted",function() {
        var sorted = [], unSorted = [];
        var ele = element.all(by.css('span.tileHeader'));
        ele.map(function (eachName) {
            return eachName.getText().then(function (unSorted) {
                return unSorted;
                console.log("This is sorted Cards:" + unSorted);
                logger.log('info','UnSorted Cards are saved');
            });
        }).then(function (unSorted) {
            var sorted = unSorted.slice();
            sorted = sorted.sort(); //sort the array
            console.log("These are sorted Cards:" + sorted);
            expect(sorted).toEqual(unSorted); //check if both sorted and unsorted arrays are same
            logger.log('info','Card names are sorted on CDT Home Page');
        });
    });
});


