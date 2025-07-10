window.addEventListener("load", () => {
  if (typeof window.ethereum !== 'undefined') {
    document.getElementById("web3-container").innerHTML = "<p>Wallet Web3 rilevato. Presto sarà attiva la presale.</p>";
  } else {
    document.getElementById("web3-container").innerHTML = "<p>Nessun wallet Web3 rilevato. Installa Metamask.</p>";
  }
});