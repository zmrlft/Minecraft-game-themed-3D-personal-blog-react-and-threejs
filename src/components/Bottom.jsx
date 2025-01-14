import React from 'react'
import {motion} from "framer-motion";
import {jsyz1} from "../assets/index.js";

const Bottom = () => {
    const screenWidth = window.innerWidth;
    console.log(screenWidth);

    return (
            <div className="h-2">

                <motion.div

                    animate={{
                        y: [0, 400, 0],

                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        repeatType: "loop",
                    }}
                    className='w-[350px] h-[640px] flex'
                >
                    <img src={jsyz1} alt="logo" className="h-20 w-20 object-contain"/>
                </motion.div>

            </div>


    )
}

export default Bottom