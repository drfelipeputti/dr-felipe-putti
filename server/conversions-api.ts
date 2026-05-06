import crypto from 'crypto';

interface ConversionEvent {
  event_name: 'Lead' | 'Contact' | 'ViewContent' | 'Purchase' | 'CompleteRegistration';
  event_time: number;
  user_data: {
    em?: string; // Email (hashed)
    ph?: string; // Telefone (hashed)
    fn?: string; // Nome (hashed)
    ln?: string; // Sobrenome (hashed)
    client_ip_address?: string;
    client_user_agent?: string;
    fbc?: string; // Facebook Click ID
    fbp?: string; // Facebook Pixel ID
  };
  event_source_url?: string;
  event_id?: string;
  custom_data?: {
    value?: number;
    currency?: string;
    content_name?: string;
    content_type?: string;
  };
}

const PIXEL_ID = '391921773732969';
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;

/**
 * Hash SHA-256 para dados de usuário (requerido pelo Meta)
 */
function hashData(data: string): string {
  return crypto
    .createHash('sha256')
    .update(data.toLowerCase().trim())
    .digest('hex');
}

/**
 * Enviar evento para Conversions API
 */
export async function sendConversionEvent(event: ConversionEvent): Promise<void> {
  if (!ACCESS_TOKEN) {
    console.error('❌ META_ACCESS_TOKEN não configurado');
    return;
  }

  try {
    // Hash dos dados de usuário (privacidade)
    const hashedUserData: Record<string, string | undefined> = {};

    if (event.user_data.em) {
      hashedUserData.em = hashData(event.user_data.em);
    }
    if (event.user_data.ph) {
      hashedUserData.ph = hashData(event.user_data.ph.replace(/\D/g, ''));
    }
    if (event.user_data.fn) {
      hashedUserData.fn = hashData(event.user_data.fn);
    }
    if (event.user_data.ln) {
      hashedUserData.ln = hashData(event.user_data.ln);
    }
    if (event.user_data.client_ip_address) {
      hashedUserData.client_ip_address = event.user_data.client_ip_address;
    }
    if (event.user_data.client_user_agent) {
      hashedUserData.client_user_agent = event.user_data.client_user_agent;
    }
    if (event.user_data.fbc) {
      hashedUserData.fbc = event.user_data.fbc;
    }
    if (event.user_data.fbp) {
      hashedUserData.fbp = event.user_data.fbp;
    }

    const payload = {
      data: [
        {
          event_name: event.event_name,
          event_time: event.event_time,
          user_data: hashedUserData,
          event_source_url: event.event_source_url,
          event_id: event.event_id,
          custom_data: event.custom_data,
        },
      ],
      test_event_code:
        process.env.NODE_ENV === 'development' ? 'TEST12345' : undefined,
    };

    // Remover test_event_code se undefined
    if (!payload.test_event_code) {
      delete payload.test_event_code;
    }

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    const result = (await response.json()) as Record<string, unknown>;

    if (!response.ok) {
      console.error('❌ Erro ao enviar evento para Conversions API:', result);
      return;
    }

    console.log('✅ Evento enviado para Conversions API:', {
      event_name: event.event_name,
      event_id: event.event_id,
      response: result,
    });
  } catch (error) {
    console.error('❌ Erro ao chamar Conversions API:', error);
  }
}

/**
 * Extrair FBC (Facebook Click ID) do URL
 */
export function extractFBC(url: string): string | undefined {
  const fbcMatch = url.match(/fbclid=([^&]*)/);
  return fbcMatch ? fbcMatch[1] : undefined;
}

/**
 * Extrair FBP (Facebook Pixel ID) do cookie
 */
export function extractFBP(cookies: string): string | undefined {
  const fbpMatch = cookies.match(/_fbp=([^;]*)/);
  return fbpMatch ? fbpMatch[1] : undefined;
}

/**
 * Obter IP do cliente (considerando proxies)
 */
export function getClientIP(req: any): string {
  return (
    (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
    req.headers['x-real-ip'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket?.remoteAddress ||
    ''
  );
}
