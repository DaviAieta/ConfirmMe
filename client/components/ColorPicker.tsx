"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type ColorPickerProps = {
  value: string;
  onChange: (color: string) => void;
};

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  const colorMap: Record<string, string> = {
    "#FF5733": "Vivid Red",
    "#FF8D1A": "Sunset Orange",
    "#4CAF50": "Vibrant Green",
    "#2196F3": "Bright Blue",
    "#9C27B0": "Electric Purple",
    "#00BCD4": "Bright Cyan",
    "#FF4081": "Hot Pink",
    "#3F51B5": "Indigo Blue",
    "#FFC107": "Amber",
    "#FF5722": "Burnt Orange",
    "#00C853": "Lime Green",
  };

  const presetColors = Object.keys(colorMap);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[250px] justify-between text-left font-normal"
        >
          <div className="flex items-center gap-2">
            <div
              className="h-4 w-4 rounded-full border border-gray-200"
              style={{ backgroundColor: value }}
            />
            <span>{colorMap[value] || "Custom Color"}</span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Pick a color</h4>
            <p className="text-sm text-muted-foreground">
              Select from preset colors or enter a custom value.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {presetColors.map((presetColor) => (
              <Button
                key={presetColor}
                variant="outline"
                className="w-full p-0 h-8"
                style={{ backgroundColor: presetColor }}
                onClick={() => onChange(presetColor)}
              >
                {value === presetColor && (
                  <Check className="h-4 w-4 text-white" />
                )}
                <span className="sr-only">
                  Select color {colorMap[presetColor]}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
