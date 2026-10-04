import { Language } from '../types';

export interface TranslationSchema {
  meta: {
    title: string;
    description: string;
    langCode: string;
    ogLocale: string;
  };
  common: {
    lisbonTime: string;
    timezoneNotice: string;
    officialBrand: string;
    confirmedClinics: string;
    instagramRef: string;
    scheduleMeeting: string;
    speakWithOralPro: string;
    learnStrategy: string;
    backToSite: string;
    close: string;
    back: string;
    continue: string;
    confirm: string;
    loading: string;
    saving: string;
    success: string;
    error: string;
    allRightsReserved: string;
    privacy: string;
    terms: string;
    location: string;
    adminPortal: string;
    medicalEthicsNotice: string;
    verified: string;
    pendingValidation: string;
  };
  nav: {
    home: string;
    services: string;
    method: string;
    areas: string;
    about: string;
    faq: string;
    contact: string;
    admin: string;
  };
  hero: {
    badgeTag: string;
    badgeCount: string;
    badgeRef: string;
    headlineStart: string;
    headlineAccent: string;
    support: string;
    ctaStrategy: string;
    ctaChat: string;
    specialtiesLabel: string;
    specImplants: string;
    specOrtho: string;
    specAesthetics: string;
    photoLeaderTag: string;
    photoCaption: string;
    photoSubcaption: string;
    pipelineTitle: string;
    pipelineSubtitle: string;
    stepCount: (current: number, total: number) => string;
    prevStep: string;
    nextStep: string;
    steps: Array<{
      tag: string;
      title: string;
      description: string;
    }>;
  };
  challenges: {
    tag: string;
    title: string;
    subtitle: string;
    items: Array<{
      subtitle: string;
      title: string;
      description: string;
      solution: string;
    }>;
    ctaBannerTitle: string;
    ctaBannerSubtitle: string;
    ctaBannerButton: string;
  };
  services: {
    tag: string;
    title: string;
    subtitle: string;
    serviceList: Array<{
      number: string;
      title: string;
      headline: string;
      whatItIs: string;
      whoIsItFor: string;
      howItHelps: string;
      features: string[];
    }>;
    forWhomLabel: string;
    howHelpsLabel: string;
    routineIntegration: string;
    learnMoreBtn: string;
  };
  method: {
    tag: string;
    title: string;
    subtitle: string;
    steps: Array<{
      step: string;
      title: string;
      subtitle: string;
      description: string;
      details: string[];
    }>;
    bannerTitle: string;
    bannerSubtitle: string;
    bannerButton: string;
  };
  specialties: {
    tag: string;
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      badge: string;
      description: string;
      benefits: string[];
      tagline: string;
    }>;
    scheduleBtn: string;
  };
  about: {
    tag: string;
    title: string;
    p1: string;
    p2: string;
    photoCaption1: string;
    photoSub1: string;
    photoCaption2: string;
    photoSub2: string;
    stat1Number: string;
    stat1Title: string;
    stat1Desc: string;
    stat2Number: string;
    stat2Title: string;
    stat2Desc: string;
    integrityTitle: string;
    integrityText: string;
    ctaButton: string;
    viewInstagram: string;
  };
  trust: {
    tag: string;
    title: string;
    subtitle: string;
    verifiedCaseBadge: string;
    accompanimentTag: string;
    cases: Array<{
      clinic: string;
      location: string;
      specialty: string;
      outcome: string;
      quote: string;
    }>;
    eventBannerTag: string;
    eventBannerTitle: string;
    eventBannerDesc: string;
    eventBannerBtn: string;
  };
  faq: {
    tag: string;
    title: string;
    subtitle: string;
    items: Array<{
      q: string;
      a: string;
    }>;
    bannerTitle: string;
    bannerSubtitle: string;
    chatBtn: string;
    bookBtn: string;
  };
  finalCta: {
    badge: string;
    title: string;
    subtitle: string;
    button: string;
    footnote: string;
  };
  booking: {
    modalTitle: string;
    step1Title: string;
    step1Subtitle: string;
    step2Title: string;
    step2Subtitle: string;
    step3Title: string;
    step3Subtitle: string;
    step4Title: string;
    step4Subtitle: string;
    stepLabel1: string;
    stepLabel2: string;
    stepLabel3: string;
    stepLabel4: string;
    meetingTypes: Array<{
      id: string;
      title: string;
      duration: string;
      description: string;
    }>;
    dateLabel: string;
    daysNotice: string;
    timeSlotsLabel: string;
    refreshSlots: string;
    slotSelectedNotice: (date: string, time: string) => string;
    nameLabel: string;
    namePlaceholder: string;
    clinicLabel: string;
    clinicPlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    chairsLabel: string;
    chairsOptions: string[];
    specialtiesLabel: string;
    notesLabel: string;
    notesPlaceholder: string;
    btnConfirm: string;
    btnProcessing: string;
    bookingSuccessTitle: string;
    bookingSuccessSubtitle: string;
    ticketId: string;
    ticketType: string;
    ticketDateTime: string;
    ticketClinic: string;
    ticketDoctor: string;
    googleCalendarBtn: string;
    downloadIcsBtn: string;
    conflictError: string;
  };
  chat: {
    buttonLabel: string;
    talkToUs: string;
    title: string;
    onlineStatus: string;
    anonymousGreeting: string;
    namedGreeting: (name: string) => string;
    noNameGreeting: string;
    namePrompt: string;
    namePlaceholder: string;
    confirmNameBtn: string;
    skipNameBtn: string;
    quickOptions: string[];
    requestHumanBtn: string;
    bookBtn: string;
    inputPlaceholder: string;
    typingIndicator: string;
    humanModalTitle: string;
    humanModalDesc: string;
    phonePlaceholder: string;
    submitCallbackBtn: string;
    callbackRegistered: (time: string) => string;
    thumbsUpTitle: string;
    thumbsDownTitle: string;
  };
  contactPage: {
    tag: string;
    title: string;
    subtitle: string;
    infoCardTitle: string;
    hoursTitle: string;
    hoursDesc: string;
    emailTitle: string;
    phoneTitle: string;
    phoneDesc: string;
    socialTitle: string;
    bookDirectBtn: string;
    formTitle: string;
    formSubtitle: string;
    nameLabel: string;
    clinicLabel: string;
    emailLabel: string;
    phoneLabel: string;
    interestLabel: string;
    interestOptions: string[];
    notesLabel: string;
    notesPlaceholder: string;
    submitBtn: string;
    submittingBtn: string;
    successTitle: string;
    successDesc: string;
    sendAnotherBtn: string;
  };
  admin: {
    headerTitle: string;
    syncStatus: string;
    viewSiteBtn: string;
    logoutBtn: string;
    tabBookings: string;
    tabLeads: string;
    tabConversations: string;
    tabKnowledge: string;
    tabMedia: string;
    tabAiImprovement: string;
    loginTitle: string;
    loginDesc: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    demoNote: string;
    enterBtn: string;
    backBtn: string;
    searchPlaceholder: string;
    allStatuses: string;
    statusConfirmed: string;
    statusCompleted: string;
    statusCancelled: string;
    statusNoShow: string;
    viewTable: string;
    viewToday: string;
    viewWeek: string;
    viewMonth: string;
    colDateTime: string;
    colDoctorClinic: string;
    colMeetingType: string;
    colStructureFocus: string;
    colStatus: string;
    colActions: string;
    manageBtn: string;
    noBookingsFound: string;
    leadsTitle: string;
    leadsSubtitle: string;
    colContact: string;
    colInterest: string;
    colSource: string;
    colNotes: string;
    conversationsTitle: string;
    conversationsSubtitle: string;
    ratedByVisitor: string;
    kbTitle: string;
    kbSubtitle: string;
    addArticleBtn: string;
    mediaTitle: string;
    mediaSubtitle: string;
    addMediaBtn: string;
    aiTitle: string;
    aiSubtitle: string;
    aiRecurrentQuestion: string;
    aiSuggestedAnswer: string;
    aiApproveBtn: string;
    aiPublishedBadge: string;
    aiPendingBadge: string;
    manageModalTitle: (id: string) => string;
    rescheduleDateLabel: string;
    rescheduleTimeLabel: string;
    internalNotesLabel: string;
    saveChangesBtn: string;
  };
}

