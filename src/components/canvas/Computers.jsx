import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <primitive object={computer.scene} scale={2.5} position-y={0} rotation-y={0} />
    // <mesh>
    //   <hemisphereLight intensity={1} groundColor="black" />
    //   <pointLight intensity={8} />
    //   <spotLight
    //     position={[-20, 50, 10]}
    //     angle={0.12}
    //     penumbra={1}
    //     intensity={1}
    //     castShadow
    //     shadow-mapSize={1024}
    //   />

    //   <primitive
    //     object={computer.scene}
    //     scale={isMobile ? 0.6 : 0.65}
    //     position={isMobile ? [0, -3.9, -1.8] : [0, -3.83, -1.5]}
    //     rotation={[-0.01, -0.2, -0.1]}
    //   />
    // </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers />

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default ComputersCanvas;
