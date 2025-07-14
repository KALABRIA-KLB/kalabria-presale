
const CONTRACT_ADDRESS = "0x3F7F7bC596D0494506993e38471894Af7bC41628";
const ABI = [{"inputs":[{"internalType":"address","name":"_klb","type":"address"},{"internalType":"uint256","name":"_startTime","type":"uint256"},{"internalType":"uint256","name":"_endTime","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"buyTokens","outputs":[],"stateMutability":"payable","type":"function"}];

async function buyTokens() {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

    try {
      const tx = await contract.buyTokens({ value: ethers.utils.parseEther("0.01") });
      await tx.wait();
      alert("Acquisto completato!");
    } catch (err) {
      console.error(err);
      alert("Errore durante l'acquisto.");
    }
  } else {
    alert("Wallet non trovato.");
  }
}
