import React, {Suspense, useEffect, useRef, useState} from "react"; // 这里的Suspense组件是为了加载模型时显示加载进度条动画
import {Canvas, useFrame} from "@react-three/fiber"; // 这里的Canvas组件是为了创建一个画布
import {OrbitControls, Preload, useAnimations, useGLTF} from "@react-three/drei"; // 这里的OrbitControls是为了创建一个相机控制器，Preload是为了预加载模型,useGLTF是加载模型的一个函数

import CanvasLoader from "../Loader";
import {motion} from "framer-motion";
import {zs1} from "../../assets/";

import '../../index.css';

const MCmodel = (pros) => {
    const { scene, animations } = useGLTF("./wdsj/xl1.glb")
    const { actions } = useAnimations(animations, scene)
    
    const { isMobile , canPlay , onMsg} = pros;

    useEffect(() => {
        if (canPlay) {
            console.log("play");
            actions.Animation.repetitions = 1;
            actions.Animation.timeScale = 0.5;
            actions.Animation.play();
        }

        return () => {
            actions.Animation.stop();
        };
    }, [canPlay]);

    useFrame(({}) => {})

    if (canPlay) {
        // 设置定时器，在动画播放11000毫秒后调用onMsg函数，并清除定时器
        // onMsg又会去调用父组件的stopShowingAnimation函数，从而停止显示动画
        const timeoutId= setTimeout(() => {
            onMsg();
            actions.Animation.stop();//记得停掉动画
            clearTimeout(timeoutId);
        }, 11000);
    }

  return (

      <mesh>
        {/*这里的hemisphereLight是为了创建一个强度为0.15的半球光，groundColor是为了创建一个黑色地面 */}
        <hemisphereLight intensity={8} groundColor='black' />



        {/*object是为了创建一个模型的对象，
        scale是为了创建一个根据屏幕尺寸缩放的模型的缩放比例，
        position是为了创建一个模型的位置，
        rotation是为了创建一个模型的旋转角度 */}
        <primitive
            object={scene}
            scale={isMobile ? 0.2 : 0.25}
            position={isMobile ? [0, 0, -1] : [1, -3.5, -3]}
            rotation={[0, -0, -0]}
        />

      </mesh>

  );
};

// 创建一个画布组件
const ComputersCanvas = () => {

  // const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);// 创建一个状态量用于判断是否为手机
  const [canPlay, setCanPlay] = useState(false);// 创建一个状态量用于判断是否播放模型动画
  const handleClick = () => {
      if(canPlay===false) {
          setCanPlay(true);//这是一个回调函数，在钻石按钮被点击时调用，用于播放模型动画
      }
  }
  const stopShowingAnimation = () => {
      console.log("stopShowingAnimation");// 这是一个回调函数，在模型动画播放完成后调用，用于停止模型动画
      setCanPlay(false);
  };

  useEffect(() => {
    // 为屏幕尺寸添加一个监听事件，检测当前设备的屏幕宽度是否小于等于500像素。如果是，mediaQuery媒体查询对象的matches属性将被设置为true，否则为false。
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // 用mediaQuery媒体查询对象matches的值设置状态变量isMobile的值
    setIsMobile(mediaQuery.matches);

    // 定义一个回调函数来处理媒体查询的变化
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // 添加一个事件监听器来监听媒体查询的变化
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // 组件卸载时移除事件监听器，防止内存泄漏
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);// useEffect的第二个参数为空数组，表示只在组件挂载时执行一次


    // 下面的Canvas组件是为了创建一个画布,frameloop='demand'是为了创建一个帧循环（减少不必要性能开支，但是这里不要用），shadows是为了创建一个阴影，dpr是为了创建一个设备像素比，camera是为了创建一个相机，
    // gl是为了创建一个WebGL上下文，preserveDrawingBuffer: true表示在绘制完成后保留绘图缓冲区的内容，这在某些情况下可能是有用的，比如需要将渲染结果保存为图像
    // Suspense组件是为了加载模型时显示加载进度条动画
  return (

      <>
          <Canvas
              shadows
              dpr={[1, 2]}
              camera={{position: [0, 0, 0], fov: 90}}
              gl={{preserveDrawingBuffer: true}}
          >


              <Suspense fallback={<CanvasLoader/>}>
                  <OrbitControls
                      enableZoom={false}
                      enableRotate={true}


                  />
                  <MCmodel isMobile={isMobile} canPlay={canPlay} onMsg={stopShowingAnimation} />
              </Suspense>

              <Preload all/>

          </Canvas>
          <div className='absolute xs:bottom-32 bottom-40 flex  items-center ml-5 pl-5' onClick={
              handleClick
          }>

              <motion.div
                  animate={{
                      y: [0, 24, 0],
                  }}
                  transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "loop",
                  }}
                  className='w-30 h-30  mb-1 text-[25px] text-red-500 font-custom '
              >
                  <p className="font-bold sm:text-[30px] text-[15px]">别动我的钻石</p>
                  <div className="font-mc sm:text-[30px] text-[15px]">Don't touch<br/>
                      the diamond.</div>
              </motion.div>
              <motion.div
                  animate={{
                      y: [0, 24, 0],
                      rotateY: [0, 360], // 绕 y 轴旋转 0 到 360 度
                  }}
                  transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "loop",
                  }}
                  className='w-30 h-30  mb-1 '

              >
                  <img src={zs1} alt="logo" className="ms:w-30 w-10 ms:h-30 h-10 object-contain"/>

              </motion.div>
          </div>
      </>


  );
};

export default ComputersCanvas;
