import React from "react";

import { motion } from "framer-motion";

import { styles } from "../styles";

import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import {Tilt} from "react-tilt";

const ServiceCard = ({ index, title, icon }) => (
    <Tilt className='xs:w-[250px] w-full'>
        <motion.div
            variants={fadeIn("right", "spring", index * 0.5, 0.75)}
            className='w-full bg-black-200 p-[1px] rounded-[200px] shadow-card'
        >
            <div
                options={{
                    max: 45,
                    scale: 1,
                    speed: 450,
                }}
                className='bg-hero-pattern rounded-[1000px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col '
            >
                <img
                    src={icon}
                    alt='web-development'
                    className='w-16 h-16 object-contain'
                />

                <h3 className='text-white text-[20px] font-mc text-center'>
                    {title}
                </h3>
            </div>
        </motion.div>
    </Tilt>
);



const About = () => {
    return (
        <>
            <motion.div variants={textVariant()}>
                <p className={styles.sectionSubText}>Introduction</p>
                <h2 className={styles.MCText} >Overview.</h2>
            </motion.div>

            <motion.p
                variants={fadeIn("", "", 0.1, 1)}
                className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px] font-custom'
            >
                我是一名熟练的软件开发人员，拥有TypeScript和JavaScript的经验，并精通React、Node.js和Three.js等框架。我学习能力强，
                与客户密切合作，创建高效、可扩展、用户友好的解决方案，解决现实世界的问题。让我们一起努力，把你的想法变成现实！
            </motion.p>

            <div className='mt-20 flex flex-wrap gap-10'>
                {services.map((service, index) => (
                    <ServiceCard key={service.title} index={index} {...service} />
                ))}
            </div>
        </>
    );
}
export default SectionWrapper(About, "about");
