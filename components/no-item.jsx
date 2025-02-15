"use client";

import Lottie from "lottie-react";
import groovyWalkAnimation from "@/animations/no-item.json";

const NoItem = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      داده ای برای نمایش وجود ندارد
      <Lottie
        animationData={groovyWalkAnimation}
        loop={true}
        className="h-[200px]"
      />
    </div>
  );
};

export default NoItem;
