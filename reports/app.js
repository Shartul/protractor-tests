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
        "sessionId": "4d9a85cbc6ce5e3d838272f25d596a64",
        "instanceId": 15800,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "other - The SSL certificate used to load resources from https://answersdev.nielsen.com will be distrusted in M70. Once distrusted, users will be prevented from loading these resources. See https://g.co/chrome/symantecpkicerts for more information.",
                "timestamp": 1530704965295,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://answersdev.nielsen.com/gateway/logon.htm?TYPE=33619969&REALMOID=06-000a4a4d-b4ad-1a4b-952c-05e10a270000&GUID=&SMAUTHREASON=0&METHOD=GET&SMAGENTNAME=-SM-%2bIouTNqFDWrVDtPesu6MOHKxaqHojeVU57RvOz5FjwJorxlxLOqJ8hFc1ctGi8Du&TARGET=-SM-http%3a%2f%2fanswersdev%2enielsen%2ecom%2fcdt%2fui - The SSL certificate used to load resources from https://answersdev.nielsen.com will be distrusted in M70. Once distrusted, users will be prevented from loading these resources. See https://g.co/chrome/symantecpkicerts for more information.",
                "timestamp": 1530704965327,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://answersdev.nielsen.com/portal/rsi/branding/login_video?locale=&_=1530704967214 - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1530704968859,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://answersdev.nielsen.com/cdt/ui - The SSL certificate used to load resources from https://answersdev.nielsen.com will be distrusted in M70. Once distrusted, users will be prevented from loading these resources. See https://g.co/chrome/symantecpkicerts for more information.",
                "timestamp": 1530704975030,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://answersdev.nielsen.com/cdt/ui/assets/elements.html 16830:12 \"LazyImportsBehavior is deprecated in Polymer 2.0\"",
                "timestamp": 1530704976365,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "deprecation - Styling master document from stylesheets defined in HTML Imports is deprecated. Please refer to https://goo.gl/EGXzpw for possible migration paths.",
                "timestamp": 1530704980028,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://answersdev.nielsen.com/cdt/ui/assets/elements.html 18183:14 \"paper-drawer-panel\"",
                "timestamp": 1530704980589,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://answersdev.nielsen.com/cdt/ui/assets/elements.html 23747:12 \"paper-toolbar\"",
                "timestamp": 1530704980592,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://answersdev.nielsen.com/cdt/ui/assets/elements.html 31472:18 \"No identity URLs passed, brand bar defaulting to DEV URLs.\"",
                "timestamp": 1530704980915,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://answersdev.nielsen.com/ng2portal/rsi/identity/me/products?appPreferences=true&notificationSettings=true - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1530704981596,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://answersdev.nielsen.com/ng2portal/rsi/localization/languages?translate=true - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1530704982381,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://answersdev.nielsen.com/ng2portal/rsi/datalist?type=personas - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1530704982381,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://answersdev.nielsen.com/ng2portal/rsi/identity/me - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1530704982381,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://answersdev.nielsen.com/ng2portal/rsi/datalist?type=timezones - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1530704982381,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://answersdev.nielsen.com/ng2portal/rsi/notifications?start=1&size=8 - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1530704982670,
                "type": ""
            }
        ],
        "screenShotFile": "008d007b-00b3-001b-00d1-0055004700e3.png",
        "timestamp": 1530704962219,
        "duration": 20858
    },
    {
        "description": "Validate navigation to CDT Home Page|CDT Navigation Bar Test",
        "passed": true,
        "pending": false,
        "sessionId": "8e1e727a-e134-4e13-9a14-261c02da324d",
        "instanceId": 11360,
        "browser": {
            "name": "internet explorer"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "001900f8-0029-00b3-0022-00c000bb0024.png",
        "timestamp": 1530704961132,
        "duration": 15629
    },
    {
        "description": "Validate the Card names on CDT Home Page|CDT Navigation Bar Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "4d9a85cbc6ce5e3d838272f25d596a64",
        "instanceId": 15800,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://cdt-ui.ase-nonprod.enterprisenet.orgui/favicon.ico - Failed to load resource: net::ERR_NAME_NOT_RESOLVED",
                "timestamp": 1530704983697,
                "type": ""
            }
        ],
        "screenShotFile": "00830043-0026-00f6-00f6-00a700f2000b.png",
        "timestamp": 1530704983448,
        "duration": 3352
    },
    {
        "description": "Validate that Card names are sorted|CDT Navigation Bar Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "4d9a85cbc6ce5e3d838272f25d596a64",
        "instanceId": 15800,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "004e00a0-00ef-00c6-0012-009a006f005e.png",
        "timestamp": 1530704987091,
        "duration": 188
    },
    {
        "description": "Validate the Card names on CDT Home Page|CDT Navigation Bar Test",
        "passed": true,
        "pending": false,
        "sessionId": "8e1e727a-e134-4e13-9a14-261c02da324d",
        "instanceId": 11360,
        "browser": {
            "name": "internet explorer"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0017009a-0095-00aa-00cf-00c700080021.png",
        "timestamp": 1530704985040,
        "duration": 10642
    },
    {
        "description": "Validate that Card names are sorted|CDT Navigation Bar Test",
        "passed": true,
        "pending": false,
        "sessionId": "8e1e727a-e134-4e13-9a14-261c02da324d",
        "instanceId": 11360,
        "browser": {
            "name": "internet explorer"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "006600d7-00bf-005a-008d-00b100f400aa.png",
        "timestamp": 1530704995904,
        "duration": 3319
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