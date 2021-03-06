let chalk = require('chalk');
var _ = require('lodash');

let checkpointsService = require('./staticCheckpoints');


let calculateDistanceWithRssi = rssi => {
  var txPower = -59; // hard coded power value. Usually ranges between -59 to -65
  if (rssi == 0) {
    return -1.0;
  }
  var ratio = rssi * 1.0 / txPower;
  if (ratio < 1.0) {
    return Math.pow(ratio,10);
  } else {
    var distance = (0.89976) * Math.pow(ratio, 7.7095) + 0.111;
    return distance;
  }
};

let transformCheckpoint = (checkpoint) => {
  if (checkpoint) {
    var newCheckpoint = {};
    // Get back essential properties
    newCheckpoint.serviceData = checkpoint.advertisement.serviceData;
    newCheckpoint.serviceUuids = checkpoint.advertisement.serviceUuids;
    // Transform data about distance
    newCheckpoint.distance = calculateDistanceWithRssi(checkpoint.rssi);
    // Clean uninteresting properties

    delete newCheckpoint.id;
    delete newCheckpoint.address;
    delete newCheckpoint.addressType;
    delete newCheckpoint.advertisement;
    delete newCheckpoint.rssi;
    delete newCheckpoint.services;
    // Everything is ok
    return newCheckpoint;
  } else {
    return false;
  }
};

let showCheckpoint = (checkpoint, index) => {
  console.log(chalk.green('CHECKPOINT'), chalk.yellow(index + 1));

  _.mapKeys(checkpoint, checkpointProporty => {
    console.log(chalk.cyan(checkpointProporty));
  });
  // for (var property in checkpoint) {
  //   if (checkpoint.hasOwnProperty(property)) {
  //     console.log(chalk.cyan(property.toUpperCase()), checkpoint[property]);
  //   }
  // }
  console.log('\n');
};

let run = () => {
  let checkpoints = checkpointsService.getCheckpoints();
  checkpoints.forEach(function(checkpoint) {
    showCheckpoint( transformCheckpoint(checkpoint), checkpoints.indexOf(checkpoint) );
  });

  // });
  // for (var i = 0; i < checkpoints.length; i++) {
  //   let checkpoint = checkpoints[i];
  //   transformCheckpoint(checkpoint);
  //   showCheckpoint(checkpoint, i);
  // }
};

module.exports = {
  transformCheckpoint: transformCheckpoint,
  showCheckpoint: showCheckpoint,
  run: run
};