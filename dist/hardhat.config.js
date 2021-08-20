"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
dotenv_1.config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-typechain");
require("hardhat-deploy");
require("./tasks/faucet");
require("./tasks/checkbalance");
require("./tasks/checkbalances");
require("./tasks/buyzap");
require("./tasks/initProvider");
require("./tasks/initProviderCurve");
require("./tasks/setEndpointParams");
require("./tasks/bond");
require("./tasks/dispatch");
// TODO: reenable solidity-coverage when it works
// import "solidity-coverage";
var INFURA_API_KEY = process.env.INFURA_API_KEY || "";
var RINKEBY_PRIVATE_KEY = process.env.RINKEBY_PRIVATE_KEY ||
    "0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3"; // well known private key
var ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
var config = {
    solidity: {
        compilers: [{ version: "0.4.24", settings: {} }, { version: "0.5.1", settings: {} }, { version: "0.8.0", settings: {} }],
    },
    networks: {
        localhost: {
            url: "http://127.0.0.1:8545/",
        },
        hardhat: {},
        rinkeby: {
            url: "https://rinkeby.infura.io/v3/fc6c9b3a492e44d693215948a79a3663",
            accounts: [RINKEBY_PRIVATE_KEY],
        },
        coverage: {
            url: "http://127.0.0.1:8555",
        },
    },
    etherscan: {
        // Your API key for Etherscan
        // Obtain one at https://etherscan.io/
        apiKey: ETHERSCAN_API_KEY,
    },
};
exports.default = config;
