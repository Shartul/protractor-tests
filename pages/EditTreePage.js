var basePage = require('../pages/BasePage');
var JSONReader = require('../treeMetaData.json');


var EditTreePage;
EditTreePage = function () {

    this.getEditTreePageTitle = function () {
        return browser.executeScript("return document.querySelector('nd-brand-bar').shadowRoot.getElementById('brandBarLight').shadowRoot.getElementById('ndToolbar').querySelector('#pageTitle').innerText");
    };
    this.backNavigation = function () {
        browser.executeScript("document.querySelector('nd-brand-bar').shadowRoot.getElementById('brandBarLight').shadowRoot.getElementById('ndToolbar').querySelector('#backNavigation').click()");
    };


    this.edittab = function () {
        var edittab = element(by.css('.editTab'));
        return edittab.getText();
    };
    this.visualizetab = function () {
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

    this.clickatLevel = function (n) {
        element.all(by.css('#productNameContainer')).then(function (elem) {
            browser.sleep(2000);
            browser.executeScript("arguments[0].scrollIntoView()", elem[n]);
            elem[n].click();
        });
    };


    this.clickatChangeKPI = function () {
        element(by.css("[icon='nlsn:edit_fill']")).click();
        browser.sleep(2000);
        for (var i = 0; i < 6; i++) {
            browser.executeScript("document.querySelector('.productFilterContainer').querySelectorAll('nd-item')[" + i + "].click()");
            browser.sleep(3000);
        }

    };
    this.localCurrency = function(){
        element(by.css("[icon='nlsn:edit_fill']")).click();
        browser.sleep(2000);
        browser.executeScript("document.querySelector('.productFilterContainer').querySelectorAll('nd-item')[2].click()");
        return browser.executeScript("return document.querySelector('.productFilterContainer').querySelectorAll('nd-item')[2].innerText");
    };

    this.productData = function(){
        element(by.css('.productData')).then(function (ele) {
            for (var i = 0; i < ele.length; i++) {
                var salesNumber = element.all(by.css('.productData')).get(i).getText();
                var currency = salesNumber.charAt(0);
            }
            return currency.getText();
        });

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
    this.clickMove = function () {
        browser.sleep(2000);
        return browser.executeScript("return document.querySelector('.headerSection').querySelector('.buttonDiv').querySelectorAll('nd-button')[0].click()");
    };
    this.validateCancel = function () {
        browser.sleep(2000);
        return browser.executeScript("return document.querySelector('.headerSection').querySelector('.buttonDiv').querySelectorAll('nd-button')[3].innerText");
    };
    this.clickCancel = function () {
        browser.sleep(2000);
        return browser.executeScript("return document.querySelector('.headerSection').querySelector('.buttonDiv').querySelectorAll('nd-button')[3].click()");
    };
    this.validateMoveProductHere = function(){
        browser.sleep(2000);
        return browser.executeScript("return document.querySelector('.headerSection').querySelector('.buttonDiv').querySelectorAll('nd-button')[4].innerText");
    };

    this.clickMoveProductHere = function(){
        browser.sleep(2000);
        return browser.executeScript("return document.querySelector('.headerSection').querySelector('.buttonDiv').querySelectorAll('nd-button')[4].click()");
    };
    this.selectProductHierarchy = function () {
        browser.sleep(2000);
        element.all(by.css('.checkBoxDiv')).then(function (ele) {
            for (var i = 1; i < 3; i++) {
                browser.executeScript("arguments[0].scrollIntoView();", ele[i]);
                ele[i].click();
                browser.sleep(3000);
            }
        });
    };
    this.goDown =  function() {
        element.all(by.css("[icon='nlsn:tree_close']")).then(function (ele) {
            for (var i = 0; i < ele.length(); i++) {
                browser.executeScript("arguments[0].scrollIntoView()", ele[i]);
                ele[i].click();
                browser.sleep(3000);
            }
        });
    };
    this.selectFolder = function () {
        element.all(by.css("[icon='nlsn:folder']")).then(function (ele) {
            for (var i = 0; i < ele.length(); i++) {
                browser.executeScript("arguments[0].scrollIntoView()", ele[i]);
                ele[i].click();
                browser.sleep(3000);
            }
        });
    };
    this.goUp = function(){
        element(by.css("[icon='nlsn:back']")).click();
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
    this.KPISText = function () {
        browser.sleep(2000);
        return browser.executeScript("return document.querySelector('nd-item.iron-selected').innerText");
    };
    this.selectKPI = function () {
        browser.sleep(2000);
        browser.executeScript("return document.querySelector('nd-item.iron-selected').click()");
    };

    this.clickAllproduct = function () {
        element.all(by.css('.productNameClass')).then(function (ele) {
            for (var i = 1; i < ele.length(); i++) {
                browser.executeScript("arguments[0].scrollIntoView()", ele[i]);
                ele[i].click();
                browser.sleep(3000);
            }
        });
    };
    this.clickatGivenProduct = function(n){
        element.all(by.css('.productNameClass')).then(function (ele) {
                browser.executeScript("arguments[0].scrollIntoView()", ele[n]);
                ele[n].click();
                browser.sleep(3000);
        });
    };

    this.productName = function(){
        var header = element(by.css('.header'));
        var arr = header.split('|');
            var productName = arr[0].trim();
        return productName.getText();
    };

    this.productCode = function(){
        var header = element(by.css('.header'));
        var arr = header.split('|');
        var productCode = arr[1].trim();
        return productCode.getText();
    };



    this.attrubuteLabel = function(){
        element.all(by.css('.attrLabel')).then(function (ele) {
            for (var i = 1; i < ele.length(); i++) {
                browser.executeScript("arguments[0].scrollIntoView()", ele[i]);
                var prodattribute = ele[i].innerText;
                browser.sleep(3000);
            }
            return prodattribute.getText();
        });
    };

    this.rightClick = function(){
          var ele = element(by.css('.productImage'));
        browser.actions().mouseMove(ele).perform();
       if( browser.actions().click(protractor.Button.RIGHT).perform().isEnabled()){
           console.log('The right click is Enabled on the Product Image');
       }else {
           console.log('The right click is Disabled on the Product Image');
       }
       browser.sleep(3000)
    };
    this.clickCloseIcon = function(){
      element(by.css("[icon='nlsn:close']")).click();
      browser.sleep(5000);
    };

    this.clickoKButton = function (){
        element(by.css('.okButton')).click();
    };


    this.imageCaption = function(){
        var imgCaption = element(by.css('.imageCpation'));
        return imgCaption.getText();

    };

    this.hierrarchy = function () {
        var hierrarchy = element(by.css('.tableCellDiv.hierarchyHeaderDiv'));
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

    this.totalSalesMetric = function(){
        browser.sleep(2000);
        browser.executeScript("document.querySelectorAll('nd-item')[13 ].click()");
        browser.sleep(2000);
        return browser.executeScript("return document.querySelectorAll('nd-item')[13].innerText");
    };

    this.kpiDivData = function(){
        element(by.css('.kpiDiv')).then(function (ele) {
            for (var i = 0; i < ele.length; i++) {
                var salesNumber = element.all(by.css('.kpiDiv')).get(i).getText();
                var kpiSales = salesNumber.charAt(0);
            }
            return  kpiSales.getText();
        });

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
        this.save = function () {
            browser.sleep(3000);
            element(by.css('.saveButton')).click();
        };
        this.saveFromList = function () {
            browser.sleep(3000);
            element(by.css('.saveIcon')).click();
            browser.executeScript("document.querySelectorAll('nd-item')[0].click()");

        };
        this.saveandclose = function () {
            browser.sleep(3000);
            element(by.css('.saveIcon')).click();
            browser.executeScript("document.querySelectorAll('nd-item')[1].click()");

        };
        this.doChanges = function () {
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
                }
            });
        };
        this.closeafterchanges = function () {
            element(by.css('nd-icon#R1542607647750')).click();
        };
        this.cancel = function () {
            browser.executeScript("document.querySelectorAll('nd-button')[0].click()");
            browser.sleep(2000);
        };
        this.closeandDontSave = function () {
            browser.executeScript("document.querySelectorAll('nd-button')[1].click()");
            browser.sleep(5000);
        };
        this.saveNClose = function () {
            browser.executeScript("document.querySelectorAll('nd-button')[2].click()");
            browser.sleep(5000);
        };
        this.selectPublish = function () {
            browser.executeScript("document.querySelectorAll('nd-button')[3].click()");
            browser.sleep(5000);
        };
        this.selectValidate = function () {
            browser.executeScript("document.querySelectorAll('nd-button')[4].click()");
            browser.sleep(5000);
        };

        this.searchProduct = function () {
            browser.sleep(5000);
            element.all(by.css('.searchIcon')).get(0).click();
            browser.sleep(5000);
            element(by.css('.nameSearch')).sendKeys("Bar");
            browser.sleep(5000);
            element.all(by.css('.sortIconDiv')).get(0).click();
            browser.sleep(5000);
            element.all(by.css('.sortIconDiv')).get(0).click();
        };

        this.undoChanges = function () {
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
