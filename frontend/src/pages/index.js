
import { useEffect, useState, useRef } from "react";

function useAnimateOnScroll() {
  const elementRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        entries[0].target.classList.add('animate');
        observer.unobserve(entries[0].target);
      }
    }, { threshold: 0.5 });
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);
  return elementRef;
}

export async function getServerSideProps() {
  try {
    const res = await fetch("http://localhost:5000/posts");
    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.statusText}`);
    }
    const posts = await res.json();
    return { props: { posts } };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { props: { posts: [] } };
  }
}

export default function Home({ posts: initialPosts }) {
  const [posts, setPosts] = useState(initialPosts);
  const heroRef = useAnimateOnScroll();
  const whyChooseUsRef = useAnimateOnScroll();
  const servicesRef = useAnimateOnScroll();
  const aboutRef = useAnimateOnScroll();
  const contactRef = useAnimateOnScroll();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("http://localhost:5000/posts");
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
    fetchPosts();

    // Add event listener to flip cards on click
    document.querySelectorAll('.flip-card').forEach((card) => {
      card.addEventListener('click', () => {
        card.querySelector('.flip-card-inner').classList.toggle('clicked-flip');
      });
    });

    // Add event listener to flip cards on scroll
    window.addEventListener('scroll', () => {
      document.querySelectorAll('.flip-card').forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          card.querySelector('.flip-card-inner').classList.add('scrolled-flip');
        } else {
          card.querySelector('.flip-card-inner').classList.remove('scrolled-flip');
        }
      });
    });
  }, []);























  return (
    <div className="container">
      <section ref={heroRef} className="hero" id="home">
        <div className="hero-blocks">
          <div className="block block-1"></div>
          <div className="block block-2"></div>
          <div className="block block-3"></div>
          <div className="block block-4"></div>
          <div className="block block-5"></div>
          <div className="block block-6"></div>
          <div className="block block-7"></div>
          <div className="block block-8"></div>
          <div className="block block-9"></div>
          <div className="block block-10"></div>
          <div className="block block-11"></div>
          <div className="block block-12"></div>
          <div className="block block-13"></div>
          <div className="block block-14"></div>
          <div className="block block-15"></div>
          <div className="block block-16"></div>
          <div className="block block-17"></div>
          <div className="block block-18"></div>
          <div className="block block-19"></div>
          <div className="block block-20"></div>
          <div className="block block-21"></div>
        </div>
        <div className="hero-content">
          <h1>Elevate Your Brand with AdGency</h1>
          <p>Innovative marketing solutions that drive real results.</p>
          <button className="get-started-btn">Get Started</button>
        </div>
      </section>
     





<section ref={whyChooseUsRef} className="why-choose-us">
  <div className="why-choose-us-header">
  <h2>Why Should You Choose Us?</h2>
  </div>
  <p>We combine creativity, strategy, and technology to deliver high-impact campaigns.</p>
  <div className="features">
    <div className="feature">
      <h3>Data-Driven Growth</h3>
      <p>We use data to drive growth and improve results.</p>
    </div>
    <div className="feature">
      <h3>Stunning Visuals</h3>
      <p>Our designs are visually stunning and engaging.</p>
    </div>
    <div className="feature">
      <h3>Smart Strategies</h3>
      <p>We develop smart strategies to achieve your goals.</p>
    </div>
  </div>
</section>







<section ref={servicesRef} className="services" id="services">
   <div className="why-choose-us-header">
<h2 className="section-title">What We Offer</h2>

<p className="section-description">Our services include:</p>
</div>
<div className="services-grid">
{[ 
{ title: "Social Media Marketing", desc: "Boost engagement and grow your audience organically.", explanation: "Our social media marketing services help you reach your target audience and increase brand awareness." }, 
{ title: "Web Development", desc: "Building dynamic and responsive web applications with cutting-edge technologies.", explanation: "Our web development services help you create a strong online presence and improve user experience." }, 
{ title: "Brand Identity & Design", desc: "Create a strong, memorable brand with stunning visuals.", explanation: "Our brand identity and design services help you establish a unique and recognizable brand." }, 
{ title: "SEO & Website Optimization", desc: "Improve search rankings and increase visibility.", explanation: "Our SEO and website optimization services help you rank higher in search engines and drive more traffic to your website." }, 
{ title: "Content Creation & Strategy", desc: "Craft compelling content that drives conversions.", explanation: "Our content creation and strategy services help you create content that resonates with your audience and drives results." } 
].map((service, index) => (
<div key={index} className="flip-card">
<div className="flip-card-inner">
<div className="flip-card-front">
<h3>{service.title}</h3>
<p>{service.desc}</p>
</div>
<div className="flip-card-back">
<p>{service.explanation}</p>
</div>
</div>
</div>
))}
</div>
</section>
<section ref={aboutRef} className="about" id="about">
<h2 className="section-title">About AdGency</h2>
<p className="section-description">We are a team of passionate creatives and strategists dedicated to transforming brands.</p>
</section>
<section ref={contactRef} className="contact" id="contact">
<h2>Contact Us</h2>
<form>
<input type="text" placeholder="Your Name" required />
<input type="email" placeholder="Your Email" required />
<textarea placeholder="Your Message" required></textarea>
<button type="submit">Send Message</button>
</form>
</section>
<footer className="footer">
<p> 2025 AdGency </p>
</footer>
</div>
);
}

