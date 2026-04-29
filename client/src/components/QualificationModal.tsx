import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, CheckCircle2 } from "lucide-react";

interface QualificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QualificationModal({ isOpen, onClose }: QualificationModalProps) {
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

  if (!isOpen) return null;

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
    
    // Simular envio de dados
    console.log("Dados de qualificação:", formData);
    
    // Aqui você pode integrar com um serviço de backend ou API
    // Por enquanto, apenas mostramos a mensagem de sucesso
    setSubmitted(true);
    
    // Redirecionar para WhatsApp após 2 segundos
    setTimeout(() => {
      const message = `Olá! Meu nome é ${formData.name}. Gostaria de agendar uma consulta. Objetivo: ${formData.objective}. Orçamento: ${formData.budget}. Disponibilidade: ${formData.availability}.`;
      const whatsappUrl = `https://wa.me/5514996162354?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
      onClose();
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#76993D] to-[#344D0E] text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-serif font-bold">Pré-Qualificação</h2>
          <button
            onClick={onClose}
            className="hover:bg-white/20 p-1 rounded-lg transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center space-y-4 py-8">
              <div className="flex justify-center">
                <CheckCircle2 className="w-16 h-16 text-[#76993D]" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#344D0E]">
                Perfeito!
              </h3>
              <p className="text-[#4A5F22]">
                Seus dados foram recebidos. Você será redirecionado para o WhatsApp para confirmar seu agendamento.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Informações Básicas */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#344D0E] mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Seu nome"
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

                  <p className="text-xs text-[#5A6A2E]">
                    * Campos obrigatórios
                  </p>
                </div>
              )}

              {/* Step 2: Objetivos e Experiência */}
              {step === 2 && (
                <div className="space-y-4">
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
                <div className="space-y-4">
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
              <div className="flex gap-2 justify-center">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-2 w-8 rounded-full transition ${
                      s <= step ? "bg-[#76993D]" : "bg-[#e9eee1]"
                    }`}
                  />
                ))}
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
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
                    className="flex-1 bg-[#76993D] hover:bg-[#344D0E] text-white"
                  >
                    Agendar Consulta
                  </Button>
                )}
              </div>

              <p className="text-xs text-center text-[#5A6A2E]">
                Seus dados são confidenciais e serão usados apenas para agendamento.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
