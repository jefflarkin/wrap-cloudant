'use strict';
var Cloudant = require('cloudant');
module.exports.connect = function(options,database)
{
  return function(done)
  {
    this.cloudant = Cloudant(options, done);
  }
}
module.exports.use = function(database)
{
  return function(done)
  {
    this.db = this.cloudant.use(database);
    done();
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
module.exports.view = function(designname, viewname, options)
{
  return function(done)
  {
    return this.db.view(designname,viewname,options,done);
  }
}
module.exports.insert = function(doc, doc_id)
{
  return function(done)
  {
    return this.db.insert(doc,doc_id,done);
  }
}
module.exports.destroy = function(doc_id, rev)
{
  return function(done)
  {
    return this.db.destroy(doc_id, rev, done);
  }
}