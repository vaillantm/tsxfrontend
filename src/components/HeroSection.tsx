const HeroSection = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-4">
      <section className="grid grid-cols-3 gap-5 mt-5">
        <div className="col-span-2 relative h-[500px] rounded overflow-hidden flex items-center text-white bg-cover bg-center" style={{ backgroundImage: "url('https://res.cloudinary.com/dl4biwzn8/image/upload/v1769516572/imgi_11_catalog-slider-1_-_Copy_h3odz3.jpg')" }}>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 w-full text-left px-10">
            <h3 className="text-[32px] font-light italic">New Arrivals</h3>
            <h1 className="text-[70px] my-2">Summer Sale</h1>
            <p className="text-[28px] mb-[30px]">Minimum 40% Off</p>
            <button className="bg-transparent border-2 border-white text-white py-3 px-9 font-bold cursor-pointer transition hover:bg-white hover:text-black">
              SHOP NOW
            </button>
          </div>
          {/* <div className="absolute bottom-[30px] right-10 bg-white text-primary-blue p-2.5 rounded-full text-sm font-bold flex items-start gap-0.5">
              <span style={{ fontSize: '10px' }}>$</span>
              <span style={{ fontSize: '24px' }}>39</span>
              <i className="fa-solid fa-leaf" style={{ fontSize: '10px' }}></i>
          </div> */}
        </div>

        <div className="flex flex-col gap-5">
          <div className="bg-gray-100 h-[240px] rounded relative overflow-hidden flex items-center px-5">
            <div className="relative z-10 w-3/5">
              <span className="text-primary-blue text-xs font-bold">WHITE SNEAKERS</span>
              <h2 className="text-2xl my-1">MIN. 30% OFF</h2>
              <p className="text-sm text-gray-500 mb-4">Men Fashionable Shoes</p>
              <button className="bg-primary-blue text-white border-none py-2 px-5 text-xs font-bold cursor-pointer hover:bg-dark-blue">
                SHOP NOW
              </button>
            </div>
              <img src="https://res.cloudinary.com/dl4biwzn8/image/upload/v1769415359/sneaker_ivf87v.png" alt="Sneakers" className="absolute right-0 bottom-0 h-[90%] object-contain" />
          </div>

          <div className="bg-gray-100 h-[240px] rounded relative overflow-hidden flex items-center px-5">
            <div className="relative z-10 w-3/5">
              <span className="text-[#666] text-xs font-bold">WOMEN'S FASHION</span>
              <h2 className="text-2xl my-1">UP TO 65% OFF</h2>
              <p className="text-sm text-gray-500 mb-4">Shoes & Backpacks</p>
              <button className="bg-primary-blue text-white border-none py-2 px-5 text-xs font-bold cursor-pointer hover:bg-dark-blue">
                SHOP NOW
              </button>
            </div>
           <img src="https://res.cloudinary.com/dl4biwzn8/image/upload/v1769415359/bags_rjqyfz.png" alt="Bags" className="absolute right-0 bottom-0 h-[90%] object-contain" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;