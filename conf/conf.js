var HtmlReporter = require('protractor-beautiful-reporter');
var zipFolder = require('zip-folder');
var retry = require('protractor-retry').retry;
var NUMBER_OF_RETRIES = '5';

exports.config = {

    //directConnect: true,   // Browser automation on IE does not run with directConnect as true

    // Capabilities to be passed to the webdriver instance.
    multiCapabilities: [
        {
           /* browserName: 'internet explorer',
            ignoreProtectedModeSettings:'true',
            platform:'ANY',
            maxInstances: '1',
            version: '11',
            nativeEvents: false,
            ignoreZoomSetting: 'true',
            unexpectedAlertBehaviour: 'ignore',
            acceptSslCerts: true,
            trustAllSSLCertificates: true,
            enablePersistentHover: true,
            specs: ['../test_spec/EditTree_spec.js']*/
        },
         {
            browserName: 'chrome',
            platform:'ANY',
            maxInstances: 1,
            version:'67.0',
            specs: ['../test_spec/CDTNavBar_spec.js']
         }
    ],

    suites: {
        smoke :"../test_spec/EditTree_spec.js",
        regression:"../test_spec/CDTNavBar_spec.js"
    },

    framework: 'jasmine2',

    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
        showColors: true,
        includeStackTrace: true,
        defaultTimeoutInterval: 1440000
    },



    onCleanUp: function (results) {
        retry.onCleanUp(results);

    },
    onPrepare: function () {
        retry.onPrepare();
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
            consolidated: false
        }).getJasmine2Reporter())

    },
    afterLaunch: function() {
        return retry.afterLaunch(NUMBER_OF_RETRIES);
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
