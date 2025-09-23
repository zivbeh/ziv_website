"use client";

import { useMemo } from "react";

const Heatmap = () => {
  const data = useMemo(() => {
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        x: Math.random(),
        y: Math.random(),
        value: Math.random(),
      });
    }
    return data;
  }, []);

  return (
    <div className="w-full max-w-lg h-64 bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-bold text-white mb-2">Heatmap Demo</h3>
      <div className="relative w-full h-full">
        {data.map((d, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${d.x * 100}%`,
              top: `${d.y * 100}%`,
              width: `${d.value * 20 + 5}px`,
              height: `${d.value * 20 + 5}px`,
              background: `rgba(255, 0, 0, ${d.value})`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

const Clustering = () => {
  const data = useMemo(() => {
    const data = [];
    for (let i = 0; i < 50; i++) {
      data.push({
        x: Math.random(),
        y: Math.random(),
        cluster: Math.floor(Math.random() * 3),
      });
    }
    return data;
  }, []);

  const colors = ["#ff0000", "#00ff00", "#0000ff"];

  return (
    <div className="w-full max-w-lg h-64 bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-bold text-white mb-2">Clustering Demo</h3>
      <div className="relative w-full h-full">
        {data.map((d, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${d.x * 100}%`,
              top: `${d.y * 100}%`,
              width: "10px",
              height: "10px",
              background: colors[d.cluster],
            }}
          />
        ))}
      </div>
    </div>
  );
};

export const Demo = ({ demo }: { demo: "heatmap" | "clustering" }) => {
  if (demo === "heatmap") {
    return <Heatmap />;
  }

  if (demo === "clustering") {
    return <Clustering />;
  }

  return null;
};
