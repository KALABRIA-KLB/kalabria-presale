
let web3;
const contractAddress = "0x6080640452601260025f6101000a81548160ff0219169087";
function connectWallet() {
  if (typeof window.ethereum !== "undefined") {
    web3 = new Web3(window.ethereum);
    window.ethereum.request({ method: "eth_requestAccounts" });
  } else {
    alert("Installa MetaMask per procedere.");
  }
}
function sendBNB() {
  const amount = document.getElementById("bnbAmount").value;
  web3.eth.sendTransaction({
    from: ethereum.selectedAddress,
    to: contractAddress,
    value: web3.utils.toWei(amount, "ether"),
  })
  .then(() => document.getElementById("result").innerText = "BNB inviato con successo!")
  .catch(err => document.getElementById("result").innerText = "Errore: " + err.message);
}
