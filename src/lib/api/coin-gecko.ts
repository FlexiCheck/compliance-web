export const coinGeckoDatafetcher = async (tokenAddress: string, chain: string): Promise<any> => {
  // Determine the platform based on chainId - defaulting to ethereum for now

  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${chain}/contract/${tokenAddress}`,
    {
      headers: {
        'x-cg-demo-api-key': 'CG-x2hRCfce3dE94sRRhLFZGbA3',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch token data from CoinGecko');
  }
  const parsed_data = await response.json();
  return parsed_data;
};

export const fetchTop10HoldersRatio = async (tokenAddress: string): Promise<any> => {
  const response = await fetch(
    `https://deep-index.moralis.io/api/v2.2/erc20/${tokenAddress}/owners?limit=10`,
    {
      headers: {
        'X-API-Key':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjA5OTZiZmI2LWE2NzktNDJlMS1iYTM4LTIzOTg2NTM0OTA3ZCIsIm9yZ0lkIjoiNDY1OTU4IiwidXNlcklkIjoiNDc5MzY3IiwidHlwZUlkIjoiYWQyOGIxYjktNjY4NC00Y2VhLTgxODctODgxZjEzMDg0OWY1IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3NTU2MTI1NTIsImV4cCI6NDkxMTM3MjU1Mn0.6NLjW6pOV8nehZvT1cbU41Mymr9wlieoM8EUk08_NzU', // Replace with your actual Moralis API key
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch token data from CoinGecko');
  }
  const parsed_data = await response.json();
  return parsed_data;
};

export const fetchUniqueWallets24h = async (tokenAddress: string, chain: string): Promise<any> => {
  const response = await fetch(
    `https://deep-index.moralis.io/api/v2.2/tokens/${tokenAddress}/analytics?chain=${chain}`,
    {
      headers: {
        'X-API-Key':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjA5OTZiZmI2LWE2NzktNDJlMS1iYTM4LTIzOTg2NTM0OTA3ZCIsIm9yZ0lkIjoiNDY1OTU4IiwidXNlcklkIjoiNDc5MzY3IiwidHlwZUlkIjoiYWQyOGIxYjktNjY4NC00Y2VhLTgxODctODgxZjEzMDg0OWY1IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3NTU2MTI1NTIsImV4cCI6NDkxMTM3MjU1Mn0.6NLjW6pOV8nehZvT1cbU41Mymr9wlieoM8EUk08_NzU', // Replace with your actual Moralis API key
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch token data from CoinGecko');
  }
  const parsed_data = await response.json();
  return parsed_data;
};

export const fetchTotalHolders = async (tokenAddress: string): Promise<any> => {
  const response = await fetch(
    `https://deep-index.moralis.io/api/v2.2/erc20/${tokenAddress}/holders`,
    {
      headers: {
        'X-API-Key':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjA5OTZiZmI2LWE2NzktNDJlMS1iYTM4LTIzOTg2NTM0OTA3ZCIsIm9yZ0lkIjoiNDY1OTU4IiwidXNlcklkIjoiNDc5MzY3IiwidHlwZUlkIjoiYWQyOGIxYjktNjY4NC00Y2VhLTgxODctODgxZjEzMDg0OWY1IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3NTU2MTI1NTIsImV4cCI6NDkxMTM3MjU1Mn0.6NLjW6pOV8nehZvT1cbU41Mymr9wlieoM8EUk08_NzU', // Replace with your actual Moralis API key
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch token data from CoinGecko');
  }
  const parsed_data = await response.json();
  return parsed_data;
};

export const fetchActiveUsersAndTransactions = async (
  tokenAddress: string,
  chain: string
): Promise<any> => {
  const response = await fetch(
    `https://deep-index.moralis.io/api/v2.2/tokens/${tokenAddress}/analytics?chain=${chain}`,
    {
      headers: {
        'X-API-Key':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjA5OTZiZmI2LWE2NzktNDJlMS1iYTM4LTIzOTg2NTM0OTA3ZCIsIm9yZ0lkIjoiNDY1OTU4IiwidXNlcklkIjoiNDc5MzY3IiwidHlwZUlkIjoiYWQyOGIxYjktNjY4NC00Y2VhLTgxODctODgxZjEzMDg0OWY1IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3NTU2MTI1NTIsImV4cCI6NDkxMTM3MjU1Mn0.6NLjW6pOV8nehZvT1cbU41Mymr9wlieoM8EUk08_NzU', // Replace with your actual Moralis API key
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch token data from CoinGecko');
  }
  const parsed_data = await response.json();
  return parsed_data;
};

export const fetchDeployDate = async (tokenAddress: string, chain: string): Promise<any> => {
  const response = await fetch(
    `https://deep-index.moralis.io/api/v2.2/erc20/metadata?chain=${chain}&addresses=${tokenAddress}`,
    {
      headers: {
        'X-API-Key':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjA5OTZiZmI2LWE2NzktNDJlMS1iYTM4LTIzOTg2NTM0OTA3ZCIsIm9yZ0lkIjoiNDY1OTU4IiwidXNlcklkIjoiNDc5MzY3IiwidHlwZUlkIjoiYWQyOGIxYjktNjY4NC00Y2VhLTgxODctODgxZjEzMDg0OWY1IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3NTU2MTI1NTIsImV4cCI6NDkxMTM3MjU1Mn0.6NLjW6pOV8nehZvT1cbU41Mymr9wlieoM8EUk08_NzU', // Replace with your actual Moralis API key
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch token data from CoinGecko');
  }
  const parsed_data = await response.json();
  return parsed_data;
};
