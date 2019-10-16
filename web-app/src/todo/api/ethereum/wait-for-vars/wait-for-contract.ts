import {
  Web3,
  ContractImportClass,
  Contract,
  findContract,
  tryToSendTransaction,
} from "../../../../util/ethereum";

import {
  Promise,
  SingleResultPromise,
} from "../../../../util/promise"

export class ContractHelper extends SingleResultPromise<Contract> {
  private web3: Web3;
  private ContractType: ContractImportClass
  private args: Array<any> = [];

  constructor(){
    super();
  }

  setArgs(web3: Web3, contractType: ContractImportClass, args: Array<any>){
    this.web3 = web3;
    this.ContractType = contractType;
    this.web3.eth.getAccounts().then((accounts)=>{
      console.log(accounts);
    })
    this.args = args;
    this.setPromise(
      this.findOrCreateContract()
    )
  }

  private findOrCreateContract(): Promise<Contract>{
    return findContract(this.web3, this.ContractType.evm.bytecode.object).then((addresses)=>{
      if(addresses.length > 0){
        console.log("found contract");
        return new this.web3.eth.Contract(this.ContractType.abi, addresses[0])
      }
      const newContract = new this.web3.eth.Contract(this.ContractType.abi)
      const deployAbleContract = newContract.deploy({
        data: this.ContractType.evm.bytecode.object,
        arguments: [
          // Math.random().toString(32),
          // Math.random().toString(2),
          // Math.random().toString(2),
          // Math.random().toString(2),
          // Math.random().toString(2),
        ]
      });
      return tryToSendTransaction(this.web3, deployAbleContract)
    }).catch((err)=>{
      console.error(err);
      throw err
    })
  }
};
