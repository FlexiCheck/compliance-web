import Link from 'next/link';

const recentTokens = [
  {
    name: 'TRU',
    website: 'TrueFi',
  },
  {
    name: 'ETH',
    website: 'Ethereum',
  },
  {
    name: 'LINK',
    website: 'Chainlink',
  },
];

export const Sidebar = () => {
  return (
    <div className="h-full min-w-[300px] border-r bg-white p-6">
      <Link className="text-2xl font-bold text-text-main md:hidden" href="/dashboard">
        Compliance
      </Link>
      <h3 className="text-sm font-medium text-gray-500 mb-2 md:mt-0 mt-8">Recent Tokens</h3>

      <ul className="space-y-1">
        {recentTokens.map((token) => (
          <li
            key={token.name + token.website}
            className="text-sm hover:text-hawk-primary cursor-pointer"
          >
            {token.name} - {token.website}
          </li>
        ))}
      </ul>
    </div>
  );
};
