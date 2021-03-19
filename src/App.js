import "./App.css";
import React, { useState, useEffect } from "react";
import Coin from "./Coin.js";
import "./Coin.css";
import axios from "axios";
import TradingView from "./TradingView.js";

//https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [topMover, setTopMover] = useState();

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        let coins = res.data;
        setCoins(coins);

        console.log(coins);

        //find top mover when making get request...
        let topMover = {};
        topMover = coins.reduce((prev, current) => {
          return prev.market_cap_change_percentage_24h >
            current.market_cap_change_percentage_24h
            ? prev
            : current;
        });
        setTopMover(topMover);
      })
      .catch((error) => {
        if (error) {
          console.log(error);
        }
      });
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input
            type="text"
            className="coin-input"
            placeholder="Search"
            onChange={handleChange}
          />
        </form>
      </div>

      <TradingView topMover={topMover} />
      <div className="coin-row first-row">
        <div className="coin">Coin</div>
        <div className="coin-price">Price</div>
        <div className="coin-volume">Volume</div>
        <div className="coin-percent">%</div>
        <div className="coin-marketcap">Mkt. Cap</div>
        <div className="coin-high">High 24hr</div>
        <div className="coin-low">Low 24hr</div>
      </div>
      {filteredCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            image={coin.image}
            name={coin.name}
            symbol={coin.symbol}
            price={coin.current_price}
            marketcap={coin.market_cap}
            priceChange={coin.price_change_percentage_24h}
            volume={coin.total_volume}
            low24hr={coin.low_24h}
            high24hr={coin.high_24h}
          />
        );
      })}
    </div>
  );
}

export default App;
