var basePage = require('../pages/BasePage');
var JSONReader = require('../treeMetaData.json');


var EditTreePage =  function () {

    this.getEditTreePageTitle = function () {
        return browser.executeScript("return document.querySelector('nd-brand-bar').shadowRoot.getElementById('brandBarLight').shadowRoot.getElementById('ndToolbar').querySelector('#pageTitle').innerText");
    };
    this.backNavigation = function () {
        browser.executeScript("document.querySelector('nd-brand-bar').shadowRoot.getElementById('brandBarLight').shadowRoot.getElementById('ndToolbar').querySelector('#backNavigation').click()");
    };
    this.appIcon = function () {
        browser.executeScript("document.querySelector('nd-brand-bar').shadowRoot.getElementById('brandBarLight').shadowRoot.getElementById('ndToolbar').querySelector('#appIcon').click()");
    };

    this.hierarchy = function () {
        element.all(by.css('#productNameContainer')).then(function (elements) {
            for (var i = 0; i < 10; i++) {
                browser.sleep(3000);
                browser.executeScript("arguments[0].scrollIntoView();", elements[i]);
                elements[i].click();
                browser.sleep(3000);
                element.all(by.css('.sortIconDiv')).get(0).click();
                browser.sleep(3000);
                element.all(by.css('.sortIconDiv')).get(0).click();
                browser.sleep(3000);
                element(by.css('#unclassified')).click();
                browser.sleep(3000);
                element.all(by.css('.sortIconDiv')).get(1).click();
                browser.sleep(3000);
                element.all(by.css('.sortIconDiv')).get(1).click();
                browser.sleep(3000);
                element(by.css('#notSold')).click();
                browser.sleep(3000);
                element.all(by.css('.sortIconDiv')).get(2).click();
                browser.sleep(3000);
                element.all(by.css('.sortIconDiv')).get(2).click();
                browser.sleep(3000);
                element(by.css('#category')).click();
            }
            console.log("The total product is " + elements.length);
        });
    };
    this.clicktoExpandAll = function () {
        element(by.css("[icon='nlsn:expand']")).click();
        browser.sleep(3000);
    };
    this.clicktoCollapseAll = function () {
        element(by.css("[icon='nlsn:collapse']")).click();
    };

    this.clickatfirstLevel = function () {
        element.all(by.css('#productNameContainer')).then(function (elem) {
            browser.sleep(2000);
            browser.executeScript("arguments[0].scrollIntoView()", elem[0]);
            elem[0].click();
        });
    };

    this.clickatChangeKPI = function () {
        element(by.css("[icon='nlsn:edit_fill']")).click();
    };

    this.selecthighlevelunitcheckbox = function () {
        browser.executeScript("document.querySelector('.textDiv').querySelector('input').click()");
    };

    this.searchhierarchy = function () {
        element.all(by.css('.productName')).then(function () {
            for (var i = 0; i < 5; i++) {
                element(by.css('.treeSearchInput')).click();
                browser.sleep(2000);
                var searchproduct = element.all(by.css('.productName')).get(i).getText();
                element(by.css('.treeSearchInput')).sendKeys(searchproduct);
                browser.sleep(5000);
                element(by.css('.treeSearchInput')).click();
                browser.sleep(2000);
                element(by.css('.treeSearchInput')).clear();
                browser.sleep(20000);

            }
        });
    };

    this.clickatfilter = function () {
        element(by.css("[icon='nlsn:nlsn:filter']")).click();
    };
    this.clickandRename = function () {
        element.all(by.css('nd-icon-button')).then(function (elements) {
            for (var i = 0; i < 5; i++) {
                browser.sleep(20000);
                browser.executeScript("arguments[0].scrollIntoView();", elements[i]);
                elements[i].click();
                browser.sleep(3000);
                element.all(by.css('.rename')).get(i).click();
                browser.sleep(2000);
                element(by.css(".renameInput")).sendKeys(protractor.Key.BACK_SPACE);
                element(by.css(".renameInput")).sendKeys(protractor.Key.BACK_SPACE);
                element(by.css(".renameInput")).sendKeys(protractor.Key.BACK_SPACE);
                browser.sleep(5000);
                var errortext = element(by.css(".errorText")).getText();
                expect(errortext).toEqual('Must contain atleast 1 alpha character');
                element(by.css(".renameInput")).sendKeys("change of name");
                browser.sleep(2000);
                element(by.css("[icon='nlsn:toast_done']")).click();
                browser.sleep(2000);
            }
        });
    };
    this.selectaKPI = function () {
        browser.executeScript("document.querySelector('.productTableSection').querySelector('nd-dropdown-menu').click()");
        var kpiitems = document.querySelector('.productTableSection').querySelectorAll('nd-item');
        for (var i = 0; i < kpiitems; i++) {
            browser.executeScript("document.querySelector('.productTableSection').querySelectorAll('nd-item')[" + i + "]".click());
        }
    };

    this.hierarchychanges = function () {
        element.all(by.css('nd-icon-button')).then(function (elements) {
            for (var i = 1; i < 7; i++) {
                browser.sleep(3000);
                browser.executeScript("arguments[0].scrollIntoView();", elements[i]);
                elements[i].click();
                browser.sleep(5000);
                element.all(by.css('.addSiblingNode')).get(i).click();
                browser.sleep(5000);
                browser.executeScript("arguments[0].scrollIntoView();", elements[i]);
                elements[i].click();
                browser.sleep(5000);
                element.all(by.css('.addChildNode')).get(i).click();
                browser.sleep(5000);
                browser.executeScript("arguments[0].scrollIntoView();", elements[i]);
                elements[i].click();
                browser.sleep(5000);
                element.all(by.css('.highLevelNeedUnits')).get(i).click();
                browser.sleep(5000);
                browser.executeScript("arguments[0].scrollIntoView();", elements[i]);
                elements[i].click();
                browser.sleep(5000);
                element.all(by.css('.delete')).get(i).click();
            }
        });
    };
    this.scrolldown = function () {
        element(by.css("[icon='nlsn:expand']")).click();
        browser.sleep(3000);
        element.all(by.css('.productName')).then(function (ele) {
            for (var i = 0; i < ele.length; i++) {
                browser.executeScript("arguments[0].scrollIntoView()", ele[i]);
                browser.sleep(3000);
            }
        });
    };
    this.noProductmessage = function () {
        var noprod = element(by.css('.noProdText'));
        return noprod.getText();
    };

    this.selectnodemessage = function () {
        var selectnode = element(by.css('.infoText'));
        return selectnode.getText();
    };
    this.selectanothernode = function () {
        browser.sleep(2000);
        element.all(by.css('.productName')).get(0).click();
        browser.sleep(3000);
        var selectanothernode = element.all(by.css('.noProductsContent')).get(0);
        return selectanothernode.getText();
    };
    this.validateMove = function () {
        browser.sleep(2000);
        return browser.executeScript("return document.querySelector('.headerSection').querySelector('.buttonDiv').querySelectorAll('nd-button')[0].innerText");
    };
    this.validDeclassify = function () {
        browser.sleep(2000);
        return browser.executeScript("return document.querySelector('.headerSection').querySelector('.buttonDiv').querySelectorAll('nd-button')[1].innerText");
    };
    this.showAllunderBranch = function () {
        var showallunderbranch = element(by.css(".showAllText"));
        return showallunderbranch.getText();
    };

    this.selectshowAllunderBranch = function () {
        browser.executeScript("document.querySelector('nd-checkbox').shadowRoot.getElementById('checkbox').click()");
    };

    this.selectKPI = function() {
        //return browser.executeScript("document.querySelector('nd-dropdown-menu').shadowRoot.getElementById('menuButton').click()");
        browser.sleep(2000);
        browser.executeScript("document.querySelector('nd-item.iron-selected').click()");
    };
    this.selectlistofMetrics = function() {
        browser.sleep(2000);
        for (var i = 10; i < 18; i++) {
            browser.executeScript("document.querySelectorAll('nd-item')[" + i + "].click()");
                        browser.actions().mouseMove(element(by.css('.fullHeight.shareDiv.class2.whiteBorder'))).perform();
                        //.executeScript("arguments[0].scrollIntoView()",);
                        browser.sleep(3000);
                }
            };
};
EditTreePage.prototype = basePage; //extending base page

module.exports = new EditTreePage();
