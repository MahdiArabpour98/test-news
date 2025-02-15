import { cn } from "@/lib/utils";

const CreatePageHeader = ({ title, className }) => {
  return (
    <div>
      <h1 className={cn("font-bold text-primary", className)}>{title}</h1>
    </div>
  );
};

export default CreatePageHeader;
