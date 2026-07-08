import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import bridePic from './assets/S.png';
import groomPic from './assets/H.png';

// ======================================================================
// WEDDING_DATA — Real Custom Data (Maintained Perfectly)
// ======================================================================
const WEDDING_DATA = {
  bismillah: "﷽",
  bismillah2: "النِّكَاحُ مِنْ سُنَّتِي فَمَنْ لَمْ يَعْمَلْ بِسُنَّتِي فَلَيْسَ مِنِّي",
  tagline: "In the name of Allah, the Most Gracious, the Most Merciful",
  bride: {
    name: "Shahen",
    role: "Aroos (Dulhan)",
    about: "Chai, kitaabein aur apno se ghiri Shahen, jo har khushi ko dil se jeeti hai.",
    photo: bridePic,
  },
  groom: {
    name: "Haider",
    role: "Arees (Dulha)",
    about: "Sapno ka picha karne wale aur parivaar se pyaar karne wale Haider.",
    photo: groomPic,
  },
  weddingDateISO: "2026-10-29T19:00:00",
  weddingDateDisplay: "THURSDAY, 29 OCTOBER 2026",
  hijriDate: "17 Jumada al-Awwal 1448 AH",
  venueCity: "Intezar Garden, Sec-41, Surajkund Badkhal Road, Faridabad, Haryana-121003",
  storyQuote: "“Aur Humne Tumhe Jodiyon Mein Banaya Hai (Quran 78:8) — Do dilon ka milna, do parivaaron ka ek hona, Allah ki barkat se.”",
  events: [
    { title: "Mayun / Haldi", when: "27 Oct, 4:00 PM", where: "Sangam Vihar, New Delhi" },
    { title: "Mehendi Ki Raat", when: "28 Oct, 5:00 PM", where: "Sangam Vihar, New Delhi" },
    { title: "Nikah Ceremony", when: "29 Oct, 8:00 PM", where: "Intezar Garden, Haryana" },
  ],
  gallery: [
    {}, {}, {}, {}
  ],
  whatsappNumber: "918210138609"
};

/* ---------------- Premium Islamic Motif & Divider ---------------- */
function Motif() {
  return (
    <svg viewBox="0 0 64 64" className="motif" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 2l7 12 13-3-4 13 12 7-12 7 4 13-13-3-7 12-7-12-13 3 4-13-12-7 12-7-4-13 13 3Z" stroke="#C9A227" strokeWidth="1.2" />
      <circle cx="32" cy="32" r="4" fill="#C9A227" />
    </svg>
  );
}

function Divider() {
  return (
    <div className="divider">
      <span className="line"></span>
      <Motif />
      <span className="line"></span>
    </div>
  );
}

/* ---------------- Royal Envelope Component ---------------- */
function Envelope({ onOpen }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [petals, setPetals] = useState([]);

  const handleOpen = () => {
    setOpen(true);
    const p = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      dur: 2.5 + Math.random() * 2,
      symbol: ["🌸", "🌹", "🍂"][i % 3]
    }));
    setPetals(p);
    setTimeout(() => { setHidden(true); onOpen(); }, 1200);
  };

  return (
    <React.Fragment>
      {petals.map(p => (
        <div key={p.id} className="petal" style={{ left: p.left + "vw", animationDelay: p.delay + "s", animationDuration: p.dur + "s" }}>{p.symbol}</div>
      ))}
      <div id="envelope-overlay" className={hidden ? "hidden" : ""}>
        <div className={"env-wrap" + (open ? " open" : "")}>
          <div className="env-back"></div>
          <div className="env-card">
            <div className="islamic-top">{WEDDING_DATA.bismillah}</div>
            <div className="eyebrow">The Honour Of Your Presence Is Requested</div>
            <div className="names script">{WEDDING_DATA.bride.name} &amp; {WEDDING_DATA.groom.name}</div>
            <button className="open-btn" onClick={handleOpen}>दावत-नामा खोलें</button>
          </div>
          <div className="env-seal" onClick={handleOpen}>⚜️</div>
          <div className="env-flap"></div>
        </div>
      </div>
    </React.Fragment>
  );
}

/* ---------------- Countdown Hook ---------------- */
function useCountdown(targetISO) {
  const [left, setLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const target = new Date(targetISO).getTime();
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor(diff / 3600000) % 24,
        m: Math.floor(diff / 60000) % 60,
        s: Math.floor(diff / 1000) % 60,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetISO]);
  return left;
}

/* ---------------- Reveal Mock ---------------- */
function Reveal({ children, className = "" }) {
  return <div className={"reveal show " + className}>{children}</div>;
}

/* ---------------- Premium Event Icon ---------------- */
function EventIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.5">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" />
      <path d="M12 6v6l4 2" strokeLinecap="round" />
    </svg>
  );
}

