import { useState, useEffect } from "react"
import Particles from "./Particles"
import { MessageCircle, Shield, Users, Target, MoveDown } from "lucide-react"
import { useAuth } from "../Context/AuthContext"
const CARD_CONTENT_STYLE = "flex flex-col justify-center h-full";
const ICON_CARD_STYLE =
  "relative flex items-center justify-center p-5 md:p-2 md:h-10 w-fit mx-auto";
const INFO_CARD_STYLE =
  "flex flex-col justify-center md:h-80";

const LandingPage = () => {
  const [visibleSections, setVisibleSections] = useState<number[]>([])
  const [scrollProgress, setScrollProgress] = useState(0)
  const { SignInWithGoogle } = useAuth()
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionIndex = Number.parseInt(entry.target.getAttribute("data-section") || "0")
            setVisibleSections((prev) => [...new Set([...prev, sectionIndex])])
          }
        })
      },
      { threshold: 0.2 },
    )

    const sections = document.querySelectorAll(".journey-section")
    sections.forEach((section) => observer.observe(section))

    window.addEventListener("scroll", handleScroll)
    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const noiseOpacity = Math.max(0, 1 - scrollProgress / 30)
  const clarityOpacity = Math.min(1, scrollProgress / 50)

  return (
    <div className="bg-charcha-bg  text-charcha-text-light min-h-screen overflow-x-hidden flex flex-col">
      <Particles />
      <div className="fixed inset-0 pointer-events-none z-0" style={{ opacity: noiseOpacity }}>
        <div className="absolute top-20 left-10 w-64 h-0.5 bg-gradient-to-r from-transparent via-charcha-text-muted/20 to-transparent animate-noise-1"></div>
        <div className="absolute top-40 right-20 w-96 h-0.5 bg-gradient-to-r from-transparent via-charcha-text-muted/15 to-transparent animate-noise-2"></div>
        <div className="absolute top-60 left-1/4 w-48 h-0.5 bg-gradient-to-r from-transparent via-charcha-text-muted/10 to-transparent animate-noise-3"></div>
        <div
          className="absolute bottom-1/3 right-1/4 w-72 h-0.5 bg-gradient-to-r from-transparent via-charcha-text-muted/20 to-transparent animate-noise-1"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-80 h-0.5 bg-gradient-to-r from-transparent via-charcha-text-muted/12 to-transparent animate-noise-2"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="fixed inset-0 pointer-events-none z-0" style={{ opacity: clarityOpacity }}>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-charcha-purple/5 rounded-full blur-3xl animate-calm-wave"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-charcha-purple/5 rounded-full blur-3xl animate-calm-wave"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* === NAVBAR UPDATED HERE === */}
      <nav className="fixed top-0  left-0 right-0 z-50 bg-charcha-bg/60 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl bg-[#121212] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-24">
            <div className="flex flex-wrap items-center gap-2">
              <MessageCircle size={24} className="text-charcha-purple" />
              <span className="font-bold break-all md:w-fit w-20  text-[17px] md:text-2xl">Charcha Point</span>
            </div>

            <button
              onClick={() => {
                SignInWithGoogle()
              }}
              className="flex center items-center p-1 gap-1 md:gap-2 md:px-4 md:py-3 cursor-pointer bg-[#1E1E1E]  rounded-lg bg-charcha-surface/50 hover:bg-charcha-surface transition-colors duration-300 "
            >
              <img className="h-7" src="https://static.vecteezy.com/system/resources/previews/046/861/647/non_2x/google-logo-transparent-background-free-png.png" />
              <span className="text-sm font-semibold text-charcha-text-light group-hover:text-white transition-colors">
                Continue with Google
              </span>
            </button>
          </div>
        </div>
      </nav>
      {/* Rest of your page content... */}

      <section className="relative min-h-screen flex items-center justify-center px-6 py-16 md:py-20 pt-28 md:pt-32">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold mb-6 md:mb-8 leading-tight animate-glitch">
            Tired of the <span className="text-charcha-text-muted">Shouting?</span>
          </h1>
          <p className="text-base md:text-2xl text-charcha-text-muted leading-relaxed max-w-3xl mx-auto mb-8 md:mb-12 px-4">
            Endless feeds, angry comments, and conversations that go nowhere. Modern social media is a storm of noise.
          </p>
          <p
            className="text-lg md:text-3xl text-charcha-purple font-semibold animate-fadeInUp"
            style={{ animationDelay: "0.5s" }}
          >
            It's time for a change.
          </p>
        </div>
        <div className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 ">
          <p>Scroll Down</p>
          <p className="flex justify-center items-center  animate-UpDown py-4 ">
            <MoveDown />
          </p>
        </div>
      </section>

      <section className="relative min-h-[auto] flex items-center justify-center px-6 py-16 md:py-24">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="mb-8 md:mb-12">
            <div className="inline-block p-3 md:p-4 bg-charcha-purple/10 rounded-2xl mb-4 md:mb-6">
              <MessageCircle className="w-12 h-12 md:w-16 md:h-16 text-charcha-purple" />
            </div>
          </div>
          <h2 className="text-xl sm:text-3xl md:text-7xl font-bold mb-6 md:mb-8 leading-tight">
            Welcome to <span className="text-charcha-purple">Charcha Point.</span>
          </h2>
          <p className="text-base md:text-2xl text-charcha-text-muted leading-relaxed max-w-3xl mx-auto mb-8 md:mb-12">
            A space designed for clarity. We filter out the rage and amplify the reason, so you can focus on discussions
            that truly matter.
          </p>
          <a
            href="#journey"
            onClick={(e) => {
              e.preventDefault()
              const element = document.getElementById("journey")
              element?.scrollIntoView({ behavior: "smooth" })
            }}
            className="bg-charcha-purple hover:bg-purple-600 text-white px-6 py-3 md:px-10 md:py-4 rounded-lg text-base md:text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-charcha-purple/30 inline-block"
          >
            See How It Works
          </a>
        </div>
      </section>

      <section id="journey" className="relative py-16 md:py-32 px-6">
        <div className="max-w-6xl mx-auto mb-12 md:mb-20 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-6xl font-bold mb-4 md:mb-6">
            Your Path to <span className="text-charcha-purple">Clarity</span>
          </h2>
          <p className="text-base md:text-xl text-charcha-text-muted">A journey designed for meaningful connection</p>
        </div>
        <div className="max-w-7xl mx-auto space-y-20 md:space-y-32">
          {/* Step 1 */}
          <div
            className={`journey-section grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 md:h-56 items-center transition-all duration-1000 ${visibleSections.includes(1) ? "opacity-100" : "opacity-0"}`}
            data-section="1"
          >
            {/* Left: Card Logo */}
            <div className={`flex flex-row items-start sm:items-start md:items-center gap-4 md:gap-0 ${CARD_CONTENT_STYLE} w-full md:w-auto`}>
              <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 md:w-32 md:h-32">
                <div className={ICON_CARD_STYLE}>
                  <Target className="w-16 h-16 md:w-32 md:h-32 text-charcha-purple opacity-80" />
                </div>
              </div>
              {/* Right: Step Info (mobile only) */}
              <div className={`flex flex-col md:hidden w-full min-w-0 overflow-hidden ${visibleSections.includes(1) ? "animate-fadeInRight" : ""}`}>
                <div className="inline-block px-3 py-1.5 bg-charcha-purple/10 rounded-full text-charcha-purple font-semibold mb-2">
                  Step 1
                </div>
                <h3 className="text-xl font-bold mb-2 whitespace-normal break-words">Curated Spaces</h3>
                <p className="text-sm text-charcha-text-muted leading-relaxed break-words">
                  Join communities based on interest, not algorithms. Your feed is what you choose it to be. Take control of your experience and connect with topics that inspire you.
                </p>
              </div>
            </div>
            {/* Desktop-only Info (right side) */}
            <div className={`hidden md:flex flex-col justify-center ${INFO_CARD_STYLE} ${visibleSections.includes(1) ? "animate-fadeInRight" : ""}`}>
              <div className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-charcha-purple/10 rounded-full text-charcha-purple font-semibold mb-3 md:mb-4">
                Step 1
              </div>
              <h3 className="text-2xl md:text-5xl font-bold mb-4 md:mb-6 whitespace-normal break-words">Curated Spaces</h3>
              <p className="text-base md:text-xl text-charcha-text-muted leading-relaxed break-words">
                Join communities based on interest, not algorithms. Your feed is what you choose it to be. Take control of your experience and connect with topics that inspire you.
              </p>
            </div>
          </div>

          {/* Step 2 - Shield */}
          <div
            className={`journey-section grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 items-center transition-all duration-1000 ${visibleSections.includes(2) ? "opacity-100" : "opacity-0"}`}
            data-section="2"
          >
            {/* Left side: Card Logo */}
            <div className={`flex flex-row items-start sm:items-start md:items-center gap-4 md:gap-0 order-1 md:order-2 ${CARD_CONTENT_STYLE} w-full md:w-auto`}>
              <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 md:w-32 md:h-32">
                <div className={ICON_CARD_STYLE}>
                  <Shield className="w-16 h-16 md:w-32 md:h-32 text-charcha-purple opacity-80" />
                </div>
              </div>
              {/* Info (mobile only) */}
              <div className={`flex flex-col md:hidden w-full min-w-0 overflow-hidden ${visibleSections.includes(2) ? "animate-fadeInLeft" : ""}`}>
                <div className="inline-block px-3 py-1.5 bg-charcha-purple/10 rounded-full text-charcha-purple font-semibold mb-2">
                  Step 2
                </div>
                <h3 className="text-xl font-bold mb-2 whitespace-normal break-words">Moderated Discussions</h3>
                <p className="text-sm text-charcha-text-muted leading-relaxed break-words">
                  Tools that empower hosts to keep conversations healthy and on-track. Every space has guardrails that ensure respect without stifling free expression.
                </p>
              </div>
            </div>
            {/* Desktop-only Info (right side) */}
            <div className={`hidden md:flex flex-col justify-center ${INFO_CARD_STYLE} order-2 md:order-1 ${visibleSections.includes(2) ? "animate-fadeInLeft" : ""}`}>
              <div className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-charcha-purple/10 rounded-full text-charcha-purple font-semibold mb-3 md:mb-4">
                Step 2
              </div>
              <h3 className="text-2xl md:text-5xl font-bold mb-4 md:mb-6 whitespace-normal break-words">Moderated Discussions</h3>
              <p className="text-base md:text-xl text-charcha-text-muted leading-relaxed break-words">
                Tools that empower hosts to keep conversations healthy and on-track. Every space has guardrails that
                ensure respect without stifling free expression.
              </p>
            </div>
          </div>

          {/* Step 3 - Users */}
          <div
            className={`journey-section grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 items-center transition-all duration-1000 ${visibleSections.includes(3) ? "opacity-100" : "opacity-0"}`}
            data-section="3"
          >
            {/* Left side: Card Logo */}
            <div className={`flex flex-row items-start sm:items-start md:items-center gap-4 md:gap-0 ${CARD_CONTENT_STYLE} w-full md:w-auto`}>
              <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 md:w-32 md:h-32">
                <div className={ICON_CARD_STYLE}>
                  <Users className="w-16 h-16 md:w-32 md:h-32 text-charcha-purple opacity-80" />
                </div>
              </div>
              {/* Info (mobile only) */}
              <div className={`flex flex-col md:hidden w-full min-w-0 overflow-hidden ${visibleSections.includes(3) ? "animate-fadeInRight" : ""}`}>
                <div className="inline-block px-3 py-1.5 bg-charcha-purple/10 rounded-full text-charcha-purple font-semibold mb-2">
                  Step 3
                </div>
                <h3 className="text-xl font-bold mb-2 whitespace-normal break-words">Meaningful Connections</h3>
                <p className="text-sm text-charcha-text-muted leading-relaxed break-words">
                  Connect with people through ideas, not just fleeting trends. Build relationships based on shared values and mutual respect, not viral moments.
                </p>
              </div>
            </div>
            {/* Desktop-only Info (right side) */}
            <div className={`hidden md:flex flex-col justify-center ${INFO_CARD_STYLE} ${visibleSections.includes(3) ? "animate-fadeInRight" : ""}`}>
              <div className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-charcha-purple/10 rounded-full text-charcha-purple font-semibold mb-3 md:mb-4">
                Step 3
              </div>
              <h3 className="text-2xl md:text-5xl font-bold mb-4 md:mb-6 whitespace-normal break-words">Meaningful Connections</h3>
              <p className="text-base md:text-xl text-charcha-text-muted leading-relaxed break-words">
                Connect with people through ideas, not just fleeting trends. Build relationships based on shared values
                and mutual respect, not viral moments.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="z-30  relative bg-[#121212]/75 w-full mt-auto bg-charcha-bg/80 border-t border-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-10 sm:py-14 flex flex-col md:flex-row items-center md:items-start justify-between gap-10 sm:gap-16">
          <div className="flex flex-col items-center md:items-start gap-4 mb-5 md:mb-0">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-7 h-7 text-charcha-purple" />
              <span className="font-bold text-xl text-charcha-text-light">Charcha Point</span>
            </div>
            <p className="text-sm sm:text-base text-charcha-text-muted md:max-w-xs text-center md:text-left">
              A new kind of space for meaningful discussions & clarity, away from the noise of usual social media.
            </p>
          </div>

          {/* Newsletter / Call to action */}
          <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
            <p className="text-base font-semibold text-charcha-text-light mb-1">Get Early Access</p>
            <button
              onClick={() => SignInWithGoogle()}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-charcha-purple text-white font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-charcha-purple transition-all shadow shadow-charcha-purple/25"
            >
              <img className="h-6" src="https://static.vecteezy.com/system/resources/previews/046/861/647/non_2x/google-logo-transparent-background-free-png.png" alt="Google Icon" />
              Join with Google
            </button>
            <p className="text-xs text-charcha-text-muted mt-1">No spam, just an invite to our alpha 🚀</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-4 border-t border-white/5 text-xs text-charcha-text-muted">
          <span className="mb-2 md:mb-0">&copy; {new Date().getFullYear()} Charcha Point. All rights reserved.</span>
          <span>
            Built with <span className="text-charcha-purple">♥</span> for meaningful conversations.
          </span>
        </div>
      </footer >
    </div >
  )
}

export default LandingPage;

