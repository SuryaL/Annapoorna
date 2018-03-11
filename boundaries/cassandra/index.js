'use strict';

const Promise   = require ('bluebird');
const cassandra = require ('cassandra-driver');
const Client    = require ('cassandra-prom')(cassandra.Client);

Promise.config({
  // Enable warnings
  warnings: false,
  // Enable long stack traces
  longStackTraces: true,
  // Enable cancellation
  cancellation: false,
  // Enable monitoring
  monitoring: true
});

exports.init = function (config) {
  return new Promise (function (resolve, reject) {
    exports.client = new Client(config);
    exports.client.connect(function(err, result) {
      if (err) {
        console.log (err);
      } else {
        var describeVersion = 'select release_version from system.local;';
        exports.client.execute(describeVersion, [])
        .then(function(results) {
          var version = results.rows[0].release_version;
          console.log ('Connected to Cassandra v' + version);
          resolve();
        });
      }
    });
  });
};

/**
 * sendBatchInGroups - send sets of batches instead of all at once; Currently a hard limit of 10
 * @param  {Array} batch - long array of batch queries
 * @return {Promise}       promise
 */
exports.sendBatchInGroups = function (batch) {
  var set = [];
  var counter = 0;
  var current = 0;
  for (var i = 0; i < batch.length; i++) {
    if (counter == 0) {
      set.push([]);
    }
    set[current].push (batch[i]);
    if (counter > 9) {
      counter = 0;
      current++;
    } else {
      counter++;
    }
  }

  return Promise.map (set, function (group) {
    return exports.client.batch (group, { prepare : true });
  });
}