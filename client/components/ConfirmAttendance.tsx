"use client";

import React, { useState, useEffect, use } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Calendar,
  Info,
  Mail,
  MapPin,
  PartyPopper,
  Shield,
} from "lucide-react";
import { EventProps } from "../app/events/types";
import { fetchAdapter } from "@/adapters/fetchAdapter";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const ConfirmAttendance = ({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) => {
  const resolvedParams = use(params);
  const [verificationStep, setVerificationStep] = useState<number>(() => {
    const savedStep = localStorage.getItem(
      `verificationStep_${resolvedParams.uuid}`
    );
    return savedStep ? parseInt(savedStep, 10) : 1;
  });
  const [verificationCode, setVerificationCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [event, setEvent] = useState<EventProps | null>(null);
  const [eventNotFound, setEventNotFound] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(() => {
    return localStorage.getItem(`email_${resolvedParams.uuid}`) || "";
  });
  const [phone, setPhone] = useState("");
  const [isSendingCode, setIsSendingCode] = useState(false);
  const { toast } = useToast();

  const handleSendVerificationCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSendingCode(true);
    try {
      const response = await fetchAdapter({
        method: "POST",
        path: "guests/send-code",
        body: {
          email,
        },
      });
      if (response.status == 200) {
        toast({
          title: "code sent",
          description: "Verify your SMS.",
        });
        setCodeSent(true);
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to send code.",
      });
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetchAdapter({
        method: "POST",
        path: "guests/verify-code",
        body: {
          code: verificationCode,
        },
      });
      if (response.status == 200) {
        toast({
          title: "You are verified",
          description: "Fill the fields",
        });
        setVerificationStep(2);
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to send code.",
      });
    }
  };

  const getEvent = async () => {
    try {
      const response = await fetchAdapter({
        method: "GET",
        path: `events/${resolvedParams.uuid}`,
      });
      if (response.status === 200 && response.data) {
        setEvent(response.data);
        setEventNotFound(false);
      } else {
        setEventNotFound(true);
        toast({
          title: "Event not found",
          description: "The event you are looking for does not exist.",
        });
      }
    } catch {
      setEventNotFound(true);
      toast({
        title: "Error",
        description: "An error occurred while fetching the event.",
      });
    }
  };

  const handleConfirmAttendece = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetchAdapter({
        method: "POST",
        path: "guests/confirm",
        body: {
          email,
          phone,
          eventUuid: resolvedParams?.uuid,
        },
      });
      if (response.status == 200) {
        toast({
          title: "Congratulations you're confirme!!",
          description: `Event: ${event?.title}`,
        });
        setVerificationStep(3);
      }
    } catch {
      toast({
        variant: "destructive",
        title: `Error`,
      });
    }
  };

  useEffect(() => {
    getEvent();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      `verificationStep_${resolvedParams.uuid}`,
      verificationStep.toString()
    );
  }, [verificationStep, resolvedParams.uuid]);

  useEffect(() => {
    localStorage.setItem(`email_${resolvedParams.uuid}`, email);
  }, [email, resolvedParams.uuid]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {verificationStep === 1 && (
        <div className="flex min-h-screen bg-gray-100">
          <div className="flex-1 hidden lg:block bg-primary">
            <div className="flex flex-col justify-center items-center h-full text-white space-y-8">
              <PartyPopper className="w-24 h-24" />
              <h1 className="text-4xl font-bold text-center">
                Confirm Your E-mail
              </h1>
              <p className="text-xl text-center max-w-md">
                Verify your E-mail to confirm your attendance at the party.
              </p>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center p-8">
            <Card className="w-full max-w-2xl">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Mail className="w-6 h-6 text-primary" />
                  <CardTitle className="text-2xl font-bold">
                    E-mail Verification
                  </CardTitle>
                </div>
                <CardDescription>
                  Enhance your account security with phone verification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="send" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="send">Send Code</TabsTrigger>
                    <TabsTrigger value="verify" disabled={!codeSent}>
                      Verify Code
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="send">
                    <form
                      onSubmit={handleSendVerificationCode}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium">
                          E-mail
                        </Label>
                        <div className="flex">
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                            className="flex-1 ml-2"
                            placeholder="name@mail.com"
                          />
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isSendingCode || codeSent}
                      >
                        {isSendingCode
                          ? "Sending..."
                          : "Send Verification Code"}
                      </Button>
                    </form>
                  </TabsContent>
                  <TabsContent value="verify">
                    <form className="space-y-4" onSubmit={handleVerifyCode}>
                      <div className="space-y-2">
                        <Label
                          htmlFor="verificationCode"
                          className="text-sm font-medium"
                        >
                          Verification Code
                        </Label>
                        <Input
                          id="verificationCode"
                          name="verificationCode"
                          type="text"
                          required
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                          className="w-full"
                          placeholder="Enter 6-digit code"
                          maxLength={6}
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Verify Code
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  <span>
                    Your phone number is securely stored and will not be shared.
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Info className="w-4 h-4" />
                  <span>
                    By continuing, you agree to our{" "}
                    <a
                      href="#"
                      className="underline underline-offset-2 hover:text-primary"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="underline underline-offset-2 hover:text-primary"
                    >
                      Privacy Policy
                    </a>
                    .
                  </span>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}

      {verificationStep === 2 && (
        <div className="flex flex-col lg:flex-row min-h-screen">
          <div className="lg:w-2/3 relative overflow-hidden bg-gray-700">
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-start lg:p-12">
              <div className="text-white space-y-2 max-w-2xl mb-8">
                <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                  {event?.title}
                </h1>
                <p className="text-xl lg:text-2xl font-light">
                  {event?.description}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/3 flex flex-col justify-between p-8 lg:p-12">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">{event?.title}</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <span>
                      {event?.dhStart
                        ? format(
                            new Date(event?.dhStart),
                            "dd MMMM yyyy, HH:mm",
                            { locale: enUS }
                          )
                        : "Date not available"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <span>{event?.address}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4 py-10">
                <h2 className="text-3xl font-bold">Confirm Your Attendance</h2>
                <form className="space-y-4" onSubmit={handleConfirmAttendece}>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      readOnly
                      required
                      className="w-full bg-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone (optional)
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="phone"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                      className="w-full"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Confirm Attendance
                  </Button>
                </form>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-8">
              For any questions, please contact us at events@email.com or call
              +1 (555) 123-4567
            </p>
          </div>
        </div>
      )}
      {verificationStep === 3 && (
        <div className="flex min-h-screen justify-center items-center bg-white">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-indigo-700">
              You are Confirmed!
            </h1>
            <p className="text-lg">Thank you for confirming your attendance.</p>
            <p className="text-sm text-gray-600">
              Event: <strong>{event?.title}</strong>
            </p>
            <p className="text-sm text-gray-600">
              Location: <strong>{event?.address}</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
