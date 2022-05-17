/* 
TODO: add time estimates for each speed
TODO: add countdown timer

*/

import './App.css';
import { useEffect, useState } from 'react';
import React from 'react';

const API_KEY = process.env.REACT_APP_ES_API_KEY;
const gasOracle = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${API_KEY}`;
const lastEtherPrice = `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${API_KEY}`;

function App() {
  const [gas, setGas] = useState([]);
  const [price, setPrice] = useState([]);

  const grabGas = async () => {
    try {
      const res = await fetch(gasOracle);
      const listItems = await res.json();
      setGas(listItems.result);
      const getEthPrice = await fetch(lastEtherPrice);
      const ethPriceItems = await getEthPrice.json();
      setPrice(ethPriceItems.result);
      console.log(price.ethusd);
    } catch (err) {
      console.error(err.stack);
    }
  };

  useEffect(() => {
    grabGas();
    const interval = async () => {
      setInterval(() => {
        grabGas();
      }, 13000);
    };
    interval();
  }, []);

  // use this to set timer: https://upmostly.com/tutorials/setinterval-in-react-components-using-hooks

  // ADD: OpenSea sale, Uniswap V3, USDT Transfer, USDC Transfer

  return (
    <div className="mainDiv">
      <div>
        <div className="headerText">
          <h1>Simple Ethereum Gas Tracker</h1>
          <h2>ETH is ${price.ethusd} right meow.😼</h2>
        </div>
      </div>
      <div id="section1">
        <div id="divStyle1" className="infoTile">
          <strong>Block</strong>
          <div>
            <div className="blockNum">{gas.LastBlock}</div>
          </div>
        </div>
        <div id="divStyle2" className="infoTile">
          Slow
          <div>
            <div className="gwei">{gas.SafeGasPrice}</div>
          </div>
        </div>
        <div id="divStyle3" className="infoTile">
          Average
          <div>
            <div className="gwei">{gas.ProposeGasPrice}</div>
          </div>
        </div>
        <div id="divStyle4" className="infoTile">
          Fast
          <div>
            <div className="gwei">{gas.FastGasPrice}</div>
          </div>
        </div>
      </div>
      {/* <div className="section2"> */}
      {/* <h3>Common Prices</h3> */}
      {/* <div>
          <table>
            <thead>
              <th>Action</th>
              <th>Low</th>
              <th>Average</th>
              <th>High</th>
            </thead>
            <tbody>
              <tr>
                <td>OpenSea</td>
                <td>lowPrice</td>
                <td>avPrice</td>
                <td>hiPrice</td>
              </tr>
              <tr>
                <td>Uniswap V3</td>
                <td>lowPrice</td>
                <td>avPrice</td>
                <td>hiPrice</td>
              </tr>
              <tr>
                <td>Send ETH</td>
                <td>lowPrice</td>
                <td>avPrice</td>
                <td>hiPrice</td>
              </tr>
              <tr>
                <td>Send USDT</td>
                <td>lowPrice</td>
                <td>avPrice</td>
                <td>hiPrice</td>
              </tr>
            </tbody>
          </table>
        </div> */}
      {/* </div> */}
    </div>
  );
}
export default App;
