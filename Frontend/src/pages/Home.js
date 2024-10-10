import React, { useEffect, useRef, useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import heroVideo from './assets/videos/hero.mp4';
import smallHeroVideo from './assets/videos/smallHero.mp4';
import highlightVideo from './assets/videos/highlight-first.mp4';
import './assets/fonts/sfpro.OTF';

const Home = () => {
  const videoRef = useRef(null);
  const [isLargeDevice, setIsLargeDevice] = useState(window.innerWidth > 768);

  useEffect(() => {
    videoRef.current.play();
    const handleResize = () => {
      setIsLargeDevice(window.innerWidth > 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const video = "https://www.apple.com/105/media/us/home/2023/971ba7eb-fb12-44ed-b3ee-263ba5e5c602/anim/hero/small_2x.mp4";
  const video2 = "https://www.apple.com/105/media/in/iphone-15-pro/2023/2f337511-a940-4b57-b89c-1512b7507777/anim/action-button/large.mp4";

  return (
    <div className='body' style={{ fontFamily: 'sfpro, sans-serif' }}>
      <div className='main'>
        <div className="page">
          <h1>iPhone 15 Pro</h1>
          <video
            type="video/mp4"
            src={isLargeDevice ? heroVideo : smallHeroVideo}
            autoPlay
            loop
            muted
            ref={videoRef}
            className='x'
          />
          <p>The first iPhone with an aerospace‑grade titanium design.</p>
          <p>A17 Pro, a game‑changing chip. A customisable Action button.</p>
          <p>The most powerful iPhone camera system.</p>
          <p style={{ marginBottom: "20px" }}>
            And USB‑C with USB 3 for superfast transfer speeds.*
          </p>
          <div className='buttons'>
            <Link to='/product'>
              <button>View pricing</button>
            </Link>
            <Link to='/mobile/6700ef51322475260b370a67'>
              <button>Learn more</button>
            </Link>
          </div>
          <video
            type="video/mp4"
            src={video}
            autoPlay
            loop
            muted
            ref={videoRef}
            className='y'
          />
        </div>

        <div className="page1"></div>

        <h1 className='hero_h1'>
          iPhone.<br /> Forged in titanium.
        </h1>
        <div className='hero'>
          <video
            type="video/mp4"
            src={video2}
            autoPlay
            loop
            muted
            ref={videoRef}
            style={{ height: "400px", marginTop: "40px" }}
          />
        </div>
      </div>

      <div className='camera'>
        <h1>A camera that captures your <br /> wildest imagination.</h1>
        <p>From dramatic framing flexibility to next-generation portraits, see what you can do with our most powerful iPhone camera system.</p>
        <img src="https://www.apple.com/v/iphone-15-pro/a/images/overview/camera/camera__bo5k5tfk6cmu_large.jpg" alt="" />
      </div>

      <div className='charger'>
        <h1>Gigablast <br></br>your gigabits.</h1>
        <div className='charger_main'>
          <div className='left'>
            <p>iPhone 15 Pro is the first iPhone to support USB 3.5 for <span>huge leaps in data transfer speeds</span> and faster pro workflows than ever before.</p>
            <p>The new USB‑C connector lets you <span>charge your Mac or iPad with the same cable you use to charge iPhone 15 Pro.</span> Bye‑bye, cable clutter.</p>
          </div>
          <div className='right'>
            <p>Up to</p>
            <h2>20x faster</h2>
            <p>file transfers</p>
          </div>        
        </div>
        <video
          type="video/mp4"
          src={highlightVideo}
          autoPlay
          loop
          muted
          ref={videoRef}
          className='xx'
        />
        <img src="https://www.apple.com/in/iphone-15-pro/images/overview/usb-c/usbc__dqdn0phay4mu_large.jpg" alt="" />
      </div>

      <div className='ios'>
        <p className='hh2'>iOS 17</p>
        <p className='hh3'>Style it out. Swap it over. Sticker it up.</p>
        <img src="https://imgix.bustle.com/uploads/image/2023/9/18/aa5662ca-2ace-4906-9bb5-865cc514e9d7-screenshot-2023-09-18-at-123106-pm.png?w=920&h=560&fit=crop&crop=faces&q=50&dpr=2" alt="" className='iosimage'/>
      </div>

      <p className='lastt'>Keep exploring iPhone.</p>
    </div>
  );
};

export default Home;
