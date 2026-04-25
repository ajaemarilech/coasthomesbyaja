/* global React, ReactDOM */
const { useState, useEffect, useRef, useMemo } = React;

/* =========================================================
   Icons
   ========================================================= */
const Icon = {
  arrow: () => <span className="arrow" aria-hidden>→</span>,
  check: (p) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <path d="M2 7.5L5.5 11L12 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  checkLg: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M5 12.5L10 17.5L19 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  star: () => <svg width="12" height="12" viewBox="0 0 12 12"><path fill="currentColor" d="M6 0l1.8 3.9L12 4.5l-3 2.9.8 4.1L6 9.6l-3.7 1.9L3 7.4 0 4.5l4.2-.6z"/></svg>,
  menu: () => (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <path d="M0 1h16M0 6h16M0 11h16" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  ),
};

/* =========================================================
   Nav
   ========================================================= */
function Nav({ onOpenWizard }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 60);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <a href="#top" className="nav__brand">
        <img src="assets/logo-left.png" alt="Coast Homes by Aja" />
      </a>
      <nav className="nav__links">
        <a href="#concierge">Services</a>
        <a href="#about">About Aja</a>
        <a href="#places">Lifestyle</a>
        <a href="#guides">Guides</a>
        <a href="#blog">Blog</a>
        <a href="#faq">FAQ</a>
      </nav>
      <div className="nav__cta">
        <span className="nav__phone">San Diego Realtor + Concierge</span>
        <button className="nav__btn" onClick={onOpenWizard}>Start my search</button>
        <button className="nav__menu-btn" aria-label="Menu"><Icon.menu /> Menu</button>
      </div>
    </header>
  );
}

/* =========================================================
   Hero (parallax, video-like)
   ========================================================= */
function Hero({ onOpenWizard }) {
  const bgRef = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (bgRef.current) {
        bgRef.current.style.setProperty("--pY", `${y * 0.35}px`);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <section className="hero" id="top" data-screen-label="01 Hero">
      <div
        ref={bgRef}
        className="hero__bg"
        style={{ backgroundImage: "url(assets/coast-aerial.jpg)" }}
      />
      <div className="hero__grain" />
      <div className="hero__content">
        <div className="hero__top">
          <span className="eyebrow">San Diego Realtor · Est. 2011</span>
          <span className="hero__loc">
            33.0370° N, 117.2920° W
            <small>Encinitas · San Diego · Nationwide</small>
          </span>
        </div>

        <div className="hero__headline">
          <h1>
            A home<br/>
            that fits the <em>life</em><br/>
            you're moving toward.
          </h1>
          <p>
            I'm Aja Lechowicz — San Diego Realtor and Real Estate Concierge. I list and sell across San Diego County directly, and for moves anywhere else in the U.S., I handpick the agent I'd personally call.
          </p>
        </div>

        <div className="hero__bottom">
          <div className="hero__quick">
            <div className="hero__quick-item">
              <span className="n">14+</span>
              <span className="l">Years selling San Diego</span>
            </div>
            <div className="hero__quick-item">
              <span className="n">300+</span>
              <span className="l">Families placed</span>
            </div>
            <div className="hero__quick-item">
              <span className="n">50</span>
              <span className="l">States in network</span>
            </div>
          </div>
          <div className="hero__scroll">
            <span>Scroll</span>
            <span className="line" />
          </div>
        </div>
      </div>

    </section>
  );
}



/* =========================================================
   Trust bar
   ========================================================= */
