import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { ArrowUpRight, Menu, X, Plus, MapPin } from "lucide-react";
import { INSTAGRAM_URL, MAPS_URL, MESSAGES, WHATSAPP_DISPLAY, whatsappUrl } from "@/lib/contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Estética Stefanie Probst Fortes · Estética facial e sobrancelhas em Blumenau" },
      {
        name: "description",
        content: "Limpeza de pele, dermaplaning e design de sobrancelhas em Blumenau, com atendimento atencioso e personalizado.",
      },
      { property: "og:title", content: "Estética Stefanie Probst Fortes" },
      { property: "og:description", content: "Estética facial e sobrancelhas em Blumenau. Cuidado personalizado e atenção aos detalhes." },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Stefanie Probst Fortes, estética facial e sobrancelhas em Blumenau" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const btnPrimary =
  "inline-flex min-h-12 items-center justify-center gap-2.5 border border-primary bg-primary px-7 py-3 text-[0.95rem] font-medium tracking-wide text-primary-foreground transition-colors duration-500 hover:bg-background hover:text-primary active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";
const btnGhost =
  "inline-flex min-h-12 items-center justify-center gap-2 border border-primary/30 px-6 py-3 text-[0.95rem] font-medium text-primary transition-colors duration-500 hover:border-primary hover:bg-primary/5";
