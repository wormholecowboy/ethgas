/* 
TODO: add mobile resp
TODO: add prices for opensea, uniswap, USDC or USDT
TODO: add time estimates for each speed
TODO: add base fee and tipping?
TODO: add countdown timer

*/

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
      setGas(listItems.result);
    } catch (err) {
      console.error(err.stack);
    }
  };

  useEffect(() => {
    grabGas();
    const interval = setInterval(() => {
      grabGas();
    }, 13000);
  }, []);

  // use this to set timer: https://upmostly.com/tutorials/setinterval-in-react-components-using-hooks

  // ADD: OpenSea sale, Uniswap V3, USDT Transfer, USDC Transfer

  return (
    <div class="mainDiv">
      <div>
        <div class="headerText">
          <h1>Simple Ethereum Gas Tracker</h1>
        </div>
      </div>
      <div id="section1">
        <div id="divStyle1" class="infoTile">
          <strong>Block</strong>
          <div>
            <div class="blockNum">{gas.LastBlock}</div>
          </div>
        </div>
        <div id="divStyle2" class="infoTile">
          Slow{' '}
          <div>
            <div class="gwei">{gas.SafeGasPrice}</div>
          </div>
        </div>
        <div id="divStyle3" class="infoTile">
          Average{' '}
          <div>
            <div class="gwei">{gas.ProposeGasPrice}</div>
          </div>
        </div>
        <div id="divStyle4" class="infoTile">
          Fast{' '}
          <div>
            <div class="gwei">{gas.FastGasPrice}</div>
          </div>
        </div>
      </div>
      <div class="section2">
        <div class="commonPrices">Common Prices</div>
      </div>
    </div>
  );
}

export default App;
