import React, { useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import '../../Assets/css/testimonial.css';
import axios from 'axios'; 

const Testimonial = () => {
    const [testimonials, setTestimonials] = useState([]);

    const options = {
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        items: 1
    };

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await axios.get('/api/testimonials');
                setTestimonials(response.data);
                console.log('Fetched testimonials:', response.data);

            } catch (error) {
                console.error('Error fetching testimonials:', error);
            }
        };

        fetchTestimonials();
    }, []);
    console.log(testimonials)

    return (
        <div className="container-fluid py-5">
            <div className="container py-5">
                <div className="text-center mb-5">
                    <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: '5px' }}>Testimonial</h5>
                    <h1>What Say Our Students</h1>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                    {testimonials.length > 0 ? (
                        <OwlCarousel className="owl-carousel testimonial-carousel" {...options}>
                            {testimonials.map(testimonial => (
                                <div className="text-center" key={testimonial.id}>
                                    <i className="fa fa-3x fa-quote-left text-primary mb-4"></i>
                                    <h4 className="font-weight-normal mb-4">{testimonial.testimonial}</h4>
                                    <h5 className="m-0">{testimonial.username}</h5>
                                    <span>{testimonial.created_at}</span>
                                </div>
                            ))}
                        </OwlCarousel>
                    ) : (
                        <p>No testimonials available.</p>
                    )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;
