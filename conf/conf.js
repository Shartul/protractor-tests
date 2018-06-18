var HtmlReporter = require('protractor-beautiful-reporter');


exports.config = {

    //directConnect: true,

    // Capabilities to be passed to the webdriver instance.
    multiCapabilities: [{
        browserName: 'chrome'
    },
    ],

    framework: 'jasmine2',

    //	seleniumAddress: 'http://localhost:4444/wd/hub',

    specs: ['../test_spec/CDTNavBar_spec.js'],

    params: {
        login: {
           // user: 'system user,
          //  password: 'Welcome1!'
        },
        mainUrls: {
            userUrl: 'https://cdt-gateway.ase-nonprod.enterprisenet.org/cdt/ui/'
        },
        facility: {
            constantFacility: 'Facility Automation'
        }
    },

    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    },

    onPrepare: function () {


        browser.ignoreSynchronization=true;

        // Override the timeout for webdriver.
        browser.driver.manage().timeouts().implicitlyWait(10000);

        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: 'reports',
            jsonsSubfolder: 'jsons',
            excludeSkippedSpecs: true,
            docTitle: 'CDT Test Report',
            gatherBrowserLogs: true,
        }).getJasmine2Reporter());
    }
}