import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { trackFormSubmit, trackWhatsAppClick, trackSuccessPageView } from "@/utils/gtm";

// Declarar fbq como global
declare global {
  interface Window {
    fbq?: (action: string, event: string, data?: Record<string, unknown>) => void;
  }
}

export default function Qualification() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    objective: "",
    budget: "",
    availability: "",
    experience: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Dados de qualificação:", formData);
    
    // Rastrear evento Contact do Pixel da Meta
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Contact', {
        content_name: 'Qualification Form Submitted',
        content_type: 'form',
        value: 0,
        currency: 'BRL'
      });
    }
    
    // Rastrear evento de formulário preenchido no GTM
    trackFormSubmit(formData);
    
    setSubmitted(true);
    
    // Rastrear página de sucesso visualizada
    trackSuccessPageView();
    
    // Redirecionar para WhatsApp após 2 segundos
    setTimeout(() => {
      const message = `Olá! Meu nome é ${formData.name}. Gostaria de agendar uma consulta. Objetivo: ${formData.objective}. Orçamento: ${formData.budget}. Disponibilidade: ${formData.availability}.`;
      const whatsappUrl = `https://wa.me/5514996162354?text=${encodeURIComponent(message)}`;
      
      // Rastrear clique em WhatsApp
      trackWhatsAppClick('form_submission_page');
      
      window.open(whatsappUrl, "_blank");
      setStep(1);
      setFormData({
        name: "",
        phone: "",
        objective: "",
        budget: "",
        availability: "",
        experience: "",
      });
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f9f3] to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#76993D] to-[#344D0E] text-white py-6 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold">Pré-Qualificação</h1>
            <p className="text-[#d4e5b9] text-sm mt-1">Descubra se você é candidato ideal para nosso programa</p>
          </div>
          <Link href="/">
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {submitted ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-[#76993D] rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-serif font-bold text-[#344D0E] mb-2">
                Perfeito!
              </h2>
              <p className="text-[#4A5F22] text-lg">
                Seus dados foram recebidos com sucesso. Você será redirecionado para o WhatsApp para confirmar seu agendamento.
              </p>
            </div>
            <div className="pt-4">
              <p className="text-sm text-[#5A6A2E]">
                Se não for redirecionado automaticamente, <a href="https://wa.me/5514996162354" target="_blank" rel="noopener noreferrer" className="text-[#76993D] font-semibold hover:underline">clique aqui</a>.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Informações Básicas */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-[#344D0E] mb-6">
                      Etapa 1 de 3: Informações Básicas
                    </h3>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#344D0E] mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Seu nome completo"
                      required
                      className="w-full px-4 py-3 border border-[#e9eee1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#76993D] bg-[#f7f9f3]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#344D0E] mb-2">
                      WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(14) 99999-9999"
                      required
                      className="w-full px-4 py-3 border border-[#e9eee1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#76993D] bg-[#f7f9f3]"
                    />
                  </div>

                  <p className="text-xs text-[#5A6A2E] bg-[#f2f6eb] p-3 rounded-lg">
                    * Campos obrigatórios. Seus dados são confidenciais e serão usados apenas para agendamento.
                  </p>
                </div>
              )}

              {/* Step 2: Objetivos e Experiência */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-[#344D0E] mb-6">
                      Etapa 2 de 3: Seus Objetivos
                    </h3>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#344D0E] mb-2">
                      Qual é seu objetivo principal? *
                    </label>
                    <select
                      name="objective"
                      value={formData.objective}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-[#e9eee1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#76993D] bg-[#f7f9f3]"
                    >
                      <option value="">Selecione uma opção</option>
                      <option value="emagrecimento">Emagrecimento definitivo</option>
                      <option value="performance">Otimização de performance</option>
                      <option value="saude">Saúde e bem-estar geral</option>
                      <option value="estética">Estética e rejuvenescimento</option>
                      <option value="outro">Outro objetivo</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#344D0E] mb-2">
                      Você já fez tratamentos similares? *
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-[#e9eee1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#76993D] bg-[#f7f9f3]"
                    >
                      <option value="">Selecione uma opção</option>
                      <option value="sim">Sim, tenho experiência</option>
                      <option value="nao">Não, é minha primeira vez</option>
                      <option value="talvez">Tenho dúvidas</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 3: Disponibilidade e Orçamento */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-[#344D0E] mb-6">
                      Etapa 3 de 3: Disponibilidade e Orçamento
                    </h3>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#344D0E] mb-2">
                      Qual sua disponibilidade? *
                    </label>
                    <select
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-[#e9eee1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#76993D] bg-[#f7f9f3]"
                    >
                      <option value="">Selecione uma opção</option>
                      <option value="imediata">Imediata (próxima semana)</option>
                      <option value="proximas-2-semanas">Próximas 2 semanas</option>
                      <option value="proximo-mes">Próximo mês</option>
                      <option value="flexivel">Flexível</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#344D0E] mb-2">
                      Qual seu orçamento para o tratamento? *
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-[#e9eee1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#76993D] bg-[#f7f9f3]"
                    >
                      <option value="">Selecione uma opção</option>
                      <option value="ate-1000">Até R$ 1.000</option>
                      <option value="1000-3000">R$ 1.000 a R$ 3.000</option>
                      <option value="3000-5000">R$ 3.000 a R$ 5.000</option>
                      <option value="acima-5000">Acima de R$ 5.000</option>
                      <option value="nao-tenho-restricao">Sem restrição orçamentária</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Progress Indicator */}
              <div className="flex gap-2 justify-center pt-4">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-3 flex-1 rounded-full transition ${
                      s <= step ? "bg-[#76993D]" : "bg-[#e9eee1]"
                    }`}
                  />
                ))}
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-6">
                {step > 1 && (
                  <Button
                    type="button"
                    onClick={handleBack}
                    variant="outline"
                    className="flex-1 border-[#76993D] text-[#76993D] hover:bg-[#f2f6eb]"
                  >
                    Voltar
                  </Button>
                )}

                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={
                      (step === 1 && (!formData.name || !formData.phone)) ||
                      (step === 2 && (!formData.objective || !formData.experience))
                    }
                    className="flex-1 bg-[#76993D] hover:bg-[#344D0E] text-white"
                  >
                    Próximo
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="flex-1 bg-[#76993D] hover:bg-[#344D0E] text-white text-base py-6"
                  >
                    Enviar e Agendar
                  </Button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
