import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Droplet, Instagram, Languages, Thermometer, Gauge, FlaskConical, Activity, Bell, Cpu, Image as ImageIcon, Sliders, PlayCircle, ShieldCheck, ChevronDown, Home, Trees, MapPin, Skull } from "lucide-react";
import { I18nProvider, useI18n } from "@/i18n";

// Simple in-view animation hook
function useInView<T extends HTMLElement>(threshold = 0.1) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("animate-fade-in");
            io.unobserve(el);
          }
        });
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return ref;
}
// Generic appear-on-view wrapper with optional animation class and delay
function AppearOnView({ children, delayMs = 0, animationClass = "animate-fade-in", className = "" }: { children: React.ReactNode; delayMs?: number; animationClass?: string; className?: string; }) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          el.classList.add(animationClass);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, [animationClass]);
  return (
    <div ref={ref} className={`opacity-0 ${className}`} style={{ animationDelay: `${delayMs}ms` }}>
      {children}
    </div>
  );
}


// Parallax effect (respect reduced motion)
function useParallax<T extends HTMLElement>(intensity = 10) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      el.style.transform = `translate3d(${dx * intensity}px, ${dy * intensity}px, 0)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [intensity]);
  return ref;
}

// Simple count-up for stats
function CountUp({ to, duration = 1500, suffix = "", decimals = 0 }: { to: number; duration?: number; suffix?: string; decimals?: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    let raf = 0;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const current = decimals > 0 ? Number((to * p).toFixed(decimals)) : Math.round(to * p);
      setVal(current);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, duration, decimals]);
  return <span>{decimals > 0 ? val.toFixed(decimals) : val.toLocaleString()} {suffix}</span>;
}

function Header() {
  const { t, lang, setLang } = useI18n();
  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-white/80 via-blue-50/60 to-cyan-50/40 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 border-b border-blue-100/30">
      <nav className="container flex h-16 items-center justify-between">
        <button onClick={() => document.getElementById("top")?.scrollIntoView({ behavior: "smooth" })} className="flex items-center gap-2 hover-scale group" aria-label="AquaAeris Home">
          <div className="p-1 rounded-full bg-blue-100/50 group-hover:bg-blue-100/80 transition-all">
            <Droplet className="h-5 w-5 text-blue-600" />
          </div>
          <span className="font-display text-xl tracking-tight bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">AquaAeris</span>
        </button>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <button onClick={() => document.getElementById("problem")?.scrollIntoView({ behavior: "smooth" })} className="story-link relative group">
            {t("problem")}
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-300" />
          </button>
          <button onClick={() => document.getElementById("solution")?.scrollIntoView({ behavior: "smooth" })} className="story-link relative group">
            {t("solution")}
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-300" />
          </button>
          <button onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })} className="story-link relative group">
            {t("products")}
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-300" />
          </button>
          <button onClick={() => document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" })} className="story-link relative group">
            {t("contacts")}
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-300" />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="hidden sm:inline-flex bg-gradient-to-r from-blue-100/60 to-cyan-100/40 hover:from-blue-200/60 hover:to-cyan-200/40 border-blue-200/50" onClick={() => {
            document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" });
          }}>{t("contact")}</Button>
          <Button variant="outline" className="border-blue-200/50 hover:bg-blue-50/50 animate-tilt" aria-label="Change language" onClick={() => setLang(lang === "ru" ? "en" : "ru")}>
            <Languages className="h-4 w-4 mr-2" /> {lang.toUpperCase()}
          </Button>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  const { t } = useI18n();
  const modelUrl = `${import.meta.env.BASE_URL}KOTSU.glb`;
  return (
    <section id="top" className="relative overflow-hidden min-h-[100vh] flex items-center">
      {/* Blue gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#004AAD] to-[#AEE7FF]" aria-hidden="true" />

      {/* Rising white wave at the bottom */}
      <div className="absolute inset-x-0 bottom-0 z-[1]" aria-hidden>
        <svg viewBox="0 0 1440 220" preserveAspectRatio="none" className="w-full h-[120px] md:h-[240px]">
          <path d="M0,110 C360,100 720,140 1040,90 C1220,70 1340,65 1440,80 L1440,220 L0,220 Z" fill="white" />
          <path d="M0,110 C360,100 720,140 1040,90 C1220,70 1340,65 1440,80" stroke="rgba(0,0,0,0.18)" stroke-width="2" fill="none" />
        </svg>
      </div>

      {/* Animated water bubbles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute top-20 left-10 w-4 h-4 bg-white/30 rounded-full animate-bubble" style={{ animationDelay: '0s' }} />
        <div className="absolute top-32 right-20 w-3 h-3 bg-white/20 rounded-full animate-bubble" style={{ animationDelay: '2s' }} />
        <div className="absolute top-40 left-1/3 w-2 h-2 bg-white/25 rounded-full animate-bubble" style={{ animationDelay: '4s' }} />
        <div className="absolute top-16 right-1/3 w-5 h-5 bg-white/15 rounded-full animate-bubble" style={{ animationDelay: '1s' }} />
      </div>

      {/* Soft blur and glow effects */}
      <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-white/20 blur-3xl animate-float" aria-hidden />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-white/10 blur-3xl animate-float" style={{ animationDelay: '1s' }} aria-hidden />
      <div className="pointer-events-none absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[60vh] w-[60vw] rounded-full bg-white/5 blur-3xl animate-float" style={{ animationDelay: '0.5s' }} aria-hidden />

      {/* Water ripple effects */}
      <div className="pointer-events-none absolute top-1/4 right-1/4 w-32 h-32" aria-hidden>
        <div className="absolute inset-0 border-2 border-white/20 rounded-full animate-water-ripple" />
        <div className="absolute inset-0 border-2 border-white/10 rounded-full animate-water-ripple" style={{ animationDelay: '1s' }} />
      </div>

      {/* Morphing blob shapes */}
      <div className="pointer-events-none absolute top-10 left-1/3 w-24 h-24 bg-white/5 animate-morphing-blob animate-float" aria-hidden style={{ animationDelay: '2s' }} />
      <div className="pointer-events-none absolute bottom-20 right-1/4 w-16 h-16 bg-white/8 animate-morphing-blob animate-float" aria-hidden style={{ animationDelay: '4s' }} />

      <div className="container relative z-10 py-1">
        <div className="grid md:[grid-template-columns:0.8fr_1.2fr] xl:[grid-template-columns:0.7fr_1.3fr] gap-6 items-center">
          {/* Text content */}
          <div className="space-y-4">
            <h1 className="font-display text-5xl md:text-6xl xl:text-7xl leading-tight font-bold text-white opacity-0 animate-hero-slide-up" style={{ animationDelay: "100ms" }}>
              {t("brand")} — <span className="text-[#00BFFF]">{t("cleanWater")}</span> <span className="text-[#00BFFF]">{t("fromAir")}</span>. {t("anywhere")}.
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-xl leading-relaxed opacity-0 animate-hero-slide-up" style={{ animationDelay: "200ms" }}>
              {t("heroDescription")}
            </p>
            <div className="opacity-0 animate-hero-scale" style={{ animationDelay: "300ms" }}>
              <Button
                size="lg"
                className="bg-[#007BFF] hover:bg-[#0056b3] text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={() => {
                  document.getElementById("solution")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {t("learnMore")}
              </Button>
            </div>
          </div>

          {/* Device image (no translucent frame) */}
          <div className="relative opacity-0 animate-hero-slide-right" style={{ animationDelay: "150ms" }}>
            <div className="relative">

              {/* Floating particles around device */}
              <div className="pointer-events-none absolute inset-0" aria-hidden>
                <div className="absolute top-4 right-8 w-1 h-1 bg-white/60 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
                <div className="absolute bottom-6 left-6 w-0.5 h-0.5 bg-white/40 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
                <div className="absolute top-12 left-4 w-1.5 h-1.5 bg-white/50 rounded-full animate-float" style={{ animationDelay: '2.5s' }} />
              </div>

              {/* 3D model instead of static image */}
              <div className="relative flex items-center justify-center">
                <model-viewer
                  src={modelUrl}
                  alt="3D модель AquaAeris"
                  camera-controls
                  auto-rotate
                  auto-rotate-delay="0"
                  rotation-per-second="10deg"
                  bounds="tight"
                  camera-orbit="0deg 80deg 45%"
                  field-of-view="15deg"
                  disable-zoom
                  exposure="1.0"
                  shadow-intensity="0.3"
                  style={{ background: 'transparent', width: '100%', height: '90vh', display: 'block' }}
                  className="block w-full h-[85vh] md:h-[90vh]"
                ></model-viewer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Problem() {
  const { t } = useI18n();
  const ref = useInView<HTMLDivElement>();
  const facts = [
    { to: 25, suffix: "%", label: t("stat1"), decimals: 0, Icon: Droplet },
    { to: 2000000, suffix: "", label: t("stat2"), decimals: 0, Icon: Skull },
    { to: 57.9, suffix: "%", label: t("stat3"), decimals: 1, Icon: Thermometer },
  ];
  return (
    <section id="problem" className="relative py-12 md:py-16 overflow-hidden">
      {/* Water-themed background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-50/30 via-cyan-50/20 to-transparent" aria-hidden />

      {/* Floating water droplets */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute top-10 left-[10%] w-2 h-2 bg-blue-400/30 rounded-full animate-float" />
        <div className="absolute top-20 right-[15%] w-3 h-3 bg-cyan-400/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-[20%] w-1.5 h-1.5 bg-blue-300/40 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container relative">
        <header className="mb-10">
          <h2 className="font-display text-3xl md:text-4xl">{t("problem")}</h2>
          <p className="text-muted-foreground mt-2">{t("problemSubtitle")}</p>
        </header>
        <div ref={ref} className="grid md:grid-cols-3 gap-6">
          {facts.map((f, i) => (
            <AppearOnView key={i} delayMs={i * 100}>
              <Card className="hover-scale bg-gradient-to-br from-red-50/40 via-red-100/20 to-red-50/30 backdrop-blur-sm border border-red-200/40 hover:border-red-300/60 transition-all duration-300 hover:shadow-lg hover:shadow-red-100/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-4xl font-semibold">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-red-100/80 text-red-600">
                      <f.Icon className="h-4 w-4" />
                    </span>
                    <span><CountUp to={f.to} decimals={f.decimals} suffix={f.suffix} /></span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{f.label}</p>
                </CardContent>
              </Card>
            </AppearOnView>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solution() {
  const { t } = useI18n();
  const features = [
    { icon: Droplet, text: t("feature1") },
    { icon: Gauge, text: t("feature2") },
    { icon: Thermometer, text: t("feature3") },
    { icon: ShieldCheck, text: t("feature4") },
  ];
  return (
    <section id="solution" className="py-12 md:py-16">
      <div className="container grid md:grid-cols-1 gap-10 items-center">
        <div className="space-y-5 text-center">
          <h2 className="font-display text-3xl md:text-4xl">{t("solution")}</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">{t("solutionDesc")}</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <AppearOnView key={i} delayMs={i * 90}>
                <Card className="group hover-scale bg-gradient-to-br from-white via-blue-50/10 to-cyan-50/10 backdrop-blur-sm border border-blue-200/60 hover:border-blue-300/80 transition-all duration-300 hover:shadow-lg hover:shadow-blue-100/25 relative overflow-hidden">
                  {/* Water flow effect */}
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent transform -translate-x-full group-hover:animate-water-flow" />
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <div className="p-1.5 rounded-full bg-blue-100/60 text-blue-600">
                        <f.icon className="h-4 w-4" />
                      </div>
                      <span>{f.text}</span>
                    </CardTitle>
                  </CardHeader>
                </Card>
              </AppearOnView>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



function Products() {
  const { t } = useI18n();
  // Bundle local image into build output so it works on GitHub Pages
  const aquaSocietyImg = new URL("../../images/products/aquasociety.png", import.meta.url).href;
  const products = [
    { name: "AquaAeris", img: "https://res.cloudinary.com/du1lmawkd/image/upload/v1754750104/20250730_2001_Metallic_Water_Dispenser_remix_01k1dxfm4ren5bgxw0gxyqvknx_1_k2cdo4.png", desc: t("productHomeDesc") },
    { name: "AquaTourism", img: "https://res.cloudinary.com/du1lmawkd/image/upload/v1754748472/untitled1_ccqukc.png", desc: t("productTourismDesc") },
    { name: "AquaSociety", img: aquaSocietyImg, desc: t("productSocietyDesc") },
  ];
  return (
    <section id="products" className="py-12 md:py-16 bg-secondary/40">
      <div className="container">
        <h2 className="font-display text-3xl md:text-4xl mb-10">{t("products")}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <AppearOnView key={p.name} delayMs={i * 100}>
              <Card className="group hover-scale bg-card-gradient ring-1 ring-transparent hover:ring-primary/30 transition-shadow hover:shadow-glow">
                <CardHeader>
                  <CardTitle className="text-xl">{p.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="overflow-hidden rounded-md aspect-[4/3] flex items-center justify-center">
                    <img src={p.img} loading="lazy" alt={`Модель ${p.name}`} className="transition-transform duration-500 group-hover:scale-105 object-contain" style={{ width: "100%", height: "80%" }} />
                  </div>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </CardContent>
              </Card>
            </AppearOnView>
          ))}
        </div>
      </div>
    </section>
  );
}

function Specs() {
  const { t } = useI18n();
  return (
    <section id="specs" className="py-12 md:py-16">
      <div className="container">
        <h2 className="font-display text-3xl md:text-4xl mb-8">{t("specs")}</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[{ k: "perf", v: "до 20 л/сутки" }, { k: "tempRange", v: "−15°C…40°C" }, { k: "energy", v: "0,15 кВт⋅ч/л" }, { k: "quality", v: "Междунар. стандарты" }].map((it) => (
            <Card key={it.k} className="bg-card-gradient">
              <CardHeader>
                <CardTitle className="text-base text-muted-foreground">{t(it.k as any)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-semibold">{it.v}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCases() {
  const { t } = useI18n();
  const items = useMemo(() => ([
    { Icon: Home, title: t("homeOffice"), desc: t("useHomeDesc") },
    { Icon: Trees, title: t("rural"), desc: t("useRuralDesc") },
    { Icon: MapPin, title: t("mobile"), desc: t("useMobileDesc") },
  ]), [t]);
  return (
    <section id="usecases" className="py-12 md:py-16 bg-secondary/40">
      <div className="container">
        <h2 className="font-display text-3xl md:text-4xl mb-8">{t("useCases")}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <div key={i} className="group [perspective:1000px]">
              <div className="relative h-48 rounded-xl bg-card-gradient ring-1 ring-border transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] hover:shadow-glow">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 [backface-visibility:hidden]">
                  <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shadow">
                    <it.Icon className="h-6 w-6" />
                  </div>
                  <div className="text-base font-medium text-center px-2">{it.title}</div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center p-4 text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <p className="text-sm text-muted-foreground">{it.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// IoT section removed

function TelegramBot() {
  const { t } = useI18n();
  const ref = useInView<HTMLDivElement>();
  const metrics = [
    { Icon: Droplet, label: t("waterLevel") },
    { Icon: Thermometer, label: t("humidity") },
    { Icon: FlaskConical, label: t("waterQualityAnalysis") },
    { Icon: Activity, label: t("productionRate") },
    { Icon: Gauge, label: t("airTemperature") },
  ];
  return (
    <section id="telegram" className="py-8 md:py-12">
      <div className="container">
        <h2 className="font-display text-3xl md:text-4xl mb-1">{t("telegramBot")}</h2>
        <div className="grid md:grid-cols-2 gap-2 items-center">
          {/* Phone image */}
          <div className="relative flex items-center justify-center">
            {/* Animated water rings around phone */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
              <div className="w-32 h-32 border-2 border-blue-300/30 rounded-full animate-water-ripple" />
              <div className="absolute w-40 h-40 border-2 border-cyan-300/20 rounded-full animate-water-ripple" style={{ animationDelay: '1s' }} />
            </div>
            <div className="pointer-events-none absolute -inset-4 rounded-2xl bg-gradient-to-br from-blue-200/20 to-cyan-200/10 blur-2xl animate-float" aria-hidden />
            <div className="relative w-full max-w-sm aspect-[9/16] flex items-center justify-center animate-float" style={{ animationDelay: '0.5s' }}>
              <img
                src="https://res.cloudinary.com/du1lmawkd/image/upload/v1754748262/Tidal_Tumble_Judging_Session_Presentation_7_po6p68.png"
                loading="lazy"
                alt="AquaAeris Telegram бот"
                className="object-contain rounded-lg"
                style={{ width: "95%", height: "95%" }}
              />
            </div>
          </div>

          {/* Metrics cards */}
          <div ref={ref} className="grid sm:grid-cols-2 gap-4">
            {metrics.map((m, i) => (
              <AppearOnView key={i} delayMs={i * 90}>
                <Card className="hover-scale bg-gradient-to-br from-white via-blue-50/10 to-cyan-50/10 backdrop-blur-sm border border-blue-200/60 hover:border-blue-300/80 transition-all duration-300 hover:shadow-lg hover:shadow-blue-100/25 relative overflow-hidden group">
                  {/* Water droplet effect */}
                  <div className="absolute top-2 right-2 w-1 h-1 bg-blue-400/40 rounded-full animate-float" style={{ animationDelay: `${i * 0.2}s` }} />
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <div className="p-1.5 rounded-full bg-blue-100/60 text-blue-600">
                        <m.Icon className="h-4 w-4" />
                      </div>
                      {m.label}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </AppearOnView>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AiMonitoring() {
  const { t } = useI18n();
  const ref = useInView<HTMLDivElement>();
  const steps = [
    { Icon: ImageIcon, label: t("aiStepCapture") },
    { Icon: Sliders, label: t("aiStepPreprocess") },
    { Icon: Cpu, label: t("aiStepClassify") },
    { Icon: Bell, label: t("aiStepNotify") },
    { Icon: PlayCircle, label: t("aiStepCycle") },
  ];
  return (
    <section id="ai" className="py-8 md:py-12 bg-secondary/40">
      <div className="container">
        <h2 className="font-display text-3xl md:text-4xl mb-6">{t("aiMonitoring")}</h2>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="flex items-center justify-center">
            <div className="w-full aspect-[16/10] flex items-center justify-center">
              <img src="https://res.cloudinary.com/du1lmawkd/image/upload/v1754748560/SFT2025_1_mwkgfs.png" loading="lazy" alt="ИИ-мониторинг AquaAeris" className="object-contain rounded-xl shadow-elev" style={{ width: "90%", height: "90%" }} />
            </div>
          </div>
          <div ref={ref} className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border" aria-hidden />
            <div className="space-y-3 ml-8">
              {steps.map((s, i) => (
                <div key={i}>
                  <AppearOnView delayMs={i * 100}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary shadow">
                        <s.Icon className="h-4 w-4" />
                      </div>
                      <div className="text-sm font-medium">{s.label}</div>
                    </div>
                  </AppearOnView>
                  {i < steps.length - 1 && (
                    <div className="ml-4 my-1 flex items-center gap-1 text-primary/60">
                      <div className="h-4 w-px bg-primary/30" />
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileApp() {
  const { t } = useI18n();
  const ref = useInView<HTMLDivElement>();
  const items = [
    { Icon: Activity, text: t("mobileSync") },
    { Icon: Cpu, text: t("mobileAiModes") },
    { Icon: Bell, text: t("mobileFilterAlerts") },
    { Icon: Gauge, text: t("mobileStatsTips") },
  ];
  return (
    <section id="mobile" className="py-8 md:py-12">
      <div className="container">
        <h2 className="font-display text-3xl md:text-4xl mb-1">{t("mobileApp")}</h2>
        <div className="grid md:grid-cols-2 gap-2 items-center">
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-sm aspect-[9/16] flex items-center justify-center">
              <img src="https://res.cloudinary.com/du1lmawkd/image/upload/v1754748471/image_111_uxp44p.png" loading="lazy" alt="Мобильное приложение AquaAeris" className="object-contain" style={{ width: "65%", height: "65%" }} />
            </div>
          </div>
          <div ref={ref} className="space-y-3">
            {items.map((it, i) => (
              <AppearOnView key={i} delayMs={i * 120} animationClass="animate-slide-in-right">
                <Card className="hover-scale">
                  <CardContent className="flex items-center gap-3 py-4">
                    <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <it.Icon className="h-4 w-4" />
                    </div>
                    <div className="text-sm">{it.text}</div>
                  </CardContent>
                </Card>
              </AppearOnView>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Schematic() {
  const { t } = useI18n();
  const ref = useInView<HTMLDivElement>();
  const points = [
    { Icon: Droplet, text: t("schematicIoT") },
    { Icon: Gauge, text: t("schematicTracker") },
    { Icon: Activity, text: t("schematicCooler") },
  ];
  return (
    <section id="schematic" className="py-8 md:py-12 bg-secondary/40">
      <div className="container">
        <h2 className="font-display text-3xl md:text-4xl mb-6">{t("schematic")}</h2>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="flex items-center justify-center">
            <div className="w-full aspect-[16/10] flex items-center justify-center">
              <img src="https://res.cloudinary.com/du1lmawkd/image/upload/v1754748770/Group_672_1_hzhlqr.png" loading="lazy" alt="Схема Arduino AquaAeris" className="object-contain rounded-xl shadow-elev" style={{ width: "90%", height: "90%" }} />
            </div>
          </div>
          <div ref={ref} className="space-y-4">
            {points.map((p, i) => (
              <AppearOnView key={i} delayMs={i * 100}>
                <Card className="hover-scale bg-card-gradient">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <p.Icon className="h-5 w-5 text-primary" /> {p.text}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </AppearOnView>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contacts() {
  const { t } = useI18n();
  function submit(e: React.FormEvent) {
    e.preventDefault();
    alert("Спасибо! Мы свяжемся с вами.");
  }
  return (
    <section id="contacts" className="py-12 md:py-16 bg-secondary/40">
      <div className="container">
        <h2 className="font-display text-3xl md:text-4xl mb-6">{t("contacts")}</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <p className="text-muted-foreground">{t("phone")}:</p>
            <ul className="space-y-2">
              {["+7 (705) 863-42-42", "+7 (775) 748-11-40", "+7 (778) 643-41-34", "+7 (778) 732-11-36"].map((p) => (
                <li key={p}><a className="story-link" href={`tel:${p.replace(/[^+\d]/g, "")}`}>{p}</a></li>
              ))}
            </ul>
            <Separator />
            <a className="story-link" href="https://www.instagram.com/aquaaeris.kz?igsh=dWFxMGxnYnluYzFqS" target="_blank" rel="noreferrer">
              <Instagram className="inline h-4 w-4 mr-2" /> @aquaaeris.kz
            </a>
          </div>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block mb-2 text-sm" htmlFor="name">{t("name")}</label>
              <Input id="name" required />
            </div>
            <div>
              <label className="block mb-2 text-sm" htmlFor="email">{t("email")}</label>
              <Input id="email" type="email" required />
            </div>
            <div>
              <label className="block mb-2 text-sm" htmlFor="message">{t("message")}</label>
              <Textarea id="message" required />
            </div>
            <Button type="submit">{t("send")}</Button>
          </form>
        </div>
      </div>

    </section>
  );
}

function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t">
      <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Droplet className="h-5 w-5 text-primary" />
          <span className="font-semibold">AquaAeris</span>
        </div>
        <p className="text-sm text-muted-foreground">{t("footer")}</p>
        <button onClick={() => document.getElementById("top")?.scrollIntoView({ behavior: "smooth" })} className="story-link">{t("backToTop")}</button>
      </div>
    </footer>
  );
}

const ProductLd = () => {
  const json = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "AquaAeris",
    description:
      "Автономное устройство для генерации питьевой воды из воздуха. Энергоэффективно и экологично.",
    image: [
      "https://res.cloudinary.com/du1lmawkd/image/upload/v1754750104/20250730_2001_Metallic_Water_Dispenser_remix_01k1dxfm4ren5bgxw0gxyqvknx_1_k2cdo4.png"
    ],
    brand: { "@type": "Brand", name: "AquaAeris" },
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
  );
};

const Index = () => {
  return (
    <I18nProvider defaultLang="ru">
      <ProductLd />
      <Header />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Products />
        <Specs />
        <UseCases />
        <TelegramBot />
        <AiMonitoring />
        <MobileApp />
        <Schematic />
        <Contacts />
      </main>
      <Footer />
    </I18nProvider>
  );
};

export default Index;

