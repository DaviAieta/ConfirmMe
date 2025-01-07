import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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

  const testGuests: Guest[] = [
    {
      id: "1",
      uuid: "uuid-1",
      name: "John Doe",
      email: "john.doe@example.com",
    },
    {
      id: "2",
      uuid: "uuid-2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
    },
    {
      id: "3",
      uuid: "uuid-3",
      name: "Carlos Silva",
      email: "carlos.silva@example.com",
    },
    {
      id: "4",
      uuid: "uuid-4",
      name: "Alice Brown",
      email: "alice.brown@example.com",
    },
    {
      id: "5",
      uuid: "uuid-5",
      name: "Maria Garcia",
      email: "maria.garcia@example.com",
    },
    {
      id: "6",
      uuid: "uuid-6",
      name: "Liam Johnson",
      email: "liam.johnson@example.com",
    },
    {
      id: "7",
      uuid: "uuid-7",
      name: "Sophia Martinez",
      email: "sophia.martinez@example.com",
    },
    {
      id: "8",
      uuid: "uuid-8",
      name: "Michael Brown",
      email: "michael.brown@example.com",
    },
    {
      id: "9",
      uuid: "uuid-9",
      name: "Emily Davis",
      email: "emily.davis@example.com",
    },
    {
      id: "10",
      uuid: "uuid-10",
      name: "Ethan Wilson",
      email: "ethan.wilson@example.com",
    },
  ];

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
