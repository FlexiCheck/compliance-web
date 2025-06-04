import { TokenDetails } from '@/components/scan/details';

const DashboardPage = () => {
  return (
    <TokenDetails
      overview={{
        price: '$1.00',
        ticker: 'USDT',
        market_cap: '$83.2B',
        volume_24h: '$42.5B',
        website: 'https://tether.to',
        token_contract: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        socials: {
          twitter: 'https://twitter.com/Tether_to',
          telegram: 'https://t.me/tether_official',
        },
        description: 'Tether is a stablecoin pegged to the US Dollar.',
      }}
      review={{
        contract: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        major_holders_ratio: '41%',
        ownership_not_renounced: false,
        buy_tax: null,
        sell_tax: null,
        cannot_buy: true,
        is_honeypot: false,
        is_mintable: true,
        has_blacklist: true,
        has_whitelist: false,
        is_anti_whale: false,
        tax_can_be_modified: false,
        cannot_sell_all: true,
        hidden_owner: false,
        can_self_destruct: true,
        proxy_contract: false,
        can_modify_balance: false,
        has_external_calls: false,
        can_regain_ownership: false,
        is_transfer_cooldown: true,
        is_transfer_pausable: true,
        anti_whale_modifiable: false,
        top_10_holders_ratio: '8.65%',
      }}
      marketFundamentals={{
        token_price: '$1.00',
        low: '$1.00',
        high: '$1.00',
        volume_24h: '$56.42B',
        market_cap: '$153.39B',
        volume_by_exchange_type_24h: {
          CEX: '$56.08B',
          DEX: '$341.55M',
        },
        cex_info: [
          {
            name: 'Binance',
            daily_netflow: '+553,384,897.52',
            market_cap_held: '$21.86B',
          },
          {
            name: 'OKX',
            daily_netflow: '-88,923,211.38',
            market_cap_held: '$6.15B',
          },
          {
            name: 'Bybit',
            daily_netflow: '+3,001,185.25',
            market_cap_held: '$2.96B',
          },
          {
            name: 'Bitget',
            daily_netflow: '+4,641,828.06',
            market_cap_held: '$713.26M',
          },
          {
            name: 'Kucoin',
            daily_netflow: '-59,922,000.12',
            market_cap_held: '$910.10M',
          },
          {
            name: 'MEXC',
            daily_netflow: '+4,421,422.97',
            market_cap_held: '$311.32M',
          },
          {
            name: 'Bitfinex',
            daily_netflow: '+148,917,106.64',
            market_cap_held: '$267.70M',
          },
          {
            name: 'Kraken',
            daily_netflow: '+49,399,255.29',
            market_cap_held: '$262.47M',
          },
        ],
        total_value_locked_24h: null,
        unique_active_wallets_24h: null,
        tvl_ratio: null,
      }}
      fundamentals={{
        total_active_users_7d: 916135,
        token_transferred_7d: '$60.96B',
        total_transactions_7d: 7259923,
      }}
      domainInfo={{
        domain: 'tether.to',
        registrar: 'Unknown',
        registered_date: '2025-06-03 16:05:16.847612',
        updated_date: '2025-06-03 16:05:16.847633',
        expiry_date: '2025-06-03 16:05:16.847636',
        domain_status: 'Unknown',
        name_servers: [],
      }}
      operational={{
        contract_address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        active_users_24h: null,
        transactions_24h: null,
        gas_consumed_24h: null,
        contract_risks: [
          {
            name: 'Centralization Risk',
            severity: 'High',
            description: 'Contract has blacklist capabilities and admin functions',
          },
          {
            name: 'Mintable Supply',
            severity: 'Medium',
            description: 'Contract owner can mint new tokens at any time',
          },
        ],
        deploy_date: '04/11/2019',
        details_url: 'http://localhost:3000/dashboard',
      }}
      adverseMedia={null}
      holderAnalysis={{
        total_holders: 7730461,
        whale_movement_indicator: 'Medium',
      }}
      communityInfo={{
        twitter: {
          activity_indicator: 'High',
          followers_24h: 535756,
          account_age: '10 yr 6 mos',
          total_tweets_24h: 1731,
        },
        telegram: {
          activity_indicator: 'Medium',
          active_daily_users_24h: 25300,
          total_users_24h: 95000,
          daily_messages_24h: 4532,
        },
      }}
    />
  );
};

export default DashboardPage;
