/** @type import('hardhat/config').HardhatUserConfig */
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
const API_URL = "https://eth-goerli.g.alchemy.com/v2/Lj8AthiqYuTEvL3zwuvKQJJR9UQ0Thbv"
const PRIVATE_KEY = "9b87aff2aa7370a7f8ac94d7dd37fd7eff65044fbc350cf43d8ea952de814b4e"

module.exports = {
   solidity: "0.8.1",
   defaultNetwork: "goerli",
   networks: {
      hardhat: {},
      goerli: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}

