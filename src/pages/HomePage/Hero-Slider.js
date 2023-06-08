import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation, Autoplay } from "swiper";
import { Link } from "react-router-dom";

export default function Slider() {
    return (
        <>
            <Swiper
                pagination={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                loop={true}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
               <div>
                 <SwiperSlide>
                    <div
                        className="lg:h-[500px] bg-cover bg-center bg-no-repeat text-white rounded-xl "
                        style={{
                            backgroundImage: `url(${"https://www.kayak.com/rimg/himg/d6/23/7a/expediav2-325286-83622d-611671.jpg?width=1366&height=768&crop=true"})`,
                        }}


                    >
                        <div className="bg-gradient-to-r from-black to-transparent h-full w-full lg:pt-32 p-5 lg:pl-20 rounded-xl">
                            <div>
                                <h1 className="lg:text-5xl text-2xl">
                                    Sell Your Furniture
                                    <br /> With A Best Price
                                </h1>
                                <p className="py-3 text-sm md:text-xl md:w-3/6 ">

                                    you can sell your furniture and buy a new one, Don't be late to get your one,, hurry up...!.
                                </p>
                                    <Link to='/allproducts'>
                                        <button className="bg-gradient-to-r from-purple-400 to-sky-500 px-3 py-2 md:px-4 md:py-3 rounded-md">
                                            Show Products
                                        </button>
                                    </Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        className="lg:h-[500px] bg-cover bg-center bg-no-repeat text-white rounded-xl "
                        style={{
                            backgroundImage: `url(${"https://media.istockphoto.com/id/1372682637/photo/vertical-green-wall-in-a-living-room-interior-3d-render.jpg?b=1&s=170667a&w=0&k=20&c=CUlefMk5zmUocV2UbttUa8J1QLwtt32NW5pyxc6nkTo="})`,
                        }}
                    >
                        <div className="bg-gradient-to-r from-black to-transparent h-full w-full lg:pt-32 p-5 lg:pl-20 rounded-xl">
                            <div>
                                <h1 className="lg:text-5xl text-2xl">
                                   Buy  Used Furniture
                                    <br /> Save your Money
                                </h1>
                                <p className="py-3 text-sm md:text-xl md:w-3/6 ">

                                    we are offering furniture like new in your budget, Don't be late to get your one,, hurry up...!.
                                </p>
                                    <Link to='/allproducts'>
                                        <button className="bg-gradient-to-r from-purple-400 to-sky-500 px-3 py-2 md:px-4 md:py-3 rounded-md">
                                            Show Products
                                        </button>
                                    </Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        className="lg:h-[500px] bg-cover bg-center bg-no-repeat text-white rounded-xl"
                        style={{
                            backgroundImage: `url(${"https://thewowdecor.com/wp-content/uploads/2022/08/Interior.jpg"})`,
                        }}

                    >
                        <div className="bg-gradient-to-r from-black to-transparent h-full w-full lg:pt-32 p-5 lg:pl-20 rounded-xl">
                            <div>
                                <h1 className="lg:text-5xl text-2xl">
                                    We Are Full
                                    <br /> Grab it Quick
                                </h1>
                                <p className="py-3 text-sm md:text-xl md:w-3/6 ">

                                    we are offering huge collection of furniture, Don't be late to get your one,, hurry up...!.
                                </p>
                                    <Link to='/allproducts'>
                                        <button className="bg-gradient-to-r from-purple-400 to-sky-500 px-3 py-2 md:px-4 md:py-3 rounded-md">
                                            Show Products
                                        </button>
                                    </Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        className="lg:h-[500px] bg-cover bg-center bg-no-repeat text-white rounded-xl "
                        style={{
                            backgroundImage: `url(${"https://mir-s3-cdn-cf.behance.net/project_modules/1400/7c669419110043.562d51641213a.jpg"})`,
                        }}
                    >
                        <div className="bg-gradient-to-r from-black to-transparent h-full w-full lg:pt-32 p-5 lg:pl-20 rounded-xl">
                            <div>
                                <h1 className="lg:text-5xl text-2xl">
                                    Chose Your Furniture
                                    <br /> With A Little Cost
                                </h1>
                                <p className="py-3 text-sm md:text-xl md:w-3/6 ">

                                    we are offering furniture like new in your budget, Don't be late to get your one,, hurry up...!.
                                </p>
                                    <Link to='/allproducts'>
                                    <button className="bg-gradient-to-r from-purple-400 to-sky-500 px-3 py-2 md:px-4 md:py-3 rounded-md">
                                       Show Products
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
               </div>
            </Swiper>
        </>
    );
}