"use client";
import React, { ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { useTranslations } from "use-intl";
import { Link } from "@/i18n/routing";

const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link?: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="h-[300vh] py-20 overflow-hidden  antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product, index) => (
            <ProductCard product={product} translate={translateX} key={index} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row  mb-20 space-x-20 ">
          {secondRow.map((product, index) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={index}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product, index) => (
            <ProductCard product={product} translate={translateX} key={index} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};
export default HeroParallax;

export const Header = () => {
  const t = useTranslations("pages.home.avatarContent");

  return (
    <div className="max-w-7xl relative left-0 top-0 flex flex-col md:!flex-row-reverse mx-auto py-20 md:py-40 px-4 w-full">
      <div className="flex justify-center items-center md:!w-1/2 mb-10 md:!mb-0">
        <motion.img
          alt="Toa Kiryu Avatar"
          src="/wp-content/toakiryu/icon.webp"
          className="w-24 sm:!w-36 md:!w-48 lg:!w-56 rounded-full border"
          loading="lazy"
          initial={{
            opacity: 0,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            ease: "easeInOut",
          }}
        />
      </div>
      <div className="md:!w-1/2">
        <motion.h1
          className="text-2xl md:text-7xl font-bold dark:text-white"
          initial={{
            x: -50,
            opacity: 0,
            filter: "blur(10px)",
          }}
          animate={{
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 1,
            delay: 0.5,
            ease: "easeInOut",
          }}
        >
          {t("name")} <br /> full stack developer
        </motion.h1>
        <motion.p
          className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200"
          initial={{
            x: -50,
            opacity: 0,
            filter: "blur(10px)",
          }}
          animate={{
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 1,
            delay: 1,
            ease: "easeInOut",
          }}
        >
          {t("description")}
        </motion.p>
      </div>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link?: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  function LinkContent({ children }: { children: ReactNode }) {
    if (product.link) {
      return (
        <Link
          href={product.link}
          className="block group-hover/product:shadow-2xl "
        >
          {children}
        </Link>
      );
    }
    return (
      <div className="block group-hover/product:shadow-2xl ">{children}</div>
    );
  }

  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative flex-shrink-0"
    >
      {product.link}
      <LinkContent>
        <img
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-center absolute h-full w-full inset-0"
          loading="lazy"
          alt={product.title}
        />
      </LinkContent>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </motion.div>
  );
};
