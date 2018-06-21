let HtmlReporter = require('protractor-beautiful-reporter');
let nodemailer = require("nodemailer");
let zipFolder = require('zip-folder');


exports.config = {

    //directConnect: true,


    // Capabilities to be passed to the webdriver instance.
    multiCapabilities: [{browserName: 'chrome', shardTestFiles: true, maxInstances: 1}
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

        browser.ignoreSynchronization = true;

        // Override the timeout for webdriver.
        browser.driver.manage().timeouts().implicitlyWait(10000);
        browser.driver.manage().window().maximize();

        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: 'reports',
            jsonsSubfolder: 'jsons',
            excludeSkippedSpecs: true,
            docTitle: 'CDT Test Report',
            gatherBrowserLogs: true,
        }).getJasmine2Reporter())

    },


    onComplete: function () {
        zipFolder('./reports', './reports.zip', function (err) {
            if (err) {
                console.log('oh no!', err);
            } else {
                console.log('EXCELLENT');
            }
        });
            return new Promise(function (fulfill, reject) {
                let transport = nodemailer.createTransport("SMTP", {
                    host: "smtp.gmail.com", // hostname
                    secureConnection: true, // use SSL
                    port: 465, // port for secure SMTP
                    auth: {
                        user: "zzzzz@gmailcom",
                        pass: "#######"
                    }
                });
                console.log("SMTP Configured");

                let mailOptions = {
                    from: 'xxxxx@gmail.com', // sender address
                    to: 'yyyyyy@gmail.com', // list of receivers
                    subject: 'Report for Test Result', // Subject line
                    text: 'Contains the test result for the smoke test in html file', // plaintext body
                    attachments: [
                        {
                            'filename': 'report.zip',
                            'filePath': "C:/ProtractorProjects/cdt/conf/reports.zip",
                        }

                    ]
                };
                transport.sendMail(mailOptions, function (error, response) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("Message sent: " + response.message);
                    }
                    fulfill(response.message);
                });
            });
        }
}
