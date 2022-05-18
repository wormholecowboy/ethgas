/* 
TODO: add time estimates for each speed
TODO: add countdown timer
TODO: add title tag

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
  const [countdown, setCountdown] = useState(0);

  const grabGas = async () => {
    try {
      const res = await fetch(gasOracle);
      const listItems = await res.json();
      await setGas(listItems.result);
      // grab price too
      const getEthPrice = await fetch(lastEtherPrice);
      const ethPriceItems = await getEthPrice.json();
      setPrice(ethPriceItems.result);
      //
      console.log('this is the price', price.ethusd);
      console.log('this is the gas', gas.SafeGasPrice);
      console.log({ price });
      console.log(REACT_APP_API_KEY);
    } catch (err) {
      console.error(err.stack);
    }
  };

  // setCountdown(13);
  // let a = setInterval(() => {
  //   setCountdown(countdown - 1);
  //   console.log(countdown);
  //   console.log(`this is timer: ${a}`);
  // }, 1000);

  useEffect(() => {
    grabGas();
    const interval = () => {
      setInterval(() => {
        grabGas();
      }, 13000);
    };
    interval();
  }, []);

  return (
    <div className="mainDiv">
      <div>
        <div className="headerText">
          <h1>Simple Ethereum Gas Tracker</h1>
          <h2>ETH is ${price.ethusd} right meow.😼</h2>
          <div>{countdown}</div>
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
