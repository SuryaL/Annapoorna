const client = require('../boundaries/cassandra').client;
// console.log(cassandra);

// execute cassandra queries
const execQuery = async function(query, params, options) {
    // return { rows: ["hi"] };
    let defaultOptions = {
      prepare: true
    };
  
    Object.assign(defaultOptions, options || {});
  
    try {
      const result = await client.execute(query, params || null, defaultOptions);
      return result;
    } catch (err) {
      err.__source__ = 'db';
      throw err;
    }
  };


  const handleReq = fun => async function (req, res, next) {
    try {
      res.send(200, await fun(req));
      next && next();
    } catch (err) {
      console.log('err ---------------------- ');
      // console.error(err.stack, err.blocksStack);
      console.error(err.blocksStack);
      res.status(500).send(err)
    }
  };
  module.exports = {
    execQuery,
    handleReq
  }