require('dotenv').config();
const express = require('express');
const { SigningStargateClient, coin } = require("@cosmjs/stargate");
const { DirectSecp256k1HdWallet } = require("@cosmjs/proto-signing");
const app = express();

app.use(express.json());

const PORT = process.env.NODE_PORT || 3000;
const COSMOS_REST_URL = process.env.COSMOS_REST_URL;
const MNEMONIC = process.env.MNEMONIC;
const VALIDATOR_ADDRESS = process.env.VALIDATOR_ADDRESS;

const delegateTokens = async (amount, denom) => {
  try {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(MNEMONIC, { prefix: "cosmos" });
    const [firstAccount] = await wallet.getAccounts();

    const client = await SigningStargateClient.connectWithSigner(COSMOS_REST_URL, wallet);

    const fee = {
      amount: [coin(2000, denom)],
      gas: "80000",
    };

    const result = await client.delegate(firstAccount.address, VALIDATOR_ADDRESS, coin(amount, denom), fee, "Staking through MVP");

    return result;
  } catch (error) {
    console.error('Error delegating tokens:', error);
    throw error;
  }
};

// API-эндпоинт для делегации токенов
app.post('/delegate', async (req, res) => {
  const { amount, denom } = req.body;

  try {
    const result = await delegateTokens(amount, denom);
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delegate tokens', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});
