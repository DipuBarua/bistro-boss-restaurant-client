import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import slide image 
import slider1 from "../../../assets/home/slide1.jpg"
import slider2 from "../../../assets/home/slide2.jpg"
import slider3 from "../../../assets/home/slide3.jpg"
import slider4 from "../../../assets/home/slide4.jpg"
import slider5 from "../../../assets/home/slide5.jpg"

const Category = () => {
    return (
        <Swiper
            slidesPerView={4}
            spaceBetween={30}
            centeredSlides={true}
            pagination={{
                clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper mb-16"
        >
            <SwiperSlide>
                <img src={slider1} alt="" />
                <h2 className=' uppercase text-3xl text-center -mt-12 text-white'>Salad</h2>
            </SwiperSlide>
            <SwiperSlide>
                <img src={slider2} alt="" />
                <h2 className=' uppercase text-3xl text-center -mt-12 text-white'>Pizza</h2>
            </SwiperSlide>
            <SwiperSlide>
                <img src={slider3} alt="" />
                <h2 className=' uppercase text-3xl text-center -mt-12 text-white'>Soup</h2>
            </SwiperSlide>
            <SwiperSlide>
                <img src={slider4} alt="" />
                <h2 className=' uppercase text-3xl text-center -mt-12 text-white'>Dessert</h2>
            </SwiperSlide>
            <SwiperSlide>
                <img src={slider5} alt="" />
                <h2 className=' uppercase text-3xl text-center -mt-12 text-white'>Salad</h2>
            </SwiperSlide>
        </Swiper>
    );
};

export default Category;