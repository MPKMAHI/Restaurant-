import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { DISHES_DATABASE } from '../data/culinaryData';
import { Dish } from '../types';
import {
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Minimize2,
  Camera,
  Volume2,
  VolumeX,
  Sparkles,
  Flame,
  Layers,
  Eye,
  Sliders,
  ChevronRight,
  Info,
  Compass,
  Download,
  Check
} from 'lucide-react';

interface ThreeFoodStudioProps {
  initialDishId?: string;
  onOpenReservation?: () => void;
  onExploreAnthology?: (dishId: string) => void;
  isModal?: boolean;
  onCloseModal?: () => void;
}

type CameraPreset = 'hero-orbit' | 'macro-low' | 'overhead' | 'cinematic-sweep';
type LightingTheme = 'obsidian' | 'candlelight' | 'studio' | 'gold-hour';

export const ThreeFoodStudio: React.FC<ThreeFoodStudioProps> = ({
  initialDishId = 'biryani-safran',
  onOpenReservation,
  onExploreAnthology,
  isModal = false,
  onCloseModal,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedDishId, setSelectedDishId] = useState<string>(initialDishId);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [rotationSpeed, setRotationSpeed] = useState<number>(1);
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('hero-orbit');
  const [lightingTheme, setLightingTheme] = useState<LightingTheme>('obsidian');
  const [elevation, setElevation] = useState<number>(25); // degrees
  const [zoomDistance, setZoomDistance] = useState<number>(8.5);
  const [showParticles, setShowParticles] = useState<boolean>(true);
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [capturedNotice, setCapturedNotice] = useState<boolean>(false);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(0);
  const [showControlsDrawer, setShowControlsDrawer] = useState<boolean>(true);
  const [webGlSupported, setWebGlSupported] = useState<boolean>(true);

  const selectedDish: Dish =
    DISHES_DATABASE.find((d) => d.id === selectedDishId) || DISHES_DATABASE[0];

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const foodGroupRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const keyLightRef = useRef<THREE.SpotLight | null>(null);
  const rimLightRef = useRef<THREE.SpotLight | null>(null);
  const fillLightRef = useRef<THREE.AmbientLight | null>(null);
  const emberLightRef = useRef<THREE.PointLight | null>(null);

  // Orbit state
  const orbitState = useRef({
    azimuth: 0,
    elevation: 25,
    distance: 8.5,
    isDragging: false,
    prevMouseX: 0,
    prevMouseY: 0,
    targetAzimuth: 0,
    targetElevation: 25,
    targetDistance: 8.5,
  });

  // Audio synthesizer state
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioGainRef = useRef<GainNode | null>(null);

  // Track video timeline loop (0 to 12s per full 360 revolution)
  useEffect(() => {
    let animId: number;
    const interval = setInterval(() => {
      if (isPlaying) {
        setCurrentTimeSec((prev) => {
          const next = prev + 0.1 * rotationSpeed;
          return next >= 12 ? 0 : next;
        });
      }
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying, rotationSpeed]);

  // Audio Synthesizer (Simulates gentle hearth embers & kitchen sizzle)
  useEffect(() => {
    if (isAudioActive) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        // Create pink/brown noise for hearth crackle
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          output[i] = (b0 + b1 + b2) * 0.08;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        // Bandpass filter for low soothing wood crackle
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 650;

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.04, ctx.currentTime);
        audioGainRef.current = gainNode;

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        whiteNoise.start();
      } catch {
        // AudioContext disabled or restricted
      }
    } else {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
    }

    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
    };
  }, [isAudioActive]);

  // Setup Three.js Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;

    try {
      const width = container.clientWidth || 800;
      const height = container.clientHeight || 500;

      // 1. Scene
      scene = new THREE.Scene();
      sceneRef.current = scene;
      scene.background = new THREE.Color(0x0e0d0c);
      scene.fog = new THREE.FogExp2(0x0e0d0c, 0.045);

      // 2. Camera
      camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
      cameraRef.current = camera;

      // 3. Renderer
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      rendererRef.current = renderer;

      container.innerHTML = '';
      container.appendChild(renderer.domElement);
    } catch (err) {
      console.warn('WebGL is not available in this environment, using luxury visual preview:', err);
      setWebGlSupported(false);
      return;
    }

    // 4. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xfff3e0, 0.45);
    scene.add(ambientLight);
    fillLightRef.current = ambientLight;

    // Hearth Key Light (Warm golden spotlight from top-right)
    const keyLight = new THREE.SpotLight(0xffd5a0, 3.2);
    keyLight.position.set(6, 10, 6);
    keyLight.angle = Math.PI / 4.5;
    keyLight.penumbra = 0.85;
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);
    keyLightRef.current = keyLight;

    // Cold Rim Light (Back left accent)
    const rimLight = new THREE.SpotLight(0xcce2ff, 2.4);
    rimLight.position.set(-7, 6, -6);
    rimLight.angle = Math.PI / 4;
    rimLight.penumbra = 0.9;
    scene.add(rimLight);
    rimLightRef.current = rimLight;

    // Ember point light under dish
    const emberLight = new THREE.PointLight(0xff6b35, 1.8, 8);
    emberLight.position.set(0, -0.4, 0);
    scene.add(emberLight);
    emberLightRef.current = emberLight;

    // 5. Studio Stage Table
    const tableGeo = new THREE.CylinderGeometry(6, 6.5, 0.5, 64);
    const tableMat = new THREE.MeshStandardMaterial({
      color: 0x161514,
      roughness: 0.65,
      metalness: 0.2,
    });
    const tableMesh = new THREE.Mesh(tableGeo, tableMat);
    tableMesh.position.y = -0.55;
    tableMesh.receiveShadow = true;
    scene.add(tableMesh);

    // Decorative brass trim ring on table
    const trimGeo = new THREE.TorusGeometry(5.95, 0.04, 16, 64);
    const trimMat = new THREE.MeshStandardMaterial({
      color: 0xc18a65,
      roughness: 0.35,
      metalness: 0.85,
    });
    const trimMesh = new THREE.Mesh(trimGeo, trimMat);
    trimMesh.rotation.x = Math.PI / 2;
    trimMesh.position.y = -0.3;
    scene.add(trimMesh);

    // 6. Food Group
    const foodGroup = new THREE.Group();
    foodGroupRef.current = foodGroup;
    scene.add(foodGroup);

    // 7. Particles (Rising steam & micro embers)
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 2.2;
      particlePositions[i * 3 + 1] = Math.random() * 2.6;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 2.2;
      particleScales[i] = Math.random() * 0.08 + 0.02;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('scale', new THREE.BufferAttribute(particleScales, 1));

    // Particle Material
    const canvasParticle = document.createElement('canvas');
    canvasParticle.width = 32;
    canvasParticle.height = 32;
    const pCtx = canvasParticle.getContext('2d');
    if (pCtx) {
      const grad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 220, 180, 0.8)');
      grad.addColorStop(0.4, 'rgba(255, 170, 100, 0.3)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(canvasParticle);

    const particleMat = new THREE.PointsMaterial({
      size: 0.22,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0xffa055,
      opacity: 0.75,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    particles.position.y = 0.3;
    scene.add(particles);
    particlesRef.current = particles;

    // Build Initial Dish 3D Geometry
    rebuildDishGeometry(selectedDishId, foodGroup);

    // Animation Loop
    let lastTime = performance.now();
    let isSubscribed = true;

    const animate = (time: number) => {
      if (!isSubscribed) return;
      requestAnimationFrame(animate);

      const delta = (time - lastTime) / 1000;
      lastTime = time;

      // Handle 360 Orbit rotation
      if (isPlaying && !orbitState.current.isDragging) {
        orbitState.current.targetAzimuth += 0.35 * rotationSpeed * delta;
      }

      // Smooth damping interpolation for camera angles
      orbitState.current.azimuth += (orbitState.current.targetAzimuth - orbitState.current.azimuth) * 0.09;
      orbitState.current.elevation += (orbitState.current.targetElevation - orbitState.current.elevation) * 0.09;
      orbitState.current.distance += (orbitState.current.targetDistance - orbitState.current.distance) * 0.09;

      // Convert spherical coordinates to 3D camera position
      const radAzimuth = orbitState.current.azimuth;
      const radElevation = THREE.MathUtils.degToRad(orbitState.current.elevation);
      const dist = orbitState.current.distance;

      camera.position.x = dist * Math.cos(radElevation) * Math.sin(radAzimuth);
      camera.position.y = dist * Math.sin(radElevation);
      camera.position.z = dist * Math.cos(radElevation) * Math.cos(radAzimuth);
      camera.lookAt(0, 0.45, 0);

      // Animate steam & embers rising
      if (particlesRef.current && showParticles) {
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          positions[i * 3 + 1] += (0.4 + Math.sin(time * 0.002 + i) * 0.1) * delta;
          positions[i * 3] += Math.sin(time * 0.003 + i) * 0.08 * delta;
          if (positions[i * 3 + 1] > 3.0) {
            positions[i * 3 + 1] = 0.2;
            positions[i * 3] = (Math.random() - 0.5) * 1.8;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 1.8;
          }
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Subtle breath / ember flicker on the dish
      if (emberLightRef.current) {
        emberLightRef.current.intensity = 1.4 + Math.sin(time * 0.005) * 0.4;
      }

      if (renderer) {
        renderer.render(scene, camera);
      }
    };

    requestAnimationFrame(animate);

    // Resize handler
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      const newW = mountRef.current.clientWidth;
      const newH = mountRef.current.clientHeight;
      cameraRef.current.aspect = newW / newH;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      isSubscribed = false;
      window.removeEventListener('resize', handleResize);
      if (renderer) {
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  // Update dish whenever selectedDishId changes
  useEffect(() => {
    if (foodGroupRef.current) {
      rebuildDishGeometry(selectedDishId, foodGroupRef.current);
    }
  }, [selectedDishId]);

  // Update lighting theme
  useEffect(() => {
    if (!keyLightRef.current || !rimLightRef.current || !fillLightRef.current || !sceneRef.current) return;

    switch (lightingTheme) {
      case 'obsidian':
        keyLightRef.current.color.setHex(0xffd5a0);
        keyLightRef.current.intensity = 3.2;
        rimLightRef.current.color.setHex(0xaecbff);
        rimLightRef.current.intensity = 2.4;
        fillLightRef.current.color.setHex(0xfff3e0);
        fillLightRef.current.intensity = 0.45;
        sceneRef.current.background = new THREE.Color(0x0e0d0c);
        break;
      case 'candlelight':
        keyLightRef.current.color.setHex(0xff9e44);
        keyLightRef.current.intensity = 3.8;
        rimLightRef.current.color.setHex(0xffcaa0);
        rimLightRef.current.intensity = 1.5;
        fillLightRef.current.color.setHex(0x552200);
        fillLightRef.current.intensity = 0.35;
        sceneRef.current.background = new THREE.Color(0x120a05);
        break;
      case 'studio':
        keyLightRef.current.color.setHex(0xffffff);
        keyLightRef.current.intensity = 2.8;
        rimLightRef.current.color.setHex(0xe0e8f5);
        rimLightRef.current.intensity = 2.0;
        fillLightRef.current.color.setHex(0xffffff);
        fillLightRef.current.intensity = 0.8;
        sceneRef.current.background = new THREE.Color(0x171717);
        break;
      case 'gold-hour':
        keyLightRef.current.color.setHex(0xffbb33);
        keyLightRef.current.intensity = 4.0;
        rimLightRef.current.color.setHex(0xff6622);
        rimLightRef.current.intensity = 2.2;
        fillLightRef.current.color.setHex(0x774411);
        fillLightRef.current.intensity = 0.5;
        sceneRef.current.background = new THREE.Color(0x1a1208);
        break;
    }
  }, [lightingTheme]);

  // Update camera preset
  useEffect(() => {
    switch (cameraPreset) {
      case 'hero-orbit':
        orbitState.current.targetElevation = 26;
        orbitState.current.targetDistance = 8.5;
        setElevation(26);
        setZoomDistance(8.5);
        break;
      case 'macro-low':
        orbitState.current.targetElevation = 12;
        orbitState.current.targetDistance = 5.2;
        setElevation(12);
        setZoomDistance(5.2);
        break;
      case 'overhead':
        orbitState.current.targetElevation = 78;
        orbitState.current.targetDistance = 7.8;
        setElevation(78);
        setZoomDistance(7.8);
        break;
      case 'cinematic-sweep':
        orbitState.current.targetElevation = 38;
        orbitState.current.targetDistance = 6.4;
        setElevation(38);
        setZoomDistance(6.4);
        break;
    }
  }, [cameraPreset]);

  // Toggle particles visibility
  useEffect(() => {
    if (particlesRef.current) {
      particlesRef.current.visible = showParticles;
    }
  }, [showParticles]);

  // Mouse & Touch Orbit Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    orbitState.current.isDragging = true;
    orbitState.current.prevMouseX = e.clientX;
    orbitState.current.prevMouseY = e.clientY;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!orbitState.current.isDragging) return;
    const deltaX = e.clientX - orbitState.current.prevMouseX;
    const deltaY = e.clientY - orbitState.current.prevMouseY;
    orbitState.current.prevMouseX = e.clientX;
    orbitState.current.prevMouseY = e.clientY;

    orbitState.current.targetAzimuth -= deltaX * 0.008;
    orbitState.current.targetElevation = Math.max(
      5,
      Math.min(85, orbitState.current.targetElevation + deltaY * 0.25)
    );
    setElevation(Math.round(orbitState.current.targetElevation));
  };

  const handleMouseUp = () => {
    orbitState.current.isDragging = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    // Only prevent page scroll if in fullscreen or modal, or user is holding Ctrl/Cmd
    if (isFullscreen || isModal || e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const newDist = Math.max(
        3.8,
        Math.min(14, orbitState.current.targetDistance + e.deltaY * 0.006)
      );
      orbitState.current.targetDistance = newDist;
      setZoomDistance(Number(newDist.toFixed(1)));
    }
  };

  const handleZoomIn = () => {
    const newDist = Math.max(3.8, orbitState.current.targetDistance - 1.2);
    orbitState.current.targetDistance = newDist;
    setZoomDistance(Number(newDist.toFixed(1)));
  };

  const handleZoomOut = () => {
    const newDist = Math.min(14, orbitState.current.targetDistance + 1.2);
    orbitState.current.targetDistance = newDist;
    setZoomDistance(Number(newDist.toFixed(1)));
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      orbitState.current.isDragging = true;
      orbitState.current.prevMouseX = e.touches[0].clientX;
      orbitState.current.prevMouseY = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!orbitState.current.isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - orbitState.current.prevMouseX;
    const deltaY = e.touches[0].clientY - orbitState.current.prevMouseY;
    orbitState.current.prevMouseX = e.touches[0].clientX;
    orbitState.current.prevMouseY = e.touches[0].clientY;

    orbitState.current.targetAzimuth -= deltaX * 0.01;
    orbitState.current.targetElevation = Math.max(
      5,
      Math.min(85, orbitState.current.targetElevation + deltaY * 0.3)
    );
    setElevation(Math.round(orbitState.current.targetElevation));
  };

  const handleTouchEnd = () => {
    orbitState.current.isDragging = false;
  };

  // Capture current 3D canvas snapshot
  const handleCaptureSnapshot = () => {
    if (!rendererRef.current) return;
    const dataUrl = rendererRef.current.domElement.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `ember-oak-360-${selectedDish.id}.png`;
    link.href = dataUrl;
    link.click();

    setCapturedNotice(true);
    setTimeout(() => setCapturedNotice(false), 2400);
  };

  // 3D Procedural Culinary Geometry Builder
  function rebuildDishGeometry(dishId: string, group: THREE.Group) {
    // Clear previous children safely
    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
      if ((obj as THREE.Mesh).geometry) {
        (obj as THREE.Mesh).geometry.dispose();
      }
    }

    // 1. Base Luxury Plate (Textured Obsidian & Auric Rim)
    const plateRadius = 2.4;
    const plateGeo = new THREE.CylinderGeometry(plateRadius, plateRadius * 0.88, 0.22, 64);
    const plateMat = new THREE.MeshStandardMaterial({
      color: 0x181716,
      roughness: 0.45,
      metalness: 0.15,
    });
    const plate = new THREE.Mesh(plateGeo, plateMat);
    plate.position.y = 0.08;
    plate.castShadow = true;
    plate.receiveShadow = true;
    group.add(plate);

    // Inner bowl depression
    const rimGeo = new THREE.TorusGeometry(plateRadius * 0.98, 0.05, 16, 64);
    const goldRimMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // 24K gold foil trim
      metalness: 0.92,
      roughness: 0.22,
    });
    const rim = new THREE.Mesh(rimGeo, goldRimMat);
    rim.rotation.x = Math.PI / 2;
    rim.position.y = 0.2;
    group.add(rim);

    // Build unique dish elements based on dishId
    if (dishId === 'biryani-safran') {
      // Royal Awadh Dum Biryani au Safran
      // 1. Rice Mound (Golden saffron dome)
      const riceGeo = new THREE.SphereGeometry(1.4, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
      const riceMat = new THREE.MeshStandardMaterial({
        color: 0xf5b041, // Saffron yellow
        roughness: 0.85,
        metalness: 0.05,
      });
      const riceMesh = new THREE.Mesh(riceGeo, riceMat);
      riceMesh.position.y = 0.18;
      riceMesh.scale.set(1.1, 0.58, 1.1);
      riceMesh.castShadow = true;
      group.add(riceMesh);

      // 2. Lamb Shank / Meat Cut (Tender charred meat piece)
      const meatGeo = new THREE.DodecahedronGeometry(0.55, 1);
      const meatMat = new THREE.MeshStandardMaterial({
        color: 0x3d1d13, // Rich braised dark lamb
        roughness: 0.5,
        metalness: 0.1,
      });
      const meat = new THREE.Mesh(meatGeo, meatMat);
      meat.position.set(0, 0.72, 0.1);
      meat.scale.set(1.3, 0.8, 0.9);
      meat.castShadow = true;
      group.add(meat);

      // Bone protrusion
      const boneGeo = new THREE.CylinderGeometry(0.08, 0.09, 0.9, 16);
      const boneMat = new THREE.MeshStandardMaterial({
        color: 0xf0ede6,
        roughness: 0.3,
      });
      const bone = new THREE.Mesh(boneGeo, boneMat);
      bone.position.set(0.2, 0.95, -0.15);
      bone.rotation.z = 0.45;
      bone.rotation.x = -0.3;
      group.add(bone);

      // 3. 24K Gold Leaf Flares
      for (let i = 0; i < 9; i++) {
        const goldLeafGeo = new THREE.PlaneGeometry(0.18, 0.15);
        const goldLeafMat = new THREE.MeshStandardMaterial({
          color: 0xffd700,
          metalness: 0.98,
          roughness: 0.15,
          side: THREE.DoubleSide,
        });
        const leaf = new THREE.Mesh(goldLeafGeo, goldLeafMat);
        leaf.position.set(
          (Math.random() - 0.5) * 1.1,
          0.7 + Math.random() * 0.25,
          (Math.random() - 0.5) * 1.1
        );
        leaf.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
        group.add(leaf);
      }

      // 4. Star Anise Pod Garnish
      const starGeo = new THREE.ConeGeometry(0.12, 0.25, 5);
      const spiceMat = new THREE.MeshStandardMaterial({
        color: 0x241209,
        roughness: 0.7,
      });
      const spice = new THREE.Mesh(starGeo, spiceMat);
      spice.position.set(-0.45, 0.75, 0.4);
      spice.rotation.x = Math.PI / 2;
      group.add(spice);

      // Mint leaves
      for (let i = 0; i < 5; i++) {
        const mintGeo = new THREE.SphereGeometry(0.1, 8, 8);
        const mintMat = new THREE.MeshStandardMaterial({
          color: 0x2e7d32,
          roughness: 0.4,
        });
        const mint = new THREE.Mesh(mintGeo, mintMat);
        mint.scale.set(1.2, 0.2, 0.6);
        mint.position.set((Math.random() - 0.5) * 0.9, 0.7 + i * 0.05, (Math.random() - 0.5) * 0.9);
        mint.rotation.y = Math.random() * Math.PI;
        group.add(mint);
      }
    } else if (dishId === 'paneer-tikka') {
      // Charcoal Paneer Tikka aux Fleurs Sauvages
      // Glowing charcoal embers base
      for (let i = 0; i < 7; i++) {
        const emberGeo = new THREE.DodecahedronGeometry(0.25, 0);
        const emberMat = new THREE.MeshStandardMaterial({
          color: 0x22110a,
          emissive: 0xff3b00,
          emissiveIntensity: 0.75,
          roughness: 0.9,
        });
        const ember = new THREE.Mesh(emberGeo, emberMat);
        ember.position.set((Math.random() - 0.5) * 1.6, 0.25, (Math.random() - 0.5) * 1.6);
        ember.scale.set(0.9, 0.5, 0.9);
        group.add(ember);
      }

      // Three thick square paneer blocks with charred grill edges
      const paneerMat = new THREE.MeshStandardMaterial({
        color: 0xffea9f, // Golden spiced exterior
        roughness: 0.55,
      });
      const charMat = new THREE.MeshStandardMaterial({
        color: 0x211710, // Charred grill marks
        roughness: 0.95,
      });

      [-0.65, 0, 0.65].forEach((offsetX, idx) => {
        const blockGeo = new THREE.BoxGeometry(0.58, 0.45, 0.58);
        const block = new THREE.Mesh(blockGeo, paneerMat);
        block.position.set(offsetX, 0.52 + idx * 0.06, 0);
        block.rotation.y = 0.2 * idx;
        block.castShadow = true;
        group.add(block);

        // Blistered grill stripes
        const stripeGeo = new THREE.BoxGeometry(0.6, 0.04, 0.08);
        const stripe = new THREE.Mesh(stripeGeo, charMat);
        stripe.position.set(offsetX, 0.7 + idx * 0.06, 0);
        group.add(stripe);
      });

      // Wild edible purple flower petals
      for (let i = 0; i < 8; i++) {
        const petalGeo = new THREE.CircleGeometry(0.12, 6);
        const petalMat = new THREE.MeshStandardMaterial({
          color: 0x8a2be2, // Viola violet
          side: THREE.DoubleSide,
          roughness: 0.4,
        });
        const petal = new THREE.Mesh(petalGeo, petalMat);
        petal.position.set(
          (Math.random() - 0.5) * 1.5,
          0.72 + Math.random() * 0.15,
          (Math.random() - 0.5) * 1.2
        );
        petal.rotation.x = Math.PI / 3 + Math.random() * 0.3;
        group.add(petal);
      }
    } else if (dishId === 'wagyu-nihari') {
      // Smoked Wagyu Short Rib Nihari
      // Rich dark jus pool
      const jusGeo = new THREE.CylinderGeometry(1.6, 1.4, 0.12, 32);
      const jusMat = new THREE.MeshStandardMaterial({
        color: 0x2b0d06,
        roughness: 0.15,
        metalness: 0.4, // Glossy glaze
      });
      const jus = new THREE.Mesh(jusGeo, jusMat);
      jus.position.y = 0.22;
      group.add(jus);

      // Wagyu Rib slab (caramelized rectangular cut)
      const wagyuGeo = new THREE.BoxGeometry(1.2, 0.65, 0.95);
      const wagyuMat = new THREE.MeshStandardMaterial({
        color: 0x3d170c,
        roughness: 0.6,
        metalness: 0.15,
      });
      const wagyu = new THREE.Mesh(wagyuGeo, wagyuMat);
      wagyu.position.set(0, 0.55, 0);
      wagyu.castShadow = true;
      group.add(wagyu);

      // Bone Marrow Cylinder garnish
      const marrowGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.4, 24);
      const marrowMat = new THREE.MeshStandardMaterial({
        color: 0xe8e2d5,
        roughness: 0.3,
      });
      const marrow = new THREE.Mesh(marrowGeo, marrowMat);
      marrow.position.set(0.65, 0.55, 0.5);
      marrow.castShadow = true;
      group.add(marrow);

      // Charred spring alliums & ginger slivers
      for (let i = 0; i < 7; i++) {
        const gingerGeo = new THREE.BoxGeometry(0.5, 0.03, 0.04);
        const gingerMat = new THREE.MeshStandardMaterial({
          color: 0xfffae6,
          roughness: 0.3,
        });
        const ginger = new THREE.Mesh(gingerGeo, gingerMat);
        ginger.position.set((Math.random() - 0.5) * 0.8, 0.9 + i * 0.02, (Math.random() - 0.5) * 0.8);
        ginger.rotation.y = Math.random() * Math.PI;
        group.add(ginger);
      }
    } else if (dishId === 'caviar-flatbread') {
      // Smoked Trout Caviar Flatbread
      // Blistered rustic flatbread base
      const flatbreadGeo = new THREE.CylinderGeometry(1.6, 1.5, 0.18, 32);
      const flatbreadMat = new THREE.MeshStandardMaterial({
        color: 0xd9b382,
        roughness: 0.8,
      });
      const bread = new THREE.Mesh(flatbreadGeo, flatbreadMat);
      bread.position.y = 0.24;
      bread.castShadow = true;
      group.add(bread);

      // Char leopard spots on bread
      for (let i = 0; i < 9; i++) {
        const spotGeo = new THREE.CircleGeometry(0.18, 8);
        const spotMat = new THREE.MeshStandardMaterial({
          color: 0x1f140e,
          roughness: 0.95,
        });
        const spot = new THREE.Mesh(spotGeo, spotMat);
        spot.rotation.x = -Math.PI / 2;
        spot.position.set(
          Math.cos(i) * 1.1,
          0.34,
          Math.sin(i) * 1.1
        );
        group.add(spot);
      }

      // Mound of glistening caviar pearls
      for (let i = 0; i < 60; i++) {
        const pearlGeo = new THREE.SphereGeometry(0.065, 8, 8);
        const pearlMat = new THREE.MeshStandardMaterial({
          color: 0xff7b25, // Golden trout roe
          roughness: 0.12,
          metalness: 0.45,
        });
        const pearl = new THREE.Mesh(pearlGeo, pearlMat);
        const angle = Math.random() * Math.PI * 2;
        const rad = Math.random() * 0.65;
        pearl.position.set(
          Math.cos(angle) * rad,
          0.38 + Math.random() * 0.28,
          Math.sin(angle) * rad
        );
        group.add(pearl);
      }

      // Cultured butter quenelle
      const quenelleGeo = new THREE.SphereGeometry(0.24, 16, 16);
      const butterMat = new THREE.MeshStandardMaterial({
        color: 0xfffdd0,
        roughness: 0.25,
      });
      const butter = new THREE.Mesh(quenelleGeo, butterMat);
      butter.scale.set(1.5, 0.7, 0.8);
      butter.position.set(0.4, 0.58, 0.35);
      butter.rotation.y = 0.8;
      group.add(butter);
    } else if (dishId === 'chocolate-fondant') {
      // Smoked Dark Chocolate Fondant
      // Volcanic cake cylinder
      const cakeGeo = new THREE.CylinderGeometry(0.95, 1.15, 0.75, 32);
      const cakeMat = new THREE.MeshStandardMaterial({
        color: 0x26140d, // 70% dark Venezuelan chocolate
        roughness: 0.88,
      });
      const cake = new THREE.Mesh(cakeGeo, cakeMat);
      cake.position.y = 0.5;
      cake.castShadow = true;
      group.add(cake);

      // Molten chocolate lava pool
      const moltenGeo = new THREE.CylinderGeometry(0.65, 0.7, 0.08, 24);
      const moltenMat = new THREE.MeshStandardMaterial({
        color: 0x1a0a05,
        roughness: 0.15,
        metalness: 0.3,
      });
      const molten = new THREE.Mesh(moltenGeo, moltenMat);
      molten.position.set(0.4, 0.22, 0.4);
      group.add(molten);

      // Vanilla bean gelato quenelle
      const gelatoGeo = new THREE.SphereGeometry(0.35, 16, 16);
      const gelatoMat = new THREE.MeshStandardMaterial({
        color: 0xfffaea,
        roughness: 0.35,
      });
      const gelato = new THREE.Mesh(gelatoGeo, gelatoMat);
      gelato.scale.set(1.4, 0.7, 0.85);
      gelato.position.set(-0.7, 0.45, 0.5);
      gelato.rotation.y = -0.5;
      group.add(gelato);

      // Maldon salt crystals
      for (let i = 0; i < 6; i++) {
        const saltGeo = new THREE.TetrahedronGeometry(0.06);
        const saltMat = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          roughness: 0.1,
          metalness: 0.2,
        });
        const salt = new THREE.Mesh(saltGeo, saltMat);
        salt.position.set((Math.random() - 0.5) * 0.6, 0.9, (Math.random() - 0.5) * 0.6);
        group.add(salt);
      }
    } else {
      // Deconstructed Saffron Pistachio Kulfi or other
      // Rabdi kulfi cylindrical cut
      const kulfiGeo = new THREE.CylinderGeometry(0.55, 0.6, 0.7, 32);
      const kulfiMat = new THREE.MeshStandardMaterial({
        color: 0xfcebb6, // Golden saffron cream
        roughness: 0.4,
      });
      const kulfi = new THREE.Mesh(kulfiGeo, kulfiMat);
      kulfi.position.y = 0.52;
      kulfi.castShadow = true;
      group.add(kulfi);

      // Architectural spun sugar nest dome
      const nestGeo = new THREE.TorusKnotGeometry(0.85, 0.05, 64, 16, 2, 5);
      const sugarMat = new THREE.MeshStandardMaterial({
        color: 0xe6a855,
        roughness: 0.2,
        metalness: 0.5,
        transparent: true,
        opacity: 0.85,
      });
      const nest = new THREE.Mesh(nestGeo, sugarMat);
      nest.position.y = 0.75;
      nest.scale.set(1.1, 0.85, 1.1);
      group.add(nest);

      // Rose coulis droplets
      for (let i = 0; i < 7; i++) {
        const dropGeo = new THREE.SphereGeometry(0.08, 12, 12);
        const dropMat = new THREE.MeshStandardMaterial({
          color: 0x9e1b32,
          roughness: 0.2,
        });
        const drop = new THREE.Mesh(dropGeo, dropMat);
        drop.scale.set(1, 0.3, 1);
        drop.position.set(Math.cos(i) * 1.4, 0.22, Math.sin(i) * 1.4);
        group.add(drop);
      }
    }
  }

  // Format video timeline time mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 10);
    return `00:${secs.toString().padStart(2, '0')}.${ms}`;
  };

  return (
    <div
      className={`relative w-full bg-[#0E0D0C] text-[#C4BDB2] flex flex-col ${
        isModal
          ? 'fixed inset-0 z-50 overflow-hidden'
          : isFullscreen
          ? 'fixed inset-0 z-50 h-screen'
          : 'min-h-[460px] h-[60vh] max-h-[680px] my-3 rounded-xl border border-[#2A2723] overflow-hidden'
      }`}
    >
      {/* Top Studio Bar / Video Reel Info */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-gradient-to-b from-[#0E0D0C]/95 via-[#0E0D0C]/70 to-transparent backdrop-blur-sm pointer-events-auto">
        <div className="flex items-center space-x-3">
          {/* Recording Badge */}
          <div className="flex items-center space-x-2 px-2.5 py-1 rounded bg-black/60 border border-[#39342E]">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isPlaying ? 'bg-red-500 animate-ping' : 'bg-zinc-600'
              }`}
            />
            <span className="text-[11px] font-mono tracking-wider text-red-400 font-bold uppercase">
              {isPlaying ? 'REC 360°' : 'PAUSED'}
            </span>
            <span className="text-[10px] text-zinc-500 font-mono hidden sm:inline">4K CINE</span>
          </div>

          <div>
            <h3 className="font-serif text-sm sm:text-base text-[#F4F1EA] font-medium tracking-wide flex items-center gap-1.5">
              <span>{selectedDish.title}</span>
              <span className="italic text-[#C18A65] font-normal">{selectedDish.italicPart}</span>
            </h3>
            <p className="text-[10px] sm:text-xs text-[#958E82] font-mono">
              {selectedDish.courseTitle} • 360° Culinary Turntable
            </p>
          </div>
        </div>

        {/* Action icons (Sound, Snapshot, Fullscreen, Close) */}
        <div className="flex items-center space-x-2">
          {/* Audio hearth sizzle toggle */}
          <button
            onClick={() => setIsAudioActive(!isAudioActive)}
            title={isAudioActive ? 'Mute Hearth Ambiance' : 'Enable Live Hearth Sound'}
            className={`p-2 rounded-full border transition-all ${
              isAudioActive
                ? 'bg-[#C18A65]/20 border-[#C18A65] text-[#C18A65]'
                : 'bg-black/40 border-[#39342E] text-zinc-400 hover:text-white'
            }`}
          >
            {isAudioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Snapshot capture */}
          <button
            onClick={handleCaptureSnapshot}
            title="Capture 360° Frame"
            className="p-2 rounded-full bg-black/40 border border-[#39342E] text-zinc-300 hover:text-[#C18A65] hover:border-[#C18A65] transition-all"
          >
            <Camera className="w-4 h-4" />
          </button>

          {/* Fullscreen toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title="Toggle Studio Viewport"
            className="p-2 rounded-full bg-black/40 border border-[#39342E] text-zinc-300 hover:text-white transition-all hidden sm:flex"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Close button if modal */}
          {isModal && onCloseModal && (
            <button
              onClick={onCloseModal}
              className="px-3 py-1.5 rounded-full bg-[#1F1E1C] border border-[#39342E] text-xs text-[#E5E0D8] hover:bg-[#2A2723] hover:text-white transition-all ml-2"
            >
              Close Studio
            </button>
          )}
        </div>
      </div>

      {/* Snapshot feedback badge */}
      {capturedNotice && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 px-4 py-2 bg-[#C18A65] text-[#111110] text-xs font-medium rounded-full shadow-lg flex items-center gap-1.5 animate-bounce">
          <Check className="w-3.5 h-3.5" />
          <span>High-Resolution 360° Still Saved to Downloads</span>
        </div>
      )}

      {/* Main 3D Canvas Area */}
      <div
        ref={mountRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="flex-1 w-full h-full cursor-grab active:cursor-grabbing select-none relative"
      >
        {!webGlSupported && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-[#0E0D0C] text-center">
            <div className="relative aspect-[16/10] w-full max-w-md overflow-hidden rounded border border-[#39342E] mb-4 shadow-xl">
              <img
                src={selectedDish.imageUrl}
                alt={selectedDish.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111110] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C18A65]">
                  High-Fidelity Plating Still
                </span>
                <h4 className="font-serif-lux text-base text-[#F0E8DC]">
                  {selectedDish.title}
                </h4>
              </div>
            </div>
            <p className="text-xs text-[#A69D90] font-mono max-w-sm">
              Archival culinary plating view active. WebGL hardware acceleration is inactive or restricted in this environment.
            </p>
          </div>
        )}

        {/* Drag Hint Overlay */}
        <div className="absolute bottom-24 left-6 pointer-events-none z-10 hidden sm:flex items-center space-x-2 text-[11px] text-[#A8A196] font-mono bg-black/50 px-3 py-1.5 rounded-full border border-[#2A2723]/60 backdrop-blur-sm">
          <Compass className="w-3.5 h-3.5 text-[#C18A65] animate-spin" />
          <span>Drag to orbit 360° • Scroll to zoom</span>
        </div>

        {/* Current Camera Stats Overlay */}
        <div className="absolute top-16 right-6 pointer-events-none z-10 hidden md:block text-[10px] font-mono text-[#8E867B] bg-black/40 px-3 py-2 rounded border border-[#2A2723]/50 text-right backdrop-blur-sm">
          <div>ELEVATION: {elevation}°</div>
          <div>DISTANCE: {zoomDistance}m</div>
          <div>LIGHTING: {lightingTheme.toUpperCase()}</div>
          <div>STEAM: {showParticles ? 'ACTIVE' : 'MUTED'}</div>
        </div>
      </div>

      {/* Floating Bottom Cinematic Video & Camera Control Deck */}
      <div className="relative z-20 px-4 sm:px-6 py-4 bg-gradient-to-t from-[#0E0D0C] via-[#0E0D0C]/90 to-transparent">
        {/* Timeline Progress Bar (0:00 to 0:12s loop) */}
        <div className="w-full bg-[#1F1E1C] h-1.5 rounded-full overflow-hidden mb-3 border border-[#2A2723]">
          <div
            className="h-full bg-gradient-to-r from-[#C18A65] to-[#E5A87B] transition-all duration-100"
            style={{ width: `${(currentTimeSec / 12) * 100}%` }}
          />
        </div>

        {/* Video Player Controls & Presets */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Left: Play / Pause, Time, Speed */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 sm:p-2.5 rounded-full bg-[#C18A65] text-[#111110] hover:bg-[#d99f79] transition-all shadow-md active:scale-95 flex items-center justify-center"
              title={isPlaying ? 'Pause 360 Rotation' : 'Start 360 Rotation'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>

            <button
              onClick={() => {
                orbitState.current.targetAzimuth = 0;
                setCurrentTimeSec(0);
              }}
              title="Reset 360 Angle"
              className="p-2 rounded-full bg-black/50 border border-[#39342E] text-zinc-300 hover:text-white transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleZoomIn}
              title="Zoom In (Close Up)"
              className="w-7 h-7 rounded-full bg-black/50 border border-[#39342E] text-zinc-300 hover:text-white font-mono text-xs flex items-center justify-center transition-all"
            >
              +
            </button>

            <button
              onClick={handleZoomOut}
              title="Zoom Out (Wide View)"
              className="w-7 h-7 rounded-full bg-black/50 border border-[#39342E] text-zinc-300 hover:text-white font-mono text-xs flex items-center justify-center transition-all"
            >
              −
            </button>

            <span className="font-mono text-xs text-[#E5E0D8]">
              {formatTime(currentTimeSec)} / 00:12.0
            </span>

            {/* Orbit Speed Selector */}
            <div className="hidden sm:flex items-center space-x-1 border border-[#2A2723] rounded-full p-0.5 bg-black/40">
              {[0.5, 1, 1.5, 2].map((spd) => (
                <button
                  key={spd}
                  onClick={() => setRotationSpeed(spd)}
                  className={`px-2 py-0.5 text-[10px] font-mono rounded-full transition-all ${
                    rotationSpeed === spd
                      ? 'bg-[#C18A65] text-[#111110] font-semibold'
                      : 'text-[#8E867B] hover:text-white'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </div>

          {/* Center: Camera Preset Angles */}
          <div className="flex items-center space-x-1.5 overflow-x-auto py-1 max-w-full">
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#7A7368] mr-1 hidden lg:inline">
              Camera:
            </span>
            {(
              [
                { id: 'hero-orbit', label: '360° Hero', desc: 'Turntable' },
                { id: 'macro-low', label: 'Macro 15°', desc: 'Grill Char' },
                { id: 'overhead', label: 'Overhead 78°', desc: 'Plating' },
                { id: 'cinematic-sweep', label: 'Sweep 38°', desc: 'Dynamic' },
              ] as const
            ).map((p) => (
              <button
                key={p.id}
                onClick={() => setCameraPreset(p.id)}
                className={`px-2.5 py-1 text-[11px] rounded-full border transition-all whitespace-nowrap ${
                  cameraPreset === p.id
                    ? 'bg-[#2A2723] border-[#C18A65] text-[#F4F1EA] shadow-sm'
                    : 'bg-black/30 border-[#2A2723] text-[#958E82] hover:text-white hover:border-[#39342E]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Right: Lighting Theme & Controls Drawer Toggle */}
          <div className="flex items-center space-x-2">
            <div className="hidden sm:flex items-center space-x-1 border border-[#2A2723] rounded-full p-0.5 bg-black/40">
              <span className="text-[10px] text-[#7A7368] px-2 font-mono hidden xl:inline">Light:</span>
              {(
                [
                  { id: 'obsidian', label: 'Hearth' },
                  { id: 'candlelight', label: 'Candle' },
                  { id: 'studio', label: 'Studio' },
                  { id: 'gold-hour', label: 'Golden' },
                ] as const
              ).map((lt) => (
                <button
                  key={lt.id}
                  onClick={() => setLightingTheme(lt.id)}
                  className={`px-2 py-0.5 text-[10px] rounded-full transition-all ${
                    lightingTheme === lt.id
                      ? 'bg-[#C18A65]/20 text-[#C18A65] font-medium border border-[#C18A65]/40'
                      : 'text-[#8E867B] hover:text-white'
                  }`}
                >
                  {lt.label}
                </button>
              ))}
            </div>

            {/* Steam toggle */}
            <button
              onClick={() => setShowParticles(!showParticles)}
              className={`p-1.5 rounded-full border transition-all text-[11px] flex items-center gap-1 px-2.5 ${
                showParticles
                  ? 'bg-amber-950/30 border-amber-800/60 text-amber-300'
                  : 'bg-black/30 border-[#2A2723] text-zinc-500'
              }`}
              title="Toggle Steam & Embers"
            >
              <Flame className="w-3 h-3" />
              <span className="text-[10px] font-mono hidden md:inline">Steam</span>
            </button>
          </div>
        </div>

        {/* Dish Switcher Strip */}
        <div className="mt-3.5 pt-3 border-t border-[#2A2723]/60 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center space-x-2 min-w-max">
            {DISHES_DATABASE.map((dish) => (
              <button
                key={dish.id}
                onClick={() => setSelectedDishId(dish.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border transition-all ${
                  selectedDishId === dish.id
                    ? 'bg-[#1C1A18] border-[#C18A65] text-[#F4F1EA] shadow-md'
                    : 'bg-black/40 border-[#2A2723] text-[#8E867B] hover:text-[#C4BDB2] hover:border-[#39342E]'
                }`}
              >
                <img
                  src={dish.imageUrl}
                  alt={dish.title}
                  className="w-5 h-5 rounded-full object-cover border border-[#39342E]"
                />
                <span className="text-xs font-serif tracking-wide">{dish.title}</span>
                {selectedDishId === dish.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C18A65]" />
                )}
              </button>
            ))}
          </div>

          {/* Quick actions for current dish */}
          <div className="flex items-center space-x-2 shrink-0">
            {onExploreAnthology && (
              <button
                onClick={() => onExploreAnthology(selectedDish.id)}
                className="text-[11px] text-[#C18A65] hover:underline flex items-center gap-1 font-mono tracking-wider uppercase px-2 py-1"
              >
                <span>Read Dossier</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            )}

            {onOpenReservation && (
              <button
                onClick={onOpenReservation}
                className="px-3.5 py-1.5 bg-[#C18A65] hover:bg-[#d99f79] text-[#111110] text-xs font-medium tracking-wider uppercase rounded font-mono transition-all"
              >
                Reserve Table
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
