require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const PORT = process.env.NODE_PORT || 3000;
const COSMOS_REST_URL = process.env.COSMOS_REST_URL;

// Пример: Получение баланса аккаунта
app.get('/balance/:address', async (req, res) => {
  const { address } = req.params;
  try {
    const response = await axios.get(`${COSMOS_REST_URL}/bank/balances/${address}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Balance getting error' });
  }
});

// Пример: Получение списка валидаторов
app.get('/validators', async (req, res) => {
  try {
    const response = await axios.get(`${COSMOS_REST_URL}/staking/validators`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error with getting validators' });
  }
});

// Пример: Делегация токенов
app.post('/delegate', async (req, res) => {
  const { delegator, validator, amount, denom } = req.body;
  
  // Здесь необходимо подписать и отправить транзакцию
  // Для простоты в MVP пропустим этот шаг
  res.json({ message: 'Delegation does not realised in  MVP' });
});

app.listen(PORT, () => {
  console.log(`Backend started on port ${PORT}`);
});
