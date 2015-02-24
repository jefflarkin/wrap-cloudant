'use strict';
var Cloudant = require('cloudant');
module.exports.connect = function(options)
{
  return function(done)
  {
    let cloudant = Cloudant(options, done);
    this.db = cloudant.use('indieweb');
  }
}
module.exports.get = function(key)
{
  return function(done)
  {
    
    return this.db.get(key,done);
  }
}
module.exports.list = function(params)
{
  return function(done)
  {
    return this.db.list(params,done);
  }
}