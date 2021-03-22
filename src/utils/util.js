const sortUtil = (coins, sortMethod) => {
  if (sortMethod === "PRICE_DESCENDING") {
    coins = coins.sort((a, b) => (a.current_price < b.current_price ? 1 : -1));
    return coins;
  } else if (sortMethod === "PRICE_ASCENDING") {
    coins = coins.sort((a, b) => (a.current_price > b.current_price ? 1 : -1));
    console.log(coins);
    return coins;
  } else if (sortMethod === "COIN_AZ") {
    coins = coins.sort((a, b) => {
      let textA = a.name.toUpperCase();
      let textB = b.name.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
    return coins;
  } else if (sortMethod === "COIN_ZA") {
    coins = coins.sort((a, b) => {
      let textA = a.name.toUpperCase();
      let textB = b.name.toUpperCase();
      return textA > textB ? -1 : textA < textB ? 1 : 0;
    });
    return coins;
  } else if (sortMethod === "VOLUME_DESCENDING") {
    coins = coins.sort((a, b) => (a.total_volume < b.total_volume ? 1 : -1));
    return coins;
  } else if (sortMethod === "VOLUME_ASCENDING") {
    coins = coins.sort((a, b) => (a.total_volume > b.total_volume ? 1 : -1));
    return coins;
  } else if (sortMethod === "PERCENT_DESCENDING") {
    coins = coins.sort((a, b) =>
      a.price_change_percentage_24h < b.price_change_percentage_24h ? 1 : -1
    );
    return coins;
  } else if (sortMethod === "PERCENT_ASCENDING") {
    coins = coins.sort((a, b) =>
      a.price_change_percentage_24h > b.price_change_percentage_24h ? 1 : -1
    );
    return coins;
  } else if (sortMethod === "MKT_CAP_DESCENDING") {
    coins = coins.sort((a, b) => (a.market_cap < b.market_cap ? 1 : -1));
    return coins;
  } else if (sortMethod === "MKT_CAP_ASCENDING") {
    coins = coins.sort((a, b) => (a.market_cap > b.market_cap ? 1 : -1));
    return coins;
  } else if (sortMethod === "HIGH_24H_DESCENDING") {
    coins = coins.sort((a, b) => (a.high_24h < b.high_24h ? 1 : -1));
    return coins;
  } else if (sortMethod === "HIGH_24H_ASCENDING") {
    coins = coins.sort((a, b) => (a.high_24h > b.high_24h ? 1 : -1));
    return coins;
  } else if (sortMethod === "LOW_24H_DESCENDING") {
    coins = coins.sort((a, b) => (a.low_24h < b.low_24h ? 1 : -1));
    return coins;
  } else if (sortMethod === "LOW_24H_ASCENDING") {
    coins = coins.sort((a, b) => (a.low_24h > b.low_24h ? 1 : -1));
    return coins;
  }
};

export default sortUtil;
