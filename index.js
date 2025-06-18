// Collegamento Web3 multi-wallet
window.addEventListener('DOMContentLoaded', () => {
  const connectWalletBtn = document.getElementById('connectWallet');
  const sendBnbBtn = document.getElementById('sendBnb');
  let provider;

  async function connectWallet() {
    if (window.ethereum) {
      provider = window.ethereum;
      await provider.request({ method: 'eth_requestAccounts' });
      console.log('Wallet connesso con MetaMask o simile');
    } else {
      alert('Wallet non trovato. Usa MetaMask, Trust Wallet, o WalletConnect');
    }
  }

  async function sendBNB() {
    const bnbAmount = document.getElementById('bnbAmount').value;
    if (!provider || !bnbAmount) return alert('Connetti il wallet e inserisci un importo');

    const accounts = await provider.request({ method: 'eth_accounts' });
    const tx = {
      from: accounts[0],
      to: '0xYourPresaleWalletAddress',
      value: '0x' + (parseFloat(bnbAmount) * 1e18).toString(16)
    };
    await provider.request({ method: 'eth_sendTransaction', params: [tx] });
  }

  connectWalletBtn.addEventListener('click', connectWallet);
  sendBnbBtn.addEventListener('click', sendBNB);
});