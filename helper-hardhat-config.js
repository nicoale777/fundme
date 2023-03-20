const netWorkConfig = {
  11155111: {
    name: "sepolia",
    ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
  },
  31337: {
    name: "localhost",
  },
}

const developmentChain = ["hardhat", "localhost"]
const DECIMALS = 8
const INITIAL_ANSWER = 2000

module.exports = { netWorkConfig, developmentChain, DECIMALS, INITIAL_ANSWER }
