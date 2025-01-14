import { motion } from 'framer-motion';

import { styles } from "../styles.js";
import { ComputersCanvas } from "./canvas";
import {zs1} from "../assets/index.js";
import React from "react";
import {cfk1}from "../assets";

const Hero = () => {
  return (
      <section className={`relative w-full h-screen mx-auto `}>
          <div
              className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}
          >
              <div>

                  <h5 className={`${styles.heroHeadText} text-white`}>
                      Hi, I'm <span className='text-[65px] font-mc'>xpg</span>
                  </h5>


                  <p className={`${styles.heroSubText} mt-2 text-white-100`}>
                      你好我是xpg，一名前端工程师。
                      <br className='sm:block hidden'/>
                      我喜欢用代码创造出有趣的BUG。
                  </p>

              </div>


          </div>
          <ComputersCanvas/>
          <div className='absolute xs:bottom-10 bottom-8 w-full flex justify-center items-center'>
              <a href='#about'>
                  <div
                      className='flex justify-center items-start p-2'>


                      <motion.div
                          animate={{
                              y: [0, 20, 0],
                          }}
                          transition={{
                              duration: 5,
                              repeat: Infinity,
                              repeatType: "loop",
                          }}
                          className='mb-1'>
                          <img src={cfk1} alt="cfk" className="ms:w-30 w-10 ms:h-30 h-10 object-contain"/>
                      </motion.div>
                  </div>
              </a>
          </div>
      </section>
  )
}

export default Hero