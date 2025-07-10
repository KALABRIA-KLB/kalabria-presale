
let web3;
let contractAddress = "0x3F7F7bC596D0494506993e38471894Af7bC41628";
let contractABI = [
    {"inputs":[{"internalType":"address","name":"_klb","type":"address"},{"internalType":"uint256","name":"_startTime","type":"uint256"},{"internalType":"uint256","name":"_endTime","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},
    {"inputs":[],"name":"buyTokens","outputs":[],"stateMutability":"payable","type":"function"},
    {"inputs":[],"name":"withdrawRemainingTokens","outputs":[],"stateMutability":"nonpayable","type":"function"}
];

window.addEventListener('load', async () => {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        document.getElementById("walletStatus").innerText = "Wallet connesso ✅";
    } else {
        document.getElementById("walletStatus").innerHTML = "<a href='https://metamask.io/'>Installa MetaMask</a>";
    }
});

async function buyTokens() {
    const amount = document.getElementById("bnbAmount").value;
    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    await contract.methods.buyTokens().send({ from: accounts[0], value: web3.utils.toWei(amount, "ether") });
}
