
let provider;
let signer;
let contract;

const PRESALE_CONTRACT = "0x3F7F7bC596D0494506993e38471894Af7bC41628";
const TOKEN_CONTRACT = "0x5Fe13158f8A4C675e3bC5031f5c8fBCCE95010eC";

const abi = [
  {"inputs":[],"name":"buyTokens","outputs":[],"stateMutability":"payable","type":"function"},
  {"inputs":[],"name":"KLB","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"presaleWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"rate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}
];

async function connectWallet() {
  try {
    const web3Modal = new window.Web3Modal.default({
      cacheProvider: false,
      providerOptions: {}
    });

    const instance = await web3Modal.connect();
    provider = new ethers.providers.Web3Provider(instance);
    signer = provider.getSigner();
    console.log("Wallet connesso:", await signer.getAddress());
    alert("Wallet connesso: " + await signer.getAddress());
  } catch (err) {
    console.error("Errore connessione wallet:", err);
    alert("Connessione wallet fallita");
  }
}

async function buyTokens() {
  try {
    if (!signer) {
      alert("Connetti prima il wallet");
      return;
    }

    const amountBNB = prompt("Inserisci l'importo in BNB da spendere:");
    if (!amountBNB || isNaN(amountBNB)) return alert("Importo non valido");

    const amount = ethers.utils.parseEther(amountBNB);
    contract = new ethers.Contract(PRESALE_CONTRACT, abi, signer);
    const tx = await contract.buyTokens({ value: amount });
    await tx.wait();
    alert("Token acquistati con successo!");
  } catch (err) {
    console.error("Errore durante l'acquisto:", err);
    alert("Errore durante l'acquisto: " + err.message);
  }
}
