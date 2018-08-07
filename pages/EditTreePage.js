var basePage = require('../pages/BasePage');
var JSONReader = require('../treeMetaData.json');


var EditTreePage =  function () {

    this.pageLoaded = this.isVisible($('span.kpiName'));



};
EditTreePage.prototype = basePage; //extending base page

module.exports = new EditTreePage();
