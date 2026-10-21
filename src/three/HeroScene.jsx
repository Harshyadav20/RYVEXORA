import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { damp, smoothstep } from '../lib/utils.js';
import { sceneState, setPointer } from './sceneState.js';

/* ------------------------------------------------------------------ */
/* Camera                                                              */
/* ------------------------------------------------------------------ */
function CameraRig() {
  const { camera, size } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 6.6));

  useFrame((_, delta) => {
    const aspect = size.width / Math.max(1, size.height);
    const progress = sceneState.progress;
    const baseZ = aspect < 1.5 ? 7.9 : 6.7;

    target.current.set(
      sceneState.pointerX * 0.16,
      sceneState.pointerY * 0.12 + 0.1,
      baseZ - progress * 0.55,
    );

    camera.position.x = damp(camera.position.x, target.current.x, 2.4, delta);
    camera.position.y = damp(camera.position.y, target.current.y, 2.4, delta);
    camera.position.z = damp(camera.position.z, target.current.z, 2.2, delta);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ------------------------------------------------------------------ */
/* Main object                                                         */
/* ------------------------------------------------------------------ */
const SHARD_COUNT = 14;
const NODE_COUNT = 30;

function NetworkObject({ quality }) {
  const group = useRef(null);
  const shardGroup = useRef(null);
  const nodeGroup = useRef(null);
  const shellRef = useRef(null);
  const coreRef = useRef(null);
  const coreLight = useRef(null);
  const linkRef = useRef(null);
  const ringA = useRef(null);
  const ringB = useRef(null);
  const shardRefs = useRef([]);
  const nodeRefs = useRef([]);

  const shards = useMemo(
    () =>
      Array.from({ length: SHARD_COUNT }, (_, index) => {
        const phi = Math.acos(1 - (2 * (index + 0.5)) / SHARD_COUNT);
        const theta = Math.PI * (1 + Math.sqrt(5)) * index;
        const dir = new THREE.Vector3(
          Math.cos(theta) * Math.sin(phi),
          Math.cos(phi),
          Math.sin(theta) * Math.sin(phi),
        ).normalize();

        return {
          dir,
          size: 0.75 + Math.random() * 0.55,
          spin: 0.3 + Math.random() * 0.6,
          rotation: new THREE.Vector3(Math.random() * Math.PI, Math.random() * Math.PI, 0),
        };
      }),
    [],
  );

  const nodePositions = useMemo(() => {
    const points = [];
    const offset = 2 / NODE_COUNT;
    const increment = Math.PI * (3 - Math.sqrt(5));
    for (let index = 0; index < NODE_COUNT; index += 1) {
      const y = index * offset - 1 + offset / 2;
      const radius = Math.sqrt(Math.max(0, 1 - y * y));
      const phi = index * increment;
      points.push(
        new THREE.Vector3(
          Math.cos(phi) * radius * 2.25,
          y * 2.25,
          Math.sin(phi) * radius * 2.25,
        ),
      );
    }
    return points;
  }, []);

  const linkGeometry = useMemo(() => {
    const vertices = [];
    for (let i = 0; i < nodePositions.length; i += 1) {
      for (let j = i + 1; j < nodePositions.length; j += 1) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < 1.35) {
          vertices.push(...nodePositions[i].toArray(), ...nodePositions[j].toArray());
        }
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    return geometry;
  }, [nodePositions]);

  useEffect(() => () => linkGeometry.dispose(), [linkGeometry]);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    const progress = sceneState.progress;
    const open = smoothstep(0.16, 0.56, progress);
    const network = smoothstep(0.34, 0.68, progress);
    const growth = smoothstep(0.72, 1, progress);

    if (!group.current) return;

    // Position: right on wide screens, above the copy on narrow ones.
    const aspect = state.size.width / Math.max(1, state.size.height);
    const isPortrait = aspect < 1.45;
    const targetX = isPortrait ? 0.55 : 1.55;
    const targetY = isPortrait ? 0.75 : 0.12 + Math.sin(time * 0.34) * 0.05;
    const targetScale = (isPortrait ? 0.8 : 1) * (1 + growth * 0.12);

    group.current.position.x = damp(group.current.position.x, targetX, 1.8, delta);
    group.current.position.y = damp(group.current.position.y, targetY, 1.8, delta);
    group.current.rotation.y += delta * (0.1 + (1 - progress) * 0.05);
    group.current.rotation.x = damp(
      group.current.rotation.x,
      sceneState.pointerY * -0.16 + progress * 0.16,
      2,
      delta,
    );
    group.current.rotation.z = damp(
      group.current.rotation.z,
      sceneState.pointerX * 0.06,
      2,
      delta,
    );
    const currentScale = group.current.scale.x;
    const nextScale = damp(currentScale, targetScale, 1.6, delta);
    group.current.scale.setScalar(nextScale);

    // Chrome sphere recedes as the structure opens.
    if (shellRef.current) {
      const shellScale = 1 - open * 0.42;
      shellRef.current.scale.setScalar(shellScale);
      shellRef.current.rotation.y = -time * 0.06;
    }

    if (coreRef.current) {
      coreRef.current.scale.setScalar(0.62 + open * 0.2 + Math.sin(time * 1.4) * 0.012);
      coreRef.current.material.opacity = 0.25 + open * 0.75;
    }

    if (coreLight.current) {
      coreLight.current.intensity = 8 + open * 34;
    }

    // Faceted shards orbit and expand outward.
    shardRefs.current.forEach((mesh, index) => {
      if (!mesh) return;
      const shard = shards[index];
      const radius = 1.24 + open * 0.95 + Math.sin(time * 0.6 + index) * 0.02;
      mesh.position.copy(shard.dir).multiplyScalar(radius);
      mesh.rotation.x = shard.rotation.x + time * 0.16 * shard.spin;
      mesh.rotation.y = shard.rotation.y + time * 0.12 * shard.spin;
      mesh.scale.setScalar(shard.size * (1 - open * 0.34));
    });

    if (nodeGroup.current) {
      nodeGroup.current.visible = network > 0.01;
      nodeGroup.current.rotation.y = time * 0.12 + sceneState.pointerX * 0.25;
      nodeGroup.current.rotation.x = Math.sin(time * 0.22) * 0.12 + sceneState.pointerY * -0.12;
      const scale = 0.82 + network * 0.3;
      nodeGroup.current.scale.setScalar(scale);
    }

    nodeRefs.current.forEach((node, index) => {
      if (!node) return;
      const pulse = 0.75 + Math.sin(time * 1.8 + index * 0.7) * 0.25;
      node.scale.setScalar((0.6 + network * 0.6) * pulse);
    });

    if (linkRef.current) {
      linkRef.current.material.opacity = smoothstep(0.42, 0.72, progress) * 0.5;
    }

    if (ringA.current) {
      ringA.current.rotation.z = time * 0.1;
      ringA.current.rotation.x = Math.PI / 2.6 + Math.sin(time * 0.2) * 0.06;
      ringA.current.material.opacity = 0.28 + progress * 0.35;
    }

    if (ringB.current) {
      ringB.current.rotation.z = -time * 0.07;
      ringB.current.rotation.x = Math.PI / 1.9;
      ringB.current.rotation.y = time * 0.05;
      ringB.current.material.opacity = 0.16 + progress * 0.28;
    }

    if (shardGroup.current) {
      shardGroup.current.rotation.y = sceneState.pointerX * 0.22;
      shardGroup.current.rotation.x = sceneState.pointerY * -0.14;
    }
  });

  return (
    <group ref={group} position={[1.55, 0.12, 0]}>
      <group ref={shardGroup}>
        <mesh ref={shellRef}>
          <sphereGeometry args={[0.96, quality === 'high' ? 64 : 40, quality === 'high' ? 64 : 40]} />
          <meshPhysicalMaterial
            color="#dbe4f2"
            metalness={1}
            roughness={0.16}
            clearcoat={1}
            clearcoatRoughness={0.22}
            envMapIntensity={1.7}
          />
        </mesh>

        <mesh ref={coreRef}>
          <icosahedronGeometry args={[0.78, 1]} />
          <meshBasicMaterial
            color="#4f8bff"
            transparent
            opacity={0.25}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        <pointLight ref={coreLight} color="#36d9ff" intensity={8} distance={9} decay={2} />

        {shards.map((shard, index) => (
          <mesh
            key={index}
            ref={(element) => {
              shardRefs.current[index] = element;
            }}
            rotation={[shard.rotation.x, shard.rotation.y, 0]}
          >
            <icosahedronGeometry args={[0.34, 0]} />
            <meshPhysicalMaterial
              color={index % 3 === 0 ? '#c9d6ea' : '#aebdd2'}
              metalness={1}
              roughness={index % 3 === 0 ? 0.18 : 0.3}
              flatShading
              envMapIntensity={1.5}
            />
          </mesh>
        ))}
      </group>

      <mesh ref={ringA} rotation={[Math.PI / 2.6, 0, 0]}>
        <torusGeometry args={[1.72, 0.007, 8, 160]} />
        <meshBasicMaterial color="#36d9ff" transparent opacity={0.3} />
      </mesh>

      <mesh ref={ringB} rotation={[Math.PI / 1.9, 0, 0]}>
        <torusGeometry args={[2.16, 0.004, 8, 160]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.2} />
      </mesh>

      <group ref={nodeGroup} visible={false}>
        {nodePositions.map((position, index) => (
          <mesh
            key={index}
            position={position}
            ref={(element) => {
              nodeRefs.current[index] = element;
            }}
          >
            <sphereGeometry args={[0.032, 10, 10]} />
            <meshBasicMaterial
              color={index % 4 === 0 ? '#a78bfa' : '#7deaff'}
              toneMapped={false}
            />
          </mesh>
        ))}

        <lineSegments ref={linkRef} geometry={linkGeometry}>
          <lineBasicMaterial
            color="#3b82f6"
            transparent
            opacity={0}
            depthWrite={false}
          />
        </lineSegments>
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Ambient dust                                                        */
/* ------------------------------------------------------------------ */
function AmbientDust({ count }) {
  const points = useRef(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      const radius = 3 + Math.random() * 6.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[index * 3 + 1] = radius * Math.cos(phi) * 0.7;
      positions[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
    }
    const buffer = new THREE.BufferGeometry();
    buffer.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return buffer;
  }, [count]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.014;
    points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.06) * 0.05;
    points.current.material.opacity = 0.42 + Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        size={0.026}
        sizeAttenuation
        color="#8fd8ff"
        transparent
        opacity={0.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/* Scene wrapper                                                       */
/* ------------------------------------------------------------------ */
export default function HeroScene({ quality = 'high' }) {
  const hostRef = useRef(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const onMove = (event) => {
      setPointer(
        (event.clientX / window.innerWidth) * 2 - 1,
        -((event.clientY / window.innerHeight) * 2 - 1),
      );
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: '120px' },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={hostRef} style={{ position: 'absolute', inset: 0 }}>
      <Canvas
        dpr={quality === 'high' ? [1, 1.65] : [1, 1.2]}
        frameloop={active ? 'always' : 'demand'}
        camera={{ position: [0, 0.1, 6.7], fov: 38, near: 0.1, far: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.setClearAlpha(0);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
        }}
      >
        <Suspense fallback={null}>
          <fog attach="fog" args={['#07090d', 10, 26]} />
          <ambientLight intensity={0.4} />
          <directionalLight position={[4, 6, 5]} intensity={2.8} color="#e7efff" />
          <pointLight position={[3.4, 1.4, 2.8]} intensity={26} distance={14} decay={2} color="#36d9ff" />
          <pointLight position={[-3.6, -2, -1.5]} intensity={22} distance={14} decay={2} color="#8b5cf6" />
          <spotLight position={[0, 5, -4]} angle={0.7} penumbra={1} intensity={20} color="#246bfd" />

          <Environment resolution={quality === 'high' ? 192 : 96} frames={1}>
            <Lightformer form="rect" intensity={5} position={[0, 3.5, -6]} scale={[12, 7, 1]} color="#5b8cff" />
            <Lightformer form="circle" intensity={8} position={[5, 1, 4]} scale={3.4} color="#ffffff" />
            <Lightformer form="circle" intensity={9} position={[-4.5, 1.5, 2]} scale={3} color="#36d9ff" />
            <Lightformer form="rect" intensity={5} position={[0, -3.5, 2]} scale={[9, 4, 1]} color="#8b5cf6" />
            <Lightformer form="rect" intensity={3} position={[0, 2, 6]} scale={[8, 5, 1]} color="#ffffff" />
          </Environment>

          <NetworkObject quality={quality} />
          <AmbientDust count={quality === 'high' ? 650 : 320} />
          <CameraRig />
        </Suspense>

        {quality === 'high' && (
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={0.9}
              luminanceThreshold={0.35}
              luminanceSmoothing={0.32}
              mipmapBlur
              radius={0.72}
            />
            {/* Shallow, camera-locked focus: the far dust softens while the
                object stays sharp. Kept low-cost and high-quality only. */}
            <DepthOfField
              focusDistance={0.11}
              focalLength={0.045}
              bokehScale={1.35}
              height={480}
            />
            <Vignette offset={0.22} darkness={0.72} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}
