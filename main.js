
async function connectWallet() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      alert("Wallet connesso: " + accounts[0]);
    } catch (err) {
      console.error("Errore nella connessione al wallet", err);
    }
  } else {
    alert("MetaMask non trovato");
  }
}
