import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchAdapter } from "@/adapters/fetchAdapter";
import { Spinner } from "./Spinner";
import { useToast } from "@/hooks/use-toast";

interface Guest {
  id: string;
  uuid: string;
  name: string;
  email: string;
}

interface GuestListProps {
  eventUuid: string;
}

export function GuestList({ eventUuid }: GuestListProps) {
  const [guests, setGuests] = useState<Guest[]>([]);
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
    <div>
      <ScrollArea className="h-[300px] w-full rounded-md border">
        <div className="p-4">
          {guests.length === 0 ? (
            <p className="text-center text-muted-foreground">No guests yet</p>
          ) : (
            guests.map((guest) => (
              <div key={guest.id} className="flex items-center space-x-4 py-2">
                <Avatar>
                  <AvatarFallback>
                    {guest.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {guest.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{guest.email}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
