/**
 * Cliente para Conversions API (Server-Side Tracking)
 * Complementa o Pixel JavaScript para rastreamento mais robusto
 */

interface ConversionEventPayload {
  event_name: 'Lead' | 'Contact' | 'ViewContent' | 'Purchase' | 'CompleteRegistration';
  user_email?: string;
  user_phone?: string;
  user_name?: string;
  event_source_url?: string;
  event_id?: string;
  custom_data?: {
    value?: number;
    currency?: string;
    content_name?: string;
    content_type?: string;
  };
}

/**
 * Rastrear evento via Conversions API (Server-Side)
 * Complementa o rastreamento do Pixel JavaScript
 */
export async function trackConversion(payload: ConversionEventPayload): Promise<void> {
  try {
    const response = await fetch('/api/conversions/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        event_source_url: window.location.href,
        event_id: payload.event_id || `${payload.event_name}_${Date.now()}`,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('❌ Erro ao rastrear conversão:', error);
      return;
    }

    const result = await response.json();
    console.log('✅ Conversão rastreada com sucesso:', result);
  } catch (error) {
    console.error('❌ Erro ao chamar Conversions API:', error);
  }
}

/**
 * Rastrear evento Lead (clique em CTA)
 */
export async function trackLead(source: string, data?: Record<string, unknown>): Promise<void> {
  await trackConversion({
    event_name: 'Lead',
    custom_data: {
      content_name: `Lead - ${source}`,
      content_type: 'button',
      value: 0,
      currency: 'BRL',
    },
  });
}

/**
 * Rastrear evento Contact (envio de formulário)
 */
export async function trackContact(
  email?: string,
  phone?: string,
  name?: string
): Promise<void> {
  await trackConversion({
    event_name: 'Contact',
    user_email: email,
    user_phone: phone,
    user_name: name,
    custom_data: {
      content_name: 'Qualification Form',
      content_type: 'form',
      value: 0,
      currency: 'BRL',
    },
  });
}

/**
 * Rastrear evento ViewContent (visualização de conteúdo)
 */
export async function trackViewContent(
  contentName: string,
  contentType: string = 'section'
): Promise<void> {
  await trackConversion({
    event_name: 'ViewContent',
    custom_data: {
      content_name: contentName,
      content_type: contentType,
      value: 0,
      currency: 'BRL',
    },
  });
}

/**
 * Rastrear evento Purchase (compra/pagamento)
 */
export async function trackPurchase(
  value: number,
  currency: string = 'BRL',
  orderId?: string
): Promise<void> {
  await trackConversion({
    event_name: 'Purchase',
    event_id: orderId,
    custom_data: {
      value,
      currency,
      content_name: 'Purchase',
      content_type: 'product',
    },
  });
}

/**
 * Rastrear evento CompleteRegistration (conclusão de cadastro)
 */
export async function trackCompleteRegistration(
  email?: string,
  name?: string
): Promise<void> {
  await trackConversion({
    event_name: 'CompleteRegistration',
    user_email: email,
    user_name: name,
    custom_data: {
      content_name: 'Registration Complete',
      content_type: 'form',
      value: 0,
      currency: 'BRL',
    },
  });
}

/**
 * Verificar se Conversions API está disponível
 */
export async function checkConversionsAPI(): Promise<boolean> {
  try {
    const response = await fetch('/api/conversions/health');
    return response.ok;
  } catch {
    return false;
  }
}
