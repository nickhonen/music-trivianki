import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Play, Pause } from "lucide-react";

interface QuestionProps {
  question: string;
  options: string[];
  correctAnswer: number;
  onAnswer: (songIndex: number) => void;
  //   isPlaying?: boolean;
  //   onPlayPause?: () => void;
}

const MusicQuestion: React.FC<QuestionProps> = ({
  question,
  options,
  correctAnswer,
  onAnswer,
  //   isPlaying = false,
  //   onPlayPause,
}) => {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{question}</span>
          {/* <Button
            variant="outline"
            size="icon"
            // onClick={onPlayPause}
            className="rounded-full"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button> */}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Select onValueChange={onAnswer}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a song..." />
          </SelectTrigger>
          <SelectContent>
            {options.map((option, index) => (
              <SelectItem key={index} value={index}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

export default MusicQuestion;
