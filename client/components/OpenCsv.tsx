"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Papa from "papaparse";
import { fetchAdapter } from "@/adapters/fetchAdapter";
import { Spinner } from "./Spinner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Guest {
  name: string;
  email: string;
}

export const OpenCsv = ({ uuid }: { uuid: string }) => {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCsvFile(file);
      setHasUppercase(false);
    }
  };

  const handleCsvUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!csvFile) {
      toast({
        title: "Error",
        description: "Please select a CSV file first.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    Papa.parse(csvFile, {
      complete: async (result) => {
        const headers = result.data[0] ? Object.keys(result.data[0]) : [];
        const hasUppercaseHeaders = headers.some((header) =>
          /[A-Z]/.test(header)
        );

        if (hasUppercaseHeaders) {
          setHasUppercase(true);
        }

        const guestData = result.data.map((row: any) => ({
          name: row["name"] ? row["name"].toLowerCase() : "",
          email: row["email"] ? row["email"].toLowerCase() : "",
        }));

        try {
          const response = await fetchAdapter({
            method: "POST",
            path: "guests/bulk-pre-register",
            body: {
              uuid,
              guests: guestData,
            },
          });
          if (response.status === 200) {
            toast({
              title: "Pre-Registration successful",
              description: `${guestData.length} guests have been successfully pre-registered.`,
            });
          } else {
            toast({
              title: String(response.status),
              description: response.data,
              variant: "destructive",
            });
          }
        } catch (error: any) {
          const errorMessage =
            error.response?.data || "An unexpected error occurred.";
          toast({
            variant: "destructive",
            title: "Error",
            description: errorMessage,
          });
        } finally {
          setLoading(false);
        }
      },
      header: true,
      skipEmptyLines: true,
    });
  };

  const downloadCsvExample = () => {
    const exampleData = [
      ["name", "email"],
      ["alice", "alice@example.com"],
      ["bob", "bob@example.com"],
      ["charlie", "charlie@example.com"],
      ["david", "david@example.com"],
      ["eva", "eva@example.com"],
    ];

    const csvContent = Papa.unparse(exampleData);

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "guests_example.csv";
    link.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>CSV Guest Upload</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="csvFile" className="text-right">
            CSV File
          </Label>
          <Input
            id="csvFile"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="col-span-3"
          />
        </div>

        {hasUppercase && (
          <div className="mt-4 text-sm text-red-600">
            <strong>Warning:</strong> The CSV file contains uppercase letters in
            the headers. We recommend using lowercase letters for consistency.
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleCsvUpload} disabled={loading || !csvFile}>
          {loading ? <Spinner /> : "Upload CSV"}
        </Button>
        <Button
          onClick={downloadCsvExample}
          className="ml-2"
          variant={"outline"}
        >
          Download CSV Example
        </Button>
      </CardFooter>
    </Card>
  );
};