const linkEd =
  "group inline-flex items-center gap-2 border-b border-primary/40 pb-1 text-[0.95rem] font-medium text-primary transition-colors hover:border-primary";

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const NAV = [
  { href: "#sobre", label: "Sobre" },
  { href: "#procedimentos", label: "Procedimentos" },
  { href: "#espaco", label: "O espaço" },
  { href: "#contato", label: "Contato" },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);
  const solid = scrolled || open;
  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${solid ? "border-b border-border bg-background/95 backdrop-blur" : "bg-transparent"}`}
    >
      <div className="container-ed flex h-16 items-center justify-between md:h-20">
        <a href="#inicio" className="leading-tight text-primary" onClick={() => setOpen(false)}>
          <span className="block font-display text-[1.35rem] md:text-[1.5rem]">Stefanie Probst Fortes</span>
          <span className="hidden text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground sm:block">
            Estética facial e sobrancelhas
          </span>
        </a>
        <nav className="hidden items-center gap-9 md:flex" aria-label="Principal">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-[0.92rem] text-foreground/85 transition-colors hover:text-primary">
              {n.label}
            </a>
          ))}
          <a href={whatsappUrl(MESSAGES.hero)} target="_blank" rel="noopener noreferrer" className={`${btnPrimary} min-h-10 px-5 py-2`}>
            <FaWhatsapp aria-hidden className="size-4" /> Agendar
          </a>
        </nav>
        <button
          type="button"
          className="-mr-2 inline-flex size-11 items-center justify-center text-primary md:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>
      {open && (
        <div className="h-[calc(100dvh-4rem)] bg-background md:hidden">
          <nav className="container-ed flex flex-col pt-6" aria-label="Menu">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="border-b border-border py-5 font-display text-[2rem] text-primary"
              >
                {n.label}
              </a>
            ))}
            <a href={whatsappUrl(MESSAGES.hero)} target="_blank" rel="noopener noreferrer" className={`${btnPrimary} mt-8`}>
              <FaWhatsapp aria-hidden className="size-5" /> Agendar pelo WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <>
    <section id="inicio" className="relative isolate min-h-[100svh] overflow-hidden bg-card md:min-h-[min(100svh,56.25vw)] md:h-auto">
      <picture>
        <source media="(min-width: 768px)" srcSet="/images/hero-desktop.jpg" />
        <img
          src="/images/hero-mobile.jpg"
          alt="Stefanie Probst Fortes em sua sala de atendimento"
          fetchPriority="high"
          className="absolute inset-0 -z-20 size-full object-cover object-[70%_30%] md:object-[70%_center]"
        />
      </picture>

      <div className="container-ed flex min-h-[100svh] flex-col justify-end pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-28 md:min-h-[min(100svh,56.25vw)] md:justify-center md:pb-16">
        <div className="fade-in max-w-[34rem] text-cream [&_h1]:max-w-[15ch] md:[&_h1]:max-w-none md:max-w-[30rem] md:text-primary lg:max-w-[33rem]">
          <p className="eyebrow mb-5 hidden md:block md:text-muted-foreground">Estética facial e sobrancelhas em Blumenau</p>
          <h1 className="t-hero">
            <span className="hidden sm:inline">
              Sua pele não precisa de mais. <em className="italic">Precisa do cuidado certo.</em>
            </span>
            <span className="sm:hidden">Sua pele merece o cuidado certo.</span>
          </h1>
          <p className="t-lead mt-6 hidden max-w-[26rem] md:block md:text-foreground/80">
            Cuidado facial e sobrancelhas com atenção aos detalhes e um atendimento pensado para você.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8 md:mt-9">
            <a href={whatsappUrl(MESSAGES.hero)} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
              <FaWhatsapp aria-hidden className="size-5" /> Agendar pelo WhatsApp
            </a>
            <a
              href="#procedimentos"
              className="hidden items-center gap-2 self-start border-b border-current/50 pb-1 text-[0.95rem] font-medium transition-colors hover:border-current md:inline-flex"
            >
              Conhecer procedimentos
            </a>
          </div>
        </div>
      </div>
    </section>
    <div className="container-ed pt-10 md:hidden">
      <p className="eyebrow mb-4 text-muted-foreground">Estética facial e sobrancelhas em Blumenau</p>
      <p className="t-lead text-foreground/80">
        Cuidado facial e sobrancelhas com atenção aos detalhes e um atendimento pensado para você.
      </p>
      <a href="#procedimentos" className={`${linkEd} mt-6`}>Conhecer procedimentos</a>
    </div>
    </>
  );
}

function Intro() {
  return (
    <section className="container-ed grid gap-10 pt-16 pb-24 md:grid-cols-12 md:py-40">
      <Reveal className="md:col-span-7 md:col-start-2">
        <h2 className="t-section text-primary">Um cuidado que começa na atenção aos detalhes.</h2>
      </Reveal>
      <Reveal className="md:col-span-4 md:col-start-8 md:pt-40" delay={150}>
        <div className="mb-6 h-px w-16 bg-accent" />
        <p className="t-lead text-muted-foreground">
          Cada pele possui suas particularidades. Na Estética Stefanie Probst Fortes, o cuidado é pensado para oferecer
          uma experiência atenciosa, tranquila e personalizada.
        </p>
      </Reveal>
    </section>
  );
}

function About() {
  return (
    <section id="sobre" className="bg-card">
      <div className="container-ed grid items-center gap-12 py-20 md:grid-cols-12 md:gap-8 md:py-32">
        <div className="md:col-span-5">
          <div className="photo-zoom aspect-[4/5]">
            <img
              src="/images/procedimento-atendimento.jpg"
              alt="Stefanie realizando um atendimento facial"
              loading="lazy"
              className="size-full object-cover object-[center_40%]"
            />
          </div>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <p className="eyebrow mb-6 text-accent">Stefanie Probst Fortes</p>
          <h2 className="t-section text-primary">Por trás de cada cuidado, existe atenção.</h2>
          <div className="t-lead mt-8 max-w-[32rem] space-y-5 text-muted-foreground">
            <p>
              Stefanie Probst Fortes atua com estética facial e sobrancelhas em Blumenau, oferecendo um atendimento
              voltado ao cuidado individual e à atenção aos detalhes.
            </p>
            <p>Seu espaço foi pensado para receber cada cliente em um ambiente tranquilo e acolhedor.</p>
          </div>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={`${linkEd} mt-10`}>
            <FaInstagram aria-hidden className="size-4" /> @stefaniepfortes
          </a>
        </div>
      </div>
    </section>
  );
}

function Procedures() {
  return (
    <section id="procedimentos" className="container-ed py-24 md:py-36">
      <div className="grid gap-6 md:grid-cols-12 md:items-end">
        <Reveal className="md:col-span-7">
          <h2 className="t-section text-primary">Cuidados para cada detalhe de você.</h2>
        </Reveal>
        <p className="t-lead text-muted-foreground md:col-span-4 md:col-start-9">
          Conheça alguns dos procedimentos oferecidos e encontre o cuidado que faz sentido para o seu momento.
        </p>
      </div>

      {/* Limpeza de pele — bloco principal */}
      <Reveal className="mt-16 grid gap-8 md:mt-24 md:grid-cols-12 md:gap-10">
        <div className="photo-zoom aspect-square md:col-span-7">
          <img src="/images/procedimento-limpeza-pele.jpg" alt="Cuidado facial com máscara" loading="lazy" className="size-full object-cover" />
        </div>
        <div className="flex flex-col justify-end md:col-span-4 md:col-start-9 md:pb-6">
          <h3 className="text-[clamp(2rem,3.2vw,3rem)] leading-tight text-primary">Limpeza de pele</h3>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted-foreground">
            Um cuidado dedicado à pele do rosto, com atenção às suas necessidades e ao seu bem estar.
          </p>
          <a href={whatsappUrl(MESSAGES.limpeza)} target="_blank" rel="noopener noreferrer" className={`${linkEd} mt-8 self-start`}>
            Quero saber sobre limpeza de pele <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </Reveal>

      <div className="mt-20 grid gap-16 md:mt-32 md:grid-cols-12 md:gap-10">
        {/* Dermaplaning — sem fotografia confirmada, bloco tipográfico */}
        <Reveal className="flex flex-col justify-between border-t border-primary/25 pt-8 md:col-span-5 md:mt-40">
          <div>
            <h3 className="text-[clamp(2rem,3.2vw,3rem)] leading-tight text-primary">Dermaplaning</h3>
            <p className="mt-4 max-w-[26rem] text-[1.0625rem] leading-relaxed text-muted-foreground">
              Um procedimento de estética facial que pode fazer parte de uma rotina de cuidados personalizada.
            </p>
          </div>
          <a href={whatsappUrl(MESSAGES.dermaplaning)} target="_blank" rel="noopener noreferrer" className={`${linkEd} mt-8 self-start`}>
            Quero saber sobre dermaplaning <ArrowUpRight className="size-4" />
          </a>
        </Reveal>

        {/* Sobrancelhas */}
        <Reveal className="md:col-span-6 md:col-start-7" delay={120}>
          <div className="photo-zoom aspect-[4/5]">
            <img
              src="/images/resultado-sobrancelhas.jpg"
              alt="Cliente com destaque para o rosto e as sobrancelhas"
              loading="lazy"
              className="size-full object-cover object-[center_30%]"
            />
          </div>
          <h3 className="mt-8 text-[clamp(2rem,3.2vw,3rem)] leading-tight text-primary">Design de sobrancelhas</h3>
          <p className="mt-4 max-w-[28rem] text-[1.0625rem] leading-relaxed text-muted-foreground">
            Atenção ao desenho das sobrancelhas e à harmonia dos detalhes que valorizam a expressão do rosto.
          </p>
          <a href={whatsappUrl(MESSAGES.sobrancelhas)} target="_blank" rel="noopener noreferrer" className={`${linkEd} mt-8`}>
            Quero saber sobre sobrancelhas <ArrowUpRight className="size-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Space() {
  return (
    <section id="espaco" className="bg-card py-24 md:py-36">
      <div className="container-ed grid gap-10 md:grid-cols-12 md:gap-10">
        <Reveal className="md:col-span-7">
          <div className="aspect-[1100/1430] overflow-hidden">
            <img
              src="/images/ambiente-atendimento.jpg"
              alt="Sala de atendimento com maca e paredes com molduras clássicas"
              loading="lazy"
              className="size-full object-cover"
            />
          </div>
        </Reveal>
        <div className="flex flex-col justify-between gap-12 md:col-span-4 md:col-start-9">
          <div className="md:pt-16">
            <h2 className="t-section text-primary">Um espaço para o seu momento de cuidado.</h2>
            <p className="t-lead mt-8 text-muted-foreground">
              Um ambiente acolhedor, preparado para que cada atendimento aconteça com tranquilidade, conforto e atenção.
            </p>
          </div>
          <Reveal delay={150}>
            <div className="ml-auto aspect-[960/1639] w-2/3 overflow-hidden md:w-full">
              <img
                src="/images/ambiente-recepcao.jpg"
                alt="Espaço com cadeira, móveis e detalhes decorativos"
                loading="lazy"
                className="size-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const GALLERY = [
  { src: "/images/procedimento-esferas.jpg", alt: "Atendimento facial com esferas", cls: "md:col-span-4 aspect-[640/1136]" },
  { src: "/images/resultado-pele.jpg", alt: "Rosto de uma cliente em fotografia próxima", cls: "md:col-span-5 md:mt-32 aspect-square" },
  { src: "/images/procedimento-atendimento.jpg", alt: "Stefanie durante um atendimento", cls: "md:col-span-3 md:mt-12 aspect-[942/1670]" },
];

function Gallery() {
  const [activeIdx, setActive] = useState<number | null>(null);
  const active = activeIdx;
  const item = activeIdx === null ? undefined : GALLERY[activeIdx];
  useEffect(() => {
    if (active === null) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [active]);
  return (
    <section className="container-ed py-24 md:py-36">
      <div className="max-w-[44rem]">
        <h2 className="t-section text-primary">O cuidado está em cada detalhe.</h2>
        <p className="t-lead mt-6 text-muted-foreground">
          Um olhar atento à pele, às sobrancelhas e aos pequenos detalhes de cada atendimento.
        </p>
      </div>
      <div className="mt-14 grid grid-cols-2 gap-4 md:mt-20 md:grid-cols-12 md:gap-8">
        {GALLERY.map((g, i) => (
          <button
            key={g.src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Ampliar: ${g.alt}`}
            className={`photo-zoom block cursor-zoom-in ${g.cls} ${i === 1 ? "col-span-2" : ""}`}
          >
            <img src={g.src} alt={g.alt} loading="lazy" className="size-full object-cover" />
          </button>
        ))}
      </div>
      {item && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={item.alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            autoFocus
            aria-label="Fechar"
            className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] inline-flex size-12 items-center justify-center text-cream"
            onClick={() => setActive(null)}
          >
            <X className="size-7" />
          </button>
          <img src={item.src} alt={item.alt} className="max-h-[88vh] max-w-full object-contain" />
        </div>
      )}
    </section>
  );
}

