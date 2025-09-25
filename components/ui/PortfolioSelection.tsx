"use client";
import React from "react";
import Image from "next/image";

interface PortfolioSelectionProps {
  onSelect: (selection: "3d" | "boxes") => void;
}

const PortfolioSelection: React.FC<PortfolioSelectionProps> = ({
  onSelect,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <h1 className="text-4xl text-white mb-8 text-center">Choose Your Portfolio Experience</h1>
      <div className="flex space-x-8">
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => onSelect("3d")}
        >
          <Image
            src="/3dportfolio.png"
            alt="3D Portfolio"
            width={400}
            height={300}
            className="rounded-lg"
          />
          <h2 className="text-2xl text-white mt-4">3D Portfolio</h2>
        </div>
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => onSelect("boxes")}
        >
          <Image
            src="/boxesportfolio.png"
            alt="Boxes Portfolio"
            width={400}
            height={300}
            className="rounded-lg"
          />
          <h2 className="text-2xl text-white mt-4">Boxes Portfolio</h2>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSelection;
