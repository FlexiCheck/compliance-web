export type Nullable<T> = { [K in keyof T]: T[K] | null };

export type TokenOverviewAnalysis = Nullable<{
  ticker: string;
  price: string;
  market_cap: string;
  volume_24h: string;
  website: string;
  token_contract: string;
  socials: Record<string, string>;
  description: string;
}>;

export type SecurityChecks = {
  ownership_not_renounced: boolean;
  cannot_buy: boolean;
  is_honeypot: boolean;
  is_mintable: boolean;
  has_blacklist: boolean;
  has_whitelist: boolean;
  tax_can_be_modified: boolean;
  hidden_owner: boolean;
  can_self_destruct: boolean;
  proxy_contract: boolean;

  is_anti_whale: boolean;
  cannot_sell_all: boolean;
  can_modify_balance: boolean;
  has_external_calls: boolean;
  can_regain_ownership: boolean;
  is_transfer_cooldown: boolean;
  is_transfer_pausable: boolean;
  anti_whale_modifiable: boolean;
};

export type SecurityCheckKeys = keyof SecurityChecks;

export type TokenReviewPAnalysis = Nullable<
  {
    contract: string;
    major_holders_ratio: string;
    top_10_holders_ratio: string;
    buy_tax: string;
    sell_tax: string;
  } & SecurityChecks
>;

export type CexInfo = Nullable<{
  name: string;
  daily_netflow: string;
  market_cap_held: string;
}>;

export type MarketFundamentalsAnalysis = Nullable<{
  token_price: string;
  low: string;
  high: string;
  volume_24h: string;
  market_cap: string;
  volume_by_exchange_type_24h: {
    CEX: string;
    DEX: string;
  };
  cex_info: Array<CexInfo>;
  total_value_locked_24h: string;
  unique_active_wallets_24h: string;
  tvl_ratio: string;
}>;

export type FundamentalsAnalysis = Nullable<{
  total_active_users_7d: number;
  token_transferred_7d: string;
  total_transactions_7d: number;
}>;

export type DomainInfoAnalysis = Nullable<{
  domain: string;
  registrar: string;
  registered_date: string;
  updated_date: string;
  expiry_date: string;
  domain_status: string;
  name_servers: Array<string>;
}>;

export type ContractRisk = Nullable<{
  name: string;
  severity: string;
  description: string;
}>;

export type OperationalAnalysis = Nullable<{
  contract_address: string;
  active_users_24h: null;
  transactions_24h: null;
  gas_consumed_24h: null;
  contract_risks: Array<ContractRisk>;
  deploy_date: string;
  details_url: string;
}>;

// TODO add correct types
export type AdverseMediaAnalysis = Nullable<null>;

export type TokenHolderAnalysis = Nullable<{
  total_holders: number;
  whale_movement_indicator: string;
}>;

export type ActivityIndicator = 'High' | 'Medium' | 'Low';

type CommunityInfoTwitter = Nullable<{
  activity_indicator: ActivityIndicator;
  followers_24h: number;
  account_age: string;
  total_tweets_24h: number;
}>;

type CommunityInfoTelegram = Nullable<{
  activity_indicator: ActivityIndicator;
  active_daily_users_24h: number;
  total_users_24h: number;
  daily_messages_24h: number;
}>;

export type CommunityInfoAnalysis = {
  twitter: CommunityInfoTwitter;
  telegram: CommunityInfoTelegram;
};
