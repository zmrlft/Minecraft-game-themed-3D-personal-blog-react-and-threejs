import React from 'react'
import {Html, useProgress} from "@react-three/drei";

const Loader = () => {
  const { progress } = useProgress(); // 获取进度值
  return (
    <Html>
      <span className="canvas-load"></span>
        <p
        style={
          {
            fontSize: 14,
            color: "#f1f1f1",
            fontWeight: 800,
            marginTop: 40,
          }}>3D模型加载中...
          {progress.toFixed(2)}%
        </p>

    </Html>
  )
}

export default Loader