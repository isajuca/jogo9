export const INITIAL_QUESTIONS = [
  {
    id: 1,
    categoria: "Mudanças Climáticas",
    afirmativa: "O aquecimento global é causado principalmente pela emissão de gases de efeito estufa gerados por atividades humanas.",
    correta: true,
    explicacao: "O aquecimento global é causado principalmente pela emissão de gases de efeito estufa, como CO₂, gerados por atividades humanas, como a queima de combustíveis fósseis, o desmatamento e a agropecuária.",
    dica: "Os gases de efeito estufa retêm o calor na atmosfera, causando o aumento da temperatura média do planeta."
  },
  {
    id: 2,
    categoria: "Energia Limpa",
    afirmativa: "As energias renováveis, como solar e eólica, são alternativas viáveis para reduzir a dependência de combustíveis fósseis.",
    correta: true,
    explicacao: "As energias renováveis, como solar e eólica, são sim alternativas viáveis para reduzir a dependência de combustíveis fósseis. Elas ajudam a diminuir a emissão de gases de efeito estufa e contribuem para um futuro mais sustentável.",
    dica: "As energias renováveis são fontes limpas e inesgotáveis, como a solar, eólica, hídrica e biomassa."
  },
  {
    id: 3,
    categoria: "Efeito Estufa",
    afirmativa: "O efeito estufa é um fenômeno 100% prejudicial que passou a existir apenas após a Revolução Industrial.",
    correta: false,
    explicacao: "O efeito estufa é um fenômeno natural e essencial para manter a Terra aquecida em uma temperatura adequada à vida. O problema ambiental ocorre porque as atividades humanas têm intensificado esse efeito além do normal.",
    dica: "Sem o efeito estufa natural, a temperatura média da Terra seria cerca de -18 °C, impossibilitando a vida como conhecemos."
  },
  {
    id: 4,
    categoria: "Resíduos e Reciclagem",
    afirmativa: "O plástico descartado incorretamente na natureza se decompõe de forma rápida, desaparecendo em menos de 5 anos.",
    correta: false,
    explicacao: "Os plásticos derivados do petróleo levam centenas de anos (de 100 a mais de 400 anos) para se decompor, fragmentando-se em microplásticos que poluem rios, oceanos e a cadeia alimentar.",
    dica: "Reduzir o uso de plásticos descartáveis e separar os recicláveis são atitudes essenciais para proteger os ecossistemas."
  },
  {
    id: 5,
    categoria: "Recursos Hídricos",
    afirmativa: "Menos de 3% de toda a água do planeta Terra é doce, e a maior parte dela está concentrada em geleiras e calotas polares.",
    correta: true,
    explicacao: "Embora a Terra seja coberta por água, cerca de 97,5% está nos oceanos e mares (água salgada). Dos 2,5% de água doce restantes, quase 70% encontra-se congelada nas regiões polares e geleiras.",
    dica: "Apenas cerca de 1% da água doce do mundo está facilmente acessível em rios, lagos e aquíferos para consumo humano."
  },
  {
    id: 6,
    categoria: "Biomas e Clima",
    afirmativa: "O desmatamento na Floresta Amazônica afeta apenas o clima da região Norte, sem influenciar as chuvas no restante do Brasil.",
    correta: false,
    explicacao: "A Floresta Amazônica libera bilhões de litros de vapor d'água todos os dias pela transpiração das árvores, formando os chamados 'rios voadores', que levam chuva para o Centro-Oeste, Sudeste e Sul do país.",
    dica: "Preservar a Amazônia ajuda a manter o equilíbrio das chuvas, da agricultura e dos reservatórios de água em todo o Brasil."
  },
  {
    id: 7,
    categoria: "Consumo Consciente",
    afirmativa: "A Pegada Ecológica mede a quantidade de recursos naturais necessários para sustentar os nossos hábitos de consumo e estilo de vida.",
    correta: true,
    explicacao: "A Pegada Ecológica avalia o impacto que nossas escolhas diárias — como alimentação, transporte, uso de água, energia e geração de lixo — causam sobre a capacidade de regeneração do planeta.",
    dica: "Consumir de forma consciente, evitar desperdícios e economizar energia diminuem a nossa pegada ecológica."
  },
  {
    id: 8,
    categoria: "Desenvolvimento Sustentável",
    afirmativa: "O Desenvolvimento Sustentável busca suprir as necessidades da geração atual sem comprometer os recursos das próximas gerações.",
    correta: true,
    explicacao: "Esse é o princípio fundamental da sustentabilidade definido pela ONU: conciliar o desenvolvimento econômico e social com a conservação ambiental para garantir o futuro do planeta.",
    dica: "O tripé da sustentabilidade equilibra três dimensões essenciais: Ambiental, Social e Econômica."
  },
  {
    id: 9,
    categoria: "Economia Circular",
    afirmativa: "Nos 5 Rs da sustentabilidade (Repensar, Recusar, Reduzir, Reutilizar e Reciclar), reciclar deve ser sempre a primeira atitude antes de reduzir o consumo.",
    correta: false,
    explicacao: "Embora reciclar seja muito importante, a prioridade é sempre Repensar os hábitos, Recusar produtos que agridem o ambiente e Reduzir o consumo desnecessário para evitar que o lixo seja gerado.",
    dica: "O melhor resíduo é aquele que nem chega a ser produzido: repensar e reduzir vêm sempre em primeiro lugar!"
  },
  {
    id: 10,
    categoria: "Lixo Eletrônico",
    afirmativa: "Pilhas, baterias e celulares antigos podem ser jogados no lixo comum, pois seus componentes se misturam ao solo sem causar contaminação.",
    correta: false,
    explicacao: "O lixo eletrônico (e-lixo) possui metais pesados como mercúrio, chumbo e cádmio. Quando descartados no lixo comum, esses elementos podem contaminar o solo e os lençóis freáticos.",
    dica: "Sempre descarte pilhas, baterias e eletrônicos em pontos de coleta específicos ou locais de logística reversa."
  },
  {
    id: 11,
    categoria: "Oceanos e Vida Marinha",
    afirmativa: "O aumento da temperatura e da acidez dos oceanos causa o branqueamento dos corais, colocando em risco milhares de espécies marinhas.",
    correta: true,
    explicacao: "Os oceanos absorvem grande parte do calor e do gás carbônico (CO₂) em excesso na atmosfera, tornando a água mais ácida e quente, o que expulsa as microalgas que mantêm os corais vivos.",
    dica: "Os recifes de corais abrigam cerca de 25% de toda a vida marinha do planeta, apesar de ocuparem menos de 1% do fundo do mar."
  },
  {
    id: 12,
    categoria: "Gases de Efeito Estufa",
    afirmativa: "O gás carbônico (CO₂) é o único gás existente na atmosfera capaz de provocar o efeito estufa.",
    correta: false,
    explicacao: "Além do dióxido de carbono (CO₂), outros gases como o metano (CH₄), o óxido nitroso (N₂O) e o próprio vapor d'água também retêm calor e participam intensamente do efeito estufa.",
    dica: "O gás metano (CH₄), liberado na decomposição de lixo orgânico e na pecuária, tem alto potencial de aquecimento."
  },
  {
    id: 13,
    categoria: "Coleta Seletiva",
    afirmativa: "Na coleta seletiva padronizada no Brasil, a lixeira azul é destinada ao descarte de papéis e papelões.",
    correta: true,
    explicacao: "Segundo o padrão do CONAMA, a cor azul representa papel/papelão, o vermelho é para plástico, o verde para vidro, o amarelo para metal e o marrom para resíduos orgânicos.",
    dica: "Separar os resíduos secos dos orgânicos facilita o trabalho das cooperativas de reciclagem e reduz o lixo nos aterros."
  },
  {
    id: 14,
    categoria: "Coleta Seletiva",
    afirmativa: "Espelhos quebrados, lâmpadas fluorescentes e cerâmicas devem ser descartados junto com garrafas de vidro comum na lixeira verde.",
    correta: false,
    explicacao: "Espelhos, cerâmicas, porcelanas e lâmpadas possuem composições químicas diferentes do vidro de embalagens e não devem ser misturados na coleta comum de vidro.",
    dica: "Lâmpadas fluorescentes contêm vapor de mercúrio e precisam ser entregues em pontos de descarte específicos."
  },
  {
    id: 15,
    categoria: "Biomas Brasileiros",
    afirmativa: "O Cerrado é conhecido como a 'caixa d'água do Brasil' porque abriga nascentes de importantes bacias hidrográficas do país.",
    correta: true,
    explicacao: "As raízes profundas da vegetação do Cerrado ajudam a infiltrar a água da chuva no solo, abastecendo grandes aquíferos e rios como o São Francisco, Tocantins e Paraná.",
    dica: "O Cerrado é a savana com maior biodiversidade do mundo, mas já perdeu cerca de metade de sua vegetação original."
  },
  {
    id: 16,
    categoria: "Biomas Brasileiros",
    afirmativa: "A Caatinga é um bioma encontrado em vários continentes do mundo, possuindo baixíssima variedade de plantas e animais.",
    correta: false,
    explicacao: "A Caatinga é um bioma 100% brasileiro (exclusivo do Brasil) e possui uma rica biodiversidade adaptada ao clima semiárido, com muitas espécies que não existem em nenhum outro lugar.",
    dica: "Mesmo parecendo seca na estiagem, a Caatinga floresce e fica totalmente verde rapidamente com a chegada das chuvas."
  },
  {
    id: 17,
    categoria: "Combustíveis Fósseis",
    afirmativa: "O carvão mineral, o petróleo e o gás natural são chamados de combustíveis fósseis e levam milhões de anos para se formar na natureza.",
    correta: true,
    explicacao: "Esses recursos se formaram a partir da decomposição de restos de plantas e animais soterrados há milhões de anos, sendo considerados fontes de energia não renováveis.",
    dica: "A queima de combustíveis fósseis em veículos e termelétricas é a maior fonte mundial de emissão de CO₂."
  },
  {
    id: 18,
    categoria: "Energia Solar",
    afirmativa: "Os painéis solares fotovoltaicos só conseguem gerar energia elétrica em dias de sol intenso, parando totalmente quando o céu está nublado.",
    correta: false,
    explicacao: "Mesmo em dias nublados, a radiação solar atravessa as nuvens e permite que os painéis fotovoltaicos continuem gerando eletricidade, ainda que em menor quantidade do que num dia limpo.",
    dica: "O Brasil possui um dos maiores potenciais de geração de energia solar do mundo devido à sua alta incidência de sol o ano todo."
  },
  {
    id: 19,
    categoria: "Compostagem",
    afirmativa: "A compostagem é um processo biológico que transforma restos de alimentos, como cascas de frutas e verduras, em adubo rico em nutrientes.",
    correta: true,
    explicacao: "Microrganismos e minhocas decompõem a matéria orgânica de forma controlada, gerando o composto orgânico (húmus) e evitando que esses resíduos produzam gás metano nos lixões.",
    dica: "Cerca de metade do lixo domiciliar produzido no Brasil é orgânico e poderia ser reaproveitado por meio da compostagem."
  },
  {
    id: 20,
    categoria: "Água Virtual",
    afirmativa: "A 'água virtual' refere-se apenas à água que bebemos diretamente da torneira ou de garrafas ao longo do dia.",
    correta: false,
    explicacao: "A água virtual é toda a água utilizada de forma invisível na produção de alimentos, roupas e objetos — desde a irrigação das lavouras até os processos industriais.",
    dica: "Para produzir apenas uma calça jeans, por exemplo, são gastos milhares de litros de água em toda a cadeia produtiva!"
  },
  {
    id: 21,
    categoria: "Poluição Atmosférica",
    afirmativa: "A inversão térmica é um fenômeno natural que, nas grandes cidades poluídas, dificulta a dispersão dos poluentes próximos ao solo.",
    correta: true,
    explicacao: "Mais comum no inverno, a inversão térmica ocorre quando uma camada de ar frio fica retida perto do chão sob uma camada de ar quente, impedindo que a fumaça suba e se disperse.",
    dica: "Esse acúmulo de poluentes agrava problemas respiratórios na população urbana durante os meses mais frios e secos."
  },
  {
    id: 22,
    categoria: "Camada de Ozônio",
    afirmativa: "O buraco na camada de ozônio e o efeito estufa são exatamente o mesmo fenômeno atmosférico.",
    correta: false,
    explicacao: "São fenômenos distintos! A camada de ozônio filtra os raios ultravioleta (UV) do Sol na estratosfera, enquanto o efeito estufa está ligado à retenção de calor na atmosfera.",
    dica: "A redução do uso de gases CFCs (como em antigos aerossóis e geladeiras) ajudou a camada de ozônio a se recuperar gradualmente."
  },
  {
    id: 23,
    categoria: "Descarte de Óleo",
    afirmativa: "Jogar óleo de cozinha usado pelo ralo da pia polui milhares de litros de água e prejudica o tratamento de esgoto.",
    correta: true,
    explicacao: "Apenas 1 litro de óleo de cozinha pode contaminar até 25 mil litros de água, formando uma película que impede a oxigenação da água e entope tubulações.",
    dica: "O óleo de cozinha usado pode ser armazenado em garrafas PET e entregue para fabricação de sabão ecológico e biodiesel."
  },
  {
    id: 24,
    categoria: "Reciclagem de Alumínio",
    afirmativa: "Reciclar latinhas de alumínio gasta muito mais energia elétrica do que produzir alumínio novo a partir do minério de bauxita.",
    correta: false,
    explicacao: "Pelo contrário! A reciclagem do alumínio economiza cerca de 95% da energia elétrica que seria necessária para extrair e refinar a bauxita na indústria.",
    dica: "O alumínio pode ser reciclado infinitas vezes sem perder suas propriedades e qualidade original."
  },
  {
    id: 25,
    categoria: "Desmatamento e Solo",
    afirmativa: "A retirada da mata ciliar (vegetação nas margens dos rios) acelera a erosão e provoca o assoreamento dos rios.",
    correta: true,
    explicacao: "A mata ciliar funciona como os 'cílios' de proteção do rio: suas raízes seguram a terra das margens. Sem ela, a chuva arrasta terra e areia para o fundo do rio, tornando-o raso.",
    dica: "Preservar as matas ciliares evita enchentes, protege nascentes e garante abrigo e alimento para a fauna aquática."
  },
  {
    id: 26,
    categoria: "Biodiversidade",
    afirmativa: "A introdução de espécies exóticas invasoras em um ecossistema sempre aumenta de forma saudável a biodiversidade local.",
    correta: false,
    explicacao: "Espécies exóticas invasoras muitas vezes não possuem predadores naturais no novo ambiente, competindo por alimento e espaço e podendo levar espécies nativas à extinção.",
    dica: "As espécies invasoras são consideradas uma das maiores causas de perda de biodiversidade em todo o planeta."
  },
  {
    id: 27,
    categoria: "Mobilidade Sustentável",
    afirmativa: "Priorizar o transporte coletivo, bicicletas e deslocamentos a pé ajuda a diminuir a emissão de gases poluentes nas cidades.",
    correta: true,
    explicacao: "Menos carros individuais nas ruas significa menor queima de gasolina e diesel, reduzindo tanto a emissão de CO₂ quanto os congestionamentos e a poluição sonora.",
    dica: "Um único ônibus pode substituir dezenas de carros particulares no trânsito, economizando combustível e espaço urbano."
  },
  {
    id: 28,
    categoria: "Aterros e Lixões",
    afirmativa: "Um lixão a céu aberto e um aterro sanitário funcionam exatamente da mesma maneira, sem nenhuma proteção ao solo.",
    correta: false,
    explicacao: "No lixão, os resíduos são jogados diretamente no solo sem controle. Já o aterro sanitário impermeabiliza o solo, coleta o chorume (líquido poluente) e capta os gases gerados.",
    dica: "O tratamento correto do chorume evita a contaminação das águas subterrâneas próximas aos aterros."
  },
  {
    id: 29,
    categoria: "Chuva Ácida",
    afirmativa: "A chuva ácida é agravada pela emissão de gases poluentes, como óxidos de enxofre e de nitrogênio liberados por indústrias e veículos.",
    correta: true,
    explicacao: "Esses gases reagem com o vapor d'água na atmosfera formando ácidos que caem com a chuva, prejudicando plantações, florestas, lagos e corroendo monumentos históricos.",
    dica: "Filtros industriais e combustíveis menos poluentes são essenciais para reduzir a formação de chuva ácida."
  },
  {
    id: 30,
    categoria: "Ilhas de Calor",
    afirmativa: "As 'ilhas de calor' ocorrem quando áreas rurais arborizadas ficam muito mais quentes do que o centro asfaltado das grandes cidades.",
    correta: false,
    explicacao: "É o oposto! As ilhas de calor ocorrem nos centros urbanos, onde o excesso de asfalto, concreto, poluição e a falta de árvores fazem a temperatura ficar mais alta que nas áreas verdes vizinhas.",
    dica: "O plantio de árvores urbanas, parques e telhados verdes ajuda a refrescar as cidades e amenizar as ilhas de calor."
  },
  {
    id: 31,
    categoria: "Eficiência Energética",
    afirmativa: "Substituir lâmpadas incandescentes ou fluorescentes antigas por lâmpadas de LED reduz significativamente o consumo de energia elétrica.",
    correta: true,
    explicacao: "As lâmpadas de LED convertem a maior parte da eletricidade em luz em vez de calor, consumindo até 80% menos energia e durando muito mais tempo.",
    dica: "Além de economizar na conta de luz, o LED não contém mercúrio em sua composição."
  },
  {
    id: 32,
    categoria: "Biocombustíveis",
    afirmativa: "O etanol produzido a partir da cana-de-açúcar e o biodiesel são exemplos de combustíveis fósseis não renováveis.",
    correta: false,
    explicacao: "O etanol e o biodiesel são biocombustíveis renováveis, pois são produzidos a partir de biomassa vegetal (como cana-de-açúcar, milho e óleos vegetais), que absorve CO₂ durante seu crescimento.",
    dica: "O Brasil é pioneiro mundial no uso de biocombustíveis renováveis na frota de veículos."
  },
  {
    id: 33,
    categoria: "Objetivos da ONU (ODS)",
    afirmativa: "Os Objetivos de Desenvolvimento Sustentável (ODS) da Agenda 2030 da ONU incluem metas como água potável, energia limpa e ação contra a mudança global do clima.",
    correta: true,
    explicacao: "A Agenda 2030 reúne 17 Objetivos de Desenvolvimento Sustentável criados para erradicar a pobreza, proteger o meio ambiente e garantir paz e prosperidade para todos.",
    dica: "Os ODS mostram que cuidar do meio ambiente caminha junto com educação de qualidade, saúde e redução das desigualdades."
  },
  {
    id: 34,
    categoria: "Microplásticos",
    afirmativa: "Os microplásticos presentes nos oceanos afetam apenas pequenos peixes, nunca chegando à alimentação dos seres humanos.",
    correta: false,
    explicacao: "Partículas minúsculas de plástico são ingeridas pelo plâncton e por peixes menores, acumulando-se ao longo da cadeia alimentar até chegar aos frutos do mar, à água e ao sal consumidos por humanos.",
    dica: "Evitar plásticos de uso único (como canudos, copos e sacolas descartáveis) reduz a geração de microplásticos."
  },
  {
    id: 35,
    categoria: "Agroecologia",
    afirmativa: "A rotação de culturas e os sistemas agroflorestais ajudam a conservar os nutrientes do solo e evitam seu esgotamento.",
    correta: true,
    explicacao: "Alternar diferentes tipos de plantas e integrar árvores à lavoura protege o solo contra a erosão, melhora a infiltração de água e reduz a necessidade de agrotóxicos.",
    dica: "A agricultura sustentável produz alimentos saudáveis enquanto recupera e protege a biodiversidade local."
  },
  {
    id: 36,
    categoria: "Agrotóxicos",
    afirmativa: "O uso excessivo e descontrolado de agrotóxicos nas lavouras não afeta abelhas e outros insetos polinizadores.",
    correta: false,
    explicacao: "Muitos pesticidas atingem diretamente as abelhas, borboletas e outros polinizadores, provocando o declínio de suas populações e ameaçando a reprodução de diversas plantas e cultivos agrícolas.",
    dica: "Mais de 75% das culturas alimentares do mundo dependem, em alguma medida, da polinização realizada por animais como as abelhas."
  },
  {
    id: 37,
    categoria: "Derretimento Polar",
    afirmativa: "O derretimento das geleiras continentais e das calotas polares contribui diretamente para a elevação do nível dos oceanos.",
    correta: true,
    explicacao: "Com o aquecimento global, grandes massas de gelo que estavam sobre os continentes (como na Groenlândia e na Antártida) derretem e escoam para o mar, aumentando o volume dos oceanos.",
    dica: "O aumento do nível do mar ameaça cidades costeiras, ilhas e ecossistemas litorâneos como os manguezais."
  },
  {
    id: 38,
    categoria: "Manguezais",
    afirmativa: "Os manguezais são áreas pantanosas sem importância ecológica que deveriam ser aterradas para dar lugar a construções.",
    correta: false,
    explicacao: "Os manguezais são verdadeiros 'berçários da vida marinha', onde inúmeras espécies de peixes, crustáceos e aves se reproduzem, além de protegerem a costa contra a erosão e estocarem muito carbono.",
    dica: "Preservar os manguezais garante tanto o equilíbrio da vida marinha quanto o sustento de comunidades pesqueiras."
  },
  {
    id: 39,
    categoria: "Obsolescência Programada",
    afirmativa: "A 'obsolescência programada' ocorre quando produtos são fabricados para durar pouco tempo, estimulando a compra frequente de novos aparelhos e aumentando o lixo.",
    correta: true,
    explicacao: "Quando eletrônicos, roupas ou eletrodomésticos perdem a utilidade rapidamente ou são difíceis de consertar, o consumo de matérias-primas e o descarte de resíduos crescem de forma insustentável.",
    dica: "Consertar aparelhos, doar o que ainda funciona e escolher produtos duráveis são formas de combater o desperdício."
  },
  {
    id: 40,
    categoria: "Energia Hidrelétrica",
    afirmativa: "Apesar de usar uma fonte renovável (a água), a construção de grandes usinas hidrelétricas ainda pode causar impactos ambientais e sociais na região alagada.",
    correta: true,
    explicacao: "O represamento de grandes rios pode inundar áreas de floresta, alterar a reprodução dos peixes e exigir o deslocamento de populações ribeirinhas e indígenas.",
    dica: "Toda fonte de energia requer planejamento ambiental cuidadoso para minimizar impactos sobre a natureza e as comunidades."
  },
  {
    id: 41,
    categoria: "Queimadas",
    afirmativa: "As queimadas em florestas e pastagens ajudam a limpar o ar e enriquecem permanentemente a biodiversidade do solo.",
    correta: false,
    explicacao: "As queimadas lançam enormes quantidades de CO₂ e fumaça tóxica na atmosfera, matam animais silvestres e destroem os microrganismos que mantêm o solo fértil a longo prazo.",
    dica: "A maioria dos incêndios florestais no Brasil tem origem em ações humanas e se espalha rapidamente em períodos de seca."
  },
  {
    id: 42,
    categoria: "Mata Atlântica",
    afirmativa: "A Mata Atlântica é um bioma brasileiro que, apesar de ter sofrido intenso desmatamento histórico, ainda abriga altíssima biodiversidade e espécies exclusivas.",
    correta: true,
    explicacao: "Localizada na faixa onde vive a maior parte da população brasileira, a Mata Atlântica é um dos ecossistemas mais ricos e ameaçados do mundo, sendo fundamental para o abastecimento de água de milhões de pessoas.",
    dica: "Programas de reflorestamento e corredores ecológicos são vitais para reconectar os fragmentos da Mata Atlântica."
  },
  {
    id: 43,
    categoria: "Desperdício de Alimentos",
    afirmativa: "Jogar comida fora não causa nenhum impacto ambiental, já que os alimentos são biodegradáveis.",
    correta: false,
    explicacao: "Quando alimentos são desperdiçados, toda a água, energia, terra e combustível usados para produzi-los e transportá-los também são jogados fora, além de gerarem gás metano ao apodrecerem nos aterros.",
    dica: "Planejar as compras e aproveitar integralmente os alimentos ajuda a combater a fome e a proteger o planeta."
  },
  {
    id: 44,
    categoria: "Consumo de Água",
    afirmativa: "Fechar a torneira enquanto escova os dentes ou ensaboa a louça e reduzir o tempo no banho são atitudes simples que economizam dezenas de litros de água por dia.",
    correta: true,
    explicacao: "Uma torneira aberta por 5 minutos pode gastar mais de 12 litros de água, e diminuir alguns minutos do banho reduz tanto o gasto de água tratada quanto o consumo de energia elétrica.",
    dica: "Cuidar da água no dia a dia preserva nossos reservatórios, especialmente durante períodos de estiagem."
  },
  {
    id: 45,
    categoria: "Poluição Sonora e Visual",
    afirmativa: "A poluição ambiental refere-se exclusivamente à fumaça no ar e ao lixo nos rios, não existindo poluição sonora ou luminosa.",
    correta: false,
    explicacao: "O excesso de ruídos (poluição sonora) e de luz artificial à noite (poluição luminosa) nas cidades afeta a saúde humana e desorienta aves migratórias, insetos noturnos e tartarugas marinhas.",
    dica: "Um ambiente urbano saudável também precisa de áreas arborizadas, controle de ruídos e iluminação eficiente."
  },
  {
    id: 46,
    categoria: "Pantanal",
    afirmativa: "O Pantanal é considerado a maior planície alagável do planeta e depende do ciclo anual de cheias e secas para manter sua biodiversidade.",
    correta: true,
    explicacao: "Durante o período de cheias, os rios transbordam e fertilizam a planície pantaneira, criando condições ideais para a reprodução de peixes, aves como o tuiuiú, jacarés e onças-pintadas.",
    dica: "A conservação das nascentes nos planaltos vizinhos é essencial para que a água continue chegando ao Pantanal."
  },
  {
    id: 47,
    categoria: "Papel e Florestas",
    afirmativa: "O desperdício de papel não tem relação com o meio ambiente, pois a fabricação de papel não consome água nem árvores.",
    correta: false,
    explicacao: "A produção de celulose e papel consome grandes quantidades de madeira, água e energia elétrica. Economizar papel, usar os dois lados da folha e reciclar reduzem esses impactos.",
    dica: "Procure sempre produtos de papel com selo de manejo florestal responsável (como o selo FSC) ou papel reciclado."
  },
  {
    id: 48,
    categoria: "Branqueamento e Albedo",
    afirmativa: "Superfícies claras como o gelo polar refletem grande parte da luz solar de volta para o espaço, ajudando a regular a temperatura da Terra.",
    correta: true,
    explicacao: "Esse fenômeno é chamado de efeito albedo. Quando o gelo derrete e dá lugar à água escura do oceano, o mar absorve mais calor solar, acelerando ainda mais o aquecimento global.",
    dica: "As calotas polares funcionam como um verdadeiro 'espelho térmico' protetor para o clima de todo o planeta."
  },
  {
    id: 49,
    categoria: "Sacolas e Embalagens",
    afirmativa: "Utilizar ecobags (sacolas reutilizáveis) nas compras substitui centenas de sacolas plásticas descartáveis ao longo de um ano.",
    correta: true,
    explicacao: "Sacolas plásticas descartáveis são usadas por poucos minutos, mas permanecem por séculos no meio ambiente, muitas vezes parando em bueiros, rios e oceanos.",
    dica: "Ter sempre uma sacola reutilizável e uma garrafinha de água na mochila é um hábito simples e muito sustentável!"
  },
  {
    id: 50,
    categoria: "Cidadania Ambiental",
    afirmativa: "A preservação do meio ambiente é responsabilidade exclusiva dos governos e grandes empresas, não cabendo aos estudantes ou cidadãos nenhuma atitude prática.",
    correta: false,
    explicacao: "Embora governos e empresas tenham grande responsabilidade, a participação ativa de cada cidadão — cobrando políticas públicas, evitando desperdícios e disseminando conhecimento — é indispensável.",
    dica: "Educação ambiental e atitudes coletivas na escola e na comunidade transformam o presente e o futuro do planeta!"
  }
];
