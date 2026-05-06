import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, CheckCircle2, Phone, Mail, Instagram, Star } from "lucide-react";
import { useState, useEffect } from "react";
import QualificationModal from "@/components/QualificationModal";

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

          <nav className="hidden md:flex items-center gap-8">
            <a href="#sobre" className="text-[#344D0E] hover:text-[#76993D] transition font-medium text-sm">
              Sobre
            </a>
            <a href="#beneficios" className="text-[#344D0E] hover:text-[#76993D] transition font-medium text-sm">
              Benefícios
            </a>
            <a href="#metodo" className="text-[#344D0E] hover:text-[#76993D] transition font-medium text-sm">
              O Método
            </a>
            <a href="#contato" className="text-[#344D0E] hover:text-[#76993D] transition font-medium text-sm">
              Contato
            </a>
          </nav>

          <Button 
            onClick={() => handleScheduleClick('Header')}
            className="bg-[#76993D] hover:bg-[#344D0E] text-white rounded-full px-6"
          >
            Agendar Consulta
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
                  Recupere sua <span className="text-[#76993D]">Performance</span>
                </h1>
                <p className="text-xl text-[#4A5F22] leading-relaxed max-w-lg">
                  Otimização metabólica e emagrecimento definitivo para profissionais que não têm tempo a perder.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => handleScheduleClick('Hero')}
                  className="bg-[#76993D] hover:bg-[#344D0E] text-white rounded-full px-8 py-6 text-lg flex items-center gap-2"
                >
                  Agende sua Consulta
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-[#76993D] text-[#76993D] hover:bg-[#f2f6eb] rounded-full px-8 py-6 text-lg"
                  onClick={() => handleMethodClick('Hero')}
                >
                  Conheça o Método
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#e9eee1]">
                <div>
                  <div className="text-3xl font-bold text-[#76993D]">12+</div>
                  <p className="text-sm text-[#4A5F22]">Anos de Atuação</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#76993D]">1000+</div>
                  <p className="text-sm text-[#4A5F22]">Pacientes Atendidos</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#76993D]">3</div>
                  <p className="text-sm text-[#4A5F22]">Áreas de Atuação</p>
                </div>
              </div>
            </div>

            {/* Right Image Placeholder */}
            <div className="hidden md:flex items-center justify-center">
              <div className="relative w-full aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-[#76993D] to-[#344D0E] rounded-3xl opacity-10 blur-3xl"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-[#f2f6eb] to-[#f7f9f3] rounded-3xl flex items-center justify-center border-2 border-[#e9eee1]">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#76993D] to-[#344D0E] rounded-full mx-auto flex items-center justify-center">
                      <span className="text-white text-3xl font-bold">FP</span>
                    </div>
                    <p className="text-[#344D0E] font-semibold">Dr. Felipe Putti</p>
                    <p className="text-sm text-[#4A5F22]">CRM 169940 SP</p>
                  </div>
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
              Acompanhamento personalizado e evolução assistida pela equipe do Dr. Felipe Putti.
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
                Acompanhamento individualizado com análises periódicas e ajustes no protocolo de tratamento.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white rounded-2xl p-8 border border-[#e9eee1] hover:shadow-xl transition">
              <div className="w-14 h-14 bg-[#f2f6eb] rounded-xl flex items-center justify-center mb-4">
                <span className="text-[#76993D] font-bold text-2xl">02</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#344D0E] mb-3">Evolução Corporal</h3>
              <p className="text-[#4A5F22] leading-relaxed">
                Transformação visível com metodologia comprovada de emagrecimento e otimização estética.
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
            <div className="bg-white rounded-2xl p-6 border border-[#e9eee1] hover:shadow-lg transition text-center">
              <div className="w-12 h-12 bg-[#76993D] rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-white font-bold">1</span>
              </div>
              <h4 className="font-serif font-bold text-[#344D0E] mb-2">Mapeamento Profundo</h4>
              <p className="text-sm text-[#4A5F22]">
                Consulta inicial com análise completa do seu histórico de saúde
              </p>
            </div>

            {/* Etapa 2 */}
            <div className="bg-white rounded-2xl p-6 border border-[#e9eee1] hover:shadow-lg transition text-center">
              <div className="w-12 h-12 bg-[#76993D] rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-white font-bold">2</span>
              </div>
              <h4 className="font-serif font-bold text-[#344D0E] mb-2">Análise Hormonal</h4>
              <p className="text-sm text-[#4A5F22]">
                Exames laboratoriais avançados para entender o funcionamento do seu metabolismo.
              </p>
            </div>

            {/* Etapa 3 */}
            <div className="bg-white rounded-2xl p-6 border border-[#e9eee1] hover:shadow-lg transition text-center">
              <div className="w-12 h-12 bg-[#76993D] rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-white font-bold">3</span>
              </div>
              <h4 className="font-serif font-bold text-[#344D0E] mb-2">Suplementação</h4>
              <p className="text-sm text-[#4A5F22]">
                Prescrição personalizada de manipulados e peptídeos para otimizar seus resultados.
              </p>
            </div>

            {/* Etapa 4 */}
            <div className="bg-white rounded-2xl p-6 border border-[#e9eee1] hover:shadow-lg transition text-center">
              <div className="w-12 h-12 bg-[#76993D] rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-white font-bold">4</span>
              </div>
              <h4 className="font-serif font-bold text-[#344D0E] mb-2">Estratégia Alimentar</h4>
              <p className="text-sm text-[#4A5F22]">
                Plano nutricional inteligente adaptado ao seu estilo de vida e objetivos.
              </p>
            </div>

            {/* Etapa 5 */}
            <div className="bg-white rounded-2xl p-6 border border-[#e9eee1] hover:shadow-lg transition text-center">
              <div className="w-12 h-12 bg-[#76993D] rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-white font-bold">5</span>
              </div>
              <h4 className="font-serif font-bold text-[#344D0E] mb-2">Suporte Contínuo</h4>
              <p className="text-sm text-[#4A5F22]">
                Acesso direto via WhatsApp em horário comercial para dúvidas e orientações.
              </p>
            </div>

            {/* Etapa 6 */}
            <div className="bg-white rounded-2xl p-6 border border-[#e9eee1] hover:shadow-lg transition text-center">
              <div className="w-12 h-12 bg-[#76993D] rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-white font-bold">6</span>
              </div>
              <h4 className="font-serif font-bold text-[#344D0E] mb-2">Análise Genética</h4>
              <p className="text-sm text-[#4A5F22]">
                Teste genético para entender sua predisposição metabólica e personalizar seu programa.
              </p>
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
              O Que Nossos Pacientes Dizem
            </h2>
            <p className="text-xl text-[#4A5F22] max-w-2xl mx-auto">
              Histórias reais de transformação e sucesso com o método do Dr. Felipe Putti.
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

          <div className="bg-gradient-to-br from-[#f2f6eb] to-[#f7f9f3] rounded-3xl p-12 border border-[#e9eee1] text-center">
            <div className="relative w-40 h-40 mx-auto mb-6">
              <img 
                src="/manus-storage/dr_felipe_sem_fundo_5b97e748.png" 
                alt="Dr. Felipe Putti" 
                className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-[#76993D] relative z-10"
              />
            </div>
            <h3 className="text-3xl font-serif font-bold mb-2 text-[#344D0E]">Dr. Felipe Putti</h3>
            <p className="text-[#76993D] text-lg mb-4 font-semibold">Diretor Técnico Médico</p>
            <p className="text-[#4A5F22] font-semibold mb-4">CRM 169940 SP</p>
            <p className="text-[#4A5F22] mt-4 max-w-2xl mx-auto leading-relaxed">
              Especialista em Medicina Esportiva, Nutrição e Estética com mais de 12 anos de experiência dedicados à otimização da saúde e performance de seus pacientes.
            </p>
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
                Agendar Consulta
              </Button>
              <Button
                variant="outline"
                className="border-2 border-[#76993D] text-[#76993D] hover:bg-[#f2f6eb] rounded-full px-8 py-6 text-lg"
                onClick={() => handleMethodClick('CTA')}
              >
                Conhecer o Método
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer/Contact */}
      <footer className="bg-[#344D0E] text-white py-16">
        <div className="container max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
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
                  <a href="tel:14996162354" className="hover:text-white transition">
                    (14) 99616-2354
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#76993D]" />
                  <a href="mailto:felipeputti@uol.com.br" className="hover:text-white transition">
                    felipeputti@uol.com.br
                  </a>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-serif font-bold mb-4">Redes Sociais</h4>
              <ul className="space-y-2 text-[#d4e5b9] text-sm">
                <li>
                  <a href="https://instagram.com/dr.felipeputti" className="hover:text-white transition flex items-center gap-2">
                    <Instagram className="w-4 h-4" />
                    @dr.felipeputti
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[#2a3d08] pt-8">
            <p className="text-center text-[#9ab878] text-sm">
              © 2026 Dr. Felipe Putti. Todos os direitos reservados.
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
