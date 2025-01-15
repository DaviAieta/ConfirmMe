import { Check, Clock, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GuestProps } from "@/app/events/guests/types";

interface GuestStatusProps {
  guest: GuestProps;
}

export function GuestStatus({ guest }: GuestStatusProps) {
  const getStatus = (guest: GuestProps) => {
    if (guest.confirmed)
      return { text: "Confirmed", icon: Check, color: "text-green-500" };
    if (guest.declined)
      return { text: "Declined", icon: X, color: "text-red-500" };
    return { text: "Pending", icon: Clock, color: "text-amber-500" };
  };

  const { text, icon: Icon, color } = getStatus(guest);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className={`flex items-center space-x-1 ${color}`}>
            <Icon className="w-4 h-4" />
            <span className="text-sm font-medium">{text}</span>
          </div>
        </TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  );
}
