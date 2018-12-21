//require('../elements/customlocators.js');
var basePage = require('../pages/BasePage.js');
var JSONReader = require('../treeMetaData.json');


HomePage = function () {


    this.getHomePageTitle = function () {
        return browser.executeScript("return document.querySelector('nd-brand-bar').shadowRoot.getElementById('brandBarLight').shadowRoot.getElementById('ndToolbar').querySelector('#pageTitle').innerText");
    };
    this.appIcon = function () {
        return browser.executeScript("document.querySelector('nd-brand-bar').shadowRoot.getElementById('brandBarLight').shadowRoot.getElementById('ndToolbar').querySelector('#appIcon')");
    };
    this.searchBox = function () {
        return  browser.executeScript("document.getElementsByTagName('nd-brand-bar')[0].shadowRoot.getElementById('searchInput').click()");
    };

    this.helpMenu =  function(){
        browser.executeScript("document.getElementsByTagName('nd-brand-bar')[0].shadowRoot.getElementById('help').click();")
    };
   /* this.navigationBar =  function(){
               var help =
        var apps = document.getElementsByTagName('nd-brand-bar')[0].shadowRoot.getElementById('apps');
        var alerts = document.getElementsByTagName('nd-brand-bar')[0].shadowRoot.getElementById('alerts');

    };*/
    this.enterSearch = function (){
       element(by.css('#searchInput')).sendKeys('Sample');
       browser.sleep(3000);
    };
    this.openProfile =  function(){
        browser.executeScript("document.getElementsByTagName('nd-brand-bar')[0].shadowRoot.getElementById('profile').click()");
    };
    this.logOut =  function(){
        browser.executeScript("document.querySelector('nd-brand-bar').shadowRoot.querySelector('nd-userprofile-drawer').shadowRoot.getElementById('signOut').click()");
    };
    this.profileName =  function(){
      return browser.executeScript("return document.querySelector('nd-brand-bar').shadowRoot.querySelector('nd-userprofile-drawer').shadowRoot.getElementById('profileHeader').innerText");
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
            if(expect(browser.getCurrentUrl()).toContain("/edittree/")){
                console.log("The tree is opened by the user")
            }else {
                console.log("The tree is locked by other user")
            }
        });
    };
    this.copytheLockedCard = function() {
        for (var j = 0; j < JSONReader.result.length; j++) {
            if (JSONReader.result[j].lockedByEmail != null) {
                break;
            }
        }
        console.log("The locked card name is " +JSONReader.result[j].name);
        browser.sleep(3000);
        element.all(by.css('span.tileHeader')).get(j).element.all(by.css('nd-icon-button')).get(j).click();
        browser.sleep(3000);
        element(by.css('.copy')).click();
        console.log("Name of copied tree is " + "Copy Of" + JSONReader.result[j].name)
    };

    this.copytheUnlockedCard = function() {
        for (var j = 0; j < JSONReader.result.length; j++) {
            if (JSONReader.result[j].lockedByEmail = null) {
                break;
            }
        }
        console.log("The locked card name is " +JSONReader.result[j].name);
        browser.sleep(3000);
        element.all(by.css('span.tileHeader')).get(j).element.all(by.css('nd-icon-button')).get(j).click();
        browser.sleep(3000);
        element(by.css('.copy')).click();
        console.log("Name of copied tree is " + "Copy Of" + JSONReader.result[j].name)
        browser.sleep(3000);
        var cardname = "Copy Of" + JSONReader.result[j].name;
        this.clickatUnlockCard(cardname);
    };

    this.deletheLockedCard = function() {
        for (var j = 0; j < JSONReader.result.length; j++) {
            if (JSONReader.result[j].lockedByEmail != null) {
                break;
            }
        }
        console.log("The locked card name is " +JSONReader.result[j].name);
        browser.sleep(3000);
        element.all(by.css('span.tileHeader')).get(j).element.all(by.css('nd-icon-button')).get(j).click();
        browser.sleep(3000);
        element(by.css('.copy')).click();
        console.log("Name of copied tree is " + "Copy Of" + JSONReader.result[j].name);
        element.all(by.css('span.tileHeader')).get(j+1).element.all(by.css('nd-icon-button')).get(j+1).click();
        element(by.css('.delete')).click();
        browser.sleep(3000);
        var status  = element.all(by.css('span.tileHeader')).get(j+1).element(by.css('.statusText')).getText().innerText;
        if(status === 'DELETED')
            console.log('Analyst user can view Deleted Tree');
        else
            console.log('Analyst user can NOT view Deleted Tree');

        element.all(by.css('span.tileHeader')).get(j+1).element.all(by.css('nd-icon-button')).get(j+1).click();
        if(element(by.css('.restore')).isVisible()){
            console.log('Analyst user can only view Restore option');
        }else{
            console.log('Analyst user can  view other options also');
        }

    };

    this.clickatDeletedCard = function (tileStatus) {
        element.all(by.css('span.tileHeader')).element(by.css('.statusText')).filter(function (elem) {
            return elem.getText().then(function (text) {
                return text === tileStatus;
            });
        }).then(function (filteredElements) {
            browser.sleep(20000);
            browser.executeScript("arguments[0].scrollIntoView();", filteredElements[0]);
            filteredElements[0].click();
            browser.sleep(50000);
            if(expect(browser.getCurrentUrl()).toContain("/edittree/")){
                console.log("The Deleted tree is opened by the  Analyst user ---Bug")
            }else {
                console.log("The Deleted tree is NOT opened by the Analyst user")
            }
        });
     };


    this.cardcontent = function () {
        var cardcontent = element.all(by.css('span.tileContentText'));
        return cardcontent.getText();
    };
    this.modifieddate = function () {
        var modifieddate = element.all(by.css('span.updateDate'));
        return modifieddate.getText();
    };
    this.updateByName = function () {
        var updateByName = element.all(by.css('span.updateBy'));
        return updateByName.getText();
    };
    this.unclassifiedcount = function () {
        var unclassifiedcount = element.all(by.css('span.unClassifiedCount'));
        return unclassifiedcount.getText();
    };
    this.unclassified = function () {
        var unclassified = element.all(by.css('div.unClassifiedContentDiv'));
        return unclassified.getText();
    };
   /* this.searchFor = function (text) {
        this.searchBox.sendKeys(text);
        this.hitEnter();
        browser.wait(this.isVisible(this.searchResultsPage), this.timeout.l);
    };*/
    this.clickatKebabMenu = function () {
        element.all(by.css('nd-icon-button')).then(function (elements) {
            for (var i = 0; i < elements.length; i++) {
                browser.sleep(20000);
                browser.executeScript("arguments[0].scrollIntoView();", elements[i]);
                elements[i].click();
                element(by.css('.rename')).click();
                browser.sleep(20000);
            }
        });
    };
};
HomePage.prototype = basePage; //extending base page
module.exports = new HomePage();
