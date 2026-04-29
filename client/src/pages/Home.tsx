import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Instagram, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  window.addEventListener("scroll", handleScroll);

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
            <div className="w-10 h-10 bg-gradient-to-br from-[#859B48] to-[#1D361F] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">FP</span>
            </div>
            <span className="font-serif font-bold text-lg text-[#1D361F] hidden sm:inline">
              Dr. Felipe Putti
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#sobre" className="text-[#1D361F] hover:text-[#859B48] transition font-medium text-sm">
              Sobre
            </a>
            <a href="#beneficios" className="text-[#1D361F] hover:text-[#859B48] transition font-medium text-sm">
              Benefícios
            </a>
            <a href="#contato" className="text-[#1D361F] hover:text-[#859B48] transition font-medium text-sm">
              Contato
            </a>
          </nav>

          <Button className="bg-[#859B48] hover:bg-[#1D361F] text-white rounded-full px-6">
            Agendar Consulta
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-0">
        <div className="container max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-block">
                  <span className="text-[#859B48] font-semibold text-sm tracking-wide uppercase">
                    Medicina Esportiva & Performance
                  </span>
                </div>
                <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#1D361F] leading-tight">
                  Recupere sua <span className="text-[#859B48]">Performance</span>
                </h1>
                <p className="text-xl text-[#5A6A2E] leading-relaxed max-w-lg">
                  Otimização metabólica e emagrecimento definitivo para profissionais que não têm tempo a perder.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-[#859B48] hover:bg-[#1D361F] text-white rounded-full px-8 py-6 text-lg flex items-center gap-2">
                  Agende sua Consulta
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-[#859B48] text-[#859B48] hover:bg-[#f0f5eb] rounded-full px-8 py-6 text-lg"
                >
                  Conheça o Método
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#e8ede3]">
                <div>
                  <div className="text-3xl font-bold text-[#859B48]">12+</div>
                  <p className="text-sm text-[#5A6A2E]">Anos de Atuação</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#859B48]">1000+</div>
                  <p className="text-sm text-[#5A6A2E]">Pacientes Atendidos</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#859B48]">3</div>
                  <p className="text-sm text-[#5A6A2E]">Áreas de Atuação</p>
                </div>
              </div>
            </div>

            {/* Right Image Placeholder */}
            <div className="hidden md:flex items-center justify-center">
              <div className="relative w-full aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-[#859B48] to-[#1D361F] rounded-3xl opacity-10 blur-3xl"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-[#f0f5eb] to-[#f5f7f2] rounded-3xl flex items-center justify-center border-2 border-[#e8ede3]">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#859B48] to-[#1D361F] rounded-full mx-auto flex items-center justify-center">
                      <span className="text-white text-3xl font-bold">FP</span>
                    </div>
                    <p className="text-[#1D361F] font-semibold">Dr. Felipe Putti</p>
                    <p className="text-sm text-[#5A6A2E]">CRM 169940 SP</p>
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
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1D361F] mb-4">
              Localização e Experiência
            </h2>
            <p className="text-xl text-[#5A6A2E] max-w-2xl mx-auto">
              Sediado em Bauru, SP, com mais de 12 anos de atuação dedicados à saúde e bem-estar de nossos pacientes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-gradient-to-br from-[#f0f5eb] to-[#f5f7f2] p-8 rounded-2xl border border-[#e8ede3] hover:shadow-lg transition">
              <div className="w-12 h-12 bg-[#859B48] rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#1D361F] mb-2">Localização Premium</h3>
              <p className="text-[#5A6A2E]">
                Clínica boutique localizada no coração de Bauru, com ambiente acolhedor e tecnologia de ponta.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-gradient-to-br from-[#f0f5eb] to-[#f5f7f2] p-8 rounded-2xl border border-[#e8ede3] hover:shadow-lg transition">
              <div className="w-12 h-12 bg-[#859B48] rounded-lg flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#1D361F] mb-2">Experiência Comprovada</h3>
              <p className="text-[#5A6A2E]">
                Mais de 12 anos de atuação em Medicina Esportiva, Nutrição e Estética Integradas.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-gradient-to-br from-[#f0f5eb] to-[#f5f7f2] p-8 rounded-2xl border border-[#e8ede3] hover:shadow-lg transition">
              <div className="w-12 h-12 bg-[#859B48] rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold text-lg">3</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-[#1D361F] mb-2">3 Áreas de Atuação</h3>
              <p className="text-[#5A6A2E]">
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
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1D361F] mb-4">
              O que Oferecemos
            </h2>
            <p className="text-xl text-[#5A6A2E] max-w-2xl mx-auto">
              Acompanhamento personalizado e evolução assistida pela equipe do Dr. Felipe Putti.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Benefit 1 */}
            <div className="bg-white rounded-2xl p-8 border border-[#e8ede3] hover:shadow-xl transition">
              <div className="w-14 h-14 bg-[#f0f5eb] rounded-xl flex items-center justify-center mb-4">
                <span className="text-[#859B48] font-bold text-2xl">01</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#1D361F] mb-3">Evolução Clínica</h3>
              <p className="text-[#5A6A2E] leading-relaxed">
                Acompanhamento individualizado com análises periódicas e ajustes no protocolo de tratamento.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white rounded-2xl p-8 border border-[#e8ede3] hover:shadow-xl transition">
              <div className="w-14 h-14 bg-[#f0f5eb] rounded-xl flex items-center justify-center mb-4">
                <span className="text-[#859B48] font-bold text-2xl">02</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#1D361F] mb-3">Evolução Corporal</h3>
              <p className="text-[#5A6A2E] leading-relaxed">
                Transformação visível com metodologia comprovada de emagrecimento e otimização estética.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white rounded-2xl p-8 border border-[#e8ede3] hover:shadow-xl transition">
              <div className="w-14 h-14 bg-[#f0f5eb] rounded-xl flex items-center justify-center mb-4">
                <span className="text-[#859B48] font-bold text-2xl">03</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#1D361F] mb-3">Suporte Contínuo</h3>
              <p className="text-[#5A6A2E] leading-relaxed">
                Acesso direto à equipe via WhatsApp para dúvidas, orientações e ajustes no programa.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="bg-white rounded-2xl p-8 border border-[#e8ede3] hover:shadow-xl transition">
              <div className="w-14 h-14 bg-[#f0f5eb] rounded-xl flex items-center justify-center mb-4">
                <span className="text-[#859B48] font-bold text-2xl">04</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#1D361F] mb-3">Tecnologia Avançada</h3>
              <p className="text-[#5A6A2E] leading-relaxed">
                Bioimpedância InBody e exames laboratoriais avançados para monitoramento preciso.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Direção Clínica Section */}
      <section className="py-20 bg-gradient-to-br from-[#1D361F] to-[#0F1A10] text-white">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Direção Clínica</h2>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-3xl p-12 border border-white/20 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-[#859B48] to-[#6B7A3A] rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-4xl font-bold">FP</span>
            </div>
            <h3 className="text-3xl font-serif font-bold mb-2">Dr. Felipe Putti</h3>
            <p className="text-[#c9d5a8] text-lg mb-4">Diretor Técnico Médico</p>
            <p className="text-[#c9d5a8] font-semibold">CRM 169940 SP</p>
            <p className="text-[#c9d5a8] mt-4 max-w-2xl mx-auto leading-relaxed">
              Especialista em Medicina Esportiva, Nutrição e Estética com mais de 12 anos de experiência dedicados à otimização da saúde e performance de seus pacientes.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contato" className="py-20">
        <div className="container max-w-4xl">
          <div className="bg-gradient-to-br from-[#f0f5eb] to-[#f5f7f2] rounded-3xl p-12 border-2 border-[#e8ede3] text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1D361F] mb-6">
              Pronto para Transformar sua Saúde?
            </h2>
            <p className="text-xl text-[#5A6A2E] mb-8 max-w-2xl mx-auto">
              Entre em contato conosco e agende sua consulta de mapeamento inicial. Vagas limitadas para garantir atendimento exclusivo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-[#859B48] hover:bg-[#1D361F] text-white rounded-full px-8 py-6 text-lg">
                Agendar Consulta
              </Button>
              <Button
                variant="outline"
                className="border-2 border-[#859B48] text-[#859B48] hover:bg-[#f0f5eb] rounded-full px-8 py-6 text-lg"
              >
                Falar no WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer/Contact */}
      <footer className="bg-[#1D361F] text-white py-16">
        <div className="container max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-[#859B48] to-[#6B7A3A] rounded-lg flex items-center justify-center">
                  <span className="font-bold text-lg">FP</span>
                </div>
                <span className="font-serif font-bold text-lg">Dr. Felipe Putti</span>
              </div>
              <p className="text-[#c9d5a8] text-sm">
                Saúde e Bem-estar Integrativos no coração de Bauru.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-serif font-bold mb-4">Menu</h4>
              <ul className="space-y-2 text-[#c9d5a8] text-sm">
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
                  <a href="#contato" className="hover:text-white transition">
                    Contato
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-serif font-bold mb-4">Contato</h4>
              <ul className="space-y-3 text-[#c9d5a8] text-sm">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-[#859B48]" />
                  <span>R. Machado de Assis, Quadra 8 - Jardim Estoril, Bauru - SP, 17014-040</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#859B48]" />
                  <a href="tel:14996162354" className="hover:text-white transition">
                    (14) 99616-2354
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#859B48]" />
                  <a href="mailto:felipeputti@uol.com.br" className="hover:text-white transition">
                    felipeputti@uol.com.br
                  </a>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-serif font-bold mb-4">Redes Sociais</h4>
              <ul className="space-y-2 text-[#c9d5a8] text-sm">
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
          <div className="border-t border-[#3a5a2f] pt-8">
            <p className="text-center text-[#8a9d7a] text-sm">
              © 2026 Dr. Felipe Putti. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
