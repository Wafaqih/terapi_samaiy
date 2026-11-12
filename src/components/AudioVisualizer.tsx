import React, { useEffect, useRef } from 'react';
import { audioEngine } from '../utils/audioEngine';

interface AudioVisualizerProps {
  isPlaying: boolean;
  barCount?: number;
  height?: number;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  isPlaying,
  barCount = 18,
  height = 28
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const analyser = audioEngine.getAnalyser();
    const dataArray = analyser ? new Uint8Array(analyser.frequencyBinCount) : new Uint8Array(32);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (analyser && isPlaying) {
        analyser.getByteFrequencyData(dataArray);
      }

      const totalWidth = canvas.width;
      const barWidth = (totalWidth / barCount) - 2;

      for (let i = 0; i < barCount; i++) {
        let value = 0;
        if (isPlaying) {
          if (analyser) {
            const index = Math.floor((i / barCount) * (dataArray.length / 2));
            value = (dataArray[index] / 255) * canvas.height;
          } else {
            value = Math.sin(Date.now() * 0.008 + i * 0.5) * 8 + 12;
          }
        } else {
          // Idling subtle wave
          value = Math.sin(Date.now() * 0.003 + i * 0.3) * 2 + 3;
        }

        const barHeight = Math.max(3, Math.min(canvas.height, value));
        const x = i * (barWidth + 2);
        const y = canvas.height - barHeight;

        // Spotify Green gradient
        const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
        gradient.addColorStop(0, '#1DB954');
        gradient.addColorStop(1, '#1ed760');

        ctx.fillStyle = isPlaying ? gradient : 'rgba(255, 255, 255, 0.2)';
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isPlaying, barCount, height]);

  return (
    <canvas
      ref={canvasRef}
      width={barCount * 6}
      height={height}
      className="inline-block"
      style={{ width: `${barCount * 5}px`, height: `${height}px` }}
    />
  );
};
