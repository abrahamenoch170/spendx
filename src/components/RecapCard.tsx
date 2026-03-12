import React, { useEffect, useRef } from 'react';

interface RecapCardProps {
  data: {
    day: string;
    spots: number;
    cost: number;
    newPlaces: number;
    homeTime: string;
  };
}

export const RecapCard: React.FC<RecapCardProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set dimensions
    canvas.width = 400;
    canvas.height = 500;

    // Background
    ctx.fillStyle = '#0A0A0A';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Card content
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 30px sans-serif';
    ctx.fillText(data.day, 40, 80);

    ctx.font = '20px sans-serif';
    ctx.fillText(`${data.spots} spots`, 40, 130);
    ctx.fillText(`$${data.cost} each`, 40, 160);
    ctx.fillText(`${data.newPlaces} new places`, 40, 190);
    ctx.fillText(`Home by ${data.homeTime}`, 40, 220);

    // Brand accent
    ctx.fillStyle = '#CCFF00';
    ctx.fillRect(0, 480, canvas.width, 20);
  }, [data]);

  return <canvas ref={canvasRef} className="rounded-2xl shadow-lg" />;
};
