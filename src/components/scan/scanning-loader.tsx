import { AlertCircle, Shield } from 'lucide-react';

type Props = {
  tokenName: string;
};

export const ScanningLoader = ({ tokenName }: Props) => {
  return (
    <div className="bg-white p-8 border rounded-md w-[670px] flex flex-col items-center justify-center gap-6">
      <div className="relative w-full h-[200px] bg-gray-50 rounded-lg overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-primary animate-scan" />

        <div className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-4 h-4 rounded-full bg-red-500" />
            <div className="w-4 h-4 rounded-full bg-yellow-500" />
            <div className="w-4 h-4 rounded-full bg-green-500" />
            <div className="flex-1 h-4 bg-gray-200 rounded ml-2" />
          </div>
          <div className="space-y-2">
            <div className="h-2 bg-gray-200 rounded w-3/4" />
            <div className="h-2 bg-gray-200 rounded w-1/2" />
            <div className="h-2 bg-gray-200 rounded w-2/3" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center">
          <h3 className="tracking-tight text-2xl font-bold text-center">Scanning Token</h3>
          <p className="text-sm text-muted-foreground text-center">
            Analyzing {tokenName} for potential risks and compliance issues...
          </p>
        </div>
      </div>

      <div className="flex gap-4 w-full">
        <div className="flex-1 p-4 bg-gray-50 rounded-lg flex items-center gap-3">
          <Shield className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-medium">Security Check</p>
            <p className="text-xs text-muted-foreground">Verifying token security...</p>
          </div>
        </div>
        <div className="flex-1 p-4 bg-gray-50 rounded-lg flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-medium">Risk Analysis</p>
            <p className="text-xs text-muted-foreground">Evaluating potential risks...</p>
          </div>
        </div>
      </div>
    </div>
  );
};
