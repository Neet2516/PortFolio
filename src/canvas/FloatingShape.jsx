// src/canvas/ParticleField.jsx
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import gsap from "gsap";

function ParticleCloud() {
  const pointsRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  const count = 2000;

  // ✅ Generate random positions ONCE (pure render)
  const positionsRef = useRef(null);
  if (!positionsRef.current) {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 6;
    }
    positionsRef.current = arr;
  }

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Idle rotation
  useEffect(() => {
    gsap.to(pointsRef.current.rotation, {
      y: "+=6.28",
      duration: 40,
      repeat: -1,
      ease: "none",
    });
  }, []);

  useFrame(() => {
    pointsRef.current.rotation.x += mouse.current.y * 0.002;
    pointsRef.current.rotation.z += mouse.current.x * 0.002;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positionsRef.current}
          count={positionsRef.current.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.015}
        opacity={0.35}
        transparent
        depthWrite={false}
      />
    </points>
  );
}

export default function ParticleField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      className="absolute inset-0"
    >
      <ParticleCloud />
    </Canvas>
  );
}
