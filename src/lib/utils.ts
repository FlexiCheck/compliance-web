import { ForwardRefExoticComponent, RefAttributes } from 'react';

import { clsx, type ClassValue } from 'clsx';
import {
  CircleAlert,
  CircleCheck,
  CircleX,
  Github,
  Link,
  LucideProps,
  Send,
  TriangleAlert,
  Twitter,
} from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import {
  ActivityIndicator,
  AdverseMediaSentiment,
  ContactRiskSeverity,
  SecurityCheckColor,
  SecurityCheckKeys,
  WhaleMovementIndicator,
} from './_types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: string | null | undefined, options?: { dateTime?: boolean }) => {
  if (!date) return 'N/A';
  if (options?.dateTime) {
    return new Date(date).toLocaleString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  }
  return new Date(date).toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatNumber = (value: number | null | undefined) => {
  if (!value) return 'N/A';
  return new Intl.NumberFormat('en-US').format(value);
};

export const socialIcons = {
  twitter: Twitter,
  telegram: Send,
  github: Github,
  reddit: Link,
} as const;

export const securityCheckLabels: Record<SecurityCheckKeys, string> = {
  buy_tax: 'Buy Tax',
  sell_tax: 'Sell Tax',
  major_holders_ratio: 'Major Holders Ratio',
  ownership_not_renounced: 'Ownership Not Renounced',
  cannot_buy: 'Can not Buy',
  is_honeypot: 'Is Honeypot',
  is_mintable: 'Is Mintable',
  has_blacklist: 'Has Blacklist',
  has_whitelist: 'Has Whitelist',
  tax_can_be_modified: 'Tax Modifiable',
  hidden_owner: 'Hidden Owner',
  can_self_destruct: 'Can Self Destruct',
  proxy_contract: 'Proxy Contract',
  is_anti_whale: 'Anti Whale',
  cannot_sell_all: 'Can not Sell',
  can_modify_balance: 'Modify Balance',
  has_external_calls: 'External Calls',
  can_regain_ownership: 'Regain Ownership',
  is_transfer_cooldown: 'Transfer Cooldown',
  is_transfer_pausable: 'Transfer Pausable',
  anti_whale_modifiable: 'Anti Whale Modifiable',
};

export const securityCheckIcons: Record<
  SecurityCheckColor,
  {
    Icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
    color: string;
  }
> = {
  red: {
    Icon: TriangleAlert,
    color: 'text-red-600',
  },
  orange: {
    Icon: CircleAlert,
    color: 'text-orange-300',
  },
  green: {
    Icon: CircleCheck,
    color: 'text-green-600',
  },
};

export const activityIndicatorColors: Record<ActivityIndicator, string> = {
  high: 'green',
  medium: 'yellow',
  low: 'red',
};

export const contactRiskSeverityUtils: Record<
  ContactRiskSeverity,
  {
    Icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
    color: string;
  }
> = {
  low: {
    Icon: CircleCheck,
    color: 'text-green-600',
  },
  medium: {
    Icon: TriangleAlert,
    color: 'text-orange-300',
  },
  high: {
    Icon: CircleX,
    color: 'text-red-600',
  },
};

export const whaleMovementIndicatorColors: Record<WhaleMovementIndicator, string> = {
  low: 'text-green-600',
  medium: 'text-orange-600',
  high: 'text-red-600',
};

export const adverseMediaSentimentColors: Record<AdverseMediaSentiment, string> = {
  positive: 'green',
  neutral: 'gray',
  negative: 'red',
};
