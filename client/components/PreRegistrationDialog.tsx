"use client";

import { fetchAdapter } from "@/adapters/fetchAdapter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "./Spinner";
import { OpenCsv } from "./OpenCsv";

export const PreRegisterGuestDialog = ({
  params,
}: {
  params: { uuid: string };
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handlePreRegister = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetchAdapter({
        method: "POST",
        path: "guests/pre-register",
        body: {
          name,
          email,
          uuid: params.uuid,
        },
      });
      if (response.status == 200) {
        toast({
          title: "Pre Register successfully",
          description: `Guest: ${name}`,
        });
      } else {
        toast({
          title: String(response.status),
          description: response.data,
        });
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data || "An unexpected error occurred.";
      toast({
        variant: "destructive",
        title: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Pre-Register Your Guest</Button>
      </DialogTrigger>
      <DialogContent className="w-full h-full sm:h-auto sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px] flex flex-col">
        <DialogHeader>
          <DialogTitle>Pre-Register</DialogTitle>
          <DialogDescription>
            Pre-register your guest by filling in the fields below
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handlePreRegister}
          className="space-y-4 flex-grow overflow-auto"
        >
          <div className="grid gap-4 py-4">
            <div className="sm:col-span-3 flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                className="col-span-3"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="sm:col-span-3 flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <Label className="text-right">E-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter className="flex justify-end mt-4">
            <Button type="submit" disabled={loading}>
              {loading ? <Spinner /> : "Send Pre-Register"}
            </Button>
          </DialogFooter>
        </form>

        <OpenCsv uuid={params.uuid} />
      </DialogContent>
    </Dialog>
  );
};
