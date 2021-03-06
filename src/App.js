/* 
TODO: fix price tracker in prod
TODO: force 2 decimals for ETH price
TODO: add background zen pic
TODO: double check repsonsiveness

*/

import './App.css';
import { useEffect, useState } from 'react';
import React from 'react';

const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;
const gasOracle = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${REACT_APP_API_KEY}`;
const lastEtherPrice = `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${REACT_APP_API_KEY}`;

function App() {
  const [gas, setGas] = useState([]);
  const [price, setPrice] = useState([]);
  const [countdown, setCountdown] = useState();

  const grabGas = async () => {
    try {
      const res = await fetch(gasOracle);
      const listItems = await res.json();
      await setGas(listItems.result);
      // grab price too
      const getEthPrice = await fetch(lastEtherPrice);
      const ethPriceItems = await getEthPrice.json();
      const ethGasString = ethPriceItems.result.ethusd;
      const ethGasNumber = parseInt(ethGasString);
      const ethGasStringFixed = ethGasNumber.toFixed(0);
      setPrice(ethGasStringFixed);
      //
    } catch (err) {
      console.error(err.stack);
    }
  };

  useEffect(() => {
    setCountdown(13);
    let timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gas]);

  useEffect(() => {
    let startGasInterval = async () => {
      await grabGas();
      setInterval(() => {
        grabGas();
      }, 13000);
    };
    startGasInterval();
  }, []);

  return (
    <div className="mainDiv">
      <div>
        <div className="headerText">
          <h1>Zen Ethereum Gas Tracker</h1>
          <h2>ETH is ${price} right meow.😼</h2>
          <div>{countdown} seconds until hopefully cheaper gas</div>
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
