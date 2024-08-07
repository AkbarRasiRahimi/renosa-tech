"use server";
import ccxt from "ccxt";
import exchangesConfig from "../app/config/exchanges.json";
import pairs from "../app/config/pairs.json";

export async function getMarketInfo() {
  const pairClients = await Promise.all(
    exchangesConfig.exchanges.map((exchange) => getMarketInfoForExchange(exchange))
  );
  return pairClients;
}

async function getMarketInfoForExchange(ex) {
  const exchangeName = Object.keys(ex)[0];
  const exchangeConfig = ex[exchangeName];

  try {
    const exchange = new ccxt[exchangeName]({
      apiKey: exchangeConfig.API_KEY,
      secret: exchangeConfig.API_SECRET,
      password: exchangeConfig.API_PASSWORD,
      enableRateLimit: true,
    });

    await exchange.loadMarkets();

    const marketKeys = Object.keys(exchange.markets);
    const filteredPairs = pairs
      .filter((pair) => marketKeys.includes(`${pair.pair}/USDT`) && pair.active)
      .map((pair) => `${pair.pair}/USDT`);

    const pairClients = filteredPairs.map((pair) => {
      const pairInfo = exchange.markets[pair];
      return {
        exchangeName: exchangeConfig.name,
        pairName: pairInfo.base,
        minAmount: pairInfo.limits.amount.min,
        makeFeeRate: pairInfo.maker,
        takerFeeRate: pairInfo.taker,
        tradingDecimal: pairInfo.precision.amount,
      };
    });
    return { exchangeName, pairClients };
  } catch (err) {
    console.error(`Error fetching market info for ${ex}:`, err);
    setLogMessage(`Error fetching market info for ${ex}: ${err.message}`);
  }
}
