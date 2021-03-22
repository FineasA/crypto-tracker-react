import "./App.css";
import React, { useState, useEffect } from "react";
import Coin from "./Coin.js";
import "./Coin.css";
import axios from "axios";
import TradingView from "./TradingView.js";
import sortUtil from "./utils/util";
import options from "./utils/sortOptions.js";

//https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [topMover, setTopMover] = useState();
  const [defaultFiltered, setDefaultFiltered] = useState(true);
  const [descendingSortPrice, setDescendingSortPrice] = useState(true);
  const [descendingSortName, setDescendingSortName] = useState(true);
  const [descendingSortVolume, setDescendingSortVolume] = useState(true);
  const [descendingSortPercent, setDescendingSortPercent] = useState(true);
  const [descendingSortMktCap, setDescendingSortMktCap] = useState(true);
  const [descendingSortPriceHigh24h, setDescendingSortPriceHigh24h] = useState(
    true
  );
  const [descendingSortPriceLow24h, setDescendingSortPriceLow24h] = useState(
    true
  );

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

  const sortCoinsVolume = (e) => {
    e.preventDefault();
    setDefaultFiltered(false);

    if (descendingSortVolume === true) {
      let filteredCoinsVolumeAscending = sortUtil(coins, options.VOLUME_LOW);
      setDescendingSortVolume(false);
      setCoins(filteredCoinsVolumeAscending);
    } else if (descendingSortVolume === false) {
      let filteredCoinsVolumeDescending = sortUtil(coins, options.VOLUME_HIGH);
      setDescendingSortVolume(true);
      setCoins(filteredCoinsVolumeDescending);
    }
  };

  const sortCoinsName = (e) => {
    e.preventDefault();
    setDefaultFiltered(false);

    if (descendingSortName === true) {
      let filteredCoinsNameAscending = sortUtil(coins, options.COIN_AZ);
      setDescendingSortName(false);
      setCoins(filteredCoinsNameAscending);
    } else if (descendingSortName === false) {
      let filteredCoinsNameDescending = sortUtil(coins, options.COIN_ZA);

      setDescendingSortName(true);
      setCoins(filteredCoinsNameDescending);
    }
  };

  const sortCoinsPrice = (e) => {
    e.preventDefault();
    setDefaultFiltered(false);

    if (descendingSortPrice === true) {
      let filteredCoinsPriceHigh = sortUtil(coins, options.PRICE_HIGH);
      setDescendingSortPrice(false);
      setCoins(filteredCoinsPriceHigh);
    } else if (descendingSortPrice === false) {
      let filteredCoinsPriceLow = sortUtil(coins, options.PRICE_LOW);
      setDescendingSortPrice(true);
      setCoins(filteredCoinsPriceLow);
    }
  };

  const sortCoinsPercent = (e) => {
    e.preventDefault();
    setDefaultFiltered(false);

    if (descendingSortPercent === true) {
      let filteredCoinsPricePercent = sortUtil(coins, options.PERCENT_HIGH);
      setDescendingSortPercent(false);
      setCoins(filteredCoinsPricePercent);
    } else if (descendingSortPercent === false) {
      let filteredCoinsPricePercent = sortUtil(coins, options.PERCENT_LOW);
      setDescendingSortPercent(true);
      setCoins(filteredCoinsPricePercent);
    }
  };

  const sortCoinsMktCap = (e) => {
    e.preventDefault();
    setDefaultFiltered(false);
    if (descendingSortMktCap === true) {
      let filteredCoinsMktCap = sortUtil(coins, options.MKTCAP_HIGH);
      setDescendingSortMktCap(false);
      setCoins(filteredCoinsMktCap);
    } else if (descendingSortMktCap === false) {
      let filteredCoinsMktCap = sortUtil(coins, options.MKTCAP_LOW);
      setDescendingSortMktCap(true);
      setCoins(filteredCoinsMktCap);
    }
  };

  const sortCoinsPriceHigh24hour = (e) => {
    e.preventDefault();
    setDefaultFiltered(false);

    if (descendingSortPriceHigh24h === true) {
      let filteredCoinsPriceHigh24 = sortUtil(coins, options.HIGH_24H_HIGH);
      setDescendingSortPriceHigh24h(false);
      setCoins(filteredCoinsPriceHigh24);
    } else if (descendingSortPriceHigh24h === false) {
      let filteredCoinsPriceHigh24 = sortUtil(coins, options.HIGH_24H_LOW);
      setDescendingSortPriceHigh24h(true);
      setCoins(filteredCoinsPriceHigh24);
    }
  };

  const sortCoinsPriceLow24hour = (e) => {
    e.preventDefault();
    setDefaultFiltered(false);

    if (descendingSortPriceLow24h === true) {
      let filteredCoinsPriceLow24 = sortUtil(coins, options.LOW_24H_HIGH);
      setDescendingSortPriceLow24h(false);
      setCoins(filteredCoinsPriceLow24);
    } else if (descendingSortPriceLow24h === false) {
      let filteredCoinsPriceLow24 = sortUtil(coins, options.LOW_24H_LOW);
      setDescendingSortPriceLow24h(true);
      setCoins(filteredCoinsPriceLow24);
    }
  };

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
      {/* Add sorting capabilities by clicking on any of the labels */}

      {/* Eventually add sorting capabilities to sort between high and low Making
      sure to set high as the default and alternating between the two different
      options */}
      <div className="coin-row first-row">
        <div
          className="coin"
          style={{ cursor: "pointer" }}
          onClick={sortCoinsName}
        >
          Coin
        </div>
        <div
          className="coin-price"
          style={{ cursor: "pointer" }}
          onClick={sortCoinsPrice}
        >
          Price
        </div>
        <div
          className="coin-volume"
          style={{ cursor: "pointer" }}
          onClick={sortCoinsVolume}
        >
          Volume
        </div>
        <div
          className="coin-percent"
          style={{ cursor: "pointer" }}
          onClick={sortCoinsPercent}
        >
          %
        </div>
        <div
          className="coin-marketcap"
          style={{ cursor: "pointer" }}
          onClick={sortCoinsMktCap}
        >
          Mkt. Cap
        </div>
        <div
          className="coin-high"
          className="coin-marketcap"
          style={{ cursor: "pointer" }}
          onClick={sortCoinsPriceHigh24hour}
        >
          High 24hr
        </div>
        <div
          className="coin-low"
          style={{ cursor: "pointer" }}
          onClick={sortCoinsPriceLow24hour}
        >
          Low 24hr
        </div>
      </div>
      {defaultFiltered
        ? filteredCoins.map((coin) => {
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
          })
        : coins.map((coin) => {
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
