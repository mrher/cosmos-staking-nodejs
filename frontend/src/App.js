import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [balance, setBalance] = useState([]);
  const [delegations, setDelegations] = useState([]);
  const [validators, setValidators] = useState([]);

  const address = 'твой_адрес'; // Замените на ваш адрес

  useEffect(() => {
    const fetchData = async () => {
      try {
        const balanceRes = await axios.get(`http://localhost:3000/balance/${address}`);
        setBalance(balanceRes.data);
        
        const delegationsRes = await axios.get(`http://localhost:3000/delegations/${address}`);
        setDelegations(delegationsRes.data);
        
        const validatorsRes = await axios.get(`http://localhost:3000/validators`);
        setValidators(validatorsRes.data);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchData();
  }, [address]);

  return (
    <div className="App">
      <h1>Статус Стейкинга</h1>
      <section>
        <h2>Баланс</h2>
        <pre>{JSON.stringify(balance, null, 2)}</pre>
      </section>
      <section>
        <h2>Делегации</h2>
        <pre>{JSON.stringify(delegations, null, 2)}</pre>
      </section>
      <section>
        <h2>Валидаторы</h2>
        <pre>{JSON.stringify(validators, null, 2)}</pre>
      </section>
    </div>
  );
}

export default App;