function Review() {
  return (
    <section className="border-y border-border">
      <div className="container-ed grid gap-12 py-24 md:grid-cols-12 md:items-center md:py-32">
        <Reveal className="md:col-span-4">
          <div className="mx-auto aspect-[3/4] w-3/4 overflow-hidden md:w-full">
            <img
              src="/images/cartao-presente.jpg"
              alt="Cartão com a identidade visual de Stefanie Probst Fortes"
              loading="lazy"
              className="size-full object-cover"
            />
          </div>
        </Reveal>
        <figure className="md:col-span-7 md:col-start-6">
          <blockquote className="font-display text-[clamp(1.9rem,3.6vw,3.2rem)] italic leading-[1.15] text-primary">
            “Stefanie é excelente profissional e querida demaiss. Atenciosa e tem mãos de fada.”
          </blockquote>
          <figcaption className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.95rem] text-muted-foreground">
            <span className="font-medium text-foreground">Eloisa Probst</span>
            <span aria-hidden>·</span>
            <span>Avaliação no Google</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

const FAQ = [
  ["Quais procedimentos posso agendar?", "Você pode entrar em contato para saber mais sobre limpeza de pele, dermaplaning e cuidados com as sobrancelhas."],
  ["Como faço para agendar um horário?", "É simples. Clique no botão de WhatsApp e converse diretamente para consultar a disponibilidade."],
  ["Onde fica o espaço?", "O atendimento acontece na Rua Marcílio de Oliveira, 55, no bairro Tribess, em Blumenau, Santa Catarina."],
  ["Como saber qual cuidado é mais indicado para mim?", "Converse com a Stefanie e explique o que você procura. Assim, ela poderá orientar sobre os procedimentos disponíveis."],
  ["Quais são os horários de atendimento?", "Os horários disponíveis podem ser consultados diretamente pelo WhatsApp."],
];

function Faq() {
  return (
    <section className="bg-card">
      <div className="container-ed grid gap-12 py-24 md:grid-cols-12 md:py-32">
        <h2 className="t-section text-primary md:col-span-4">Perguntas frequentes</h2>
        <div className="md:col-span-7 md:col-start-6">
          {FAQ.map(([q, a]) => (
            <details key={q} className="group border-b border-primary/20 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[1.0625rem] font-medium text-foreground focus-visible:outline-2 focus-visible:outline-ring">
                {q}
                <Plus aria-hidden className="size-5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <p className="max-w-[36rem] pb-7 text-[1rem] leading-relaxed text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section id="contato" className="bg-primary text-primary-foreground">
      <div className="container-ed py-24 md:py-36">
        <Reveal className="max-w-[52rem]">
          <h2 className="font-display text-[clamp(2.6rem,6vw,5.5rem)] leading-[1.02]">Seu momento de cuidado começa aqui.</h2>
          <p className="t-lead mt-8 max-w-[30rem] text-primary-foreground/80">
            Entre em contato, conheça os procedimentos e encontre um horário para você.
          </p>
          <a
            href={whatsappUrl(MESSAGES.final)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 inline-flex min-h-12 items-center gap-2.5 border border-primary-foreground bg-primary-foreground px-7 py-3 font-medium text-primary transition-colors duration-500 hover:bg-primary hover:text-primary-foreground"
          >
            <FaWhatsapp aria-hidden className="size-5" /> Agendar pelo WhatsApp
          </a>
        </Reveal>

        <div className="mt-24 grid gap-10 border-t border-primary-foreground/20 pt-12 text-[0.95rem] sm:grid-cols-3">
          <div>
            <p className="eyebrow mb-3 text-primary-foreground/60">Endereço</p>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="group inline-flex gap-2 leading-relaxed hover:underline">
              <MapPin aria-hidden className="mt-1 size-4 shrink-0" />
              <span>
                Rua Marcílio de Oliveira, 55
                <br />
                Tribess · Blumenau, SC
                <br />
                CEP 89055-590
              </span>
            </a>
          </div>
          <div>
            <p className="eyebrow mb-3 text-primary-foreground/60">WhatsApp</p>
            <a href={whatsappUrl(MESSAGES.final)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:underline">
              <FaWhatsapp aria-hidden className="size-4" /> {WHATSAPP_DISPLAY}
            </a>
          </div>
          <div>
            <p className="eyebrow mb-3 text-primary-foreground/60">Instagram</p>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:underline">
              <FaInstagram aria-hidden className="size-4" /> @stefaniepfortes
            </a>
          </div>
        </div>
      </div>
      <footer className="border-t border-primary-foreground/15">
        <div className="container-ed flex flex-col gap-2 py-8 text-[0.8rem] text-primary-foreground/60 sm:flex-row sm:justify-between">
          <span>Estética Stefanie Probst Fortes</span>
          <span>Estética facial e sobrancelhas · Blumenau</span>
        </div>
      </footer>
    </section>
  );
}

function FloatingWhatsapp() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 0.8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <a
      href={whatsappUrl(MESSAGES.hero)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar pelo WhatsApp"
      className={`fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-30 inline-flex size-14 items-center justify-center rounded-full border border-primary bg-primary text-primary-foreground shadow-lg transition-all duration-500 hover:bg-background hover:text-primary ${show ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
    >
      <FaWhatsapp className="size-6" />
    </a>
  );
}

function Index() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <About />
        <Procedures />
        <Space />
        <Gallery />
        <Review />
        <Faq />
        <FinalCta />
      </main>
      <FloatingWhatsapp />
    </>
  );
}
