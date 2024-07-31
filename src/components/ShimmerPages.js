import React from 'react'

const ShimmerPages = () => {
  return (
    <div className="shimmer-container px-32 py-32 bg-black">
      <div className="flex gap-7 flex-wrap  overflow-hidden overflow-x-scroll no-scrollbar">
        {Array(20)
          .fill()
          .map((_, index) => (
            <div
              key={index}
              className="shimmer flex flex-col gap-3 p-2 min-w-[200px]"
            >
              <div className="w-[175px] h-[175px] shimmer rounded-full mb-3"></div>
              <div className="w-[150px] h-[20px] shimmer mb-1"></div>
              <div className="w-[120px] h-[15px] shimmer"></div>
            </div>
          ))}
      </div>
    </div>
    
  )
}

export default ShimmerPages;
