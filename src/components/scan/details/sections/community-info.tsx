import { Send, Twitter } from 'lucide-react';

import { ActivityIndicator, CommunityInfoAnalysis } from '@/lib/_types';
import { activityIndicatorColors, formatNumber } from '@/lib/utils';

import { DetailsAccordion } from '../details-accordion';
import { DetailsItem } from '../details-item';
import { DetailsSubItem } from './market-fundamentals';

type Props = {
  communityInfo: CommunityInfoAnalysis;
};

export const CommunityInfo = ({ communityInfo: { twitter, telegram } }: Props) => {
  const twitterActivity = twitter?.activity_indicator;
  const telegramActivity = telegram?.activity_indicator;

  return (
    <DetailsAccordion title="Community Info">
      <div className="w-full space-y-5">
        {twitter && (
          <DetailsItem
            title="Twitter Metrics"
            icon={<Twitter size={14} className="text-gray-500" />}
          >
            <div className="grid grid-cols-2 gap-4 mt-2">
              <DetailsSubItem title="Activity">
                <p
                  className={`text-base font-semibold text-${twitterActivity ? activityIndicatorColors[twitterActivity?.toLowerCase() as ActivityIndicator] : 'gray'}-600`}
                >
                  {twitterActivity ?? 'N/A'}
                </p>
              </DetailsSubItem>

              <DetailsSubItem title="Followers (24h)">
                <p className="text-base font-semibold text-blue-600">
                  {formatNumber(twitter.followers_24h)}
                </p>
              </DetailsSubItem>

              <DetailsSubItem title="Account Age">
                <p className="text-base font-semibold text-gray-600">
                  {twitter.account_age ?? 'N/A'}
                </p>
              </DetailsSubItem>

              <DetailsSubItem title="Tweets (24h)">
                <p className="text-base font-semibold text-purple-600">
                  {twitter.total_tweets_24h ?? 'N/A'}
                </p>
              </DetailsSubItem>
            </div>
          </DetailsItem>
        )}

        {telegram && (
          <DetailsItem title="Telegram Metrics" icon={<Send size={14} className="text-gray-500" />}>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <DetailsSubItem title="Activity">
                <p
                  className={`text-base font-semibold text-${telegramActivity ? activityIndicatorColors[telegramActivity?.toLowerCase() as ActivityIndicator] : 'gray'}-600`}
                >
                  {telegramActivity ?? 'N/A'}
                </p>
              </DetailsSubItem>

              <DetailsSubItem title="Active Users (24h)">
                <p className="text-base font-semibold text-blue-600">
                  {formatNumber(telegram.active_daily_users_24h)}
                </p>
              </DetailsSubItem>

              <DetailsSubItem title="Total Users (24h)">
                <p className="text-base font-semibold text-gray-600">
                  {formatNumber(telegram.total_users_24h)}
                </p>
              </DetailsSubItem>

              <DetailsSubItem title="Messages (24h)">
                <p className="text-base font-semibold text-purple-600">
                  {formatNumber(telegram.daily_messages_24h)}
                </p>
              </DetailsSubItem>
            </div>
          </DetailsItem>
        )}
      </div>
    </DetailsAccordion>
  );
};
