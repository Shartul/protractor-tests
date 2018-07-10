var HtmlReporter = require('protractor-beautiful-reporter');
var zipFolder = require('zip-folder');

exports.config = {

     //directConnect: true,   // Browser automation on IE does not run with directConnect as true

    // Capabilities to be passed to the webdriver instance.
    multiCapabilities: [
        {
            browserName: 'internet explorer',
            ignoreProtectedModeSettings:'true',
            platform:'ANY',
            maxInstances: '1',
            version: '11',
            specs: ['../test_spec/CDTNavBar_spec.js']

        },
        {
            browserName: 'chrome',
            platform:'ANY',
            maxInstances: 1,
            version:'67.0',
            specs: ['../test_spec/CDTNavBar_spec.js']
        }
    ],

    framework: 'jasmine2',

    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    },

    onPrepare: function () {

        browser.ignoreSynchronization = true;

        // Override the timeout for webdriver.
        browser.driver.manage().timeouts().implicitlyWait(10000);
        browser.driver.manage().window().maximize();


        jasmine.getEnv().addReporter(new HtmlReporter({
            cleanDestination: true,
            baseDirectory: 'reports',
            jsonsSubfolder: 'jsons',
            excludeSkippedSpecs: true,
            docTitle: 'CDT Test Report',
            gatherBrowserLogs: true,
        }).getJasmine2Reporter())
    },
    onComplete: function () {
        zipFolder('reports', 'reports.zip', function (err) {
            if (err) {
                console.log('oh no!', err);
            } else {
                console.log('EXCELLENT');
            }
        });
    }
};
