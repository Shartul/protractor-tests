/**
 * Created by Selenium on 11-03-2016.
 */
var BasePage = function(){

  this.navigateToURL = function(url){

    browser.get(url);

  };

   this.getPageTitle = function(){

       return browser.getPageTitle();

   }

};
module.exports = new BasePage();