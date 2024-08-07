const Shimmer = () => {
    
    return (
      <div className="shimmer-container bg-black">

      
      <div className="flex gap-10 md:px-36 md:py-24 pt-20 ">
        <div className="shimmer w-[370px] h-[555px] rounded-lg"></div>
        <div className="flex flex-col gap-5 w-full">
          <div className="shimmer w-[300px] h-[40px]"></div>
          <div className="shimmer w-[200px] h-[20px]"></div>
          <div className="flex gap-3">
            <div className="shimmer w-[80px] h-[30px]"></div>
            <div className="shimmer w-[80px] h-[30px]"></div>
            <div className="shimmer w-[80px] h-[30px]"></div>
          </div>
          <div className="shimmer w-[100px] h-[40px]"></div>
          <div className="shimmer w-[450px] h-[150px]"></div>
          <div className="flex gap-4">
            <div className="shimmer w-[100px] h-[20px]"></div>
            <div className="shimmer w-[100px] h-[20px]"></div>
            <div className="shimmer w-[100px] h-[20px]"></div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="shimmer w-[300px] h-[20px]"></div>
            <div className="shimmer w-[300px] h-[20px]"></div>
          </div>
        </div>
      </div>
      <div className="shimmer-container md:px-16 px-5 py-5">
      <h1 className="text-white text-2xl font-semibold pl-20 mb-5 shimmer w-[200px] h-[30px]"></h1>
      <div className="flex gap-5 overflow-hidden overflow-x-scroll no-scrollbar">
        {Array(6).fill().map((_, index) => (
          <div key={index} className="shimmer flex flex-col gap-3 p-2 min-w-[200px] ">
            <div className="w-[175px] h-[175px] shimmer rounded-full mb-3"></div>
            <div className="w-[150px] h-[20px] shimmer mb-1"></div>
            <div className="w-[120px] h-[15px] shimmer"></div>
          </div>
        ))}
      </div>
    </div>
    <div className="shimmer-container md:px-16 px-5 py-5">
      <h1 className="text-white text-2xl font-semibold pl-20 mb-5 shimmer w-[200px] h-[30px]"></h1>
      <div className="flex gap-5 overflow-hidden overflow-x-scroll no-scrollbar">
        {Array(6).fill().map((_, index) => (
          <div key={index} className="shimmer flex flex-col gap-3 p-2 min-w-[200px] ">
            <div className="w-[175px] h-[175px] shimmer rounded-full mb-3"></div>
            <div className="w-[150px] h-[20px] shimmer mb-1"></div>
            <div className="w-[120px] h-[15px] shimmer"></div>
          </div>
        ))}
      </div>
    </div>
    <div className="shimmer-container md:px-16 px-5 py-5">
      <h1 className="text-white text-2xl font-semibold pl-20 mb-5 shimmer w-[200px] h-[30px]"></h1>
      <div className="flex gap-5 overflow-hidden overflow-x-scroll no-scrollbar">
        {Array(6).fill().map((_, index) => (
          <div key={index} className="shimmer flex flex-col gap-3 p-2 min-w-[200px] ">
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
  
  export default Shimmer;