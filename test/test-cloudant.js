'use strict';
var assert   = require('assert'),
    mocha    = require('co-mocha');

// Ensure that I'm able to connect to Cloudant. This requires the following environment variables:
//
// * CLOUDANT_USER     - The cloudant username
// * CLOUDANT_KEY      - The API key
// * CLOUDANT_PASSWORD - The API key password
describe('Cloudant Connection', function(){
  it('should connect successfully with a callback', function(done){
    // How can I convert this to using generators
    var Cloudant = require('cloudant')({account: process.env.CLOUDANT_USER,
                                        key:process.env.CLOUDANT_KEY,
                                        password:process.env.CLOUDANT_PASSWORD},
                                        function(err, cloudant, reply){
                                          if(err) return done(err);
                                          /*var db = cloudant.use('indieweb');
                                          db.get('409b918243e7f84eb568acd22037cbaf', function(err2, body){
                                            console.log([err2,body]);
});*/
                                          done();
                                        });
  });
});
describe('Wrapped Cloudant Connection', function(){
  var options = {account: process.env.CLOUDANT_USER,
                 key:process.env.CLOUDANT_KEY,
                 password:process.env.CLOUDANT_PASSWORD}
  it('should connect with the wrapper', function *()
  {
    var Cloudant = require('../lib/wrap-cloudant');
    yield Cloudant.connect(options, process.env.CLOUDANT_DATABASE);
    assert(this.cloudant);
    assert(this.db);
  });
  it('should get a record by id', function *()
  {
    var Cloudant = require('../lib/wrap-cloudant');
    yield Cloudant.connect(options, process.env.CLOUDANT_DATABASE);
    var body = yield Cloudant.get('409b918243e7f84eb568acd22037cbaf');                           
    assert(body[0]._id === '409b918243e7f84eb568acd22037cbaf');
  });
  it('should list records', function *()
  {
    var Cloudant = require('../lib/wrap-cloudant');
    yield Cloudant.connect(options, process.env.CLOUDANT_DATABASE);
    var body = yield Cloudant.list();
    assert(body[0].total_rows === body[0].rows.length);
  });
  it('should respond to ping', function *()
  {
    var Cloudant = require('../lib/wrap-cloudant');
    yield Cloudant.connect(options, process.env.CLOUDANT_DATABASE);
    var response = yield Cloudant.ping();
    assert(response.couchdb);
  })
});