//require('../elements/customlocators.js');
var basePage = require('../pages/BasePage');

var HomePage = function() {

    this.pageLoaded = this.and(
        this.hasText($('title'))//Consumer Decision Tree
    );

    this.cards = function () {
        var cards = element.all(by.css('span.tileHeader'));
        return cards.getText();
    };

    this.searchFor = function(text) {
        this.searchBox.sendKeys(text);
        this.hitEnter();
        browser.wait(this.isVisible(this.searchResultsPage), this.timeout.l);
    };
};
HomePage.prototype = basePage; //extending base page

module.exports = new HomePage();
