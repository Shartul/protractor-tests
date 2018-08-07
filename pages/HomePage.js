//require('../elements/customlocators.js');
var basePage = require('../pages/BasePage');
var JSONReader = require('../treeMetaData');

HomePage = function () {

    this.pageLoaded = this.and(
        this.hasText($('title'))//Consumer Decision Tree
    );

    this.cards = function (text) {
        var cards = element.all(by.css('span.tileHeader'));
        return cards.getText();
    };

    this.clickatCard =  function(){
        for(var j=0;j<JSONReader.result.length;j++) {
            if (JSONReader.result[j].lockedByEmail = null) {
                var elements = element.all(by.css('span.tileHeader'));
                for(var k=0;j<elements.length;k++){
                    if (elements[k].getText().isEqualTo(JSONReader.result[j].name)){
                        browser.sleep(10000);
                        elements.get(k).click();
                        browser.sleep(10000);
                        console.log("The locked card name is" + elements[k].getText());
                    }
                }
            }

        }
    };

    this.searchlockedCard =  function(text) {
        for (var j = 0; j < JSONReader.result.length; j++) {
            if (JSONReader.result[j].lockedByEmail != null) {
                var elements = element.all(by.css('span.tileHeader'));
                for (var k = 0; j < elements.length; k++) {
                    if (JSONReader.result[j].name.isEqual(elements[k].getText())) {
                        browser.sleep(10000);
                        browser.refresh();
                        browser.sleep(5000);
                        var lockedstatus =JSONReader.result[j].name ;
                    }
                }

            }

        }return lockedstatus;

    };

    this.searchFor = function (text) {
        this.searchBox.sendKeys(text);
        this.hitEnter();
        browser.wait(this.isVisible(this.searchResultsPage), this.timeout.l);
    };
};
HomePage.prototype = basePage; //extending base page

module.exports = new HomePage();
