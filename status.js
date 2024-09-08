const axios = require('axios');
require('dotenv').config();

const COSMOS_REST_URL = process.env.COSMOS_REST_URL;
const ADDRESS = 'твой_адрес';

const getBalance = async () => {
  try {
    const response = await axios.get(`${COSMOS_REST_URL}/bank/balances/${ADDRESS}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении баланса:', error.message);
  }
};

const getDelegations = async () => {
  try {
    const response = await axios.get(`${COSMOS_REST_URL}/staking/delegations/${ADDRESS}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении делегаций:', error.message);
  }
};

const displayStatus = async () => {
  const balance = await getBalance();
  const delegations = await getDelegations();

  console.log('--- Статус Стейкинга ---');
  console.log('Баланс:', balance);
  console.log('Делегации:', delegations);
};

displayStatus();
