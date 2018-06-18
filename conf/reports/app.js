var app = angular.module('reportingApp', []);

app.controller('ScreenshotReportController', function ($scope) {
    $scope.searchSettings = {
        description: '',
        passed: true,
        failed: true,
        pending: true,
        withLog: true,
    };

    $scope.inlineScreenshots = false;
    this.showSmartStackTraceHighlight = true;

    this.chooseAllTypes = function () {
        $scope.searchSettings.passed = true;
        $scope.searchSettings.failed = true;
        $scope.searchSettings.pending = true;
        $scope.searchSettings.withLog = true;
    };

    this.getParent = function (str) {
        var arr = str.split('|');
        str = "";
        for (var i = arr.length - 2; i > 0; i--) {
            str += arr[i] + " > ";
        }
        return str.slice(0, -3);
    };

    this.specLevel = function (str) {
        var arr = str.split('|');
        str = "";
        if (arr.length < 3) {
            return true;
        }
        return false;
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };


    this.getShortDescription = function (str) {
        return str.split('|')[0];
    };


    this.nToBr = function (str) {
        return str.replace(/(?:\r\n|\r|\n)/g, '<br />');
    };


    this.convertTimestamp = function (timestamp) {
        var d = new Date(timestamp),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh == 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };


    this.round = function (number, roundVal) {
        return (parseFloat(number)/1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {passCount++};
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {pendingCount++};
        }
        return pendingCount;
    };


    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {failCount++}
        }
        return failCount;
    };

    this.applySmartHighlight = function (line) {
        if (this.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return true;
    };


    var results =[
    {
        "description": "Validate navigation to CDT Home Page|CDT Navigation Bar Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "d8088f025b1969f3566fa2e7d07270a8",
        "instanceId": 12924,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.87"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "other - The SSL certificate used to load resources from https://cdt-gateway.ase-nonprod.enterprisenet.org will be distrusted in M70. Once distrusted, users will be prevented from loading these resources. See https://g.co/chrome/symantecpkicerts for more information.",
                "timestamp": 1529303436049,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdt-gateway.ase-nonprod.enterprisenet.org/cdt/ui/ - The SSL certificate used to load resources from https://cdt-gateway.ase-nonprod.enterprisenet.org will be distrusted in M70. Once distrusted, users will be prevented from loading these resources. See https://g.co/chrome/symantecpkicerts for more information.",
                "timestamp": 1529303436065,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdt-gateway.ase-nonprod.enterprisenet.org/cdt/ui/assets/elements.html 16824:12 \"LazyImportsBehavior is deprecated in Polymer 2.0\"",
                "timestamp": 1529303437801,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cloud.typography.com/7397556/7892572/css/fonts.css - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1529303444485,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "deprecation - Styling master document from stylesheets defined in HTML Imports is deprecated. Please refer to https://goo.gl/EGXzpw for possible migration paths.",
                "timestamp": 1529303445359,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdt-gateway.ase-nonprod.enterprisenet.org/cdt/ui/assets/elements.html 18177:14 \"paper-drawer-panel\"",
                "timestamp": 1529303445732,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdt-gateway.ase-nonprod.enterprisenet.org/cdt/ui/assets/elements.html 23741:12 \"paper-toolbar\"",
                "timestamp": 1529303445735,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdt-gateway.ase-nonprod.enterprisenet.org/cdt/ui/assets/elements.html 31523:18 \"No identity URLs passed, brand bar defaulting to DEV URLs.\"",
                "timestamp": 1529303448853,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdt-gateway.ase-nonprod.enterprisenet.org/ng2portal/rsi/identity/me/products?appPreferences=true&notificationSettings=true - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1529303448854,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdt-ui.ase-nonprod.enterprisenet.orgui/favicon.ico - Failed to load resource: net::ERR_NAME_NOT_RESOLVED",
                "timestamp": 1529303448854,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdt-ui.ase-nonprod.enterprisenet.orgui/favicon.ico - Failed to load resource: net::ERR_NAME_NOT_RESOLVED",
                "timestamp": 1529303448854,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdt-gateway.ase-nonprod.enterprisenet.org/ng2portal/rsi/datalist?type=timezones - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1529303448854,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdt-gateway.ase-nonprod.enterprisenet.org/ng2portal/rsi/localization/languages?translate=true - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1529303448854,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdt-gateway.ase-nonprod.enterprisenet.org/ng2portal/rsi/datalist?type=personas - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1529303448854,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdt-gateway.ase-nonprod.enterprisenet.org/ng2portal/rsi/identity/me - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1529303448854,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdt-gateway.ase-nonprod.enterprisenet.org/ng2portal/rsi/notifications?start=1&size=8 - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1529303448854,
                "type": ""
            }
        ],
        "screenShotFile": "009200a7-001c-00e6-0079-000a009f0068.png",
        "timestamp": 1529303434597,
        "duration": 14233
    },
    {
        "description": "Validate the Card names on CDT Home Page|CDT Navigation Bar Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "d8088f025b1969f3566fa2e7d07270a8",
        "instanceId": 12924,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.87"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00520082-0083-00cc-00a7-009e00c1006f.png",
        "timestamp": 1529303449197,
        "duration": 3821
    },
    {
        "description": "Validate that Card names are sorted|CDT Navigation Bar Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "d8088f025b1969f3566fa2e7d07270a8",
        "instanceId": 12924,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.87"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0073004d-0055-0029-00d8-00c200c50032.png",
        "timestamp": 1529303453327,
        "duration": 600
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});
    };

    this.sortSpecs();
});

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            countLogMessages(item);

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    var prevItem = item;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    var prevItem = item;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    var prevItem = item;
                }

            }
        }

        return filtered;
    };
});

var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
        return;
    }

    if (getSpec(item.description) != getSpec(prevItem.description)) {
        item.displaySpecName = true;
        return;
    }
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length-1];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};