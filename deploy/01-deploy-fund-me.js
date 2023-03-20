/*
async function deployFunc(hre) {}

module.exports.default = deployFunc
*/
//hre hardhat enviroment variable

const { network } = require("hardhat")
const { netWorkConfig, developmentChain } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

/*module.exports = async (hre) => {
    const {getNamedAccounts, deployments}=hre
*/
module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId
  log(chainId)
  let ethUsdPriceFeedAddress
  log(network.name)
  if (developmentChain.includes(network.name)) {
    const ethUsdAggregator = await deployments.get("MockV3Aggregator")
    ethUsdPriceFeedAddress = ethUsdAggregator.address
  } else {
    ethUsdPriceFeedAddress = netWorkConfig[chainId]["ethUsdPriceFeed"]
  }

  const args = [ethUsdPriceFeedAddress]
  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: args,
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: network.config.blockConfirmations || 1,
  })
  log("---------------------------------------------------")

  if (
    !developmentChain.includes(network.name) &&
    process.env.API_KEY_ETHERSCAN
  ) {
    await verify(fundMe.address, args)
  }
}

module.exports.tags = ["all", "fundme"]
