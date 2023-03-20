const { assert } = require("chai")
const { getNamedAccounts, ethers, network } = require("hardhat")
const {
  isCallTrace,
} = require("hardhat/internal/hardhat-network/stack-traces/message-trace")
const {
  netWorkConfig,
  developmentChain,
} = require("../../helper-hardhat-config")

developmentChain.includes(network.name)
  ? describe.skip
  : describe("FundMe", async function () {
      let fundMe
      let deployer
      const sendValue = ethers.utils.parseEther("0.00001")

      beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer
        fundMe = await ethers.getContract("FundMe", deployer)
      })

      it("withdraw test", async function () {
        await fundMe.fund({ value: sendValue })
        await fundMe.withdraw()
        const endingBalance = await fundMe.provider.getBalance(fundMe.address)
        assert.equal(endingBalance.toString(), "0")
      })
    })
