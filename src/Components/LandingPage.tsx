import { useState, useEffect } from 'react';
import Particles from './Particles';
import { MessageCircle, Shield, Users, Target, MoveDown } from 'lucide-react';
import { useAuth } from '../Context/AuthContext';

const LandingPage = () => {
  const [visibleSections, setVisibleSections] = useState<number[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { SignInWithGoogle } = useAuth()
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionIndex = parseInt(entry.target.getAttribute('data-section') || '0');
            setVisibleSections((prev) => [...new Set([...prev, sectionIndex])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const sections = document.querySelectorAll('.journey-section');
    sections.forEach((section) => observer.observe(section));

    window.addEventListener('scroll', handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const noiseOpacity = Math.max(0, 1 - scrollProgress / 30);
  const clarityOpacity = Math.min(1, scrollProgress / 50);

  return (
    <div className="bg-charcha-bg cursor-none text-charcha-text-light min-h-screen overflow-x-hidden">


      <Particles />
      <div className="fixed inset-0 pointer-events-none z-0" style={{ opacity: noiseOpacity }}>
        <div className="absolute top-20 left-10 w-64 h-0.5 bg-gradient-to-r from-transparent via-charcha-text-muted/20 to-transparent animate-noise-1"></div>
        <div className="absolute top-40 right-20 w-96 h-0.5 bg-gradient-to-r from-transparent via-charcha-text-muted/15 to-transparent animate-noise-2"></div>
        <div className="absolute top-60 left-1/4 w-48 h-0.5 bg-gradient-to-r from-transparent via-charcha-text-muted/10 to-transparent animate-noise-3"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-0.5 bg-gradient-to-r from-transparent via-charcha-text-muted/20 to-transparent animate-noise-1" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-0.5 bg-gradient-to-r from-transparent via-charcha-text-muted/12 to-transparent animate-noise-2" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="fixed inset-0 pointer-events-none z-0" style={{ opacity: clarityOpacity }}>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-charcha-purple/5 rounded-full blur-3xl animate-calm-wave"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-charcha-purple/5 rounded-full blur-3xl animate-calm-wave" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* === NAVBAR UPDATED HERE === */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-charcha-bg/60 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            <div className="flex items-center gap-2">
              <MessageCircle size={30} className="text-charcha-purple" />
              <span className="font-bold text-2xl">Charcha Point</span>
            </div>

            <button
              onClick={() => { SignInWithGoogle() }}
              className="flex items-center gap-3 px-4 py-3 cursor-pointer bg-[#1E1E1E]  rounded-lg bg-charcha-surface/50 hover:bg-charcha-surface transition-colors duration-300 group"
            >
              <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M47.532 24.5528C47.532 22.9214 47.388 21.3623 47.088 19.88H24.5V28.9H37.428C36.852 31.8411 35.136 34.2651 32.7 35.8872V42.21H41.088C45.168 38.3377 47.532 31.9628 47.532 24.5528Z" fill="#4285F4" />
                <path d="M24.5 48.0001C31.068 48.0001 36.564 45.7223 41.088 42.21L32.7 35.8872C30.336 37.4377 27.576 38.3377 24.5 38.3377C18.288 38.3377 13.068 34.1209 11.232 28.5H2.592V34.9928C7.032 42.9223 15.18 48.0001 24.5 48.0001Z" fill="#34A853" />
                <path d="M11.232 28.5C10.74 27.0128 10.452 25.4377 10.452 23.7928C10.452 22.1479 10.74 20.5728 11.232 19.0856V12.5928H2.592C0.971998 15.7979 0 19.6428 0 23.7928C0 27.9428 0.971998 31.7877 2.592 34.9928L11.232 28.5Z" fill="#FBBC05" />
                <path d="M24.5 9.24792C28.008 9.24792 31.32 10.4579 33.78 12.8328L41.328 5.28564C36.54 0.971924 30.972 0 24.5 0C15.18 0 7.032 5.07771 2.592 12.5928L11.232 19.0856C13.068 13.4656 18.288 9.24792 24.5 9.24792Z" fill="#EA4335" />
              </svg>
              <span className="text-sm font-semibold text-charcha-text-light group-hover:text-white transition-colors">
                Continue with Google
              </span>
            </button>
          </div>
        </div>
      </nav>
      {/* Rest of your page content... */}

      <section className="relative min-h-screen flex items-center justify-center px-6 py-20 pt-32">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight animate-glitch">
            Tired of the <span className="text-charcha-text-muted">Shouting?</span>
          </h1>
          <p className="text-lg md:text-2xl text-charcha-text-muted leading-relaxed max-w-3xl mx-auto mb-12 px-4">
            Endless feeds, angry comments, and conversations that go nowhere. Modern social media is a storm of noise.
          </p>
          <p className="text-xl md:text-3xl text-charcha-purple font-semibold animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
            It's time for a change.
          </p>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 ">
          <p>Scroll Down</p>
          <p className='flex justify-center items-center  animate-UpDown py-4 '><MoveDown /></p>
        </div>
      </section>

      <section className="relative min-h-screen flex items-center justify-center px-6 py-24">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="mb-12">
            <div className="inline-block p-4 bg-charcha-purple/10 rounded-2xl mb-6">
              <MessageCircle className="w-16 h-16 text-charcha-purple" />
            </div>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Welcome to <span className="text-charcha-purple">Charcha Point.</span>
          </h2>
          <p className="text-xl md:text-2xl text-charcha-text-muted leading-relaxed max-w-3xl mx-auto mb-12">
            A space designed for clarity. We filter out the rage and amplify the reason, so you can focus on discussions that truly matter.
          </p>
          <a
            href="#journey"
            onClick={e => {
              e.preventDefault();
              const element = document.getElementById('journey');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-charcha-purple hover:bg-purple-600 text-white px-10 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-charcha-purple/30 inline-block"
          > 
            See How It Works
          </a>
        </div>
      </section>

      <section id="journey" className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto mb-20 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Your Path to <span className="text-charcha-purple">Clarity</span></h2>
          <p className="text-xl text-charcha-text-muted">A journey designed for meaningful connection</p>
        </div>
        <div className="max-w-7xl mx-auto space-y-32">
          <div
            className={`journey-section grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${visibleSections.includes(1) ? 'opacity-100' : 'opacity-0'}`}
            data-section="1"
          >
            <div className={`${visibleSections.includes(1) ? 'animate-fadeInLeft' : ''}`}>
              <div className="relative">
                <div className="absolute inset-0 bg-charcha-purple/20 rounded-3xl blur-2xl"></div>
                <div className="relative bg-charcha-surface border border-charcha-border rounded-3xl p-12 flex items-center justify-center h-80">
                  <Target className="w-32 h-32 text-charcha-purple opacity-80" />
                </div>
              </div>
            </div>
            <div className={`${visibleSections.includes(1) ? 'animate-fadeInRight' : ''}`}>
              <div className="inline-block px-4 py-2 bg-charcha-purple/10 rounded-full text-charcha-purple font-semibold mb-4">
                Step 1
              </div>
              <h3 className="text-3xl md:text-5xl font-bold mb-6">Curated Spaces</h3>
              <p className="text-lg md:text-xl text-charcha-text-muted leading-relaxed">
                Join communities based on interest, not algorithms. Your feed is what you choose it to be. Take control of your experience and connect with topics that inspire you.
              </p>
            </div>
          </div>
          <div
            className={`journey-section grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${visibleSections.includes(2) ? 'opacity-100' : 'opacity-0'}`}
            data-section="2"
          >
            <div className={`order-2 md:order-1 ${visibleSections.includes(2) ? 'animate-fadeInLeft' : ''}`}>
              <div className="inline-block px-4 py-2 bg-charcha-purple/10 rounded-full text-charcha-purple font-semibold mb-4">
                Step 2
              </div>
              <h3 className="text-3xl md:text-5xl font-bold mb-6">Moderated Discussions</h3>
              <p className="text-lg md:text-xl text-charcha-text-muted leading-relaxed">
                Tools that empower hosts to keep conversations healthy and on-track. Every space has guardrails that ensure respect without stifling free expression.
              </p>
            </div>
            <div className={`order-1 md:order-2 ${visibleSections.includes(2) ? 'animate-fadeInRight' : ''}`}>
              <div className="relative">
                <div className="absolute inset-0 bg-charcha-purple/20 rounded-3xl blur-2xl"></div>
                <div className="relative bg-charcha-surface border border-charcha-border rounded-3xl p-12 flex items-center justify-center h-80">
                  <Shield className="w-32 h-32 text-charcha-purple opacity-80" />
                </div>
              </div>
            </div>
          </div>
          <div
            className={`journey-section grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${visibleSections.includes(3) ? 'opacity-100' : 'opacity-0'}`}
            data-section="3"
          >
            <div className={`${visibleSections.includes(3) ? 'animate-fadeInLeft' : ''}`}>
              <div className="relative">
                <div className="absolute inset-0 bg-charcha-purple/20 rounded-3xl blur-2xl"></div>
                <div className="relative bg-charcha-surface border border-charcha-border rounded-3xl p-12 flex items-center justify-center h-80">
                  <Users className="w-32 h-32 text-charcha-purple opacity-80" />
                </div>
              </div>
            </div>
            <div className={`${visibleSections.includes(3) ? 'animate-fadeInRight' : ''}`}>
              <div className="inline-block px-4 py-2 bg-charcha-purple/10 rounded-full text-charcha-purple font-semibold mb-4">
                Step 3
              </div>
              <h3 className="text-3xl md:text-5xl font-bold mb-6">Meaningful Connections</h3>
              <p className="text-lg md:text-xl text-charcha-text-muted leading-relaxed">
                Connect with people through ideas, not just fleeting trends. Build relationships based on shared values and mutual respect, not viral moments.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-32 px-6 bg-charcha-bg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Voices of <span className="text-charcha-purple">Clarity</span></h2>
            <p className="text-xl text-charcha-text-muted">What early adopters are saying</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-charcha-surface border border-charcha-border rounded-2xl p-8 transition-all duration-300 hover:border-charcha-purple hover:animate-glow-pulse">
              <div className="mb-6">
                <svg className="w-10 h-10 text-charcha-purple opacity-50" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-charcha-text-muted mb-6 leading-relaxed italic">
                "Finally, a place where you can have a real debate without it turning into a war. Charcha Point is a game-changer."
              </p>
              <div>
                <p className="font-semibold text-charcha-text-light">Sarah Mitchell</p>
                <p className="text-sm text-charcha-text-muted">Community Host</p>
              </div>
            </div>
            <div className="group bg-charcha-surface border border-charcha-border rounded-2xl p-8 transition-all duration-300 hover:border-charcha-purple hover:animate-glow-pulse">
              <div className="mb-6">
                <svg className="w-10 h-10 text-charcha-purple opacity-50" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-charcha-text-muted mb-6 leading-relaxed italic">
                "I've rediscovered what social media should be: genuine conversations with real people. No bots, no rage-bait."
              </p>
              <div>
                <p className="font-semibold text-charcha-text-light">David Chen</p>
                <p className="text-sm text-charcha-text-muted">Tech Enthusiast</p>
              </div>
            </div>
            <div className="group bg-charcha-surface border border-charcha-border rounded-2xl p-8 transition-all duration-300 hover:border-charcha-purple hover:animate-glow-pulse">
              <div className="mb-6">
                <svg className="w-10 h-10 text-charcha-purple opacity-50" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-charcha-text-muted mb-6 leading-relaxed italic">
                "The quality of discussion here is unmatched. It feels like the internet I fell in love with years ago."
              </p>
              <div>
                <p className="font-semibold text-charcha-text-light">Priya Sharma</p>
                <p className="text-sm text-charcha-text-muted">Writer & Educator</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <div className="inline-block p-6 bg-charcha-purple/10 rounded-3xl">
              <MessageCircle className="w-20 h-20 text-charcha-purple" />
            </div>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Your Conversation <span className="text-charcha-purple">Awaits.</span>
          </h2>
          <p className="text-xl md:text-2xl text-charcha-text-muted leading-relaxed max-w-2xl mx-auto mb-12">
            Join the waitlist and be the first to experience a social platform that respects your voice.
          </p>
          <button className="bg-charcha-purple hover:bg-purple-600 text-white px-16 py-6 rounded-xl text-2xl font-bold transition-all duration-300 hover:scale-105 shadow-2xl shadow-charcha-purple/40 animate-glow-pulse">
            Join the Waitlist
          </button>
          <p className="text-charcha-text-muted mt-8">No credit card required. Launch coming soon.</p>
        </div>
      </section>

      <footer className="relative py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-charcha-purple" />
              <span className="text-lg font-bold">Charcha Point</span>
            </div>
            <p className="text-charcha-text-muted text-sm text-center">
              © 2025 Charcha Point. Where meaningful conversations happen.
            </p>
            <div className="flex gap-6 text-sm text-charcha-text-muted">
              <a href="#" className="hover:text-charcha-text-light transition-colors">Privacy</a>
              <a href="#" className="hover:text-charcha-text-light transition-colors">Terms</a>
              <a href="#" className="hover:text-charcha-text-light transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div >
  );
};

export default LandingPage;
