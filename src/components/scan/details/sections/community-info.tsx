import { Send, Twitter } from 'lucide-react';

import { ActivityIndicator, AIRIskAnalysisCategory, CommunityInfoAnalysis } from '@/lib/_types';
import { activityIndicatorColors, formatNumber } from '@/lib/utils';

import { AIRisk } from '../../ai-risk';
import { DetailsAccordion } from '../details-accordion';
import { DetailsItem } from '../details-item';
import { DetailsSubItem } from './market-fundamentals';

type Props = {
  communityInfo: {
    twitter: {
      activity_indicator: string | null;
      followers_24h: string | null;
      account_age: string | null;
      total_tweets_24h: string | null;
    } | null;
    telegram?: any; // Adjust type if telegram has a specific structure
  } | null;
};

export const CommunityInfo = ({ communityInfo }: Props) => {
  const twitterActivity = communityInfo?.twitter?.activity_indicator;

  return (
    <DetailsAccordion title="Community Info">
      <div className="w-full space-y-5">
        {/* {ai_risk && <AIRisk ai_risk={ai_risk} />} */}

        {communityInfo?.twitter && (
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
                  {formatNumber(
                    communityInfo?.twitter?.followers_24h
                      ? parseFloat(communityInfo?.twitter?.followers_24h)
                      : 0
                  )}
                </p>
              </DetailsSubItem>

              <DetailsSubItem title="Account Age">
                <p className="text-base font-semibold text-gray-600">
                  {communityInfo?.twitter.account_age ?? 'N/A'}
                </p>
              </DetailsSubItem>

              <DetailsSubItem title="Tweets (24h)">
                <p className="text-base font-semibold text-purple-600">
                  {communityInfo?.twitter.total_tweets_24h ?? 'N/A'}
                </p>
              </DetailsSubItem>
            </div>
          </DetailsItem>
        )}

        {/*
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
                  {formatNumber(parseFloat(telegram?.active_daily_users_24h))}
                </p>
              </DetailsSubItem>

              <DetailsSubItem title="Total Users (24h)">
                <p className="text-base font-semibold text-gray-600">
                  {formatNumber(parseFloat(telegram.total_users_24h))}
                </p>
              </DetailsSubItem>

              <DetailsSubItem title="Messages (24h)">
                <p className="text-base font-semibold text-purple-600">
                  {formatNumber(parseFloat(telegram.daily_messages_24h))}
                </p>
              </DetailsSubItem>
            </div>
          </DetailsItem>
        )}
        */}
      </div>
    </DetailsAccordion>
  );
};
