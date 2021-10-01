// Import this so that the hardhat runtime is extended with an ethers property (see below)
import "@nomiclabs/hardhat-ethers";

import { Vault__factory } from "elf-contracts-typechain/dist/types/factories/Vault__factory";
import { Vault } from "elf-contracts-typechain/dist/types/Vault";
import hre from "hardhat";

// The Provider handles the connection to an ethereum node. You can configure
// this in the hardhat.config.js.
export const { provider } = hre.ethers;

// https://docs.balancer.fi/developers/smart-contracts/deployment-addresses
const BALANCER_VAULT_ADDRESS = "0xBA12222222228d8Ba445958a75a0704d566BF2C8";

// The balancer vault contains the Element pools for principal and yield tokens.
// You can import the balancer vault directly from elf-contracts-typechain
export const vaultContract: Vault = Vault__factory.connect(
  BALANCER_VAULT_ADDRESS,
  provider
);

(async function () {
  // https://github.com/element-fi/elf-tokenlist/blob/main/dist/mainnet.tokenlist.json
  const DAI_PRINCIPAL_TOKEN_POOL_ID =

    "0x71628c66c502f988fbb9e17081f2bd14e361faf4000200000000000000000078";
  const [poolTokens] = await vaultContract.functions.getPoolTokens(
    DAI_PRINCIPAL_TOKEN_POOL_ID
  );
  console.log(
    `BalancerVault.getPoolTokens(${DAI_PRINCIPAL_TOKEN_POOL_ID}) result: ${JSON.stringify(
      poolTokens,
      null,
      2
    )}`
  );
})();
