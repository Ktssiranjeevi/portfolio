import { useState, useEffect, useRef } from 'react'
import type { Page } from '../App'
const heroBg = '/assets/home/Frame_2__1_.png'
const avatarImg = '/assets/home/yr6yr6yr6ys_1.png'

interface HomeProps {
  onNavigate: (page: Page) => void
}

// ===== REVEAL HOOK =====

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}


// ===== DATA =====

// ===== HERO SECTION =====

function HeroSection() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    let frameId = 0

    const updateHeroEffect = () => {
      const hero = document.getElementById('hero-section')
      if (!hero) return

      const nextProgress = Math.min(1, Math.max(0, window.scrollY / hero.offsetHeight))
      setScrollProgress(nextProgress)
    }

    const scheduleUpdate = () => {
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(updateHeroEffect)
    }

    updateHeroEffect()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('touchmove', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('touchmove', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [])

  return (
    <section
      id="hero-section"
      className="relative w-full"
      style={{ paddingTop: '64px', aspectRatio: '1920 / 979' }}
    >
      <img
        src={heroBg}
        alt="UI/UX Designer, Graphic Design, Video Editing and 3D Modeling â€” portfolio overview"
        className="left-0 w-full h-auto block will-change-transform"
        style={{
          position: 'sticky',
          top: '64px',
          filter: `blur(${scrollProgress * 7}px)`,
          opacity: 1 - scrollProgress,
          transform: `scale(${1 - scrollProgress * 0.1})`,
          transformOrigin: 'center top',
        }}
      />
    </section>
  )
}

// ===== ABOUT SECTION =====

