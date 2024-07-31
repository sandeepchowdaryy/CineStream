import React from "react";

const ShimmerBrowse = () => {
  return (
    <div className="pt-[22rem]  bg-black">
      <div className="pl-16">
        <div className="shimmer w-[300px] h-[30px] mb-4"></div>
        <div className="shimmer w-[550px] h-[80px] mb-4"></div>
        <div className="pt-4 pb-6 flex gap-3">
          <div className="shimmer w-[120px] h-[40px] rounded-md"></div>
          <div className="shimmer w-[150px] h-[40px] rounded-md"></div>
        </div>
      </div>

      <div className="shimmer-container px-16 py-5">
        <h1 className="text-white text-xl font-semibold pl-1 mb-5  w-[200px] h-[30px]">Now Playing</h1>
        <div className="flex gap-5 overflow-hidden overflow-x-scroll no-scrollbar">
          {Array(6)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className="shimmer flex flex-col gap-3 p-2 min-w-[200px] "
              >
                <div className="w-[175px] h-[175px] shimmer rounded-full mb-3"></div>
                <div className="w-[150px] h-[20px] shimmer mb-1"></div>
                <div className="w-[120px] h-[15px] shimmer"></div>
              </div>
            ))}
        </div>
      </div>
      <div className="shimmer-container px-16 py-5">
      <h1 className="text-white text-xl font-semibold pl-1 mb-5  w-[200px] h-[30px]">Top Rated</h1>
        <div className="flex gap-5 overflow-hidden overflow-x-scroll no-scrollbar">
          {Array(6)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className="shimmer flex flex-col gap-3 p-2 min-w-[200px] "
              >
                <div className="w-[175px] h-[175px] shimmer rounded-full mb-3"></div>
                <div className="w-[150px] h-[20px] shimmer mb-1"></div>
                <div className="w-[120px] h-[15px] shimmer"></div>
              </div>
            ))}
        </div>
      </div>
      <div className="shimmer-container px-16 py-5">
      <h1 className="text-white text-xl font-semibold pl-1 mb-5  w-[200px] h-[30px]">Trending</h1>
        <div className="flex gap-5 overflow-hidden overflow-x-scroll no-scrollbar">
          {Array(6)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className="shimmer flex flex-col gap-3 p-2 min-w-[200px] "
              >
                <div className="w-[175px] h-[175px] shimmer rounded-full mb-3"></div>
                <div className="w-[150px] h-[20px] shimmer mb-1"></div>
                <div className="w-[120px] h-[15px] shimmer"></div>
              </div>
            ))}
        </div>
      </div>
      <div className="shimmer-container px-16 py-5">
      <h1 className="text-white text-xl font-semibold pl-1 mb-5  w-[200px] h-[30px]">Popular</h1>
        <div className="flex gap-5 overflow-hidden overflow-x-scroll no-scrollbar">
          {Array(6)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className="shimmer flex flex-col gap-3 p-2 min-w-[200px] "
              >
                <div className="w-[175px] h-[175px] shimmer rounded-full mb-3"></div>
                <div className="w-[150px] h-[20px] shimmer mb-1"></div>
                <div className="w-[120px] h-[15px] shimmer"></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ShimmerBrowse;
