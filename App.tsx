import React, { useState, useEffect } from 'react';
import { PILLARS, SCHEDULES } from './constants';
import AIAssistant from './components/AIAssistant';
import CountdownTimer from './components/CountdownTimer';
import { BackgroundGradientAnimation } from './components/ui/background-gradient-animation';

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Efecto para detectar el scroll y cambiar el estilo del navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen selection:bg-blue-200 selection:text-blue-900">
      {/* Navigation - Cambiada a fixed para que siempre sea accesible */}
      <nav className={`fixed top-0 left-0 w-full z-[60] px-6 transition-all duration-300 ${
        isScrolled ? 'py-4 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 shadow-2xl' : 'py-10 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo Glish */}
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="flex items-center justify-center transition-all duration-500 group-hover:scale-105">
              <img 
                src="https://raw.githubusercontent.com/Glish-Mexico/branding/main/glish-white-logo.png" 
                alt="Glish Logo" 
                className="h-8 md:h-10 w-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/200x80/000000/FFFFFF?text=Glish';
                }}
              />
            </div>
            <div className="hidden sm:flex flex-col border-l border-white/20 pl-4">
              <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.5em] drop-shadow-md">TOEFL 2026</span>
            </div>
          </div>
          
          {/* Action Button Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-8 text-white/70 text-xs font-bold uppercase tracking-widest">
                <a href="#pilares" className="hover:text-white transition-colors duration-300">Metodología</a>
                <a href="#horarios" className="hover:text-white transition-colors duration-300">Horarios</a>
                <a href="#inversion" className="hover:text-white transition-colors duration-300">Inversión</a>
            </div>
            <button className="bg-white/10 backdrop-blur-xl border border-white/30 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-blue-900 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-500">
              Compara ahora
            </button>
          </div>
        </div>
      </nav>

      {/* Header / Hero with Background Gradient Animation */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <BackgroundGradientAnimation
          containerClassName="absolute inset-0 z-0"
          className="z-10 w-full h-full flex items-center justify-center"
        >
          <div className="max-w-6xl mx-auto text-center relative z-20 px-6 py-32">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md text-blue-200 px-8 py-3 rounded-full text-[10px] font-black mb-10 uppercase tracking-[0.3em] border border-white/20 shadow-xl">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></span>
              Preparación Internacional de Élite • 100% Online
            </div>
            <h1 className="text-6xl md:text-9xl font-black mb-10 leading-[0.9] tracking-tighter text-white drop-shadow-2xl">
              TOEFL <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Glish</span> 2026
            </h1>
            <p className="text-xl md:text-3xl text-blue-100 max-w-4xl mx-auto leading-relaxed font-light mb-16 px-4">
              Transforma tu dominio del inglés en un puntaje internacional con el programa para futuros <span className="font-bold text-white uppercase border-b-2 border-blue-400/50">Graduados Glish</span>. <br/>
              <span className="text-blue-400 font-bold uppercase tracking-widest text-sm mt-4 inline-block">Sesiones en vivo por Meet con tu Coach</span>
            </p>

            {/* Countdown Timer Integration */}
            <div className="mb-12">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-300 mb-6">Iniciamos la próxima cohorte en:</p>
              <CountdownTimer />
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
              <button className="w-full sm:w-auto bg-white text-blue-900 font-black px-16 py-6 rounded-3xl hover:bg-blue-50 transition shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 duration-300 uppercase tracking-widest text-sm pointer-events-auto">
                Postular Ahora
              </button>
              <p className="text-blue-200/60 text-[10px] font-bold uppercase tracking-widest max-w-[200px] text-left hidden sm:block leading-tight">
                Plataforma 100% Online con interacción humana real vía Meet
              </p>
            </div>
          </div>
        </BackgroundGradientAnimation>

        {/* Floating Decor */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40 z-20 text-white">
            <i className="fas fa-chevron-down text-2xl"></i>
        </div>
      </header>

      {/* 10 Pilares Section */}
      <section id="pilares" className="py-40 px-6 -mt-32 relative z-20 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter uppercase">Los 10 Pilares Glish</h2>
            <div className="w-24 h-2 bg-blue-600 mx-auto mb-8 rounded-full"></div>
            <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto">Nuestro ADN pedagógico diseñado para el nuevo examen TOEFL de 2026.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
            {PILLARS.map((pilar, index) => (
              <div key={index} className="pilar-card glass-card p-10 rounded-[3rem] shadow-2xl border border-white flex flex-col items-center text-center">
                <div className={`w-16 h-16 bg-${pilar.color}-50 rounded-[1.5rem] flex items-center justify-center text-${pilar.color}-600 text-3xl mb-8 shadow-inner`}>
                  <i className={`fas ${pilar.icon}`}></i>
                </div>
                <h3 className="font-black text-xs mb-4 uppercase tracking-widest text-slate-900 leading-tight h-10 flex items-center">{pilar.title}</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed font-bold opacity-80">{pilar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operación Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-slate-900 rounded-[4rem] shadow-[0_50px_100px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col md:flex-row border-4 border-white">
            <div className="md:w-2/5 glish-gradient p-16 flex flex-col justify-center text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <h2 className="text-5xl font-black mb-8 uppercase tracking-tighter leading-none">Rigor<br/>Académico</h2>
                <p className="text-blue-100 text-lg font-light leading-relaxed">Sin atajos. Sesiones online en vivo por Meet con expertos que te llevarán a la graduación.</p>
            </div>
            <div className="md:w-3/5 p-16 bg-white">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 text-xl shrink-0"><i className="fas fa-calendar-alt"></i></div>
                  <div>
                    <p className="font-black text-slate-900 mb-2 uppercase tracking-widest text-xs">Duración</p>
                    <p className="text-slate-500 text-sm font-bold">16 semanas intensivas<br/>Online en Vivo</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 text-xl shrink-0"><i className="fas fa-video"></i></div>
                  <div>
                    <p className="font-black text-slate-900 mb-2 uppercase tracking-widest text-xs">Instrucción</p>
                    <p className="text-slate-500 text-sm font-bold">Sesiones en Meet<br/>Glish Mentoring Real</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 text-xl shrink-0"><i className="fas fa-user-check"></i></div>
                  <div>
                    <p className="font-black text-slate-900 mb-2 uppercase tracking-widest text-xs">Cupos</p>
                    <p className="text-slate-500 text-sm font-bold">Grupos Reducidos<br/>Límite 8 Estudiantes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 text-xl shrink-0"><i className="fas fa-graduation-cap"></i></div>
                  <div>
                    <p className="font-black text-slate-900 mb-2 uppercase tracking-widest text-xs">Foco</p>
                    <p className="text-slate-500 text-sm font-bold">Coach Real en Vivo<br/>Metodología Glish</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Opciones de Horario */}
      <section id="horarios" className="py-40 px-6 max-w-7xl mx-auto scroll-mt-24">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter uppercase">Selecciona tu Grupo</h2>
          <p className="text-slate-500 font-medium text-xl">Grupos élite con expertos dedicados al éxito de tu graduación.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {SCHEDULES.map((sched) => (
            <div 
              key={sched.id} 
              className={`group relative p-14 rounded-[4rem] transition-all duration-500 hover:-translate-y-4 ${
                sched.isPopular 
                ? 'bg-slate-900 shadow-[0_40px_80px_rgba(0,0,0,0.3)] scale-110 z-10 border-4 border-blue-500' 
                : 'bg-white border-2 border-slate-100 shadow-xl hover:shadow-2xl'
              }`}
            >
              <div className={`absolute -top-5 left-12 text-[10px] font-black px-6 py-2.5 rounded-full uppercase tracking-[0.2em] shadow-lg ${
                sched.isPopular ? 'bg-blue-600 text-white' : 'bg-slate-900 text-white'
              }`}>
                {sched.tag}
              </div>
              
              <div className={`w-24 h-24 rounded-[2.5rem] flex items-center justify-center text-5xl mb-12 transition-all duration-500 ${
                sched.isPopular 
                ? 'bg-blue-500/10' 
                : 'bg-blue-50 group-hover:bg-blue-600 group-hover:text-white'
              }`}>
                {sched.icon}
              </div>
              
              <h4 className={`text-2xl font-black mb-4 ${sched.isPopular ? 'text-white' : 'text-slate-900'}`}>
                {sched.title}
              </h4>
              <p className="text-blue-500 text-xs mb-8 uppercase tracking-widest font-black">
                {sched.days}
              </p>
              <p className={`text-4xl font-black mb-10 tracking-tighter ${sched.isPopular ? 'text-white' : 'text-slate-900'}`}>
                {sched.time.split(' – ')[0]} <span className="text-sm font-light text-slate-400 block mt-2 uppercase tracking-widest">hasta {sched.time.split(' – ')[1]}</span>
              </p>
              
              <div className={`h-px w-full mb-10 ${sched.isPopular ? 'bg-slate-800' : 'bg-slate-100'}`}></div>
              
              <div className={`space-y-4 text-xs font-bold ${sched.isPopular ? 'text-slate-300' : 'text-slate-500'}`}>
                <p className="flex items-center gap-3"><i className="fas fa-check text-blue-500"></i> Sesiones en Vivo</p>
                <p className="flex items-center gap-3"><i className="fas fa-check text-blue-500"></i> Interacción con Coach</p>
                <p className="flex items-center gap-3"><i className="fas fa-check text-blue-500"></i> Sesiones en Meet</p>
              </div>
              
              <p className={`text-[12px] italic mt-12 pt-8 border-t font-medium leading-relaxed ${
                sched.isPopular ? 'text-slate-400 border-slate-800' : 'text-slate-400 border-slate-100'
              }`}>
                "{sched.description}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Inversión y Pagos Section */}
      <section id="inversion" className="py-40 px-6 bg-slate-900 overflow-hidden relative scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="lg:w-1/2 text-white">
              <span className="text-blue-500 font-black uppercase tracking-[0.5em] text-xs mb-6 block">Inversión y Valor</span>
              <h2 className="text-5xl md:text-7xl font-black mb-10 leading-[1.1] uppercase tracking-tighter italic">Flexibilidad <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Glish</span></h2>
              <p className="text-blue-100/70 text-xl font-light mb-12 leading-relaxed max-w-xl">
                Nuestro programa TOEFL Glish es una inversión en tu futuro global. Ofrecemos las facilidades necesarias para que nada te detenga.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-8 bg-white/5 p-8 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="text-blue-400 text-4xl"><i className="fas fa-wallet"></i></div>
                  <div>
                    <h4 className="font-black text-xl mb-1 uppercase tracking-tighter">Financiamiento Interno</h4>
                    <p className="text-blue-100/50 text-sm">Planes diseñados a tu medida sin intereses bancarios.</p>
                  </div>
                </div>
                <div className="flex items-center gap-8 bg-white/5 p-8 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="text-blue-400 text-4xl"><i className="fas fa-star"></i></div>
                  <div>
                    <h4 className="font-black text-xl mb-1 uppercase tracking-tighter">Beca Alumni Glish</h4>
                    <p className="text-blue-100/50 text-sm">Descuento exclusivo automático si ya eres graduado Glish.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 relative">
              <div className="bg-white p-16 rounded-[5rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] relative z-10 text-center border-[12px] border-slate-800">
                <div className="w-24 h-24 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white text-4xl mx-auto mb-10 shadow-2xl">
                  <i className="fas fa-lock"></i>
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-6 uppercase tracking-tighter leading-none">Costo del Programa<br/><span className="text-blue-600 text-lg">TOEFL Glish 2026</span></h3>
                <div className="bg-slate-100 py-8 px-10 rounded-3xl mb-10 border-2 border-dashed border-slate-300">
                  <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px] mb-3">Disponibilidad</p>
                  <p className="text-slate-900 font-black text-2xl uppercase">Próximo Lanzamiento</p>
                </div>
                <p className="text-slate-500 text-xs font-bold leading-relaxed mb-12">
                  Regístrate ahora para ser de los primeros en recibir los <br/><span className="text-blue-600">precios de preventa exclusiva</span>.
                </p>
                <button className="w-full bg-slate-900 text-white font-black py-6 rounded-3xl hover:bg-blue-600 transition-all shadow-2xl uppercase tracking-widest text-xs hover:scale-105 duration-300">
                  Reservar mi Alerta VIP
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-40 px-6 glish-gradient relative overflow-hidden text-center text-white">
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter uppercase leading-[0.9]">
            DOMINA EL <br/><span className="text-blue-400">TOEFL GLISH</span> HOY.
          </h2>
          <p className="text-blue-100 text-2xl mb-20 font-light max-w-3xl mx-auto leading-relaxed">
            Un sistema honesto, un grupo de expertos y la mejor tecnología de IA educativa del mundo. Estás a un paso de tu meta.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
            <button className="w-full sm:w-auto bg-white text-blue-900 font-black px-16 py-7 rounded-3xl hover:bg-blue-50 transition shadow-2xl uppercase tracking-widest text-sm hover:scale-110 active:scale-95 duration-300">
              Postular al Programa
            </button>
            <button className="w-full sm:w-auto bg-transparent border-2 border-white/30 text-white font-black px-16 py-7 rounded-3xl hover:bg-white/10 transition uppercase tracking-widest text-sm backdrop-blur-md">
              Chatear con Soporte
            </button>
          </div>
          <p className="mt-24 text-white/20 text-[10px] font-black uppercase tracking-[1em]">GLISH • ELITE • ONLINE</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 text-center border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center gap-12 mb-16">
            <i className="fab fa-instagram text-2xl text-slate-300 hover:text-blue-500 transition cursor-pointer"></i>
            <i className="fab fa-linkedin text-2xl text-slate-300 hover:text-blue-500 transition cursor-pointer"></i>
            <i className="fab fa-facebook text-2xl text-slate-300 hover:text-blue-500 transition cursor-pointer"></i>
            <i className="fab fa-tiktok text-2xl text-slate-300 hover:text-blue-500 transition cursor-pointer"></i>
          </div>
          <div className="flex flex-col items-center mb-12">
            <img 
              src="https://raw.githubusercontent.com/Glish-Mexico/branding/main/glish-white-logo.png" 
              alt="Glish Footer Logo" 
              className="h-10 mb-4 brightness-0 opacity-80" 
            />
            <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.4em] mt-1">TOEFL Glish 2026</span>
          </div>
          <p className="text-slate-400 text-[10px] uppercase tracking-[0.3em] mb-4">© 2026 Glish | TOEFL International Graduation Program</p>
          <p className="text-slate-500 text-xs normal-case tracking-normal max-w-2xl mx-auto font-medium">
            Glish es una marca registrada de educación internacional. Formamos líderes bilingües con metodologías disruptivas y tecnología de punta, graduando a los mejores profesionales de la región a través de nuestra plataforma online vía Meet.
          </p>
        </div>
      </footer>

      {/* AI Assistant FAB */}
      <AIAssistant />
    </div>
  );
};

export default App;