function AboutSection() {
  const { ref, visible } = useReveal()

  const skills = [
    "UI/UX Design", "Wireframing", "Prototyping", "Design Systems",
    "Front-End Dev", "HTML / CSS / JS", "React", "Tailwind CSS",
    "Adobe Photoshop", "Illustrator", "After Effects", "Premiere Pro",
    "Motion Graphics", "Video Editing", "Branding", "AI-assisted Design",
  ]

  return (
    <section id="about" className="py-20 md:py-28 text-[#F5F5F5]" style={{ backgroundColor: '#1B1C1E' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div
          ref={ref}
          className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-start transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* RIGHT â€” info */}
          <div className="lg:col-start-2">
            <div
              className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3"
              style={{
                background: 'rgba(193,250,90,0.08)',
                color: '#C1FA5A',
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              About Me
            </div>

            <h2
              className="font-black mb-5 leading-tight"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                color: '#F5F5F5',
              }}
            >
              Designing Experiences
              <br />
              <span style={{ color: '#C1FA5A' }}>That Actually Work</span>
            </h2>

            <p className="text-base leading-relaxed mb-4" style={{ color: '#C1C3C7' }}>
              I'm a <strong style={{ color: '#F5F5F5' }}>UI/UX Designer at Signals & Systems India Pvt. Ltd. (SANDS)</strong>,
              where I design B2B websites, web applications, dashboards, CRM systems, and mobile
              interfaces. My process bridges research and aesthetics â€” I obsess over user flows as
              much as pixel precision.
            </p>
            <p className="text-base leading-relaxed mb-6" style={{ color: '#C1C3C7' }}>
              Beyond UX, I bring cross-disciplinary depth: Graphic Design, Front-End Development
              (HTML, CSS, JavaScript), Video Editing, Motion Graphics, Branding, and AI-assisted
              design workflows. I believe great digital products are built at the intersection of
              empathy, craft, and code.
            </p>

            {/* Personal statement */}
            <blockquote
              className="border-l-4 pl-4 py-2 mb-6 italic"
              style={{ borderColor: '#C1FA5A', color: '#C1FA5A', fontFamily: "'Outfit', sans-serif", fontSize: '0.95rem' }}
            >
              "Creating intuitive, user-centered digital experiences is not just my job â€” it's how I
              think about the world."
            </blockquote>

            {/* Skills chips */}
            <div className="flex flex-wrap gap-2 mb-8">
              {skills.map(skill => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{
                    background: 'rgba(193,250,90,0.08)',
                    color: '#C1FA5A',
                    border: '1px solid rgba(193,250,90,0.2)',
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Education */}
            <div className="py-2">
              <h3
                className="text-sm font-bold uppercase tracking-widest mb-2"
                style={{ color: '#C1FA5A', fontFamily: "'Outfit', sans-serif" }}
              >
                Education
              </h3>
              <p
                className="font-semibold text-sm"
                style={{ color: '#F5F5F5', fontFamily: "'Outfit', sans-serif" }}
              >
                B.E. in Automobile Engineering
              </p>
              <p className="text-xs mt-0.5" style={{ color: '#C1C3C7' }}>
                Anna University · Chennai, India · 2015–2019
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ===== EXPERIENCE SECTION =====

const career = [
  {
    company: "Signals & Systems India Private Limited",
    short: "Signals & Systems",
    role: "UX/UI Designer",
    dates: "July 2023 â€“ Present",
    location: "Chennai, India",
    summary: "Designed and enhanced digital products across web applications, mobile apps, CRM systems, and industrial monitoring platforms. Focused on simplifying complex workflows, improving usability, and supporting business growth through user-centered design.",
    projects: [
      { name: "Sands Connect", dates: "May 2024 â€“ Present", description: "Designed a digital product experience focused on clear navigation, structured information, and efficient user interactions.", role: "UX Research Â· UI Design Â· Prototyping" },
      { name: "Sands India", dates: "July 2023 â€“ Present", description: "Enhanced the company website experience through stronger content presentation, visual hierarchy, and usability.", role: "Website UX Â· UI Design Â· Optimization" },
      { name: "ARGUS Mobile App", dates: "March 2024 â€“ May 2024", description: "Designed an accessible mobile interface for industrial monitoring and sensor analytics.", role: "Mobile UX/UI Â· Data Visualization" },
      { name: "ARGUS Dashboard", dates: "January 2024 â€“ March 2024", description: "Improved dashboard navigation and organized sensor information for more efficient monitoring workflows.", role: "Dashboard UX/UI Â· Interaction Design" },
      { name: "CMRI Mobile App", dates: "November 2023 â€“ January 2024", description: "Focused on clear information, intuitive navigation, and accessible mobile interactions.", role: "Mobile UI Design Â· Prototyping" },
      { name: "CMRI", dates: "September 2023 â€“ November 2023", description: "Designed application interfaces with structured information and consistent layouts.", role: "UX/UI Design Â· Wireframing" },
      { name: "ELMS", dates: "July 2023 â€“ September 2023", description: "Contributed organized layouts, clear navigation, and a consistent application interface.", role: "UX/UI Design Â· Interface Design" },
    ],
    contributions: ["Designed a CRM platform to organize lead follow-ups and reduce missed opportunities.", "Led a WordPress to HTML website transformation, contributing to a reported 40% increase in lead conversions.", "Partnered with technical, management, marketing, and CRM teams to gather feedback and deliver improvements."],
  },
  {
    company: "Precise3DM Digital Manufacturing Solutions",
    short: "Precise3DM",
    role: "UX/UI Designer",
    dates: "February 2022 â€“ July 2023",
    location: "Chennai, India",
    summary: "Designed digital platforms and e-commerce experiences to simplify service management, improve customer access, and support online business growth.",
    projects: [
      { name: "Convert Scan to CAD", dates: "July 2022 â€“ July 2023", description: "Shaped a digital service experience for scan-to-CAD conversion, making service information easier to find and understand.", role: "UX/UI Design Â· Web Experience" },
      { name: "Precise3DM", dates: "January 2022 â€“ July 2023", description: "Designed an e-commerce website for 3D modelling services, with improved service discovery, content hierarchy, forms, and blog experience.", role: "UX/UI Design Â· E-commerce Â· Web Design" },
      { name: "Graft3D", dates: "October 2022 â€“ July 2023", description: "Designed an e-commerce experience to make 3D-printed body parts easier to access and purchase.", role: "UX/UI Design Â· E-commerce" },
      { name: "Wildplant", dates: "November 2022 â€“ January 2023", description: "Project listed in the resume; a detailed overview and specific responsibilities were not provided.", role: "UX/UI Designer" },
    ],
    contributions: ["Designed a managed service platform for workflow, timing, and payment management.", "Improved website content hierarchy and introduced forms and a blog, contributing to a reported lead-conversion improvement of more than 10%.", "Created digital experiences that made services easier for customers to discover and access."],
  },
  {
    company: "Zealous Services",
    short: "Zealous Services",
    role: "Graphic Designer",
    dates: "January 2021 â€“ November 2021",
    location: "Chennai, India",
    summary: "Created visual communication materials and promotional content to support branding and marketing activities.",
    projects: [],
    contributions: ["Designed social media posts and banners to strengthen brand engagement.", "Edited promotional and informational videos with Adobe Premiere Pro and After Effects.", "Collaborated with marketing teams on visual content aligned with brand strategies."],
  },
]

function ExperienceSection() {
  const [selected, setSelected] = useState(0)
  const company = career[selected]

  return (
    <section id="experience" className="py-20 md:py-28 text-[#F5F5F5]" style={{ background: '#1B1C1E' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="mb-12">
          <div className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3" style={{ background: 'rgba(193,250,90,0.08)', color: '#C1FA5A', fontFamily: "'Outfit', sans-serif" }}>Career</div>
          <h2 className="font-black leading-tight" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: '#F5F5F5' }}>My Experience</h2>
        </div>

        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-12 items-start">
          <div>
            <div role="tablist" aria-label="Companies" className="flex flex-wrap gap-2 mb-8">
              {career.map((item, index) => (
                <button key={item.company} role="tab" aria-selected={selected === index} onClick={() => setSelected(index)} className="px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors" style={{ background: selected === index ? '#C1FA5A' : 'transparent', color: selected === index ? '#1B1C1E' : '#F5F5F5', border: selected === index ? '1px solid #C1FA5A' : '1px solid rgba(245,245,245,0.22)', fontFamily: "'Outfit', sans-serif" }}>{item.short}</button>
              ))}
            </div>
            <div className="flex flex-col items-center justify-center text-center p-8 mb-5" style={{ minHeight: 210 }}>
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold mb-3" style={{ background: '#C1FA5A', color: '#1B1C1E', fontFamily: "'Outfit', sans-serif" }}>{company.short.split(' ').map(part => part[0]).join('').slice(0, 2)}</div>
              <h3 className="font-bold text-lg" style={{ color: '#F5F5F5', fontFamily: "'Outfit', sans-serif" }}>{company.company}</h3>
              <p className="mt-1 text-sm" style={{ color: '#C1C3C7' }}>{company.role} Â· {company.dates}</p>
            </div>
            <div className="py-2">
              <p className="text-sm leading-relaxed" style={{ color: '#F5F5F5' }}>{company.summary}</p>
              <h4 className="mt-5 mb-3 text-xs font-bold uppercase tracking-wider" style={{ color: '#C1FA5A', fontFamily: "'Outfit', sans-serif" }}>Key contributions</h4>
              <ul className="space-y-2">{company.contributions.map(item => <li key={item} className="flex gap-2 text-sm leading-relaxed" style={{ color: '#F5F5F5' }}><span style={{ color: '#C1FA5A' }}>â€¢</span><span>{item}</span></li>)}</ul>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between gap-4 mb-7">
              <div><p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#C1C3C7' }}>Experience timeline</p><h3 className="font-bold text-xl mt-1" style={{ color: '#F5F5F5', fontFamily: "'Outfit', sans-serif" }}>{company.role}</h3></div>
              <span className="text-xs px-3 py-1.5 rounded-full shrink-0" style={{ background: 'transparent', color: '#C1FA5A', border: '1px solid rgba(193,250,90,0.35)' }}>{company.location}</span>
            </div>
            {company.projects.length ? <div className="space-y-0">{company.projects.map((project, index) => (
              <article key={project.name} className="relative pl-7 pb-6 last:pb-0">
                {index < company.projects.length - 1 && <span className="absolute left-[7px] top-3 bottom-0 w-px" style={{ background: 'rgba(245,245,245,0.22)' }} />}
                <span className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-[3px] bg-[#1B1C1E]" style={{ borderColor: '#C1FA5A' }} />
                <div className="flex flex-wrap justify-between gap-x-4 gap-y-1"><h4 className="font-bold" style={{ color: '#F5F5F5', fontFamily: "'Outfit', sans-serif" }}>{project.name}</h4><span className="text-xs" style={{ color: '#C1C3C7' }}>{project.dates}</span></div>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: '#F5F5F5' }}>{project.description}</p>
                <p className="mt-2 text-xs font-semibold" style={{ color: '#C1FA5A' }}>Role: {project.role}</p>
              </article>
            ))}</div> : <p className="text-sm leading-relaxed" style={{ color: '#F5F5F5' }}>Branding and marketing work supporting the companyâ€™s visual communications.</p>}
          </div>
        </div>
      </div>
    </section>
  )
}

// ===== CONTACT SECTION =====

function ContactSection() {
  const { ref, visible } = useReveal()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  const socials = [
    { label: "LinkedIn", icon: "in", url: "#", color: "#0A66C2", bg: "#E8F0FB" },
    { label: "Behance", icon: "BÄ“", url: "#", color: "#1769FF", bg: "#E8F0FF" },
    { label: "GitHub", icon: "GH", url: "#", color: "#24292E", bg: "#F0F0F0" },
    { label: "Instagram", icon: "IG", url: "#", color: "#E1306C", bg: "#FCE8F0" },
  ]

  return (
    <section
      id="contact"
      className="py-20 md:py-28"
      style={{ background: 'linear-gradient(180deg, #1B1C1E 0%, #27292C 100%)', color: '#F5F5F5' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div
          ref={ref}
          className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Section header */}
          <div className="text-center mb-14">
            <div
              className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4"
              style={{ background: 'rgba(193,250,90,0.1)', color: '#C1FA5A', fontFamily: "'Outfit', sans-serif" }}
            >
              Get In Touch
            </div>
            <h2
              className="font-black"
              style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: '#F5F5F5' }}
            >
              Let's Work{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #C1FA5A, #FF6B6B)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Together
              </span>
            </h2>
            <p
              className="mt-3 max-w-md mx-auto text-sm"
              style={{ color: '#C1C3C7', fontFamily: "'Inter', sans-serif" }}
            >
              Have a project in mind? I'd love to hear about it. Let's create something amazing.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            {/* LEFT â€” contact info */}
            <div>
              <h3
                className="text-lg font-bold mb-6"
                style={{ color: '#F5F5F5', fontFamily: "'Outfit', sans-serif" }}
              >
                Contact Information
              </h3>

              <div className="space-y-4 mb-8">
                {[
                  { icon: "âœ‰ï¸", label: "Email", value: "arjunmehta.design@gmail.com" },
                  { icon: "ðŸ“±", label: "Phone", value: "+91 98765 43210" },
                  { icon: "ðŸ“", label: "Location", value: "India (Open to Remote)" },
                ].map(item => (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 p-4 rounded-xl"
                    style={{ background: 'transparent', border: 'none' }}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <p
                        className="text-xs mb-0.5"
                        style={{ color: '#C1C3C7', fontFamily: "'Inter', sans-serif" }}
                      >
                        {item.label}
                      </p>
                      <p
                        className="text-sm font-medium"
                        style={{ color: '#F5F5F5', fontFamily: "'Inter', sans-serif" }}
                      >
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <h3
                className="text-sm font-bold mb-4"
                style={{ color: '#F5F5F5', fontFamily: "'Outfit', sans-serif" }}
              >
                Find Me Online
              </h3>
              <div className="flex flex-wrap gap-3">
                {socials.map(s => (
                  <a
                    key={s.label}
                    href={s.url}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-transform hover:-translate-y-1"
                    style={{
                      background: 'transparent',
                      color: '#F5F5F5',
                      border: '1px solid rgba(245,245,245,0.22)',
                      fontFamily: "'Outfit', sans-serif",
                    }}
                  >
                    <span className="font-bold text-xs">{s.icon}</span>
                    {s.label}
                  </a>
                ))}
              </div>

              {/* Availability sticky note */}
              <div
                className="mt-8 p-4 rounded-xl anim-wiggle"
                style={{ background: 'transparent', transform: 'rotate(-1.5deg)' }}
              >
                <p
                  className="text-sm font-semibold"
                  style={{ color: '#C1FA5A', fontFamily: "'Outfit', sans-serif" }}
                >
                  ðŸ“… Currently Available
                </p>
                <p className="text-xs mt-1" style={{ color: '#F5F5F5' }}>
                  Open to full-time roles & freelance projects
                </p>
              </div>
            </div>

            {/* RIGHT â€” contact form */}
            <div
              className="p-6 md:p-8"
            >
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <div className="text-5xl mb-4">ðŸŽ‰</div>
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{ color: '#F5F5F5', fontFamily: "'Outfit', sans-serif" }}
                  >
                    Message Sent!
                  </h3>
                  <p className="text-sm" style={{ color: '#C1C3C7' }}>
                    Thank you for reaching out. I'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-xs font-semibold mb-1.5"
                        style={{ color: '#F5F5F5', fontFamily: "'Outfit', sans-serif" }}
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="John Doe"
                        className="form-input w-full px-4 py-2.5 text-sm"
                        style={{ color: '#F5F5F5', background: 'transparent', borderColor: 'rgba(245,245,245,0.3)' }}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-xs font-semibold mb-1.5"
                        style={{ color: '#F5F5F5', fontFamily: "'Outfit', sans-serif" }}
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="john@company.com"
                        className="form-input w-full px-4 py-2.5 text-sm"
                        style={{ color: '#F5F5F5', background: 'transparent', borderColor: 'rgba(245,245,245,0.3)' }}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      className="block text-xs font-semibold mb-1.5"
                      style={{ color: '#F5F5F5', fontFamily: "'Outfit', sans-serif" }}
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={form.subject}
                      onChange={e => setForm({ ...form, subject: e.target.value })}
                      placeholder="Project Inquiry / Collaboration"
                      className="form-input w-full px-4 py-2.5 text-sm"
                      style={{ color: '#F5F5F5', background: 'transparent', borderColor: 'rgba(245,245,245,0.3)' }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs font-semibold mb-1.5"
                      style={{ color: '#F5F5F5', fontFamily: "'Outfit', sans-serif" }}
                    >
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell me about your project..."
                      className="form-input w-full px-4 py-2.5 text-sm resize-none"
                      style={{ color: '#F5F5F5', background: 'transparent', borderColor: 'rgba(245,245,245,0.3)' }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-full text-sm btn-primary"
                  >
                    Send Message â†’
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ===== FOOTER =====

function Footer({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <footer
      className="py-10"
      style={{ background: '#1A1A2E', color: 'white' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 group"
            aria-label="Go to home page"
          >
            <img src="/assets/Logos/Mylogo.png" alt="Portfolio logo" className="h-[50px] w-auto transition-transform duration-200 group-hover:scale-105" />
          </button>

          {/* Nav links */}
          <div className="flex items-center gap-6 text-sm" style={{ color: '#9CA3AF', fontFamily: "'Outfit', sans-serif" }}>
            <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">Home</button>
            <button onClick={() => onNavigate('projects')} className="hover:text-white transition-colors">Projects</button>
            <button
              onClick={() => {
                onNavigate('home')
                setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100)
              }}
              className="hover:text-white transition-colors"
            >
              About
            </button>
            <button
              onClick={() => {
                onNavigate('home')
                setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100)
              }}
              className="hover:text-white transition-colors"
            >
              Contact
            </button>
          </div>

          {/* Copyright */}
          <p className="text-xs" style={{ color: '#6B7280', fontFamily: "'Inter', sans-serif" }}>
            Â© 2024 Arjun Mehta. Crafted with ðŸ’œ
          </p>
        </div>
      </div>
    </footer>
  )
}

// ===== HOME PAGE =====

export default function Home({ onNavigate }: HomeProps) {
  const avatarRef = useRef<HTMLImageElement>(null)

  // avatar scroll state: leftPx=null â†’ CSS centred, number â†’ px from left
  const [avatar, setAvatar] = useState<{
    leftPx: number | null
    position: 'fixed' | 'absolute'
    topPx: number | null
    scale: number
  }>({ leftPx: null, position: 'fixed', topPx: null, scale: 1 })

  useEffect(() => {
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - Math.min(1, t), 3)

    let frameId = 0

    const update = () => {
      const heroEl  = document.getElementById('hero-section')
      const aboutEl = document.getElementById('about')
      const imgEl   = avatarRef.current
      if (!heroEl || !imgEl) return

      const scrollY = window.scrollY
      const heroH = heroEl.offsetHeight
      const avatarW = imgEl.offsetWidth
      const viewportWidth = window.innerWidth

      const centeredLeft = (viewportWidth - avatarW) / 2
      const aboutLeft = Math.max(24, viewportWidth * 0.25 - avatarW / 2)
      const aboutScale = viewportWidth >= 1600 ? 1.10 : 1.2

      const aboutBottom = aboutEl ? aboutEl.offsetTop + aboutEl.offsetHeight : heroH
      const progress = easeOutCubic(scrollY / heroH)
      const inHero = scrollY > 0 && scrollY < heroH

      setAvatar({
        leftPx: scrollY <= 0 ? null : inHero
          ? centeredLeft + (aboutLeft - centeredLeft) * progress
          : aboutLeft,
        position: inHero || scrollY <= 0 ? 'fixed' : 'absolute',
        topPx: inHero || scrollY <= 0 ? null : aboutBottom - imgEl.offsetHeight * aboutScale,
        scale: 1 + progress * (aboutScale - 1),
      })
      // â”€â”€ Phase 1: slide left while scrolling through hero â”€â”€

      // â”€â”€ Phase 2: stay fixed on the left through most of About â”€â”€

      // â”€â”€ Phase 3: travel out with the final part of About â”€â”€
    }

    const scheduleUpdate = () => {
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('touchmove', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    // re-run once the avatar image has loaded so offsetWidth is available
    const t = setTimeout(scheduleUpdate, 120)
    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('touchmove', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      clearTimeout(t)
    }
  }, [])

  return (
    <main style={{ position: 'relative' }}>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ContactSection />
      <Footer onNavigate={onNavigate} />

      {/* â”€â”€ Scroll-driven avatar overlay â”€â”€ */}
      <img
        ref={avatarRef}
          src={avatarImg}
          alt="Anime-style portrait of the designer"
          style={{
            position: avatar.position,
            bottom: avatar.position === 'fixed' ? 0 : undefined,
            top: avatar.position === 'absolute' ? `${avatar.topPx}px` : 'auto',
            left:      avatar.leftPx !== null ? `${avatar.leftPx}px` : '50%',
            transform: avatar.leftPx !== null
              ? `scale(${avatar.scale})`
              : `translateX(-50%) scale(${avatar.scale})`,
            transformOrigin: 'bottom center',
            width:     'auto',
            pointerEvents: 'none',
            zIndex: 40,
            // only transition opacity â€” left/transform are driven frame-by-frame
          }}
          className="hero-avatar"
      />
    </main>
  )
}
