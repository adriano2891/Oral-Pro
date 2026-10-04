export interface Booking {
  id: string;
  name: string;
  clinicName: string;
  email: string;
  phone: string;
  type: 'diagnostico' | 'estrategia' | 'acompanhamento';
  typeLabel: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
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
  verified: boolean;
  notes?: string;
}

export interface MediaAsset {
  id: string;
  section: 'hero' | 'sobre' | 'metodo' | 'eventos' | 'casos';
  title: string;
  url: string;
  aspectRatio: '16:9' | '4:3' | '1:1';
  origin: string;
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

export type PageView = 'home' | 'servicos' | 'sobre' | 'agendamento' | 'contactos' | 'admin';

export type Language = 'pt' | 'it' | 'en';
