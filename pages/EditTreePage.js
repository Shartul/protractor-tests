var basePage = require('../pages/BasePage');
var JSONReader = require('../treeMetaData.json');


var EditTreePage =  function () {

    this.getEditTreePageTitle = function () {
        return browser.executeScript("return document.querySelector('nd-brand-bar').shadowRoot.getElementById('brandBarLight').shadowRoot.getElementById('ndToolbar').querySelector('#pageTitle').innerText");
    };
    this.backNavigation = function () {
        browser.executeScript("document.querySelector('nd-brand-bar').shadowRoot.getElementById('brandBarLight').shadowRoot.getElementById('ndToolbar').querySelector('#backNavigation').click()");
    };


    this.edittab =  function(){
        var edittab = element(by.css('.editTab'));
        return edittab.getText();
    };
    this.visualizetab =  function(){
        var visualizetab = element(by.css('.visualizeTab'));
        return edittab.getText();
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
        browser.sleep(2000);
        for(var i=0; i<6;i++){
            browser.executeScript("document.querySelector('.productFilterContainer').querySelectorAll('nd-item')[" + i + "].click()");
            browser.sleep(3000);
        }

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
            for (var i = 1; i < 2; i++) {
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
   /* this.selectaKPI = function () {
        browser.executeScript("document.querySelector('.productTableSection').querySelector('nd-dropdown-menu').click()");
        var kpiitems = document.querySelector('.productTableSection').querySelectorAll('nd-item');
        for (var i = 0; i < kpiitems; i++) {
            browser.executeScript("document.querySelector('.productTableSection').querySelectorAll('nd-item')[" + i + "]".click());
        }
    };*/

    this.hierarchychanges = function () {
        element.all(by.css('nd-icon-button')).then(function (elements) {
            for (var i = 1; i < 2; i++) {
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
    this.KPISText =  function (){
        browser.sleep(2000);
        return browser.executeScript("return document.querySelector('nd-item.iron-selected').innerText");
    };
    this.selectKPI = function () {
        browser.sleep(2000);
        browser.executeScript("return document.querySelector('nd-item.iron-selected').click()");
    };

    this.ProductName =  function (){
        var productName = element.all(by.css('.productNameClass')).get(0);
        return  productName.getText();
    };
    this.hierrarchy =  function (){
      var hierrarchy =  element(by.css('.tableCellDiv.hierarchyHeaderDiv'));
      return hierrarchy.getText();

    };

    this.selectlistofMetrics = function () {
        browser.sleep(2000);
        for (var i = 10; i < 18; i++) {
            browser.executeScript("document.querySelectorAll('nd-item')[" + i + "].click()");
            browser.actions().mouseMove(element(by.css('.fullHeight.shareDiv.class2.whiteBorder'))).perform();
            //.executeScript("arguments[0].scrollIntoView()",);
            browser.sleep(3000);
        }
    };
    this.unclassifiedData = function () {
        element(by.css('#unclassified')).click();
        browser.sleep(3000);
        element.all(by.css('.productNameClass')).then(function (ele) {
            for (var i = 0; i < ele.length; i++) {
                browser.executeScript("arguments[0].scrollIntoView();", ele[ele.length - 10]);
                browser.sleep(3000);
            }
        });
    };
    this.save =  function() {
        browser.sleep(3000);
        element(by.css('.saveButton')).click();
    };
    this.saveFromList= function() {
        browser.sleep(3000);
        element(by.css('.saveIcon')).click();
        browser.executeScript("document.querySelectorAll('nd-item')[0].click()");

    };
    this.saveandclose = function (){
        browser.sleep(3000);
        element(by.css('.saveIcon')).click();
        browser.executeScript("document.querySelectorAll('nd-item')[1].click()");

    };

    this.searchProduct =  function(){
        browser.sleep(5000);
        element.all(by.css('.searchIcon')).get(0).click();
        browser.sleep(5000);
        element(by.css('.nameSearch')).sendKeys("Bar");
        browser.sleep(5000);
        element.all(by.css('.sortIconDiv')).get(0).click();
        browser.sleep(5000);
        element.all(by.css('.sortIconDiv')).get(0).click();
    };

    this.undoChanges =  function () {
        element.all(by.css('nd-icon-button')).then(function (elements) {
            for (var i = 1; i < 2; i++) {
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
                element(by.css(".renameInput")).sendKeys("CL" + [i]);
                browser.sleep(2000);
                element(by.css("[icon='nlsn:toast_done']")).click();
                browser.sleep(2000);
            }
        });
        element.all(by.css('.productName')).then(function () {
            for (var i = 0; i < element.length; i++) {
                if (element(by.css('.productName')).get(i).getText() === "Child of CL" + [i]) {
                    browser.sleep(3000);
                    browser.executeScript("arguments[0].scrollIntoView();", elements[i]);
                    element.all(by.css('nd-icon-button')).get(i).click();
                    element.all(by.css('.delete')).get(i).click();
                    browser.sleep(5000);
                }
            }
        });
        element.all(by.css('.productName')).then(function () {
            for (var i = 0; i < element.length; i++) {
                if (element(by.css('.productName')).get(i).getText() === "Sibling of CL" + [i]) {
                    browser.sleep(3000);
                    browser.executeScript("arguments[0].scrollIntoView();", elements[i]);
                    element.all(by.css('nd-icon-button')).get(i).click();
                    element.all(by.css('.delete')).get(i).click();
                    browser.sleep(5000);
                }
            }
        });
    };






};
EditTreePage.prototype = basePage; //extending base page

module.exports = new EditTreePage();
