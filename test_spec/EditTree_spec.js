var loginPage = require('../pages/LoginPage');
var homePage = require('../pages/HomePage');
var editTreePage = require('../pages/EditTreePage');
var OR = require('../elements/OR.json');
var logger = require('../utils/log.js');
//var locator = require("../elements/uniqueLocator.js");
var userData = require('../utils/userData');
var JSONReader = require('../treeMetaData.json');



describe("Edit Tree page validations", function() {

    beforeEach(function () {
        browser.ignoreSynchronization = true;
    });
    /*CDT-7:Validate that someone else could not modify the tree locked by other user */
    /*CDT-35:Validate that user can view profile with initials and option to logout */
    it("Validate that other user cannot access the locked tree", function () {
        loginPage.to();
        expect(loginPage.getPageTitle()).toEqual('Nielsen Answers Login');
        loginPage.loginAs(userData.testUser);
        loginPage.selectCDT();
        browser.sleep(5000);
        browser.isInternetExplorer = function () {
            loginPage.loginAs(userData.testUser);

        };
        expect(homePage.getPageTitle()).toEqual('Consumer Decision Tree');
        for (var j = 0; j < JSONReader.result.length; j++) {
            if (JSONReader.result[j].lockedByEmail === null) {
                break;
            }
        }
        var cardname = JSONReader.result[j].name;
        homePage.clickatUnlockCard(cardname);
        console.log("The card is opened by the user " + userData.testUser.username);
        browser.sleep(5000);
        editTreePage.getEditTreePageTitle().then(function(text){
            console.log(text);
            expect(text).toEqual(cardname.toUpperCase());
        });
        browser.sleep(3000);
        browser.sleep(5000);
        browser.sleep(2000);
        homePage.openProfile();
        homePage.profileName().then()(function(text){
            console.log(text);
            expect(text).toEqual('Shartul Kumar')
        });
        homePage.logOut();
        browser.sleep(5000);
        loginPage.loginAs(userData.lockedUser);
        loginPage.selectCDT();
        browser.sleep(5000);
        browser.isInternetExplorer = function () {
             loginPage.loginAs(userData.lockedUser);

         };
        homePage.clickatUnlockCard(cardname);
        console.log("The locked card is accessed by the user " + userData.lockedUser.username);
        browser.sleep(3000);
        console.log('info', 'Locked status of the card is verified');
        hompePage.copytheLockedCard();
        browser.sleep(3000);
        console.log('info', 'The locked card is copied');
    });

    /*CDT-11:Validate that shopper product hierarchy  is visible to 30 down layer*/
    it("Validate that user can open the unlocked tree", function () {
        for (var j = 0; j < JSONReader.result.length; j++) {
            if (JSONReader.result[j].lockedByEmail === null) {
                break;
            }
        } var cardname = JSONReader.result[j].name;
        homePage.clickatUnlockCard(cardname);
        browser.sleep(5000);
        editTreePage.getEditTreePageTitle().then(function(text){
            console.log(text);
            expect(text).toEqual(cardname.toUpperCase());
        });
        browser.sleep(3000);
        editTreePage.clicktoExpandAll();
        browser.sleep(3000);
        editTreePage.clicktoCollapseAll();
        browser.sleep(3000);

    });
    /*CDT-11:how many products are attached to each level of tree.*/
    /*CDT-90:view a list of products not sold and show Product Name and Code, sort them and view Move */
    /*CDT-44:  View  tabs "Edit" and "Visualize"*/
    it("Validate that user can see how many products are attached to each level of tree.",function () {
        editTreePage.clicktoExpandAll();
        editTreePage.edittab().then(function(text){
            console.log(text);
            expect(text).toEqual('Edit');
        });
        editTreePage.visualizetab().then(function(text){
            console.log(text);
            expect(text).toEqual('Visualize');
        });
        editTreePage.hierarchy();
        editTreePage.getEditTreePageTitle().then(function(text){
            console.log(text);
            expect(text).toEqual(cardname.toUpperCase());
        });
        console.log("user can see how many products are attached to each level of tree");
        editTreePage.clicktoCollapseAll();
    });
    /*CDT-12:User can rename each level of hierarchy.*/
    it("Validate that user can see how many products are attached to each level of tree.",function () {
        editTreePage.clicktoExpandAll();
        editTreePage.clickandRename();
        console.log("user can rename each level of the hierarchy");
        editTreePage.clicktoCollapseAll();

    });
    /*CDT-12:User can search any level of hierarchy.*/
    it("Validate that user can search any level of hierarchy.", function () {
        editTreePage.clicktoExpandAll();
        editTreePage.searchhierarchy();
        console.log("user can search each level of the hierarchy.");
    });
    /*CDT-13:User can do changes such as add child,sibling,select need higher unit and delete the hierarchy level.*/
    it("Validate that user can do changes on the hierarchy level.",function () {
        editTreePage.clicktoExpandAll();
        editTreePage.hierarchychanges();
        console.log("User can add child and sibling at each hierarchy level and select higher need unit")
        console.log("User can delete each hierarchy level");
    });
    /*CDT-14:user can do scroll down on the hierarchy level*/
    it("Validate that user scroll down on the hierarchy level.", function () {
        editTreePage.scrolldown();
        console.log("User can scroll down each hierarchy level");
    });

    /*CDT-14:user can view default messages and Move, Declassify button on the hierarchy level*/
    it("Validate that user can view default message on the hierarchy level.", function () {
        editTreePage.clicktoExpandAll();
        editTreePage.validateMove().then(function (text) {
            console.log(text);
            expect(text).toEqual('MOVE');
        });
        editTreePage.validDeclassify().then(function (text) {
            console.log(text);
            expect(text).toEqual('DECLASSIFY');
        });
        editTreePage.noProductmessage().then(function (text) {
            console.log(text);
            expect(text).toEqual('THERE ARE NO PRODUCTS TO DISPLAY');
        });
        editTreePage.selectnodemessage().then(function (text) {
            console.log(text);
            expect(text).toEqual('Select a node on the left to view child nodes and products.');
        });
        editTreePage.clicktoExpandAll();
        browser.sleep(2000);
        editTreePage.selectanothernode().then(function (text) {
            console.log(text);
            expect(text).toEqual('          There are no products directly under this node.\n' +
                '\n' +
                '          Select another node under it to view products\n' +
                '          OR\n' +
                '          Select \'Show all under branch\' to view all products in this node.\n' +
                '        ');
        });
    });

    /*CDT-15:Validate that user can view products metrics on RHS*/
    /*CDT-99:Validate that user can select "Show all under branch" view "Product Name", "Hierarchy Level" and "KPIS" in this table  */
    it("Validate that user can view products metrics", function () {
        browser.sleep(3000);
        editTreePage.clicktoExpandAll();
        editTreePage.clickatfirstLevel();
        editTreePage.showAllunderBranch().then(function (text) {
            console.log(text);
            expect(text).toEqual('Show all under branch');
        });
        editTreePage.selectshowAllunderBranch();
        editTreePage.hierrarchy().then(function (text) {
            console.log(text);
            expect(text).toEqual('Hierarchy Level');
        });

        editTreePage.KPISText().then(function (text) {
            console.log(text);
            expect(text).toEqual('- Select a KPI -');
        });
        editTreePage.selectKPI();
        editTreePage.selectlistofMetrics();
        console.log("user can view products metrics");
    });
    /*CDT-16:Validate that user can view unclassified products*/
    it("Validate that user can view products metrics", function () {
        browser.sleep(3000);
        editTreePage.clicktoExpandAll();
        editTreePage.validateMove().then(function (text) {
            console.log(text);
            expect(text).toEqual('MOVE');
        });
        editTreePage.unclassifiedData();
        console.log("user can view products in unclassified products tabs");
    });
    /*CDT-17:Validate that user can undo last saved changes to the hierarchy*/
    it("Validate that user can undo last saved changes to the hierarchy", function () {
        browser.sleep(3000);
        editTreePage.clicktoExpandAll();
        editTreePage.clickandRename();
        editTreePage.hierarchychanges();
        editTreePage.save();
        editTreePage.undoChanges();
        editTreePage.save();
        console.log("user can undo changes from last save and thn save the changes agian");

    });
    /*CDT-42:Validate that user can Expand and Collapse and changeKPI " */
    it("Validate that user can Expand and Collapse and changeKPI", function () {
        browser.sleep(2000);
        editTreePage.clicktoExpandAll();
        editTreePage.clickatChangeKPI();
        console.log("User can Expand and Collapse and changeKPI");
    });

    /*CDT-43:Validate that user can filter/view only levels marked as "higher need unit" */
    it("Validate that user ability filter/view only levels marked as higher need unit", function () {
        browser.sleep(3000);
        editTreePage.clicktoExpandAll();
        editTreePage.selecthighlevelunitcheckbox();
        browser.sleep(5000);
        editTreePage.selecthighlevelunitcheckbox();
        console.log("User can filter/view only levels marked as higher need unit");
    });
    /*CDT-100:Validate that user can search Product" */
    it("Validate that user has ability to search Product", function () {
        browser.sleep(3000);
        editTreePage.clicktoExpandAll();
        editTreePage.clickatfirstLevel();
        editTreePage.selectshowAllunderBranch();
        editTreePage.searchProduct();
        console.log("User can search Product and sort them");
    });

});

