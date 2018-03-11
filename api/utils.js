const client = require('../boundaries/cassandra').client;


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

  module.exports = {
    execQuery
  }