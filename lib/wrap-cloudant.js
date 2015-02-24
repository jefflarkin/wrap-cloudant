'use strict';
var Cloudant = require('cloudant');
module.exports.connect = function(options,database)
{
  return function(done)
  {
    this.cloudant = Cloudant(options, done);
    this.db = this.cloudant.use(database);
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
module.exports.ping = function()
{
  return function(done)
  {
    return this.cloudant.ping(done);
  }
}