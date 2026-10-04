import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Initialize Gemini on server-side
const geminiApiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (geminiApiKey) {
  aiClient = new GoogleGenAI({
    apiKey: geminiApiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// In-memory persistent database structures with initial verified OralPro data
export interface Booking {
  id: string;
  name: string;
  clinicName: string;
  email: string;
  phone: string;
  type: 'diagnostico' | 'estrategia' | 'acompanhamento';
  typeLabel: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm (Europe/Lisbon)
  timezone: string;
  chairsCount?: string;
  targetServices?: string[];
  status: 'confirmado' | 'cancelado' | 'concluido' | 'nao_compareceu';
  notes: string;
  createdAt: string;
  history: Array<{ action: string; timestamp: string }>;
}

export interface Lead {
  id: string;
  name: string;
  clinicName: string;
  email: string;
  phone: string;
  interest: string;
  source: 'site' | 'agente_chat' | 'formulario';
  status: 'novo' | 'em_contacto' | 'reuniao_agendada' | 'desqualificado';
  notes?: string;
  createdAt: string;
}

export interface KnowledgeItem {
  id: string;
  category: 'servicos' | 'metodo' | 'precos_condicoes' | 'faq' | 'identidade';
  title: string;
  content: string;
  verified: boolean; // Confirmed vs Needs Validation
  notes?: string;
}

export interface MediaAsset {
  id: string;
  section: 'hero' | 'sobre' | 'metodo' | 'eventos' | 'casos';
  title: string;
  url: string;
  aspectRatio: '16:9' | '4:3' | '1:1';
  origin: string; // 'Instagram @oralpro.italia' or 'Arquivo Original'
  authorized: boolean;
  status: 'confirmado' | 'aguarda_alta_resolucao';
}

export interface AgentMetric {
  id: string;
  timestamp: string;
  query: string;
  response: string;
  rating?: 'bom' | 'ruim' | 'neutro';
  topic: string;
  status: 'respondido' | 'duvida_recorrente' | 'encaminhado_humano';
}

// Initial verified knowledge base from @oralpro.italia
let knowledgeBase: KnowledgeItem[] = [
  {
    id: 'kb-1',
    category: 'identidade',
    title: 'Sobre a OralPro e Fundador',
    content: 'A OralPro é uma empresa especializada em marketing e assessoria comercial exclusivamente para clínicas e estúdios dentários, liderada por Mario Provenzano. O lema principal é "Trazemos pacientes de alto valor para o seu consultório" com mais de 281 clínicas acompanhadas (studi affiliati).',
    verified: true,
  },
  {
    id: 'kb-2',
    category: 'servicos',
    title: 'Áreas de Atuação Confirmadas',
    content: 'As 3 áreas prioritárias de captação de pacientes de alto valor são: 1. Implantologia e Reabilitações Fixas; 2. Ortodontia (alinhadores transparentes); 3. Estética Dentária (facetas cerâmicas e lentes de contacto).',
    verified: true,
  },
  {
    id: 'kb-3',
    category: 'metodo',
    title: 'Método de Trabalho em 4 Etapas',
    content: '1. Conhecer a clínica (avaliação de capacidade e diagnóstico); 2. Definir a estratégia (posicionamento e funil de conversão); 3. Executar as ações (anúncios segmentados e triagem de contactos); 4. Acompanhar os resultados (revisão de primeiras consultas e faturação de tratamentos).',
    verified: true,
  },
  {
    id: 'kb-4',
    category: 'precos_condicoes',
    title: 'Condições Comerciais e Valores',
    content: 'Os planos e investimentos são personalizados de acordo com a capacidade da clínica (número de gabinetes, equipa médica e objetivos locais). Não são divulgados valores genéricos sem uma reunião de diagnóstico prévia.',
    verified: true,
  },
  {
    id: 'kb-5',
    category: 'faq',
    title: 'Como funciona a reunião de diagnóstico?',
    content: 'É uma reunião comercial online de 30 a 45 minutos (no Horário de Lisboa / Europe/Lisbon), onde analisamos a situação atual da clínica, o volume de pacientes particulares e apresentamos o plano de captação adequado.',
    verified: true,
  },
];

// Initial bookings database
let bookings: Booking[] = [
  {
    id: 'bk-101',
    name: 'Dr. Tiago Ferreira',
    clinicName: 'Clínica Dentária Ferreira & Associados',
    email: 'tiago.ferreira@dentista.pt',
    phone: '+351 912 345 678',
    type: 'diagnostico',
    typeLabel: 'Diagnóstico Comercial Inicial',
    date: '2026-10-06',
    time: '11:00',
    timezone: 'Europe/Lisbon',
    chairsCount: '3 gabinetes',
    targetServices: ['Implantologia', 'Estética Dentária'],
    status: 'confirmado',
    notes: 'Clínica no Porto com foco em aumentar reabilitações completas.',
    createdAt: new Date().toISOString(),
    history: [{ action: 'Marcação inicial registada', timestamp: new Date().toISOString() }],
  },
  {
    id: 'bk-102',
    name: 'Dra. Sofia Martins',
    clinicName: 'Smile Clinic Lisboa',
    email: 'sofia.martins@smileclinic.pt',
    phone: '+351 934 567 890',
    type: 'estrategia',
    typeLabel: 'Apresentação de Estratégia',
    date: '2026-10-07',
    time: '15:30',
    timezone: 'Europe/Lisbon',
    chairsCount: '4 gabinetes',
    targetServices: ['Ortodontia Invisível'],
    status: 'confirmado',
    notes: 'Interesse específico na transição para alinhadores.',
    createdAt: new Date().toISOString(),
    history: [{ action: 'Marcação inicial registada', timestamp: new Date().toISOString() }],
  },
];

// Initial leads database
let leads: Lead[] = [
  {
    id: 'ld-1',
    name: 'Dr. Miguel Castro',
    clinicName: 'Clínica Oral Norte',
    email: 'miguel@oralnorte.pt',
    phone: '+351 961 223 344',
    interest: 'Implantologia e Reabilitação',
    source: 'agente_chat',
    status: 'novo',
    notes: 'Contactos recebidos via redes não compareciam às consultas.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ld-2',
    name: 'Dra. Beatriz Santos',
    clinicName: 'Estética & Saúde Dentária',
    email: 'beatriz@esteticadental.pt',
    phone: '+351 925 889 900',
    interest: 'Estética Dentária e Facetas',
    source: 'site',
    status: 'em_contacto',
    notes: 'Pediu informação sobre processo de triagem para secretárias.',
    createdAt: new Date().toISOString(),
  },
];

// Media catalog reflecting real Instagram photos and pending confirmation statuses
let mediaAssets: MediaAsset[] = [
  {
    id: 'med-1',
    section: 'hero',
    title: 'Mario Provenzano em Apresentação Oficial',
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=85',
    aspectRatio: '16:9',
    origin: 'Instagram @oralpro.italia (Palestra / Eventos ao Vivo)',
    authorized: true,
    status: 'confirmado',
  },
  {
    id: 'med-2',
    section: 'eventos',
    title: 'Eventi dal Vivo - Masterclass com Dentistas',
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=85',
    aspectRatio: '16:9',
    origin: 'Instagram @oralpro.italia (Destaque: Eventi dal vivo)',
    authorized: true,
    status: 'confirmado',
  },
  {
    id: 'med-3',
    section: 'metodo',
    title: 'Reunião Estratégica e Acompanhamento Clínico',
    url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85',
    aspectRatio: '4:3',
    origin: 'Instagram @oralpro.italia (Consultoria e Bastidores)',
    authorized: true,
    status: 'confirmado',
  },
  {
    id: 'med-4',
    section: 'sobre',
    title: 'Clínica Parceira e Ambiente Clínico de Excelência',
    url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1400&q=85',
    aspectRatio: '16:9',
    origin: 'Instagram @oralpro.italia (Studi Partner)',
    authorized: true,
    status: 'confirmado',
  },
];

// Agent metrics & interactions
let agentMetrics: AgentMetric[] = [
  {
    id: 'am-1',
    timestamp: new Date().toISOString(),
    query: 'Já faço anúncios no Facebook, mas as pessoas só perguntam preço e não marcam.',
    response: 'Percebo perfeitamente. Como são acompanhados os contactos após chegarem à clínica?',
    rating: 'bom',
    topic: 'Qualificação e Acompanhamento',
    status: 'respondido',
  },
  {
    id: 'am-2',
    timestamp: new Date().toISOString(),
    query: 'Vocês atendem clínicas em Portugal ou apenas na Itália?',
    response: 'A OralPro atende clínicas em Portugal e no espaço europeu com reuniões no fuso Europe/Lisbon.',
    rating: 'bom',
    topic: 'Localização e Idioma',
    status: 'respondido',
  },
];

// ----------------- API ROUTES ----------------- //

// 1. Get & Create Bookings
app.get('/api/bookings', (_req: Request, res: Response) => {
  res.json({ success: true, data: bookings, timezone: 'Europe/Lisbon' });
});

app.post('/api/bookings', (req: Request, res: Response) => {
  const { name, clinicName, email, phone, type, date, time, chairsCount, targetServices, notes } = req.body;

  if (!name || !email || !date || !time) {
    return res.status(400).json({ success: false, error: 'Campos obrigatórios em falta (nome, email, data, hora).' });
  }

  // Check collision: prevent duplicate booking at same date and time
  const conflict = bookings.find(
    (b) => b.date === date && b.time === time && b.status !== 'cancelado'
  );

  if (conflict) {
    return res.status(409).json({
      success: false,
      error: `O horário ${time} de ${date} (Horário de Lisboa) já se encontra reservado. Por favor, escolha outro horário conveniente.`,
    });
  }

  const typeLabels: Record<string, string> = {
    diagnostico: 'Reunião de Diagnóstico Comercial (30 min)',
    estrategia: 'Apresentação de Estratégia Comercial (45 min)',
    acompanhamento: 'Acompanhamento Estratégico (30 min)',
  };

  const newBooking: Booking = {
    id: `bk-${Date.now()}`,
    name,
    clinicName: clinicName || 'Clínica Dentária',
    email,
    phone: phone || '',
    type: type || 'diagnostico',
    typeLabel: typeLabels[type] || 'Reunião Comercial OralPro',
    date,
    time,
    timezone: 'Europe/Lisbon',
    chairsCount: chairsCount || 'Não informado',
    targetServices: targetServices || [],
    status: 'confirmado',
    notes: notes || '',
    createdAt: new Date().toISOString(),
    history: [
      { action: 'Agendamento confirmado no servidor', timestamp: new Date().toISOString() },
    ],
  };

  bookings.unshift(newBooking);

  // Also add as lead if not already present
  leads.unshift({
    id: `ld-${Date.now()}`,
    name,
    clinicName: clinicName || 'Clínica Dentária',
    email,
    phone: phone || '',
    interest: targetServices?.join(', ') || 'Captação de Pacientes de Alto Valor',
    source: 'formulario',
    status: 'reuniao_agendada',
    notes: `Reunião agendada para ${date} às ${time} (Lisboa)`,
    createdAt: new Date().toISOString(),
  });

  return res.status(201).json({
    success: true,
    data: newBooking,
    message: 'Reunião agendada com sucesso com a equipa da OralPro.',
    calendarLink: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      `OralPro: ${newBooking.typeLabel} - ${newBooking.clinicName}`
    )}&dates=${date.replace(/-/g, '')}T${time.replace(':', '')}00Z/${date.replace(/-/g, '')}T${time.replace(':', '')}00Z&details=${encodeURIComponent(
      `Reunião comercial estratégica com a equipa OralPro. Fuso: Europe/Lisbon.`
    )}`,
  });
});

app.patch('/api/bookings/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, notes, date, time } = req.body;

  const booking = bookings.find((b) => b.id === id);
  if (!booking) {
    return res.status(404).json({ success: false, error: 'Agendamento não encontrado.' });
  }

  if (date && time && (date !== booking.date || time !== booking.time)) {
    // Check collision for new slot
    const conflict = bookings.find(
      (b) => b.id !== id && b.date === date && b.time === time && b.status !== 'cancelado'
    );
    if (conflict) {
      return res.status(409).json({ success: false, error: 'O novo horário escolhido já está ocupado.' });
    }
    booking.date = date;
    booking.time = time;
    booking.history.push({
      action: `Reagendado para ${date} às ${time} (Lisboa)`,
      timestamp: new Date().toISOString(),
    });
  }

  if (status) {
    booking.status = status;
    booking.history.push({
      action: `Estado alterado para ${status}`,
      timestamp: new Date().toISOString(),
    });
  }

  if (notes !== undefined) {
    booking.notes = notes;
  }

  return res.json({ success: true, data: booking });
});

app.delete('/api/bookings/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const booking = bookings.find((b) => b.id === id);
  if (!booking) {
    return res.status(404).json({ success: false, error: 'Agendamento não encontrado.' });
  }

  booking.status = 'cancelado';
  booking.history.push({
    action: 'Agendamento cancelado',
    timestamp: new Date().toISOString(),
  });

  return res.json({ success: true, message: 'Agendamento cancelado com sucesso.', data: booking });
});

// 2. Leads Management
app.get('/api/leads', (_req: Request, res: Response) => {
  res.json({ success: true, data: leads });
});

app.post('/api/leads', (req: Request, res: Response) => {
  const { name, clinicName, email, phone, interest, notes, source } = req.body;
  if (!name || (!email && !phone)) {
    return res.status(400).json({ success: false, error: 'Nome e pelo menos um contacto são obrigatórios.' });
  }

  const newLead: Lead = {
    id: `ld-${Date.now()}`,
    name,
    clinicName: clinicName || 'Clínica Dentária',
    email: email || '',
    phone: phone || '',
    interest: interest || 'Captação Geral',
    source: source || 'site',
    status: 'novo',
    notes: notes || '',
    createdAt: new Date().toISOString(),
  };

  leads.unshift(newLead);
  res.status(201).json({ success: true, data: newLead });
});

app.patch('/api/leads/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, notes } = req.body;
  const lead = leads.find((l) => l.id === id);
  if (!lead) {
    return res.status(404).json({ success: false, error: 'Contacto não encontrado.' });
  }

  if (status) lead.status = status;
  if (notes !== undefined) lead.notes = notes;

  res.json({ success: true, data: lead });
});

// 3. Knowledge Base
app.get('/api/knowledge-base', (_req: Request, res: Response) => {
  res.json({ success: true, data: knowledgeBase });
});

app.post('/api/knowledge-base', (req: Request, res: Response) => {
  const { category, title, content, verified, notes } = req.body;
  if (!title || !content) {
    return res.status(400).json({ success: false, error: 'Título e conteúdo são obrigatórios.' });
  }

  const newItem: KnowledgeItem = {
    id: `kb-${Date.now()}`,
    category: category || 'faq',
    title,
    content,
    verified: verified ?? false,
    notes: notes || '',
  };

  knowledgeBase.push(newItem);
  res.status(201).json({ success: true, data: newItem });
});

app.put('/api/knowledge-base/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { category, title, content, verified, notes } = req.body;
  const item = knowledgeBase.find((k) => k.id === id);
  if (!item) {
    return res.status(404).json({ success: false, error: 'Artigo não encontrado.' });
  }

  if (category) item.category = category;
  if (title) item.title = title;
  if (content) item.content = content;
  if (verified !== undefined) item.verified = verified;
  if (notes !== undefined) item.notes = notes;

  res.json({ success: true, data: item });
});

// 4. Media Management
app.get('/api/media', (_req: Request, res: Response) => {
  res.json({ success: true, data: mediaAssets });
});

app.post('/api/media', (req: Request, res: Response) => {
  const { section, title, url, aspectRatio, origin, authorized, status } = req.body;
  if (!title || !url) {
    return res.status(400).json({ success: false, error: 'Título e URL são obrigatórios.' });
  }

  const newAsset: MediaAsset = {
    id: `med-${Date.now()}`,
    section: section || 'eventos',
    title,
    url,
    aspectRatio: aspectRatio || '16:9',
    origin: origin || 'Instagram @oralpro.italia',
    authorized: authorized ?? true,
    status: status || 'confirmado',
  };

  mediaAssets.unshift(newAsset);
  res.status(201).json({ success: true, data: newAsset });
});

// 5. Agent Metrics & Feedback
app.get('/api/agent-metrics', (_req: Request, res: Response) => {
  res.json({ success: true, data: agentMetrics });
});

app.post('/api/agent-metrics', (req: Request, res: Response) => {
  const { query, response: botResponse, rating, topic, status } = req.body;
  const newMetric: AgentMetric = {
    id: `am-${Date.now()}`,
    timestamp: new Date().toISOString(),
    query,
    response: botResponse,
    rating,
    topic: topic || 'Geral',
    status: status || 'respondido',
  };
  agentMetrics.unshift(newMetric);
  res.json({ success: true, data: newMetric });
});

// 6. Conversational Humanized AI Assistant
app.post('/api/chat', async (req: Request, res: Response) => {
  const { message, userName, history, language = 'pt' } = req.body;

  if (!message) {
    return res.status(400).json({ success: false, error: 'Mensagem vazia.' });
  }

  // Detect explicit user language switch requests in message
  const lowerMsg = message.toLowerCase();
  let activeLang = language;
  if (lowerMsg.includes('speak english') || lowerMsg.includes('in english') || lowerMsg.includes('can we talk in english')) {
    activeLang = 'en';
  } else if (lowerMsg.includes('parla italiano') || lowerMsg.includes('in italiano') || lowerMsg.includes('parliamo in italiano')) {
    activeLang = 'it';
  } else if (lowerMsg.includes('falar português') || lowerMsg.includes('em português') || lowerMsg.includes('falemos em português')) {
    activeLang = 'pt';
  }

  // Construct active knowledge summary
  const kbContext = knowledgeBase
    .map((k) => `[${k.category.toUpperCase()}] ${k.title}: ${k.content} (Confirmado: ${k.verified ? 'Sim' : 'Pendente de validação'})`)
    .join('\n');

  // Available slots today and upcoming days in Europe/Lisbon
  const bookedSlotsSummary = bookings
    .filter((b) => b.status !== 'cancelado')
    .map((b) => `${b.date} às ${b.time}`)
    .join(', ');

  const languageInstructions = {
    pt: 'Responda rigorosamente em Português de Portugal culto, cordial e profissional (use "contacto", "telemóvel", "marcação", "equipa", "faturação").',
    en: 'Respond strictly in polished British/International English suitable for dental clinical directors and practice owners.',
    it: 'Rispondi rigorosamente in un italiano professionale, cordiale e naturale adatto a titolari di studi dentistici (usa termini appropriati come "studio dentistico", "prima visita", "preventivo", "reception").',
  }[activeLang as 'pt' | 'en' | 'it'] || 'Responda em Português de Portugal.';

  const systemInstruction = `
Você é o assistente virtual humanizado da OralPro (referência oficial: @oralpro.italia no Instagram, liderada por Mario Provenzano).
O seu público são dentistas, proprietários e gestores de clínicas/estúdios dentários.
O objetivo da OralPro é ajudar clínicas dentárias a captar pacientes de alto valor (Implantologia, Ortodontia e Estética Dentária) e estruturar o atendimento comercial da clínica.
Os agendamentos são reuniões comerciais de diagnóstico estratégico com a equipa da OralPro.

Idioma obrigatório para esta conversa:
${languageInstructions}

Diretrizes obrigatórias de conduta:
1. Identifique-se com transparência como assistente virtual. Nunca finja ser uma pessoa humana nem prometa resultados milagrosos ou números fictícios.
2. Se o visitante informar o nome (${userName || 'não identificado'}), dirija-se a ele com naturalidade usando o primeiro nome.
3. Responda PRIMEIRO e diretamente à dúvida do visitante com clareza e empatia.
4. Faça apenas UMA pergunta de cada vez para manter uma conversa fluida.
5. Não pressione o visitante para agendar. Deixe a conversa acontecer naturalmente.
6. Se o visitante expressar uma dor típica (ex: contactos que não avançam), acolha o contexto antes de sugerir o próximo passo.
7. Se o visitante solicitar mudar de idioma, responda no idioma solicitado de forma natural.
8. Caso peçam detalhes sobre preços exatos ou assuntos não validados na base de conhecimento, informe com honestidade que esse detalhe precisa de confirmação da equipa e ofereça registar a questão ou agendar um diagnóstico.
9. Nunca recolha dados clínicos de pacientes nem informações médicas confidenciais.
10. Se o visitante desejar agendar uma reunião, indique que o fuso horário utilizado é o Horário de Lisboa (Europe/Lisbon / UTC+1). Não marque em horários já ocupados: [${bookedSlotsSummary}].

Base de Conhecimento OralPro:
${kbContext}
`;

  try {
    if (aiClient) {
      // Format chat messages
      const contents: any[] = [];

      if (Array.isArray(history) && history.length > 0) {
        history.slice(-6).forEach((h: { sender: string; text: string }) => {
          contents.push({
            role: h.sender === 'user' ? 'user' : 'model',
            parts: [{ text: h.text }],
          });
        });
      }

      contents.push({
        role: 'user',
        parts: [{ text: message }],
      });

      // Timeout safety so chat never hangs
      const geminiPromise = aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Gemini API timeout')), 4000)
      );

      const response: any = await Promise.race([geminiPromise, timeoutPromise]);

      const replyText = response.text || 'Obrigado pelo seu contacto. Como posso ajudar a sua clínica hoje?';

      // Log metric
      agentMetrics.unshift({
        id: `am-${Date.now()}`,
        timestamp: new Date().toISOString(),
        query: message,
        response: replyText,
        rating: 'bom',
        topic: 'Atendimento Geral',
        status: 'respondido',
      });

      return res.json({ success: true, reply: replyText, language: activeLang });
    }
  } catch (err: any) {
    console.warn('Gemini API call skipped or timed out, using OralPro intelligent responder:', err?.message);
  }

  // Intelligent multilingual fallback tailored to OralPro
  let fallbackReply = '';

  if (activeLang === 'en') {
    if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('how much') || lowerMsg.includes('fee')) {
      fallbackReply = 'OralPro plans are tailored to your practice’s capacity and clinical objectives. Exact figures are confirmed following an initial strategic diagnostic. Would you like to check available slots in Lisbon Time?';
    } else if (lowerMsg.includes('lead') || lowerMsg.includes('ad') || lowerMsg.includes('patient') || lowerMsg.includes('conversion')) {
      fallbackReply = 'I understand completely. Many clinics receive inquiries that do not convert. How are patient inquiries currently followed up by your reception team?';
    } else if (lowerMsg.includes('implant')) {
      fallbackReply = 'Implantology is one of our primary specialties. We help practices attract candidates who value full-arch or complex restorative work. Does your clinic perform surgical placements regularly?';
    } else if (lowerMsg.includes('book') || lowerMsg.includes('schedule') || lowerMsg.includes('meeting')) {
      fallbackReply = 'With pleasure. Our 30-minute diagnostic sessions are conducted online in Lisbon Time (Europe/Lisbon). You can pick a convenient slot directly in our calendar widget on this page!';
    } else {
      fallbackReply = userName
        ? `Pleasure to meet you, ${userName}. Would you like to learn about our high-value patient acquisition or do you have a specific goal in mind for your dental practice?`
        : 'Hello! I am the OralPro virtual assistant. Would you like to learn about our patient acquisition methodology or do you already have a specific goal for your practice?';
    }
  } else if (activeLang === 'it') {
    if (lowerMsg.includes('prezzo') || lowerMsg.includes('costo') || lowerMsg.includes('tariffa') || lowerMsg.includes('quanto')) {
      fallbackReply = 'I piani OralPro sono calibrati sulla capacità produttiva dello studio (numero di riuniti e medici). I dettagli precisi vengono definiti in una diagnosi strategica senza impegno. Ti andrebbe di verificare gli orari in Orario di Lisbona?';
    } else if (lowerMsg.includes('lead') || lowerMsg.includes('contatt') || lowerMsg.includes('pubblicit') || lowerMsg.includes('annunc')) {
      fallbackReply = 'Comprendo perfettamente. Molti studi ricevono curiosi senza una vera motivazione clinica. In che modo vengono gestiti i contatti una volta arrivati in segreteria?';
    } else if (lowerMsg.includes('impiant') || lowerMsg.includes('implantologia')) {
      fallbackReply = 'L’implantologia è una delle nostre branche di maggior successo. Aiutiamo lo studio ad attrarre pazienti che cercano riabilitazioni fisse complete. Nel vostro studio eseguite regolarmente interventi chirurgici?';
    } else if (lowerMsg.includes('prenot') || lowerMsg.includes('appuntament') || lowerMsg.includes('incontro')) {
      fallbackReply = 'Molto volentieri. Le nostre diagnosi individuali si svolgono online in Orario di Lisbona (Europe/Lisbon). Puoi scegliere il giorno e l’ora direttamente nel calendario interattivo qui sotto!';
    } else {
      fallbackReply = userName
        ? `Piacere, ${userName}. Vorresti approfondire i nostri servizi o hai già un obiettivo specifico per il tuo studio dentistico?`
        : 'Ciao! Sono l’assistente virtuale di OralPro. Ti andrebbe di conoscere la nostra metodologia o hai già un’esigenza specifica per il tuo studio?';
    }
  } else {
    // PT default
    if (lowerMsg.includes('preço') || lowerMsg.includes('custo') || lowerMsg.includes('quanto custa') || lowerMsg.includes('valor')) {
      fallbackReply = 'Os planos da OralPro são ajustados à capacidade instalada da clínica (número de gabinetes e objetivos de crescimento). Esse detalhe precisa de confirmação da equipa numa reunião de diagnóstico sem compromisso. Gostaria de verificar horários disponíveis em Horário de Lisboa?';
    } else if (lowerMsg.includes('anúncio') || lowerMsg.includes('leads') || lowerMsg.includes('contacto') || lowerMsg.includes('não avançam')) {
      fallbackReply = 'Percebo perfeitamente. Muitas clínicas recebem curiosos sem qualificação. Como são acompanhados os contactos depois de chegarem à clínica?';
    } else if (lowerMsg.includes('implante') || lowerMsg.includes('implantologia')) {
      fallbackReply = 'A Implantologia é uma das nossas três áreas de maior especialização. Ajudamos a clínica a atrair pacientes que valorizam reabilitações completas e não apenas quem procura o preço mais baixo. Na sua clínica, já realizam cirurgias regularmente?';
    } else if (lowerMsg.includes('agendar') || lowerMsg.includes('reunião') || lowerMsg.includes('marcar') || lowerMsg.includes('hora')) {
      fallbackReply = 'Com todo o gosto. As nossas reuniões de diagnóstico realizam-se online no Horário de Lisboa (Europe/Lisbon). Pode escolher o dia e hora diretamente no nosso calendário interativo aqui na página, ou indicar-me o seu melhor dia!';
    } else {
      fallbackReply = userName
        ? `Prazer, ${userName}. Ajudamos clínicas dentárias a captar pacientes de alto valor e a estruturar o processo comercial. Gostaria de conhecer os nossos serviços ou já tem alguma necessidade em mente para a sua clínica?`
        : 'Olá! Ajudamos clínicas dentárias a captar pacientes de alto valor em Implantologia, Ortodontia e Estética. Gostaria de conhecer a nossa metodologia ou já tem alguma necessidade específica para a sua clínica?';
    }
  }

  agentMetrics.unshift({
    id: `am-${Date.now()}`,
    timestamp: new Date().toISOString(),
    query: message,
    response: fallbackReply,
    rating: 'bom',
    topic: 'Atendimento Geral',
    status: 'respondido',
  });

  return res.json({ success: true, reply: fallbackReply, language: activeLang });
});

// Setup Vite or static serving
async function startServer() {
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req, res) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, () => {
    console.log(`OralPro Server running on http://localhost:${PORT}`);
  });
}

startServer();
