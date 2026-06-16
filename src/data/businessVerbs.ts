/**
 * Verbo do dia (reforço de negócios). Cada verbo traz tradução e 5 frases
 * aplicadas a contextos de negócios, com tradução em PT.
 * O "verbo do dia" é escolhido de forma determinística pela data.
 */
export interface BusinessSentence {
  en: string
  pt: string
}

export interface BusinessVerb {
  verb: string
  translation: string
  sentences: BusinessSentence[]
}

export const BUSINESS_VERBS: BusinessVerb[] = [
  {
    verb: 'to implement',
    translation: 'implementar / pôr em prática',
    sentences: [
      { en: 'We will implement the new strategy next quarter.', pt: 'Vamos implementar a nova estratégia no próximo trimestre.' },
      { en: 'The team implemented the feedback from the client.', pt: 'A equipe implementou o feedback do cliente.' },
      { en: 'How long will it take to implement this system?', pt: 'Quanto tempo levará para implementar este sistema?' },
      { en: 'We need a clear plan before we implement any changes.', pt: 'Precisamos de um plano claro antes de implementar qualquer mudança.' },
      { en: 'They successfully implemented the cost-cutting measures.', pt: 'Eles implementaram com sucesso as medidas de corte de custos.' },
    ],
  },
  {
    verb: 'to negotiate',
    translation: 'negociar',
    sentences: [
      { en: 'We are negotiating a better deal with the supplier.', pt: 'Estamos negociando um acordo melhor com o fornecedor.' },
      { en: 'She negotiated a 10% discount on the contract.', pt: 'Ela negociou 10% de desconto no contrato.' },
      { en: 'Let’s negotiate the terms before signing.', pt: 'Vamos negociar os termos antes de assinar.' },
      { en: 'They refused to negotiate the deadline.', pt: 'Eles se recusaram a negociar o prazo.' },
      { en: 'We need to negotiate a win-win agreement.', pt: 'Precisamos negociar um acordo em que todos ganham.' },
    ],
  },
  {
    verb: 'to deliver',
    translation: 'entregar / cumprir',
    sentences: [
      { en: 'We always deliver our projects on time.', pt: 'Nós sempre entregamos nossos projetos no prazo.' },
      { en: 'The supplier failed to deliver the order this week.', pt: 'O fornecedor não conseguiu entregar o pedido esta semana.' },
      { en: 'Our goal is to deliver real value to customers.', pt: 'Nosso objetivo é entregar valor real aos clientes.' },
      { en: 'Can you deliver the report by Friday?', pt: 'Você consegue entregar o relatório até sexta?' },
      { en: 'The team delivered excellent results last month.', pt: 'A equipe entregou resultados excelentes no mês passado.' },
    ],
  },
  {
    verb: 'to follow up',
    translation: 'dar continuidade / fazer acompanhamento',
    sentences: [
      { en: 'I will follow up with the client tomorrow.', pt: 'Vou fazer o acompanhamento com o cliente amanhã.' },
      { en: 'Please follow up on that invoice.', pt: 'Por favor, dê continuidade àquela fatura.' },
      { en: 'Let’s follow up after the meeting.', pt: 'Vamos dar continuidade depois da reunião.' },
      { en: 'She followed up with a detailed email.', pt: 'Ela deu seguimento com um e-mail detalhado.' },
      { en: 'We should follow up on every lead.', pt: 'Devemos fazer acompanhamento de cada lead.' },
    ],
  },
  {
    verb: 'to forecast',
    translation: 'prever / projetar',
    sentences: [
      { en: 'We forecast strong growth for next year.', pt: 'Projetamos um forte crescimento para o próximo ano.' },
      { en: 'The team forecasts sales every month.', pt: 'A equipe projeta as vendas todo mês.' },
      { en: 'It’s hard to forecast demand in this market.', pt: 'É difícil prever a demanda neste mercado.' },
      { en: 'Analysts forecast a drop in prices.', pt: 'Os analistas preveem uma queda nos preços.' },
      { en: 'We need accurate data to forecast revenue.', pt: 'Precisamos de dados precisos para projetar a receita.' },
    ],
  },
  {
    verb: 'to streamline',
    translation: 'otimizar / simplificar (processos)',
    sentences: [
      { en: 'We want to streamline the approval process.', pt: 'Queremos otimizar o processo de aprovação.' },
      { en: 'Automation helped us streamline operations.', pt: 'A automação nos ajudou a simplificar as operações.' },
      { en: 'Let’s streamline the workflow to save time.', pt: 'Vamos otimizar o fluxo de trabalho para economizar tempo.' },
      { en: 'They streamlined the team into three departments.', pt: 'Eles simplificaram a equipe em três departamentos.' },
      { en: 'Streamlining costs is our top priority.', pt: 'Otimizar custos é nossa prioridade máxima.' },
    ],
  },
  {
    verb: 'to delegate',
    translation: 'delegar',
    sentences: [
      { en: 'A good leader knows how to delegate tasks.', pt: 'Um bom líder sabe como delegar tarefas.' },
      { en: 'She delegated the report to her assistant.', pt: 'Ela delegou o relatório à sua assistente.' },
      { en: 'You should delegate more to your team.', pt: 'Você deveria delegar mais para sua equipe.' },
      { en: 'I delegated the budget review to Paul.', pt: 'Deleguei a revisão do orçamento ao Paul.' },
      { en: 'Delegating responsibilities builds trust.', pt: 'Delegar responsabilidades constrói confiança.' },
    ],
  },
  {
    verb: 'to prioritize',
    translation: 'priorizar',
    sentences: [
      { en: 'We need to prioritize the most urgent tasks.', pt: 'Precisamos priorizar as tarefas mais urgentes.' },
      { en: 'Let’s prioritize customer satisfaction.', pt: 'Vamos priorizar a satisfação do cliente.' },
      { en: 'They prioritized speed over perfection.', pt: 'Eles priorizaram a velocidade em vez da perfeição.' },
      { en: 'How do you prioritize your workload?', pt: 'Como você prioriza sua carga de trabalho?' },
      { en: 'We must prioritize safety in every project.', pt: 'Devemos priorizar a segurança em cada projeto.' },
    ],
  },
  {
    verb: 'to onboard',
    translation: 'integrar (novo cliente/funcionário)',
    sentences: [
      { en: 'We onboard new clients in under a week.', pt: 'Integramos novos clientes em menos de uma semana.' },
      { en: 'HR will onboard the new hires on Monday.', pt: 'O RH vai integrar os novos contratados na segunda.' },
      { en: 'A smooth onboarding improves retention.', pt: 'Uma boa integração melhora a retenção.' },
      { en: 'We onboarded fifty users this month.', pt: 'Integramos cinquenta usuários este mês.' },
      { en: 'Let’s onboard the team to the new tool.', pt: 'Vamos integrar a equipe à nova ferramenta.' },
    ],
  },
  {
    verb: 'to allocate',
    translation: 'alocar / destinar (recursos)',
    sentences: [
      { en: 'We allocated more budget to marketing.', pt: 'Alocamos mais orçamento para o marketing.' },
      { en: 'How should we allocate these resources?', pt: 'Como devemos alocar esses recursos?' },
      { en: 'The manager allocated tasks to each member.', pt: 'O gerente destinou tarefas a cada membro.' },
      { en: 'Allocate enough time for testing.', pt: 'Destine tempo suficiente para os testes.' },
      { en: 'They allocated funds for the new office.', pt: 'Eles alocaram fundos para o novo escritório.' },
    ],
  },
  {
    verb: 'to leverage',
    translation: 'aproveitar / alavancar',
    sentences: [
      { en: 'We leverage data to make better decisions.', pt: 'Aproveitamos os dados para tomar melhores decisões.' },
      { en: 'Leverage your network to find opportunities.', pt: 'Aproveite sua rede de contatos para achar oportunidades.' },
      { en: 'They leveraged AI to cut costs.', pt: 'Eles alavancaram a IA para cortar custos.' },
      { en: 'We can leverage our brand to enter new markets.', pt: 'Podemos alavancar nossa marca para entrar em novos mercados.' },
      { en: 'How can we leverage this partnership?', pt: 'Como podemos aproveitar esta parceria?' },
    ],
  },
  {
    verb: 'to scale',
    translation: 'escalar / expandir',
    sentences: [
      { en: 'Our goal is to scale the business globally.', pt: 'Nosso objetivo é escalar o negócio globalmente.' },
      { en: 'This model is hard to scale.', pt: 'Este modelo é difícil de escalar.' },
      { en: 'We scaled operations to three countries.', pt: 'Expandimos as operações para três países.' },
      { en: 'Automation lets us scale faster.', pt: 'A automação nos permite escalar mais rápido.' },
      { en: 'How do we scale without losing quality?', pt: 'Como escalamos sem perder qualidade?' },
    ],
  },
]

/** Verbo do dia — determinístico pela data (YYYYMMDD). */
export function verbOfTheDay(dayKey: string): BusinessVerb {
  const n = Number(dayKey.replaceAll('-', '')) || 0
  return BUSINESS_VERBS[n % BUSINESS_VERBS.length]
}
