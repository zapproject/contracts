    import { ethers } from 'hardhat';
    import { solidity } from 'ethereum-waffle';
    import chai from 'chai';
    const { expect } = require('chai');
    import mocha from 'mocha';
    import { RftDotFactory } from '../typechain/RftDotFactory';
    import { ZapCoordinator } from '../typechain/ZapCoordinator';
    import {RftDotFactoryFactory} from '../typechain/RftDotFactoryFactory';

    import { Database } from '../typechain/Database';
import { Registry } from '../typechain/Registry';
import { Bondage } from '../typechain/Bondage';
import { ZapToken } from '../typechain/ZapToken';
import { CurrentCost } from '../typechain/CurrentCost';
    //import { TokenFactory } from '../typechain/TokenFactory';
    import { Erc1155Factory } from '../typechain/Erc1155Factory';
    import { RftTokenFactory } from '../typechain/RftTokenFactory';
// ABI
// ADDRESS

    let RFTDotFactory: RftDotFactory;
    let signers : any;
    let coordinator: ZapCoordinator;
    let coordinatorFactory: any;
    //let factory : TokenFactory;
    let RFTTokenFactory : RftTokenFactory;
    let RFTDotFactoryFactory:RftDotFactoryFactory;
    let RFTDotFactoryInstance:any;
    let RFTDotFactoryFactoryInstance:any;
    let zapToken: ZapToken;
  
  let dataBase: Database;
  let bondage: Bondage;
  let cost: CurrentCost;
  
  let factoryToken: any;
  let registry: Registry;
  
    const title =
  '0x048a2991c2676296b330734992245f5ba6b98174d3f1907d795b7639e92ce532';
describe('Testing', () => {
    
    beforeEach(async () => {
    signers = await ethers.getSigners();
    
        // Instantiates coordinator contract
        const coordinatorFactory = await ethers.getContractFactory('ZapCoordinator', signers[0]);
      
        // deploys coordinator contract
        coordinator = (await coordinatorFactory.deploy()) as ZapCoordinator;
        await coordinator.deployed();
    
        // Instantiate token factory contract
        const zapTokenFactory = await ethers.getContractFactory(
      'ZapToken',
      signers[0]
    );
        const RFTFactory = await ethers.getContractFactory('RFTTokenFactory',signers[0]);
        RFTTokenFactory = (await RFTFactory.deploy()) as RftTokenFactory;
           const registryFactory = await ethers.getContractFactory(
      'Registry',
      signers[0]
    );
    const costFactory = await ethers.getContractFactory(
      'CurrentCost',
      signers[0]
    );
    const dotFactoryFactory = await ethers.getContractFactory(
      'DotFactoryFactory',
      signers[0]
    );
        const dbFactory = await ethers.getContractFactory('Database', signers[0]);
    dataBase = (await dbFactory.deploy()) as Database;

    const bondFactory = await ethers.getContractFactory('Bondage', signers[0]);
     zapToken = (await zapTokenFactory.deploy()) as ZapToken;
     cost = (await costFactory.deploy(coordinator.address)) as CurrentCost;

     registry = (await registryFactory.deploy(coordinator.address)) as Registry;
    await coordinator.addImmutableContract('DATABASE', dataBase.address);
    
    await coordinator.addImmutableContract('ZAP_TOKEN', zapToken.address);
    await coordinator.updateContract('REGISTRY', registry.address);
    //     await coordinator.updateContract('CURRENT_COST', cost.address);

    await zapToken.deployed();


        //instantiate dotfactoryfactory
       const rftDotFactoryFactory = (await ethers.getContractFactory('RFTDotFactoryFactory', signers[0]));// as RftDotFactoryFactory;
       
        // deploys dotfactoryfactory
        RFTDotFactoryFactoryInstance=await rftDotFactoryFactory.deploy(coordinator.address, RFTTokenFactory.address) as unknown as RftDotFactoryFactory;
         // RFTDotFactoryFactoryInstance = (await rftDotFactoryFactory.deploy(coordinator.address, RFTTokenFactory.address)) as RftDotFactoryFactory;
        await RFTDotFactoryFactoryInstance.deployed();
        const rftDotFactory = await ethers.getContractFactory('RFTDotFactory',signers[0]);
        RFTDotFactoryInstance = await rftDotFactory.deploy(coordinator.address, RFTTokenFactory.address,77,title,2)

 
   

    });
    
    it('Should get accounts', () => {
    
       
    })
});
