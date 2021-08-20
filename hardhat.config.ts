import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

import { HardhatUserConfig } from "hardhat/types";

import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-typechain";
import "hardhat-deploy";
import "hardhat-gas-reporter";
import './tasks/faucet';
import './tasks/checkbalance';
import './tasks/checkbalances';
import './tasks/buyzap';
import './tasks/initProvider';
import './tasks/initProviderCurve';
import './tasks/setEndpointParams';
import './tasks/bond';
import './tasks/dispatch';


// TODO: reenable solidity-coverage when it works
// import "solidity-coverage";

   const INFURA_API_KEY = process.env.INFURA_API_KEY || "";
// const RINKEBY_PRIVATE_KEY =
//   process.env.RINKEBY_PRIVATE_KEY! ||
  
  const KOVAN_PRIVATE_KEY = process.env.KOVAN_PRIVATE_KEY! || "";

  "0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3"; // well known private key
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

const config: HardhatUserConfig = {

  solidity: {
    compilers: [{ version: "0.4.24", settings: {} }, { version: "0.5.1", settings: {} }, { version: "0.8.0", settings: {} }],
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",

    },
    hardhat: {
    
    },
    // rinkeby: {
    //   url: "https://rinkeby.infura.io/v3/fc6c9b3a492e44d693215948a79a3663",
    //   accounts: [RINKEBY_PRIVATE_KEY],
    //   gas: 82000,
    //   gasPrice: "auto",
    //   gasMultiplier: 1
    // },
      kovan: {
        url: "https://kovan.infura.io/v3/336f97bd956743d6891b9a9d7b133c73",
        accounts: [KOVAN_PRIVATE_KEY],
        //gas: "auto",
        //gasPrice: "auto",
        gasMultiplier: 1
      },

    coverage: {
      url: "http://127.0.0.1:8545", // Coverage launches its own ganache-cli client
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
  },
};

export default config;