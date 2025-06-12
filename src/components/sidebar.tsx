import Link from 'next/link';

export const Sidebar = () => {
  return (
    <div className="h-full min-w-[300px] border-r bg-white p-6">
      <Link className="text-2xl font-bold text-text-main md:hidden" href="/dashboard">
        Compliance
      </Link>
      <h3 className="text-sm font-bold text-gray-500 mb-2 md:mt-0 mt-8">Recent Tokens</h3>

      <p className="text-sm text-gray-500 mt-3">Coming soon</p>
    </div>
  );
};
