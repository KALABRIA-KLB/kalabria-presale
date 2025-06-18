
# Kalabria Token - Sito Presale Web3

Questo è il sito ufficiale per la **Presale del Kalabria Token (KLB)**.  
Include connettività Web3, invio automatico di BNB al contratto di presale e visualizzazione tokenomics.

---

## 📦 Contenuto

- `index.html`: struttura principale del sito
- `style.css`: tema dark minimal (stile Calabria)
- `script.js`: logica Web3 per connettere il wallet e inviare BNB
- `logo.png`: logo ufficiale del token (versione moneta dorata)

---

## 🔧 Setup per pubblicazione

1. **Clona o carica i file su GitHub**
2. Vai in `Settings > Pages`
3. Seleziona `Source: main` e `/(root)` → clicca **Save**
4. Il sito sarà attivo su:
   ```
   https://[tuo-username].github.io/kalabria-presale/
   ```

---

## 🔗 Connessione Web3

Nel file `script.js`, cerca la riga:

```js
const contractAddress = "INSERISCI_CONTRATTO";
```

Sostituiscila con il tuo **indirizzo del contratto Presale** su BNB Chain:

```js
const contractAddress = "0x6080640452601260025f6101000a81548160ff0219169087";
```

---

## ⚠️ Avvertenze

- Gli utenti devono avere MetaMask installato e connesso alla **BNB Smart Chain**
- I token verranno distribuiti **manualmente o automaticamente** secondo lo smart contract
- Il valore in BNB viene inviato direttamente al contratto

---

## 📱 Social e Supporto

- Instagram: [@kalabriatoken](https://www.instagram.com/kalabriatoken/)
- Telegram: *in arrivo*
- Whitepaper PDF: incluso nel sito

---

© 2025 Kalabria Token — Rinascita Digitale del Sud Italia
