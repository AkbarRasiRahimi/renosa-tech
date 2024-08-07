"use server";

import ccxt from "ccxt";
import exchangesConfig from "../config/exchanges.json";

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

    const allBalances = await exchange.fetchBalance();

    return { exchangeName, allBalances };
  } catch (err) {
    console.error(`Error fetching market info for ${ex}:`, err);
    setLogMessage(`Error fetching market info for ${ex}: ${err.message}`);
  }
}

export async function getAccountInfo() {
  const pairClients = await Promise.all(
    exchangesConfig.exchanges.map((exchange) => getMarketInfoForExchange(exchange))
  );
  return pairClients;
}
