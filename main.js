
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";

let web3;
let provider;
let account;

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "1e0153a074db4c0a88bdfb159f8ef93d"
    }
  }
};

const web3Modal = new Web3Modal({
  cacheProvider: false,
  providerOptions
});

const presaleAddress = "0x3F7F7bC596D0494506993e38471894Af7bC41628";
const abi = [{'inputs': [], 'name': 'buyTokens', 'outputs': [], 'stateMutability': 'payable', 'type': 'function'}, {'inputs': [], 'name': 'token', 'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}], 'stateMutability': 'view', 'type': 'function'}];

async function connectWallet() {
  try {
    provider = await web3Modal.connect();
    web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    account = accounts[0];
    alert("Wallet connesso: " + account);
  } catch (e) {
    console.error("Connessione fallita", e);
    alert("Connessione fallita. Riprova.");
  }
}

async function buyTokens() {
  if (!web3 || !account) {
    alert("Per favore connetti prima il wallet.");
    return;
  }
  const contract = new web3.eth.Contract(abi, presaleAddress);
  const valueBNB = web3.utils.toWei("0.1", "ether"); // acquisto di esempio da 0.1 BNB
  try {
    const tx = await contract.methods.buyTokens().send({
      from: account,
      value: valueBNB
    });
    alert("Acquisto riuscito!");
  } catch (err) {
    console.error("Errore durante l'acquisto", err);
    alert("Errore durante l'acquisto. Riprova.");
  }
}

window.connectWallet = connectWallet;
window.buyTokens = buyTokens;
