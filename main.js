
function showToast(message, isSuccess = true) {
    const toast = document.createElement('div');
    toast.innerText = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.background = isSuccess ? '#2ecc71' : '#e74c3c';
    toast.style.color = 'white';
    toast.style.padding = '1em';
    toast.style.borderRadius = '10px';
    toast.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
    toast.style.zIndex = '9999';
    toast.style.transition = 'opacity 0.5s ease-in-out';
    toast.style.opacity = '1';

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// Setup chart
const ctx = document.getElementById('salesChart').getContext('2d');
let salesChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Venduti', 'Disponibili'],
        datasets: [{
            label: 'Token KLB',
            data: [0, 1485000000],
            backgroundColor: ['#2ecc71', '#3498db']
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { display: true, text: 'Stato Vendite Token KLB' }
        }
    }
});

// Funzione per aggiornare dinamicamente (qui da collegare a Web3 in futuro)
function updateChartData(venduti) {
    salesChart.data.datasets[0].data = [venduti, 1485000000 - venduti];
    salesChart.update();
}

// Simulazione iniziale
updateChartData(0);

import { Web3Modal } from "https://unpkg.com/@web3modal/ethers5@2.6.2/dist/index.js";
import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.esm.min.js";

// Kalabria config
const presaleAddress = "0x3F7F7bC596D0494506993e38471894Af7bC41628";
const tokenAddress = "0x5Fe13158f8A4C675e3bC5031f5c8fBCCE95010eC";
const presaleAbi = [{"inputs": [{"internalType": "address", "name": "_klb", "type": "address"}, {"internalType": "uint256", "name": "_startTime", "type": "uint256"}, {"internalType": "uint256", "name": "_endTime", "type": "uint256"}], "stateMutability": "nonpayable", "type": "constructor"}, {"inputs": [], "name": "KLB", "outputs": [{"internalType": "contract IERC20", "name": "", "type": "address"}], "stateMutability": "view", "type": "function"}, {"inputs": [], "name": "buyTokens", "outputs": [], "stateMutability": "payable", "type": "function"}, {"inputs": [], "name": "endTime", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "stateMutability": "view", "type": "function"}, {"inputs": [], "name": "hardCap", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "stateMutability": "view", "type": "function"}, {"inputs": [], "name": "presaleWallet", "outputs": [{"internalType": "address", "name": "", "type": "address"}], "stateMutability": "view", "type": "function"}, {"inputs": [], "name": "raised", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "stateMutability": "view", "type": "function"}, {"inputs": [], "name": "rate", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "stateMutability": "view", "type": "function"}, {"inputs": [], "name": "startTime", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "stateMutability": "view", "type": "function"}, {"inputs": [], "name": "withdrawRemainingTokens", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"stateMutability": "payable", "type": "receive"}];
const tokenAbi = [
    {
        "constant": false,
        "inputs": [
            { "name": "_spender", "type": "address" },
            { "name": "_value", "type": "uint256" }
        ],
        "name": "approve",
        "outputs": [{ "name": "", "type": "bool" }],
        "type": "function"
    }
];

// Init Web3Modal
const modal = new Web3Modal({
  ethersConfig: { ethers },
  chains: [{ chainId: 56, name: "Binance Smart Chain" }],
  defaultChain: 56
});

let provider, signer, account, presaleContract, tokenContract;

async async function connectWallet() {
    const conn = await modal.connect();
    provider = new ethers.providers.Web3Provider(conn);
    signer = provider.getSigner();
    account = await signer.getAddress();
    showToast("Wallet connesso: " + account);

    presaleContract = new ethers.Contract(presaleAddress, presaleAbi, signer);
    tokenContract = new ethers.Contract(tokenAddress, tokenAbi, signer);

    updatePresaleStats();
}

async function approveTokens() {
    const hardCap = await presaleContract.hardCap();
    const tx = await tokenContract.approve(presaleAddress, hardCap);
    await tx.wait();
    showToast("Approvazione completata!");
}

async async function buyTokens() {
    const bnbAmount = prompt("Quanti BNB vuoi investire?");
    if (!bnbAmount) return;
    const tx = await presaleContract.buyTokens({ value: ethers.utils.parseEther(bnbAmount) });
    await tx.wait();
    showToast("Acquisto completato!");
    updatePresaleStats();
}

async function updatePresaleStats() {
    const raised = await presaleContract.raised();
    const rate = await presaleContract.rate();
    const sold = raised.mul(rate).toString();
    updateChartData(parseInt(sold));
}

// Espone le funzioni al DOM globale
window.connectWallet = connectWallet;
window.buyTokens = buyTokens;
