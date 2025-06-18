const contractAddress = "0x674dc4138445ba55dbf785deefe818129301a861";
let userAccount;

async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      userAccount = accounts[0];
      document.getElementById("walletAddress").innerText = `Wallet: ${userAccount}`;
    } catch (error) {
      console.error("User rejected request");
    }
  } else {
    alert("Wallet non trovato. Installa MetaMask.");
  }
}

async function sendBNB() {
  const amount = document.getElementById("bnbAmount").value;
  if (!amount || isNaN(amount) || amount <= 0) {
    document.getElementById("statusMsg").innerText = "Inserisci una quantità valida di BNB.";
    return;
  }

  try {
    await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [{
        from: userAccount,
        to: contractAddress,
        value: (parseFloat(amount) * 1e18).toString(16),
      }],
    });
    document.getElementById("statusMsg").innerText = "Transazione inviata!";
  } catch (err) {
    document.getElementById("statusMsg").innerText = "Errore: " + err.message;
  }
}