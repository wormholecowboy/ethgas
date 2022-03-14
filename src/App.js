import './App.css';
import { useEffect, useState } from 'react';

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
      console.log(`gas variable: ${JSON.stringify(gas)}`);
    } catch (err) {
      console.error(err.stack);
    }
  };

  useEffect(() => {
    (async () => await grabGas())();
  }, []);

  const divStyle1 = {
    backgroundColor: 'blue',
    width: '100px',
    heigh: '100px',
  };
  const divStyle2 = {
    backgroundColor: 'red',
    width: '100px',
    heigh: '100px',
  };
  const divStyle3 = {
    backgroundColor: 'yellow',
    width: '100px',
    heigh: '100px',
  };
  const divStyle4 = {
    backgroundColor: 'green',
    width: '100px',
    heigh: '100px',
  };

  const mainDiv = {
    width: '800px',
    height: '800px',
    display: 'flex',
  };

  // use this to set timer: https://upmostly.com/tutorials/setinterval-in-react-components-using-hooks

  return (
    <div className="App">
      <div>{JSON.stringify(gas)}</div>
      <div style={divStyle1}>Block: {gas.LastBlock}</div>
      <div style={divStyle2}>Low: {gas.SafeGasPrice}</div>
      <div style={divStyle3}>Average: {gas.ProposeGasPrice}</div>
      <div style={divStyle4}>Fast: {gas.FastGasPrice}</div>
    </div>
  );
}

export default App;
