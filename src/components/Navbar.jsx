import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import { styles } from '../styles';
import { navLinks } from '../constants';
import { menu, close, jsyz1} from '../assets';
const Navbar = () => {
  const [active, setAction] = useState('');// 定义一个状态变量active,用于存储当前选中的选项
  const [toggle, setToggle] = useState(false);
  return (
      <nav className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary`}>
          <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
              <Link
                  to="/"
                  className="flex items-center gap-2"
                  onClick={() => {
                      setActive("");
                      window.scrollTo(0, 0);
                  }}
              >
                  <img src={jsyz1} alt="logo" className="w-9 h-9 object-contain"/>
                  <p className="text-white text-[18px] font-bold cursor-pointer flex">XPG
                      <span className="sm:block hidden">这是橡皮膏的个人主页</span>
                  </p>
              </ Link>
              <ul className="list-none hidden sm:flex flex-row gap-10">
                  {navLinks.map((link) => ( // 遍历navLinks数组中的每个元素
                      // 为每个li元素设置唯一的key属性,React 使用key属性来区分不同的元素。key就像是每个元素的 “身份证”，能够让 React 高效且准确地识别每个元素。
                      <li key={link.id}
                          className={`${
                              // 当active状态等于当前链接的title时（选项选中状态）为li元素添加"text-white"类名
                              // 否则添加"text-secondary"类名,text-secondary在tailwind.config.cjs中定义，用于设置文本颜色为secondary: "#aaa6c3"
                              active === link.title 
                              ? "text-white" 
                              : "text-secondary"
                          } hover:text-white text-[22px] font-bold cursor-pointer`}
                          onClick={() => {
                              // 当点击链接时，设置active状态为当前链接的title
                              setActive(link.title);
                          }}
                      >
                         <a href={`#${link.id}`}>
                             {link.title}
                         </a>
                      </li>
                  ))}
              </ul>
              {/* 移动端菜单按钮*/}
              <div className="sm:hidden flex flex-1 justify-end items-center">
                  <img
                      src={toggle ? close : menu}
                      alt="menu"
                      className="w-[28px] h-[28px] object-contain cursor-pointer"
                      onClick={() =>
                          setToggle(!toggle)
                      }
                  />
                  <div
                      className={`${
                          !toggle ? "hidden" : "flex"
                      } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
                      <ul className="list-none flex justify-end items-start flex-col gap-4">
                          {navLinks.map((link) => (
                              <li key={link.id}
                                  className={`${
                                      active === link.title
                                          ? "text-white"
                                          : "text-secondary"
                                  } hover:text-white text-[22px] font-bold cursor-pointer`}
                                  onClick={() => {
                                      setToggle(!toggle);
                                      setActive(link.title);
                                  }}
                              >
                                  <a href={`#${link.id}`}>
                                      {link.title}
                                  </a>
                              </li>
                          ))}
                      </ul>
                  </div>

              </div>


          </div>

      </nav>
  )
}

export default Navbar