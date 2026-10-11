"use client";

import { useRef } from "react";
import Image, { type ImageProps } from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

type ParallaxImageProps = Omit<ImageProps, "fill"> & {
  strength?: number;
};

export function ParallaxImage({ strength = 5, ...imageProps }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);


  const scale = 1 + ((strength + 1) * 2) / 100;

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={reduceMotion ? undefined : { y, scale }}
      >
        <Image {...imageProps} fill />
      </motion.div>
    </div>
  );
}
