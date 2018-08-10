//require('../elements/customlocators.js');
var basePage = require('../pages/BasePage');
var JSONReader = require('../treeMetaData.json');

HomePage = function () {

    this.getHomePageTitle = function () {
        return browser.getTitle();
    };

    this.cards = function () {
        var cards = element.all(by.css('span.tileHeader'));
        return cards.getText();
    };
    this.clickatUnlockCard = function (tileText) {
        element.all(by.css('span.tileHeader')).filter(function (elem) {
            return elem.getText().then(function (text) {
                return text === tileText;
            });
        }).then(function (filteredElements) {
            browser.sleep(20000);
            browser.executeScript("arguments[0].scrollIntoView();", filteredElements[0]);
            filteredElements[0].click();
            browser.sleep(50000);
        });
    };
    this.searchlockedCard = function (text) {
        for (var j = 0; j < JSONReader.result.length; j++) {
            if (JSONReader.result[j].lockedByEmail = 'null') {
                var elements = element.all(by.css('span.tileHeader'));
                for (var k = 0; j < elements.length; k++) {
                    if (JSONReader.result[j].name.isEqual(elements[k].getText())) {
                        browser.sleep(10000);
                        browser.refresh();
                        browser.sleep(5000);
                        var lockedstatus = JSONReader.result[j].name;
                    }
                }

            }

        }
        return lockedstatus;

    };
    this.cardcontent = function() {
        var cardcontent = element.all(by.css('span.tileContentText'));
            return cardcontent.getText();
    };

    this.modifieddate = function() {
        var modifieddate = element.all(by.css('span.updateDate'));
        return modifieddate.getText();
    };

    this.updateByName = function() {
        var updateByName = element.all(by.css('span.updateBy'));
        return updateByName.getText();
    };

    this.unclassifiedcount = function() {
        var unclassifiedcount = element.all(by.css('span.unClassifiedCount'));
        return unclassifiedcount.getText();
    };

    this.unclassified = function() {
        var unclassified = element.all(by.css('div.unClassifiedContentDiv'));
        return unclassified.getText();
    };

    this.searchFor = function (text) {
        this.searchBox.sendKeys(text);
        this.hitEnter();
        browser.wait(this.isVisible(this.searchResultsPage), this.timeout.l);
        };
};
HomePage.prototype = basePage; //extending base page

module.exports = new HomePage();
