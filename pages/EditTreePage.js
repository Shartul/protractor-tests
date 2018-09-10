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
        browser.sleep(2000);
        //browser.actions().mouseMove(element).perform();
        //browser.actions().sendKeys(protractor.Key.DOWN).perform();
        //browser.executeScript('window.scrollBy(0,500);');
        // browser.executeScript("arguments[0].scrollIntoView();", "document.querySelector('nd-brand-bar').querySelector('app-product-hierarchy-component').querySelector('#name5b92d721a1281e42b480875d')");
        //browser.executeScript("arguments[0].scrollIntoView();", elements[i]);
        //browser.sleep(3000);
    };
    this.clicktoCollapseAll = function () {
        //browser.executeScript('window.scrollTo(0,500)');
        element(by.css("[icon='nlsn:collapse']")).click();
    };

    this.clickatCL1 = function () {
        element.all(by.css('div#productNameContainer')).then(function (elem) {
            browser.executeScript("arguments[0].scrollIntoView()", elem[0]);
            elem[0].click();
            browser.sleep(30000);
        });
    };

    this.clickatChangeKPI = function () {
        element(by.css("[icon='nlsn:edit_fill']")).click();
    };
    this.showAllunderBranch = function () {
        var showallunderbranch = element(by.css("span.showAllText"));
        return showallunderbranch.getText();
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
};
EditTreePage.prototype = basePage; //extending base page

module.exports = new EditTreePage();
