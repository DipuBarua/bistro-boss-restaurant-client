import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';
import { VscCommentDiscussion } from "react-icons/vsc";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";

import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'


const Testimonials = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => {
                setReviews(data);
            })
    }, [])
    return (
        <section>
            <SectionTitle
                subHeading={"---What Our Clients Say---"}
                heading={'TESTIMONIALS'}
            ></SectionTitle>

            {/* swiper -- navigation */}
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
            >

                {
                    reviews.map(review => <SwiperSlide key={review._id}>
                        <div className=" mb-16 text-center mx-24 flex flex-col items-center">
                            <VscCommentDiscussion className=" text-7xl text-orange-600 mb-4" />
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />
                            <p className=" p-8">{review.details}</p>
                            <h2 className=" text-2xl font-semibold text-orange-600">{review.name}</h2>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>

        </section>
    );
};

export default Testimonials;