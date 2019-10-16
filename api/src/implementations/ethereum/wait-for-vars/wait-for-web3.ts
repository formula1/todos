
import {
  Web3,
} from "../../../util/ethereum";

type MaybeWeb3 = {
  web3: void | Web3
}

type MaybeEth = {
  ethereum: void | any
};

export function waitForWeb3Users(win:Window & MaybeWeb3 & MaybeEth, url: string): Promise<Web3>{
  return Promise.resolve().then(()=>{
    if(typeof win.ethereum){
      const web3 = new Web3(win.ethereum);
      // win.ethereum.on('accountsChanged', function (accounts) {
      //   // Time to reload your interface with accounts[0]!
      // })
      return win.ethereum.enable().then((accounts: any)=>{
        console.log(accounts)
        return web3
      })
    }
    alert("This Application currently only works with MetaMask: https://metamask.io/")
    const web3 = win.web3 ? win.web3 : new Web3(url);
    (web3.currentProvider as any).publicConfigStore.on('update',(update: any)=>{
      console.log(update)
    });
    return web3;

  });
}
