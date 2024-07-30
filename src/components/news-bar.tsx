import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface NewsBarProps {
  messages: string[];
}

export function NewsBar({ messages }: NewsBarProps) {
  return (
    <div className="bg-gray-50 text-primary-foreground py-2">
      <div className="container mx-auto">
        {messages.map((message, index) => (
          <Alert key={index} className="mb-2 last:mb-0">
            <Info className="h-4 w-4" />
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        ))}
      </div>
    </div>
  );
}
