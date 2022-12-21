//used for factory.js
import Web3 from "web3";

let web3; //variable that can be altered through the term "let"
// const web3 = new Web3(window.web3.currentProvider); //assumption that metamask already injected a web3 instance onto the page
 
if (typeof window !== "undefined" && typeof window.web3 !== "undefined") { //if user IS using metamask
    // We are in the browser and metamask is running.
    web3 = new Web3(window.web3.currentProvider);
} else { //if user ISN'T using metamask
    // We are on the server *OR* the user is not running metamask
    const provider = new Web3.providers.HttpProvider(
      "https://goerli.infura.io/v3/11cf3c38eaa9407ab8037da1478cbfd0" 
      /*dont worry, everyone cant use your access key, infura is not used for storing any account info,
      it is solely used as a portal to access the Ethereum network. So right now it is totally fine to 
      share this key around, especially since it is free and you did't pay any money to get it anyways. NBD
      */
    );
    web3 = new Web3(provider);
}

export default web3; 

 

 
