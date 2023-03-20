require("@nomicfoundation/hardhat-toolbox")
require("@nomicfoundation/hardhat-chai-matchers")
require("hardhat-gas-reporter")
require("hardhat-deploy")
require("dotenv").config()

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY
const API_KEY_ETHERSCAN = process.env.API_KEY_ETHERSCAN
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [{ version: "0.8.18" }, { version: "0.6.6" }],
  },
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [SEPOLIA_PRIVATE_KEY],
      chainId: 11155111,
      blockConfirmations: 6,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
      1: 0,
    },
  },
  etherscan: {
    apiKey: API_KEY_ETHERSCAN,
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    apiKey: COINMARKETCAP_API_KEY, //from https://pro.coinmarketcap.com/account
    token: "ETH", //a que red estoy desplegando MATIC significa poligon
  },
}
