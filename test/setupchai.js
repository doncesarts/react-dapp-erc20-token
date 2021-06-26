"use strict";
const chai = require("chai");
const BN = web3.utils.BN;
// Chai assertions for comparing arbitrary-precision integers using the bn.js library. Forked from chai-bignumber, which uses the bignumber.js library.
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
module.exports = chai;