import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Typed from 'typed.js';
import TopCourseList from "./TopCourseList";
import Features from "./Features";
import FooterSlider from "./FooterSlider";
import Team from "./Team.";
import Testimonial from "./Testimonial";
import ScheduleAndNotice from "./ScheduleAndNotice";
function Home() {
    useEffect(() => {
        const greetUser = () => {
            const welcomeText = "नमस्कार, डृष्टी कम्प्यूटर सेंटर में आपका स्वागत है। हम आपकी उज्जवल भविष्य की कामना करते हैं।";
            // Check if browser supports Web Speech API
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(welcomeText);
                utterance.lang = 'hi-IN';
                window.speechSynthesis.speak(utterance);
            } else {
                // Web Speech API is not supported
                console.error("Text-to-speech is not supported in your browser.");
            }
        };
        greetUser();
    }, []); // Run only once on component mount
    const navigate = useNavigate();
    const aToken = localStorage.getItem('aToken');

    const toggleFullScreen = () => {
        const handleFullscreen = () => {
            const element = document.documentElement; // You can change this to any specific element
            if (!document.fullscreenElement) {
                requestFullscreen(element);
            } else {
                exitFullscreen();
            }
        }
    };
    useEffect(() => {
        if (aToken) {
            navigate('/Admin-Pannel');
        }
    }, [])
    useEffect(() => {
        const typed = new Typed('#element', {
            strings: ['<span className="hideFont">“<b style="color:red !important;">Drishtee </b> envisions a world where all communities are empowered to achieve shared prosperity.”</span>'],
            typeSpeed: 55,
            loop: true,
        });
        return () => {
            typed.destroy();
        };
    }, []);

    // ---------------------Dynamic Carousel -----------------------
    const images = ['images/mainSlider/join.png', 'images/mainSlider/we.png'];
    return (
        <div id="Home" >
            <button onClick={toggleFullScreen} style={{display:'hidden'}}>full Screen</button>
            <button
                className="btn btn-primary fixed btn-lg fw-semibold d-flex align-items-center position-fixed end-0 bottom-0 m-4"
                onClick={() => window.location.href = 'tel:+91991815032'}
                style={{ zIndex: 2, background: '#34d2ff' }}
            >
                <i className="fas fa-phone-alt me-2"></i> Call Us
            </button>
            <div id="carouselExampleAutoplaying" className="carousel slide carousel-fade" style={{ marginTop: '4.5rem' }} data-bs-ride="carousel">
                <div className="carousel-inner MainCarousel">
                    {images.map((image, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <img src={image} className="d-block w-100" alt={`Slide ${index + 1}`} />
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <TopCourseList />
            <Team />
            <Testimonial />
            <ScheduleAndNotice />
            <Features />
            <FooterSlider />
        </div>
    );
}
export default Home;
