
var BasePage = function() {

    this.url = 'https://answersdev.nielsen.com';     ;// 'https://dc2.answersqc.nielsen.com/cdt/ui/';
    this.at = function() {
        return browser.wait(this.pageLoaded(), this.timeout.xl);
    };


    this.getPageTitle = function () {
        return browser.getTitle();
    };

    this.to = function () {
        browser.get(this.url);
        //return this.at();
    };

    this.inputText = function (element, value) {
        element.clear();
        element.sendKeys(value);
        browser.sleep(500);
    };

    this.click = function (element) {
        element.click();
    };

    this.getTextFromInput = function (element) {
        return element.getAttribute('value');
    };

    var EC = protractor.ExpectedConditions;

    this.isVisible = function (locator) {
        return EC.visibilityOf(locator);
    };

    this.isNotVisible = function (locator) {
        return EC.invisibilityOf(locator);
    };

    this.inDom = function (locator) {
        return EC.presenceOf(locator);
    };

    this.notInDom = function (locator) {
        return EC.stalenessOf(locator);
    };

    this.isClickable = function (locator) {
        return EC.elementToBeClickable(locator);
    };

    this.hasText = function (locator, text) {
        return EC.textToBePresentInElement(locator, text);
    };

    this.and = function (arrayOfFunctions) {
        return EC.and(arrayOfFunctions);
    };

    this.titleIs = function (title) {
        return EC.titleIs(title);
    };

    /**
     * wrap this.timeout. (ms) in t-shirt sizes
     */
    this.timeout = {
        'xs': 420,
        's': 1000,
        'm': 3000,
        'l': 5000,
        'xl': 9000,
        'xxl': 15000
    };


    this.hasClass = function (locator, klass) {
        return locator.getAttribute('class').then(function (classes) {
            return classes.split(' ').indexOf(klass) !== -1;
        });
    };

    this.hitEnter = function () {
        return browser.actions().sendKeys(protractor.Key.ENTER).perform();
    };

    this.switchToWindow = function (windowHandleIndex, targetPage) {
        var that = this;
        // wait for new page to open...
        var handle = browser.wait(function () {
            return browser.getAllWindowHandles().then(function (handles) {
                // make sure window we're switching to exists...
                if (handles.length > windowHandleIndex) {
                    return handles[windowHandleIndex];
                } else {
                    throw new Error('window index ' + windowHandleIndex + ' does not exist');
                }
            });
        }, this.timeout.xxl);
        console.log('switching to window ' + windowHandleIndex);
        browser.switchTo().window(handle);
        // test that we're at the new page...
        targetPage.at();
    };


    protractor.ElementFinder.prototype.getWidth = function () {
        return this.getSize().then(function (size) {
            return size.width;
        });
    };

    this.addResultsToArrayWithText = function (elements) {
        var map = elements.map(function (details) {
            details.getText()
                .then(function (text) {
                    array.push(text);
                })
        });
    };

    this.printResultsWithText = function () {
        for (var i in array) {
            console.log('details : ' + i + ' => ' + array[i]);
        }
        return array.length;
    };

    this.isArrayContains = function (value) {
        var flag = false;
        var name = value;
        var isStringPresent = function (string) {
            return String(string).match(name);
        };
        var test = function (string) {
            if (isStringPresent(string)) {
                flag = true;
                return string;
            } else {
                flag = true;
                return String('-');
            }
        };
        var newArray = array.map(test);
        console.log(newArray.toString().match(value));
        return flag;
    };

    this.cleanArray = function () {
        while (array.length > 0) {
            array.pop()
        }
    };

    this.addResultsToArray = function (elements) {
        var map = elements.map(function (details) {
            array.push(details);
        });
    };

    this.printResults = function () {
        for (var i in array) {
            console.log('rows : ' + i);
        }
        return array.length;
    };

    this.pagination = function () {
        // not work
        /*var rowsOfClaimList = 10;
        if (this.rowsOfTable.length == rowsOfClaimList) {
        this.buttonNextOfPagination.click();
        browser.sleep(1000);
        }*/
        //failed on 6 number
        /*    var expected = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17'];
         for (var i = 0; i < expected.length; ++i) {
         expect(this.listOfPageNumbers.get(i).getText()).toEqual(expected[i]);
         this.listOfPageNumbers.get(i).click();
         browser.sleep(2000);
         }*/
        //TypeError: Object [object Object] has no method 'filter'
        /*this.buttonNextOfPagination.filter(function(elem) {
         return elem.getText().then(function(text) {
         return text === 'Next';
         });
         }).click();*/

        //var next = ['Next','Next','Next','Next','Next','Next','Next','Next','Next','Next','Next','Next','Next','Next'];
        var next = 'Next';
        for (var i = 0; i < 14; ++i) {
            expect(this.buttonNextOfPagination.getText()).toEqual(next);
            this.buttonNextOfPagination.click();
            browser.sleep(1000);
        }
    };

    this.scrollingToPointOfDestination = function (point) {
        var scrollTo = function () {
            arguments[0].scrollIntoView();
        }
        browser.controlFlow().execute(function () {
            var pointOfDestination = point.getWebElement();
            browser.executeScript(scrollTo, pointOfDestination)
        })
    };

    this.getRandomString = function (characterLength) {
        var randomText = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < characterLength; i++)
            randomText += possible.charAt(Math.floor(Math.random() * possible.length));
        return randomText;
    };

    function wait(ms) {
        var start = new Date().getTime();
        var end = start;
        while (end < start + ms) {
            end = new Date().getTime();
        }
    };
    this.waitUntilDisplayed = function (elm) {
        return browser.wait(function () {
            return elm.isPresent().then(function (itsThere) {
                if (itsThere)
                    return elm.isDisplayed().then(function () {
                        return true;
                    }, function () {
                        return false;
                    });
                else
                    return false;
            }, function () {
                return false;
            })
        });
    };
    this.acceptAlert = function(){
        browser.switchTo().alert().then(
            function (alert) {
                alert.accept();
            },
            function (error) {
                console.log(error);
            }
        );
    };


};
module.exports = new BasePage();