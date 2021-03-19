import React, { useState, useEffect } from "react";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import "./TradingView.css";

const TradingView = ({ topMover }) => {
  const [seeTop, setSeeTop] = useState(false);

  const handleViewTop = () => {
    console.log(seeTop);
    setSeeTop(!seeTop);
  };

  //calculate per price depending on coin
  //for example, calculate the costs of coin based on whatever currency may be selected i.e [ETH, CARD ... etc]
  return (
    <div className="widget-container">
      <button className="top-mover-button" onClick={handleViewTop}>
        See Top Mover
      </button>
      {seeTop && topMover.symbol !== "btc" ? (
        <TradingViewWidget
          symbol={`${topMover.symbol.toUpperCase()}BTC`}
          theme={Themes.DARK}
        />
      ) : null}
    </div>
  );
};

export default TradingView;