function TrustBar() {
  const items = [
    ["$240M+", "In San Diego closings"],
    ["4.98 ★", "Average client rating"],
    ["14 yrs", "Active on the coast"],
    ["$0", "Cost for referral introduction"],
  ];
  return (
    <div className="trust">
      <div className="container">
        <div className="trust__inner">
          {items.map(([n, l]) => (
            <div key={l} className="trust__item">
              <span className="n serif">{n}</span>
              <span className="l">{l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   Marquee
   ========================================================= */
function Marquee() {
  const words = ["Encinitas", "Cardiff", "Leucadia", "Del Mar", "Solana Beach", "La Jolla", "Carlsbad", "Oceanside"];
  return (
    <div className="marquee">
      <div className="marquee__track">
        {[0,1].map(i => (
          <span key={i}>{words.map(w => <span key={w}>{w}</span>)}</span>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   Concierge pitch
   ========================================================= */
function Concierge({ onOpenWizard }) {
  const steps = [
    ["01", "Tell me about your move", "Where you're heading, timeline, and what a great home feels like to you."],
    ["02", "San Diego? I'm your Realtor.", "I list and sell on the coast directly — in person, hands-on, from first showing to closing keys."],
    ["03", "Anywhere else? I'm your Concierge.", "I handpick the agent I'd personally call — and stay in the loop the whole way. No lead farms, ever."],
  ];
  return (
    <section className="section" id="concierge" data-screen-label="02 Concierge">
      <div className="container">
        <div className="concierge">
          <div className="concierge__media reveal">
            <img src="assets/hero-stairs.jpg" alt="Steps down to the Pacific" />
            <div className="concierge__media-overlay">
              <span className="concierge__feature-mark">Realtor · Concierge · DRE #01918735</span>
              <h3 className="concierge__feature-big">
                Your agent.<br/>Your <em>advocate</em>.
              </h3>
              <div className="concierge__feature-meta">
                <div>
                  <span className="n serif">$0</span>
                  <span className="l">To be introduced</span>
                </div>
                <div>
                  <span className="n serif">50</span>
                  <span className="l">States covered</span>
                </div>
              </div>
            </div>
          </div>
          <div className="concierge__copy reveal">
            <span className="eyebrow">Two ways I can help you</span>
            <h2>
              Your San Diego<br/>
              <em>Realtor</em>. Your national<br/>
              Concierge.
            </h2>
            <p>
              If you're buying or selling in San Diego County, I'm your Realtor — licensed, local, and genuinely invested.
            </p>
            <p>
              Moving somewhere else in the U.S.? That's the Concierge service — I match you with the agent I'd call myself, at no cost to you.
            </p>
            <div className="concierge__steps">
              {steps.map(([n, h, p]) => (
                <div key={n} className="concierge__step">
                  <span className="n serif">{n}</span>
                  <div>
                    <h4>{h}</h4>
                    <p>{p}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="actions">
              <button className="btn btn--primary" onClick={onOpenWizard}>
                Start the intake <Icon.arrow />
              </button>
              <a className="btn btn--ghost" href="#about">Meet Aja first</a>
            </div>
            <p className="concierge__readmore">
              Curious how it works? <a href="post.html?slug=how-the-relocation-concierge-actually-works">Read the full step-by-step →</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   Meet Aja
   ========================================================= */
function MeetAja() {
  return (
    <section className="section section--alt" id="about" data-screen-label="03 About">
      <div className="container">
        <div className="meet">
          <div className="meet__copy reveal">
            <span className="eyebrow">San Diego Realtor · DRE #01918735</span>
            <h2>Aja<br/><em>Lechowicz</em></h2>
            <blockquote>
              "You already know what you want. You just need someone who knows how to get it."
            </blockquote>
            <p>
              Buying or selling a home is one of the biggest moves you'll make — and the difference between a smooth close and a stressful one usually comes down to who's in your corner.
            </p>
            <p>
              Fourteen years selling in Southern California means you don't have to figure it out the hard way. You bring the vision. I bring the market knowledge, the network, and the straight talk.
            </p>
          </div>
          <div className="meet__media reveal">
            <img src="assets/aja-headshot.png" alt="Aja Lechowicz" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   Lifestyle / Places
   ========================================================= */
function Places() {
  const places = [
    { img: "coast-aerial.jpg", name: "Encinitas", meta: "92024 · Coastal", slug: "encinitas" },
    { img: "home-modern.jpg", name: "Cardiff", meta: "92007 · Hillside", slug: "cardiff" },
    { img: "surfer.jpg", name: "Leucadia", meta: "92024 · Surf town", slug: "leucadia" },
    { img: "home-pool.jpg", name: "Del Mar", meta: "92014 · Clifftop", slug: "del-mar" },
    { img: "home-exterior.jpg", name: "Solana Beach", meta: "92075 · Walkable", slug: "solana-beach" },
    { img: "neighborhood.jpg", name: "La Jolla", meta: "92037 · Coastal luxury", slug: "la-jolla" },
    { img: "home-interior.jpg", name: "Carlsbad", meta: "92008 · Family", slug: "carlsbad" },
    { img: "coast-sunset.jpg", name: "Oceanside", meta: "92054 · Pier + sand", slug: "oceanside" },
  ];
  return (
    <section className="section" id="places" data-screen-label="04 Places">
      <div className="container">
        <div className="section__head reveal">
          <span className="eyebrow">Where the coast meets home</span>
          <div>
            <h2>The coast,<br/><em>block by block.</em></h2>
          </div>
        </div>
        <div className="places reveal">
          {places.map((p) => (
            <a key={p.name} className="place" href={`neighborhood.html?slug=${p.slug}`}>
              <img src={`assets/${p.img}`} alt={p.name} />
              <div className="place__label">
                <h3>{p.name}</h3>
                <span className="meta">{p.meta}</span>
              </div>
              <span className="place__go">Explore →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   Wizard (primary conversion)
   ========================================================= */
function Wizard({ mode = "inline", onClose }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});

  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));

  const steps = [
    {
      label: "01 / 05 · Intent",
      q: "What brings you to the coast?",
      type: "options",
      key: "intent",
      options: [
        ["Buying a home", "A"],
        ["Selling a home", "B"],
        ["Both — selling here, buying there", "C"],
        ["Just exploring, not ready yet", "D"],
      ],
    },
    {
      label: "02 / 05 · Where",
      q: "Where's the move?",
      type: "options",
      key: "where",
      options: [
        ["In San Diego — let's work together", "A"],
        ["Leaving San Diego for somewhere in the U.S.", "B"],
        ["Moving to San Diego from elsewhere", "C"],
        ["Somewhere else entirely — I need a Realtor intro", "D"],
      ],
    },
    {
      label: "03 / 05 · Timing",
      q: "When do you want this to happen?",
      type: "options",
      key: "timing",
      options: [
        ["In the next 30 days", "A"],
        ["Within 3 months", "B"],
        ["Within 6 months", "C"],
        ["Sometime this year", "D"],
        ["Still figuring it out", "E"],
      ],
    },
    {
      label: "04 / 05 · Range",
      q: "Rough price range you're working with?",
      type: "options",
      key: "range",
      options: [
        ["$500K – $1M", "A"],
        ["$1M – $2M", "B"],
        ["$2M – $4M", "C"],
        ["$4M+", "D"],
        ["Selling — not sure yet", "—"],
      ],
    },
    {
      label: "05 / 05 · You",
      q: "Where should I send your plan?",
      type: "fields",
      key: "contact",
    },
  ];

  const isLast = step === steps.length - 1;
  const current = steps[step];

  const canAdvance = useMemo(() => {
    if (current.type === "options") return !!data[current.key];
    if (current.type === "fields") {
      const c = data.contact || {};
      return c.name && c.email;
    }
    return false;
  }, [current, data]);

  const [submitting, setSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState(null);

  const next = async () => {
    if (!canAdvance) return;
    if (isLast) {
      setSubmitting(true);
      setSubmitError(null);
      try {
        const payload = {
          intent: data.intent,
          where: data.where,
          timing: data.timing,
          range: data.range,
          name: data.contact?.name,
          email: data.contact?.email,
          phone: data.contact?.phone || "",
          message: data.contact?.note || "",
        };
        const res = await fetch("https://formspree.io/f/xdaywppb", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          setStep(steps.length);
        } else {
          setSubmitError("Something went wrong — please try again or email me directly.");
        }
      } catch (e) {
        setSubmitError("Couldn't send — please check your connection and try again.");
      } finally {
        setSubmitting(false);
      }
    } else {
      setStep(step + 1);
    }
  };
  const back = () => setStep(Math.max(0, step - 1));

  const done = step >= steps.length;

  return (
    <section className="section wizard" id="wizard" data-screen-label="05 Wizard">
      <div className="wizard__bg" />
      <div className="container">
        <div className="wizard__inner">
          <div className="wizard__copy reveal">
            <span className="eyebrow" style={{color: "var(--accent-2)"}}>Realtor + Concierge · 2 min</span>
            <h2>Two minutes. A <em>real plan</em> back from a real person.</h2>
            <p>
              Fill this out and I'll personally read it tonight. You'll get a
              short reply from me within 24 hours — not an automated drip, not a
              round-robin lead pool. Just a next step.
            </p>
            <ul className="wizard__bullets">
              {[
                "I only introduce you when the fit is right",
                "Your details never touch a lead marketplace",
                "My network exists so you always have the right person in your corner",
                "The introduction itself is always complimentary to you",
              ].map((t) => (
                <li key={t}><Icon.check /> {t}</li>
              ))}
            </ul>
          </div>

          <div className="wizard__form reveal">
            <div className="wizard__progress">
              {steps.map((s, i) => (
                <span
                  key={i}
                  className={step > i ? "done" : step === i ? "active" : ""}
                />
              ))}
            </div>

            {!done ? (
              <>
                <div className="wizard__step-label">{current.label}</div>
                <h3 className="wizard__q">{current.q}</h3>

                {current.type === "options" && (
                  <div className="wizard__options">
                    {current.options.map(([label, k]) => {
                      const selected = data[current.key] === label;
                      return (
                        <button
                          key={label}
                          className={`wizard__opt ${selected ? "selected" : ""}`}
                          onClick={() => {
                            set(current.key, label);
                            // auto-advance after a beat
                            setTimeout(() => {
                              if (step < steps.length - 1) setStep(step + 1);
                            }, 280);
                          }}
                        >
                          <span>{label}</span>
                          <span className="k">{k}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {current.type === "fields" && (
                  <div>
                    <div className="wizard__row">
                      <div className="wizard__field">
                        <label>Name</label>
                        <input
                          type="text"
                          placeholder="Aja Lechowicz"
                          value={(data.contact || {}).name || ""}
                          onChange={(e) => set("contact", { ...(data.contact || {}), name: e.target.value })}
                        />
                      </div>
                      <div className="wizard__field">
                        <label>Phone (optional)</label>
                        <input
                          type="tel"
                          placeholder="(555) 555-5555"
                          value={(data.contact || {}).phone || ""}
                          onChange={(e) => set("contact", { ...(data.contact || {}), phone: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="wizard__field">
                      <label>Email</label>
                      <input
                        type="email"
                        placeholder="you@domain.com"
                        value={(data.contact || {}).email || ""}
                        onChange={(e) => set("contact", { ...(data.contact || {}), email: e.target.value })}
                      />
                    </div>
                    <div className="wizard__field">
                      <label>Anything I should know?</label>
                      <textarea
                        placeholder="Neighborhoods on your list, what you're moving away from, who the move is for…"
                        value={(data.contact || {}).note || ""}
                        onChange={(e) => set("contact", { ...(data.contact || {}), note: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                <div className="wizard__nav">
                  <button
                    className="wizard__back"
                    onClick={back}
                    style={{ visibility: step === 0 ? "hidden" : "visible" }}
                  >
                    ← Back
                  </button>
                  <button
                    className="wizard__next"
                    onClick={next}
                    disabled={!canAdvance}
                  >
                    {isLast ? (submitting ? "Sending…" : "Send to Aja") : "Continue"} <Icon.arrow />
                  </button>
                  {submitError && <p style={{color:"var(--accent-1,#e05)",marginTop:"8px",fontSize:"13px"}}>{submitError}</p>}
                </div>
              </>
            ) : (
              <div className="wizard__done">
                <div className="check"><Icon.checkLg /></div>
                <h3>Thank you, {(data.contact || {}).name?.split(" ")[0] || "friend"}.</h3>
                <p>
                  I've got your note. You'll hear back from me within
                  24 hours at {(data.contact || {}).email || "your email"} —
                  a short, human reply with a next step.
                </p>
                <div className="echo">
                  {data.intent || "—"} · {data.where || "—"} · {data.timing || "—"}
                </div>
                <button
                  type="button"
                  className="wizard__btn"
                  style={{marginTop: 24}}
                  onClick={() => { setStep(0); setData({}); }}
                >
                  Start over
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   Guides (secondary lead magnets)
   ========================================================= */
function Guides() {
  return (
    <section className="section" id="guides" data-screen-label="06 Guides">
      <div className="container">
        <div className="section__head reveal">
          <span className="eyebrow">Free guides</span>
          <div>
            <h2>Not ready to talk?<br/>Start with the <em>reading</em>.</h2>
          </div>
        </div>
        <div className="guides">
          <div className="guide reveal" style={{ animationDelay: "0.1s" }}>
            <img src="assets/coast-sunset.jpg" alt="Encinitas Guide" />
            <div className="guide__body">
              <span className="kicker">Guide · 48 pages</span>
              <h3>The Encinitas Local's Guide</h3>
              <p>Skip the tourist version. This is what living here actually looks like.</p>
              <a className="cta" href="encinitas-guide.html">Read the guide →</a>
            </div>
          </div>
          <div className="guide reveal" style={{ animationDelay: "0.2s" }}>
            <img src="assets/home-interior.jpg" alt="Relocation Guide" />
            <div className="guide__body">
              <span className="kicker">Guide · 32 pages</span>
              <h3>The Lifestyle Relocation Guide</h3>
              <p>A workbook to figure out exactly where in the U.S. your dream lifestyle actually exists.</p>
              <a className="cta" href="relocation-workbook.html">Read the guide →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   Testimonials
   ========================================================= */
function Testimonials() {
  const tsts = [
    {
      q: "Aja didn't just sell our house — she coached us through a move to North Carolina and handed us off to the realtor who found our next home. Zero friction.",
      n: "Sarah & Dan K.",
      w: "Cardiff → North Carolina",
    },
    {
      q: "Anyone can pull a listing. Aja told us which Leucadia streets get the real ocean breeze and which ones don't — that's the thing you can't Google.",
      n: "Marcus W.",
      w: "Leucadia, CA",
    },
    {
      q: "We closed at $40K over ask in six days. What made the difference was the prep work — Aja was two steps ahead of us the whole time.",
      n: "The Rivera Family",
      w: "Encinitas, CA",
    },
  ];
  return (
    <section className="section section--tight" data-screen-label="08 Testimonials">
      <div className="container">
        <div className="section__head reveal">
          <span className="eyebrow">Words from the last 12 months</span>
          <div>
            <h2>The <em>receipts</em>.</h2>
          </div>
        </div>
      </div>
      <div className="testimonials reveal">
        {tsts.map((t) => (
          <div key={t.n} className="tst">
            <div className="tst__stars">
              {[...Array(5)].map((_,i) => <Icon.star key={i} />)}
            </div>
            <p className="tst__quote">"{t.q}"</p>
            <div className="tst__who">
              <span className="name">{t.n}</span>
              <span className="where">{t.w}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   Blog (latest posts on homepage)
   ========================================================= */
function Blog() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("blog/posts.json")
      .then(r => r.json())
      .then(d => setPosts(d.posts || []))
      .catch(() => setPosts([]));
  }, []);
  if (!posts.length) return null;
  const featured = posts.find(p => p.featured) || posts[0];
  const rest = posts.filter(p => p.slug !== featured.slug).slice(0, 3);
  const fmtDate = (s) => {
    const d = new Date(s);
    return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };
  return (
    <section className="section" id="blog" data-screen-label="07 Blog">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">Journal</span>
          <div>
            <h2>From the <em>desk</em>.</h2>
            <p>Market reads, neighborhood walks, and the conversations I have with clients before we tour anything. <a href="blog.html" className="head-link">All posts →</a></p>
          </div>
        </div>
        <div className="blog-grid">
          <a className="blog-feat" href={`post.html?slug=${featured.slug}`}>
            <div className="blog-feat__media">
              <img src={`assets/${featured.image}`} alt={featured.title} />
            </div>
            <div className="blog-feat__body">
              <span className="kicker">{featured.kicker} · {fmtDate(featured.date)}</span>
              <h3>{featured.title}</h3>
              <p>{featured.excerpt}</p>
              <span className="cta">Read the post <span className="arr">→</span></span>
            </div>
          </a>
          <div className="blog-list">
            {rest.map(p => (
              <a key={p.slug} className="blog-card" href={`post.html?slug=${p.slug}`}>
                <div className="blog-card__media">
                  <img src={`assets/${p.image}`} alt={p.title} />
                </div>
                <div className="blog-card__body">
                  <span className="kicker">{p.kicker}</span>
                  <h4>{p.title}</h4>
                  <span className="meta">{fmtDate(p.date)} · {p.readTime} min read</span>
                </div>
              </a>
            ))}
          </div>
        </div>
        <div className="blog-allcta">
          <a className="btn btn--ghost" href="blog.html">Read every post <Icon.arrow /></a>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FAQ
   ========================================================= */
function FAQ() {
  const [open, setOpen] = useState(0);
  const items = [
    ["If I'm buying or selling in San Diego, do I work with you directly?", "Yes — me and my team will help you, right here in San Diego."],
    ["Is the concierge service really free?", "Yes. The concierge introduction is always complimentary to you — when I match you to a Realtor, that Realtor compensates me. You'll never see a bill from me for an introduction."],
    ["Why don't you just give me a list of agents?", "Because a list is what Google does. I do the part Google can't — knowing which person on that list is the right one for you, today, in this market."],
    ["Will you share my info with a network of agents?", "Never. No lead marketplace, no bidding. Your details stay between you, me, and the single Realtor I introduce you to after we talk."],
    ["What if the Realtor you match me with isn't a fit?", "Tell me. I'll find you someone else — no awkwardness. My reputation rides on the match more than theirs does."],
  ];
  return (
    <section className="section" id="faq" data-screen-label="09 FAQ">
      <div className="container">
        <div className="section__head reveal">
          <span className="eyebrow">Frequently asked</span>
          <div>
            <h2>The honest <em>answers</em>.</h2>
          </div>
        </div>
        <div className="faq reveal">
          {items.map(([q, a], i) => (
            <div
              key={q}
              className={`faq__item ${open === i ? "open" : ""}`}
              onClick={() => setOpen(open === i ? -1 : i)}
            >
              <div className="faq__q">
                <span>{q}</span>
                <span className="faq__plus" />
              </div>
              <div className="faq__a">{a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   Final CTA
   ========================================================= */
function FinalCTA({ onOpenWizard }) {
  const bgRef = useRef(null);
  useEffect(() => {
    const on = () => {
      if (!bgRef.current) return;
      const r = bgRef.current.getBoundingClientRect();
      const y = (window.innerHeight - r.top) * 0.1;
      bgRef.current.style.setProperty("--pY", `${y}px`);
    };
    window.addEventListener("scroll", on, { passive: true });
    on();
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <section className="finalcta" data-screen-label="10 Final CTA">
      <div
        ref={bgRef}
        className="finalcta__bg"
        style={{ backgroundImage: "url(assets/coast-cliffs.jpg)" }}
      />
      <div>
        <span className="eyebrow" style={{color: "rgba(255,255,255,.85)"}}>Your next move</span>
        <h2>Find the home.<br/>Love the <em>life</em>.</h2>
        <p>You already know what you want. Let's make it happen.</p>
        <button className="btn btn--light" onClick={onOpenWizard}>
          Start my search <Icon.arrow />
        </button>
      </div>
    </section>
  );
}

/* =========================================================
   Footer
   ========================================================= */
function Footer() {
  return (
    <footer className="foot">
      <div className="foot__grid">
        <div className="foot__brand">
          <img src="assets/logo-full.png" alt="Coast Homes by Aja" />
          <p>A real estate concierge service based in San Diego. Serving the California coast directly, and the rest of the country through a hand-curated Realtor network.</p>
          <p style={{fontSize: 13, opacity: .7}}>Realtor® · DRE #01918735 · Equal Housing Opportunity</p>
        </div>
        <div className="foot__col">
          <h4>Services</h4>
          <a href="#concierge">Concierge</a>
          <a href="#wizard">Buy with Aja</a>
          <a href="#wizard">Sell with Aja</a>
          <a href="https://thecoastconcepts.com" target="_blank" rel="noopener noreferrer">Vacation rentals ↗</a>
        </div>
        <div className="foot__col">
          <h4>Explore</h4>
          <a href="#about">About Aja</a>
          <a href="#places">Neighborhoods</a>
          <a href="#guides">Free guides</a>
          <a href="blog.html">Blog</a>
        </div>
        <div className="foot__col">
          <h4>Get in touch</h4>
          <a href="mailto:Aja@coasthomesbyaja.com">Aja@coasthomesbyaja.com</a>
          <a href="tel:+13237919587">(323) 791-9587</a>
          <a href="https://www.instagram.com/guidedhomebyaja" target="_blank" rel="noopener">Instagram</a>
          <a href="https://calendly.com/coasthomes/discoverycall" target="_blank" rel="noopener">Book a call</a>
        </div>
      </div>
      <div className="foot__sub">
        <span>© 2026 Coast Homes by Aja</span>
        <span>Designed on the coast · Made with care</span>
      </div>
    </footer>
  );
}

/* =========================================================
   Sticky CTA + Tweaks
   ========================================================= */
function StickyCTA({ onOpenWizard }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const on = () => setVisible(window.scrollY > 900 && window.scrollY < document.body.scrollHeight - window.innerHeight - 400);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <button className={`stickycta ${visible ? "visible" : ""}`} onClick={onOpenWizard}>
      <span className="dot" /> Get started · 2 min <Icon.arrow />
    </button>
  );
}

/* =========================================================
   Reveal on scroll
   ========================================================= */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    // Fire immediately for anything already in the viewport on mount
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        el.classList.add("in");
      }
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -5% 0px" });
    els.forEach((el) => { if (!el.classList.contains("in")) io.observe(el); });
    return () => io.disconnect();
  }, []);
}

/* =========================================================
   App
   ========================================================= */
function App() {
  useReveal();

  const openWizard = () => {
    const el = document.getElementById("wizard");
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <Nav onOpenWizard={openWizard} />
      <Hero onOpenWizard={openWizard} />
      <TrustBar />
      <Marquee />
      <Concierge onOpenWizard={openWizard} />
      <MeetAja />
      <Places />
      <Wizard onOpenWizard={openWizard} />
      <Guides />
      <Blog />
      <Testimonials />
      <FAQ />
      <FinalCTA onOpenWizard={openWizard} />
      <Footer />
      <StickyCTA onOpenWizard={openWizard} />
    </>
  );
}

Object.assign(window, { App });
