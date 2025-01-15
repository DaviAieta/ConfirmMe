import { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchAdapter } from "@/adapters/fetchAdapter";
import { Spinner } from "./Spinner";
import { useToast } from "@/hooks/use-toast";
import { GuestProps } from "@/app/events/guests/types";
import { GuestStatus } from "./GuestStatus";
import { Card, CardContent } from "@/components/ui/card";

interface GuestListProps {
  eventUuid: string;
}

export function GuestList({ eventUuid }: GuestListProps) {
  const [guests, setGuests] = useState<GuestProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const getGuests = async () => {
    try {
      const response = await fetchAdapter({
        method: "GET",
        path: "guests/" + eventUuid,
      });
      if (response.status == 200) {
        setGuests(response.data);
      } else {
        setGuests([]);
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
      });
      setGuests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGuests();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <Spinner />
      </div>
    );
  }

  return (
    <Card>
      <CardContent>
        <ScrollArea className="h-[300px] w-full rounded-md">
          <div className="space-y-4 p-4">
            {guests.length === 0 ? (
              <p className="text-center text-muted-foreground">No guests yet</p>
            ) : (
              guests.map((guest) => (
                <div
                  key={guest.id}
                  className="flex items-center justify-between space-x-4 bg-secondary/50 p-3 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback>
                        {guest.guest?.name
                          ? guest.guest.name.slice(0, 2).toUpperCase()
                          : "??"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        {guest.guest?.name || "Unknown Guest"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {guest.guest?.email || "No Email"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <GuestStatus guest={guest} />
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
