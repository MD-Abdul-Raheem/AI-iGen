
import React, { useEffect, useRef, useState } from 'react';

export const SearchIcon = () => (
  <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
  </svg>
);

export const RocketIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 3H12H4.5C3.67 3 3 3.67 3 4.5V19.5C3 20.33 3.67 21 4.5 21H12M13.5 3L19.5 9M13.5 3V9H19.5M13.5 14.25L15.75 16.5L13.5 18.75M17.25 14.25L19.5 16.5L17.25 18.75" />
    </svg>
);

export const HeartIcon = () => (
    <svg className="w-6 h-6 text-slate-500 hover:text-pink-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"></path>
    </svg>
);

export const SolidHeartIcon = () => (
    <svg className="w-6 h-6 text-pink-500 hover:text-pink-600 transition-colors" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
    </svg>
);

export const PlusIcon = () => (
    <svg className="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
    </svg>
);

export const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m1-12a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1h-6a1 1 0 01-1-1V6zM17 3a1 1 0 011-1h.01a1 1 0 110 2H18a1 1 0 01-1-1zm-2.293 8.293a1 1 0 011.414 0l2 2a1 1 0 01-1.414 1.414l-2-2a1 1 0 010-1.414zM17 17a1 1 0 011-1h.01a1 1 0 110 2H18a1 1 0 01-1-1z" />
    </svg>
);

export const InfinityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.804 13.354c1.428-1.224 1.428-3.484 0-4.708-1.428-1.224-3.688-1.224-5.116 0L12 10.116l-1.688-1.47C8.884 7.422 6.624 7.422 5.196 8.646c-1.428 1.224-1.428 3.484 0 4.708 1.428 1.224 3.688 1.224 5.116 0L12 11.884l1.688 1.47c1.428 1.224 3.688 1.224 5.116 0z" />
  </svg>
);

export const DownloadIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
  </svg>
);

export const MorphingPolygonIcon = () => {
  const [pointsStr, setPointsStr] = useState("");
  const requestRef = useRef<number>(0);

  // SVG Configuration
  const CENTER_X = 152;
  const CENTER_Y = 56;
  const R2 = 56; // Outer radius fixed
  const FIXED_POINT_COUNT = 128; // Sample density for smooth morphing
  const DURATION = 1500; // ms

  // Helper: Get points for a shape defined by {numVertices, r1}
  // This resamples the "ideal" polygon into FIXED_POINT_COUNT points to allow smooth morphing
  // between shapes with different vertex counts (e.g., 4-star to 60-star).
  const getPolygonPoints = (numVertices: number, r1: number) => {
    // 1. Define the key vertices of the geometric shape
    const keyVertices = [];
    for (let i = 0; i < numVertices; i++) {
        // According to user example: isOdd(i) ? r1 : r2
        const r = (i % 2 !== 0) ? r1 : R2;
        const a = (2 * Math.PI * i / numVertices) - Math.PI / 2;
        keyVertices.push({
            x: CENTER_X + r * Math.cos(a),
            y: CENTER_Y + r * Math.sin(a)
        });
    }
    // Close the loop
    keyVertices.push(keyVertices[0]);

    // 2. Resample keyVertices to FIXED_POINT_COUNT
    const sampledPoints = [];
    for (let i = 0; i < FIXED_POINT_COUNT; i++) {
        // t is normalized 0..1 position along the entire perimeter
        const t = i / FIXED_POINT_COUNT;
        
        // Map t to a specific segment index in keyVertices
        const projectedIdx = t * numVertices;
        const idx = Math.floor(projectedIdx);
        const remainder = projectedIdx - idx;

        const p1 = keyVertices[idx];
        const p2 = keyVertices[idx + 1] || keyVertices[0];

        // Linear interpolation between vertices
        sampledPoints.push({
            x: p1.x + (p2.x - p1.x) * remainder,
            y: p1.y + (p2.y - p1.y) * remainder
        });
    }
    return sampledPoints;
  };

  const generateShapeParams = () => {
      // Random even number between 4 and 64
      const min = 4;
      const max = 64;
      let total = Math.floor(Math.random() * (max - min + 1)) + min;
      if (total % 2 !== 0) total += 1;
      
      // r1 random between 4 and 56
      const r1 = Math.floor(Math.random() * (56 - 4 + 1)) + 4;
      
      return { numVertices: total, r1 };
  };

  // State initialization
  // Initial shape: 8 points, r1 approx 25.45 to match the SVG star
  const initialParams = { numVertices: 8, r1: 25.45 };
  
  const prevPointsRef = useRef(getPolygonPoints(initialParams.numVertices, initialParams.r1));
  const targetPointsRef = useRef(getPolygonPoints(initialParams.numVertices, initialParams.r1));
  
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    // Start animation loop
    // Generate first new target
    const params = generateShapeParams();
    targetPointsRef.current = getPolygonPoints(params.numVertices, params.r1);
    startTimeRef.current = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTimeRef.current;
      const progress = Math.min(elapsed / DURATION, 1);
      
      // Easing: inOutCirc approximation (or similar easing)
      // Custom easing for cool "breathing" effect
      const ease = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      const currentPoints = prevPointsRef.current.map((p, i) => {
          const tp = targetPointsRef.current[i];
          return {
              x: p.x + (tp.x - p.x) * ease,
              y: p.y + (tp.y - p.y) * ease
          };
      });

      const str = currentPoints.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
      setPointsStr(str);

      if (progress >= 1) {
        // Cycle updates
        prevPointsRef.current = targetPointsRef.current;
        const newParams = generateShapeParams();
        targetPointsRef.current = getPolygonPoints(newParams.numVertices, newParams.r1);
        startTimeRef.current = time;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-full">
        <svg viewBox="0 0 304 112" className="w-full h-full text-sky-400">
            <g strokeWidth="2" stroke="currentColor" strokeLinejoin="round" fill="none" fillRule="evenodd">
                <polygon 
                    id="path-1" 
                    points={pointsStr}
                />
            </g>
        </svg>
    </div>
  );
};
