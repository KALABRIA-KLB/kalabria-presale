import React, { useState } from "react";
import Web3 from "web3";
import './App.css';

const tokenAddress = "0xABCDEF1234567890ABCDEF1234567890ABCDEF12"; // placeholder

function App() {
  const [account, setAccount] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    } else {
      alert("Installa MetaMask per continuare.");
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Kalabria Token (KLB)</h1>
        <p>L'erede digitale delle antiche monete calabresi</p>
        <button onClick={connectWallet}>
          {account ? `Wallet connesso: ${account}` : "Collega Wallet"}
        </button>
        <a
          href={`https://pancakeswap.finance/swap?outputCurrency=${tokenAddress}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Acquista su PancakeSwap
        </a>
        <br />
        <a href="/whitepaper-tecnico.pdf" download>Scarica Whitepaper Tecnico</a>
        <br />
        <a href="/whitepaper-pubblico.pdf" download>Scarica Whitepaper Pubblico</a>
        <br />
        <a href="https://forms.gle/xyzAirdropForm" target="_blank">Partecipa all’Airdrop</a>
      </header>
    </div>
  );
}

export default App;
