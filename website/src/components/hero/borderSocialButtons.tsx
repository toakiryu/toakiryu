"use client";

import React, { useRef } from "react";
import { Tooltip } from "@heroui/react";
import { socials, socialType } from "../../../config";

import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";

const variants = {
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      delay: 0,
      ease: "easeInOut",
    },
  },
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(10px)",
    transition: {
      duration: 0.8,
      delay: 0,
      ease: "easeInOut",
    },
  },
};

function BorderSocialButtonLi({ social }: { social: socialType }) {
  const variants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    hidden: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Tooltip content={social.label} showArrow>
        <Link
          href={social.link}
          target="_blank"
          className={cn(
            "flex p-3 rounded-lg border shadow hover:opacity-70",
            social.className
          )}
        >
          <span className="sr-only">{social.label}</span>
          <social.icon className="text-3xl" />
        </Link>
      </Tooltip>
    </motion.li>
  );
}

function BorderSocialButtons() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  return (
    <div className="flex flex-col justify-center items-center w-full p-5">
      <motion.ul
        ref={ref}
        variants={variants}
        initial={false}
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-wrap justify-center items-center gap-8"
      >
        {socials.map((social, index) => {
          return <BorderSocialButtonLi key={index} social={social} />;
        })}
      </motion.ul>
    </div>
  );
}

export default BorderSocialButtons;
