require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();

module.exports = {
  solidity: "0.8.27",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/cvw978XfG_7phlso1PZNJYAqwHn5lvhs",
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    }
  },
  paths: {
    sources: "./contracts",  // Percorso ai contratti
    cache: "./cache",  // Percorso alla cache
    artifacts: "./artifacts"  // Percorso agli artefatti generati
  }
};
