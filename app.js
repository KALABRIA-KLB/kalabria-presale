
const contractAddress = "0x5Fe13158f8A4C675e3bC5031F5c8fBcce95010eC";
let contractAbi = [];

window.onload = async () => {
    const connectWalletButton = document.getElementById("connectWallet");
    const walletAddressDisplay = document.getElementById("walletAddress");
    const buyTokensButton = document.getElementById("buyTokens");
    const statusDisplay = document.getElementById("status");

    connectWalletButton.onclick = async () => {
        if (window.ethereum) {
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            walletAddressDisplay.innerText = `Wallet: ${accounts[0]}`;
            window.web3 = new Web3(window.ethereum);
            const response = await fetch("contractABI.json");
            contractAbi = await response.json();
            window.contract = new web3.eth.Contract(contractAbi, contractAddress);
        } else {
            alert("Installa MetaMask per connetterti.");
        }
    };

    buyTokensButton.onclick = async () => {
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        const amount = document.getElementById("bnbAmount").value;
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            statusDisplay.innerText = "Inserisci una quantità valida di BNB.";
            return;
        }
        try {
            await web3.eth.sendTransaction({
                from: accounts[0],
                to: contractAddress,
                value: web3.utils.toWei(amount, "ether")
            });
            statusDisplay.innerText = "✅ Transazione inviata! Riceverai i tuoi KLB alla fine della presale.";
        } catch (err) {
            statusDisplay.innerText = "❌ Errore durante la transazione.";
        }
    };
};