/* ---------------- Real Viewport Height Fix ----------------
   Mobile browsers (jaise Realme X2 ka Chrome) ka address bar
   dikhta/chhupta rehta hai, jisse "100vh" browser ke poore virtual
   viewport ko count karta hai — visible screen se bada. Isse content
   thoda cut hota hai aur scroll bhi apna sahi area match nahi karta.
   Yaha hum window.innerHeight se ek CSS variable set karte hain jo
   hamesha REAL visible height ke barabar rehta hai. */
function useRealViewportHeight() {
  useEffect(() => {
    const setHeight = () => {
      document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
    };
    setHeight();
    window.addEventListener('resize', setHeight);
    window.addEventListener('orientationchange', setHeight);
    // Address bar show/hide par bhi update ho (scroll-triggered resize kuch phones par late aata hai)
    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(setHeight);
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('resize', setHeight);
      window.removeEventListener('orientationchange', setHeight);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
}

/* ---------------- Main App Component ---------------- */
export default function App() {
  useRealViewportHeight();
  const [opened, setOpened] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const cd = useCountdown(WEDDING_DATA.weddingDateISO);
  const isThrottled = useRef(false);
  const currentSlideRef = useRef(currentSlide);
  const sectionsLenRef = useRef(0);

  const sections = [
    { id: "hero", label: "Home" },
    { id: "couple", label: "Couple" },
    { id: "story", label: "Blessings" },
    { id: "events", label: "Events" },
    { id: "rsvp", label: "RSVP" },
  ];

  sectionsLenRef.current = sections.length;

  useEffect(() => {
    currentSlideRef.current = currentSlide;
  }, [currentSlide]);

  const handleSlideChange = (direction) => {
    if (isThrottled.current) return;
    isThrottled.current = true;
    setTimeout(() => { isThrottled.current = false; }, 800);

    setCurrentSlide((prev) => {
      if (direction === 'next') return prev < sectionsLenRef.current - 1 ? prev + 1 : prev;
      return prev > 0 ? prev - 1 : prev;
    });
  };

  const jumpToSlide = (index) => {
    setCurrentSlide(index);
  };

  // ---- SCROLL WHEEL + TOUCH SWIPE -> SLIDE CHANGE (works on PC + phone) ----
  useEffect(() => {
    if (!opened) return;
    let touchStartX = 0;
    let touchStartY = 0;

    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) > 20) {
        e.preventDefault();
        if (e.deltaY > 0) handleSlideChange('next');
        else handleSlideChange('prev');
      }
    };

    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchStartX - touchEndX;
      const diffY = touchStartY - touchEndY;

      // Sirf tab slide badle jab horizontal swipe, vertical scroll se zyada ho
      if (Math.abs(diffX) > 60 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) handleSlideChange('next');
        else handleSlideChange('prev');
      }
    };

    // passive:false zaroori hai taaki preventDefault() kaam kare
    // (isse phone aur PC dono par scroll se slide reliably badalta hai)
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [opened]);

  const [form, setForm] = useState({ name: "", guests: "1", attending: "Ji Haan, zaroor aayenge", message: "" });

  const handleRSVP = (e) => {
    e.preventDefault();
    const text = `Assalamu Alaikum! Main ${form.name} Nikah ke liye RSVP kar raha/rahi hoon.%0AGuests: ${form.guests}%0AAttendance: ${form.attending}%0AMessage: ${form.message}`;
    window.open(`https://wa.me/${WEDDING_DATA.whatsappNumber}?text=${text}`, "_blank");
  };

  return (
    <div className="wedding-body">
      <Envelope onOpen={() => setOpened(true)} />

      {/* MOBILE ONLY TOP TITLE BAR (no hamburger — nav ab neeche bottom bar me hai) */}
      {opened && (
        <div className="mobile-header">
          <div className="mobile-title">{WEDDING_DATA.bride.name} &amp; {WEDDING_DATA.groom.name}</div>
        </div>
      )}

      {/* DUAL WORKSPACE LAYOUT WRAPPER */}
      <div className="app-workspace">

        {/* SIDEBAR NAVIGATION - Desktop par left panel, Mobile par bottom bar. Hamesha visible, click par slide badal jata hai */}
        {opened && (
          <div className="sidebar-menu">
            <div className="sidebar-logo">⚜️</div>
            <nav className="sidebar-nav">
              {sections.map((s, index) => (
                <button
                  key={s.id}
                  className={`nav-item-btn ${currentSlide === index ? 'active' : ''}`}
                  onClick={() => jumpToSlide(index)}
                >
                  <span className="btn-indicator"></span>
                  {s.label}
                </button>
              ))}
            </nav>
            <div className="sidebar-footer">
              <p className="script">{WEDDING_DATA.bride.name[0]} &amp; {WEDDING_DATA.groom.name[0]}</p>
            </div>
          </div>
        )}

        {/* RIGHT CONTENT WORKSPACE - HORIZONTAL SLIDER VIEW */}
        <div className="content-workspace">
          <div
            className="main-container"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {/* HERO SECTION */}
            <section id="hero">
              <div className="hero-content">
                <div className="bismillah-text">{WEDDING_DATA.bismillah}</div>
                <div className="bismillah-text">{WEDDING_DATA.bismillah2}</div>
                <div className="eyebrow">The Celebration of Nikah</div>

                <h1 className="names">
                  <div className="bride-name">{WEDDING_DATA.bride.name}</div>
                  <div className="amp">&amp;</div>
                  <div className="groom-name">{WEDDING_DATA.groom.name}</div>
                </h1>

                <p className="subtitle">{WEDDING_DATA.tagline}</p>

                <div className="date-pill-container">
                  <div className="date-pill">{WEDDING_DATA.weddingDateDisplay}</div>
                  <div className="hijri-pill">{WEDDING_DATA.hijriDate}</div>
                </div>

                <p className="venue-text">📍 {WEDDING_DATA.venueCity}</p>

                <div id="countdown">
                  <div className="cd-box"><div className="num">{cd.d}</div><div className="lbl">Ayyam (Days)</div></div>
                  <div className="cd-box"><div className="num">{cd.h}</div><div className="lbl">Sa'at (Hours)</div></div>
                  <div className="cd-box"><div className="num">{cd.m}</div><div className="lbl">Daqiqe (Mins)</div></div>
                  <div className="cd-box"><div className="num">{cd.s}</div><div className="lbl">Saniye (Secs)</div></div>
                </div>
              </div>
            </section>

            {/* COUPLE SECTION */}
            <section id="couple">
              <Reveal className="section-inner center">
                <div className="eyebrow">The Blessed Couple</div>
                <h2>Aroos &amp; Arees</h2>
                <div className="couple-row">
                  <div className="person">
                    <div className="avatar">
                      {WEDDING_DATA.bride.photo
                        ? <img src={WEDDING_DATA.bride.photo} alt={WEDDING_DATA.bride.name} />
                        : WEDDING_DATA.bride.name[0]}
                    </div>
                    <h3>{WEDDING_DATA.bride.name}</h3>
                    <div className="role">{WEDDING_DATA.bride.role}</div>
                    <p>{WEDDING_DATA.bride.about}</p>
                  </div>

                  <div className="amp-big">&amp;</div>

                  <div className="person">
                    <div className="avatar">
                      {WEDDING_DATA.groom.photo
                        ? <img src={WEDDING_DATA.groom.photo} alt={WEDDING_DATA.groom.name} />
                        : WEDDING_DATA.groom.name[0]}
                    </div>
                    <h3>{WEDDING_DATA.groom.name}</h3>
                    <div className="role">{WEDDING_DATA.groom.role}</div>
                    <p>{WEDDING_DATA.groom.about}</p>
                  </div>
                </div>
              </Reveal>
            </section>

            {/* QUOTE SECTION */}
            <section id="story">
              <Reveal className="section-inner">
                <Divider />
                <blockquote className="islamic-quote">{WEDDING_DATA.storyQuote}</blockquote>
                <Divider />
              </Reveal>
            </section>

            {/* EVENTS SECTION */}
            <section id="events">
              <Reveal className="section-inner center">
                <div className="eyebrow">Save The Date</div>
                <h2>Program / Itinerary</h2>
                <div className="events-grid">
                  {WEDDING_DATA.events.map((ev, i) => (
                    <div className="event-card" key={i}>
                      <EventIcon />
                      <h3>{ev.title}</h3>
                      <div className="when">{ev.when}</div>
                      <div className="where">📍 {ev.where}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </section>

            {/* RSVP SECTION */}
            <section id="rsvp">
              <Reveal className="section-inner center">
                <div className="eyebrow">Join Us In Our Prayers</div>
                <h2>RSVP / Istigbal</h2>
                <p className="lead">Aapki shirkat aur duaein hamare naye safar ki barkat hain.</p>
                <form className="rsvp-form" onSubmit={handleRSVP}>
                  <input required placeholder="Aapka Ism-e-Girami (Full Name)" value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })} />
                  <input type="number" min="1" placeholder="Mehmano ki sankhya (No. of Guests)" value={form.guests}
                    onChange={e => setForm({ ...form, guests: e.target.value })} />
                  <select value={form.attending} onChange={e => setForm({ ...form, attending: e.target.value })}>
                    <option style={{ color: '#fff', background: '#1c352d' }}>Ji Haan, zaroor aayenge</option>
                    <option style={{ color: '#fff', background: '#1c352d' }}>Maaf kijiye, nahi aa paenge</option>
                  </select>
                  <textarea placeholder="Dulha-Dulhan ke liye Dua / Sandesh (Optional)" value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}></textarea>
                  <button type="submit">WhatsApp par Ittila karein</button>
                </form>
              </Reveal>
            </section>
          </div>
        </div>

      </div>

      {/* TRACKING NAV DOTS AT CENTER BOTTOM OF CONTENT */}
      {opened && (
        <div id="navdots">
          {sections.map((s, index) => (
            <button
              key={s.id}
              className={currentSlide === index ? "active" : ""}
              onClick={() => setCurrentSlide(index)}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
}
