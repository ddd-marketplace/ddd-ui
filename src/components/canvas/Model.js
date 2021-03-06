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
  const controls = useControls({
    ...defaultControls,
    wireframe: false,
    ...lightControls,
  })

  const { animations, scene } = useGLTF(metadata?.model3d_url)

  const { animationClips, defaultAnimationsControls, mixer } = useMemo(() => {
    const mixer = new AnimationMixer(scene)
    const animationClips = []
    let defaultAnimationsControls = {}

    for (let a of animations) {
      let action = mixer.clipAction(a)
      animationClips[a.name] = action
      defaultAnimationsControls[a.name] = false
    }

    return { defaultAnimationsControls, animationClips, mixer }
  }, [animations, scene])

  const [animationsControls, setAnimationsControls] = useControls(
    'Animations',
    () => defaultAnimationsControls
  )

  useEffect(() => {
    for (let clipName in animationClips) {
      if (animationsControls[clipName]) {
        animationClips[clipName].play()
      } else {
        animationClips[clipName].stop()
      }
    }
  }, [animationClips, animationsControls, scene])

  useLayoutEffect(() => {
    void scene.traverse(
      (obj) => obj.isMesh && (obj.castShadow = obj.receiveShadow = true)
    )
  }, [scene])

  useEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh && obj.material) {
        obj.material.wireframe = controls.wireframe
      }
    })

    if (animations.length) {
      defaultAnimationsControls[animations[0].name] = true
    }
    setAnimationsControls(defaultAnimationsControls)
  }, [
    scene,
    controls.wireframe,
    animations,
    defaultAnimationsControls,
    setAnimationsControls,
  ])

  useFrame((state, delta) => {
    mixer.update(delta)
  })

  return (
    <>
      <Stage
        controls={ref}
        preset={controls.preset}
        intensity={controls.intensity}
        contactShadow={controls.contactShadow}
        environment={controls.environment}
        shadowBias={-0.001}
      >
        <primitive object={scene} />
      </Stage>
      <OrbitControls ref={ref} autoRotate={controls.autoRotate} />
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
