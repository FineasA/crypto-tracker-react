import React, { useState, useEffect } from "react";
import "./Coin.css";
import TradingViewWidget, { Themes } from "react-tradingview-widget";

const Coin = ({
  image,
  name,
  symbol,
  price,
  volume,
  priceChange,
  marketcap,
  high24hr,
  low24hr,
}) => {
  const [displayCoinChart, setDisplayCoinChart] = useState(false);

  const displayTradingChart = (e) => {
    setDisplayCoinChart(true);
  };

  const closeModal = (e) => {
    setDisplayCoinChart(false);
  };

  return (
    <div className="coin-container">
      <div className="coin-row" onClick={displayTradingChart}>
        <div className="coin">
          <img src={image} alt="crypto" />
          <h1>{name}</h1>
          <p className="coin-symbol">{symbol}</p>
        </div>
        <div className="coin-data">
          <p className="coin-price">${price}</p>
          <p className="coin-volume">${volume.toLocaleString()}</p>
          {priceChange < 0 ? (
            <p className="coin-percent red">{priceChange.toFixed(2)}%</p>
          ) : (
            <p className="coin-percent green">{priceChange.toFixed(2)}%</p>
          )}
          <p className="coin-marketcap">${marketcap.toLocaleString()}</p>
          <p className="green">{high24hr} </p>
          <p className="red">{low24hr}</p>
        </div>
      </div>
      {/* Trading View For Coin Here */}

      {displayCoinChart ? (
        <div className="trading-view">
          <div class="fixed z-10 inset-0 overflow-y-auto">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <span
                class="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <div
                class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-start">
                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        class="text-lg leading-6 font-medium text-gray-900"
                        id="modal-headline"
                      >
                        Deactivate account
                      </h3>
                      <div class="mt-2">
                        <TradingViewWidget
                          symbol={`${symbol}BTC`}
                          theme={Themes.DARK}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={closeModal}
                    type="button"
                    class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Coin;
