import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { smoothstep } from '../lib/utils.js';

const COUNT = 1500;

function ParticleKnot() {
  const pointsRef = useRef(null);
  const progress = useRef(0);

  const data = useMemo(() => {
    const knot = new THREE.TorusKnotGeometry(1.15, 0.36, 220, 26, 2, 3);
    const source = knot.attributes.position;

    const starts = new Float32Array(COUNT * 3);
    const targets = new Float32Array(COUNT * 3);
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);

    const cyan = new THREE.Color('#36d9ff');
    const blue = new THREE.Color('#246bfd');
    const violet = new THREE.Color('#8b5cf6');
    const pale = new THREE.Color('#dcecff');

    for (let index = 0; index < COUNT; index += 1) {
      const vertex = Math.floor(Math.random() * source.count);
      const tx = source.getX(vertex) * 1.05;
      const ty = source.getY(vertex) * 1.05;
      const tz = source.getZ(vertex) * 1.05;
      targets[index * 3] = tx;
      targets[index * 3 + 1] = ty;
      targets[index * 3 + 2] = tz;

      const radius = 2.6 + Math.random() * 3.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starts[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starts[index * 3 + 1] = radius * Math.cos(phi);
      starts[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      positions[index * 3] = starts[index * 3];
      positions[index * 3 + 1] = starts[index * 3 + 1];
      positions[index * 3 + 2] = starts[index * 3 + 2];

      const pick = Math.random();
      const color = pick < 0.45 ? cyan : pick < 0.75 ? blue : pick < 0.93 ? violet : pale;
      colors[index * 3] = color.r;
      colors[index * 3 + 1] = color.g;
      colors[index * 3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    knot.dispose();

    return { geometry, starts, targets };
  }, []);

  useEffect(() => () => data.geometry.dispose(), [data]);

  useFrame((state, delta) => {
    const points = pointsRef.current;
    if (!points) return;

    progress.current = Math.min(1, progress.current + delta * 0.32);
    const assembled = smoothstep(0, 1, progress.current);
    const positions = points.geometry.attributes.position.array;
    const { starts, targets } = data;

    const swirl = 1 - assembled;

    for (let index = 0; index < COUNT; index += 1) {
      const offset = index * 3;
      const radial = 1 - swirl * 0.65;
      positions[offset] = starts[offset] * radial + (targets[offset] - starts[offset] * radial) * assembled;
      positions[offset + 1] = starts[offset + 1] * radial + (targets[offset + 1] - starts[offset + 1] * radial) * assembled;
      positions[offset + 2] = starts[offset + 2] * radial + (targets[offset + 2] - starts[offset + 2] * radial) * assembled;
    }

    points.geometry.attributes.position.needsUpdate = true;
    points.rotation.y += delta * 0.16;
    points.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.14;
    points.material.opacity = 0.35 + assembled * 0.55;
  });

  return (
    <points ref={pointsRef} geometry={data.geometry} position={[-1.35, 0, 0]} scale={1.15}>
      <pointsMaterial
        size={0.028}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.4}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ContactScene() {
  return (
    <Canvas
      dpr={[1, 1.4]}
      camera={{ position: [0, 0, 5], fov: 46 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => gl.setClearAlpha(0)}
    >
      <ParticleKnot />
    </Canvas>
  );
}
