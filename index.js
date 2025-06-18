
let userAccount;

async function connectWallet() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            userAccount = accounts[0];
            document.getElementById('wallet-address').innerText = `Wallet connesso: ${userAccount}`;
        } catch (err) {
            console.error("Errore connessione wallet:", err);
            document.getElementById('message').innerText = "Connessione fallita.";
        }
    } else {
        alert("Installa MetaMask per connettere il wallet.");
    }
}

async function buyTokens() {
    const amount = document.getElementById("bnb-amount").value;
    if (!amount || isNaN(amount)) {
        alert("Inserisci una quantità valida di BNB.");
        return;
    }

    const weiAmount = Web3.utils.toWei(amount, 'ether');
    const presaleAddress = "0x674dc4138445ba55dbf785deeef818129301a861";

    try {
        await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [{
                from: userAccount,
                to: presaleAddress,
                value: Web3.utils.toHex(weiAmount)
            }]
        });

        document.getElementById("message").innerText = "✅ BNB inviati! Riceverai i KLB a fine presale.";
    } catch (error) {
        console.error(error);
        document.getElementById("message").innerText = "❌ Transazione annullata o fallita.";
    }
}
