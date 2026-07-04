import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isOverlayHidden, setIsOverlayHidden] = useState(false);
  
  // Aapke total sections/slides ki ginti (E.g., Hero, Couple, Quote, Events, RSVP)
  const totalSlides = 5; 
  const isThrottled = useRef(false);

  // Envelope Open Handler
  const openEnvelope = () => {
    setIsEnvelopeOpen(true);
    setTimeout(() => {
      setIsOverlayHidden(true);
    }, 1200); // Animation ke baad overlay hidden ho jayega
  };

  // Slide change karne ka main logic
  const handleSlideChange = (direction) => {
    if (isThrottled.current) return;
    
    isThrottled.current = true;
    // 800ms ka break taaki ek sath 2-3 slides jump na ho jayein
    setTimeout(() => { isThrottled.current = false; }, 800); 

    setCurrentSlide((prev) => {
      if (direction === 'next') {
        return prev < totalSlides - 1 ? prev + 1 : prev;
      } else {
        return prev > 0 ? prev - 1 : prev;
      }
    });
  };

  // Touch aur Wheel Events Listeners (Sirf tab chalenge jab envelope khul chuka ho)
  useEffect(() => {
    if (!isOverlayHidden) return; // Jab tak lifafa band hai, peeche scroll nahi hoga

    let touchStartX = 0;

    // PC Touchpad / Mouse Wheel Scroll
    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) > 10 || Math.abs(e.deltaX) > 10) {
        if (e.deltaY > 0 || e.deltaX > 0) {
          handleSlideChange('next');
        } else {
          handleSlideChange('prev');
        }
      }
    };

    // Mobile Swipe Gesture Start
    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
    };

    // Mobile Swipe Gesture End
    const handleTouchEnd = (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diffX = touchStartX - touchEndX;

      if (Math.abs(diffX) > 50) { // 50px se zyada swipe karne par hi change hoga
        if (diffX > 0) {
          handleSlideChange('next');
        } else {
          handleSlideChange('prev');
        }
      }
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isOverlayHidden]);

  return (
    <div className="wedding-body">
      
      {/* 1. ENVELOPE OVERLAY */}
      {!isOverlayHidden && (
        <div id="envelope-overlay" className={isEnvelopeOpen ? 'hidden' : ''}>
          <div className={`env-wrap ${isEnvelopeOpen ? 'open' : ''}`}>
            <div className="env-back"></div>
            <div className="env-flap"></div>
            
            {/* Wax Seal Design */}
            <div className="env-seal" onClick={openEnvelope}>
              ⚜️
            </div>
            
            <div className="env-card">
              <p className="eyebrow" style={{color: '#1a3329', marginBottom: '10px'}}>Wedding Invitation</p>
              <button className="open-btn" onClick={openEnvelope}>Open Invitation</button>
            </div>
          </div>
        </div>
      )}

      {/* 2. MAIN HORIZONTAL SLIDES CONTAINER */}
      <div 
        className="main-container" 
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        {/* SLIDE 1: HERO SECTION */}
        <section id="hero">
          <div className="hero-content">
            <div className="bismillah-text">﷽</div>
            <p className="eyebrow">The Wedding Celebration of</p>
            <h1 className="names">
              <span>Zain</span>
              <span className="amp">&</span>
              <span>Ayesha</span>
            </h1>
            <div className="date-pill-container">
              <div className="date-pill">OCTOBER 24, 2026</div>
              <div className="hijri-pill">Rabi' al-Thani 12, 1448</div>
            </div>
            <p className="subtitle">Save The Date</p>
          </div>
        </section>

        {/* SLIDE 2: BRIDE & GROOM DETAILS */}
        <section id="couple">
          <div className="section-inner">
            <h2>The Happy Couple</h2>
            <div className="couple-row">
              <div className="person">
                <div className="avatar">🤵</div>
                <h3>Zain Malik</h3>
                <p className="venue-text" style={{marginTop: '10px'}}>S/o Late Mr. & Mrs. Malik</p>
              </div>
              <span className="amp-big">&</span>
              <div className="person">
                <div className="avatar">👰</div>
                <h3>Ayesha Khan</h3>
                <p className="venue-text" style={{marginTop: '10px'}}>D/o Mr. & Mrs. Khan</p>
              </div>
            </div>
          </div>
        </section>

        {/* SLIDE 3: ISLAMIC QUOTE */}
        <section id="quote">
          <div className="section-inner">
            <div className="divider">
              <div className="line"></div>
              <span className="motif">✨</span>
              <div className="line"></div>
            </div>
            <p className="islamic-quote">
              "And among His Signs is this, that He created for you mates from among yourselves, that ye may dwell in tranquillity with them, and He has put love and mercy between your (hearts)..."
            </p>
            <p className="eyebrow" style={{marginTop: '15px'}}>— Surah Ar-Rum [30:21]</p>
          </div>
        </section>

        {/* SLIDE 4: ITINERARY / EVENTS */}
        <section id="events">
          <div className="section-inner">
            <h2>Wedding Events</h2>
            <div className="events-grid">
              <div className="event-card">
                <div className="icon">💍</div>
                <div className="when">Nikkah Ceremony</div>
                <p className="venue-text">Time: 11:00 AM</p>
                <p className="venue-text">Grand Imperial Hall</p>
              </div>
              <div className="event-card">
                <div className="icon">🍽️</div>
                <div className="when">Valima / Feast</div>
                <p className="venue-text">Time: 08:00 PM</p>
                <p className="venue-text">The Royal Pavilion</p>
              </div>
            </div>
          </div>
        </section>

        {/* SLIDE 5: RSVP FORM */}
        <section id="rsvp">
          <div className="section-inner">
            <h2>Kindly Respond</h2>
            <p className="venue-text">Please let us know if you can make it before October 10th.</p>
            <form className="rsvp-form" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Your Full Name" required />
              <select required>
                <option value="">Will you attend?</option>
                <option value="yes">Yes, gladly accept</option>
                <option value="no">Sorry, cannot attend</option>
              </select>
              <input type="number" placeholder="Number of Guests" min="1" max="10" />
              <button type="submit">Submit RSVP</button>
            </form>
          </div>
        </section>
      </div>

      {/* 3. SIDE NAVIGATION DOTS */}
      <div id="navdots">
        {[...Array(totalSlides)].map((_, index) => (
          <button 
            key={index} 
            className={currentSlide === index ? 'active' : ''} 
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
