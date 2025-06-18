let web3;
let userAccount;
const contractAddress = "0x674dc4138445ba55dbf785deeef818129301a861";  // Wallet della presale
const abiUrl = "contractABI.json";

document.getElementById("connectWallet").addEventListener("click", async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      userAccount = accounts[0];
      document.getElementById("walletAddress").innerText = "Wallet: " + userAccount;
    } catch (error) {
      document.getElementById("status").innerText = "Connessione rifiutata.";
    }
  } else {
    alert("Installa MetaMask o un wallet compatibile.");
  }
});

document.getElementById("buyTokens").addEventListener("click", async () => {
  const bnbAmount = document.getElementById("bnbAmount").value;
  if (!bnbAmount || isNaN(bnbAmount) || parseFloat(bnbAmount) <= 0) {
    document.getElementById("status").innerText = "Inserisci una quantità valida di BNB.";
    return;
  }

  const response = await fetch(abiUrl);
  const contractABI = await response.json();
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  try {
    await web3.eth.sendTransaction({
      from: userAccount,
      to: contractAddress,
      value: web3.utils.toWei(bnbAmount, "ether")
    });

    document.getElementById("status").innerText = "BNB inviati con successo. Riceverai i KLB a fine presale.";
  } catch (err) {
    document.getElementById("status").innerText = "Errore: " + err.message;
  }
});