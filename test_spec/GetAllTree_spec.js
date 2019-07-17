var frisby = require('frisby');
var tokenReader = require('../token.json')
var api_url ="https://dc2.answersqc.nielsen.com/cdt/metadata/api/treeMetadata"; //"https://answersdev.nielsen.com/cdt/metadata/api/treeMetadata"    ;//env.baseUrl+'/posts';

frisby.globalSetup({
    request: {
        headers: {
            'Content-Type': 'text/plain;charset=utf-8',
            'Accept': 'application/json, text/plain, */*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            "access_token": tokenReader.token.access_token
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
});



