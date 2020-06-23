import React from 'react';
import {motion} from 'framer-motion';
import {MenuItems} from "../MenuObjects";
import {MenuItem} from "./MenuItem";
export default function Menu() {


    return (
        <motion.div exit={{opacity: 0}} animate={{ opacity: 1}} initial={{opacity: 0}} transition={{duration: 1.1}}>
            <div className="menu">
                {MenuItems.map((item, index) => {
                    return (
                    <MenuItem key={index} item={item} index={index} />
                    )
                })}  
               </div>  
            </motion.div>
    )
}
