import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SubmitButton = ({
  children,
  loading,
  className,
  uploadProgress,
  ...props
}) => {
  return (
    <Button
      {...props}
      className={cn("relative", className)}
      type="submit"
      disabled={props.disabled || loading}
    >
      <div
        className="absolute left-0 top-0 h-full rounded-lg bg-yellow-700 bg-opacity-50"
        style={{ width: `${uploadProgress}%` }}
      />
      <span className="flex items-center justify-center gap-1">
        {children}
        {loading && <Loader2 size={16} className="animate-spin" />}
      </span>
    </Button>
  );
};

export default SubmitButton;
