import './App.css';
import { useEffect, useState } from 'react';
import React from 'react';

const API_KEY = process.env.REACT_APP_ES_API_KEY;
const apiURL = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${API_KEY}`;

function App() {
  const [gas, setGas] = useState([]);

  const grabGas = async () => {
    try {
      const res = await fetch(apiURL);
      const listItems = await res.json();
      console.log(listItems);
      setGas(listItems.result);
    } catch (err) {
      console.error(err.stack);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      grabGas();
    }, 13000);
  }, []);

  // useEffect(() => {
  //   (async () => await grabGas())();
  // }, []);

  // setInterval(() => setGas(), 10000);

  // use this to set timer: https://upmostly.com/tutorials/setinterval-in-react-components-using-hooks

  // ADD: OpenSea sale, Uniswap V3, USDT Transfer, USDC Transfer

  return (
    <div id="mainDiv" className="App">
      <div id="divStyle1" class="infoTile">
        Block: {gas.LastBlock}
      </div>
      <div id="divStyle2" class="infoTile">
        Low: {gas.SafeGasPrice} gwei
      </div>
      <div id="divStyle3" class="infoTile">
        Average: {gas.ProposeGasPrice} gwei
      </div>
      <div id="divStyle4" class="infoTile">
        Fast: {gas.FastGasPrice} gwei
      </div>
    </div>
  );
}

export default App;
