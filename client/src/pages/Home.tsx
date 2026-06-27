import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, CheckCircle2, Phone, Mail, Instagram, Star } from "lucide-react";
import { useState, useEffect } from "react";
import QualificationModal from "@/components/QualificationModal";
import { trackButtonClick, trackSectionView, trackWhatsAppClick } from "@/utils/gtm";

// Declarar fbq como global
declare global {
  interface Window {
    fbq?: (action: string, event: string, data?: Record<string, unknown>) => void;
  }
}

export default function Home() {
  const [isQualificationModalOpen, setIsQualificationModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [testimonialsTracked, setTestimonialsTracked] = useState(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
    
    // Rastrear quando usuário rola até a seção de depoimentos
    if (!testimonialsTracked) {
      const testimonialsSection = document.getElementById('testimonials');
      if (testimonialsSection) {
        const rect = testimonialsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          // Usuário está visualizando a seção de depoimentos
          if (typeof window.fbq !== 'undefined') {
            window.fbq('track', 'ViewContent', {
              content_name: 'Testimonials Section',
              content_type: 'section',
              value: 0,
              currency: 'BRL'
            });
            setTestimonialsTracked(true);
          }
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [testimonialsTracked]);

  const handleScheduleClick = (source: string) => {
    setIsQualificationModalOpen(true);
    // Rastrear clique em Lead
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'Lead', {
        content_name: `Schedule Consultation - ${source}`,
        content_type: 'button',
        value: 0,
        currency: 'BRL'
      });
    }
    // Rastrear clique em botão no GTM
    trackButtonClick('schedule_consultation', source);
  };

  const handleMethodClick = (source: string) => {
    document.getElementById('metodo')?.scrollIntoView({ behavior: 'smooth' });
    // Rastrear clique em Content View
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'ViewContent', {
        content_name: `Know the Method - ${source}`,
        content_type: 'button',
        value: 0,
        currency: 'BRL'
      });
    }
    // Rastrear clique em botão no GTM
    trackButtonClick('know_method', source);
    // Rastrear visualização da seção de método
    trackSectionView('method_section');
  };

  const testimonials = [
    {
      name: "Beatriz Souza",
      profession: "Médica",
      result: "Perdi 20kg em 6 meses"
    },
    {
      name: "Lucas A.",
      profession: "Empresário",
      result: "Ganhei massa magra e defini o shape"
    },
    {
      name: "Fernanda Lima",
      profession: "Promotora",
      result: "Melhorou desempenho físico e mental após a maternidade"
    },
    {
      name: "Ricardo Gomes",
      profession: "CEO de Multinacional",
      result: "Otimizei minha parte física e hormonal com ganhos expressivos na produtividade"
    },
    {
      name: "Larissa Oliveira",
      profession: "Engenheira",
      result: "Perdi 15kg em 6 meses e ganhei vitalidade para cuidar dos filhos e da empresa"
    },
    {
      name: "Gabriel Martins",
      profession: "Personal e Triatleta",
      result: "Otimização de treinos e suplementação com melhora do desempenho nos endurances"
    },
    {
      name: "Camila Rocha",
      profession: "Fisioterapeuta",
      result: "Melhora hormonal e evitei um câncer de tireoide que o Dr. fez o diagnóstico clínico"
    },
    {
      name: "Marcos Hirata",
      profession: "Bancário e Montanhista",
      result: "Ganhei força para ir mais longe depois dos 50 anos"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header/Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <img 
              src="/manus-storage/logos_30bbb326.png" 
              alt="Dr. Felipe Putti Logo" 
              className="w-10 h-10"
            />
            <span className="font-serif font-bold text-lg text-[#344D0E] hidden sm:inline">
              Dr. Felipe Putti
            </span>
          </div>



          <Button 
            onClick={() => handleScheduleClick('Header')}
            className="bg-[#76993D] hover:bg-[#344D0E] text-white rounded-full px-8 py-3 text-lg font-semibold animate-pulse shadow-lg hover:shadow-xl transition-all"
          >
            🔥 Agendar Consulta
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-0 relative">
        {/* Badge de Vagas */}
        <div className="absolute top-40 right-4 md:right-12">
          <div className="inline-flex items-center gap-2 bg-[#76993D] text-white px-4 py-2 rounded-full text-sm font-semibold animate-pulse">
            <span className="text-lg">⚡</span>
            Apenas 3 vagas esse mês
          </div>
        </div>

        <div className="container max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-block">
                  <span className="text-[#76993D] font-semibold text-sm tracking-wide uppercase">
                    Medicina Esportiva & Performance
                  </span>
                </div>
                <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#344D0E] leading-tight">
                  Transforme seu Corpo e <span className="text-[#76993D]">Recupere sua Energia</span>
                </h1>
                <p className="text-xl text-[#4A5F22] leading-relaxed max-w-lg">
                  Emagrecimento premium e otimização hormonal para mulheres que buscam performance e bem-estar sem sofrimento.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => handleScheduleClick('Hero')}
                  className="bg-[#76993D] hover:bg-[#344D0E] text-white rounded-full px-10 py-8 text-2xl font-bold flex items-center gap-3 animate-pulse shadow-2xl hover:shadow-2xl transition-all transform hover:scale-105"
                >
                  🔥 Quero Transformar Minha Saúde
                  <ArrowRight className="w-7 h-7" />
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-[#76993D] text-[#76993D] hover:bg-[#f2f6eb] rounded-full px-8 py-6 text-lg"
                  onClick={() => handleMethodClick('Hero')}
                >
                  Ver Detalhes do Método
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#e9eee1]">
                <div>
                  <div className="text-3xl font-bold text-[#76993D]">12+</div>
                  <p className="text-sm text-[#4A5F22]">Anos de Atuação</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#76993D]">+1000</div>
                  <p className="text-sm text-[#4A5F22]">Pacientes por Ano</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#76993D]">3</div>
                  <p className="text-sm text-[#4A5F22]">Áreas de Atuação</p>
                </div>
              </div>
            </div>


          </div>
        </div>
      </section>

      {/* Sobre Section */}
      <section id="sobre" className="py-20 bg-white/50 backdrop-blur">
        <div className="container max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#344D0E] mb-4">
              Localização e Experiência
            </h2>
            <p className="text-xl text-[#4A5F22] max-w-2xl mx-auto">
              Sediado em Bauru, SP, com mais de 12 anos de atuação dedicados à saúde e bem-estar de nossos pacientes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-gradient-to-br from-[#f2f6eb] to-[#f7f9f3] p-8 rounded-2xl border border-[#e9eee1] hover:shadow-lg transition">
              <div className="w-12 h-12 bg-[#76993D] rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#344D0E] mb-2">Localização Premium</h3>
              <p className="text-[#4A5F22]">
                Clínica boutique localizada no coração de Bauru, com ambiente acolhedor e tecnologia de ponta.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-gradient-to-br from-[#f2f6eb] to-[#f7f9f3] p-8 rounded-2xl border border-[#e9eee1] hover:shadow-lg transition">
              <div className="w-12 h-12 bg-[#76993D] rounded-lg flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#344D0E] mb-2">Experiência Comprovada</h3>
              <p className="text-[#4A5F22]">
                Mais de 12 anos de atuação em Medicina Esportiva, Nutrição e Estética Integradas.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-gradient-to-br from-[#f2f6eb] to-[#f7f9f3] p-8 rounded-2xl border border-[#e9eee1] hover:shadow-lg transition">
              <div className="w-12 h-12 bg-[#76993D] rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold text-lg">3</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-[#344D0E] mb-2">3 Áreas de Atuação</h3>
              <p className="text-[#4A5F22]">
                Medicina Esportiva, Nutrição e Estética integradas em um único lugar para sua comodidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benéfícios Section */}
      <section id="beneficios" className="py-20">
        <div className="container max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#344D0E] mb-4">
              O que Oferecemos
            </h2>
            <p className="text-xl text-[#4A5F22] max-w-2xl mx-auto">
              Transforme sua saúde e alcance seus objetivos com nosso acompanhamento personalizado e evolução assistida.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Benefit 1 */}
            <div className="bg-white rounded-2xl p-8 border border-[#e9eee1] hover:shadow-xl transition">
              <div className="w-14 h-14 bg-[#f2f6eb] rounded-xl flex items-center justify-center mb-4">
                <span className="text-[#76993D] font-bold text-2xl">01</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#344D0E] mb-3">Evolução Clínica</h3>
              <p className="text-[#4A5F22] leading-relaxed">
                Transformação personalizada com análises periódicas e ajustes contínuos para sua evolução.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white rounded-2xl p-8 border border-[#e9eee1] hover:shadow-xl transition">
              <div className="w-14 h-14 bg-[#f2f6eb] rounded-xl flex items-center justify-center mb-4">
                <span className="text-[#76993D] font-bold text-2xl">02</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#344D0E] mb-3">Evolução Corporal</h3>
              <p className="text-[#4A5F22] leading-relaxed">
                Resultados visíveis e duradouros com nossa metodologia exclusiva de emagrecimento e otimização estética.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white rounded-2xl p-8 border border-[#e9eee1] hover:shadow-xl transition">
              <div className="w-14 h-14 bg-[#f2f6eb] rounded-xl flex items-center justify-center mb-4">
                <span className="text-[#76993D] font-bold text-2xl">03</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#344D0E] mb-3">Suporte Contínuo</h3>
              <p className="text-[#4A5F22] leading-relaxed">
                Acesso direto à equipe via WhatsApp para dúvidas, orientações e ajustes no programa.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="bg-white rounded-2xl p-8 border border-[#e9eee1] hover:shadow-xl transition">
              <div className="w-14 h-14 bg-[#f2f6eb] rounded-xl flex items-center justify-center mb-4">
                <span className="text-[#76993D] font-bold text-2xl">04</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#344D0E] mb-3">Tecnologia Avançada</h3>
              <p className="text-[#4A5F22] leading-relaxed">
                Monitoramento preciso com exames laboratoriais avançados e análises periódicas de composição corporal.
              </p>
            </div>

            {/* Benefit 5 */}
            <div className="bg-white rounded-2xl p-8 border border-[#e9eee1] hover:shadow-xl transition">
              <div className="w-14 h-14 bg-[#f2f6eb] rounded-xl flex items-center justify-center mb-4">
                <span className="text-[#76993D] font-bold text-2xl">05</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#344D0E] mb-3">Equipe Multidisciplinar</h3>
              <p className="text-[#4A5F22] leading-relaxed">
                Acompanhamento integrado com cardiologista, nutricionista, nutrólogo, educador físico, psicólogo, fisioterapeuta e enfermeiro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* O Método Section */}
      <section id="metodo" className="py-20 bg-white/50 backdrop-blur">
        <div className="container max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#344D0E] mb-4">
              Como Funciona o Nosso Método
            </h2>
            <p className="text-xl text-[#4A5F22] max-w-2xl mx-auto">
              Um programa de acompanhamento completo de 12 semanas (3 meses) com resultados comprovados e suporte contínuo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Etapa 1 */}
            <div className="bg-white rounded-2xl overflow-hidden border border-[#e9eee1] hover:shadow-lg transition">
              <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663568685363/cH9bd3vdEswPP279KavXwa/metodo_1_mapeamento_profundo-9SbxoVpuGg52QmaE8iZ8as.webp" alt="Mapeamento Profundo" className="w-full h-40 object-cover" />
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-[#76993D] rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <span className="text-white font-bold">1</span>
                </div>
                <h4 className="font-serif font-bold text-[#344D0E] mb-2">Mapeamento Profundo</h4>
                <p className="text-sm text-[#4A5F22]">
                  Consulta inicial com análise completa do seu histórico de saúde
                </p>
              </div>
            </div>

            {/* Etapa 2 */}
            <div className="bg-white rounded-2xl overflow-hidden border border-[#e9eee1] hover:shadow-lg transition">
              <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663568685363/cH9bd3vdEswPP279KavXwa/metodo_2_analise_hormonal-SPW3PopKAGb5qyALxV2PxP.webp" alt="Análise Hormonal" className="w-full h-40 object-cover" />
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-[#76993D] rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <span className="text-white font-bold">2</span>
                </div>
                <h4 className="font-serif font-bold text-[#344D0E] mb-2">Análise Hormonal</h4>
                <p className="text-sm text-[#4A5F22]">
                  Exames laboratoriais avançados para entender o funcionamento do seu metabolismo.
                </p>
              </div>
            </div>

            {/* Etapa 3 */}
            <div className="bg-white rounded-2xl overflow-hidden border border-[#e9eee1] hover:shadow-lg transition">
              <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663568685363/cH9bd3vdEswPP279KavXwa/metodo_3_suplementacao-avvwZE2G9ctncfkDLsQBga.webp" alt="Suplementação" className="w-full h-40 object-cover" />
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-[#76993D] rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <span className="text-white font-bold">3</span>
                </div>
                <h4 className="font-serif font-bold text-[#344D0E] mb-2">Suplementação</h4>
                <p className="text-sm text-[#4A5F22]">
                  Prescrição personalizada de manipulados e peptídeos para otimizar seus resultados.
                </p>
              </div>
            </div>

            {/* Etapa 4 */}
            <div className="bg-white rounded-2xl overflow-hidden border border-[#e9eee1] hover:shadow-lg transition">
              <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663568685363/cH9bd3vdEswPP279KavXwa/metodo_4_estrategia_alimentar-fjCP5kNBSTdKayReKhobZ9.webp" alt="Estratégia Alimentar" className="w-full h-40 object-cover" />
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-[#76993D] rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <span className="text-white font-bold">4</span>
                </div>
                <h4 className="font-serif font-bold text-[#344D0E] mb-2">Estratégia Alimentar</h4>
                <p className="text-sm text-[#4A5F22]">
                  Plano nutricional inteligente adaptado ao seu estilo de vida e objetivos.
                </p>
              </div>
            </div>

            {/* Etapa 5 */}
            <div className="bg-white rounded-2xl overflow-hidden border border-[#e9eee1] hover:shadow-lg transition">
              <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663568685363/cH9bd3vdEswPP279KavXwa/metodo_5_suporte_continuo-7b2SSoTEHRTPyoRcC934k7.webp" alt="Suporte Contínuo" className="w-full h-40 object-cover" />
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-[#76993D] rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <span className="text-white font-bold">5</span>
                </div>
                <h4 className="font-serif font-bold text-[#344D0E] mb-2">Suporte Contínuo</h4>
                <p className="text-sm text-[#4A5F22]">
                  Acesso direto via WhatsApp em horário comercial para dúvidas e orientações.
                </p>
              </div>
            </div>

            {/* Etapa 6 */}
            <div className="bg-white rounded-2xl overflow-hidden border border-[#e9eee1] hover:shadow-lg transition">
              <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663568685363/cH9bd3vdEswPP279KavXwa/metodo_6_analise_genetica-KoAqF3DSiorrJqzSa8qxHQ.webp" alt="Análise Genética" className="w-full h-40 object-cover" />
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-[#76993D] rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <span className="text-white font-bold">6</span>
                </div>
                <h4 className="font-serif font-bold text-[#344D0E] mb-2">Análise Genética</h4>
                <p className="text-sm text-[#4A5F22]">
                  Teste genético para entender sua predisposição metabólica e personalizar seu programa.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#f2f6eb] to-[#f7f9f3] rounded-2xl p-8 border border-[#e9eee1] text-center">
            <h3 className="text-2xl font-serif font-bold text-[#344D0E] mb-4">
              Pronto para Começar?
            </h3>
            <p className="text-[#4A5F22] mb-6 max-w-2xl mx-auto">
              Aplique para o nosso programa de acompanhamento premium e transforme sua saúde em 12 semanas.
            </p>
            <Button 
              onClick={() => handleScheduleClick('Method')}
              className="bg-[#76993D] hover:bg-[#344D0E] text-white rounded-full px-8 py-6 text-lg"
            >
              Aplicar para o Programa
            </Button>
          </div>
        </div>
      </section>

      {/* Depoimentos Section */}
      <section id="testimonials" className="py-20">
        <div className="container max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#344D0E] mb-4">
              Resultados que Transformam Vidas
            </h2>
            <p className="text-xl text-[#4A5F22] max-w-2xl mx-auto">
              Veja como o Protocolo Dr. Felipe Putti já ajudou centenas de mulheres a recuperarem sua energia, corpo e autoestima.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border border-[#e9eee1] hover:shadow-lg transition">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#76993D] text-[#76993D]" />
                  ))}
                </div>
                <p className="text-[#4A5F22] mb-4 leading-relaxed text-sm">
                  "{testimonial.result}"
                </p>
                <div className="border-t border-[#e9eee1] pt-4">
                  <p className="font-serif font-bold text-[#344D0E]">{testimonial.name}</p>
                  <p className="text-xs text-[#76993D] font-semibold">{testimonial.profession}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Direção Clínica Section */}
      <section className="py-20 bg-white/50 backdrop-blur">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-[#344D0E]">Direção Clínica</h2>
          </div>

          <div className="bg-gradient-to-br from-[#f2f6eb] to-[#f7f9f3] rounded-3xl p-12 border border-[#e9eee1]">
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">
              <div className="flex-shrink-0">
                <div className="relative w-48 h-48 md:w-56 md:h-56">
                  <img 
                    src="/manus-storage/dr_felipe_sem_fundo_5b97e748.png" 
                    alt="Dr. Felipe Putti" 
                    className="w-full h-full rounded-full object-cover border-4 border-[#76993D]"
                  />
                </div>
              </div>
              <div className="text-center md:text-left">
              <h3 className="text-3xl font-serif font-bold mb-2 text-[#344D0E]">Dr. Felipe Putti</h3>
              <p className="text-[#76993D] text-lg mb-4 font-semibold">Diretor Técnico Médico</p>
              <p className="text-[#4A5F22] font-semibold mb-4">CRM 169940 SP</p>
              <p className="text-[#4A5F22] mt-4 leading-relaxed">
                Com mais de 12 anos de experiência, o Dr. Felipe Putti é um especialista em Medicina Esportiva, Nutrição e Estética. Sua jornada é dedicada a transformar vidas, otimizando a saúde e performance de seus pacientes com uma abordagem integrativa e resultados comprovados.
              </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <div className="container max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#344D0E] mb-4">
              Dúvidas Frequentes
            </h2>
            <p className="text-xl text-[#4A5F22] max-w-2xl mx-auto">
              Tudo que você precisa saber sobre nossos tratamentos
            </p>
          </div>

          <div className="space-y-4">
            {/* Emagrecimento FAQs */}
            <div className="bg-white rounded-2xl p-6 border border-[#e9eee1] hover:shadow-lg transition">
              <div className="mb-6">
                <h3 className="text-2xl font-serif font-bold text-[#76993D] mb-4">Tratamento Emagrecimento</h3>
              </div>
              <div className="space-y-3">
                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between font-semibold text-[#344D0E] hover:text-[#76993D] transition">
                    <span>Quanto tempo leva para ver resultados no Tratamento Emagrecimento?</span>
                    <span className="transition group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-3 text-[#4A5F22] leading-relaxed pl-4 border-l-2 border-[#76993D]">
                    Nossos pacientes começam a notar mudanças significativas entre 2-4 semanas. Resultados mais expressivos (10-20kg) ocorrem entre 3-6 meses, dependendo do ponto de partida e aderência ao programa.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between font-semibold text-[#344D0E] hover:text-[#76993D] transition">
                    <span>Qual é o investimento do Tratamento Emagrecimento?</span>
                    <span className="transition group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-3 text-[#4A5F22] leading-relaxed pl-4 border-l-2 border-[#76993D]">
                    O programa de 12 semanas tem o custo estimado menos que você gastou até hoje com tentativas frustradas, incluindo consultas, exames, suplementação personalizada e suporte via WhatsApp. Também temos o programa de 12 meses com virada total da saúde. Oferecemos planos de pagamento parcelados.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between font-semibold text-[#344D0E] hover:text-[#76993D] transition">
                    <span>O tratamento funciona para qualquer tipo de corpo?</span>
                    <span className="transition group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-3 text-[#4A5F22] leading-relaxed pl-4 border-l-2 border-[#76993D]">
                    Sim! Cada tratamento é 100% personalizado baseado em sua avaliação médica, análise hormonal e histórico. Adaptamos para qualquer metabolismo, idade ou condição de saúde.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between font-semibold text-[#344D0E] hover:text-[#76993D] transition">
                    <span>Preciso fazer dieta rigorosa no Tratamento Emagrecimento?</span>
                    <span className="transition group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-3 text-[#4A5F22] leading-relaxed pl-4 border-l-2 border-[#76993D]">
                    Não! Oferecemos uma estratégia alimentar inteligente, não uma dieta restritiva. Você aprende a comer bem, mantém energia e consegue aderir ao programa sem sofrimento.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between font-semibold text-[#344D0E] hover:text-[#76993D] transition">
                    <span>Posso continuar meus treinos normais durante o tratamento?</span>
                    <span className="transition group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-3 text-[#4A5F22] leading-relaxed pl-4 border-l-2 border-[#76993D]">
                    Sim! Na verdade, recomendamos. Nosso educador físico otimiza seus treinos para potencializar resultados. O tratamento se adapta ao seu nível de atividade.
                  </p>
                </details>
              </div>
            </div>

            {/* Hipertrofia FAQs */}
            <div className="bg-white rounded-2xl p-6 border border-[#e9eee1] hover:shadow-lg transition">
              <div className="mb-6">
                <h3 className="text-2xl font-serif font-bold text-[#76993D] mb-4">Tratamento Hipertrofia</h3>
              </div>
              <div className="space-y-3">
                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between font-semibold text-[#344D0E] hover:text-[#76993D] transition">
                    <span>Quanto tempo leva para ganhar massa muscular com o Tratamento Hipertrofia?</span>
                    <span className="transition group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-3 text-[#4A5F22] leading-relaxed pl-4 border-l-2 border-[#76993D]">
                    Ganhos significativos começam em 4-6 semanas. Nossos pacientes ganham em média 3-5kg de massa magra em 12 semanas, com redução de gordura corporal.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between font-semibold text-[#344D0E] hover:text-[#76993D] transition">
                    <span>Qual é o investimento do Tratamento Hipertrofia?</span>
                    <span className="transition group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-3 text-[#4A5F22] leading-relaxed pl-4 border-l-2 border-[#76993D]">
                    O programa de 12 semanas tem o custo estimado menos que você gastou até hoje com tentativas frustradas, incluindo consultas, análise corporal, prescrição de suplementação otimizada e periodização de treino.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between font-semibold text-[#344D0E] hover:text-[#76993D] transition">
                    <span>Preciso de suplementação cara para o Tratamento Hipertrofia?</span>
                    <span className="transition group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-3 text-[#4A5F22] leading-relaxed pl-4 border-l-2 border-[#76993D]">
                    Não necessariamente. Recomendamos suplementação estratégica (proteína, creatina, BCAA entre outros). Tudo é manipulado e personalizado para seu objetivo.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between font-semibold text-[#344D0E] hover:text-[#76993D] transition">
                    <span>O tratamento inclui prescrição de treino?</span>
                    <span className="transition group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-3 text-[#4A5F22] leading-relaxed pl-4 border-l-2 border-[#76993D]">
                    Sim! Nosso educador físico prescreve treino periodizado específico para hipertrofia, com ajustes semanais baseado em sua evolução e feedback.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between font-semibold text-[#344D0E] hover:text-[#76993D] transition">
                    <span>Posso fazer o Tratamento Hipertrofia se sou iniciante?</span>
                    <span className="transition group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-3 text-[#4A5F22] leading-relaxed pl-4 border-l-2 border-[#76993D]">
                    Absolutamente! Adaptamos para qualquer nível. Iniciantes ganham muito mais rápido (até 8kg em 12 semanas) porque seu corpo responde bem ao estímulo novo.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between font-semibold text-[#344D0E] hover:text-[#76993D] transition">
                    <span>Como funciona o acompanhamento durante o tratamento?</span>
                    <span className="transition group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-3 text-[#4A5F22] leading-relaxed pl-4 border-l-2 border-[#76993D]">
                    Você tem acesso direto via WhatsApp, consultas quinzenais, análises periódicas de composição corporal e ajustes contínuos no programa conforme sua evolução.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section id="contato" className="py-20">
        <div className="container max-w-4xl">
          <div className="bg-gradient-to-br from-[#f2f6eb] to-[#f7f9f3] rounded-3xl p-12 border-2 border-[#e9eee1] text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#344D0E] mb-6">
              Pronto para Transformar sua Saúde?
            </h2>
            <p className="text-xl text-[#4A5F22] mb-8 max-w-2xl mx-auto">
              Entre em contato conosco e agende sua consulta de mapeamento inicial. Vagas limitadas para garantir atendimento exclusivo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => handleScheduleClick('CTA')}
                className="bg-[#76993D] hover:bg-[#344D0E] text-white rounded-full px-8 py-6 text-lg"
              >
                Agende Sua Avaliação
              </Button>
              <Button
                variant="outline"
                className="border-2 border-[#76993D] text-[#76993D] hover:bg-[#f2f6eb] rounded-full px-8 py-6 text-lg"
                onClick={() => handleMethodClick('CTA')}
              >
                Saiba Mais Sobre o Método
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer/Contact */}
      <footer className="bg-[#344D0E] text-white py-16">
        <div className="container max-w-6xl">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <img 
                  src="/manus-storage/logos_30bbb326.png" 
                  alt="Dr. Felipe Putti Logo" 
                  className="w-10 h-10"
                />
                <span className="font-serif font-bold text-lg">Dr. Felipe Putti</span>
              </div>
              <p className="text-[#d4e5b9] text-sm">
                Saúde e Bem-estar Integrativos no coração de Bauru.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-serif font-bold mb-4">Menu</h4>
              <ul className="space-y-2 text-[#d4e5b9] text-sm">
                <li>
                  <a href="#sobre" className="hover:text-white transition">
                    Sobre
                  </a>
                </li>
                <li>
                  <a href="#beneficios" className="hover:text-white transition">
                    Benefícios
                  </a>
                </li>
                <li>
                  <a href="#metodo" className="hover:text-white transition">
                    O Método
                  </a>
                </li>
                <li>
                  <a href="#contato" className="hover:text-white transition">
                    Contato
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-serif font-bold mb-4">Contato</h4>
              <ul className="space-y-3 text-[#d4e5b9] text-sm">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-[#76993D]" />
                  <span>R. Machado de Assis, Quadra 8 - Jardim Estoril, Bauru - SP, 17014-040</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#76993D]" />
                  <a href="tel:14996162354" className="hover:text-white transition" onClick={() => trackButtonClick('phone_contact', 'footer')}>
                    (14) 99616-2354
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#76993D]" />
                  <a href="mailto:email@drfelipeputti.com.br" className="hover:text-white transition" onClick={() => trackButtonClick('email_contact', 'footer')}>
                    email@drfelipeputti.com.br
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[#2a3d08] pt-8">
            <p className="text-center text-[#9ab878] text-sm">
              © 2026 Dr. Felipe Putti. Todos os direitos reservados.
              <br />
              CNPJ: XX.XXX.XXX/XXXX-XX
            </p>
          </div>
        </div>
      </footer>

      {/* Qualification Modal */}
      <QualificationModal 
        isOpen={isQualificationModalOpen}
        onClose={() => setIsQualificationModalOpen(false)}
      />
    </div>
  );
}
