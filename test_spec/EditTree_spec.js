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
        loginPage.to();
        expect(loginPage.getLoginPageTitle()).toEqual('Nielsen Answers Login');
        loginPage.loginAs(userData.testUser);
        loginPage.selectCDT();
        browser.sleep(5000);
        browser.isInternetExplorer = function () {
            loginPage.loginAs(userData.testUser);

        };
        expect(homePage.getHomePageTitle()).toEqual('Consumer Decision Tree');
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
        browser.sleep(7000);

    });
    /*CDT-7:Validate that someone else could not modify the tree locked by other user */
    /*CDT-35:Validate that user can view profile with initials and option to logout */
    /*CDT-31 32:Analyst - Viewing and Deleting the tree */
    it("Validate that other user cannot access the locked tree", function () {
        homePage.openProfile();
        homePage.profileName().then()(function(text){
            console.log(text);
            expect(text).toEqual('Shartul Kumar')
        });
        homePage.logOut();
        browser.sleep(5000);
        loginPage.loginAs(userData.lockedUser); //Now logged in as Analyst user
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
        homePage.deletheLockedCard();
        browser.sleep(3000);
        console.log('info', 'The copied card is deleted and can be viewed by Analyst user');
        console.log('Analyst user can only view Restore option');
        var tileStatus = 'DELETED';
        homePage.clickatDeletedCard(tileStatus);
        console.log('Analyst user CANNOT open DELETED Tree');
    });

    /*CDT-11:Validate that shopper product hierarchy  is visible to 30 down layer*/
    it("Validate that user can open the unlocked tree", function () {
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
    /* CDT-18 Saving the Tree - save, save & close, validate */
    /*CDT130: Unlocking the tree */
    /*CDT-13:User can do changes such as add child,sibling,select need higher unit and delete the hierarchy level.*/
    it("Validate that user can do changes on the hierarchy level.",function () {
        editTreePage.clicktoExpandAll();
        editTreePage.hierarchychanges();
        console.log("User can add child and sibling at each hierarchy level and select higher need unit")
        console.log("User can delete each hierarchy level");
        editTreePage.save();
        editTreePage.saveFromList();
        editTreePage.saveandclose();
        browser.sleep(5000);
        expect(homePage.getHomePageTitle()).toEqual('Consumer Decision Tree');

    });
    /* CDT-18 Saving the Tree - save, save & close, validate */
    /* CDT-33 Analyst - Saving and Publishing the tree*/
    it("Validate that user can do changes on the hierarchy level.",function () {
        editTreePage.clicktoExpandAll();
        editTreePage.doChanges();
        editTreePage.closeafterchanges();
        console.log("User can add child and sibling at each hierarchy level and select higher need unit")
        console.log("User can delete each hierarchy level");
        editTreePage.cancel();
        editTreePage.closeafterchanges();
        editTreePage.closeandDontSave();
        for (var j = 0; j < JSONReader.result.length; j++) {
            if (JSONReader.result[j].lockedByEmail === null) {
                break;
            }
        }
        var cardname = JSONReader.result[j].name;
        homePage.clickatUnlockCard(cardname);
        editTreePage.clicktoExpandAll();
        editTreePage.doChanges();
        editTreePage.closeafterchanges();
        editTreePage.saveNClose();
        for (j = 0; j < JSONReader.result.length; j++) {
            if (JSONReader.result[j].lockedByEmail === null) {
                break;
            }
        }
        homePage.clickatUnlockCard(cardname);
        editTreePage.selectPublish();   // assuming the Tree is in  Analysis state
        for (j = 0; j < JSONReader.result.length; j++) {
            if (JSONReader.result[j].lockedByEmail === null) {
                break;
            }
        }
        homePage.clickatUnlockCard(cardname);
        editTreePage.selectValidate(); // assuming the Tree is Published by Analyst user

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
    /*CDT-147:Local currency - Select a KPI, Total Sales */
    it("Validate that user can view products metrics", function () {
        browser.sleep(3000);
        editTreePage.clicktoExpandAll();
        editTreePage.clickatLevel(0);
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
        editTreePage.totalSalesMetric().then(function (text) {
            console.log(text);
            expect(text).toEqual('$ Total sales');
        });
        editTreePage.kpiDivData.then(function (text) {
            console.log(text);
            expect(text).toEqual('$');
        });
        console.log("The Total Sales are displayed in the local currency")
    });
    /*CDT-16:Validate that user can view unclassified products*/
    /*CDT-79: Moving products in the Tree */
    /*CDT-80: Selecting products for reclassification (declassification story) */
    it("Validate that user can view products metrics", function () {
        browser.sleep(3000);
        editTreePage.clicktoExpandAll();
        editTreePage.clickatLevel(0);
        editTreePage.showAllunderBranch().then(function (text) {
            console.log(text);
            expect(text).toEqual('Show all under branch');
        });
        editTreePage.selectshowAllunderBranch();
        editTreePage.selectProductHierarchy();
        editTreePage.clickatLevel(4);
        editTreePage.selectProductHierarchy();
        editTreePage.validateMove().then(function (text) {
            console.log(text);
            expect(text).toEqual('MOVE');
        });
        editTreePage.clickMove();
        editTreePage.validateCancel().then(function (text) {
            console.log(text);
            expect(text).toEqual('CANCEL');
        });
        editTreePage.clickCancel();
        editTreePage.clickMove();
        editTreePage.goDown();
        editTreePage.selectFolder();
        editTreePage.validateMoveProductHere();
        editTreePage.goUp();
        editTreePage.selectFolder();
        editTreePage.clickMoveProductHere();
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
    /*CDT-42:Validate that user can Expand and Collapse and changeKPI*/
    /*CDT-147:Local currency -Change a KPI*/
    it("Validate that user can Expand and Collapse and changeKPI", function () {
        browser.sleep(2000);
        editTreePage.clicktoExpandAll();
        editTreePage.clickatChangeKPI();
        console.log("User can Expand and Collapse and changeKPI");
        editTreePage.localCurrency().then(function (text) {
            console.log(text);
            expect(text).toEqual(' $ Sales ');
        });
        editTreePage.productData.then(function (text) {
            console.log(text);
            expect(text).toEqual('$');
        });
       console.log("The Sales are displayed in the local currency")
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
        editTreePage.clickatLevel(0);
        editTreePage.selectshowAllunderBranch();
        editTreePage.searchProduct();
        console.log("User can search Product and sort them");
    });
    /*CDT-89:Viewing Products attributes  */
    /*CDT-182: Viewing Products image */
    /*CDT-147:Local currency - visible in Product attribute pop-up under Product image */
    /*CDT-213:Close button */
    it("Validate the Product attributes and image", function () {
        browser.sleep(3000);
        editTreePage.clicktoExpandAll();
        editTreePage.clickatLevel(0);
        editTreePage.showAllunderBranch().then(function (text) {
            console.log(text);
            expect(text).toEqual('Show all under branch');
        });
        editTreePage.selectshowAllunderBranch();
        editTreePage.clickatGivenProduct(2);
        editTreePage.imageCaption().then(function (text) {
            console.log(text);
            expect(text).toEqual('$');
        });
        console.log("The local currency is visible under the Product image ");
        editTreePage.productName().then(function (text) {
            console.log(text);
            expect(text).toEqual('Appletiser 750ml 750ML');
        });
        editTreePage.productCode().then(function (text) {
            console.log(text);
            expect(text).toEqual('319');
        });
        editTreePage.attrubuteLabel.then(function (text) {
            console.log(text);
            //expect(text).toEqual('319');
        });
        editTreePage.rightClick();
        editTreePage.clickCloseIcon();
        editTreePage.clickoKButton.then(function (text) {
            console.log("The Product attribute pop-up ic closed ");
        });


    });
});

