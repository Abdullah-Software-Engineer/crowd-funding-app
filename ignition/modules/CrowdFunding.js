const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


// 0x5FbDB2315678afecb367f032d93F642f64180aa3

module.exports = buildModule("CrowdFundingModule", (m) => {
  // Deploy the CrowdFunding contract
  const crowdFunding = m.contract("CrowdFunding");

  return { crowdFunding };
}); 