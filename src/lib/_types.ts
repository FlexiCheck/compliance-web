export type Nullable<T> = { [K in keyof T]: T[K] | null };

export type RiskLevel = 'high' | 'medium' | 'low';

export type AIRIskAnalysisCategory = Nullable<{
  category: string;
  risk_level: RiskLevel;
  summary: string;
}>;

export type AIRiskANalysisSummary = Nullable<{
  analysis_timestamp: string;
  categories: Array<AIRIskAnalysisCategory>;
  overall_risk_assessment: string;
}>;

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

export type SecurityCheckColor = 'red' | 'orange' | 'green';

export type SecurityChecks = {
  buy_tax: SecurityCheckColor;
  sell_tax: SecurityCheckColor;
  major_holders_ratio: SecurityCheckColor;
  ownership_not_renounced: SecurityCheckColor;
  cannot_buy: SecurityCheckColor;
  is_honeypot: SecurityCheckColor;
  is_mintable: SecurityCheckColor;
  has_blacklist: SecurityCheckColor;
  has_whitelist: SecurityCheckColor;
  tax_can_be_modified: SecurityCheckColor;
  hidden_owner: SecurityCheckColor;
  can_self_destruct: SecurityCheckColor;
  proxy_contract: SecurityCheckColor;

  is_anti_whale: SecurityCheckColor;
  cannot_sell_all: SecurityCheckColor;
  can_modify_balance: SecurityCheckColor;
  has_external_calls: SecurityCheckColor;
  can_regain_ownership: SecurityCheckColor;
  is_transfer_cooldown: SecurityCheckColor;
  is_transfer_pausable: SecurityCheckColor;
  anti_whale_modifiable: SecurityCheckColor;
};

export type SecurityCheckKeys = keyof SecurityChecks;

export type TokenReviewPAnalysis = Nullable<
  {
    contract: string;
    top_10_holders_ratio: string;
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
  ai_summary: string;
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
  ai_summary: string;
}>;

export type ContactRiskSeverity = RiskLevel;

export type ContractRisk = Nullable<{
  name: string;
  severity: ContactRiskSeverity;
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

export type AdverseMediaSentiment = 'positive' | 'neutral' | 'negative';

export type AdverseMediaAnalysis = Nullable<{
  url: string;
  date: string;
  title: string;
  source: string;
  summary: string;
  sentiment: AdverseMediaSentiment;
  risk_level: string;
}>;

export type WhaleMovementIndicator = RiskLevel;

export type TokenHolderAnalysis = Nullable<{
  total_holders: number;
  whale_movement_indicator: WhaleMovementIndicator;
}>;

export type ActivityIndicator = RiskLevel;

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

export type WebsiteContentScreening = Nullable<{
  ai_summary: string;
  faq_analysis: string;
  landing_page_analysis: string;
  cookie_policy_analysis: string;
  privacy_policy_analysis: string;
}>;
