import aboutImg from '../../../assets/home/chef-service.jpg'

const About = () => {
    return (
        <div className=' w-full my-16 relative'>
            <img src={aboutImg} alt="" />
            <div className=' bg-white absolute top-1/4 left-1/4 p-16 text-center w-1/2 bg-opacity-80'>
                <h2 className=' text-4xl font-semibold uppercase pb-2'>Bistro Boss</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero accusamus laborum deserunt ratione dolor officiis praesentium! Deserunt magni aperiam dolor eius dolore at, nihil iusto ducimus incidunt quibusdam nemo.</p>
            </div>
        </div>
    );
};

export default About;