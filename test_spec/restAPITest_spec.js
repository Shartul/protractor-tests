var frisby = require('frisby');
var JSONReader = require('../treeMetaData.json');
var api_url = "https://answersdev.nielsen.com/cdt/metadata/api/treeMetadata"    ;//env.baseUrl+'/posts';

frisby.globalSetup({
    request: {
        headers: {
            //'Authorization': 'Basic ' + Buffer.from("shartul.kumar.consultant@nielsen.com:TNC$7648").toString('base64'),
            'Content-Type': 'text/plain;charset=utf-8',
            'Accept': 'application/json, text/plain, */*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Cookie': '_ga=GA1.2.902986866.1533212562; __distillery=da56c90_6e80a3d0-88a7-4638-8d3d-4d00f3877a95-3456d9434-cb0d7931d597-d4e1; Portal-Organisation-Cookie=f5bf9f2199a01c13cf825c659ce71218; answersdev_cookie=R1056346520; GATEWAYSESSION=GpD4bpyK2CmLBTLMvX1TF1tLVSwrr97v68qGhBCQ5lPSh2FfBQqf!-465576345; _gid=GA1.2.1535693624.1533618190; ANSWERSSESSION=XGKzbpyPTbWglWRlp3RY8L3nJVqYMT71388DncKcZZ6shyW4d1jh!-244427155!-1112102250; SMUSERCOOKIE=shartul.kumar.consultant@nielsen.com; SMSESSION=i7fnBHeJoRY9zhCgCAdMwUfCikSZKkHm/FaAR4+jUrZheDYU/YIj/dzBp6v1TriJGZUhVA1Ng64q8lQVtWt87zuhWsEXCO9M4DLh7LKHm0C9ugMJe9MEhY1QVswAjL4rx7BgPOsKhzsaWCS+Ytnc0uXDKcJqmWlmvQ/ulPPK8y7mKGs1At/NtB4whLtVvyougdvPmWbI601V0pP372CvT+fsWl42rp2kfCstQJ+RiAzbLlDKNa/tfFPzqIGjcJ9giBU5uKz8621fNqRd4TgX8orshKBvK6HMkt0bu47c1usUQ9M18Neu2w/IjISRu4lTbCHuTRD1fyHz0Wx1jyssLRx+y6Wh2bDwTfS0SHhyJiFll4Sx+XqIIEBZ1avhdDX1sXSQRtiJkqy2YHGOsf7cSzBdLxFvw/gpCzrTdgupv9KUYnjow0bHl65ePWaoJunf3D1n9zhNuHT77ZSMFDnsVYmP9CjcpJXFLAEoefn6Q0kqp49PiBUu9MBs/oi2TJs9zVV+kk1eClbpbnRfpQsgjOHOv8DrWE8E05fM+IhAlB3KkmuzLXZxKgNJRAFdQmUhr3M6Lu7N7uUUyM4zAkWAbCU5B6uDvQ78jaluTvHDBV7CuAnyu8g67n/aPkydsHsIc7Cc3vpFODgCGOw+RhT+dKc2bsT5gffAkvvDwrU+2OibhmDQP3krYLPcFxrTUEM27BlSQVdLjdawaPKbu8ZSBiNPz0mp6MjeJBc9EN9gEfxpgWhOAZqK8A7MMvPTdr+6EIndJvX/d6tWVPGMBaCJSeamw3oRTW63JEKynoyy+dDac/c0ZPcYpwjt0avpm0Zn2FF78AKi7jeZj0GTnYk39LQau5e1m+bwG6I9egKbjTA8duuyBlKfjLv7MNXx4lITt+FdOgGDyUqsAQvoD1GRXSPIh63SJ0LM0F1P8T0PKCusF9zTamElWGR/xGOZMKbGJFwDTT5MabFQcR/NYla+FlMHkqM2EsViIefb/J/3j4AivVlNdAJCSLKPGLeNSNX0PJe2V2Uo6DqZDkggOn0UD1TPBBi5SMv6rw5ta0P59Xs4XbE0laylvTnFh6tBh/wN3fJIPJwdCGDJuf8+WjArknjeV04qXCw34Vv1LxB4Sp47oa+Wp1lIpsvVTivdE05mqzAshPplXl4b7z2YoP18NWPFGDGQNRG7Gx8S1YECScfeaLyfOdeguKBMaF0J2KknqC+Fx4l0PHYaFNf7tykD2JxGIgMCbLJ9xj4+EB3sN4ZeCN2d8ltxOGfB0sRH+FC9d1LVbcdbQW8kFNlJSjv/zlLMz/uQW5tEoLNpswXDOyJyFSZ+8c+/rjZw5FcKfy0gZyL4I2/cllSytKCbbfP1VQi53Savtv8AY+MUtn3Gy2S4ajU5JaVEpxkRiv3gibJUm9/tt/AsFg0jiAPMfaLhWP/Te2z9j8INDyo7jtf8luK0xXhO1BkIpQTYdnkdKjPAmNbcIXthxRS90bsG4K+x6+RN2o8Wjumj8pbYgB+aAy/RUe4pp1STW+a76aSv7ywoeYEWRm0K+9FvTE0RfX4EbcIa5ge7AKhxhsGuXPqe7U6NdB5fvp8IMQ2aQ6XYqOfnhwTWCDpsiSvypoakU9Rww6E7ktGcPmLQ',
        }
    }

});

describe("CDT Navigation Bar Test", function() {

    it('should get TreeMetaData', function () {
         return frisby
             .get(api_url)
             .expect('status', 200)
             .expect('header', 'Content-Type', 'application/json;charset=UTF-8')
             .inspectJSON()

     });
    /*it('should get unlock all Tree', function () {
        try {
            for (var i = 0; i <= JSONReader.result.length; i++) {

                frisby
                    .put(api_url + "/" + JSONReader.result[i].id + "/unlock")
                    //.expect('status', 200)
                   // .expect('header', 'Content-Type', 'application/json;charset=UTF-8')
                    .inspectJSON()
                   // .expect('status', 412)
                   .expect('bodyContains', {
                        status: 412,
                        error: 'Tree' + JSONReader.result[i].name + 'is already unlocked'
                    })
            }
        } catch (err) {
            console.log("caught an exception", err);
        }
    });*/

   /* it('should get lock all the Tree', function () {
        try {
            for (var i = 0; i <= JSONReader.result.length; i++) {
                frisby
                    .put(api_url + "/" + JSONReader.result[i].id + "/lock")
                    //.expect('status', 200)
                    //.expect('header', 'Content-Type', 'application/json;charset=UTF-8')
                    .inspectJSON()
                    /!*.expect('bodyContains', {
                        status: 412,
                        error: 'Tree' + JSONReader.result[i].name + 'is already locked'
                    })*!/
            }
        }catch (err) {
            console.log("caught an exception", err);
        }
    });*/

   /* it('should get rename all the Tree', function () {
        try {

            for (var i = 0; i <= JSONReader.result.length; i++) {
                frisby
                    .put(api_url + "/" + JSONReader.result[i].id + "/rename", {
                        "name": "change of name for all - api automation"
                    })
                    //.expect('status', 200)
                   // .expect('header', 'Content-Type', 'application/json;charset=UTF-8')
                    .inspectJSON()
                    /!*.expect('bodyContains', {
                        status: 412,
                        error: 'Tree' + JSONReader.result[i].name + 'is already locked'
                    })*!/
            }
        }catch (err) {
            console.log("caught an exception", err);
        }
    });*/
});



