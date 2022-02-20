import { Suspense, useRef, useLayoutEffect, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stage, useGLTF } from '@react-three/drei'
import { useControls } from 'leva'
import { AnimationMixer } from 'three'
import colors from 'tailwindcss/colors'
import useStore from '@/helpers/store'
import { lightControls, defaultControls } from './controls'

// TODO: handle broken 3D -> caused when minted?
// TODO: add loading
const Model = ({ metadata }) => {
  const ref = useRef()

  const { animations, scene } = useGLTF(metadata?.model3d_url)

  return (
    <>
      <Stage controls={ref} shadowBias={-0.001}>
        <primitive object={scene} />
      </Stage>
      <OrbitControls ref={ref} autoRotate={true} />
    </>
  )
}

export default function ModelComponent(props) {
  const { darkMode } = useStore()
  return (
    <Canvas
      shadows
      gl={{ alpha: false }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 150], fov: 50 }}
    >
      <color
        attach='background'
        args={[darkMode ? colors.gray[900] : colors.white]}
      />
      <Suspense fallback={null}>
        <Model {...props} key={props.id} />
      </Suspense>
    </Canvas>
  )
}
