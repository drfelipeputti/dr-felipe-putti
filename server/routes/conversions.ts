import express, { Request, Response } from 'express';
import {
  sendConversionEvent,
  extractFBC,
  extractFBP,
  getClientIP,
} from '../conversions-api';

const router = express.Router();

interface ConversionRequest {
  event_name: string;
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
 * POST /api/conversions/track
 * Rastrear evento de conversão via Conversions API
 */
router.post('/api/conversions/track', async (req: Request, res: Response) => {
  try {
    const {
      event_name,
      user_email,
      user_phone,
      user_name,
      event_source_url,
      event_id,
      custom_data,
    } = req.body as ConversionRequest;

    if (!event_name) {
      res.status(400).json({ error: 'event_name é obrigatório' });
      return;
    }

    // Extrair FBC (Facebook Click ID) do URL
    const fbc = event_source_url ? extractFBC(event_source_url) : undefined;

    // Extrair FBP (Facebook Pixel ID) do cookie
    const fbp = extractFBP(req.headers.cookie || '');

    // Obter IP do cliente
    const clientIP = getClientIP(req);

    // Enviar para Conversions API
    await sendConversionEvent({
      event_name: event_name as any,
      event_time: Math.floor(Date.now() / 1000),
      user_data: {
        em: user_email,
        ph: user_phone,
        fn: user_name,
        client_ip_address: clientIP,
        client_user_agent: req.headers['user-agent'],
        fbc,
        fbp,
      },
      event_source_url,
      event_id,
      custom_data,
    });

    res.json({
      success: true,
      message: 'Evento rastreado com sucesso',
      event_name,
      event_id,
    });
  } catch (error) {
    console.error('Erro ao rastrear conversão:', error);
    res.status(500).json({
      error: 'Erro ao rastrear conversão',
      message: error instanceof Error ? error.message : 'Erro desconhecido',
    });
  }
});

/**
 * GET /api/conversions/health
 * Verificar saúde da API de conversões
 */
router.get('/api/conversions/health', (req: Request, res: Response) => {
  const hasToken = !!process.env.META_ACCESS_TOKEN;
  res.json({
    status: 'ok',
    conversions_api_configured: hasToken,
    pixel_id: '391921773732969',
    environment: process.env.NODE_ENV || 'development',
  });
});

export default router;
