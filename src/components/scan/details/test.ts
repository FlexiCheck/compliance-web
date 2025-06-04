dummy_data = CertikData(
  (token_overview = TokenOverview(
    (price = '$1.00'),
    (ticker = 'USDT'),
    (market_cap = '$83.2B'),
    (volume_24h = '$42.5B'),
    (website = 'https://tether.to'),
    (token_contract = '0xdac17f958d2ee523a2206206994597c13d831ec7'),
    (socials = {
      twitter: 'https://twitter.com/Tether_to',
      telegram: 'https://t.me/tether_official',
    }),
    (description = 'Tether is a stablecoin pegged to the US Dollar.')
  )),
  (token_review = TokenReview(
    (contract = '0xdac17f958d2ee523a2206206994597c13d831ec7'),
    (major_holders_ratio = '35.2%'),
    (ownership_not_renounced = True),
    (buy_tax = '0%'),
    (sell_tax = '0%'),
    (cannot_buy = False),
    (is_honeypot = False),
    (is_mintable = True),
    (has_blacklist = True),
    (tax_can_be_modified = False),
    (top_10_holders_ratio = '45.8%')
  )),
  (market_fundamentals = MarketFundamentals(
    (token_price = '$1.00'),
    (low = '$0.998'),
    (high = '$1.002'),
    (volume_24h = '$42.5B'),
    (market_cap = '$83.2B'),
    (volume_by_exchange_type_24h = {
      CEX: '$38.1B',
      DEX: '$4.4B',
    })
  )),
  (operational = Operational(
    (contract_address = '0xdac17f958d2ee523a2206206994597c13d831ec7'),
    (active_users_24h = 245632),
    (transactions_24h = 892137),
    (gas_consumed_24h = '523.6 ETH'),
    (contract_risks = [
      ContractRisk(
        (name = 'Centralization Risk'),
        (severity = 'High'),
        (description = 'Contract has blacklist capabilities and admin functions')
      ),
      ContractRisk(
        (name = 'Mintable Supply'),
        (severity = 'Medium'),
        (description = 'Contract owner can mint new tokens at any time')
      ),
    ]),
    (deploy_date = '2017-09-15'),
    (details_url = 'https://www.certik.com/projects/tether')
  )),
  (token_holder_analysis = TokenHolderAnalysis(
    (total_holders = 4582193),
    (whale_movement_indicator = 'Neutral')
  )),
  (community_info = CommunityInfo(
    (twitter = TwitterInfo(
      (activity_indicator = 'High'),
      (followers_24h = 1250000),
      (account_age = '5+ years'),
      (total_tweets_24h = 32)
    )),
    (telegram = TelegramInfo(
      (activity_indicator = 'Medium'),
      (active_daily_users_24h = 25300),
      (total_users_24h = 95000),
      (daily_messages_24h = 4532)
    ))
  ))
);
