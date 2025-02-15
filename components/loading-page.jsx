import { Loader2 } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </div>
  );
};

export default LoadingPage;
