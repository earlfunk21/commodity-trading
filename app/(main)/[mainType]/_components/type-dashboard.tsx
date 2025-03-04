"use client";

import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface TypeDashboardProps {
  section: {
    title: string;
    commodities: {
      name: string;
      last: number;
      change: { value: number; percentage: number };
      volume: number;
    }[];
  };
}

export default function TypeDashboard({ section }: TypeDashboardProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);

  const images = ["Chart View", "Price History", "Market Depth"];
  const videos = ["Live Trade", "Market Analysis", "News Feed"];
  const takerData = section.commodities.map((commodity) => ({
    title: commodity.name,
    last: commodity.last,
    change: `${commodity.change.value >= 0 ? "+" : ""}${
      commodity.change.value
    } (${(commodity.change.percentage * 100).toFixed(2)}%)`,
    volume: commodity.volume,
  }));

  return (
    <Card className="w-full max-w-4xl mx-auto bg-zinc-900/50 border-zinc-800 p-6 text-white">
      {/* Image Carousel */}
      <div className="relative mb-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() =>
              setImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
            }
            className="text-orange-500 hover:text-orange-400">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <div className="flex gap-4">
            {images.map((image, idx) => (
              <div
                key={image}
                className={`px-4 py-2 rounded-full border ${
                  idx === imageIndex
                    ? "border-orange-500 text-orange-500 bg-orange-500/10"
                    : "border-zinc-700 text-zinc-400"
                }`}>
                {image}
              </div>
            ))}
          </div>
          <button
            onClick={() =>
              setImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
            }
            className="text-orange-500 hover:text-orange-400">
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Video Carousel */}
      <div className="relative mb-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() =>
              setVideoIndex((prev) => (prev > 0 ? prev - 1 : videos.length - 1))
            }
            className="text-orange-500 hover:text-orange-400">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <div className="flex gap-4">
            {videos.map((video, idx) => (
              <div
                key={video}
                className={`px-4 py-2 rounded-full border ${
                  idx === videoIndex
                    ? "border-orange-500 text-orange-500 bg-orange-500/10"
                    : "border-zinc-700 text-zinc-400"
                }`}>
                {video}
              </div>
            ))}
          </div>
          <button
            onClick={() =>
              setVideoIndex((prev) => (prev < videos.length - 1 ? prev + 1 : 0))
            }
            className="text-orange-500 hover:text-orange-400">
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Market Updates Title */}
      <div className="flex items-center gap-2 mb-6">
        <div className="h-0.5 w-2 bg-orange-500" />
        <span className="text-orange-500">{section.title} Market Updates</span>
      </div>

      {/* Market Data Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {takerData.map((item) => (
          <div
            key={item.title}
            className="p-4 rounded-lg border border-zinc-800 bg-black/20">
            <h3 className="text-sm text-orange-500 mb-3">{item.title}</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-zinc-400 mb-1">Last</div>
                <div className="text-white">{item.last}</div>
              </div>
              <div>
                <div className="text-zinc-400 mb-1">Change</div>
                <div
                  className={
                    item.change.includes("+")
                      ? "text-green-500"
                      : "text-red-500"
                  }>
                  {item.change}
                </div>
              </div>
              <div>
                <div className="text-zinc-400 mb-1">Volume</div>
                <div className="text-white">{item.volume}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
