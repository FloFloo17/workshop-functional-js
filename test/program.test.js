var expect = require('chai').expect;

var transformCheckpoint = require('../src/program').transformCheckpoint;


let exampleData = 
	  {
	  id: 'whataw0nd3rful1d',
	  uuid: 'whataw0nd3rful1d',
	  address: 'unknown',
	  addressType: 'unknown',
	  connectable: true,
	  advertisement: {
	    localName: undefined,
	    txPowerLevel: undefined,
	    manufacturerData: undefined,
	    serviceData: [],
	    serviceUuids: [ 'abcd' ]
	  },
	  rssi: -66,
	  services: null,
	  state: 'outofcontrol'
	}

describe('Function transformCheckpoint', function() {

  it('Function transformCheckpoint without parameter should return false', function() {
    expect(transformCheckpoint()).to.be.false;
  });

    it('Function transformCheckpoint verify that the is pure', function() {
    	let saveExampleData = exampleData;
    	transformCheckpoint(exampleData);
    	expect(exampleData).to.eql(saveExampleData);
  });

});