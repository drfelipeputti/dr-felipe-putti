/**
 * Google Tag Manager - Rastreamento de Eventos
 * GA4 ID: G-JNWLDE8JX4
 */

// Declarar gtag como global
declare global {
  interface Window {
    gtag?: (command: string, action: string, data?: Record<string, unknown>) => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

/**
 * Rastrear evento de clique em WhatsApp
 */
export const trackWhatsAppClick = (source: string = 'unknown') => {
  if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
    window.gtag('event', 'whatsapp_click', {
      event_category: 'engagement',
      event_label: source,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Rastrear evento de formulário preenchido
 */
export const trackFormSubmit = (formData: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
    window.gtag('event', 'form_submit', {
      event_category: 'conversion',
      event_label: 'qualification_form',
      form_name: 'pre_qualification',
      form_fields: Object.keys(formData).length,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Rastrear evento de página de sucesso visualizada
 */
export const trackSuccessPageView = () => {
  if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
    window.gtag('event', 'success_page_view', {
      event_category: 'conversion',
      event_label: 'form_success',
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Rastrear evento de visualização de seção
 */
export const trackSectionView = (sectionName: string) => {
  if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
    window.gtag('event', 'section_view', {
      event_category: 'engagement',
      event_label: sectionName,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Rastrear evento de clique em botão
 */
export const trackButtonClick = (buttonName: string, source: string = 'unknown') => {
  if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
    window.gtag('event', 'button_click', {
      event_category: 'engagement',
      event_label: buttonName,
      button_source: source,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Rastrear evento de abertura de modal
 */
export const trackModalOpen = (modalName: string) => {
  if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
    window.gtag('event', 'modal_open', {
      event_category: 'engagement',
      event_label: modalName,
      timestamp: new Date().toISOString(),
    });
  }
};