export const translations: Record<Language, TranslationSchema> = {
  pt: {
    meta: {
      title: 'OralPro - Marketing e Captação para Clínicas Dentárias',
      description: 'Estratégia comercial e marketing especializado para clínicas dentárias. Captação de pacientes de alto valor para implantologia, ortodontia e estética dentária.',
      langCode: 'pt-PT',
      ogLocale: 'pt_PT',
    },
    common: {
      lisbonTime: 'Horário de Lisboa (Europe/Lisbon)',
      timezoneNotice: 'Todas as marcações realizam-se no Horário de Lisboa (UTC+1).',
      officialBrand: 'OralPro Oficial',
      confirmedClinics: '281 clínicas acompanhadas',
      instagramRef: 'Referência @oralpro.italia',
      scheduleMeeting: 'Agendar reunião',
      speakWithOralPro: 'Falar com a OralPro',
      learnStrategy: 'Quero conhecer a estratégia',
      backToSite: 'Voltar ao site público',
      close: 'Fechar',
      back: 'Voltar',
      continue: 'Continuar',
      confirm: 'Confirmar',
      loading: 'A carregar...',
      saving: 'A gravar...',
      success: 'Concluído com sucesso',
      error: 'Ocorreu um erro',
      allRightsReserved: 'Todos os direitos reservados.',
      privacy: 'Privacidade e Proteção de Dados',
      terms: 'Termos de Serviço',
      location: 'Lisboa, Portugal',
      adminPortal: 'Acesso Equipa',
      medicalEthicsNotice: 'Todas as estratégias de captação respeitam rigorosamente a legislação sanitária e as diretrizes éticas das Ordens dos Médicos Dentistas.',
      verified: 'Informação confirmada',
      pendingValidation: 'Aguardando validação',
    },
    nav: {
      home: 'Início',
      services: 'Serviços',
      method: 'Método',
      areas: 'Áreas',
      about: 'Sobre',
      faq: 'Dúvidas',
      contact: 'Contactos',
      admin: 'Painel',
    },
    hero: {
      badgeTag: 'OralPro Oficial',
      badgeCount: '281 clínicas acompanhadas',
      badgeRef: 'Referência @oralpro.italia',
      headlineStart: 'A sua clínica merece ser a ',
      headlineAccent: 'próxima escolha.',
      support: 'Marketing e acompanhamento comercial para ajudar a sua clínica a chegar a mais pacientes e transformar interesse em oportunidades de agendamento de alto valor.',
      ctaStrategy: 'Quero conhecer a estratégia',
      ctaChat: 'Falar com a OralPro',
      specialtiesLabel: 'Especialidades:',
      specImplants: 'Implantologia & Reabilitação',
      specOrtho: 'Ortodontia & Alinhadores',
      specAesthetics: 'Estética Dentária',
      photoLeaderTag: 'Mario Provenzano · Fundador OralPro',
      photoCaption: 'Apresentações & Masterclasses com diretores clínicos',
      photoSubcaption: 'Studi affiliati · Estratégia de Captação',
      pipelineTitle: 'O Percurso do Paciente',
      pipelineSubtitle: '(Fluxo estruturado)',
      stepCount: (curr, total) => `Etapa ${curr} de ${total}`,
      prevStep: 'Anterior',
      nextStep: 'Próxima etapa →',
      steps: [
        {
          tag: 'Passo 1',
          title: 'Divulgação Segmentada',
          description: 'Campanhas direcionadas a pacientes que procuram tratamentos de reabilitação e implantes.',
        },
        {
          tag: 'Passo 2',
          title: 'Contacto Qualificado',
          description: 'Filtragem inicial para afastar curiosos e priorizar pacientes com real necessidade clínica.',
        },
        {
          tag: 'Passo 3',
          title: 'Conversa Comercial',
          description: 'Processo de atendimento treinado para a equipa da clínica esclarecer e acolher o paciente.',
        },
        {
          tag: 'Passo 4',
          title: 'Agendamento Confirmado',
          description: 'Primeira consulta marcada na agenda do médico dentista com elevado índice de comparência.',
        },
      ],
    },
    challenges: {
      tag: 'Desafios comuns',
      title: 'Reconhece estes obstáculos no dia a dia da sua clínica?',
      subtitle: 'Ter uma equipa médica de topo não é suficiente se a engrenagem comercial e de captação da clínica não acompanhar o padrão de qualidade dos tratamentos.',
      items: [
        {
          subtitle: 'Perda de timing comercial',
          title: 'Contactos sem acompanhamento',
          description: 'A clínica investe em divulgação, mas as mensagens ficam horas ou dias sem resposta na receção. Pacientes interessados procuram outra clínica antes do primeiro contacto.',
          solution: 'Implementação de protocolo e scripts de resposta rápida para a equipa.',
        },
        {
          subtitle: 'Campanhas sem métricas de cadeira',
          title: 'Pouca clareza sobre o retorno',
          description: 'Métricas de cliques e visualizações não pagam os custos fixos. A gestão não sabe exatamente quantos pacientes de implantes ou ortodontia entraram no consultório com o marketing.',
          solution: 'Acompanhamento do percurso desde o anúncio até à primeira consulta e plano fechado.',
        },
        {
          subtitle: 'Planos de tratamento sem fecho',
          title: 'Oportunidades de alto valor perdidas',
          description: 'Pacientes que precisam de reabilitação oral ou alinhadores hesitam na decisão final. Sem um acompanhamento consultivo e estruturado, o plano fica esquecido numa pasta.',
          solution: 'Estruturação do processo comercial pós-consulta para reforço de confiança.',
        },
      ],
      ctaBannerTitle: 'Quer avaliar o potencial de captação da sua clínica dentária?',
      ctaBannerSubtitle: 'Analisamos a sua localização, capacidade médica e concorrência numa reunião de diagnóstico individual.',
      ctaBannerButton: 'Analisar a minha clínica',
    },
    services: {
      tag: 'Serviços Confirmados',
      title: 'Soluções desenhadas exclusivamente para a realidade das clínicas dentárias',
      subtitle: 'Não somos uma agência genérica de marketing digital. Todo o nosso método foi validado especificamente no setor médico-dentário, respeitando a ética médica e o rigor clínico.',
      forWhomLabel: 'Para quem serve:',
      howHelpsLabel: 'Como ajuda o consultório:',
      routineIntegration: 'Integração completa com a rotina da clínica',
      learnMoreBtn: 'Saber aplicação para a minha clínica',
      serviceList: [
        {
          number: '01',
          title: 'Captação de Pacientes de Alto Valor',
          headline: 'Atrair quem realmente procura tratamentos de reabilitação e estética.',
          whatItIs: 'Criação e gestão de campanhas de marketing ultrassegmentadas com foco em tratamentos de elevado valor acrescentado: Implantologia (reabilitação total e dentes no mesmo dia), Ortodontia com Alinhadores e Estética Dentária.',
          whoIsItFor: 'Clínicas com estrutura médica preparada que pretendem preencher a agenda cirúrgica e de especialidades com pacientes particulares qualificados.',
          howItHelps: 'Aumenta o ticket médio da clínica e reduz a dependência de convenções de baixa margem ou pacientes que apenas procuram procedimentos básicos de higiene.',
          features: [
            'Segmentação geográfica e demográfica rigorosa',
            'Comunicação de posicionamento médico sério',
            'Filtro de qualificação pré-contacto',
          ],
        },
        {
          number: '02',
          title: 'Estruturação Comercial do Atendimento',
          headline: 'Transformar chamadas e mensagens em presenças no consultório.',
          whatItIs: 'Orientação e formação prática para a equipa da receção e atendimento ao paciente. Definição de protocolos de contacto em menos de 15 minutos, abordagem humanizada e confirmação de comparência.',
          whoIsItFor: 'Proprietários de clínicas que sentem que as rececionistas estão sobrecarregadas ou não têm formação específica para lidar com pacientes indecisos.',
          howItHelps: 'Reduz drasticamente o número de faltas (no-shows) e garante que nenhum paciente interessado fica sem resposta ou acompanhamento empático.',
          features: [
            'Scripts de abordagem e resposta rápida',
            'Técnicas de confirmação ativa de agendamento',
            'Gestão de objeções de preço e tempo',
          ],
        },
        {
          number: '03',
          title: 'Acompanhamento & Otimização Contínua',
          headline: 'Decisões baseadas em números reais de pacientes sentados na cadeira.',
          whatItIs: 'Acompanhamento semanal e mensal com reuniões estratégicas. Análise do funil completo: contactos gerados, primeiras consultas agendadas, planos apresentados e faturação gerada.',
          whoIsItFor: 'Diretores clínicos e gestores que exigem transparência absoluta e prestação de contas sobre o retorno real do investimento.',
          howItHelps: 'Permite ajustar rapidamente o orçamento para os tratamentos mais rentáveis e identificar gargalos na clínica antes que se tornem prejuízo.',
          features: [
            'Relatórios claros sem métricas de vaidade',
            'Reuniões periódicas de alinhamento com a OralPro',
            'Ajustes de capacidade e sazonalidade médica',
          ],
        },
      ],
    },
    method: {
      tag: 'Metodologia Comprovada',
      title: '4 etapas claras entre o primeiro contacto e a agenda preenchida',
      subtitle: 'Sem processos improvisados. Seguimos um método estruturado que já foi aplicado e validado em centenas de consultórios dentários.',
      bannerTitle: 'Método refinado em 281 clínicas acompanhadas',
      bannerSubtitle: 'Acompanhamento próximo pela equipa OralPro com reuniões online agendadas no Horário de Lisboa.',
      bannerButton: 'Ver aplicação na minha clínica',
      steps: [
        {
          step: '01',
          title: 'Conhecer a clínica',
          subtitle: 'Diagnóstico aprofundado',
          description: 'Avaliamos a capacidade instalada (número de gabinetes, cirurgiões dentistas, higienistas), os tratamentos que mais geram rentabilidade e o perfil de pacientes na sua região geográfica.',
          details: [
            'Análise da presença digital e concorrência local',
            'Avaliação da taxa de ocupação dos gabinetes',
            'Alinhamento de tratamentos prioritários',
          ],
        },
        {
          step: '02',
          title: 'Definir a estratégia',
          subtitle: 'Posicionamento e funil comercial',
          description: 'Desenhamos a estratégia de captação à medida: seleção dos tratamentos de foco (ex: All-on-4, alinhadores transparentes), criação de materiais que transmitem autoridade médica e definição dos scripts de triagem.',
          details: [
            'Segmentação do público-alvo com real poder de compra',
            'Criação de páginas de apresentação médica e ética',
            'Protocolo de resposta e abordagem na receção',
          ],
        },
        {
          step: '03',
          title: 'Executar as ações',
          subtitle: 'Campanhas ativas e triagem',
          description: 'Lançamos as campanhas multicanal e ativamos o fluxo de qualificação. Os contactos interessados passam por filtragem prévia para que a equipa receba apenas pacientes com genuíno interesse clínico.',
          details: [
            'Ativação de campanhas de captação contínua',
            'Integração direta com o WhatsApp ou telefone da clínica',
            'Monitorização diária de mensagens e chamadas',
          ],
        },
        {
          step: '04',
          title: 'Acompanhar os resultados',
          subtitle: 'Otimização semanal e retorno',
          description: 'Revisão periódica de agendamentos, primeiras consultas realizadas e planos de tratamento aprovados. Ajustamos o investimento de acordo com o que gera maior faturação na clínica.',
          details: [
            'Acompanhamento de comparência às consultas',
            'Reuniões de alinhamento com a direção clínica',
            'Escala sustentável de novos pacientes',
          ],
        },
      ],
    },
    specialties: {
      tag: 'Áreas de Atuação Confirmadas',
      title: 'Especialidades de alto valor para alavancar a rentabilidade do consultório',
      subtitle: 'Concentramos os recursos de marketing nos tratamentos que trazem maior margem e satisfação clínica para os médicos e gestores.',
      scheduleBtn: 'Agendar reunião →',
      items: [
        {
          title: 'Implantologia & Reabilitação',
          badge: 'Alto Ticket',
          description: 'Captação de pacientes que sofrem com falta de dentes ou próteses removíveis instáveis e procuram soluções fixas com dentes no mesmo dia (All-on-4 / All-on-6) ou implantes unitários.',
          benefits: [
            'Pacientes que valorizam mastigação e bem-estar',
            'Filtro de qualificação prévio para evitar curiosos sem capacidade financeira',
            'Apresentação clínica que reforça a segurança médica',
          ],
          tagline: 'Foco em planos de tratamento integrais',
        },
        {
          title: 'Ortodontia & Alinhadores',
          badge: 'Elevada Procura',
          description: 'Estratégias direcionadas a adultos que evitam o aparelho tradicional de metal e procuram a discrição dos alinhadores transparentes para correção estética e funcional.',
          benefits: [
            'Comunicação visual orientada a adultos em ambiente profissional',
            'Valorização do planeamento digital 3D da clínica',
            'Facilitação do processo de decisão na primeira consulta',
          ],
          tagline: 'Adesão acelerada ao tratamento ortodôntico',
        },
        {
          title: 'Estética Dentária',
          badge: 'Transformação de Sorrisos',
          description: 'Pacientes motivados pela melhoria estética: facetas em cerâmica pura, lentes de contacto dentárias e reabilitação de harmonia do sorriso.',
          benefits: [
            'Apresentação de casos reais documentados e autorizados',
            'Posicionamento de clínica de referência na sua cidade',
            'Captação de pacientes particulares com decisão rápida',
          ],
          tagline: 'Valorização da arte e do detalhe médico',
        },
      ],
    },
    about: {
      tag: 'Sobre a OralPro',
      title: 'Especialistas em transformar interesse em consultas de alto valor',
      p1: 'Liderada por Mario Provenzano, a OralPro nasceu com uma missão clara: apoiar proprietários e gestores de clínicas dentárias na atração sustentável de pacientes particulares para tratamentos complexos de Implantologia, Ortodontia e Estética.',
      p2: 'Com mais de 281 clínicas acompanhadas, desenvolvemos metodologias que combinam divulgação precisa com a capacitação comercial da receção, garantindo que o investimento se traduz em consultas reais realizadas no consultório.',
      photoCaption1: 'Mario Provenzano · OralPro',
      photoSub1: 'Eventos dal vivo & Conferências',
      photoCaption2: 'Encontro com Dentistas Afiliados',
      photoSub2: '281 Studi Partner',
      stat1Number: '281+',
      stat1Title: 'Clínicas Acompanhadas',
      stat1Desc: 'Studi affiliati registados',
      stat2Number: '100%',
      stat2Title: 'Foco Médico-Dentário',
      stat2Desc: 'Sem dispersão por outros nichos',
      integrityTitle: 'Compromisso com a veracidade das informações',
      integrityText: 'As métricas e materiais apresentados baseiam-se nos dados públicos e verificados do perfil oficial da marca (@oralpro.italia). Não publicamos testemunhos nem números sem validação prévia.',
      ctaButton: 'Agendar conversa com a equipa',
      viewInstagram: 'Ver @oralpro.italia',
    },
    trust: {
      tag: 'Experiência e Confiança',
      title: 'Resultados consolidados em clínicas parceiras',
      subtitle: 'Consulte como clínicas dentárias afiliadas estruturaram a sua captação e aumentaram a ocupação das suas especialidades de maior valor.',
      verifiedCaseBadge: 'Caso Validado',
      accompanimentTag: 'Acompanhamento OralPro',
      cases: [
        {
          clinic: 'Studi Partner 01',
          location: 'Região Norte / Centro',
          specialty: 'Implantologia e Reabilitações Fixas',
          outcome: 'Aumento expressivo na comparência de primeiras consultas particulares',
          quote: 'A estruturação do atendimento telefónico permitiu qualificar os contactos antes de chegarem à clínica, preenchendo os dias de cirurgia com casos reais.',
        },
        {
          clinic: 'Studi Partner 02',
          location: 'Área Metropolitana',
          specialty: 'Ortodontia com Alinhadores Transparentes',
          outcome: 'Adesão acelerada a tratamentos integrais',
          quote: 'Conseguimos posicionar a clínica como referência em alinhadores invisíveis, deixando de disputar o paciente pelo preço mais barato.',
        },
      ],
      eventBannerTag: 'Conferências & Eventi dal vivo',
      eventBannerTitle: 'Quer participar num dos nossos encontros estratégicos ou marcar uma reunião individual?',
      eventBannerDesc: 'Disponibilizamos reuniões de diagnóstico online individuais no Horário de Lisboa (Europe/Lisbon).',
      eventBannerBtn: 'Marcar Diagnóstico Gratuito',
    },
    faq: {
      tag: 'Perguntas Frequentes',
      title: 'Esclareça as principais dúvidas sobre os nossos serviços',
      subtitle: 'Transparência absoluta sobre o nosso método de trabalho e acompanhamento comercial.',
      bannerTitle: 'Tem alguma dúvida específica sobre a sua clínica?',
      bannerSubtitle: 'Fale agora com o assistente virtual ou agende uma reunião com a nossa equipa.',
      chatBtn: 'Falar com o assistente',
      bookBtn: 'Agendar reunião',
      items: [
        {
          q: 'Quanto tempo demora a implementação do método na clínica?',
          a: 'O processo inicial de diagnóstico e estruturação da estratégia demora em média entre 7 a 10 dias úteis. Após a validação das mensagens e dos scripts de triagem com a direção clínica, as ações de captação são ativadas de imediato.',
        },
        {
          q: 'A equipa da receção precisa de despender muitas horas?',
          a: 'Não. Os scripts e procedimentos são concebidos exatamente para poupar tempo à receção, organizando a qualificação das mensagens através de modelos de resposta rápida no WhatsApp e telefone, reduzindo o tempo gasto com curiosos.',
        },
        {
          q: 'Como é calculada a capacidade de captação de cada clínica?',
          a: 'Avaliamos o número de gabinetes disponíveis, a equipa médica e a disponibilidade de agenda para cirurgias e consultas. Nunca geramos mais procura do que a clínica tem capacidade de atender com rigor médico.',
        },
        {
          q: 'Em que fuso horário são realizadas as reuniões comerciais com a OralPro?',
          a: 'Todas as reuniões comerciais e de diagnóstico com a OralPro são apresentadas e agendadas no Horário de Lisboa (Europe/Lisbon), com ajuste automático entre horário de verão e inverno.',
        },
        {
          q: 'A OralPro atende clínicas em Portugal?',
          a: 'Sim. A OralPro acompanha clínicas dentárias e estúdios em Portugal e no espaço europeu, com suporte dedicado e estratégias adaptadas ao mercado local de cada cidade.',
        },
        {
          q: 'Como posso agendar a reunião inicial de diagnóstico?',
          a: 'Basta selecionar uma data e hora no nosso calendário interativo nesta página ou solicitar diretamente ao nosso assistente virtual. A reunião é online e sem compromisso.',
        },
      ],
    },
    finalCta: {
      badge: 'Reunião comercial estratégica · Horário de Lisboa',
      title: 'Vamos conversar sobre o próximo passo da sua clínica?',
      subtitle: 'Descubra como estruturar a captação de pacientes de alto valor e dar previsibilidade à faturação da sua clínica dentária.',
      button: 'Agendar reunião',
      footnote: 'Sessão online de 30 minutos · Sem fidelização forçada · Fuso Europe/Lisbon',
    },
    booking: {
      modalTitle: 'Agendamento de Reunião Comercial · OralPro',
      step1Title: 'Selecione o formato da reunião',
      step1Subtitle: 'Sessão online individual com um especialista da OralPro.',
      step2Title: 'Escolha o dia e o horário conveniente',
      step2Subtitle: 'Horários ajustados em Horário de Lisboa (UTC+1).',
      step3Title: 'Dados para envio do convite da reunião',
      step3Subtitle: 'Os dados serão utilizados exclusivamente para a preparação do diagnóstico e envio do link de acesso.',
      step4Title: 'Reunião Agendada com Sucesso!',
      step4Subtitle: 'O seu horário foi registado e bloqueado com sucesso no servidor.',
      stepLabel1: '1. Tipo de Reunião',
      stepLabel2: '2. Data & Horário (Lisboa)',
      stepLabel3: '3. Dados da Clínica',
      stepLabel4: '4. Confirmação',
      meetingTypes: [
        {
          id: 'diagnostico',
          title: 'Diagnóstico Comercial Inicial',
          duration: '30 minutos',
          description: 'Análise individual da capacidade da clínica, localização e potencial de captação.',
        },
        {
          id: 'estrategia',
          title: 'Apresentação de Estratégia Comercial',
          duration: '45 minutos',
          description: 'Apresentação detalhada do plano de ação para implantes, ortodontia ou estética.',
        },
        {
          id: 'acompanhamento',
          title: 'Acompanhamento Estratégico',
          duration: '30 minutos',
          description: 'Sessão reservada para clínicas em processo de integração ou parceiras.',
        },
      ],
      dateLabel: 'Data da reunião',
      daysNotice: 'Atendimento de Segunda a Sexta-feira.',
      timeSlotsLabel: 'Horários disponíveis (Horário de Lisboa)',
      refreshSlots: 'Atualizar vagas',
      slotSelectedNotice: (date, time) => `Selecionado: ${date} às ${time} (Lisboa)`,
      nameLabel: 'Nome do Médico / Responsável *',
      namePlaceholder: 'Ex: Dr. Afonso Meireles',
      clinicLabel: 'Nome da Clínica Dentária *',
      clinicPlaceholder: 'Ex: Clínica Dentária de Braga',
      emailLabel: 'Email profissional (para receber convite) *',
      emailPlaceholder: 'contacto@clinica.pt',
      phoneLabel: 'Telemóvel / WhatsApp da Direção',
      phonePlaceholder: '+351 912 345 678',
      chairsLabel: 'Estrutura da clínica (n.º de gabinetes)',
      chairsOptions: [
        '1 a 2 gabinetes',
        '3 a 4 gabinetes',
        '5 ou mais gabinetes',
        'Grupo de Clínicas / Policlínica',
      ],
      specialtiesLabel: 'Especialidades prioritárias',
      notesLabel: 'Alguma questão ou observação prévia para a equipa?',
      notesPlaceholder: 'Ex: Gostaríamos de focar em aumentar pacientes de All-on-4 na nossa região...',
      btnConfirm: 'Confirmar Agendamento',
      btnProcessing: 'A registar no servidor...',
      bookingSuccessTitle: 'Reunião Agendada com Sucesso!',
      bookingSuccessSubtitle: 'O seu horário foi registado e bloqueado com sucesso no servidor.',
      ticketId: 'ID da Reserva:',
      ticketType: 'Tipo de Reunião:',
      ticketDateTime: 'Data & Hora:',
      ticketClinic: 'Clínica:',
      ticketDoctor: 'Responsável:',
      googleCalendarBtn: 'Adicionar ao Google Calendar',
      downloadIcsBtn: 'Descarregar ficheiro .ICS (Outlook/Apple)',
      conflictError: 'Este horário já se encontra reservado. Por favor, escolha outro horário conveniente.',
    },
    chat: {
      buttonLabel: 'Fale com a OralPro',
      talkToUs: 'Fale Connosco',
      title: 'Assistente Virtual OralPro',
      onlineStatus: 'Online · Horário de Lisboa',
      anonymousGreeting: 'Olá! Sou o assistente virtual da OralPro. Como prefere que lhe chame?',
      namedGreeting: (name: string) => `Prazer, ${name}. Gostaria de conhecer os nossos serviços ou já tem alguma necessidade em mente para a sua clínica?`,
      noNameGreeting: 'Sem qualquer problema! Gostaria de conhecer os nossos serviços ou já tem alguma necessidade em mente para a sua clínica dentária?',
      namePrompt: 'Como prefere ser tratado(a)?',
      namePlaceholder: 'Ex: Dr. Pedro ou Marta',
      confirmNameBtn: 'Confirmar',
      skipNameBtn: 'Prefiro não informar o nome',
      quickOptions: [
        'Captação para Implantologia',
        'Ortodontia e Alinhadores',
        'Conhecer o Método OralPro',
        'Ver horários de reunião (Lisboa)',
      ],
      requestHumanBtn: 'Falar com pessoa',
      bookBtn: 'Agendar reunião',
      inputPlaceholder: 'Escreva a sua dúvida...',
      typingIndicator: 'Assistente a redigir...',
      humanModalTitle: 'Solicitar Atendimento Humano',
      humanModalDesc: 'Registe o seu telemóvel para contacto por um consultor comercial da OralPro.',
      phonePlaceholder: '+351 9xx xxx xxx',
      submitCallbackBtn: 'Registar Pedido de Contacto',
      callbackRegistered: (time: string) => `O seu pedido de contacto foi registado no nosso sistema às ${time} (Horário de Lisboa). A nossa equipa entrará em contacto no prazo de 1 dia útil.`,
      thumbsUpTitle: 'Resposta útil',
      thumbsDownTitle: 'Precisa de melhoria',
    },
    contactPage: {
      tag: 'Canais Diretos',
      title: 'Fale com a equipa da OralPro',
      subtitle: 'Estamos disponíveis para esclarecer dúvidas sobre a nossa estratégia comercial e acompanhar a expansão da sua clínica dentária.',
      infoCardTitle: 'Informações de Contacto',
      hoursTitle: 'Fuso Horário & Atendimento',
      hoursDesc: 'Segunda a Sexta: 09h00 - 18h30 (Europe/Lisbon)',
      emailTitle: 'Email Oficial',
      phoneTitle: 'Apoio Comercial',
      phoneDesc: '+351 210 987 654 (Linha de Apoio a Clínicas)',
      socialTitle: 'Instagram Oficial',
      bookDirectBtn: 'Prefiro agendar reunião no calendário',
      formTitle: 'Envie-nos uma mensagem direta',
      formSubtitle: 'A nossa equipa comercial entrará em contacto nas próximas horas.',
      nameLabel: 'O seu nome completo *',
      clinicLabel: 'Nome da clínica dentária',
      emailLabel: 'Email profissional *',
      phoneLabel: 'Telemóvel / WhatsApp',
      interestLabel: 'Área prioritária de interesse',
      interestOptions: [
        'Implantologia & Reabilitação',
        'Ortodontia com Alinhadores',
        'Estética Dentária',
        'Estruturação Geral de Atendimento',
      ],
      notesLabel: 'Detalhes ou mensagem adicional',
      notesPlaceholder: 'Indique brevemente o número de gabinetes e principais desafios...',
      submitBtn: 'Enviar Mensagem',
      submittingBtn: 'A registar mensagem...',
      successTitle: 'Mensagem recebida com sucesso!',
      successDesc: 'A nossa equipa irá analisar as informações da sua clínica e responder o mais breve possível.',
      sendAnotherBtn: 'Enviar outra mensagem',
    },
    admin: {
      headerTitle: 'OralPro Admin',
      syncStatus: 'Sincronizado',
      viewSiteBtn: 'Ver Site Público',
      logoutBtn: 'Terminar Sessão',
      tabBookings: 'Agendamentos',
      tabLeads: 'Contactos & Leads',
      tabConversations: 'Atendimento do Agente',
      tabKnowledge: 'Base de Conhecimento',
      tabMedia: 'Gestão de Fotografias',
      tabAiImprovement: 'Melhoria Contínua IA',
      loginTitle: 'Painel Administrativo OralPro',
      loginDesc: 'Acesso reservado à equipa de gestão e consultores comerciais.',
      passwordLabel: 'Palavra-passe de Acesso',
      passwordPlaceholder: 'Insira a palavra-passe...',
      demoNote: 'Acesso de demonstração: oralpro',
      enterBtn: 'Entrar no Painel',
      backBtn: 'Voltar ao site',
      searchPlaceholder: 'Pesquisar por médico, clínica ou email...',
      allStatuses: 'Todos os estados',
      statusConfirmed: 'Confirmado',
      statusCompleted: 'Concluído',
      statusCancelled: 'Cancelado',
      statusNoShow: 'Não compareceu',
      viewTable: 'Tabela',
      viewToday: 'Hoje',
      viewWeek: 'Semana',
      viewMonth: 'Mês',
      colDateTime: 'Data & Hora (Lisboa)',
      colDoctorClinic: 'Responsável & Clínica',
      colMeetingType: 'Tipo de Reunião',
      colStructureFocus: 'Estrutura & Foco',
      colStatus: 'Estado',
      colActions: 'Ações',
      manageBtn: 'Gerir / Notas',
      noBookingsFound: 'Nenhum agendamento encontrado para este filtro.',
      leadsTitle: 'Contactos Recebidos no Site & Agente',
      leadsSubtitle: 'Proprietários e diretores de clínicas com intenção registada.',
      colContact: 'Contacto',
      colInterest: 'Interesse',
      colSource: 'Origem',
      colNotes: 'Observações',
      conversationsTitle: 'Histórico de Interações com o Assistente Virtual',
      conversationsSubtitle: 'Monitorização em tempo real de dúvidas e avaliações de resposta.',
      ratedByVisitor: 'Avaliado pelo visitante como:',
      kbTitle: 'Base de Conhecimento do Assistente Virtual',
      kbSubtitle: 'O assistente consulta estas regras antes de responder. Não inventa factos sem validação.',
      addArticleBtn: 'Adicionar Artigo / Resposta',
      mediaTitle: 'Gestão de Fotografias e Materiais Visuais Oficiais',
      mediaSubtitle: 'Controlo de origem do material, enquadramento e confirmação de autorização de utilização.',
      addMediaBtn: 'Adicionar Nova Imagem',
      aiTitle: 'Melhoria Contínua do Atendimento',
      aiSubtitle: 'O sistema analisa perguntas de visitantes e sugere respostas a integrar na base de conhecimento. A validação humana pelo responsável é obrigatória antes de publicar.',
      aiRecurrentQuestion: 'Dúvida Recorrente Identificada',
      aiSuggestedAnswer: 'Sugestão de Resposta Oficial:',
      aiApproveBtn: 'Validar e Publicar na Base',
      aiPublishedBadge: 'Publicado na Base',
      aiPendingBadge: 'Aguardando Validação',
      manageModalTitle: (id) => `Gerir Agendamento #${id}`,
      rescheduleDateLabel: 'Reagendar Data',
      rescheduleTimeLabel: 'Hora (Horário de Lisboa)',
      internalNotesLabel: 'Notas Internas da Equipa',
      saveChangesBtn: 'Gravar Alterações',
    },
  },
  en: {
    meta: {
      title: 'OralPro - Dental Practice Marketing & High-Value Patient Acquisition',
      description: 'Specialised dental marketing and sales consulting for clinic owners. Attract high-value patients for implantology, orthodontics and aesthetic dentistry.',
      langCode: 'en-GB',
      ogLocale: 'en_GB',
    },
    common: {
      lisbonTime: 'Lisbon Time (Europe/Lisbon)',
      timezoneNotice: 'All meetings are scheduled in Lisbon Time (UTC+1 / BST).',
      officialBrand: 'OralPro Official',
      confirmedClinics: '281 partnered practices',
      instagramRef: 'Official reference @oralpro.italia',
      scheduleMeeting: 'Schedule meeting',
      speakWithOralPro: 'Speak with OralPro',
      learnStrategy: 'Explore the strategy',
      backToSite: 'Back to public website',
      close: 'Close',
      back: 'Back',
      continue: 'Continue',
      confirm: 'Confirm',
      loading: 'Loading...',
      saving: 'Saving...',
      success: 'Completed successfully',
      error: 'An error occurred',
      allRightsReserved: 'All rights reserved.',
      privacy: 'Privacy & Data Protection',
      terms: 'Terms of Service',
      location: 'Lisbon, Portugal',
      adminPortal: 'Team Portal',
      medicalEthicsNotice: 'All patient acquisition strategies strictly adhere to healthcare regulations and dental statutory guidelines.',
      verified: 'Confirmed data',
      pendingValidation: 'Pending validation',
    },
    nav: {
      home: 'Home',
      services: 'Services',
      method: 'Method',
      areas: 'Specialties',
      about: 'About',
      faq: 'FAQ',
      contact: 'Contact',
      admin: 'Portal',
    },
    hero: {
      badgeTag: 'OralPro Official',
      badgeCount: '281 partnered clinics',
      badgeRef: 'Reference @oralpro.italia',
      headlineStart: 'Your dental practice deserves to be the ',
      headlineAccent: 'first choice.',
      support: 'Targeted marketing and sales consultancy to help your dental clinic attract premium patients and convert inquiries into booked high-value treatments.',
      ctaStrategy: 'Explore the strategy',
      ctaChat: 'Speak with OralPro',
      specialtiesLabel: 'Key Specialties:',
      specImplants: 'Implantology & Full-Arch',
      specOrtho: 'Orthodontics & Clear Aligners',
      specAesthetics: 'Aesthetic Dentistry',
      photoLeaderTag: 'Mario Provenzano · Founder, OralPro',
      photoCaption: 'Keynotes & Masterclasses with Clinical Directors',
      photoSubcaption: 'Partnered practices · Patient Acquisition',
      pipelineTitle: 'The Patient Journey',
      pipelineSubtitle: '(Structured workflow)',
      stepCount: (curr, total) => `Stage ${curr} of ${total}`,
      prevStep: 'Previous',
      nextStep: 'Next stage →',
      steps: [
        {
          tag: 'Stage 1',
          title: 'Targeted Outreach',
          description: 'Geographically focused campaigns aimed at patients seeking full rehabilitation and dental implants.',
        },
        {
          tag: 'Stage 2',
          title: 'Qualified Inquiries',
          description: 'Initial intake filtering to screen out non-qualified leads and prioritise genuine clinical needs.',
        },
        {
          tag: 'Stage 3',
          title: 'Consultative Intake',
          description: 'Trained patient-coordination protocols for reception staff to reassure and inform candidates.',
        },
        {
          tag: 'Stage 4',
          title: 'Confirmed Appointment',
          description: 'Initial consultation booked into the dental surgeon’s diary with high attendance rates.',
        },
      ],
    },
    challenges: {
      tag: 'Common Bottlenecks',
      title: 'Do you recognise these challenges in your dental practice?',
      subtitle: 'Having world-class clinical expertise is not enough if your patient acquisition and front-desk workflows fail to match that standard of excellence.',
      items: [
        {
          subtitle: 'Delayed front-desk response',
          title: 'Unattended Patient Inquiries',
          description: 'The clinic invests in campaigns, but messages sit unanswered for hours. High-intent patients reach out to another provider before your team responds.',
          solution: 'Implementation of fast-response protocols and empathetic scripts for front-desk staff.',
        },
        {
          subtitle: 'Vanity metrics without chair occupancy',
          title: 'Unclear Return on Investment',
          description: 'Clicks and impressions do not cover fixed clinic overheads. Leadership rarely knows exactly how many implant or aligner patients actually attended.',
          solution: 'End-to-end attribution from initial inquiry through to clinical consultation and accepted treatment.',
        },
        {
          subtitle: 'Unsigned high-value treatment plans',
          title: 'Lost Premium Opportunities',
          description: 'Patients in need of full-arch restorations or aligners hesitate at the final quote. Without structured consultative follow-up, quotes sit in folders.',
          solution: 'Empathetic post-consultation workflow designed to answer questions and reinforce trust.',
        },
      ],
      ctaBannerTitle: 'Would you like to evaluate your practice’s patient acquisition potential?',
      ctaBannerSubtitle: 'We analyse your geographic area, clinical capacity, and local competition in a 1-to-1 strategic diagnostic session.',
      ctaBannerButton: 'Analyse My Practice',
    },
    services: {
      tag: 'Confirmed Services',
      title: 'Solutions crafted exclusively for private dental clinics',
      subtitle: 'We are not a generic marketing agency. Our methodology has been validated specifically in dental medicine, respecting healthcare ethics and patient dignity.',
      forWhomLabel: 'Who it is for:',
      howHelpsLabel: 'How it helps your practice:',
      routineIntegration: 'Seamless integration with clinical routines',
      learnMoreBtn: 'See how this applies to my clinic',
      serviceList: [
        {
          number: '01',
          title: 'High-Value Patient Acquisition',
          headline: 'Attract patients who actively seek restorative and aesthetic dental care.',
          whatItIs: 'Strategy and execution of hyper-targeted campaigns focused on premium clinical treatments: full-arch implantology (All-on-4 / Same-Day Teeth), clear aligners, and porcelain veneers.',
          whoIsItFor: 'Established clinics with surgical and orthodontic capacity looking to fill their schedules with private self-paying patients.',
          howItHelps: 'Elevates practice average case values and reduces reliance on low-margin insurance schemes or simple routine cleanings.',
          features: [
            'Precise demographic and geographic audience targeting',
            'Dignified medical branding that conveys clinical authority',
            'Intelligent pre-qualification form filters',
          ],
        },
        {
          number: '02',
          title: 'Front-Desk Sales & Communication Training',
          headline: 'Turn phone calls and WhatsApp messages into confirmed clinical visits.',
          whatItIs: 'Practical coaching and structured manuals for receptionists and treatment coordinators. Protocols for responding within 15 minutes, handling objections, and securing attendance.',
          whoIsItFor: 'Practice owners whose front-desk team feels overwhelmed or lacks confidence when dealing with hesitant patients inquiring about costs.',
          howItHelps: 'Significantly reduces patient no-shows and ensures no high-value clinical lead goes unattended.',
          features: [
            'Empathetic conversational response scripts',
            'Active appointment confirmation workflows',
            'Constructive price and timing objection handling',
          ],
        },
        {
          number: '03',
          title: 'Continuous Strategy & Pipeline Optimization',
          headline: 'Decisions based on real patients seated in the operatory chair.',
          whatItIs: 'Weekly and monthly executive reviews analysing every stage of the funnel: inquiries generated, consultations attended, treatment plans presented, and accepted revenue.',
          whoIsItFor: 'Clinical directors and practice managers requiring complete transparency and accountability for their marketing investment.',
          howItHelps: 'Allows prompt reallocation of budget toward the most profitable specialties and identifies clinic bottlenecks early.',
          features: [
            'Clear financial reports free from vanity metrics',
            'Regular strategic alignment meetings with OralPro',
            'Capacity planning aligned with clinical availability',
          ],
        },
      ],
    },
    method: {
      tag: 'Proven Methodology',
      title: '4 structured stages from first contact to a full clinical diary',
      subtitle: 'No guesswork. We follow a systematic framework already refined across hundreds of private dental practices.',
      bannerTitle: 'Framework refined across 281 partnered clinics',
      bannerSubtitle: 'Dedicated guidance from the OralPro team with online strategy meetings held in Lisbon Time (Europe/Lisbon).',
      bannerButton: 'Explore implementation in my clinic',
      steps: [
        {
          step: '01',
          title: 'Practice Discovery',
          subtitle: 'In-Depth Diagnostic',
          description: 'We audit your installed capacity (number of operatories, dental surgeons, hygienists), your most profitable clinical procedures, and local demographics.',
          details: [
            'Local digital presence and competitive landscape analysis',
            'Operatory chair utilisation audit',
            'Priority treatment alignment',
          ],
        },
        {
          step: '02',
          title: 'Strategy Formulation',
          subtitle: 'Positioning & Patient Funnel',
          description: 'We tailor a bespoke patient acquisition plan: selecting priority treatments, designing authority-building clinical presentations, and crafting reception intake scripts.',
          details: [
            'High-intent audience segmentation',
            'Compliant medical positioning pages',
            'Reception response and triage protocols',
          ],
        },
        {
          step: '03',
          title: 'Campaign Activation',
          subtitle: 'Active Outbound & Filtering',
          description: 'We launch targeted campaigns and activate qualification filters so your front-desk team receives pre-screened patients with genuine clinical interest.',
          details: [
            'Continuous patient acquisition campaign delivery',
            'Direct WhatsApp and telephony routing',
            'Daily monitoring of inquiries and response speed',
          ],
        },
        {
          step: '04',
          title: 'Performance Review',
          subtitle: 'Continuous Optimization',
          description: 'Regular reviews of booked consultations, attended appointments, and accepted treatment plans. We continuously optimize spend toward maximum clinical revenue.',
          details: [
            'Appointment attendance monitoring',
            'Strategic review meetings with leadership',
            'Sustainable scaling of private patient inflow',
          ],
        },
      ],
    },
    specialties: {
      tag: 'Confirmed Specialties',
      title: 'High-value clinical procedures to elevate practice profitability',
      subtitle: 'We concentrate marketing resources on treatments that offer the highest clinical satisfaction and financial contribution.',
      scheduleBtn: 'Schedule meeting →',
      items: [
        {
          title: 'Implantology & Full Rehabilitation',
          badge: 'High Case Value',
          description: 'Attracting patients suffering from missing teeth or unstable removable dentures who seek fixed solutions (All-on-4 / Same-Day Teeth) or single implants.',
          benefits: [
            'Patients who prioritise masticatory function and lifestyle',
            'Pre-qualification filters to eliminate non-viable inquiries',
            'Clinical positioning that reassures patients about surgical safety',
          ],
          tagline: 'Focused on comprehensive rehabilitation cases',
        },
        {
          title: 'Orthodontics & Clear Aligners',
          badge: 'High Market Demand',
          description: 'Campaigns directed at adults who refuse traditional metal brackets and demand the discreet convenience of clear aligners for aesthetic and functional correction.',
          benefits: [
            'Professional imagery appealing to working adults',
            'Highlighting your clinic’s 3D digital treatment planning',
            'Facilitating confident decisions during the initial consultation',
          ],
          tagline: 'Accelerating private orthodontic acceptance',
        },
        {
          title: 'Aesthetic Dentistry',
          badge: 'Smile Transformations',
          description: 'Patients motivated by aesthetic smile enhancements: porcelain veneers, composite bonding, and comprehensive smile makeovers.',
          benefits: [
            'Showcasing authorized real case documentation',
            'Positioning your practice as the premier local cosmetic clinic',
            'Attracting private patients ready for prompt treatment decisions',
          ],
          tagline: 'Celebrating clinical artistry and dental precision',
        },
      ],
    },
    about: {
      tag: 'About OralPro',
      title: 'Specialists in converting clinical interest into high-value appointments',
      p1: 'Led by Mario Provenzano, OralPro was founded with a singular purpose: empowering dental practice owners to sustainably attract private patients for complex implant, orthodontic, and aesthetic dental care.',
      p2: 'With over 281 partnered clinics, our frameworks combine high-precision patient outreach with front-desk sales enablement, ensuring that every marketing euro translates into actual patients in the chair.',
      photoCaption1: 'Mario Provenzano · OralPro',
      photoSub1: 'Live Conferences & Masterclasses',
      photoCaption2: 'Gathering with Partnered Clinicians',
      photoSub2: '281 Studi Partner Network',
      stat1Number: '281+',
      stat1Title: 'Partnered Practices',
      stat1Desc: 'Officially registered studi affiliati',
      stat2Number: '100%',
      stat2Title: 'Dental Medicine Focus',
      stat2Desc: 'No dilution across other industries',
      integrityTitle: 'Commitment to verified facts',
      integrityText: 'All metrics and references reflect confirmed data published on our official Instagram account (@oralpro.italia). We never invent testimonials or claims without formal authorization.',
      ctaButton: 'Schedule strategic call with our team',
      viewInstagram: 'View @oralpro.italia',
    },
    trust: {
      tag: 'Experience & Trust',
      title: 'Proven outcomes across partnered dental practices',
      subtitle: 'Explore how affiliated clinics structured their patient acquisition and increased occupancy in their most profitable clinical departments.',
      verifiedCaseBadge: 'Validated Case',
      accompanimentTag: 'OralPro Advisory',
      cases: [
        {
          clinic: 'Studi Partner 01',
          location: 'Northern / Central Region',
          specialty: 'Implantology & Full-Arch Restorations',
          outcome: 'Marked increase in private surgical consultation attendance',
          quote: 'Structuring our reception intake allowed us to pre-qualify calls before they reached the clinic, filling surgical days with genuine treatment candidates.',
        },
        {
          clinic: 'Studi Partner 02',
          location: 'Metropolitan Area',
          specialty: 'Orthodontics & Clear Aligners',
          outcome: 'Accelerated acceptance of comprehensive orthodontic plans',
          quote: 'We positioned our practice as the regional benchmark for clear aligners, eliminating the need to compete on discount pricing.',
        },
      ],
      eventBannerTag: 'Live Events & Masterclasses',
      eventBannerTitle: 'Interested in joining our masterclasses or scheduling an individual consultation?',
      eventBannerDesc: 'We offer individual online diagnostic consultations in Lisbon Time (Europe/Lisbon).',
      eventBannerBtn: 'Book Complimentary Diagnostic',
    },
    faq: {
      tag: 'Frequently Asked Questions',
      title: 'Clear answers regarding our services and methodology',
      subtitle: 'Complete transparency regarding our onboarding, workflow, and ongoing commercial advisory.',
      bannerTitle: 'Do you have a specific question about your dental practice?',
      bannerSubtitle: 'Chat now with our virtual assistant or schedule a meeting with our executive team.',
      chatBtn: 'Chat with assistant',
      bookBtn: 'Schedule meeting',
      items: [
        {
          q: 'How long does implementation take for our dental clinic?',
          a: 'Initial diagnostic and strategy setup typically requires 7 to 10 working days. Once messaging and triage scripts are approved by the clinical director, patient acquisition campaigns are activated immediately.',
        },
        {
          q: 'Does our front-desk team need to spend countless hours on this?',
          a: 'No. Our scripts and workflows are designed specifically to save reception staff time by filtering non-qualified inquiries and providing rapid WhatsApp and phone templates.',
        },
        {
          q: 'How is patient acquisition volume calibrated for each clinic?',
          a: 'We evaluate your available operatories, surgical roster, and diary availability. We never generate more patient flow than your team can clinically manage with total healthcare excellence.',
        },
        {
          q: 'In which time zone are OralPro commercial meetings conducted?',
          a: 'All commercial and diagnostic meetings with OralPro are held in Lisbon Time (Europe/Lisbon / UTC+1), with automatic seasonal daylight savings adjustment.',
        },
        {
          q: 'Does OralPro support international dental clinics?',
          a: 'Yes. OralPro supports clinics across Portugal, Italy, and broader Europe, delivering tailored strategies aligned with each local healthcare market.',
        },
        {
          q: 'How can I schedule the initial diagnostic meeting?',
          a: 'Simply select an available date and time slot in our interactive scheduler or request it directly through our virtual assistant. The 30-minute session is complimentary and online.',
        },
      ],
    },
    finalCta: {
      badge: 'Strategic Commercial Meeting · Lisbon Time',
      title: 'Shall we discuss the next stage of your dental practice?',
      subtitle: 'Discover how to build predictable high-value patient acquisition and stabilize your clinic’s monthly revenue.',
      button: 'Schedule meeting',
      footnote: '30-minute online session · No forced long-term lock-in · Europe/Lisbon Timezone',
    },
    booking: {
      modalTitle: 'Schedule Commercial Meeting · OralPro',
      step1Title: 'Select the meeting format',
      step1Subtitle: 'Private online consultation with an OralPro strategy advisor.',
      step2Title: 'Choose your date and preferred time slot',
      step2Subtitle: 'Times displayed in Lisbon Time (UTC+1).',
      step3Title: 'Practice details for meeting invite',
      step3Subtitle: 'Your information is used solely to prepare the clinical diagnostic and send calendar access links.',
      step4Title: 'Meeting Confirmed Successfully!',
      step4Subtitle: 'Your time slot has been secured and reserved on our server.',
      stepLabel1: '1. Meeting Format',
      stepLabel2: '2. Date & Time (Lisbon)',
      stepLabel3: '3. Practice Details',
      stepLabel4: '4. Confirmation',
      meetingTypes: [
        {
          id: 'diagnostico',
          title: 'Initial Commercial Diagnostic',
          duration: '30 minutes',
          description: 'Individual audit of practice capacity, geographic positioning, and acquisition potential.',
        },
        {
          id: 'estrategia',
          title: 'Strategy & Roadmap Presentation',
          duration: '45 minutes',
          description: 'Detailed proposal for implant, orthodontic, or aesthetic patient acquisition.',
        },
        {
          id: 'acompanhamento',
          title: 'Strategic Review & Follow-up',
          duration: '30 minutes',
          description: 'Dedicated session for onboarding clinics or active practice partners.',
        },
      ],
      dateLabel: 'Meeting date',
      daysNotice: 'Consultations available Monday to Friday.',
      timeSlotsLabel: 'Available slots (Lisbon Time)',
      refreshSlots: 'Refresh availability',
      slotSelectedNotice: (date, time) => `Selected: ${date} at ${time} (Lisbon Time)`,
      nameLabel: 'Clinical Director / Practice Owner *',
      namePlaceholder: 'e.g., Dr. Arthur Davies',
      clinicLabel: 'Dental Clinic / Practice Name *',
      clinicPlaceholder: 'e.g., Harley Dental Studio',
      emailLabel: 'Professional Email (for calendar invite) *',
      emailPlaceholder: 'director@harleydental.co.uk',
      phoneLabel: 'Direct Phone / WhatsApp',
      phonePlaceholder: '+44 7911 123456',
      chairsLabel: 'Practice structure (number of chairs)',
      chairsOptions: [
        '1 to 2 operatories',
        '3 to 4 operatories',
        '5+ operatories',
        'Multi-site Dental Group',
      ],
      specialtiesLabel: 'Priority clinical specialties',
      notesLabel: 'Any preliminary remarks for our advisory team?',
      notesPlaceholder: 'e.g., We are expanding our full-arch implant capacity this quarter...',
      btnConfirm: 'Confirm Appointment',
      btnProcessing: 'Securing slot on server...',
      bookingSuccessTitle: 'Meeting Confirmed Successfully!',
      bookingSuccessSubtitle: 'Your time slot has been recorded and reserved on our server.',
      ticketId: 'Booking Reference:',
      ticketType: 'Meeting Format:',
      ticketDateTime: 'Date & Time:',
      ticketClinic: 'Practice:',
      ticketDoctor: 'Director:',
      googleCalendarBtn: 'Add to Google Calendar',
      downloadIcsBtn: 'Download .ICS Calendar File (Outlook/Apple)',
      conflictError: 'This time slot is already booked. Please choose an alternate convenient slot.',
    },
    chat: {
      buttonLabel: 'Speak with OralPro',
      talkToUs: 'Contact us',
      title: 'OralPro Virtual Assistant',
      onlineStatus: 'Online · Lisbon Time',
      anonymousGreeting: 'Hello! I am the OralPro virtual assistant. What should I call you?',
      namedGreeting: (name: string) => `Pleased to meet you, ${name}. Would you like to explore our services or do you have a specific goal in mind for your dental practice?`,
      noNameGreeting: 'No problem at all! Would you like to learn about our services or do you already have a specific clinical need in mind?',
      namePrompt: 'How would you prefer to be addressed?',
      namePlaceholder: 'e.g., Dr. Roberts or Sarah',
      confirmNameBtn: 'Confirm',
      skipNameBtn: 'Continue without name',
      quickOptions: [
        'Implant Patient Acquisition',
        'Orthodontics & Aligners',
        'Explore the 4-Stage Method',
        'View Lisbon meeting times',
      ],
      requestHumanBtn: 'Speak to team',
      bookBtn: 'Schedule meeting',
      inputPlaceholder: 'Type your question...',
      typingIndicator: 'Assistant is typing...',
      humanModalTitle: 'Request Callback from Senior Advisor',
      humanModalDesc: 'Leave your phone number to receive a direct callback from an OralPro practice consultant.',
      phonePlaceholder: '+44 7xxx xxx xxx',
      submitCallbackBtn: 'Request Callback',
      callbackRegistered: (time: string) => `Your callback request was logged at ${time} (Lisbon Time). Our advisory team will reach out within 1 business day.`,
      thumbsUpTitle: 'Helpful answer',
      thumbsDownTitle: 'Needs improvement',
    },
    contactPage: {
      tag: 'Direct Channels',
      title: 'Connect with the OralPro Advisory Team',
      subtitle: 'We are available to answer your questions regarding commercial positioning and practice growth.',
      infoCardTitle: 'Direct Contact Details',
      hoursTitle: 'Timezone & Consultation Hours',
      hoursDesc: 'Monday to Friday: 09:00 - 18:30 (Europe/Lisbon)',
      emailTitle: 'Official Email',
      phoneTitle: 'Practice Support',
      phoneDesc: '+351 210 987 654 (Practice Advisory Line)',
      socialTitle: 'Official Instagram',
      bookDirectBtn: 'Book directly via interactive calendar',
      formTitle: 'Send us a direct message',
      formSubtitle: 'Our commercial team will review your inquiry and get in touch promptly.',
      nameLabel: 'Full Name *',
      clinicLabel: 'Dental Clinic / Practice Name',
      emailLabel: 'Professional Email *',
      phoneLabel: 'Direct Phone / WhatsApp',
      interestLabel: 'Primary Clinical Interest',
      interestOptions: [
        'Implantology & Full-Arch Restorations',
        'Orthodontics & Clear Aligners',
        'Aesthetic Dentistry & Veneers',
        'Front-Desk Sales & Intake Training',
      ],
      notesLabel: 'Additional details or current challenges',
      notesPlaceholder: 'Briefly describe your number of chairs and key objectives...',
      submitBtn: 'Send Message',
      submittingBtn: 'Submitting message...',
      successTitle: 'Message received successfully!',
      successDesc: 'Our senior consultants will review your practice information and reach out shortly.',
      sendAnotherBtn: 'Send another message',
    },
    admin: {
      headerTitle: 'OralPro Admin',
      syncStatus: 'Synchronised',
      viewSiteBtn: 'View Public Site',
      logoutBtn: 'Sign Out',
      tabBookings: 'Appointments',
      tabLeads: 'Inquiries & Leads',
      tabConversations: 'AI Chat Logs',
      tabKnowledge: 'Knowledge Base',
      tabMedia: 'Media Management',
      tabAiImprovement: 'Continuous AI Improvement',
      loginTitle: 'OralPro Administration Portal',
      loginDesc: 'Restricted to management and commercial strategy consultants.',
      passwordLabel: 'Access Passcode',
      passwordPlaceholder: 'Enter passcode...',
      demoNote: 'Demo access: oralpro',
      enterBtn: 'Access Portal',
      backBtn: 'Back to website',
      searchPlaceholder: 'Search by doctor, clinic, or email...',
      allStatuses: 'All statuses',
      statusConfirmed: 'Confirmed',
      statusCompleted: 'Completed',
      statusCancelled: 'Cancelled',
      statusNoShow: 'No-show',
      viewTable: 'Table',
      viewToday: 'Today',
      viewWeek: 'Week',
      viewMonth: 'Month',
      colDateTime: 'Date & Time (Lisbon)',
      colDoctorClinic: 'Director & Practice',
      colMeetingType: 'Format',
      colStructureFocus: 'Operatories & Focus',
      colStatus: 'Status',
      colActions: 'Actions',
      manageBtn: 'Manage / Notes',
      noBookingsFound: 'No appointments found matching this filter.',
      leadsTitle: 'Inbound Leads from Website & Chat',
      leadsSubtitle: 'Dental practice owners with recorded commercial intent.',
      colContact: 'Contact',
      colInterest: 'Interest',
      colSource: 'Source',
      colNotes: 'Notes',
      conversationsTitle: 'Virtual Assistant Interaction Logs',
      conversationsSubtitle: 'Real-time monitoring of queries, ratings, and resolution.',
      ratedByVisitor: 'Rated by visitor as:',
      kbTitle: 'Virtual Assistant Knowledge Base',
      kbSubtitle: 'The AI assistant checks these guidelines before responding. It never hallucinates facts without verification.',
      addArticleBtn: 'Add Knowledge Article',
      mediaTitle: 'Official Photography & Visual Asset Registry',
      mediaSubtitle: 'Origin verification, aspect ratio framing, and client authorization audit.',
      addMediaBtn: 'Register New Image',
      aiTitle: 'Continuous AI Service Improvement',
      aiSubtitle: 'The system identifies recurring visitor questions and proposes answers. Human approval is strictly required before publication.',
      aiRecurrentQuestion: 'Recurring Question Identified',
      aiSuggestedAnswer: 'Suggested Standard Response:',
      aiApproveBtn: 'Approve & Publish to Knowledge Base',
      aiPublishedBadge: 'Published to Knowledge Base',
      aiPendingBadge: 'Awaiting Validation',
      manageModalTitle: (id) => `Manage Appointment #${id}`,
      rescheduleDateLabel: 'Reschedule Date',
      rescheduleTimeLabel: 'Time (Lisbon Time)',
      internalNotesLabel: 'Internal Team Notes',
      saveChangesBtn: 'Save Changes',
    },
  },
  it: {
    meta: {
      title: 'OralPro - Marketing e Acquisizione Pazienti per Studi Dentistici',
      description: 'Strategia di marketing odontoiatrico e consulenza commerciale per titolari di studi. Acquisizione pazienti ad alto valore per implantologia, ortodonzia ed estetica.',
      langCode: 'it-IT',
      ogLocale: 'it_IT',
    },
    common: {
      lisbonTime: 'Orario di Lisbona (Europe/Lisbon)',
      timezoneNotice: 'Tutti gli incontri sono pianificati in Orario di Lisbona (UTC+1).',
      officialBrand: 'OralPro Ufficiale',
      confirmedClinics: '281 studi affiliati',
      instagramRef: 'Profilo ufficiale @oralpro.italia',
      scheduleMeeting: 'Prenota incontro',
      speakWithOralPro: 'Parla con OralPro',
      learnStrategy: 'Scopri la strategia',
      backToSite: 'Torna al sito pubblico',
      close: 'Chiudi',
      back: 'Indietro',
      continue: 'Continua',
      confirm: 'Conferma',
      loading: 'Caricamento...',
      saving: 'Salvataggio...',
      success: 'Completato con successo',
      error: 'Si è verificato un errore',
      allRightsReserved: 'Tutti i diritti riservati.',
      privacy: 'Privacy e Protezione Dati',
      terms: 'Termini di Servizio',
      location: 'Lisbona, Portogallo',
      adminPortal: 'Accesso Team',
      medicalEthicsNotice: 'Tutte le strategie di acquisizione rispettano rigorosamente la deontologia medica e le normative sanitarie vigenti.',
      verified: 'Dato confermato',
      pendingValidation: 'In attesa di validazione',
    },
    nav: {
      home: 'Home',
      services: 'Servizi',
      method: 'Metodo',
      areas: 'Aree',
      about: 'Chi siamo',
      faq: 'Domande',
      contact: 'Contatti',
      admin: 'Gestionale',
    },
    hero: {
      badgeTag: 'OralPro Ufficiale',
      badgeCount: '281 studi affiliati',
      badgeRef: 'Riferimento @oralpro.italia',
      headlineStart: 'Il tuo studio merita di essere la ',
      headlineAccent: 'prossima scelta.',
      support: 'Marketing e accompagnamento commerciale per aiutare il tuo studio dentistico a raggiungere più pazienti e trasformare l’interesse in prime visite ad alto valore.',
      ctaStrategy: 'Scopri la strategia',
      ctaChat: 'Parla con OralPro',
      specialtiesLabel: 'Specialità Principali:',
      specImplants: 'Implantologia & Riabilitazione',
      specOrtho: 'Ortodonzia & Allineatori',
      specAesthetics: 'Estetica Dentale',
      photoLeaderTag: 'Mario Provenzano · Fondatore OralPro',
      photoCaption: 'Presentazioni & Masterclass con Titolari di Studio',
      photoSubcaption: 'Studi affiliati · Strategia di Acquisizione',
      pipelineTitle: 'Il Percorso del Paziente',
      pipelineSubtitle: '(Flusso strutturato)',
      stepCount: (curr, total) => `Fase ${curr} di ${total}`,
      prevStep: 'Precedente',
      nextStep: 'Fase successiva →',
      steps: [
        {
          tag: 'Fase 1',
          title: 'Divulgazione Mirata',
          description: 'Campagne geolocalizzate rivolte a pazienti che cercano riabilitazioni implantari e cure complesse.',
        },
        {
          tag: 'Fase 2',
          title: 'Contatto Qualificato',
          description: 'Filtro iniziale per selezionare solo persone con un reale bisogno clinico ed escludere perditempo.',
        },
        {
          tag: 'Fase 3',
          title: 'Accoglienza Commerciale',
          description: 'Protocollo di risposta per la segreteria dello studio per spiegare e accogliere con empatia il paziente.',
        },
        {
          tag: 'Fase 4',
          title: 'Prima Visita Confermata',
          description: 'Appuntamento fissato nell’agenda del medico con altissimo tasso di presenza effettiva.',
        },
      ],
    },
    challenges: {
      tag: 'Ostacoli Quotidiani',
      title: 'Riconosci queste difficoltà nella gestione del tuo studio?',
      subtitle: 'Avere un’eccellente preparazione clinica non basta se i processi commerciali e di accoglienza non riflettono gli stessi standard di qualità.',
      items: [
        {
          subtitle: 'Perdita di tempestività',
          title: 'Contatti senza risposta immediata',
          description: 'Lo studio investe in pubblicità, ma le richieste rimangono ore o giorni senza risposta in segreteria. I pazienti interessati prenotano altrove prima del primo contatto.',
          solution: 'Attivazione di protocolli e script di risposta rapida ed empatica per la segreteria.',
        },
        {
          subtitle: 'Campagne senza riscontro sulla poltrona',
          title: 'Poca chiarezza sul ritorno economico',
          description: 'Visualizzazioni e clic non pagano i costi fissi. La direzione spesso non sa quanti pazienti di impianti o allineatori si siano effettivamente seduti alla poltrona.',
          solution: 'Tracciamento completo dal primo messaggio alla visita e al preventivo accettato.',
        },
        {
          subtitle: 'Piani di cura rimasti in sospeso',
          title: 'Piani di trattamento non finalizzati',
          description: 'Pazienti che necessitano di riabilitazioni complete esitano al momento della decisione. Senza un follow-up consultivo strutturato, il preventivo viene dimenticato.',
          solution: 'Strutturazione dell’accompagnamento post-visita per consolidare la fiducia.',
        },
      ],
      ctaBannerTitle: 'Vuoi valutare il potenziale di crescita del tuo studio dentistico?',
      ctaBannerSubtitle: 'Analizziamo la tua zona, la capacità clinica e i competitor in una sessione di diagnosi individuale.',
      ctaBannerButton: 'Analizza il mio studio',
    },
    services: {
      tag: 'Servizi Confermati',
      title: 'Soluzioni create su misura per la realtà degli studi dentistici',
      subtitle: 'Non siamo una generica agenzia di marketing digitale. Ogni nostro processo è stato validato nel settore odontoiatrico, nel rispetto del decoro e dell’etica medica.',
      forWhomLabel: 'A chi si rivolge:',
      howHelpsLabel: 'Come aiuta lo studio:',
      routineIntegration: 'Integrazione perfetta nella routine dello studio',
      learnMoreBtn: 'Scopri l’applicazione per il mio studio',
      serviceList: [
        {
          number: '01',
          title: 'Acquisizione Pazienti ad Alto Valore',
          headline: 'Attrarre persone che cercano trattamenti complessi di riabilitazione ed estetica.',
          whatItIs: 'Creazione e gestione di campagne di marketing ad alta profilazione incentrate su prestazioni a marginalità elevata: Implantologia (a carico immediato / All-on-4), Ortodonzia Invisibile ed Estetica Dentale.',
          whoIsItFor: 'Studi dentistici strutturati che desiderano saturare l’agenda chirurgica e specialistica con pazienti privati qualificati.',
          howItHelps: 'Incrementa il valore medio delle cure e riduce la dipendenza da convenzioni a bassa marginalità o semplici sedute di igiene.',
          features: [
            'Targeting geografico e demografico rigoroso',
            'Comunicazione sobria che valorizza l’autorevolezza medica',
            'Filtri di qualificazione prima del contatto in segreteria',
          ],
        },
        {
          number: '02',
          title: 'Formazione Commerciale della Segreteria',
          headline: 'Trasformare telefonate e messaggi WhatsApp in visite confermate in studio.',
          whatItIs: 'Formazione pratica per le segretarie e il personale di front-desk. Definizione di standard per rispondere entro 15 minuti, gestire le obiezioni sui prezzi e confermare la presenza.',
          whoIsItFor: 'Titolari di studio che avvertono il sovraccarico della reception o la mancanza di preparazione specifica nel gestire pazienti indecisi.',
          howItHelps: 'Abbassa drasticamente il tasso di no-show (assenze) e assicura che nessuna richiesta di valore rimanga trascurata.',
          features: [
            'Script di contatto rapido ed empatico',
            'Tecniche di conferma attiva dell’appuntamento',
            'Gestione professionale delle perplessità sui costi',
          ],
        },
        {
          number: '03',
          title: 'Monitoraggio Strategico & Ottimizzazione Continua',
          headline: 'Decisioni basate su pazienti reali seduti alla poltrona.',
          whatItIs: 'Confronto periodico settimanale e mensile. Analisi dell’intero percorso: richieste ricevute, prime visite eseguite, piani presentati e fatturato accettato.',
          whoIsItFor: 'Direttori sanitari e titolari che esigono assoluta trasparenza e riscontro concreto sull’investimento effettuato.',
          howItHelps: 'Consente di indirizzare rapidamente le risorse sulle prestazioni più profittevoli e individuare eventuali colli di bottiglia prima che creino problemi.',
          features: [
            'Report chiari privi di inutili metriche di vanità',
            'Incontri periodici di allineamento con il team OralPro',
            'Adattamento continuo alla disponibilità dei medici',
          ],
        },
      ],
    },
    method: {
      tag: 'Metodologia Comprovata',
      title: '4 passaggi chiari dal primo contatto all’agenda piena',
      subtitle: 'Nessun processo improvvisato. Seguiamo un metodo testato e perfezionato in centinaia di studi odontoiatrici.',
      bannerTitle: 'Metodo consolidato in 281 studi affiliati',
      bannerSubtitle: 'Supporto ravvicinato da parte del team OralPro con riunioni online fissate in Orario di Lisbona (Europe/Lisbon).',
      bannerButton: 'Verifica l’applicazione al mio studio',
      steps: [
        {
          step: '01',
          title: 'Conoscere lo studio',
          subtitle: 'Diagnosi approfondita',
          description: 'Analizziamo la capacità produttiva (numero di riuniti, odontoiatri, igienisti), le cure più redditizie e il profilo demografico del bacino d’utenza.',
          details: [
            'Audit della visibilità locale e dei concorrenti di zona',
            'Valutazione del tasso di saturazione delle poltrone',
            'Selezione delle terapie ad alta priorità',
          ],
        },
        {
          step: '02',
          title: 'Definire la strategia',
          subtitle: 'Posizionamento e funnel',
          description: 'Sviluppiamo il piano d’azione personalizzato: individuazione delle prestazioni chiave, creazione di pagine di presentazione autorevoli e script di accoglienza.',
          details: [
            'Segmentazione dei pazienti con reale capacità di spesa',
            'Pagine informative conformi al decoro odontoiatrico',
            'Linee guida per la segreteria e il primo contatto',
          ],
        },
        {
          step: '03',
          title: 'Eseguire le azioni',
          subtitle: 'Campagne attive e selezione',
          description: 'Avviamo le campagne multicanale con filtri di qualificazione affinché la segreteria riceva richieste solo da pazienti sinceramente motivati.',
          details: [
            'Attivazione di campagne continue per nuovi pazienti',
            'Inoltro diretto su WhatsApp o recapito dello studio',
            'Monitoraggio costante della qualità dei contatti',
          ],
        },
        {
          step: '04',
          title: 'Monitorare i risultati',
          subtitle: 'Revisione settimanale e ritorno',
          description: 'Verifica costante delle prime visite eseguite e dei piani di cura accettati. Ricalibriamo il budget per massimizzare il fatturato generato.',
          details: [
            'Monitoraggio della presenza effettiva alle visite',
            'Incontri di allineamento con il titolare di studio',
            'Crescita sostenibile del flusso di pazienti privati',
          ],
        },
      ],
    },
    specialties: {
      tag: 'Specialità Confermate',
      title: 'Prestazioni ad alto valore per aumentare la redditività dello studio',
      subtitle: 'Concentriamo l’attività di marketing sulle branche odontoiatriche che assicurano la massima soddisfazione clinica ed economica.',
      scheduleBtn: 'Prenota incontro →',
      items: [
        {
          title: 'Implantologia & Riabilitazione',
          badge: 'Alto Valore',
          description: 'Intercettare pazienti che soffrono per la perdita di denti o protesi instabili e desiderano denti fissi in giornata (All-on-4 / Toronto Bridge) o impianti singoli.',
          benefits: [
            'Pazienti che mettono al primo posto masticazione e qualità di vita',
            'Filtro preliminare per evitare contatti non qualificati',
            'Comunicazione che rassicura sulla sicurezza chirurgica',
          ],
          tagline: 'Focus su riabilitazioni complete fisse',
        },
        {
          title: 'Ortodonzia & Allineatori Invisibili',
          badge: 'Altissima Richiesta',
          description: 'Campagne dedicate a pazienti adulti che rifiutano l’apparecchio tradizionale in metallo e scelgono la discrezione delle mascherine trasparenti.',
          benefits: [
            'Linguaggio visivo adeguato a professionisti e adulti',
            'Valorizzazione del piano digitale 3D dello studio',
            'Decisione facilitata già durante la prima consulenza',
          ],
          tagline: 'Accettazione rapida dei piani ortodontici',
        },
        {
          title: 'Estetica Dentale & Faccette',
          badge: 'Nuovo Sorriso',
          description: 'Pazienti motivati dal miglioramento estetico: faccette in ceramica integrale, restauri estetici e sbiancamento professionale.',
          benefits: [
            'Presentazione di casi clinici reali documentati e autorizzati',
            'Posizionamento dello studio come punto di riferimento cittadino',
            'Pazienti privati pronti a decidere rapidamente',
          ],
          tagline: 'Valorizzazione della precisione clinica e dell’arte',
        },
      ],
    },
    about: {
      tag: 'Chi siamo',
      title: 'Specialisti nel trasformare l’interesse in prime visite di valore',
      p1: 'Fondata e guidata da Mario Provenzano, OralPro è nata con un obiettivo preciso: affiancare i titolari di studi dentistici nell’attrazione costante di pazienti privati per trattamenti complessi di implantologia, ortodonzia ed estetica.',
      p2: 'Con più di 281 studi affiliati (studi partner documentati nel nostro canale ufficiale @oralpro.italia), uniamo la precisione della divulgazione alla formazione commerciale della reception, trasformando l’investimento in fatturato clinico reale.',
      photoCaption1: 'Mario Provenzano · OralPro',
      photoSub1: 'Eventi dal vivo & Masterclass',
      photoCaption2: 'Incontro con Odontoiatri Affiliati',
      photoSub2: '281 Studi Partner Riconosciuti',
      stat1Number: '281+',
      stat1Title: 'Studi Affiliati',
      stat1Desc: 'Studi partner registrati e seguiti',
      stat2Number: '100%',
      stat2Title: 'Settore Odontoiatrico',
      stat2Desc: 'Nessuna dispersione in altri campi',
      integrityTitle: 'Trasparenza e rispetto delle fonti',
      integrityText: 'I dati e le immagini provengono esclusivamente dalle informazioni pubbliche e confermate del profilo Instagram ufficiale (@oralpro.italia). Non pubblichiamo recensioni o numeri non autorizzati.',
      ctaButton: 'Prenota un incontro con il team',
      viewInstagram: 'Guarda @oralpro.italia',
    },
    trust: {
      tag: 'Esperienza e Affidabilità',
      title: 'Risultati concreti negli studi dentistici partner',
      subtitle: 'Scopri come gli studi affiliati hanno ottimizzato l’acquisizione dei pazienti e aumentato l’occupazione delle specialità ad alto valore.',
      verifiedCaseBadge: 'Caso Validato',
      accompanimentTag: 'Supporto OralPro',
      cases: [
        {
          clinic: 'Studi Partner 01',
          location: 'Nord / Centro Italia',
          specialty: 'Implantologia e Carico Immediato',
          outcome: 'Notevole incremento delle prime visite private presenti in studio',
          quote: 'La formazione telefonica della segreteria ci ha permesso di filtrare le richieste prima che arrivassero in studio, riempiendo le sedute chirurgiche di casi reali.',
        },
        {
          clinic: 'Studi Partner 02',
          location: 'Area Metropolitana',
          specialty: 'Ortodonzia con Allineatori Trasparenti',
          outcome: 'Adesione immediata ai piani di cura completi',
          quote: 'Abbiamo posizionato il nostro studio come punto di riferimento per gli allineatori invisibili, smettendo di fare la guerra dei prezzi al ribasso.',
        },
      ],
      eventBannerTag: 'Conferenze & Eventi dal vivo',
      eventBannerTitle: 'Vuoi partecipare a un nostro evento dal vivo o fissare una diagnosi individuale?',
      eventBannerDesc: 'Offriamo sessioni di diagnosi strategica online individuali in Orario di Lisbona (Europe/Lisbon).',
      eventBannerBtn: 'Prenota Diagnosi Gratuita',
    },
    faq: {
      tag: 'Domande Frequenti',
      title: 'Tutte le risposte sui nostri servizi e sul nostro metodo',
      subtitle: 'Massima chiarezza su tempi di attivazione, impegno della segreteria e riunioni commerciali.',
      bannerTitle: 'Hai una domanda specifica sul tuo studio dentistico?',
      bannerSubtitle: 'Scrivi adesso all’assistente virtuale o fissa un incontro con il nostro team.',
      chatBtn: 'Parla con l’assistente',
      bookBtn: 'Prenota incontro',
      items: [
        {
          q: 'Quanto tempo richiede l’implementazione del metodo?',
          a: 'La fase iniziale di diagnosi e definizione della strategia richiede in media tra i 7 e i 10 giorni lavorativi. Dopo l’approvazione dei messaggi e dei protocolli di segreteria, le campagne vengono attivate subito.',
        },
        {
          q: 'La segreteria dello studio deve dedicare molte ore al giorno?',
          a: 'No. Gli script e le procedure sono studiati proprio per far risparmiare tempo alla segreteria, organizzando risposte rapide su WhatsApp e al telefono per evitare perdite di tempo con persone poco motivate.',
        },
        {
          q: 'Come viene calibrata la capacità di acquisizione di ciascuno studio?',
          a: 'Valutiamo il numero di riuniti, il team medico e la disponibilità dell’agenda per interventi e visite. Non generiamo mai più richieste di quante lo studio ne possa gestire con assoluta cura medica.',
        },
        {
          q: 'In quale fuso orario si svolgono gli incontri commerciali con OralPro?',
          a: 'Tutti gli incontri diagnostici e commerciali con OralPro sono programmati in Orario di Lisbona (Europe/Lisbon / UTC+1), con regolazione automatica dell’ora legale.',
        },
        {
          q: 'OralPro segue anche studi al di fuori del Portogallo?',
          a: 'Certamente. OralPro supporta con successo studi odontoiatrici in Italia, Portogallo e in tutta Europa, con strategie calibrate sul mercato locale di riferimento.',
        },
        {
          q: 'Come posso prenotare la prima riunione di diagnosi?',
          a: 'È sufficiente selezionare data e ora nel nostro calendario interattivo su questa pagina o richiederla all’assistente virtuale. La sessione di 30 minuti è online e senza impegno.',
        },
      ],
    },
    finalCta: {
      badge: 'Incontro Commerciale Strategico · Orario di Lisbona',
      title: 'Vogliamo parlare del prossimo passo per il tuo studio?',
      subtitle: 'Scopri come strutturare l’acquisizione di pazienti ad alto valore e dare serenità al fatturato del tuo studio dentistico.',
      button: 'Prenota incontro',
      footnote: 'Sessione online di 30 minuti · Nessun vincolo forzato · Fuso Europe/Lisbon',
    },
    booking: {
      modalTitle: 'Prenotazione Incontro Commerciale · OralPro',
      step1Title: 'Scegli il tipo di incontro',
      step1Subtitle: 'Sessione online individuale con un consulente strategico OralPro.',
      step2Title: 'Seleziona data e orario preferito',
      step2Subtitle: 'Orari indicati in Orario di Lisbona (UTC+1).',
      step3Title: 'Dati per l’invio dell’invito',
      step3Subtitle: 'Le informazioni fornite serviranno esclusivamente a preparare la diagnosi e a inviare il link di collegamento.',
      step4Title: 'Incontro Prenotato con Successo!',
      step4Subtitle: 'Il tuo orario è stato registrato e confermato sul server.',
      stepLabel1: '1. Tipo Incontro',
      stepLabel2: '2. Data & Ora (Lisbona)',
      stepLabel3: '3. Dati Studio',
      stepLabel4: '4. Conferma',
      meetingTypes: [
        {
          id: 'diagnostico',
          title: 'Diagnosi Commerciale Iniziale',
          duration: '30 minuti',
          description: 'Valutazione individuale della capacità dello studio, della zona e del potenziale.',
        },
        {
          id: 'estrategia',
          title: 'Presentazione Piano Strategico',
          duration: '45 minuti',
          description: 'Proposta dettagliata del piano di acquisizione per impianti, allineatori o estetica.',
        },
        {
          id: 'acompanhamento',
          title: 'Allineamento e Revisione Strategica',
          duration: '30 minuti',
          description: 'Sessione riservata a studi già affiliati o in fase di integrazione.',
        },
      ],
      dateLabel: 'Data dell’incontro',
      daysNotice: 'Disponibilità dal lunedì al venerdì.',
      timeSlotsLabel: 'Orari disponibili (Orario di Lisbona)',
      refreshSlots: 'Aggiorna orari',
      slotSelectedNotice: (date, time) => `Selezionato: ${date} alle ${time} (Lisbona)`,
      nameLabel: 'Nome del Titolare / Direttore Sanitario *',
      namePlaceholder: 'Es: Dott. Marco Bianchi',
      clinicLabel: 'Nome dello Studio Dentistico *',
      clinicPlaceholder: 'Es: Studio Dentistico Bianchi',
      emailLabel: 'Email professionale (per ricevere l’invito) *',
      emailPlaceholder: 'info@studiodentistico.it',
      phoneLabel: 'Telefono / WhatsApp del Titolare',
      phonePlaceholder: '+39 333 1234567',
      chairsLabel: 'Dimensione dello studio (numero di riuniti)',
      chairsOptions: [
        '1 - 2 riuniti',
        '3 - 4 riuniti',
        '5 o più riuniti',
        'Clinica Odontoiatrica / Gruppo',
      ],
      specialtiesLabel: 'Branche prioritarie',
      notesLabel: 'Note o domande preliminari per i consulenti',
      notesPlaceholder: 'Es: Vorremmo incrementare i casi di chirurgia a carico immediato...',
      btnConfirm: 'Conferma Prenotazione',
      btnProcessing: 'Registrazione sul server in corso...',
      bookingSuccessTitle: 'Incontro Prenotato con Successo!',
      bookingSuccessSubtitle: 'Il tuo orario è stato salvato e bloccato sul server.',
      ticketId: 'Codice Prenotazione:',
      ticketType: 'Tipo Incontro:',
      ticketDateTime: 'Data & Ora:',
      ticketClinic: 'Studio Dentistico:',
      ticketDoctor: 'Titolare:',
      googleCalendarBtn: 'Aggiungi a Google Calendar',
      downloadIcsBtn: 'Scarica file .ICS (Outlook/Apple Calendar)',
      conflictError: 'Questo orario risulta già occupato. Ti invitiamo a selezionare un altro orario disponibile.',
    },
    chat: {
      buttonLabel: 'Parla con OralPro',
      talkToUs: 'Parla con noi',
      title: 'Assistente Virtuale OralPro',
      onlineStatus: 'Online · Orario di Lisbona',
      anonymousGreeting: 'Ciao! Sono l’assistente virtuale di OralPro. Come preferisci che ti chiami?',
      namedGreeting: (name: string) => `Piacere, ${name}. Vorresti conoscere i nostri servizi o hai già un obiettivo preciso per il tuo studio dentistico?`,
      noNameGreeting: 'Nessun problema! Ti andrebbe di approfondire i nostri servizi o hai già una necessità specifica per il tuo studio dentistico?',
      namePrompt: 'Come preferisci essere chiamato/a?',
      namePlaceholder: 'Es: Dott. Rossi o Elena',
      confirmNameBtn: 'Conferma',
      skipNameBtn: 'Continua senza nome',
      quickOptions: [
        'Pazienti per Implantologia',
        'Ortodonzia e Allineatori',
        'Scopri il Metodo in 4 Fasi',
        'Orari incontri (Lisbona)',
      ],
      requestHumanBtn: 'Parla con persona',
      bookBtn: 'Prenota incontro',
      inputPlaceholder: 'Scrivi qui la tua domanda...',
      typingIndicator: 'L’assistente sta rispondendo...',
      humanModalTitle: 'Richiedi Contatto Umano Specialistico',
      humanModalDesc: 'Inserisci il tuo recapito telefonico per essere ricontattato da un consulente OralPro.',
      phonePlaceholder: '+39 3xx xxx xxxx',
      submitCallbackBtn: 'Invia Richiesta di Contatto',
      callbackRegistered: (time: string) => `La tua richiesta di contatto è stata registrata alle ${time} (Orario di Lisbona). Il nostro team ti ricontatterà entro 1 giorno lavorativo.`,
      thumbsUpTitle: 'Risposta utile',
      thumbsDownTitle: 'Da migliorare',
    },
    contactPage: {
      tag: 'Canali Diretti',
      title: 'Mettiti in contatto con il team OralPro',
      subtitle: 'Siamo a disposizione per approfondire la nostra strategia commerciale e supportare la crescita del tuo studio odontoiatrico.',
      infoCardTitle: 'Recapiti Ufficiali',
      hoursTitle: 'Fuso Orario & Orari di Consulenza',
      hoursDesc: 'Lunedì - Venerdì: 09:00 - 18:30 (Europe/Lisbon)',
      emailTitle: 'Email Ufficiale',
      phoneTitle: 'Supporto Commerciale',
      phoneDesc: '+351 210 987 654 (Linea Diretta per Studi)',
      socialTitle: 'Instagram Ufficiale',
      bookDirectBtn: 'Prenota direttamente dall’agenda',
      formTitle: 'Inviaci un messaggio diretto',
      formSubtitle: 'Il nostro team commerciale esaminerà la richiesta e ti ricontatterà a breve.',
      nameLabel: 'Nome e Cognome *',
      clinicLabel: 'Nome dello Studio Dentistico',
      emailLabel: 'Email professionale *',
      phoneLabel: 'Telefono / WhatsApp',
      interestLabel: 'Area di interesse prioritario',
      interestOptions: [
        'Implantologia e Riabilitazione',
        'Ortodonzia con Allineatori',
        'Estetica Dentale e Faccette',
        'Formazione Commerciale Segreteria',
      ],
      notesLabel: 'Dettagli o note aggiuntive',
      notesPlaceholder: 'Indica brevemente il numero di riuniti e gli obiettivi principali...',
      submitBtn: 'Invia Messaggio',
      submittingBtn: 'Invio in corso...',
      successTitle: 'Messaggio inviato con successo!',
      successDesc: 'Il nostro team analizzerà la situazione del tuo studio e ti risponderà nel più breve tempo possibile.',
      sendAnotherBtn: 'Invia un altro messaggio',
    },
    admin: {
      headerTitle: 'OralPro Gestionale',
      syncStatus: 'Sincronizzato',
      viewSiteBtn: 'Vai al Sito Pubblico',
      logoutBtn: 'Disconnetti',
      tabBookings: 'Appuntamenti',
      tabLeads: 'Contatti & Lead',
      tabConversations: 'Log Chat IA',
      tabKnowledge: 'Base di Conoscenza',
      tabMedia: 'Archivio Immagini',
      tabAiImprovement: 'Miglioramento Continuo IA',
      loginTitle: 'Pannello Amministrativo OralPro',
      loginDesc: 'Accesso riservato alla direzione e ai consulenti strategici.',
      passwordLabel: 'Password di Accesso',
      passwordPlaceholder: 'Inserisci la password...',
      demoNote: 'Accesso demo: oralpro',
      enterBtn: 'Accedi al Pannello',
      backBtn: 'Torna al sito',
      searchPlaceholder: 'Cerca per medico, studio o email...',
      allStatuses: 'Tutti gli stati',
      statusConfirmed: 'Confermato',
      statusCompleted: 'Completato',
      statusCancelled: 'Annullato',
      statusNoShow: 'Non presentato',
      viewTable: 'Tabella',
      viewToday: 'Oggi',
      viewWeek: 'Settimana',
      viewMonth: 'Mese',
      colDateTime: 'Data & Ora (Lisbona)',
      colDoctorClinic: 'Titolare & Studio',
      colMeetingType: 'Tipo Incontro',
      colStructureFocus: 'Riuniti & Focus',
      colStatus: 'Stato',
      colActions: 'Azioni',
      manageBtn: 'Gestisci / Note',
      noBookingsFound: 'Nessun appuntamento trovato per questo filtro.',
      leadsTitle: 'Contatti Ricevuti dal Sito e dalla Chat',
      leadsSubtitle: 'Titolari di studio con interesse commerciale registrato.',
      colContact: 'Contatto',
      colInterest: 'Interesse',
      colSource: 'Fonte',
      colNotes: 'Note',
      conversationsTitle: 'Storico Interazioni Assistente Virtuale',
      conversationsSubtitle: 'Monitoraggio in tempo reale di quesiti, valutazioni e risposte.',
      ratedByVisitor: 'Valutato dal visitatore come:',
      kbTitle: 'Base di Conoscenza dell’Assistente Virtuale',
      kbSubtitle: 'L’assistente verifica queste regole prima di rispondere. Non inventa mai dati non validati.',
      addArticleBtn: 'Aggiungi Articolo / Risposta',
      mediaTitle: 'Archivio Fotografico e Materiale Visivo Ufficiale',
      mediaSubtitle: 'Origine del materiale, proporzioni e conferma dell’autorizzazione.',
      addMediaBtn: 'Aggiungi Nuova Immagine',
      aiTitle: 'Miglioramento Continuo dell’Assistente IA',
      aiSubtitle: 'Il sistema analizza le domande frequenti dei visitatori e propone risposte ufficiali. La convalida umana del responsabile è obbligatoria prima della pubblicazione.',
      aiRecurrentQuestion: 'Domanda Frequente Rilevata',
      aiSuggestedAnswer: 'Proposta di Risposta Ufficiale:',
      aiApproveBtn: 'Approva e Pubblica nella Base',
      aiPublishedBadge: 'Pubblicato nella Base',
      aiPendingBadge: 'In attesa di convalida',
      manageModalTitle: (id) => `Gestisci Appuntamento #${id}`,
      rescheduleDateLabel: 'Sposta Data',
      rescheduleTimeLabel: 'Ora (Orario di Lisbona)',
      internalNotesLabel: 'Note Interne del Team',
      saveChangesBtn: 'Salva Modifiche',
    },
  },
};
