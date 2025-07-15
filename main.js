
let web3;
let provider;
let account;

const providerOptions = {
  walletconnect: {
    package: window.WalletConnectProvider.default,
    options: {
      rpc: {
        56: "https://bsc-dataseed.binance.org/"
      },
      chainId: 56
    }
  }
};

const web3Modal = new window.Web3Modal({
  cacheProvider: false,
  providerOptions
});

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

  const presaleAddress = "0x3F7F7bC596D0494506993e38471894Af7bC41628";
  const abi = [
    {
      "inputs": [],
      "name": "buyTokens",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    }
  ];

  const contract = new web3.eth.Contract(abi, presaleAddress);
  const input = document.getElementById("bnbAmount");
  const valueBNB = web3.utils.toWei(input.value || "0", "ether");

  try {
    await contract.methods.buyTokens().send({
      from: account,
      value: valueBNB
    });
    alert("Acquisto completato!");
  } catch (err) {
    console.error("Errore acquisto", err);
    alert("Errore durante l'acquisto.");
  }
}

window.connectWallet = connectWallet;
window.buyTokens = buyTokens;
