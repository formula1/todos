
import {
  Web3,
  Web3EventEmitter,
  tryToSendTransaction
} from "../../util/ethereum";

import {EventEmitter} from "../../util/events";

import {
  ITodoAPI,
  Todo,
  TodoInit
} from "../../types/todo";

import {
  SingleResultPromise,
} from "../../util/promise"

var TodoSol = require("../../../contracts/todo.sol");

console.log(TodoSol);

const TodoListsContract = TodoSol.contracts["todo.sol"].TodoLists;
console.log(TodoListsContract);
// console.log(TodoListsContract.evm.bytecode.object);

import {
  EthDBArgs,
} from "./constants";

import {
  ContractHelper
} from "./wait-for-vars/wait-for-contract";

import {
  waitForWindow
} from "./wait-for-vars/wait-for-window";
import {
  waitForWeb3Users
} from "./wait-for-vars/wait-for-web3";

export class EthTodoAPI extends EventEmitter implements ITodoAPI {
  private helper: ContractHelper;
  private ContractType: {
    abi: Array<any>,
    evm: {
      bytecode: {object: string}
    }
  }
  private event: Web3EventEmitter;

  private ethereum: any;
  private web3: void | Web3;

  private web3Resolver: SingleResultPromise<Web3>
  private contractResolver: ContractHelper;


  constructor(args: EthDBArgs){
    super()
    this.ContractType = TodoListsContract;
    console.log(Object.keys(window));

    this.web3Resolver = new SingleResultPromise(
      waitForWindow().then((win: Window)=>{
        return waitForWeb3Users(win as any, args.url)
      })
    );
    this.contractResolver = new ContractHelper()

    this.contractResolver.waitForResult().then((contract)=>{
      contract.events.ChangeEvent().on("data",()=>{
        console.log("new update event from contract");
        this.emit("update");
      })
      this.r_Count()
    });

    this.web3Resolver.waitForResult().then((web3: Web3)=>{
      this.web3 = web3;
      this.contractResolver.setArgs(
        web3, TodoListsContract, []
      )
    });
    // win.ethereum.on('accountsChanged', function (accounts) {
    //   // Time to reload your interface with accounts[0]!
    // })

    this.web3Resolver.waitForResult().then((web3: Web3)=>{
      (this.web3 as any).currentProvider.publicConfigStore.on('update',(update: any)=>{
        console.log("configure event");
      });
    })


    this.on("update", ()=>{
      console.log("updating");
    })
  }

  deconstruct(){
    (this.event as any).removeAllListeners("data")
    (this.web3 as any).currentProvider.publicConfigStore.removeAllListeners()
  }
  public r_Count(): Promise<number> {
    console.log("ASK FOR COUNT");
    return this.contractResolver.waitForResult().then((contract)=>{
      console.log("go contract:", contract);
      return contract.methods.requestItemCount().call()
    }).then((result)=>{
      console.log("Count:", result)
      return parseInt(result);
    });
  }

  public r_List(): Promise<Array<string>> {
    return Promise.all([
      this.r_Count(),
      this.contractResolver.waitForResult()
    ]).then(([count, contract])=>{
      console.log("typeof:", typeof count)
      if(count === 0) return [];
      const uids = [];
      for(var i=0;i<count;i++){
        uids.push(
          contract.methods.allTodos(i).call()
        )
      }
      return Promise.all(uids);
    })
  }
  public r_Single(id: string): Promise<Todo> {
    console.log("LOADING SINGLE ID:", id)
    return this.contractResolver.waitForResult().then((contract)=>{
      return contract.methods.requestItemSingle(id).call()
    }).then((result)=>{
      console.log("SINGLE:",result)
      return {
        created: parseInt(result.created) * 1000,
        finished: parseInt(result.finished) * 1000,
        description: result.description,
        owner: result.owner,
        _id: result._id
      };
    });
  }
  public r_All(): Promise<Array<Todo>> {
    return this.r_List().then((list)=>{
      return Promise.all(list.map((id)=>{
        return this.r_Single(id);
      }))
    });
  }


  public c_createItem(item: TodoInit): Promise<Todo>{
    return Promise.all([
      this.web3Resolver.waitForResult(),
      this.contractResolver.waitForResult()
    ]).then(([web3, contract])=>{
      return tryToSendTransaction(web3, contract.methods.createItem(item.description))
    }).catch((error)=>{
      console.error(error);
      throw error
    });
  }
  public u_finishItem(id: string): Promise<Todo> {
    console.log("attempting to finish:", id);
    return Promise.all([
      this.web3Resolver.waitForResult(),
      this.contractResolver.waitForResult()
    ]).then(([web3, contract])=>{
      return tryToSendTransaction(web3, contract.methods.uFinishItem(parseInt(id))).catch((e)=>{
        console.error(e);
        throw e;
      })
    });
  }
  public d_deleteItem(id: string): Promise<Todo>{
    return Promise.all([
      this.web3Resolver.waitForResult(),
      this.contractResolver.waitForResult()
    ]).then(([web3, contract])=>{
      return tryToSendTransaction(web3, contract.methods.deleteItem(id))
    });
  }
};
