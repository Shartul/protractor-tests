
var UniqueLocator = function() {
   //this.navHeader = element(by.css("nd-brand-bar"));
   //console.log("navHeader", this.navHeader);
    //this.pageTitle = element(by.css("nd-brand-bar"))["attributes"]["page-title"];
   // this.searchIcon = element(by.css("nd-brand-bar")[0].root.querySelector("nd-chip-input"));
  //  this.helpIcon = element(by.css("nd-brand-bar")[0].root.querySelectorAll("nd-icon-button")[1]);
  //  this.apps = element(by.css("nd-brand-bar")[0].root.querySelectorAll("nd-icon-button")[3]); ;
  //  this.alerts = element(by.css("nd-brand-bar")[0].root.querySelectorAll("nd-icon-button")[4]);

    this.cardName = element(by.css("span.tileHeader"));

};
module.exports = new UniqueLocator();
