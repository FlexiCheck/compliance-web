const recentTokens = [
  {
    name: "TRU",
    website: "TrueFi",
  },
  {
    name: "ETH",
    website: "Ethereum",
  },
  {
    name: "LINK",
    website: "Chainlink",
  },
];

export const Sidebar = () => {
  return (
    <div className="h-full min-w-[300px] border-r bg-white p-6">
      <h3 className="text-sm font-medium text-gray-500 mb-2">Recent Tokens</h3>

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
