/**
 * Planner Anual — 52 Semanas (Cronograma dos Fluentes / CDF).
 * Extraído do PDF do curso comprado pela Ana. 360 dias (semana 52 tem 3 dias).
 * Cada dia: assistir a aula N, fazer o quiz N, e uma atividade extra.
 */

export interface PlannerDay {
  /** dia global no cronograma (1..360) */
  day: number
  /** número da aula a assistir (= dia) */
  lesson: number
  /** número do quiz a fazer (= dia) */
  quiz: number
  /** atividade extra do dia */
  activity: string
}

export interface PlannerWeek {
  week: number
  days: PlannerDay[]
}

export const PLANNER: PlannerWeek[] = [
  {
    "week": 1,
    "days": [
      {
        "day": 1,
        "lesson": 1,
        "quiz": 1,
        "activity": "Escreva um breve texto se apresentando, revelando seu nome, sua origem e o que você faz. Use os conhecimentos adquiridos em aula. Use o aplicativo Speak Aloud para treinar sua pronúncia. Insira cada frase do seu texto, ouça atentamente e repita em voz alta. Depois, aguarde seu feedback. Repita o treino quantas vezes for necessário, até se sentir confiante."
      },
      {
        "day": 2,
        "lesson": 2,
        "quiz": 2,
        "activity": "Escreva entre 3 a 5 frases sobre o seu dia. Use o Reverso Contexto ou Collins se precisar. Use o aplicativo Speak Aloud para treinar sua pronúncia. Insira cada frase do seu texto, ouça atentamente e repita em voz alta. Depois, aguarde seu feedback. Mude seus dispositivos e mídias sociais para o inglês. Use seu dispositivo por alguns minutos, anote e pesquise todas as palavras novas para você. Logo, você vai se acostumar."
      },
      {
        "day": 3,
        "lesson": 3,
        "quiz": 3,
        "activity": "Acompanhe um canal gringo no YouTube. Use a nossa lista de canais do YouTube, acessando o módulo de introdução e explore seus interesses. Assista ao vídeo que foi escolhido e tente identificar sobre o que o vídeo fala ou até mesmo palavras e expressões. Assista uma vez sem legendas e mais uma vez com. Mas calma, não foque em entender o vídeo todo. Agora é hora apenas de tentar reconhecer algumas palavras e prestar a atenção no ritmo da fala e algumas pronúncias."
      },
      {
        "day": 4,
        "lesson": 4,
        "quiz": 4,
        "activity": "Aprenda com uma música usando o Lyricstraining. Procure por sua música favorita na barra de pesquisa, selecione seu nível, e clique em “choice mode” no canto direito da tela. Sugerimos começar pelo nível “Beginner”. Anote algumas palavras da música e busque pelo seu significado. Faça frases de exemplo."
      },
      {
        "day": 5,
        "lesson": 5,
        "quiz": 5,
        "activity": "Procure por vocabulários de objetos de um cômodo específico da sua casa usando o dicionário Collins. Cole notas adesivas com os nomes de cada um dos objetos em seus respectivos lugares. Faça frases com algumas das palavras que buscou. Se precisar de ajuda, use o dicionário."
      },
      {
        "day": 6,
        "lesson": 6,
        "quiz": 6,
        "activity": "Use este prompt para ter uma conversa com o Fluêncio, nosso chatbot: \"Hi! I'm [your name]. I am learning English. Let's talk! You can ask me simple questions.\" Você encontra o Fluêncio, na nossa plataforma, no módulo “comece por aqui”. Você também pode pedir para o Fluêncio corrigir suas frases e dar o significado de palavras que você não entendeu."
      },
      {
        "day": 7,
        "lesson": 7,
        "quiz": 7,
        "activity": "Escreva um breve resumo sobre a sua semana em inglês. Se precisar de ajuda, use um dicionário. Você também pode pedir ao Fluêncio que corrija suas frases. Assista a um filme ou série em inglês, com legendas. Foque na pronúncia e de vez em quando pause a cena e imite o que está sendo falado. Lembre-se de sempre falar em voz alta."
      }
    ]
  },
  {
    "week": 2,
    "days": [
      {
        "day": 8,
        "lesson": 8,
        "quiz": 8,
        "activity": "Escolha uma receita, leia seus ingredientes e método de preparo usado o site Tasty. Procure pelo significado das palavras que não conhece. Use o aplicativo Speak Aloud para treinar sua pronúncia. Insira as palavras, ouça atentamente e repita em voz alta. Depois, aguarde seu feedback. Assista ao vídeo da receita e pratique sua pronúncia, pausando e repetindo as frases em voz alta."
      },
      {
        "day": 9,
        "lesson": 9,
        "quiz": 9,
        "activity": "Escreva sua receita favorita em inglês, descrevendo seus ingredientes e métodos de preparo. Use o Reverso Contexto ou Collins. Escreva de forma simplificada, usando tópicos. Você também pode pedir ao Fluêncio que corrija suas frases. Realize uma atividade para expandir seeu vocabulário no site ESL Games. Escolha a velocidade (Fast/ Slow), o tema “Food” e clique nas palavras que correspondem ao áudio e texto. Se você errar, ou não souber, poderá continuar clicando, até acertar. Repita quantas vezes quiser. Anote a pratique as palavras novas."
      },
      {
        "day": 10,
        "lesson": 10,
        "quiz": 10,
        "activity": "Escute a notícia People throw away food. Selecione o nível 1, no canto direito da notícia. Esse é um nível mais fácil se você está começando agora. Leia a notícia, busque pelas palavras que não conhece e responda à pergunta “What do you think about the news” nos comentários da página."
      },
      {
        "day": 11,
        "lesson": 11,
        "quiz": 11,
        "activity": "Assista a um tutorial de culinária em inglês no YouTube. Pause o vídeo e repita em voz alta. Escolha qualquer vídeo do canal para fazer essa atividade. Anote todos os ingredientes usados na receita e se você manda bem na cozinha, reproduza o prato, descrevendo a receita e seus ingredientes em inglês."
      },
      {
        "day": 12,
        "lesson": 12,
        "quiz": 12,
        "activity": "Use este prompt para ter uma conversa com o Fluêncio, nosso chatbot: \"Hi! What is your favorite food? I like [name of food]. Do you like it too?\" Você também pode pedir para o Fluêncio corrigir suas frases e dar o significado de palavras que você não entendeu. Use o aplicativo Speak Aloud para treinar sua pronúncia. Insira algumas palavras que você estudou nos dias anteriores, ouça atentamente e repita em voz alta. Depois, aguarde seu feedback."
      },
      {
        "day": 13,
        "lesson": 13,
        "quiz": 13,
        "activity": "Escute o Podcast “The smell of coffee”. Leia o vocabulário e a transcrição do áudio. Escreva se você gosta ou não dessa bebida e com que frequência você toma."
      },
      {
        "day": 14,
        "lesson": 14,
        "quiz": 14,
        "activity": "Assista a um programa de TV sobre culinária, no YouTube ou em seu streaming favorito. Se você fosse o apresentador, qual receita você gostaria de ensinar? Grave ou escreva um mini- roteiro com os ingredientes desta receita. Não se preocupe com perfeição, mas sim em aprender vocabulários novos e criar frases curtas. Use um dicionário se precisar - Collins. Você também pode pedir ao Fluêncio que corrija suas frases."
      }
    ]
  },
  {
    "week": 3,
    "days": [
      {
        "day": 15,
        "lesson": 15,
        "quiz": 15,
        "activity": "Crie uma lista de compras. Aproveite para pesquisar o vocabulário de itens do seu dia-a-dia. Use um dicionário se precisar - Collins. Crie cartões físicos, em papel mesmo, com essas palavras da sua lista, e inclua outras que você estudou recentemente e sorteie-as, desafiando-se a usá-las em frases ou conversas diferentes. Se puder, escreva essas frases para memorizar e praticar depois."
      },
      {
        "day": 16,
        "lesson": 16,
        "quiz": 16,
        "activity": "Explore o site ESL Lab para ouvir áudios em inglês sobre diferentes tópicos e praticar a compreensão auditiva. Escolha seu nível de acordo e pesquise por áudios que contenham situações de compras - supermercados, lojas em geral, etc. Pesquise por “store”, “supermarket” e derivados. Use itens da lista que você fez no dia anterior também. Agora imagine que está em um supermercado. Leve sua lista de compras e peça ajuda a um atendente para localizar os itens. Tente visualizar essa conversa e escreva- a em forma de diálogo."
      },
      {
        "day": 17,
        "lesson": 17,
        "quiz": 17,
        "activity": "Assista a um vídeo tutorial em inglês no YouTube sobre projetos DIY (Faça você mesmo) simples e siga as instruções apenas pelo áudio. Pesquise por “easy DIY” ou “simple DIY projects”. Faça anotações sobre o que entendeu. Depois, reveja o vídeo e compare com estas notas. Escreva sua rotina em inglês, falando sobre atividades matinais, trabalho, estudos e lazer. Mantenha-se no simples e não se preocupe com vocabulários complicados. Você também pode pedir ao Fluêncio que corrija suas frases."
      },
      {
        "day": 18,
        "lesson": 18,
        "quiz": 18,
        "activity": "Faça a palavra cruzada do dia no site USA Today. Peça ajuda ao Fluêncio, se precisar, digitando a dica e quantas letras a palavra possui. . Pesquise por um restaurante famoso em algum país de língua inglesa. Você pode usar termos como “famous restaurantes in The USA”, ou “top 10 restaurants in Australia”, por exemplo. Escolha pelo menos 2 deles e entre em seus sites oficiais. Leia em voz alta o menu, a história (se houver), pesquise vocabulários específicos e leia resenhas de frequentadores."
      },
      {
        "day": 19,
        "lesson": 19,
        "quiz": 19,
        "activity": "Leia as embalagens dos produtos em inglês enquanto faz compras em um supermercado. Se puder, tire fotos e pesquise as palavras depois. Use o aplicativo Speak Aloud para treinar sua pronúncia. Insira as palavras, ouça atentamente e repita em voz alta. Depois, aguarde seu feedback. Escreva uma carta simples ou um e- mail para um amigo, ou familiar, em inglês, para praticar vocabulário relacionado a esse relacionamento. Se precisar peça ao Fluêncio para corrigir."
      },
      {
        "day": 20,
        "lesson": 20,
        "quiz": 20,
        "activity": "Use o e-mail ou carta feitos no dia anterior e leia em voz alta. Se conseguir ler para a pessoa específica para quem escreveu, melhor ainda. Navegue pela seção \"Listen & Watch\" do BBC Learning English e escolha um dos áudios para ouvir. Responda as 3 perguntas propostas para um melhor aproveitamento. Se precisar de ajuda para elaborar suas respostas ou compreender alguma palavra, peça ajuda ao fluêncio. Sugestão: lição sobre Food. Atenção: Os áudios estão disponíveis na parte de baixo da página, clique em “Download this programme (mp3)"
      },
      {
        "day": 21,
        "lesson": 21,
        "quiz": 21,
        "activity": "Use este prompt para ter uma conversa com o Fluêncio, nosso chatbot: “Hi! Let's talk about routine. Ask me some questions”. Você também pode pedir para o Fluêncio corrigir suas frases e dar o significado de palavras que você não entendeu. Explore comics e graphic novels em inglês, que são visualmente estimulantes e linguisticamente variados. Use sites como Project Gutenberg, Webtoon, Tapas e Comic Fury."
      }
    ]
  },
  {
    "week": 4,
    "days": [
      {
        "day": 22,
        "lesson": 22,
        "quiz": 22,
        "activity": "Leia posts das redes sociais dos seus artistas favoritos em suas redes sociais - pelo menos 5 deles, se forem curtinhos. Descubra o artista no Instagram, no Facebook e/ou no X. Assista 15 segundos de uma série ou filme, sem legendas, e anote o que entendeu. Assista ao trecho novamente, agora com legendas em inglês e confira seus erros e acertos. Assista mais uma vez, e repita em voz alta o que foi dito. Use o aplicativo Speak Aloud para treinar sua pronúncia. Insira as palavras ou frases, ouça atentamente e repita em voz alta. Depois, aguarde seu feedback."
      },
      {
        "day": 23,
        "lesson": 23,
        "quiz": 23,
        "activity": "Leia uma biografia curta de um dos artistas que você pesquisou no dia anterior. Anote ou destaque palavras que você ainda não conhece, mas não se preocupe caso não entenda 100% do conteúdo. Use a Wikipedia ou o site oficial do artista. Use o site Lyrics Training, escolha um artista ou uma música específica e estude com ela. Se puder, também anote as palavras que soarem mais diferentes para você. Guarde-as para estudo futuro, não se preocupe em entendê-las de primeira. Procure por sua música favorita na barra de pesquisa, selecione o nível “Beginner”, e clique em “choice mode” no canto direito da tela."
      },
      {
        "day": 24,
        "lesson": 24,
        "quiz": 24,
        "activity": "Leia uma notícia sobre seu artista favorito em sites como People ou E! News. Basta pesquisar o nome do artista na barra de pesquisas nos sites indicados. Tente imitar esse artista! Se for um um ator/atriz específico que você goste, procure por uma cena que você conheça, use as mesmas entonações e trejeitos. Se for um músico, tente aproximar sua pronúncia da dele enquanto ouve suas músicas."
      },
      {
        "day": 25,
        "lesson": 25,
        "quiz": 25,
        "activity": "Leia em voz alta um trecho de uma notícia ou mesmo os posts das redes sociais do artista que você selecionou anteriormente. Tente se ater à pronúncia e entonação. Caso tenha dúvidas, use o Use o aplicativo Speak Aloud para treinar sua pronúncia. Insira as palavras ou frases, ouça atentamente e repita em voz alta. Depois, aguarde seu feedback. Procure vocabulários de objetos de um cômodo específico da sua casa, o quarto, por exemplo. Se puder, escreva- os em notas adesivas e cole nesses objetos para ir memorizando ao longo do tempo."
      },
      {
        "day": 26,
        "lesson": 26,
        "quiz": 26,
        "activity": "Escreva 3 frases sobre o seu dia. Se precisar use um dicionário. Faça frases curtas. Você também pode pedir ao Fluêncio que corrija suas frases. Ouça diálogos simples no site Elllo, selecione seu nível como iniciante aqui. Foque em repetir em voz alta para praticar sua pronúncia e entonação."
      },
      {
        "day": 27,
        "lesson": 27,
        "quiz": 27,
        "activity": "Faça um quiz divertido no site ESL Games. Use este prompt para ter uma conversa com o Fluêncio, nosso chatbot: “Hello, Let's chat about [nome do artista] . Ask me questions about him/ her.” Você também pode pedir para o Fluêncio corrigir suas frases e dar o significado de palavras que você não entendeu."
      },
      {
        "day": 28,
        "lesson": 28,
        "quiz": 28,
        "activity": "Utilize as palavras que anotou nos dias anteriores - da biografia ou das letras das músicas que praticou - e tente criar pelo menos 5 frases com elas. Você também pode pedir ao Fluêncio que corrija suas frases. Escute uma entrevista em um podcast, se for de um de seus artistas favoritos, melhor ainda. Aqui estão algumas sugestões: The Armchair Expert e YouTube Lembre-se, ainda não precisamos focar em compreender tudo o que é falado, mas tente perceber algumas palavras e alguma questão tratada durante a entrevista."
      }
    ]
  },
  {
    "week": 5,
    "days": [
      {
        "day": 29,
        "lesson": 29,
        "quiz": 29,
        "activity": "Ouça o trecho ou capitulo de audiobook grátis do dia do site/app Blinkist. Durante esta semana, mantenha um diário, escrevendo as coisas que fez no dia."
      },
      {
        "day": 30,
        "lesson": 30,
        "quiz": 30,
        "activity": "Visite sites de notícias como BBC News ou CNN e leia artigos sobre tópicos de seu interesse. Sugestões: tecnologia, meio ambiente, lazer. Anote palavras desconhecidas. Não se preocupe em entender a notícia por completo, mas sim sobre o que trata. Procure por antônimos e sinônimos dentro dessas palavras anotadas da notícia. Pratique a identificação de antônimos e sinônimos em inglês, expandindo seu repertório de palavras relacionadas. Use um dicionário, como o de Thesaurus, caso seja necessário. FIM DO STAGE ONE Congratulations!"
      },
      {
        "day": 31,
        "lesson": 31,
        "quiz": 31,
        "activity": "Leia um poema em voz alta, tente dramatizá-lo. Procure poemas em sites como o Project Gutenberg. Use o aplicativo Speak Aloud para treinar sua pronúncia. Insira as palavras ou frases, ouça atentamente e repita em voz alta. Depois, aguarde seu feedback. Jogue uma partida de Letter Box. Anote todas as palavras que forem novas para você e pesquise seus significados."
      },
      {
        "day": 32,
        "lesson": 32,
        "quiz": 32,
        "activity": "Assista 15 segundos de uma série ou vídeo, ou filme, sem legendas, e anote o que entendeu. Assista ao trecho novamente, com legendas em inglês e faça a correção. Assista novamente, repita em voz alta e pratique a pronúncia. Explore jogos no site ESL Games. Fique vontade para escolher o jogo e o tema."
      },
      {
        "day": 33,
        "lesson": 33,
        "quiz": 33,
        "activity": "Pratique conversas telefônicas simuladas com o Fluêncio, alternando os papéis de quem liga e quem atende. Use este prompt: “Hello! This is [seu nome]. Can I speak to [nome do seu amigo]? I need to talk about [topico]. Let's role play”. Você também pode pedir para o Fluêncio corrigir suas frases e dar o significado de palavras que você não entendeu. Assista a um vídeo no Youtube, de um dos canais na nossa lista de sugestões. Assista uma vez sem legendas, tente entender o tópico principal dele. Também anote algumas palavras que entendeu. Se for preciso, assista mais vezes."
      },
      {
        "day": 34,
        "lesson": 34,
        "quiz": 34,
        "activity": "Fale um trava- línguas. Você pode encontrar alguns exemplos para iniciar aqui, no site do British Council. Escreva uma resenha em inglês de algum local público que você conheça Use o próprio Google para encontrar o endereço e avaliar por lá. Use um dicionário se for preciso ou o Fluêncio se precisar de ajuda."
      },
      {
        "day": 35,
        "lesson": 35,
        "quiz": 35,
        "activity": "Leia seu diário semanal, de preferência em voz alta. Anote possíveis dúvidas ou correções que você já consegue fazer. Use o aplicativo Speak Aloud para treinar sua pronúncia. Insira as palavras ou frases, ouça atentamente e repita em voz alta. Depois, aguarde seu feedback. Escreva um breve resumo, em inglês, sobre o audiobook do dia 29. Você também pode pedir ao Fluêncio que corrija suas frases."
      }
    ]
  },
  {
    "week": 6,
    "days": [
      {
        "day": 36,
        "lesson": 36,
        "quiz": 36,
        "activity": "Assista a um TedTalks. Selecione o tema que mais se interessar e precisar, ative as legendas do vídeo. Assista o vídeo ao vídeo pelo menos duas vezes. Escreva um breve resumo do que aprendeu e se precisar, use um dicionário. Você também pode pedir ao Fluêncio que corrija suas frases."
      },
      {
        "day": 37,
        "lesson": 37,
        "quiz": 37,
        "activity": "Escreva três frases sobre o seu dia. Se precisar, use o se Reverso Contexto. Você também pode pedir ao Fluêncio que corrija suas frases. Jogue uma partida de caça palavras no site ESL Games sobre o tema que preferir."
      },
      {
        "day": 38,
        "lesson": 38,
        "quiz": 38,
        "activity": "Pratique uma conversa com o Fluêncio. Use este prompt “Hello! My name is [seu some].\" I'm learning English and I'd like talk to you about [assunto que deseja conversar]. Escolha temos como “work”, “my house” ou “family”, por exemplo. Peça para o Fluêncio corrigir a sua conversa. Analise seus erros, anote palavras novas ou continue conversando."
      },
      {
        "day": 39,
        "lesson": 39,
        "quiz": 39,
        "activity": "Assista a um vídeo em inglês no YouTube e pratique sua compreensão auditiva: assista 15 segundos do vídeo, sem legendas e anote o que entendeu. Assista ao mesmo trecho e corrija o que for preciso. Repita esse processo algumas vezes, assistindo mais alguns trechos do vídeo. Assista ao vídeo novamente a agora pratique sua pronúncia. Repita em voz alta o que é dito, tentando imitar quem está falando. Use o Speak Aloud para essa prática"
      },
      {
        "day": 40,
        "lesson": 40,
        "quiz": 40,
        "activity": "Escreva sobre sua família! Apresente-a, descrevendo membros, suas idades e interesses. Confira seu texto usando o Fluêncio. Pratique seu vocabulário com um jogo sobre “family members” no site ESL Games. Selecione o membro da família conforme a pergunta. Se quiser, antes do jogo, clique em review para reforçar o conteúdo."
      },
      {
        "day": 41,
        "lesson": 41,
        "quiz": 41,
        "activity": "Selecione e escute rádios de qualquer lugar do mundo através do Radio Garden. Tente interpretar notícias ou propagandas que escuta. Não se preocupe em compreender tudo que é falado. Pratique com trava- língua. Escolha um Tongue Twister, escute o áudio e repita em voz alta. Repita várias vezes, até que se sinta confortável com a pronúncia. Divirta-se."
      },
      {
        "day": 42,
        "lesson": 42,
        "quiz": 42,
        "activity": "É hora de praticar a leitura e conhecer melhor alguma personalidade. Selecione uma biografia e leia atentamente. Use a Wikipedia ou o site oficial do artista. Imagine que você é um jornalista e pode entrevistar a personalidade escolhida. Escreva 5 perguntas que você faria a essa pessoa, baseadas na biografia que você leu. Use um dicionário de for preciso."
      }
    ]
  },
  {
    "week": 7,
    "days": [
      {
        "day": 43,
        "lesson": 43,
        "quiz": 43,
        "activity": "Divirta-se e jogue o Baba Dum em inglês. Associe imagens as palavras e pratique seu vocabulário e raciocínio rápido. Faça uma oração em inglês. Procure por traduções de orações que você costuma fazer. Você pode usar sites como The Prayer Wall ou Click to Pray."
      },
      {
        "day": 44,
        "lesson": 44,
        "quiz": 44,
        "activity": "Selecione scripts de filmes em inglês e acompanhe enquanto assiste ao filme. Você pode encontrar vários deles no site Simply Scripts. Sintonize estações de rádio em inglês e ouça os anúncios comerciais para praticar a compreensão auditiva. Você pode encontrar estações de rádio online no site Radio Garden, por exemplo."
      },
      {
        "day": 45,
        "lesson": 45,
        "quiz": 45,
        "activity": "Ouça e assista à leitura de histórias no site Storyline. Procure por temas que te agradem. Não se preocupe em entender tudo o que é falado, mas sim em compreender o contexto. Imagine que precisa comprar um ingresso para um evento - um concerto, jogo ou exposição. Tente visualizar a conversa que teria com o atendente e escreva-a em forma de diálogo. Use o Fluêncio para corrigir seu diálogo e o Speak Aloud para praticar a pronúncia. Chame alguém para praticar com você."
      },
      {
        "day": 46,
        "lesson": 46,
        "quiz": 46,
        "activity": "Escolha um jogo no site TinyTap e jogue! Prefira jogos com frases completas e não somente vocabulário. Escreva sobre uma viagem, férias ou local de lazer que você tenha visitado recentemente, dando sua opinião sobre ele. Peça ajuda ao Fluêncio para corrigir a sua produção."
      },
      {
        "day": 47,
        "lesson": 47,
        "quiz": 47,
        "activity": "Encontre e leia histórias curtas em sites como Project Gutenberg ou Wattpad. Use o site Vocabulary.com e clique em “Random Word” abaixo da barra de pesquisa. Estude a palavra gerada, faça quizzes para expandir e praticar vocabulário em inglês."
      },
      {
        "day": 48,
        "lesson": 48,
        "quiz": 48,
        "activity": "Faça pequenas encenações de situações cotidianas para praticar diálogos e expressões faciais. Chame alguém para praticar com você ou use Fluêncio. Use este prompt. “Iʼm at a [bakery, restaurant, cinema, etc - substitua pelo lugar que achar mais interessante], you are the attendant. Talk to me, ask me questions related to the situation and correct my mistakes”. Leia e interaja em posts de seus artistas favoritos nas redes sociais."
      },
      {
        "day": 49,
        "lesson": 49,
        "quiz": 49,
        "activity": "Experimente escrever poemas ou letras de músicas em inglês. Use o Fluêncio se precisar de ajuda. Jogue Gartic - com amigos, conhecidos ou online, em salas já criadas com temas que te agradem. Convide alguém para jogar com você."
      }
    ]
  },
  {
    "week": 8,
    "days": [
      {
        "day": 50,
        "lesson": 50,
        "quiz": 50,
        "activity": "É hora de trabalhar na sua confiança. Acesse Best of Affirmations. Clique em “affirm” e leia a afirmação em voz alta. Tente ler uma afirmação por dia e se necessário procure pelo significado da frase. Escolha um vídeo da nossa lista de canais do YouTube, acessando o módulo de Introdução e explore seus interesses. Assista ao vídeo e tente identificar sobre o que o vídeo fala ou até mesmo palavras e expressões, mas calma! Não foque em entender o vídeo todo, mas sim o contexto. Assista ao vídeo mais de uma vez."
      },
      {
        "day": 51,
        "lesson": 51,
        "quiz": 51,
        "activity": "Explore o site English Vocabulary Exercises para uma variedade de atividades de vocabulário, incluindo quizzes e jogos. Escute e acompanhe através da leitura alguns trechos de “The little prince”. Selecione o nível 1. Repita em voz alta e procure por palavras novas para você. Não se preocupe em compreender tudo, mas sim a ideia principal."
      },
      {
        "day": 52,
        "lesson": 52,
        "quiz": 52,
        "activity": "Escreva sobre uma pessoa que você admira: descreva essa pessoa e explique por que ela é importante para você. Assista a desenhos animados ou programas infantis em inglês para se acostumar com o ritmo e entonação da língua. Sugestões de canais de desenhos: Peekaboo Kidz, The Kiboomers, Cocomelon."
      },
      {
        "day": 53,
        "lesson": 53,
        "quiz": 53,
        "activity": "Assista a um TedTalks. Selecione o tema que mais se interessar e, se precisar, ative as legendas do vídeo. Escreva um breve resumo do que aprendeu. Se precisar, use o Reverso Contexto. Corrija as frases usando o Fluêncio."
      },
      {
        "day": 54,
        "lesson": 54,
        "quiz": 54,
        "activity": "Leia uma pequena biografia de alguns personagens históricos no site The Famous People. Tente narrar os feitos deste personagem histórico com suas palavras. Se for preciso, escreva, mas tente falar naturalmente sem o auxílio do texto, e se grave fazendo isso para checar sua evolução depois."
      },
      {
        "day": 55,
        "lesson": 55,
        "quiz": 55,
        "activity": "Se divirta jogando forca no site ESL Games. Escolha seu tema de preferência. Explore o site ESL Lab para ouvir áudios em inglês sobre diferentes tópicos e praticar a compreensão auditiva."
      },
      {
        "day": 56,
        "lesson": 56,
        "quiz": 56,
        "activity": "Narre uma história ou fofoca em inglês, anote vocabulários que você tenha dificuldade no meio do caminho para pesquisar depois. Use o gravador de voz para gravar e checar depois, ou conte para um amigo ou companheiro de estudo. Escreva sobre seu hobby favorito! Explique qual é e por que você gosta dele."
      }
    ]
  },
  {
    "week": 9,
    "days": [
      {
        "day": 57,
        "lesson": 57,
        "quiz": 57,
        "activity": "Assista a um vídeo tutorial em inglês no YouTube sobre projetos DIY simples e siga as instruções apenas pelo áudio. Pesquise por “easy DIY” ou “simple DIY projects”. Faça anotações sobre o que entendeu. Depois, reveja o vídeo e compare com estas notas. Jogue algumas partidas de Letter Box."
      },
      {
        "day": 58,
        "lesson": 58,
        "quiz": 58,
        "activity": "Escreva uma carta simples ou um e- mail para um amigo, ou familiar, em inglês, contando sobre alguma novidade em sua vida. Procure vocabulários de objetos de um cômodo específico da sua casa, a cozinha, por exemplo. Se puder, escreva-os em notas adesivas e cole nesses objetos para ir memorizando ao longo do tempo."
      },
      {
        "day": 59,
        "lesson": 59,
        "quiz": 59,
        "activity": "Leia posts das redes sociais dos seus artistas favoritos em suas redes sociais - pelo menos 5 deles, se forem curtinhos. Descubra o artista no Instagram, no Facebook e/ou no X. Navegue pela seção \"Listen & Watch\" do BBC Learning English e escolha um dos áudios para ouvir. Faça também o quiz de compeensão para um melhor aproveitamento."
      },
      {
        "day": 60,
        "lesson": 60,
        "quiz": 60,
        "activity": "Faça um quiz divertido no site Merriam Webster. Selecione e escute rádios de qualquer lugar do mundo através do Radio Garden. Tente interpretar notícias ou propagandas que escuta. Não se preocupe em compreender tudo que é falado. FIM DO STAGE TWO Congratulations!"
      },
      {
        "day": 61,
        "lesson": 61,
        "quiz": 61,
        "activity": "Use o site Vocabulary.com e clique em “Random Word” abaixo da barra de pesquisa. Estude a palavra gerada, faça quizzes para expandir e praticar vocabulário em inglês. Leia e escute mais alguns trechos de “The little prince”. Tente compreender a história e busque apenas por vocabulários que não conseguiu compreender, nem pelo contexto da frase."
      },
      {
        "day": 62,
        "lesson": 62,
        "quiz": 62,
        "activity": "É hora de trabalhar na sua confiança. Acesse Best of Affirmations. Clique em “affirm” e leia a afirmação em voz alta. Tente ler uma afirmação por dia essa semana e se necessário procure pelo significado da frase. Pratique com trava- língua. Escolha um Tongue Twister, escute o áudio e repita em voz alta. Repita várias vezes, até que se sinta confortável com a pronúncia. Divirta-se."
      },
      {
        "day": 63,
        "lesson": 63,
        "quiz": 63,
        "activity": "Escreva um comentário em inglês em um post de um artista que você gosta. Pratique uma conversa com o Fluêncio, imagine que você está conhecendo um novo amigo. Use este prompt \"Hello! Where are you from? Do you like living there? What is your favorite thing about your city?Let's role play”. Você pode pedir para que ele corrija seus erros ou explique palavras que você não conhece."
      }
    ]
  },
  {
    "week": 10,
    "days": [
      {
        "day": 64,
        "lesson": 64,
        "quiz": 64,
        "activity": "Leia as embalagens dos produtos em inglês enquanto faz compras em um supermercado. Se puder, tire fotos e pesquise as palavras depois. Use o aplicativo Speak Aloud para treinar sua pronúncia. Insira as palavras ou frases, ouça atentamente e repita em voz alta. Depois, aguarde seu feedback. Ouça sobre Oily Fish. E responda a pergunta: How often do you eat fish such as salmon or mackerel?"
      },
      {
        "day": 65,
        "lesson": 65,
        "quiz": 65,
        "activity": "Ouça e assista à leitura de histórias no site Storyline. Procure por temas que te agradem. Não se preocupe em entender tudo o que é falado, mas sim em compreender o contexto. Leia um poema em voz alta, tente dramatizá-lo. Procure poemas em sites como o Project Gutenberg. Use o aplicativo Speak Aloud para treinar sua pronúncia. Insira as palavras ou frases, ouça atentamente e repita em voz alta. Depois, aguarde seu feedback."
      },
      {
        "day": 66,
        "lesson": 66,
        "quiz": 66,
        "activity": "Escolha uma receita, leia seus ingredientes e método de preparo usado o site Tasty. Procure pelo significado das palavras que não conhece. Assista ao vídeo da receita e pratique sua pronúncia. Se você mandar bem na cozinha, reproduza a receita e faça um vídeo sobre ela."
      },
      {
        "day": 67,
        "lesson": 67,
        "quiz": 67,
        "activity": "Aprenda com sua música favorita usando o Lyricstraining. Jogue duas rodadas com a mesma música, uma vez no nível beginner e outra no intermediate. Anote algumas palavras da música e busque pelo seu significado. Se possível, escreva algumas frases com elas."
      },
      {
        "day": 68,
        "lesson": 68,
        "quiz": 68,
        "activity": "Fale um trava-língua. Você pode encontrar alguns exemplos para iniciar aqui, no site do British Council, e também pesquisar em artigos, como este. Escreva uma resenha em inglês de algum local público que você conheça Use o próprio Google para encontrar o endereço e avaliar por lá. Use o Fluêncio para corrigir seu texto."
      },
      {
        "day": 69,
        "lesson": 69,
        "quiz": 69,
        "activity": "Jogue uma partida de Connections e divirta-se. Você deverá encontrar 4 palavras que pertencem ao mesmo grupo. Leia e interaja em posts de fóruns ou grupos de discussão online em inglês. Use fóruns ou grupos como o Reddit."
      },
      {
        "day": 70,
        "lesson": 70,
        "quiz": 70,
        "activity": "Jogue o Baba Dum em inglês e divirta- se associando palavras a imagens. Escreva sua rotina diária em inglês, falando sobre atividades matinais, trabalho, estudos e lazer. Mantenha-se no simples e não se preocupe com vocabulários complicados. Use o Fluêncio para correção."
      }
    ]
  },
  {
    "week": 11,
    "days": [
      {
        "day": 71,
        "lesson": 71,
        "quiz": 71,
        "activity": "Ouça o audiobook grátis do dia do site/app Blinkist. Durante esta semana, mantenha um diário, escrevendo as coisas que fez no dia."
      },
      {
        "day": 72,
        "lesson": 72,
        "quiz": 72,
        "activity": "Explore o site ESL Lab e ouça áudios em inglês sobre diferentes tópicos e pratique a compreensão auditiva. Escolha seu nível de acordo e pesquise por áudios que contenham situações de compras, visitas, shopping ou lojas. Agora imagine que está em um shopping. Leve sua lista de afazeres e peça ajuda a um guarda para encontrar alguma loja específica. Tente visualizar essa conversa, grave-a ou escreva-a em forma de diálogo."
      },
      {
        "day": 73,
        "lesson": 73,
        "quiz": 73,
        "activity": "Escolha um jogo no site TinyTap e jogue! Prefira jogos com frases completas e não somente vocabulário. Escreva uma resenha simples de um filme ou série que assistiu recentemente. Use o Fluêncio para te ajudar."
      },
      {
        "day": 74,
        "lesson": 74,
        "quiz": 74,
        "activity": "Escreva sobre seus parentes mais distantes: apresente-os, descrevendo membros da família, suas idades e interesses. Confira seu texto usando Fluêncio. Pratique os números no site ESL Games. Escute o áudio e associe o número. Você pode tentar quantas vezes quiser."
      },
      {
        "day": 75,
        "lesson": 75,
        "quiz": 75,
        "activity": "Explore o site English Vocabulary Exercises para uma variedade de atividades de vocabulário, incluindo quizzes e jogos. Pegue scripts de filmes em inglês e acompanhe enquanto assiste ao filme. Você pode encontrar vários deles no site Simply Scripts. Use o aplicativo Speak Aloud para treinar sua pronúncia. Insira as palavras ou frases, ouça atentamente e repita em voz alta. Depois, aguarde seu feedback."
      },
      {
        "day": 76,
        "lesson": 76,
        "quiz": 76,
        "activity": "O site de Rick Steves oferece guias turísticos em áudio gratuitos para várias cidades e regiões da Europa. Eles cobrem pontos turísticos populares, história local e dicas de viagem. Escolha um lugar e ouça sobre ele. Crie cartões físicos, em papel mesmo, com palavras diferentes que encontrou ao escutar esse guia turístico, e inclua outras que você estudou recentemente e sorteie-as, desafiando-se a usá-las em frases ou conversas diferentes. Se puder, escreva essas frases para memorizar e praticar depois."
      },
      {
        "day": 77,
        "lesson": 77,
        "quiz": 77,
        "activity": "Leia seu diário semanal, de preferência em voz alta. Anote possíveis dúvidas ou correções que você já consegue fazer. Escreva um breve resumo, em inglês, sobre o audiobook que ouviu no dia 71 e avalie seu desempenho. Use o Fluêncio para a correção."
      }
    ]
  },
  {
    "week": 12,
    "days": [
      {
        "day": 78,
        "lesson": 78,
        "quiz": 78,
        "activity": "Leia uma notícia sobre algum artista que você goste em sites como TMZ ou Daily Mail. Tente imitar esse artista! Se for um um ator/atriz específico que você goste, procure por uma cena que você conheça, use as mesmas entonações e trejeitos. Se for um músico, tente aproximar sua pronúncia da dele enquanto ouve suas músicas. Se possível, se grave fazendo isso para checar seu progresso."
      },
      {
        "day": 79,
        "lesson": 79,
        "quiz": 79,
        "activity": "Assista a um TedTalks. Selecione o tema que mais se interessar e se precisar, ative as legendas do vídeo. Escreva um breve resumo do que aprendeu e se precisar, use o Use o Reverso Contexto Collins, ou o Fluêncio."
      },
      {
        "day": 80,
        "lesson": 80,
        "quiz": 80,
        "activity": "É hora de praticar e leitura! Leia uma pequena biografia de alguns personagens históricos no site Famous people Imagine que você é um jornalista e pode entrevistar essa personalidade escolhida. Escreva 5 perguntas que você faria a essa pessoa, baseadas na biografia que você leu. Use o Fluêncio para a correção."
      },
      {
        "day": 81,
        "lesson": 81,
        "quiz": 81,
        "activity": "Leia em voz alta um trecho de uma biografia que você selecionou anteriormente. Tente se ater à pronúncia e entonação. Caso tenha dúvidas, Use o aplicativo Speak Aloud para treinar sua pronúncia. Insira as palavras ou frases, ouça atentamente e repita em voz alta. Depois, aguarde seu feedback. Faça uma oração em inglês. Procure por traduções de orações que você costuma fazer. Você pode usar sites como The Prayer Wall ou Click to Pray ou criar a sua própria oração."
      },
      {
        "day": 82,
        "lesson": 82,
        "quiz": 82,
        "activity": "Encontre e leia histórias curtas em sites como Project Gutenberg ou Wattpad. Use o site Vocabulary.com e clique em “Random Word” abaixo da barra de pesquisa. Estude a palavra gerada, faça quizzes para expandir e praticar vocabulário em inglês."
      },
      {
        "day": 83,
        "lesson": 83,
        "quiz": 83,
        "activity": "Escreva sobre uma viagem, férias ou local de lazer que você tenha visitado recentemente, dando sua opinião sobre ele. Use o Fluêncio pora a correção. Escute uma entrevista em um podcast, se for de um de seus artistas favoritos, melhor ainda. Aqui estão algumas sugestões: The Armchair Expert e Ted Interview."
      },
      {
        "day": 84,
        "lesson": 84,
        "quiz": 84,
        "activity": "Faça a palavra cruzada do dia no site The Atlantic. Assista a desenhos animados ou programas infantis em inglês para se acostumar com o ritmo e entonação da língua. Sugestões de canais de desenhos: Peekaboo Kidz, The Kiboomers, Cocomelon."
      }
    ]
  },
  {
    "week": 13,
    "days": [
      {
        "day": 85,
        "lesson": 85,
        "quiz": 85,
        "activity": "Use este prompt para ter uma conversa com o Fluêncio “Hello! My name is [seu some]. I'm learning English and I'd like to talk to you. Ask me questions about my profession!”. Peça para o Fluêncio corrigir a sua conversa. Analise seus erros, anote palavras novas ou continue conversando. Tente usar as palavras aprendidas na aula do dia."
      },
      {
        "day": 86,
        "lesson": 86,
        "quiz": 86,
        "activity": "Leia e escute mais alguns trechos de “The little prince”. Escreva um breve resumo da história que leu até agora. Também escreva sobre como tem sido essa experiência. Use o Fluêncio para a correção."
      },
      {
        "day": 87,
        "lesson": 87,
        "quiz": 87,
        "activity": "Ouça e assista à leitura de histórias no site Storyline. Procure por temas que te agradem. Não se preocupe em entender tudo o que é falado, mas sim em compreender o contexto. Selecione palavras e frases da história e use o aplicativo Speak Aloud para treinar sua pronúncia. Insira as palavras ou frases, ouça atentamente e repita em voz alta. Depois, aguarde seu feedback."
      },
      {
        "day": 88,
        "lesson": 88,
        "quiz": 88,
        "activity": "Experimente escrever poemas ou letras de músicas em inglês. Jogue Gartic - com amigos, conhecidos ou online, em salas já criadas com temas que te agradem. Convide alguém para jogar com você."
      },
      {
        "day": 89,
        "lesson": 89,
        "quiz": 89,
        "activity": "Escreva uma carta simples ou um e- mail para um amigo, ou familiar, em inglês, para praticar vocabulário relacionado a esse relacionamento. Use o Fluêncio para a correção. Use o e-mail ou carta que escreveu e leia em voz alta. Se conseguir ler para a pessoa específica para quem escreveu, melhor ainda."
      },
      {
        "day": 90,
        "lesson": 90,
        "quiz": 90,
        "activity": "Crie uma lista de compras. Tente utilizar vocabulários mais diferenciados. Aproveite para pesquisar o vocabulário de itens do seu dia-a-dia. Agora imagine que está em um supermercado ou em uma loja de departamentos. Leve sua lista de compras e peça ajuda a um atendente para localizar os itens. Tente visualizar essa conversa e escreva- a em forma de diálogo. FIM DO STAGE THREE Congratulations!"
      },
      {
        "day": 91,
        "lesson": 91,
        "quiz": 91,
        "activity": "Use o site Lyrics Training, escolha um artista ou uma música específica e estude com ela. Se puder, também anote as palavras que soarem mais diferentes para você. Guarde-as para estudo futuro, não se preocupe em entendê-las de primeira. Pesquise por um restaurante famoso em algum país de língua inglesa. Você pode usar termos como “famous restaurantes in The USA”, ou “top 10 restaurants in Australia”, por exemplo. Escolha pelo menos 2 deles e entre em seus sites oficiais. Leia em voz alta o menu, a história (se houver), pesquise vocabulários específicos e leia resenhas de frequentadores."
      }
    ]
  },
  {
    "week": 14,
    "days": [
      {
        "day": 92,
        "lesson": 92,
        "quiz": 92,
        "activity": "Visite sites de notícias como BBC News ou CNN e leia artigos sobre tópicos de seu interesse. Jogue uma partida de Connections e divirta-se. Você deverá encontrar 4 palavras que pertencem ao mesmo grupo."
      },
      {
        "day": 93,
        "lesson": 93,
        "quiz": 93,
        "activity": "Leia em voz a mesma notícia que você leu ontem e procure pelas palavras que você não conhece. Escreva um breve resumo sobre essa notícia e sua opinião sobre ela."
      },
      {
        "day": 94,
        "lesson": 94,
        "quiz": 94,
        "activity": "Assista a um vídeo no Ted ED sem legendas. Preste atenção no contexto geral. Assista mais uma vez, com legendas e busque um maior entendimento do vídeo. Faça as atividades sugeridas pelo site. Clique em “Think” e responda um quiz sobre o vídeo."
      },
      {
        "day": 95,
        "lesson": 95,
        "quiz": 95,
        "activity": "Escolha um jogo no site TinyTap e jogue! Prefira jogos com frases completas e não somente vocabulário. Escreva sobre uma pessoa que você admira: descreva uma pessoa que você admira e explique por que ela é importante para você. Você também pode conferir seu texto usando o Fluêncio."
      },
      {
        "day": 96,
        "lesson": 96,
        "quiz": 96,
        "activity": "Escolha um episódio do Podcast e escute ele todo. Foque no tema central do áudio. Anote algumas das palavras que você compreendeu e pesquise por sinônimos delas usando um dicionário. Isso vai te ajudar a expandir seu vocabulário. Escreva algumas frases ou um parágrafo sobre o que escutou, e se precisar, peça ao Fluêncio para corrigir."
      },
      {
        "day": 97,
        "lesson": 97,
        "quiz": 97,
        "activity": "Pratique sua compreensão auditiva e o alfabeto com esse jogo de soletrar, no ESL Games. Selecione o tema de sia preferência, o nível de dificuldade e com base no áudio, selecione as letras oara formar a palavra. Use algumas das palavras que você encontrou no jogo para formar frases, isso vai te ajudar a entender e fixar novos vocabulários."
      },
      {
        "day": 98,
        "lesson": 98,
        "quiz": 98,
        "activity": "Faça um breve texto de como foi a sua semana e a sua rotina. Peça ajuda ao Fluêncio para a correção. É hora de relaxar, assista a um filme ou série em inglês. Não se preocupe, use as legendas se for preciso."
      }
    ]
  },
  {
    "week": 15,
    "days": [
      {
        "day": 99,
        "lesson": 99,
        "quiz": 99,
        "activity": "Faça um quiz divertido no site Merriam Webster. Selecione e escute rádios de qualquer lugar do mundo através do Radio Gaden. Tente interpretar notícias ou propagandas que escuta. Não se preocupe em compreender tudo que é falado."
      },
      {
        "day": 100,
        "lesson": 100,
        "quiz": 100,
        "activity": "Visite sites de notícias como BBC News ou CNN e leia artigos sobre tópicos de seu interesse. Sugestões: tecnologia, meio ambiente, lazer. Anote palavras desconhecidas. Procure por antônimos e sinônimos dentro dessas palavras anotadas da notícia. Pratique a identificação de antônimos e sinônimos em inglês, expandindo seu repertório de palavras relacionadas. Use um dicionário, como o Thesaurus."
      },
      {
        "day": 101,
        "lesson": 101,
        "quiz": 101,
        "activity": "Assista 15 segundos de uma série ou vídeo, ou filme, sem legendas, e anote o que entendeu. Assista ao trecho novamente, agora com legendas em ingles e faça a correção. Assista novamente, e agora repita em voz alta. Selecione palavras e frases da história e use o aplicativo Speak Aloud para treinar sua pronúncia. Insira as palavras ou frases, ouça atentamente e repita em voz alta. Depois, aguarde seu feedback."
      },
      {
        "day": 102,
        "lesson": 102,
        "quiz": 102,
        "activity": "Converse com o Fluêncio sobre esportes, use este prompt: \"Hi! Do you play any sports? I like to play [esporte que gosta]. What is your favorite sport?\" Você pode pedir que ele te corrija ou explique palavras que não conhece. Tente manter a conversa, como se estivesse falando com um amigo. Leia e interaja em posts de fóruns ou grupos de discussão online em inglês. Use fóruns ou grupos como o Reddit."
      },
      {
        "day": 103,
        "lesson": 103,
        "quiz": 103,
        "activity": "Escreva uma resenha em inglês de algum local público que você conheça Use o próprio Google para encontrar o endereço e avaliar por lá. Use o Fluêncio para a correção. Explore comics e graphic novels em inglês, que são visualmente estimulantes e linguisticamente variados. Use sites como Project Gutenberg, Webtoon, Tapas e Comic Fury."
      },
      {
        "day": 104,
        "lesson": 104,
        "quiz": 104,
        "activity": "Selecione scripts de filmes em inglês e acompanhe enquanto assiste ao filme. Você pode encontrar vários deles no site Simply Scripts. Speak Aloud para treinar sua pronúncia. Insira as palavras ou frases, ouça atentamente e repita em voz alta. Depois, aguarde seu feedback. Jogue algumas partidas de Letter Box."
      },
      {
        "day": 105,
        "lesson": 105,
        "quiz": 105,
        "activity": "Ouça diálogos simples no site Elllo, selecione seu nível como iniciante aqui. Foque em repetir em voz alta para praticar sua pronúncia e entonação. Anote palavras novas desse diálogo e tente criar pelo menos 5 frases com elas."
      }
    ]
  },
  {
    "week": 16,
    "days": [
      {
        "day": 106,
        "lesson": 106,
        "quiz": 106,
        "activity": "Escolha e assista a um vídeo sobre casas incríveis. Anote palavras novas e o que achou mais impressionante na casa. Faça um pequeno texto descrevendo a casa do vídeo e dê a sua opinião sobre ela. Use o Fluêncio para a correção."
      },
      {
        "day": 107,
        "lesson": 107,
        "quiz": 107,
        "activity": "Pratique uma simulação de fala: imagine que você mora na casa do vídeo que você assistiu e você vai apresentá-la para seus amigos. Use o aplicativo Speak Aloud para treinar sua pronúncia. Insira as palavras ou frases, ouça atentamente e repita em voz alta. Depois, aguarde seu feedback. Faça um quiz divertido no site Merriam Webster."
      },
      {
        "day": 108,
        "lesson": 108,
        "quiz": 108,
        "activity": "Ouça e assista à leitura de histórias no site Storyline. Procure por temas que te agradem. Não se preocupe em entender tudo o que é falado, mas sim em compreender o contexto. Divirta-se com esse jogo da memória no site ESL Games. Escolha seu tema favorito."
      },
      {
        "day": 109,
        "lesson": 109,
        "quiz": 109,
        "activity": "Leia e escute mais alguns trechos de “The little prince”. Selecione algumas palavras novas para você e procure por antônimos e sinônimos dentro dessas palavras anotadas da notícia. Selecione algumas palavras e pratique a identificação de antônimos e sinônimos em inglês, expandindo seu repertório de palavras relacionadas. Use um dicionário, como o Thesaurus."
      },
      {
        "day": 110,
        "lesson": 110,
        "quiz": 110,
        "activity": "Pesquise um pouco mais sobre algum artista ou celebridade usando a Wikipedia. Pratique uma simulação de conversa: imagine que você é um jornalista e irá entrevistar o artista sobre o qual você pesquisou. Faça perguntas interessantes sobre sua carreira. Corrija suas perguntas usando o Fluêncio."
      },
      {
        "day": 111,
        "lesson": 111,
        "quiz": 111,
        "activity": "Pesquise no YouTube por uma entrevista do artista da atividade de ontem e compare com a sua própria entrevista, a que você criou. Anote palavras novas ou curiosidades que você aprendeu sobre ele. Escreva um texto breve sobre esse artista, comparando o que você aprendeu em sua biografia e a entrevista que você assistiu."
      },
      {
        "day": 112,
        "lesson": 112,
        "quiz": 112,
        "activity": "Jogue uma partida de Spelling Bee no The New York Times e anote as palavras que conseguir montar. Faça frases com cada uma destas palavras e se arrisque usando estruturas diferentes."
      }
    ]
  },
  {
    "week": 17,
    "days": [
      {
        "day": 113,
        "lesson": 113,
        "quiz": 113,
        "activity": "Escolha e faça um Word Search. Encontre as palavras selecionadas e faça algumas frases com cada uma delas. Assista a um filme ou série em inglês, com legendas. Preste atenção nas falas das personagens, pause e tente imitar alguns dos personagens."
      },
      {
        "day": 114,
        "lesson": 114,
        "quiz": 114,
        "activity": "Procure vocabulários de objetos de um cômodo específico da sua casa, a garagem, por exemplo. Se puder, escreva-os em notas adesivas e cole nesses objetos para ir memorizando ao longo do tempo. Durante seu dia, mantenha um diário em inglês e grave seus pensamentos e experiências diárias para praticar a expressão escrita e oral."
      },
      {
        "day": 115,
        "lesson": 115,
        "quiz": 115,
        "activity": "Visite sites de notícias como BBC News ou CNN e leia artigos sobre tópicos de seu interesse. Jogue uma partida de Connections e divirta-se. Você deverá encontrar 4 palavras que pertencem ao mesmo grupo."
      },
      {
        "day": 116,
        "lesson": 116,
        "quiz": 116,
        "activity": "Escreva um comentário em inglês em um post de um artista que você gosta. Leia em voz a mesma notícia que você leu ontem e procure pelas palavras que você não conhece. Use o aplicativo Speak Aloud para treinar sua pronúncia. Insira as palavras ou frases, ouça atentamente e repita em voz alta. Depois, aguarde seu feedback."
      },
      {
        "day": 117,
        "lesson": 117,
        "quiz": 117,
        "activity": "Assista a um TedTalks. Selecione o tema que mais se interessar e se precisar, assista uma vez sem legendas e anote palavras ou frases que compreendeu. Escreva um breve resumo do que aprendeu e se precisar, use o Reverso Contexto. Use o Fluêncio para a correção."
      },
      {
        "day": 118,
        "lesson": 118,
        "quiz": 118,
        "activity": "Escolha um episódio do Podcast e escute ele todo. Foque no tema central. Escute mais vez e anote palavras ou frases que compreendeu. Escreva sobre uma viagem, férias ou local de lazer que você tenha visitado recentemente, avaliando-o. Use o Fluêncio para correção."
      },
      {
        "day": 119,
        "lesson": 119,
        "quiz": 119,
        "activity": "É hora de trabalhar na sua confiança. Acesse Best of Affirmations. Clique em “affirm” e leia a afirmação em voz alta. Tente ler uma afirmação por dia e se necessário procure pelo significado da frase. Sintonize estações de rádio em inglês e ouça os anúncios comerciais para praticar a compreensão auditiva. Você pode encontrar estações de rádio online no site Radio Uk, por exemplo."
      }
    ]
  },
  {
    "week": 18,
    "days": [
      {
        "day": 120,
        "lesson": 120,
        "quiz": 120,
        "activity": "Fale um trava- línguas.Você pode encontrar alguns exemplos para iniciar aqui, no site do British Council, e também pesquisar em artigos, como este. Jogue uma partida de Connections e divirta-se. Você deverá encontrar 4 palavras que pertencem ao mesmo grupo. FIM DO STAGE FOUR Congratulations!"
      },
      {
        "day": 121,
        "lesson": 121,
        "quiz": 121,
        "activity": "Assista a um vídeo em inglês no YouTube e pratique sua compreensão auditiva: assista 15 segundos do vídeo, sem legendas e anote o que entendeu. Assista ao mesmo trecho e corrija o que for preciso. Repita esse processo algumas vezes, assistindo os próximos trechos do vídeo. Assista ao vídeo novamente a agora pratique sua pronúncia. Repita em voz alta o que é dito, tentando imitar quem está falando."
      },
      {
        "day": 122,
        "lesson": 122,
        "quiz": 122,
        "activity": "Escolha e leia uma notícia na National Geographic. Não se preocupe em compreender tudo, mas sim o tema principal e alguns pontos específicos tratados na notícia. Anote algumas das palavras que você compreendeu e pesquise por sinônimos delas usando um dicionário. Isso vai te ajudar a expandir seu vocabulário."
      },
      {
        "day": 123,
        "lesson": 123,
        "quiz": 123,
        "activity": "Pesquise no Youtube vídeos sobre a notícia que leu ontem. Pesquise pelo mesmo título ou similar. Assista ao vídeo com atenção. Escreva um pequeno texto dando a sua opinião sobre a notícia que leu e o vídeo que assistiu. Confira seu texto com o Fluêncio."
      },
      {
        "day": 124,
        "lesson": 124,
        "quiz": 124,
        "activity": "Narre a notícia e o vídeo que assistiu. Busque usar algumas das palavras que você lembra e que tenha estudado recentemente, sem pesquisar muito. Use o aplicativo Speak Aloud para treinar sua pronúncia. Insira as palavras ou frases, ouça atentamente e repita em voz alta. Depois, aguarde seu feedback. Grave um vídeo ou áudio de você mesmo narrando."
      },
      {
        "day": 125,
        "lesson": 125,
        "quiz": 125,
        "activity": "Jogue uma partida de Wordle e divirta- se adivinhando palavras. Faça 5 frases sobre como foi o seu dia. Use um dicionário, como o de Oxford, caso precise de ajuda. Use o Fluêncio para a correção."
      },
      {
        "day": 126,
        "lesson": 126,
        "quiz": 126,
        "activity": "Aprenda com sua música favorita usando o Lyricstraining. Anote palavras novas e ao final da atividade cante a música acompanhando a letra. Faça frases com algumas das palavras novas que você descobriu na música."
      }
    ]
  },
  {
    "week": 19,
    "days": [
      {
        "day": 127,
        "lesson": 127,
        "quiz": 127,
        "activity": "Use este prompt para ter uma conversa com o Fluêncio “Hello! My name is [seu some]. I'm learning English and I'd like to talk to you about my last weekend. Ask me questions about it.”. Use vocabulários que você aprendeu recentemente. Peça para o Fluêncio corrigir a sua conversa. Analise seus erros, anote palavras novas ou continue conversando."
      },
      {
        "day": 128,
        "lesson": 128,
        "quiz": 128,
        "activity": "Leia um poema em voz alta, tente dramatizá-lo. Procure poemas em sites como o Project Gutenberg. Pratique e expanda deu vocabulários com o ESL Games. Desembaralhe as letras para formar palavras."
      },
      {
        "day": 129,
        "lesson": 129,
        "quiz": 129,
        "activity": "Navegue pela seção \"Listen & Watch\" do BBC Learning English e escolha um dos áudios para ouvir. Faça também o quiz de compeensão para um melhor aproveitamento. Escreva sobre seu hobby favorito! Explique qual é e por que você gosta dele. use o Fluêncio para a correção."
      },
      {
        "day": 130,
        "lesson": 130,
        "quiz": 130,
        "activity": "Leia uma pequena biografia de algum personagem histórico no site The Famous People. Tente narrar os feitos deste personagem histórico com suas palavras. Se for preciso, escreva, mas tente falar naturalmente sem o auxílio do texto, e se grave fazendo isso para checar depois."
      },
      {
        "day": 131,
        "lesson": 131,
        "quiz": 131,
        "activity": "Escreva sobre uma viagem, férias ou local de lazer que você tenha visitado recentemente, avaliando-o. Use o site Vocabulary.com e clique em “Random Word” abaixo da barra de pesquisa. Estude a palavra gerada, faça quizzes para expandir e praticar vocabulário em inglês."
      },
      {
        "day": 132,
        "lesson": 132,
        "quiz": 132,
        "activity": "Procure por vocabulários de objetos de um cômodo específico da sua casa usando o Reverso Contexto. Tente procurar por objetos diferentes ou produtos que usa no dia-a-dia. Faça 5 frases sobre como foi o seu dia. Use um dicionário, como o de Oxford, caso precise de ajuda. Use o Fluêncio para a correção."
      },
      {
        "day": 133,
        "lesson": 133,
        "quiz": 133,
        "activity": "Escreva um breve resumo sobre a sua semana em inglês. Use um dicionário, como o de Oxford, caso seja necessário. Use o Fluêncio para a correção. Assista a um vídeo no YouTube, sobre seu tema favorito. Preste atenção no tema central e tente identificar palavras e frases. Faça um pequeno texto contando o que você entendeu."
      }
    ]
  },
  {
    "week": 20,
    "days": [
      {
        "day": 134,
        "lesson": 134,
        "quiz": 134,
        "activity": "Leia uma notícia sobre seu esporte favorito no site da BBC Sport. Faça um breve resumo sobre o que leu. Use o Fluêncio para a correção."
      },
      {
        "day": 135,
        "lesson": 135,
        "quiz": 135,
        "activity": "Pesquise sobre as regras do esporte que você leu ontem e as escreva. Você pode usar a Wikipedia para te ajudar na pesquisa. Assista a um vídeo no YouTube sobre este mesmo esporte. Tente assistir sem legendas."
      },
      {
        "day": 136,
        "lesson": 136,
        "quiz": 136,
        "activity": "Escolha um Word Search sobre esporte e divirta-se encontrando palavras. Faça algumas frases usando as palavras no jogo. Use o aplicativo Speak Aloud para treinar sua pronúncia. Insira as palavras ou frases, ouça atentamente e repita em voz alta. Depois, aguarde seu feedback."
      },
      {
        "day": 137,
        "lesson": 137,
        "quiz": 137,
        "activity": "Escreva um parágrafo sobre seu esporte favorito, com que frequência joga e com quem. Use o Fluêncio para a correção."
      },
      {
        "day": 138,
        "lesson": 138,
        "quiz": 138,
        "activity": "Escolha um jogo no site TinyTap e jogue! Prefira jogos com frases completas e não somente vocabulário. Escolha e leia uma notícia conforme o seu nível. Selecione os níveis dois e três para aumentar seu desafio."
      },
      {
        "day": 139,
        "lesson": 139,
        "quiz": 139,
        "activity": "Sintonize estações de rádio em inglês e ouça os anúncios comerciais para praticar a compreensão auditiva. Você pode encontrar estações de rádio online no site Radio Garden, por exemplo. Escolha um Word Search e divirta-se!"
      },
      {
        "day": 140,
        "lesson": 140,
        "quiz": 140,
        "activity": "Escolha e escute um episódio do Podcast This American Life. Faça um breve resumo sobre o episódio."
      }
    ]
  },
  {
    "week": 21,
    "days": [
      {
        "day": 141,
        "lesson": 141,
        "quiz": 141,
        "activity": "Ouça o audiobook grátis do dia do site/app Blinkist. Durante esta semana, mantenha um diário, escrevendo as coisas que fez no dia."
      },
      {
        "day": 142,
        "lesson": 142,
        "quiz": 142,
        "activity": "Leia as embalagens dos produtos em inglês enquanto faz compras em um supermercado, ou pesquise por embalagens em sites de compra online. Se puder, tire fotos ou capturas de tela e pesquise as palavras depois. Descreva um projeto que você gostaria de realizar no futuro e como planeja fazê- lo."
      },
      {
        "day": 143,
        "lesson": 143,
        "quiz": 143,
        "activity": "Jogue o Baba Dum em inglês. Faça uma oração em inglês. Procure por traduções de orações que você costuma fazer. Você pode usar sites como The Prayer Wall, Click to Pray."
      },
      {
        "day": 144,
        "lesson": 144,
        "quiz": 144,
        "activity": "Imagine que precisa fazer uma reserva em um hotel. Tente visualizar a conversa que teria com o atendente e escreva-a em forma de diálogo. Chame alguém para praticar com você. Use o Fluêncio para praticar essa conversa. Use o prompt: “Hello! My name is [seu some]. I'm learning English and I'd like to talk to you. Let 's roleplay. Iʼm a guest and you are a hotel clerk. Iʼd like to make a reservation. Ask me questions about it.”. Use vocabulários que você aprendeu recentemente."
      },
      {
        "day": 145,
        "lesson": 145,
        "quiz": 145,
        "activity": "Escolha um episódio do Podcast e preste atenção no tema central. Escute mais uma vez, e anote palavras e frases que entendeu. Use o aplicativo Speak Aloud para treinar sua pronúncia. Insira as palavras ou frases, ouça atentamente e repita em voz alta. Depois, aguarde seu feedback."
      },
      {
        "day": 146,
        "lesson": 146,
        "quiz": 146,
        "activity": "Escolha um jogo no site TinyTap e jogue! Prefira jogos com frases completas e não somente vocabulário. Encontre e leia histórias curtas em sites como Project Gutenberg ou Wattpad."
      },
      {
        "day": 147,
        "lesson": 147,
        "quiz": 147,
        "activity": "Leia seu diário semanal, de preferência em voz alta. Anote possíveis dúvidas ou correções que você já consegue fazer. Escreva um breve resumo, em inglês, sobre o audiobook que ouviu no primeiro dia e avalie seu desempenho. use o Fluêncio para a correção."
      }
    ]
  },
  {
    "week": 22,
    "days": [
      {
        "day": 148,
        "lesson": 148,
        "quiz": 148,
        "activity": "Assista a alguns trechos de uma série ou filme em inglês. Vamos trabalhar a pronúncia e para isso você terá que imitar as falas e expressões dos atores em cenas. Repita várias vezes. Jogue uma partida de CrossWord Puzzle e divirta-se!"
      },
      {
        "day": 149,
        "lesson": 149,
        "quiz": 149,
        "activity": "Escreva 5 frases sobre o seu dia. Use o Fluêncio para a correção. Ouça diálogos simples no site Elllo, selecione seu nível como aqui. Foque em repetir em voz alta para praticar sua pronúncia e entonação."
      },
      {
        "day": 150,
        "lesson": 150,
        "quiz": 150,
        "activity": "Visite sites de notícias como BBC News ou CNN e leia artigos sobre tópicos de seu interesse. Escreva um breve resumo sobre a notícia. FIM DO STAGE FIVE Congratulations!"
      },
      {
        "day": 151,
        "lesson": 151,
        "quiz": 151,
        "activity": "Assista a um vídeo em inglês no YouTube e pratique sua compreensão auditiva: assista 15 segundos do vídeo, sem legendas e anote o que entendeu. Assista ao mesmo trecho e corrija o que for preciso. Repita esse processo algumas vezes, assistindo os próximos trechos do vídeo. Assista ao vídeo novamente a agora pratique sua pronúncia. Repita em voz alta o que é dito, tentando imitar quem está falando."
      },
      {
        "day": 152,
        "lesson": 152,
        "quiz": 152,
        "activity": "Aprenda e pratique com sua música favorita usando o Lyricstraining. Anote palavras novas e cante a música ao final da atividade para praticar sua pronúncia. Escolha um jogo no site TinyTap e jogue! Prefira jogos com frases completas e não somente vocabulário."
      },
      {
        "day": 153,
        "lesson": 153,
        "quiz": 153,
        "activity": "Escute a leitura de uma história em inglês através do Storyline Online. Se concentre na história e tente compreender o máximo possível. Pratique sua fala e narre o que você entendeu da história. Use o aplicativo Speak Aloud para treinar sua pronúncia. Insira as palavras ou frases, ouça atentamente e repita em voz alta. Depois, aguarde seu feedback."
      },
      {
        "day": 154,
        "lesson": 154,
        "quiz": 154,
        "activity": "Escolha e assista a um Tedtalks. Anote algumas das palavras que você compreendeu e pesquise por sinônimos delas usando um dicionário. Isso vai te ajudar a expandir seu vocabulário."
      }
    ]
  },
  {
    "week": 23,
    "days": [
      {
        "day": 155,
        "lesson": 155,
        "quiz": 155,
        "activity": "Visite sites de notícias como BBC News ou CNN e leia artigos sobre tópicos de seu interesse. Jogue uma partida de Connections e divirta-se. Você deverá encontrar 4 palavras que pertencem ao mesmo grupo."
      },
      {
        "day": 156,
        "lesson": 156,
        "quiz": 156,
        "activity": "Escreva um comentário em inglês em um post de um artista que você gosta. Leia em voz a mesma notícia que você leu ontem e procure pelas palavras que você não conhece. Use o aplicativo Speak Aloud para treinar sua pronúncia. Insira algumas palavras ou frases da notícia, ouça atentamente e repita em voz alta. Depois, aguarde seu feedback."
      },
      {
        "day": 157,
        "lesson": 157,
        "quiz": 157,
        "activity": "Escolha um episódio de Podcast e foque na ideia central do áudio. Experimente escrever poemas ou letras de músicas em inglês. Use o fluência para inspiração ou correção."
      },
      {
        "day": 158,
        "lesson": 158,
        "quiz": 158,
        "activity": "Leia uma pequena biografia de alguns personagens históricos no site Famous People. Tente narrar os feitos deste personagem histórico com suas palavras. Se for preciso, escreva, mas tente falar naturalmente sem o auxílio do texto, e se grave fazendo isso para checar depois."
      },
      {
        "day": 159,
        "lesson": 159,
        "quiz": 159,
        "activity": "Use o site Vocabulary.com e clique em “Random Word” abaixo da barra de pesquisa. Estude a palavra gerada, faça quizzes para expandir e praticar vocabulário em inglês. Use a palavra gerada para criar 5 frases. Para um desafio maior, tente inseri-la num diálogo."
      },
      {
        "day": 160,
        "lesson": 160,
        "quiz": 160,
        "activity": "Pratique uma conversa com o Fluêncio sobre o clima e estações do ano. Use este prompt: \"Hello! How is the weather today? Is it hot or cold where you are?\" Leia e interaja em posts de seus artistas favoritos em inglês."
      },
      {
        "day": 161,
        "lesson": 161,
        "quiz": 161,
        "activity": "Pratique seu vocabulário com o Word Search. Encontre as palavras listadas. Assista a um filme ou série em inglês, e se quiser, tente tirar as legendas."
      }
    ]
  },
  {
    "week": 24,
    "days": [
      {
        "day": 162,
        "lesson": 162,
        "quiz": 162,
        "activity": "Leia uma notícia sobre esse artista em sites como TMZ ou Daily Mail. Tente imitar esse artista! Se for um um ator/atriz específico que você goste, procure por uma cena que você conheça, use as mesmas entonações e trejeitos. Se for um músico, tente aproximar sua pronúncia da dele enquanto ouve suas músicas."
      },
      {
        "day": 163,
        "lesson": 163,
        "quiz": 163,
        "activity": "Escreva 5 frases sobre o seu dia. Corrija usando o Fluêncio. Ouça diálogos simples no site Elllo, selecione seu nível como iniciante aqui. Foque em repetir em voz alta para praticar sua pronúncia e entonação."
      },
      {
        "day": 164,
        "lesson": 164,
        "quiz": 164,
        "activity": "Ouça o audiobook grátis do dia do site/app Blinkist. Durante esta semana, mantenha um diário, escrevendo as coisas que fez no dia."
      },
      {
        "day": 165,
        "lesson": 165,
        "quiz": 165,
        "activity": "Leia um poema em voz alta, tente dramatizá-lo. Procure poemas em sites como o Project Gutenberg. Pratique seu vocabulário com este jogo sobre atividades diários no ESL Games."
      },
      {
        "day": 166,
        "lesson": 166,
        "quiz": 166,
        "activity": "Assista 15 segundos de uma série ou vídeo, ou filme, sem legendas, e anote o que entendeu. Assista ao trecho novamente, com legendas em inglês, e faça a correção. Assista mais alguns trechos do vídeo e repita o processo. Escreva um breve resumo, em inglês, sobre o trecho."
      },
      {
        "day": 167,
        "lesson": 167,
        "quiz": 167,
        "activity": "Jogue uma partida de Connections e divirta-se. Você deverá encontrar 4 palavras que pertencem ao mesmo grupo. Pratique uma conversa com o Fluêncio. Use este prompt “Hello! My name is [seu some]. I'm learning English and I'd like talk to you about [assunto que deseja conversar]”. Você pode pedir que ele te corrija ou explique palavras que não conhece. Tente levar a conversa adiante, como se estivesse falando com um amigo."
      },
      {
        "day": 168,
        "lesson": 168,
        "quiz": 168,
        "activity": "Leia seu diário semanal, de preferência em voz alta. Use o aplicativo Speak Aloud para treinar sua pronúncia. Insira algumas palavras ou frases , ouça atentamente e repita em voz alta. Depois, aguarde seu feedback. Escolha um Word Search e divirta-se!"
      }
    ]
  },
  {
    "week": 25,
    "days": [
      {
        "day": 169,
        "lesson": 169,
        "quiz": 169,
        "activity": "Fale um trava- línguas.Você pode encontrar alguns exemplos para iniciar aqui, no site do British Council, e também pesquisar em artigos, como este. Visite sites de notícias como BBC News ou CNN e leia artigos sobre tópicos de seu interesse."
      },
      {
        "day": 170,
        "lesson": 170,
        "quiz": 170,
        "activity": "Faça a palavra cruzada diária do Washington Post para encontrar e aprender novas palavras em inglês. Escolha pelo menos 5 dessas palavras e escreva frases com elas e com o vocabulário que você aprendeu recentemente. Use o Fluêncio para a correção."
      },
      {
        "day": 171,
        "lesson": 171,
        "quiz": 171,
        "activity": "Leia posts das redes sociais dos seus artistas favoritos em suas redes sociais - pelo menos 5 deles, se forem curtinhos. Descubra o artista no Instagram, no Facebook e/ou no X. Selecione e assista uma entrevista. Aqui estão algumas sugestões: The Armchair Expert e Ted Interview. Escreva um parágrafo sobre o que você entendeu a prendeu durante a entrevista."
      },
      {
        "day": 172,
        "lesson": 172,
        "quiz": 172,
        "activity": "Navegue pela seção \"Listen & Watch\" do BBC Learning English e escolha um dos áudios para ouvir. Faça também o quiz de compeensão para um melhor aproveitamento. Sugestão: lição sobre Snorkelling. Pegue pelo menos 3 palavras novas que descobriu durante esse listening e escreva um pequeno parágrafo com elas."
      },
      {
        "day": 173,
        "lesson": 173,
        "quiz": 173,
        "activity": "Procure vocabulários de objetos de um cômodo específico da sua casa, a sala de estar, por exemplo. Se puder, escreva-os em notas adesivas e cole nesses objetos para ir memorizando ao longo do tempo. Escolha e assista a um vídeo sobre casas incríveis. Anote palavras novas e o que achou mais impressionante na casa. Use o aplicativo Speak Aloud para treinar sua pronúncia. Insira algumas palavras ou frases do vídeo, ouça atentamente e repita em voz alta. Depois, aguarde seu feedback."
      },
      {
        "day": 174,
        "lesson": 174,
        "quiz": 174,
        "activity": "Jogue o Baba Dum em inglês. Faça uma oração em inglês. Procure por traduções de orações que você costuma fazer. Você pode usar sites como The Prayer Wall, Click to Pray ou criar sua própria oração."
      },
      {
        "day": 175,
        "lesson": 175,
        "quiz": 175,
        "activity": "Escreva um breve resumo sobre a sua semana em inglês. Use um dicionário, como o de Oxford, caso seja necessário. Use o Fluêncio para a correção. Assista a um filme ou série em inglês."
      }
    ]
  },
  {
    "week": 26,
    "days": [
      {
        "day": 176,
        "lesson": 176,
        "quiz": 176,
        "activity": "Escolha um jogo no site TinyTap e jogue! Prefira jogos com frases completas e não somente vocabulário. Escreva sobre seus objetivos. Descreva quais são seus objetivos de curto e longo prazo e como planeja alcançá-los. Use o Fluêncio para a correção."
      },
      {
        "day": 177,
        "lesson": 177,
        "quiz": 177,
        "activity": "Encontre e leia histórias curtas em sites como Project Gutenberg ou Wattpad. Use o site Vocabulary.com e clique em “Random Word” abaixo da barra de pesquisa. Estude a palavra gerada, faça quizzes para expandir e praticar vocabulário em inglês."
      },
      {
        "day": 178,
        "lesson": 178,
        "quiz": 178,
        "activity": "Experimente escrever poemas ou letras de músicas em inglês. Jogue Gartic - com amigos, conhecidos ou online, em salas já criadas com temas que te agradem. Convide alguém para jogar com você."
      },
      {
        "day": 179,
        "lesson": 179,
        "quiz": 179,
        "activity": "Selecione scripts de filmes em inglês e acompanhe enquanto assiste ao filme. Você pode encontrar vários deles no site Simply Scripts. Sintonize estações de rádio em inglês e ouça os anúncios comerciais para praticar a compreensão auditiva. Você pode encontrar estações de rádio online no site Radio Uk, por exemplo."
      },
      {
        "day": 180,
        "lesson": 180,
        "quiz": 180,
        "activity": "Acompanhe um canal gringo no YouTube. Use a nossa lista de canais do YouTube, acessando o módulo de Introdução e explore seus interesses. Assista ao vídeo e tente identificar sobre o que o vídeo fala, agora podemos focar em entender frases maiores. FIM DO STAGE SIX Congratulations!"
      },
      {
        "day": 181,
        "lesson": 181,
        "quiz": 181,
        "activity": "Explore o site English Vocabulary Exercises para uma variedade de atividades de vocabulário, incluindo quizzes e jogos. Escreva frases com os vocabulários que você aprendeu durante os jogos."
      },
      {
        "day": 182,
        "lesson": 182,
        "quiz": 182,
        "activity": "Assista a desenhos animados ou programas infantis em inglês para se acostumar com o ritmo e entonação da língua. Sugestões de canais de desenhos: Peekaboo Kidz, The Kiboomers, Cocomelon. Escreva um breve resumo sobre o episódio que assistiu. Use o Fluêncio para a correção."
      }
    ]
  },
  {
    "week": 27,
    "days": [
      {
        "day": 183,
        "lesson": 183,
        "quiz": 183,
        "activity": "Escolha um episódio do Podcast e escute ele todo, ou apenas a um trecho. Você pode selecionar o nível de dificuldade e baixar a transcrição do áudio. Durante seu dia, mantenha um diário em inglês e grave seus pensamentos e experiências diárias para praticar a expressão escrita e oral."
      },
      {
        "day": 184,
        "lesson": 184,
        "quiz": 184,
        "activity": "Assista um vídeo do canal Big Think. Faça um breve texto sobre o que você aprendeu com o vídeo."
      },
      {
        "day": 185,
        "lesson": 185,
        "quiz": 185,
        "activity": "Selecione e leia notícias sobre o mundo do cinema e filmes no Buzzfeed. Escolha um jogo no site TinyTap e jogue! Prefira jogos com frases completas e não somente vocabulário."
      },
      {
        "day": 186,
        "lesson": 186,
        "quiz": 186,
        "activity": "Imagine que precisa ir a um café com um amigo. Tente visualizar a conversa entre essas três pessoas: você, seu amigo e um atendente, e escreva-a em forma de diálogo. Chame alguém para praticar com você. Caso não encontre ninguém para praticar, pergunte ao Fluêncio se ele pode conversar com você sobre isso. Ele será o atendente do café e você o hóspede. Use o prompt: ““Hello! My name is [seu some]. I'm learning English and I'd like to talk to you. Let 's roleplay. Iʼm a customer and you are a café attendant. Suggest me what to order.” Use vocabulários que você aprendeu recentemente."
      },
      {
        "day": 187,
        "lesson": 187,
        "quiz": 187,
        "activity": "Leia uma notícia sobre algum artista que você goste em sites como TMZ ou Daily Mail. Tente imitar esse artista! Se for um um ator/atriz específico que você goste, procure por uma cena que você conheça, use as mesmas entonações e trejeitos. Se for um músico, tente aproximar sua pronúncia da dele enquanto ouve suas músicas. Se possível, se grave fazendo isso para checar seu progresso e use o Speak Aloud para checar sua pronúncia."
      },
      {
        "day": 188,
        "lesson": 188,
        "quiz": 188,
        "activity": "Visite o site Word Search e procure um tema que você goste, mas que ainda não seja muito familiarizado. Raças de cachorros, por exemplo. Faça a palavra cruzada e anote as palavras novas aprendidas. Use as palavras novas para criar um pequeno parágrafo com elas. Cheque e corrija o que for necessário com ajuda do Fluêncio."
      },
      {
        "day": 189,
        "lesson": 189,
        "quiz": 189,
        "activity": "Leia uma notícia sobre algum esporte que você gosta ou descobriu recentemente. Procure por esportes diferentes, como lacrosse ou rugby. Use sites como o BBC Sports e o Sky Sports. Faça um resumo, com suas palavras, sobre o esporte escolhido, como se tivesse que explicá- lo para alguém que nunca ouviu falar dele. Escreva e leia em voz alta, use o Speak Aloud para te ajudar com isso."
      }
    ]
  },
  {
    "week": 28,
    "days": [
      {
        "day": 190,
        "lesson": 190,
        "quiz": 190,
        "activity": "Assista a um vídeo tutorial em inglês no YouTube sobre projetos DIY simples e siga as instruções apenas pelo áudio. Pesquise por “easy DIY” ou “simple DIY projects”. Faça anotações sobre o que entendeu. Depois, reveja o vídeo e compare com estas notas. Jogue uma partida de Letter Box."
      },
      {
        "day": 191,
        "lesson": 191,
        "quiz": 191,
        "activity": "Navegue pela seção \"Listen & Watch\" do BBC Learning English e escolha um dos áudios para ouvir. Faça também o quiz de compeensão para um melhor aproveitamento. Escreva um texto breve sobre o que você aprendeu com o vídeo escolhido."
      },
      {
        "day": 192,
        "lesson": 192,
        "quiz": 192,
        "activity": "Faça um quiz divertido no site Merriam Webster. Explore comics e graphic novels em inglês, que são visualmente estimulantes e linguisticamente variados. Use sites como Project Gutenberg, Webtoon, Tapas e Comic Fury."
      },
      {
        "day": 193,
        "lesson": 193,
        "quiz": 193,
        "activity": "Leia mais alguns trechos do livro “The Little Prince”. Anote palavras novas e busque pelo seu significado. Chegou a agora de tentar compreender mais sobre o que lemos e assistimos. Pesquise por sinônimos das palavras que você anotou usando um dicionário. Isso vai te ajudar a expandir seu vocabulário. Faça algumas frases com cada uma delas."
      },
      {
        "day": 194,
        "lesson": 194,
        "quiz": 194,
        "activity": "Ouça diálogos simples no site Ello, selecione áudios dos níveis dois ou três. Foque em repetir em voz alta para praticar sua pronúncia e entonação. Anote palavras novas desse diálogo e tente criar pelo menos 5 frases com elas."
      },
      {
        "day": 195,
        "lesson": 195,
        "quiz": 195,
        "activity": "Faça a palavra cruzada do dia no site The Atlantic. Leia posts das redes sociais dos seus artistas favoritos em suas redes sociais - pelo menos 5 deles, se forem curtinhos. Descubra o artista no Instagram, no Facebook e/ou no X."
      },
      {
        "day": 196,
        "lesson": 196,
        "quiz": 196,
        "activity": "Faça um breve texto de como foi a sua semana e a sua rotina. É hora de relaxar, assista a um filme ou série em inglês. Não se preocupe, use as legendas se for preciso."
      }
    ]
  },
  {
    "week": 29,
    "days": [
      {
        "day": 197,
        "lesson": 197,
        "quiz": 197,
        "activity": "Escute o audio sobre mudanças aqui. Anote as palavras ou expressões novas. Responda o quiz do listening disponível no próprio site, anote suas respostas. Se tiver dificuldades, ouça novamente e use o script, também disponível no site, para lhe auxiliar nas respostas."
      },
      {
        "day": 198,
        "lesson": 198,
        "quiz": 198,
        "activity": "Retorne ao listening do dia anterior e responda: what are the advantages and disadvantages of hiring a company to move your belongings to a new residence? Escreva sobre sua experiência com mudanças de residência, quantas vezes já aconteceu, qual o lugar que você mais gostou de morar, quais lembranças tem da sua casa da infância, etc."
      },
      {
        "day": 199,
        "lesson": 199,
        "quiz": 199,
        "activity": "Assista um vídeo sobre mudança de casa de algum canal que você se interesse. Pesquise no YouTube por “moving vlog”, ou “moving out”. Faça anotações sobre o vídeo: para onde estão indo? Qual o motivo da mudança?"
      },
      {
        "day": 200,
        "lesson": 200,
        "quiz": 200,
        "activity": "Jogue o Baba Dum em inglês. Escreva um comentário em inglês em um post de um artista que você gosta. Para se desafiar, tente responder a um comentário de outra pessoa nesse post, para criar uma interação."
      },
      {
        "day": 201,
        "lesson": 201,
        "quiz": 201,
        "activity": "Assista esse vlog sobre “moving”e tente identificar as descrições, sentimentos e desafios mencionados. Ative as legendas em inglês, se necessário, e pause o vídeo sempre que precisar para entender melhor. Repita em voz alta palavras ou frases importantes e anote vocabulários ou expressões que achar interessantes. Faça o exercício proposto, que é conectar os nomes aos personagens do desenho de acordo com as descrições, dadas pelo áudio, do que estão fazendo. Se não acertar, não tem problema!"
      },
      {
        "day": 202,
        "lesson": 202,
        "quiz": 202,
        "activity": "Use este prompt para ter uma conversa com o Fluêncio: “Hello! My name is [seu some]. I'm learning English and I'd like to talk to you about moving to a new city”. Use vocabulários que você aprendeu recentemente. Peça para o Fluêncio para corrigir a sua conversa. Analise seus erros, anote palavras novas ou continue conversando."
      },
      {
        "day": 203,
        "lesson": 203,
        "quiz": 203,
        "activity": "Pratique com trava- língua. Escolha um Tongue Twister, escute o áudio e repita em voz alta. Use o Speak Aloud pra te ajudar também! Repita várias vezes, até que se sinta confortável com a pronúncia. Divirta-se. Leia e interaja em posts de fóruns ou grupos de discussão online em inglês. Use fóruns ou grupos como o Reddit."
      }
    ]
  },
  {
    "week": 30,
    "days": [
      {
        "day": 204,
        "lesson": 204,
        "quiz": 204,
        "activity": "Escreva um texto em inglês sobre como tem sido a sua rotina de estudos, quais atividades tem mais gostado de fazer e mostre que você está no caminho certo para a fluência. Grave-se narrando este texto e cheque sua pronúncia. Use o Speak Aloud para te ajudar se for preciso."
      },
      {
        "day": 205,
        "lesson": 205,
        "quiz": 205,
        "activity": "Assista a um TedTalks. Selecione o tema que mais se interessar. Escreva um breve resumo do que aprendeu e se precisar, use o Reverso Contexto."
      },
      {
        "day": 206,
        "lesson": 206,
        "quiz": 206,
        "activity": "Assista a um vídeo em inglês no YouTube e pratique sua compreensão auditiva: assista 15 segundos do vídeo, sem legendas e anote o que entendeu. Assista ao mesmo trecho e corrija o que for preciso. Repita esse processo algumas vezes, assistindo os próximos trechos do vídeo. Assista ao vídeo novamente a agora pratique sua pronúncia. Repita em voz alta o que é dito, tentando imitar quem está falando."
      },
      {
        "day": 207,
        "lesson": 207,
        "quiz": 207,
        "activity": "Escolha e leia uma notícia na Newsweek. Anote algumas das palavras que você compreendeu e pesquise por sinônimos delas usando um dicionário. Isso vai te ajudar a expandir seu vocabulário."
      },
      {
        "day": 208,
        "lesson": 208,
        "quiz": 208,
        "activity": "Faça um resumo da história que você leu ontem. Tente usar as palavras que aprendeu. Pratique sua fala, narre a história que você leu. Grave um vídeo ou áudio. Use o Speak Aloud para auxiliar na pronúncia."
      },
      {
        "day": 209,
        "lesson": 209,
        "quiz": 209,
        "activity": "Pesquise no Youtube vídeos sobre a notícia que leu ontem. Pesquise pelo mesmo título ou similar. Assista ao vídeo com atenção. Faça 5 frases sobre como foi o seu dia. Use um dicionário, como o de Oxford, caso precise de ajuda."
      },
      {
        "day": 210,
        "lesson": 210,
        "quiz": 210,
        "activity": "Aprenda com sua música favorita usando o Lyricstraining. Anote palavras novas e ao final da atividade cante a música acompanhando a letra. Faça frases com algumas das palavras novas que você descobriu na música. FIM DO STAGE SEVEN Congratulations!"
      }
    ]
  },
  {
    "week": 31,
    "days": [
      {
        "day": 211,
        "lesson": 211,
        "quiz": 211,
        "activity": "Faça a palavra cruzada diária do Washington Post para encontrar e aprender novas palavras em inglês. Escolha pelo menos 5 dessas palavras e escreva frases com elas e com o vocabulário que você aprendeu recentemente."
      },
      {
        "day": 212,
        "lesson": 212,
        "quiz": 212,
        "activity": "Ouça o audiobook grátis do site/app Blinkist. Escreva uma resenha sobre esse audiobook, mostre sua opinião, coloque os para os e contras, e recomende a leitura ou não."
      },
      {
        "day": 213,
        "lesson": 213,
        "quiz": 213,
        "activity": "Escreva uma carta simples ou um e- mail para um amigo ou familiar, contando sobre alguma lembrança de sua infância ou adolescência. Se precisar use um dicionário Collins. Pesquise a conjugação dos verbos no cooljugator. Leia este e-mail ou carta em voz alta. Se conseguir ler para a pessoa específica para quem escreveu, melhor ainda. Se precisar, use o Speak Aloud para te ajudar nisso."
      },
      {
        "day": 214,
        "lesson": 214,
        "quiz": 214,
        "activity": "Fale um trava- línguas.Você pode encontrar alguns exemplos para iniciar aqui, no site do British Council, e também pesquisar em artigos, como este. Visite sites de notícias como BBC News ou CNN e leia artigos sobre tópicos de seu interesse."
      },
      {
        "day": 215,
        "lesson": 215,
        "quiz": 215,
        "activity": "Escreva um comentário em inglês em alguma matéria ou postagem em blog sobre um assunto que você goste e domine, de preferência aquele que visitou no dia anterior. Tente interagir com outras pessoas que também comentaram. Use matérias que você já leu antes, ou postagens que você visitou recentemente em redes sociais, como o Instagram. Explore comics e graphic novels em inglês, que são visualmente estimulantes e linguisticamente variados. Use sites como Project Gutenberg, Webtoon, Tapas e Comic Fury."
      },
      {
        "day": 216,
        "lesson": 216,
        "quiz": 216,
        "activity": "Escolha um episódio do Podcast e escute ele todo, ou apenas a um trecho. Você pode selecionar o nível de dificuldade e baixar a transcrição do áudio. Use palavras desconhecidas que você anotou ou leu na transcrição do áudio e escreva pelo menos 5 frases com elas. Use o Fluêncio para corrigi-las."
      },
      {
        "day": 217,
        "lesson": 217,
        "quiz": 217,
        "activity": "Assista a um filme ou série em inglês que você já conhece! Tente desativar as legendas e prestar atenção na entonação das palavras. Faça anotações sobre suas descobertas. Escreva um breve resumo, em inglês, sobre o audiobook que ouviu nos dias anteriores e avalie seu desempenho. Não descreva sua opinião, somente fatos!"
      }
    ]
  },
  {
    "week": 32,
    "days": [
      {
        "day": 218,
        "lesson": 218,
        "quiz": 218,
        "activity": "É hora de relaxar e tentar uma meditação guiada em inglês. Abre o Mindful escolha a meditação perfeita para você, respire fundo e siga as instruções do áudio. Faça uma lista de mudanças e hábitos positivos que você pode implementar para ter uma rotina mais leve. Use um dicionário, como o de Oxford, caso precise de ajuda."
      },
      {
        "day": 219,
        "lesson": 219,
        "quiz": 219,
        "activity": "Assista programas a um episódio de Talk Show “The Tonight Show Starring Jimmy Fallon. Pesquise mais sobre o artista que você viu no episódio. Use a Wikipedia ou o site oficial do artista. Anote os fatos mais interessantes sobre ele."
      },
      {
        "day": 220,
        "lesson": 220,
        "quiz": 220,
        "activity": "Use o site Vocabulary.com e clique em “Random Word” abaixo da barra de pesquisa. Estude a palavra gerada, faça quizzes para expandir e praticar vocabulário em inglês. Faça algumas frases com a palavra da atividade anterior. Tente explorar contextos e estruturas diferentes."
      },
      {
        "day": 221,
        "lesson": 221,
        "quiz": 221,
        "activity": "Escolha e assista vídeos de notícias sobre o clima na CNN Weather. Escreva um breve texto como está o clima em sua região e qual é a previsão para os próximos dias."
      },
      {
        "day": 222,
        "lesson": 222,
        "quiz": 222,
        "activity": "Visite sites de notícias como BBC News ou CNN e leia artigos sobre tópicos de seu interesse. Sugestões: tecnologia, meio ambiente, lazer. Anote palavras desconhecidas. Procure por antônimos e dentro essas palavras anotadas da notícia. Pratique a identificação de antônimos e sinônimos em inglês, expandindo seu repertório de palavras relacionadas. Use um dicionário, como o de Oxford, caso seja necessário."
      },
      {
        "day": 223,
        "lesson": 223,
        "quiz": 223,
        "activity": "Leia mais alguns trechos de The Little Prince. Pesquise pelas palavras que não conhece e busque compreender a história. Faça algumas frases de exemplo com essas palavras e escreva um breve resumo do que leu."
      },
      {
        "day": 224,
        "lesson": 224,
        "quiz": 224,
        "activity": "Escute algumas notícias no site NPR. Narre algumas das notícias que escutou e grave um vídeo ou áudio sobre isso. Se precisar, use o Speak Aloud para checar sua pronúncia."
      }
    ]
  },
  {
    "week": 33,
    "days": [
      {
        "day": 225,
        "lesson": 225,
        "quiz": 225,
        "activity": "Escreva sobre o que gostaria de fazer no futuro em termos de estudos, trabalho ou viagens. Confira seu texto usando Grammarly. Escolha um Word Search sobre esporte e divirta-se encontrando palavras."
      },
      {
        "day": 226,
        "lesson": 226,
        "quiz": 226,
        "activity": "Explore o site English Vocabulary Exercises para uma variedade de atividades de vocabulário, incluindo quizzes e jogos. O site de Rick Steves oferece guias turísticos em áudio gratuitos para várias cidades e regiões da Europa. Eles cobrem pontos turísticos populares, história local e dicas de viagem. Escolha um lugar e ouça sobre ele."
      },
      {
        "day": 227,
        "lesson": 227,
        "quiz": 227,
        "activity": "Leia uma biografia curta de um dos artistas que você gosta. Anote ou destaque palavras que você ainda não conhece, mas não se preocupe caso não entenda 100% do conteúdo. Use a Wikipedia ou o site oficial do artista. Use o site Lyrics Training, escolha um artista ou uma música específica e estude com ela. Também anote as palavras que soarem mais diferentes pra você. Guarde-as para estudo futuro."
      },
      {
        "day": 228,
        "lesson": 228,
        "quiz": 228,
        "activity": "Selecione as palavras que anotou no dia anterior e escreva uma história com elas, ou imagine a letra da música como uma narração. Escreva esta história. Se grave lendo essa história que criou, preste atenção na entonação e na pronúncia correta das palavras. Se for preciso, use o Speak Aloud para te ajudar na pronúncia, um dicionário ou o Google Tradutor para checar sua precisão. Repita, com ajuda do Speak Aloud, as palavras quantas vezes precisar até ter uma pronúncia apropriada."
      },
      {
        "day": 229,
        "lesson": 229,
        "quiz": 229,
        "activity": "Encontre e leia histórias curtas em sites como Project Gutenberg ou Wattpad. Faça um resumo dessa história que leu. Escreva com suas palavras e tente, em seguida, contar para alguém que você acha que se interessa."
      },
      {
        "day": 230,
        "lesson": 230,
        "quiz": 230,
        "activity": "Experimente escrever frases com rimas, cujas últimas palavras tenham o mesmo som. Não precisam fazer sentido, como num poema ou letra de música, mas, se fizer, melhor! Jogue Gartic - com amigos, conhecidos ou online, em salas já criadas com temas que te agradem. Convide alguém para jogar com você."
      },
      {
        "day": 231,
        "lesson": 231,
        "quiz": 231,
        "activity": "Faça um quiz divertido no site Merriam Webster. Use o site Vocabulary.com e clique em “Random Word” abaixo da barra de pesquisa. Estude a palavra gerada, faça quizzes para expandir e praticar vocabulário em inglês."
      }
    ]
  },
  {
    "week": 34,
    "days": [
      {
        "day": 232,
        "lesson": 232,
        "quiz": 232,
        "activity": "Escolha um episódio do Podcast e escute ele todo, ou apenas a um trecho. Você pode selecionar o nível de dificuldade e baixar a transcrição do áudio. Foque em entender frases maiores. Use palavras desconhecidas que você anotou ou leu na transcrição do áudio e escreva pelo menos 5 frases com elas."
      },
      {
        "day": 233,
        "lesson": 233,
        "quiz": 233,
        "activity": "Escolha um jogo no site TinyTap e jogue! Prefira jogos com frases completas e não somente vocabulário. Aprenda e pratique com sua música favorita usando o Lyricstraining. Anote palavras novas e cante a música ao final da atividade para praticar sua pronúncia."
      },
      {
        "day": 234,
        "lesson": 234,
        "quiz": 234,
        "activity": "Escreva 3 frases sobre o seu dia. Ouça diálogos simples no site Elllo, selecione seu nível aqui. Foque em repetir em voz alta para praticar sua pronúncia e entonação. Use o Speak Aloud para te ajudar com pronúncias mais complexas e anote algumas frases para estudo posterior!"
      },
      {
        "day": 235,
        "lesson": 235,
        "quiz": 235,
        "activity": "Jogue uma partida de Connections e divirta-se. Você deverá encontrar 4 palavras que pertencem ao mesmo grupo. Pratique uma conversa com o Fluêncio. Use este prompt “Hello! My name is [seu some].\" I'm learning English and I'd like talk to you about [assunto que deseja conversar]. Selecione tópicos de notícias ou vídeos que foram vistos nas atividades anteriores. Peça para ele te corrigir também."
      },
      {
        "day": 236,
        "lesson": 236,
        "quiz": 236,
        "activity": "Fale um trava-língua. Você pode encontrar alguns exemplos para iniciar aqui, no site do British Council, e também pesquisar em artigos, como este. Visite sites de notícias como BBC News ou CNN e leia artigos sobre tópicos de seu interesse. Anote as palavras que você não conhece."
      },
      {
        "day": 237,
        "lesson": 237,
        "quiz": 237,
        "activity": "Leia a notícia que você encontrou ontem em voz alta. Pratique sua entonação e pronúncia. Escreva um resumo sobre a notícia e adicione o seu ponto de vista sobre ela. Confira seu texto usando Grammarly."
      },
      {
        "day": 238,
        "lesson": 238,
        "quiz": 238,
        "activity": "Jogue o Baba Dum em inglês. Sintonize estações de rádio em inglês e ouça os anúncios comerciais para praticar a compreensão auditiva. Você pode encontrar estações de rádio online no site Garden Radio, por exemplo."
      }
    ]
  },
  {
    "week": 35,
    "days": [
      {
        "day": 239,
        "lesson": 239,
        "quiz": 239,
        "activity": "Ouça a resenha de King Kong aqui. Estude as palavras e expressões destacadas da atividade. Utilize-as em frases simples, mas de contextos diferentes."
      },
      {
        "day": 240,
        "lesson": 240,
        "quiz": 240,
        "activity": "Faça a palavra cruzada do dia no site The Atlantic. Assista a desenhos animados ou programas infantis em inglês para se acostumar com o ritmo e entonação da língua. Sugestões de canais de desenhos: Peekaboo Kidz, The Kiboomers, Cocomelon."
      },
      {
        "day": 241,
        "lesson": 241,
        "quiz": 241,
        "activity": "Escolha um jogo no site TinyTap e jogue! Prefira jogos com frases completas e não somente vocabulário. Escreva sobre uma pessoa que você admira: descreva uma pessoa que você admira e explique por que ela é importante para você. Você também pode conferir seu texto usando o Grammarly. FIM DO STAGE EIGHT Congratulations!"
      },
      {
        "day": 242,
        "lesson": 242,
        "quiz": 242,
        "activity": "Descreva uma experiência cultural que você teve e como isso ampliou sua visão de mundo. Você também pode conferir seu texto usando o Grammarly. Conheça um pouco mais sobre o “British Museum”. Assista ao vídeo com legendas em inglês e prepare-se para escutar um pouco de inglês britânico."
      },
      {
        "day": 243,
        "lesson": 243,
        "quiz": 243,
        "activity": "Visite o site Word Search e procure um tema que você goste, mas que ainda não seja muito familiarizado. Comidas típicas, por exemplo. Faça a palavra cruzada e anote as novas aprendidas. Escolha pelo menos 10 dessas palavras e escreva um pequeno texto com elas e com o vocabulário que você aprendeu recentemente."
      },
      {
        "day": 244,
        "lesson": 244,
        "quiz": 244,
        "activity": "Imagine que precisa comprar uma passagem - de avião, ônibus, navio, etc. Tente visualizar a conversa que teria com o atendente e escreva-a em forma de diálogo. Chame alguém para praticar com você. Jogue uma partida de CrossWord Puzzle e divirta-se!"
      },
      {
        "day": 245,
        "lesson": 245,
        "quiz": 245,
        "activity": "Assista a este trecho de um filme com Charlie Chaplin. Conte para alguém ou se grave enquanto narra o que acontece na cena. Faça ser simples, mas use o máximo de vocabulário que souber. Use o Fluêncio para checar suas frases e o Speak Aloud para te ajudar na pronúncia."
      }
    ]
  },
  {
    "week": 36,
    "days": [
      {
        "day": 246,
        "lesson": 246,
        "quiz": 246,
        "activity": "Leia mais alguns trechos de The Little Prince. Anote e procure por palavras novas para você. Escreva um breve parágrafo sobre como você acha que esta história irá continuar."
      },
      {
        "day": 247,
        "lesson": 247,
        "quiz": 247,
        "activity": "Assista a esse vídeo sobre a Austrália. Anote os fatos mais interessantes sobre esse país."
      },
      {
        "day": 248,
        "lesson": 248,
        "quiz": 248,
        "activity": "Escolha e faça um Word Search sobre sinônimos e divirta-se! Faça cinco frases para cada uma das palavras vistas no jogo."
      },
      {
        "day": 249,
        "lesson": 249,
        "quiz": 249,
        "activity": "Assista a um TedTalks. Selecione o tema que mais se interessar e se precisar, ative as legendas do vídeo. Escreva um breve resumo do que aprendeu e se precisar, use o Reverso Contexto."
      },
      {
        "day": 250,
        "lesson": 250,
        "quiz": 250,
        "activity": "Faça a palavra cruzada diária do Washington Post para encontrar e aprender novas palavras em inglês. Explore o site ESL Lab para ouvir áudios em inglês sobre diferentes tópicos e praticar a compreensão auditiva."
      },
      {
        "day": 251,
        "lesson": 251,
        "quiz": 251,
        "activity": "Assista a um vídeo em inglês no YouTube e pratique sua compreensão auditiva: assista 15 segundos do vídeo, sem legendas e anote o que entendeu. Assista ao mesmo trecho e corrija o que for preciso. Repita esse processo algumas vezes, assistindo os próximos trechos do vídeo. Assista ao vídeo novamente a agora pratique sua pronúncia. Use o Speak Aloud para te ajudar a repetir em voz alta o que é dito, tentando imitar quem está falando."
      },
      {
        "day": 252,
        "lesson": 252,
        "quiz": 252,
        "activity": "Vamos relaxar um pouco? Escolha a melhor meditação para você no Mindful. Respire fundo e siga as instruções do áudio. Desde a última guided meditation que fizemos, liste os hábitos que conseguiu implementar na sua vida e quais ainda pode implementar."
      }
    ]
  },
  {
    "week": 37,
    "days": [
      {
        "day": 253,
        "lesson": 253,
        "quiz": 253,
        "activity": "Leia uma notícia sobre algum esporte que você gosta ou descobriu recentemente. Procure por esportes diferentes, como lacrosse ou rugby. Use sites como o BBC Sports e o Sky Sports. Faça um resumo, com suas palavras, sobre o esporte escolhido, como se tivesse que explicá- lo para alguém que nunca ouviu falar dele. Escreva e leia em voz alta."
      },
      {
        "day": 254,
        "lesson": 254,
        "quiz": 254,
        "activity": "Escolha um episódio do Podcast e escute ele todo, ou apenas a um trecho. Você pode selecionar o nível de dificuldade e baixar a transcrição do áudio. Durante seu dia, mantenha um diário em inglês e grave seus pensamentos e experiências diárias para praticar a expressão escrita e oral. Se precisar, use o Speak Aloud para te auxiliar na pronúncia."
      },
      {
        "day": 255,
        "lesson": 255,
        "quiz": 255,
        "activity": "Escreva 5 frases sobre a aula que assistiu hoje, use vocabulários aprendidos no dia. Ouça diálogos simples no site Elllo, selecione seu nível aqui. Foque em repetir em voz alta para praticar sua pronúncia e entonação."
      },
      {
        "day": 256,
        "lesson": 256,
        "quiz": 256,
        "activity": "Ouça esse áudio sobre os hábitos de consumo de chá. Responda às perguntas sobre o listening: 1. How many cups of tea are drunk in the UK every day?. 2. How are tea bags affecting teapot sales?. 3. Should you put milk in the cup before or after the tea?"
      },
      {
        "day": 257,
        "lesson": 257,
        "quiz": 257,
        "activity": "Assista a este vídeo sobre locais para se fazer uma refeição em Londres. Faça um pequeno resumo destes locais e suas comidas típicas. Analise seus hábitos alimentares. Faça duas colunas “healthy” (saudáveis) e “unhealthy” (não saudáveis) e escreva em inglês o que você costuma comer e beber em seu dia a dia. Você já fez esse exercício antes, então tente melhorar seu vocabulário e escrever frases em vez de somente palavras!"
      },
      {
        "day": 258,
        "lesson": 258,
        "quiz": 258,
        "activity": "Assista esse vídeo sobre Londres. Descreva uma de suas paisagens sem dizer seu nome. Mantenha a simplicidade, tente fazer como uma charada! Se for preciso, pesquise sobre sua história e curiosidades."
      },
      {
        "day": 259,
        "lesson": 259,
        "quiz": 259,
        "activity": "Escreva um breve resumo sobre a sua semana em inglês. Use um dicionário, como o de Oxford, caso seja necessário. Assista a um filme ou série em inglês, com legendas."
      }
    ]
  },
  {
    "week": 38,
    "days": [
      {
        "day": 260,
        "lesson": 260,
        "quiz": 260,
        "activity": "Assista a esse vídeo sobre a rotina deste piloto, sem legendas. Anote a rotina dele, e assista ao vídeo mais uma vez. Ative a legenda e confira."
      },
      {
        "day": 261,
        "lesson": 261,
        "quiz": 261,
        "activity": "Visite sites de notícias como BBC News ou CNN e leia artigos sobre tópicos de seu interesse. Escreva um breve resumo sobre a notícia."
      },
      {
        "day": 262,
        "lesson": 262,
        "quiz": 262,
        "activity": "Escolha um episódio do Podcast e escute ele todo, ou apenas a um trecho. Você pode selecionar o nível de dificuldade e baixar a transcrição do áudio. Use palavras desconhecidas que você anotou ou leu na transcrição do áudio e escreva pelo menos 5 frases com elas."
      },
      {
        "day": 263,
        "lesson": 263,
        "quiz": 263,
        "activity": "Escolha um jogo no site TinyTap e jogue! Prefira jogos com frases completas e não somente vocabulário. Faça frases usando as palavras que aprendeu durante o jogo. Tente explorar contextos e estruturas diferentes. Peça ajuda ao Fluêncio se precisar."
      },
      {
        "day": 264,
        "lesson": 264,
        "quiz": 264,
        "activity": "Assista a alguns trechos de uma série ou filme em inglês. Vamos trabalhar a pronúncia e para isso você terá que imitar as falas e expressões dos atores em cenas. Anote algumas frases e use o Speak Aloud para te ajudar. Repita várias vezes. Jogue uma partida de CrossWord Puzzle e divirta-se!"
      },
      {
        "day": 265,
        "lesson": 265,
        "quiz": 265,
        "activity": "Escreva 3 frases sobre o seu dia. Ouça diálogos simples no site Elllo, selecione seu nível como aqui. Foque em repetir em voz alta para praticar sua pronúncia e entonação. Peça ao Speak Aloud para te ajudar. Salve estes diálogos, você irá usá-los nas próximas atividades."
      },
      {
        "day": 266,
        "lesson": 266,
        "quiz": 266,
        "activity": "Leia uma pequena biografia de alguns personagens históricos no site Famous People. Tente narrar os feitos deste personagem histórico com suas palavras. Se for preciso, escreva, mas tente falar naturalmente sem o auxílio do texto, e se grave fazendo isso para checar depois. Use o Speak Aloud para te ajudar na pronúncia."
      }
    ]
  },
  {
    "week": 39,
    "days": [
      {
        "day": 267,
        "lesson": 267,
        "quiz": 267,
        "activity": "Descreva um local de lazer que você tenha visitado recentemente, avaliando-o. Pode ser de forma oral ou escrita. Agora escreva uma resenha em inglês deste local. Faça um pequeno texto e use o próprio Google para encontrar o endereço e avaliar por lá. FIM DO STAGE NINE Congratulations!"
      },
      {
        "day": 268,
        "lesson": 268,
        "quiz": 268,
        "activity": "Faça a palavra cruzada diária do Washington Post para encontrar e aprender novas palavras em inglês. Escolha pelo menos 10 dessas palavras e escreva frases com elas e com o vocabulário que você aprendeu recentemente."
      },
      {
        "day": 269,
        "lesson": 269,
        "quiz": 269,
        "activity": "Ouça o audiobook grátis do site/app Blinkist. Grave um resumo oral desse audiobook, dando sua opinião. Utilize o Speak Aloud, Google Tradutor ou um dicionário como o Oxford, para checar sua pronúncia sempre que precisar."
      },
      {
        "day": 270,
        "lesson": 270,
        "quiz": 270,
        "activity": "Jogue o The Missing Letter. Pesquise a palavra do dia no New York Times e crie pelo menos 3 frases diferentes com ela."
      },
      {
        "day": 271,
        "lesson": 271,
        "quiz": 271,
        "activity": "Assista a um TedTalks. Selecione o tema que mais se interessar e se precisar, ative as legendas do vídeo. Faça duas frases com cada palavra desconhecida que seja relevante ao tema do Ted Talk. Crie no mínimo 10 frases. Se precisar, cheque a correção com o Fluêncio."
      },
      {
        "day": 272,
        "lesson": 272,
        "quiz": 272,
        "activity": "Ouça este listening sobre Egyptian Food e escreva sua opinião sobre as comidas apresentadas. Você gostaria de prová-las? Jogue uma partida de Connections e divirta-se. Você deverá encontrar 4 palavras que pertencem ao mesmo grupo."
      },
      {
        "day": 273,
        "lesson": 273,
        "quiz": 273,
        "activity": "Experimente escrever frases com rimas, cujas últimas palavras tenham o mesmo som. Não precisam fazer sentido como num poema ou letra de música, mas, se fizer, melhor! Atividade 2: Jogue Gartic - com amigos, conhecidos ou online, em salas já criadas com temas que te agradem. Convide alguém para jogar com você."
      }
    ]
  },
  {
    "week": 40,
    "days": [
      {
        "day": 274,
        "lesson": 274,
        "quiz": 274,
        "activity": "Assista a esse vídeo sobre Easy Habits e aprenda sobre os hábitos que podem mudar a sua vida. Faça uma lista com os hábitos que você pode incorporar na sua vida."
      },
      {
        "day": 275,
        "lesson": 275,
        "quiz": 275,
        "activity": "Escolha e assista vídeos de notícias sobre o clima na CNN Weather. Escreva um breve texto como está o clima em sua região e qual é a previsão para os próximos dias."
      },
      {
        "day": 276,
        "lesson": 276,
        "quiz": 276,
        "activity": "Leia mais alguns trechos de “The Little Princie”. Busque por palavras novas e interprete o texto. Escreva 5 perguntas sobre o que você leu. Não as responda ainda."
      },
      {
        "day": 277,
        "lesson": 277,
        "quiz": 277,
        "activity": "Escute os trechos que você leu no dia anterior de “The Little Princie”. Pause as frases e repita em voz alta. Responda às perguntas que você criou no dia anterior. Cheque sua correção com o Fluêncio."
      },
      {
        "day": 278,
        "lesson": 278,
        "quiz": 278,
        "activity": "Assista a um vídeo em inglês no YouTube e pratique sua compreensão auditiva: assista 15 segundos do vídeo, sem legendas e anote o que entendeu. Assista ao mesmo trecho e corrija o que for preciso. Repita esse processo algumas vezes, assistindo os próximos trechos do vídeo. Assista ao vídeo novamente a agora pratique sua pronúncia. Use o Speak Aloud para te ajudar, e repita em voz alta o que é dito, tentando imitar quem está falando."
      },
      {
        "day": 279,
        "lesson": 279,
        "quiz": 279,
        "activity": "Aprenda com sua música favorita usando o Lyricstraining. Anote palavras novas e ao final da atividade cante a música acompanhando a letra. Escreva 5 frases com as palavras novas que você descobriu na música."
      },
      {
        "day": 280,
        "lesson": 280,
        "quiz": 280,
        "activity": "Jogue o Baba Dum em inglês. Fale um trava- línguas.Você pode encontrar alguns exemplos para iniciar aqui, no site do British Council, e também pesquisar em artigos, como este."
      }
    ]
  },
  {
    "week": 41,
    "days": [
      {
        "day": 281,
        "lesson": 281,
        "quiz": 281,
        "activity": "Escolha e faça um Word Search sobre sinônimos e divirta-se! Leia e interaja em posts de fóruns ou grupos de discussão online em inglês. Use fóruns ou grupos como o Reddit."
      },
      {
        "day": 282,
        "lesson": 282,
        "quiz": 282,
        "activity": "Escolha uma receita, leia seus ingredientes e método de preparo usado o site Tasty. Procure pelo significado das palavras que não conhece. Assista ao vídeo da receita e pratique sua pronúncia. Use o Speak Aloud para te ajudar. Se você manda bem na cozinha, faça a receita."
      },
      {
        "day": 283,
        "lesson": 283,
        "quiz": 283,
        "activity": "Leia posts das redes sociais dos seus artistas favoritos em suas redes sociais - pelo menos 10 deles, se forem curtinhos. Descubra o artista no Instagram, no Facebook e/ou no X. Assista 15 segundos de uma série ou filme, sem legendas, e anote o que entendeu. Anote palavras novas também. Se um de seus artistas favoritos estiver presente, melhor ainda!"
      },
      {
        "day": 284,
        "lesson": 284,
        "quiz": 284,
        "activity": "Escreva 5 frases sobre a aula que assistiu hoje, use vocabulários aprendidos no dia. Ouça diálogos simples no site Elllo, selecione seu nível aqui. Foque em repetir em voz alta para praticar sua pronúncia e entonação. Se precisar, use o Speak Aloud para te ajudar."
      },
      {
        "day": 285,
        "lesson": 285,
        "quiz": 285,
        "activity": "Ouça e assista à leitura de histórias no site Storyline. Procure por temas que te agradem. Não se preocupe em entender tudo o que é falado, mas sim em compreender o contexto. Expanda seu vocabulário. Pesquise algum jogo no Games to Learn e selecione a atividade que mais gostar. Tente um caça-palavras, por exemplo."
      },
      {
        "day": 286,
        "lesson": 286,
        "quiz": 286,
        "activity": "Assista a este trecho de um filme com Charlie Chaplin. Conte para alguém ou se grave enquanto narra o que acontece na cena. Use o Fluêncio e o Speak Aloud para te ajudarem na pronúncia e na construção dessa narração, mas tente soar natural."
      },
      {
        "day": 287,
        "lesson": 287,
        "quiz": 287,
        "activity": "Jogue o The Missing Letter. Pesquise a palavra do dia no New York Times e crie pelo menos 3 frases diferentes com ela."
      }
    ]
  },
  {
    "week": 42,
    "days": [
      {
        "day": 288,
        "lesson": 288,
        "quiz": 288,
        "activity": "Escolha um episódio do Podcast e escute ele todo, ou apenas a um trecho. Você pode selecionar o nível de dificuldade e baixar a transcrição do áudio. Use palavras desconhecidas que você anotou ou leu na transcrição do áudio e escreva pelo menos 5 frases com elas."
      },
      {
        "day": 289,
        "lesson": 289,
        "quiz": 289,
        "activity": "Se o site Vocabulary.com e clique em “Random Word” abaixo da barra de pesquisa. Estude a palavra gerada, faça quizzes para expandir e praticar vocabulário em inglês. Faça algumas frases com a palavra da atividade anterior. Tente explorar contextos e estruturas diferentes. Se precisar, peça ajuda ao Fluêncio para expandir seus conhecimentos."
      },
      {
        "day": 290,
        "lesson": 290,
        "quiz": 290,
        "activity": "Leia mais alguns trechos de “The Little Prince”. Selecione 10 palavras do texto e procure por sinônimos usando um dicionário. Isso vai te ajudar a expandir seu vocabulário."
      },
      {
        "day": 291,
        "lesson": 291,
        "quiz": 291,
        "activity": "Assista ao vídeo \"Imagine a world without music. Escreva algumas das respostas que foram dadas no vídeo. Com a ajuda de um dicionário, se precisar, escreva 10 adjetivos que vem em sua mente quando você pensa em música, como happy, good, fun, etc. Com a ajuda do Thesaurus, pesquise alguns sinônimos e antônimos para cada uma das palavras."
      },
      {
        "day": 292,
        "lesson": 292,
        "quiz": 292,
        "activity": "Assista a um tour pela cidade de Londres. Imagine que você está preparando a sua viagem para Londres! Monte o seu roteiro com base nas informações do vídeo."
      },
      {
        "day": 293,
        "lesson": 293,
        "quiz": 293,
        "activity": "Escolha uma cidade ou estado e divirta- se com um Word Search . Pesquise algumas curiosidades sobre a cidade ou estado escolhido, faça suas anotações. Você pode usar a Wikipédia."
      },
      {
        "day": 294,
        "lesson": 294,
        "quiz": 294,
        "activity": "Acesse o site da ONU e leia sobre as 17 metas para transformar nosso mundo em um lugar melhor. Escreva um breve resumo sobre o que você aprendeu."
      }
    ]
  },
  {
    "week": 43,
    "days": [
      {
        "day": 295,
        "lesson": 295,
        "quiz": 295,
        "activity": "Escolha e assista vídeos de notícias sobre o clima na CNN Weather. Escreva um breve texto como está o clima em sua região e qual é a previsão para os próximos dias. Pesquise em um dicionário palavras diferentes que você pode usar. Já é hora de se arriscar em frases mais complexas! Se precisar, peça auxílio ao Fluêncio."
      },
      {
        "day": 296,
        "lesson": 296,
        "quiz": 296,
        "activity": "Escreva sobre um de seus hobbies. Explique qual é, como conheceu, como aprendeu e por que você gosta dele. Procure um vídeo sobre esse seu hobby. Assista-o e anote vocabulários específicos sobre ele."
      },
      {
        "day": 297,
        "lesson": 297,
        "quiz": 297,
        "activity": "Utilize o vocabulário que aprendeu no vídeo anterior sobre seu hobby e tente escrever um pequeno texto usando essas novas palavras. Sintonize estações de rádio em inglês e ouça os anúncios comerciais para praticar a compreensão auditiva. Você pode encontrar estações de rádio online no site Radio Uk, por exemplo."
      },
      {
        "day": 298,
        "lesson": 298,
        "quiz": 298,
        "activity": "Escolha um episódio do Podcast sobre hobbies e escute ele todo, ou apenas a um trecho. Você pode selecionar o nível de dificuldade e baixar a transcrição do áudio. Foque em entender frases maiores. Escreva sobre os hobbies que descobriu ouvindo o podcast."
      },
      {
        "day": 299,
        "lesson": 299,
        "quiz": 299,
        "activity": "Escolha scripts de filmes em inglês e acompanhe enquanto assiste ao filme. Você pode encontrar vários deles no site Simply Scripts. Tente imitar um dos atores no filme que escolheu. Use as mesmas entonações e trejeitos, pratique sua pronúncia. Se precisar, use o Speak Aloud para te ajudar nisso."
      },
      {
        "day": 300,
        "lesson": 300,
        "quiz": 300,
        "activity": "Escreva uma resenha sobre o filme que assistiu no dia anterior. Pesquise sobre este filme em sites como o Letterbox. Tente encontrar discussões e resenhas sobre o mesmo e responda comentários de outros colegas, dando sua opinião sobre o mesmo. FIM DO STAGE TEN Congratulations!"
      },
      {
        "day": 301,
        "lesson": 301,
        "quiz": 301,
        "activity": "Faça a palavra cruzada do dia no site The Atlantic. Assista a desenhos animados ou programas infantis em inglês para se acostumar com o ritmo e entonação da língua. Sugestões de canais de desenhos: Peekaboo Kidz, The Kiboomers, Cocomelon."
      }
    ]
  },
  {
    "week": 44,
    "days": [
      {
        "day": 302,
        "lesson": 302,
        "quiz": 302,
        "activity": "Durante esta semana, mantenha um diário, escrevendo as coisas que fez no dia. Pesquise em um dicionário palavras diferentes que você pode usar. Já é hora de se arriscar em frases mais complexas. Jogue uma partida Letter Box."
      },
      {
        "day": 303,
        "lesson": 303,
        "quiz": 303,
        "activity": "Assista a esse vídeo no YouTube, sobre como evitar a má comunicação. Assista uma vez sem legendas e anote algumas das dicas do vídeo. Assista mais uma vez, com legendas e faça a correção. Escreva um breve resumo sobre os pontos mais interessantes do vídeo para você."
      },
      {
        "day": 304,
        "lesson": 304,
        "quiz": 304,
        "activity": "Leia mais alguns trechos de “The Little Prince”. Escute o áudio do trecho que você leu, pause e repita em voz alta. Use o Speak Aloud para te ajudar com frases ou palavras mais complexas."
      },
      {
        "day": 305,
        "lesson": 305,
        "quiz": 305,
        "activity": "Escolha a assista a um vídeo do Ted Ed. vídeo clicando em “Think”."
      },
      {
        "day": 306,
        "lesson": 306,
        "quiz": 306,
        "activity": "Jogue uma partida de Crossword Puzzle e divirta-se. Faça 5 frases com palavras vistas no jogo. Explore frases e estruturas diferentes. Se precisar, peça ao Fluêncio para te ajudar a construir frases mais complexas e corrigir as que você fez sozinho."
      },
      {
        "day": 307,
        "lesson": 307,
        "quiz": 307,
        "activity": "Jogue uma partida de Connections e divirta-se. Você deverá encontrar 4 palavras que pertencem ao mesmo grupo. Pratique uma conversa com o Fluêncio. Use este prompt “Hello! My name is [seu some].\" I'm learning English and I'd like to talk to you about [assunto que deseja conversar]. Escolha tópicos vistos nas notícias ou vídeos vistos anteriormente."
      },
      {
        "day": 308,
        "lesson": 308,
        "quiz": 308,
        "activity": "Leia seu diário semanal, de preferência em voz alta. Anote possíveis dúvidas ou correções que você já consegue fazer. Fale um trava-língua. Você pode encontrar alguns exemplos para iniciar aqui, no site do British Council, e também pesquisar em artigos, como este."
      }
    ]
  },
  {
    "week": 45,
    "days": [
      {
        "day": 309,
        "lesson": 309,
        "quiz": 309,
        "activity": "Descreva um local de lazer que você tenha visitado recentemente, avaliando-o. Pode ser de forma oral ou escrita. Busque comparar esse lugar com lugares que você visitou anteriormente. Qual é melhor, ou mais interessante, por exemplo. Agora escreva uma resenha em inglês deste local. Faça um pequeno texto e use o próprio Google para encontrar o endereço e avaliar por lá."
      },
      {
        "day": 310,
        "lesson": 310,
        "quiz": 310,
        "activity": "Jogue o The Missing Letter. Pesquise a palavra do dia no New York Times e crie pelo menos 3 frases diferentes com ela."
      },
      {
        "day": 311,
        "lesson": 311,
        "quiz": 311,
        "activity": "Faça um quiz divertido no site Merriam Webster. Selecione e escute rádios de qualquer lugar do mundo através do Radio Garden. Tente interpretar notícias ou propagandas que escuta. Não se preocupe em compreender tudo que é falado."
      },
      {
        "day": 312,
        "lesson": 312,
        "quiz": 312,
        "activity": "Escreva 5 frases sobre a aula que assistiu hoje, use vocabulários aprendidos no dia. Ouça diálogos simples no site Elllo, selecione seu nível aqui. Foque em repetir em voz alta para praticar sua pronúncia e entonação."
      },
      {
        "day": 313,
        "lesson": 313,
        "quiz": 313,
        "activity": "Vamos relaxar um pouco? Escolha a melhor meditação para você no Mindful. Respire fundo e siga as instruções do áudio. Desde a última guided meditation que fizemos, liste os hábitos que conseguiu implementar na sua vida e quais ainda pode implementar."
      },
      {
        "day": 314,
        "lesson": 314,
        "quiz": 314,
        "activity": "Ouça o audiobook grátis do site/app Blinkist. Grave um resumo oral desse audiobook, dando sua opinião. Utilize o Speak Aloud, Google Tradutor ou um dicionário como o Oxford, para checar sua pronúncia sempre que precisar."
      },
      {
        "day": 315,
        "lesson": 315,
        "quiz": 315,
        "activity": "Faça a palavra cruzada do dia no site The Atlantic. Assista a desenhos animados ou programas infantis em inglês para se acostumar com o ritmo e entonação da língua. Sugestões de canais de desenhos: Peekaboo Kidz, The Kiboomers, Cocomelon."
      }
    ]
  },
  {
    "week": 46,
    "days": [
      {
        "day": 316,
        "lesson": 316,
        "quiz": 316,
        "activity": "Leia mais alguns trechos de “The Little Prince”. Escute o trecho, pause e repita em voz alta. Escreva um breve resumo sobre o que você leu e diga quais foram seus momentos favoritos até agora."
      },
      {
        "day": 317,
        "lesson": 317,
        "quiz": 317,
        "activity": "Escute uma música que você gosta, estude a letra desta música anotando palavras e frases que você já conhece. Interprete a música. Escreva um breve texto sobre o que a música diz, como você se sente e por que você gosta dela."
      },
      {
        "day": 318,
        "lesson": 318,
        "quiz": 318,
        "activity": "Usando o Lyrics Training selecione a mesma música que você escutou no dia anterior e faça a atividade de preencher as lacunas. Ao finalizar a atividade, cante a música e pratique sua pronúncia. Use o Speak Aloud para te auxiliar nisso."
      },
      {
        "day": 319,
        "lesson": 319,
        "quiz": 319,
        "activity": "Escolha e assista a um vídeo do History Channel. Pause o vídeo e repita algumas frases. Escreva um breve resumo sobre o que você aprendeu."
      },
      {
        "day": 320,
        "lesson": 320,
        "quiz": 320,
        "activity": "Escolha a assista entrevistas que podem mudar suas perspectivas em The Diary of a CEO. Anote as ideias que achou mais interessantes."
      },
      {
        "day": 321,
        "lesson": 321,
        "quiz": 321,
        "activity": "Selecione e escute notícias na rádio NPR. Escreva um breve resumo sobre o que você leu."
      },
      {
        "day": 322,
        "lesson": 322,
        "quiz": 322,
        "activity": "Leia uma notícia sobre algum artista que você goste em sites como TMZ ou Daily Mail. Tente imitar esse artista! Se for um ator/atriz específico que você goste, procure por uma cena que você conheça, use as mesmas entonações e trejeitos. Se for um músico, tente aproximar sua pronúncia da dele enquanto ouve suas músicas. Se possível, se grave fazendo isso para checar seu progresso."
      }
    ]
  },
  {
    "week": 47,
    "days": [
      {
        "day": 323,
        "lesson": 323,
        "quiz": 323,
        "activity": "Ouça este listening sobre música na BBC. Agora escreva sobre o seu estilo de música favorito, fale sobre seus cantores favoritos e convide alguém para conhecê-lo!"
      },
      {
        "day": 324,
        "lesson": 324,
        "quiz": 324,
        "activity": "Encontre o videoclipe de um dos seus artistas favoritos do estilo musical descrito no dia anterior, e escreva uma história sobre ele - se ele já estiver contando uma história, narre-a para alguém. Se você fosse dirigir o videoclipe da sua canção favorita, como você faria? Grave ou escreva."
      },
      {
        "day": 325,
        "lesson": 325,
        "quiz": 325,
        "activity": "Vá ao Lyricstraining e pesquise sua música favorita. Aprenda com a letra da música. Anote algumas palavras da música que você achou interessante e/ou diferentes, e busque pelo seu significado caso já não saiba. Guarde-as para estudo futuro."
      },
      {
        "day": 326,
        "lesson": 326,
        "quiz": 326,
        "activity": "Crie cartões físicos, em papel mesmo, com palavras diferentes que encontrou no dia anterior, e inclua outras que você estudou recentemente e sorteie-as, desafiando-se a usá-las em frases ou conversas diferentes. Se puder, escreva essas frases para memorizar e praticar depois. Agora procure por antônimos e sinônimos dentro dessas palavras anotadas da música. Pratique a identificação de antônimos e sinônimos em inglês, expandindo seu repertório de palavras relacionadas. Use um dicionário, como o de Oxford, caso seja necessário."
      },
      {
        "day": 327,
        "lesson": 327,
        "quiz": 327,
        "activity": "Tente imitar seu cantor (a) favorito! Tente aproximar sua pronúncia da dele enquanto ouve suas músicas. Se possível, se grave fazendo isso para checar seu progresso. Use o Speak Aloud para te ajudar nisso. Pesquise sobre a “the Chitlinʼ Circuit”, explicada este listening e escreva um pequeno texto sobre."
      },
      {
        "day": 328,
        "lesson": 328,
        "quiz": 328,
        "activity": "Leia este trecho sobre “nostalgic memory” e anote as palavras ou expressões que não conhecer. Agora assista este vídeo sobre o mesmo assunto. Não se preocupe em entender tudo, mas sim o seu contexto e as conexões com o texto anterior."
      },
      {
        "day": 329,
        "lesson": 329,
        "quiz": 329,
        "activity": "Faça um breve resumo sobre o vídeo sobre nostalgic memory que assistiu no dia anterior. Responda, grave ou escreva: for you, what is your strongest nostalgic memory so far? Why do you think itʼs the strongest? How do you feel when you think of it? Você também pode conversar com o Fluêncio sobre o assunto!"
      }
    ]
  },
  {
    "week": 48,
    "days": [
      {
        "day": 330,
        "lesson": 330,
        "quiz": 330,
        "activity": "Divirta-se com entrevistas diferentes de The Hot Ones. Escolha um dos vídeos e preste atenção nos tópicos Escreva mais 5 perguntas para complementar a entrevista. FIM DO STAGE ELEVEN Congratulations!"
      },
      {
        "day": 331,
        "lesson": 331,
        "quiz": 331,
        "activity": "Use o site Vocabulary.com e clique em “Random Word” abaixo da barra de pesquisa. Estude a palavra gerada, faça quizzes para expandir e praticar vocabulário em inglês. Faça 5 frases usando a palavra que você aprendeu na atividade anterior. Explore diferentes contextos e estruturas. Peça ajuda ao Fluêncio para corrigi-las."
      },
      {
        "day": 332,
        "lesson": 332,
        "quiz": 332,
        "activity": "Assista a desenhos animados ou programas infantis em inglês para se acostumar com o ritmo e entonação da língua. Sugestões de canais de desenhos: Peekaboo Kidz, The Kiboomers, Cocomelon. Imagine que você é um roteirista e agora irá criar mais um episódio do desenho que assistiu. Escreva um breve resumo sobre isso."
      },
      {
        "day": 333,
        "lesson": 333,
        "quiz": 333,
        "activity": "Leia mais alguns trechos de “The Little Pince”. Selecione o nível 2 ou 3 para ter um desafio maior. Escute o áudio da história, pause e repita em voz alta."
      },
      {
        "day": 334,
        "lesson": 334,
        "quiz": 334,
        "activity": "Jogue Gartic - com amigos, conhecidos ou online, em salas já criadas com temas que te agradem. Convide alguém para jogar com você. Escreva sobre como tem sido a sua rotina nestes últimos meses, o que tem feito e quais são as suas expectativas para os próximos meses. Você também pode conferir seu texto usando o Grammarly ou pedir ao Fluêncio para corrigi-lo."
      },
      {
        "day": 335,
        "lesson": 335,
        "quiz": 335,
        "activity": "Escolha um episódio do Podcast e escute ele todo, ou apenas a um trecho. Você pode selecionar o nível de dificuldade e baixar a transcrição do áudio. Escreva um breve resumo e sua opinião sobre o tópico abordado no Podcast."
      },
      {
        "day": 336,
        "lesson": 336,
        "quiz": 336,
        "activity": "Faça um quiz divertido no site Merriam Webster. Selecione e escute rádios de qualquer lugar do mundo através do Radio Garden. Tente interpretar notícias ou propagandas que escuta. Não se preocupe em compreender tudo que é falado."
      }
    ]
  },
  {
    "week": 49,
    "days": [
      {
        "day": 337,
        "lesson": 337,
        "quiz": 337,
        "activity": "Escolha e faça um Word Search sobre sinônimos e divirta-se! Leia e interaja em posts de fóruns ou grupos de discussão online em inglês. Use fóruns ou grupos como o Reddit."
      },
      {
        "day": 338,
        "lesson": 338,
        "quiz": 338,
        "activity": "Leia posts das redes sociais dos seus artistas favoritos em suas redes sociais - pelo menos 10 deles, se forem curtinhos. Descubra o artista no Instagram, no Facebook e/ou no X. Assista 15 segundos de uma série ou filme, sem legendas, e anote o que entendeu. Anote palavras novas também. Se um de seus artistas favoritos estiver presente, melhor ainda!"
      },
      {
        "day": 339,
        "lesson": 339,
        "quiz": 339,
        "activity": "Ouça e assista à leitura de histórias no site Storyline. Procure por temas que te agradem. Não se preocupe em entender tudo o que é falado, mas sim em compreender o contexto. Expanda seu vocabulário. Use o site Games to Learn e selecione a atividade que mais gostar."
      },
      {
        "day": 340,
        "lesson": 340,
        "quiz": 340,
        "activity": "Faça a palavra cruzada do dia no site The Atlantic. Pesquise por um restaurante famoso em algum país de língua inglesa. Você pode usar termos como “famous restaurantes in The USA”, ou “top 10 restaurants in Australia”, por exemplo. Escolha pelo menos 3 deles e entre em seus sites oficiais. Leia em voz alta o menu, a história (se houver), pesquise vocabulários específicos e leia resenhas de frequentadores."
      },
      {
        "day": 341,
        "lesson": 341,
        "quiz": 341,
        "activity": "Escolha a assista a um vídeo do Ted Ed. vídeo clicando em “Think”."
      },
      {
        "day": 342,
        "lesson": 342,
        "quiz": 342,
        "activity": "Escolha e assista a um vídeo do History Channel. Pause o vídeo e repita algumas frases. Escreva um breve resumo sobre o que você aprendeu."
      },
      {
        "day": 343,
        "lesson": 343,
        "quiz": 343,
        "activity": "Faça a palavra cruzada diária do Washington Post para encontrar e aprender novas palavras em inglês. Escolha pelo menos 10 dessas palavras e escreva frases com elas e com o vocabulário que você aprendeu recentemente. Use estruturas mais complexas, se preciso peça ajuda ao Fluêncio."
      }
    ]
  },
  {
    "week": 50,
    "days": [
      {
        "day": 344,
        "lesson": 344,
        "quiz": 344,
        "activity": "Leia mais alguns trechos de The Little Prince. Lembre-se de sempre escutar e repetir a história em voz alta. Escreva um breve texto sobre as conclusões que podemos tirar desta história."
      },
      {
        "day": 345,
        "lesson": 345,
        "quiz": 345,
        "activity": "Aprenda com sua música favorita usando o Lyricstraining. Tente imitar seu cantor(a) favorito! Tente aproximar sua pronúncia da dele enquanto ouve suas músicas. Se possível, se grave fazendo isso para checar seu progresso. Use o Speak Aloud para te ajudar nisso."
      },
      {
        "day": 346,
        "lesson": 346,
        "quiz": 346,
        "activity": "Leia este artigo sobre “Neuroscientists Reveal Secret of Superagers' Excellent Memories”. Anote o que achou de mais interessante e dê sua opinião."
      },
      {
        "day": 347,
        "lesson": 347,
        "quiz": 347,
        "activity": "Assista ao vídeo “Why are earthquakes so hard to predict?”. Realize o quiz após o vídeo clicando em “think”. Clique em “Dig deeper” para uma leitura complementar sobre o tema."
      },
      {
        "day": 348,
        "lesson": 348,
        "quiz": 348,
        "activity": "Ouça diálogos simples no site Elllo, selecione seu nível mais avançado. Foque em repetir em voz alta para praticar sua pronúncia e entonação. Continue a história do diálogo eu escutou, crie ao menos mais 5 frases. Foque no uso de vocabulários e estruturas mais complexas. Se precisar, peça ajuda ao Fluêncio."
      },
      {
        "day": 349,
        "lesson": 349,
        "quiz": 349,
        "activity": "Leia um poema em voz alta, tente dramatizá-lo. Procure poemas em sites como o Project Gutenberg. Jogue algumas partidas de Letter Box."
      },
      {
        "day": 350,
        "lesson": 350,
        "quiz": 350,
        "activity": "Pratique uma conversa com o Fluêncio. Use este prompt “Hello! My name is [seu some].\" I'm learning English and I'd like talk to you about [assunto que deseja conversar]. Você pode escolher tópicos dentre os vários que já viu por aqui. Peça para a ele para corrigir a sua conversa e sugerir frases mais naturais. Analise seus erros, anote palavras novas ou continue conversando."
      }
    ]
  },
  {
    "week": 51,
    "days": [
      {
        "day": 351,
        "lesson": 351,
        "quiz": 351,
        "activity": "Escolha um destino no site de Rick Steves que oferece guias turísticos em áudio gratuitos para várias cidades e regiões da Europa. E ouça sobre ele. Agora imagine que você está fazendo uma viagem para este lugar específico. Crie seu próprio roteiro - use o Google Maps para te ajudar a escolher os lugares, e também nos conte quantos dias são necessários para conhecer todos os que você gostaria."
      },
      {
        "day": 352,
        "lesson": 352,
        "quiz": 352,
        "activity": "Pegue seu roteiro do dia anterior, escolha dois ou três lugares específicos, pesquise mais a fundo sobre eles e escreva seus motivos para visitá-los. Procure um vídeo no YouTube sobre alguém que já tenha visitado esses lugares, use o nome dele + “vlog” na pesquisa para encontrar vídeos mais divertidos e casuais. Assista e faça suas anotações sobre vocabulários e entonações!"
      },
      {
        "day": 353,
        "lesson": 353,
        "quiz": 353,
        "activity": "Conte-nos sobre uma viagem, férias ou local de lazer que você tenha visitado recentemente, dando sua opinião sobre ele. Tente gravar sem ler um texto ou roteiro, seja o mais natural possível, e reveja depois para checar seu progresso e se autocorrigir. Escreva uma resenha em inglês deste local. Use o próprio Google para encontrar o endereço e avaliar por lá."
      },
      {
        "day": 354,
        "lesson": 354,
        "quiz": 354,
        "activity": "Volte ao listening e ao local sobre o qual você fez o roteiro de viagem. Pesquise comidas típicas e aprenda sua receita no YouTube ou usando o site Tasty. Converse com o Fluêncio sobre comidas típicas. Aprenda um pouco mais sobre elas e seus ingredientes. Use prompts como: “Hello! Iʼm [seu nome] and Iʼd like to talk about ethnic and typical foods. Can you recommend me some?”."
      },
      {
        "day": 355,
        "lesson": 355,
        "quiz": 355,
        "activity": "Imagine que precisa comprar uma passagem para o local que você fez o roteiro - de avião, ônibus, navio, etc. Tente visualizar todas as rotas para chegar lá. Qual conversa teria com o atendente? Escreva- a em forma de diálogo. Chame alguém para praticar com você. Jogue uma partida de CrossWord Puzzle e divirta-se!"
      },
      {
        "day": 356,
        "lesson": 356,
        "quiz": 356,
        "activity": "Assista a este vídeo sobre os melhores locais para se visitar. Anote os países e locais citados, e nos conte quais deles você gostaria ou não de visitar e o motivo. Grave sua resposta para checar depois. Use o Speak Aloud para checar sua pronúncia se for preciso."
      },
      {
        "day": 357,
        "lesson": 357,
        "quiz": 357,
        "activity": "Descreva um projeto que você gostaria de realizar no futuro e como planeja fazê- lo. Jogue uma partida de Connections e divirta-se. Você deverá encontrar 4 palavras que pertencem ao mesmo grupo."
      }
    ]
  },
  {
    "week": 52,
    "days": [
      {
        "day": 358,
        "lesson": 358,
        "quiz": 358,
        "activity": "Escolha e leia uma notícia na Newsweek. Anote algumas das palavras que você compreendeu e pesquise por sinônimos delas usando um dicionário. Isso vai te ajudar a expandir seu vocabulário."
      },
      {
        "day": 359,
        "lesson": 359,
        "quiz": 359,
        "activity": "É hora de relaxar e tentar uma meditação guiada em inglês. Abre o Mindful escolha a meditação perfeita para você, respire fundo e siga as instruções do áudio. Use o site Vocabulary.com e clique em “Random Word” abaixo da barra de pesquisa. Estude a palavra gerada, faça quizzes para expandir e praticar vocabulário em inglês."
      },
      {
        "day": 360,
        "lesson": 360,
        "quiz": 360,
        "activity": "Estamos chegando ao final do Cronograma dos Fluentes. Escreva um texto ou grave um vídeo sobre como foi a sua trajetória. Celebre a sua vitória!"
      }
    ]
  }
]
