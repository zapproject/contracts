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
    // import { FactoryToken } from '../typechain/FactoryToken';
    import { Erc1155 } from '../typechain/Erc1155';
    import { Erc1155Factory } from '../typechain/Erc1155Factory';
    import { RftTokenFactory } from '../typechain/RftTokenFactory';
// ABI
// ADDRESS
    let RFTDotFactory: RftDotFactory;
    let signers : any;
    let subscriber:any;
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
  let rftDotFactory: any;
  let factoryToken: any;
  let registry: Registry;
  
const zeroAddress = '0x0000000000000000000000000000000000000000';
    const title =
  '0x048a2991c2676296b330734992245f5ba6b98174d3f1907d795b7639e92ce532';
  const title2 =
  '0x077a2991c2676296b330734992245f5ba6b98174d3f1907d795b7639e92ce532';
  const specifier =
  '0x048a2991c2676296b330734992245f5ba6b98174d3f1907d795b7639e92ce577';
  const piecewiseFunction = [3, 0, 0, 2, 10000];

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
        subscriber = signers[1];

        
        factoryToken = await ethers.getContractFactory('ERC1155', signers[0]);
        const dbFactory = await ethers.getContractFactory('Database', signers[0]);
    dataBase = (await dbFactory.deploy()) as Database;

    const bondFactory = await ethers.getContractFactory('Bondage', signers[0]);
     zapToken = (await zapTokenFactory.deploy()) as ZapToken;
     cost = (await costFactory.deploy(coordinator.address)) as CurrentCost;

     registry = (await registryFactory.deploy(coordinator.address)) as Registry;

    await dataBase.transferOwnership(coordinator.address);
    await coordinator.addImmutableContract('DATABASE', dataBase.address);
    await coordinator.addImmutableContract('ZAP_TOKEN', zapToken.address);
    await coordinator.updateContract('REGISTRY', registry.address);
        await coordinator.updateContract('CURRENT_COST', cost.address);

    bondage = (await bondFactory.deploy(coordinator.address)) as Bondage;
    await coordinator.updateContract('BONDAGE', bondage.address);
    await coordinator.updateAllDependencies();

    await zapToken.deployed();


        //instantiate dotfactoryfactory
       const rftDotFactoryFactory = (await ethers.getContractFactory('RFTDotFactoryFactory', signers[0]));// as RftDotFactoryFactory;
       
        // deploys dotfactoryfactory
        RFTDotFactoryFactoryInstance=await rftDotFactoryFactory.deploy(coordinator.address, RFTTokenFactory.address) as unknown as RftDotFactoryFactory;
         // RFTDotFactoryFactoryInstance = (await rftDotFactoryFactory.deploy(coordinator.address, RFTTokenFactory.address)) as RftDotFactoryFactory;
        await RFTDotFactoryFactoryInstance.deployed();
        rftDotFactory = await ethers.getContractFactory('RFTDotFactory',signers[0]);
        // RFTDotFactoryInstance = await rftDotFactory.deploy(coordinator.address, RFTTokenFactory.address,77,title,2)

 
   

    });
    
    it('Should get accounts', () => {
    
       
    });
    function findEvent(logs: any, eventName: string) {
    for (let i = 0; i < logs.length; i++) {
      if (logs[i].event === eventName) {
        return logs[i];
      }
    }

    return null;
  }
    it('TOKEN_DOT_FACTORY_1 - constructor() - Check token dot factory initialization', async function () {
    console.log(rftDotFactory.address);
    RFTDotFactoryInstance = await rftDotFactory.deploy(coordinator.address, RFTTokenFactory.address,77,title,2)
  });
    it('TOKEN_DOT_FACTORY_2 - newToken() - Check new token creation', async function () {
    let factory = await rftDotFactory.deploy(coordinator.address, RFTTokenFactory.address,77,title,2)
    await factory.deployed();
    let tx = await factory.newToken('t1');
    tx = await tx.wait();

    await expect(
      ethers.utils.getAddress(ethers.utils.hexStripZeros(tx.logs[0].topics[2]))
    ).to.equal(factory.address);
  });
    it('TOKEN_DOT_FACTORY_3 - initializeCurve() - Check curve initialization', async function () {
    let factory = await rftDotFactory.deploy(coordinator.address, RFTTokenFactory.address,77,title,2);
    let tx = await factory.initializeCurve(specifier, title, piecewiseFunction);
    tx = await tx.wait();
    console.log(tx);

    let dotTokenCreatedEvent = findEvent(tx.events, 'DotTokenCreated');
    console.log(dotTokenCreatedEvent);
    await expect(dotTokenCreatedEvent).to.be.not.equal(null);
  });
    it('TOKEN_DOT_FACTORY_4 - initializeCurve() - Exception thrown if curve specifier already exists', async function () {
    let factory = await rftDotFactory.deploy(coordinator.address, RFTTokenFactory.address,77,title,2)
    let tx = await factory.initializeCurve(specifier, title, piecewiseFunction);
    tx = await tx.wait();
    console.log(tx);
    let dotTokenCreatedEvent = findEvent(tx.events, 'DotTokenCreated');
    await expect(dotTokenCreatedEvent).to.be.not.equal(null);

    await expect(factory.initializeCurve(specifier, title, piecewiseFunction))
      .to.reverted;
  });
    it('TOKEN_DOT_FACTORY_5 - bond() - Check bonding', async function () {
    let factory = await rftDotFactory.deploy(coordinator.address, RFTTokenFactory.address,77,title,2)
    await factory.initializeCurve(specifier, title2, piecewiseFunction);
    let reserveTokenAddr = await factory.reserveToken();
    let reserveToken = await zapToken.attach(reserveTokenAddr);
    await reserveToken.allocate(subscriber.address, 10000);
    await reserveToken.connect(subscriber).approve(factory.address, 10000);
    await factory.connect(subscriber).bond(specifier, 1);

    let subBalance = parseInt(
      (await reserveToken.balanceOf(subscriber.address)).toString()
    );
    console.log(subBalance);
    await expect(subBalance).to.be.not.equal(10000);
  });
    it('TOKEN_DOT_FACTORY_6 - bond() - Check that user can not bond without tokens', async function () {
    let factory = await rftDotFactory.deploy(coordinator.address, RFTTokenFactory.address,77,title,2)
    await factory.initializeCurve(specifier, title2, piecewiseFunction);
    let reserveTokenAddr = await factory.reserveToken();
    let reserveToken = await zapToken.attach(reserveTokenAddr);
    // await reserveToken.allocate(subscriber, 10000);
    await reserveToken.connect(subscriber).approve(factory.address, 10000);
    await expect(factory.connect(subscriber).bond(specifier, 1)).to.reverted;
  });
    it('TOKEN_DOT_FACTORY_7 - unbond() - Check unbonding', async function () {
    let factory = await rftDotFactory.deploy(coordinator.address, RFTTokenFactory.address,77,title,2);
    await factory.initializeCurve(specifier, title2, piecewiseFunction);
    let reserveTokenAddr = await factory.reserveToken();
    let reserveToken = await zapToken.attach(reserveTokenAddr);
    await reserveToken.allocate(subscriber.address, 10000);
    await reserveToken.connect(subscriber).approve(factory.address, 10000);
    await factory.connect(subscriber).bond(specifier, 1);
    console.log('finish bond');
    let curveTokenAddr = await factory.getTokenAddress(specifier);
    // console.log(curveTokenAddr);
    let curveToken = await factoryToken.attach(curveTokenAddr);

    // await curveToken.connect(subscriber).approve(factory.address, 1);
    await factory.connect(subscriber).unbond(specifier, 1);
  });
    it('TOKEN_DOT_FACTORY_8 - unbond() - Check that user can not unbond more than have', async function () {
    let factory =  await rftDotFactory.deploy(coordinator.address, RFTTokenFactory.address,77,title,2);
    await factory.initializeCurve(specifier, title2, piecewiseFunction);
    let reserveTokenAddr = await factory.reserveToken();
    let reserveToken = await zapToken.attach(reserveTokenAddr);
    await reserveToken.allocate(subscriber.address, 10000);
    await reserveToken.connect(subscriber).approve(factory.address, 10000);
    await factory.connect(subscriber).bond(specifier, 1);
    console.log('finish bond');
    let curveTokenAddr = await factory.getTokenAddress(specifier);

    let curveToken = await factoryToken.attach(curveTokenAddr);

    // await curveToken.connect(subscriber).approve(factory.address, 1);
    await expect(factory.connect(subscriber).unbond(specifier, 100)).to
      .reverted;
  });
    it('TOKEN_DOT_FACTORY_9 - getTokenAddress() - Check curve token address', async function () {
    let factory = await rftDotFactory.deploy(coordinator.address, RFTTokenFactory.address,77,title,2);
    await factory.initializeCurve(specifier, title2, piecewiseFunction);
    let curveTokenAddr = await factory.getTokenAddress(specifier);
    await expect(curveTokenAddr).to.not.equal(zeroAddress);
  });
    it('TOKEN_DOT_FACTORY_10 -deploy through dot factory Factory ', async function () {
    let factory = await RFTDotFactoryFactoryInstance.deployFactory(77,title,2);
    // let rftDotFactoryFactory.deploy(coordinator.address, RFTTokenFactory.address) as unknown as RftDotFactoryFactory;
    let factories=await RFTDotFactoryFactoryInstance.getFactories();
   // console.log(factories) 
    let Instantiated=await rftDotFactory.attach(factories[0])
    await Instantiated.initializeCurve(specifier, title2, piecewiseFunction)
    //await factory.initializeCurve(specifier, title2, piecewiseFunction);
    let curveTokenAddr = await Instantiated.getTokenAddress(specifier);
    await expect(curveTokenAddr).to.not.equal(zeroAddress);
  });
});
