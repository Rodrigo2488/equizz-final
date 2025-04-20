import { Question, Category } from '@/lib/types';

// Categorias de quiz disponíveis
export const categories: Category[] = [
  {
    id: 'conhecimentos-gerais',
    title: 'Conhecimentos Gerais',
    description: 'Teste seus conhecimentos sobre diversos assuntos do cotidiano.',
    color: 'blue'
  },
  {
    id: 'ciencias',
    title: 'Ciências',
    description: 'Desafie-se com perguntas sobre biologia, química, física e astronomia.',
    color: 'green'
  },
  {
    id: 'historia',
    title: 'História',
    description: 'Viaje pelo tempo e teste seus conhecimentos sobre eventos históricos importantes.',
    color: 'yellow'
  },
  {
    id: 'geografia',
    title: 'Geografia',
    description: 'Explore o mundo e teste seus conhecimentos sobre países, capitais e geografia mundial.',
    color: 'purple'
  },
  {
    id: 'entretenimento',
    title: 'Entretenimento',
    description: 'Perguntas sobre filmes, séries, música e cultura pop.',
    color: 'pink'
  },
  {
    id: 'esportes',
    title: 'Esportes',
    description: 'Teste seus conhecimentos sobre diversos esportes e competições.',
    color: 'red'
  }
];

// Perguntas de exemplo para cada categoria
export const defaultQuestions: Question[] = [
  // Conhecimentos Gerais
  {
    id: 'cg-1',
    text: 'Qual é o maior planeta do sistema solar?',
    options: ['Terra', 'Júpiter', 'Saturno', 'Netuno'],
    correctOptionIndex: 1,
    category: 'conhecimentos-gerais'
  },
  {
    id: 'cg-2',
    text: 'Qual é o menor país do mundo em área territorial?',
    options: ['Mônaco', 'Vaticano', 'Nauru', 'San Marino'],
    correctOptionIndex: 1,
    category: 'conhecimentos-gerais'
  },
  {
    id: 'cg-3',
    text: 'Qual é o metal mais precioso do mundo?',
    options: ['Ouro', 'Platina', 'Ródio', 'Paládio'],
    correctOptionIndex: 2,
    category: 'conhecimentos-gerais'
  },
  {
    id: 'cg-4',
    text: 'Qual é a capital da Austrália?',
    options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
    correctOptionIndex: 2,
    category: 'conhecimentos-gerais'
  },
  {
    id: 'cg-5',
    text: 'Quem pintou a Mona Lisa?',
    options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Michelangelo'],
    correctOptionIndex: 1,
    category: 'conhecimentos-gerais'
  },
  {
    id: 'cg-6',
    text: 'Qual é o osso mais longo do corpo humano?',
    options: ['Fêmur', 'Úmero', 'Tíbia', 'Fíbula'],
    correctOptionIndex: 0,
    category: 'conhecimentos-gerais'
  },
  {
    id: 'cg-7',
    text: 'Qual é o animal terrestre mais rápido do mundo?',
    options: ['Leopardo', 'Guepardo', 'Leão', 'Tigre'],
    correctOptionIndex: 1,
    category: 'conhecimentos-gerais'
  },
  {
    id: 'cg-8',
    text: 'Qual é o maior oceano do mundo?',
    options: ['Atlântico', 'Índico', 'Pacífico', 'Ártico'],
    correctOptionIndex: 2,
    category: 'conhecimentos-gerais'
  },
  {
    id: 'cg-9',
    text: 'Qual é o elemento químico mais abundante na crosta terrestre?',
    options: ['Oxigênio', 'Silício', 'Alumínio', 'Ferro'],
    correctOptionIndex: 0,
    category: 'conhecimentos-gerais'
  },
  {
    id: 'cg-10',
    text: 'Qual é a montanha mais alta do mundo?',
    options: ['Monte Everest', 'K2', 'Kangchenjunga', 'Lhotse'],
    correctOptionIndex: 0,
    category: 'conhecimentos-gerais'
  },
  {
    id: 'cg-11',
    text: 'Qual é o rio mais longo do mundo?',
    options: ['Nilo', 'Amazonas', 'Yangtzé', 'Mississippi'],
    correctOptionIndex: 0,
    category: 'conhecimentos-gerais'
  },
  {
    id: 'cg-12',
    text: 'Qual é o maior deserto do mundo?',
    options: ['Saara', 'Antártico', 'Árabe', 'Gobi'],
    correctOptionIndex: 1,
    category: 'conhecimentos-gerais'
  },
  {
    id: 'cg-13',
    text: 'Qual é a capital do Canadá?',
    options: ['Toronto', 'Vancouver', 'Montreal', 'Ottawa'],
    correctOptionIndex: 3,
    category: 'conhecimentos-gerais'
  },
  {
    id: 'cg-14',
    text: 'Qual é o maior mamífero terrestre?',
    options: ['Elefante africano', 'Rinoceronte branco', 'Hipopótamo', 'Girafa'],
    correctOptionIndex: 0,
    category: 'conhecimentos-gerais'
  },
  {
    id: 'cg-15',
    text: 'Qual é a moeda oficial do Japão?',
    options: ['Yuan', 'Won', 'Iene', 'Ringgit'],
    correctOptionIndex: 2,
    category: 'conhecimentos-gerais'
  },
  {
    id: 'cg-16',
    text: 'Qual é o segundo planeta do sistema solar?',
    options: ['Mercúrio', 'Vênus', 'Terra', 'Marte'],
    correctOptionIndex: 1,
    category: 'conhecimentos-gerais'
  },
  {
    id: 'cg-17',
    text: 'Qual é o maior arquipélago do mundo?',
    options: ['Filipinas', 'Indonésia', 'Japão', 'Maldivas'],
    correctOptionIndex: 1,
    category: 'conhecimentos-gerais'
  },
  {
    id: 'cg-18',
    text: 'Qual é o idioma mais falado no mundo?',
    options: ['Inglês', 'Espanhol', 'Mandarim', 'Hindi'],
    correctOptionIndex: 2,
    category: 'conhecimentos-gerais'
  },
  
  // Ciências
  {
    id: 'ci-1',
    text: 'Qual é o nome do processo pelo qual a água passa do estado líquido para o gasoso?',
    options: ['Condensação', 'Solidificação', 'Evaporação', 'Sublimação'],
    correctOptionIndex: 2,
    category: 'ciencias'
  },
  {
    id: 'ci-2',
    text: 'Qual é o elemento químico mais abundante no universo?',
    options: ['Oxigênio', 'Carbono', 'Hidrogênio', 'Hélio'],
    correctOptionIndex: 2,
    category: 'ciencias'
  },
  {
    id: 'ci-3',
    text: 'Qual é a unidade básica da hereditariedade?',
    options: ['Célula', 'Gene', 'DNA', 'Cromossomo'],
    correctOptionIndex: 1,
    category: 'ciencias'
  },
  {
    id: 'ci-4',
    text: 'Qual é o órgão responsável pela produção de insulina no corpo humano?',
    options: ['Fígado', 'Pâncreas', 'Rins', 'Baço'],
    correctOptionIndex: 1,
    category: 'ciencias'
  },
  {
    id: 'ci-5',
    text: 'Qual é a velocidade da luz no vácuo?',
    options: ['300.000 km/s', '150.000 km/s', '200.000 km/s', '250.000 km/s'],
    correctOptionIndex: 0,
    category: 'ciencias'
  },
  {
    id: 'ci-6',
    text: 'Qual é o símbolo químico do ouro?',
    options: ['Au', 'Ag', 'Fe', 'Cu'],
    correctOptionIndex: 0,
    category: 'ciencias'
  },
  {
    id: 'ci-7',
    text: 'Qual é a menor partícula de um elemento que mantém suas propriedades químicas?',
    options: ['Próton', 'Nêutron', 'Elétron', 'Átomo'],
    correctOptionIndex: 3,
    category: 'ciencias'
  },
  {
    id: 'ci-8',
    text: 'Qual é o nome do processo pelo qual as plantas produzem seu próprio alimento?',
    options: ['Respiração', 'Fotossíntese', 'Digestão', 'Fermentação'],
    correctOptionIndex: 1,
    category: 'ciencias'
  },
  {
    id: 'ci-9',
    text: 'Qual é o maior órgão do corpo humano?',
    options: ['Fígado', 'Cérebro', 'Pele', 'Intestino'],
    correctOptionIndex: 2,
    category: 'ciencias'
  },
  {
    id: 'ci-10',
    text: 'Qual é a lei da física que afirma que toda ação tem uma reação igual e oposta?',
    options: ['Lei da Gravidade', 'Terceira Lei de Newton', 'Lei da Inércia', 'Lei da Conservação de Energia'],
    correctOptionIndex: 1,
    category: 'ciencias'
  },
  {
    id: 'ci-11',
    text: 'Qual é o nome do processo pelo qual os organismos convertem glicose em energia?',
    options: ['Fotossíntese', 'Respiração celular', 'Fermentação', 'Digestão'],
    correctOptionIndex: 1,
    category: 'ciencias'
  },
  {
    id: 'ci-12',
    text: 'Qual é o gás mais abundante na atmosfera terrestre?',
    options: ['Oxigênio', 'Nitrogênio', 'Dióxido de carbono', 'Argônio'],
    correctOptionIndex: 1,
    category: 'ciencias'
  },
  {
    id: 'ci-13',
    text: 'Qual é a unidade de medida de força no Sistema Internacional?',
    options: ['Watt', 'Joule', 'Newton', 'Pascal'],
    correctOptionIndex: 2,
    category: 'ciencias'
  },
  {
    id: 'ci-14',
    text: 'Qual é o nome do processo pelo qual a água passa do estado gasoso para o líquido?',
    options: ['Evaporação', 'Condensação', 'Solidificação', 'Sublimação'],
    correctOptionIndex: 1,
    category: 'ciencias'
  },
  {
    id: 'ci-15',
    text: 'Qual é o nome da camada da atmosfera mais próxima da superfície terrestre?',
    options: ['Estratosfera', 'Troposfera', 'Mesosfera', 'Termosfera'],
    correctOptionIndex: 1,
    category: 'ciencias'
  },
  {
    id: 'ci-16',
    text: 'Qual é o elemento químico com o símbolo "Fe"?',
    options: ['Ferro', 'Flúor', 'Fósforo', 'Frâncio'],
    correctOptionIndex: 0,
    category: 'ciencias'
  },
  {
    id: 'ci-17',
    text: 'Qual é a unidade básica de estrutura e função em todos os seres vivos?',
    options: ['Átomo', 'Molécula', 'Célula', 'Tecido'],
    correctOptionIndex: 2,
    category: 'ciencias'
  },
  {
    id: 'ci-18',
    text: 'Qual é o nome do processo pelo qual os organismos se desenvolvem a partir de mudanças genéticas ao longo do tempo?',
    options: ['Mutação', 'Adaptação', 'Evolução', 'Seleção natural'],
    correctOptionIndex: 2,
    category: 'ciencias'
  },
  
  // História
  {
    id: 'hi-1',
    text: 'Em que ano começou a Primeira Guerra Mundial?',
    options: ['1914', '1916', '1918', '1939'],
    correctOptionIndex: 0,
    category: 'historia'
  },
  {
    id: 'hi-2',
    text: 'Quem foi o primeiro presidente do Brasil?',
    options: ['Dom Pedro I', 'Getúlio Vargas', 'Marechal Deodoro da Fonseca', 'Juscelino Kubitschek'],
    correctOptionIndex: 2,
    category: 'historia'
  },
  {
    id: 'hi-3',
    text: 'Qual civilização antiga construiu as pirâmides de Gizé?',
    options: ['Gregos', 'Romanos', 'Egípcios', 'Maias'],
    correctOptionIndex: 2,
    category: 'historia'
  },
  {
    id: 'hi-4',
    text: 'Em que ano ocorreu a Revolução Francesa?',
    options: ['1789', '1776', '1804', '1812'],
    correctOptionIndex: 0,
    category: 'historia'
  },
  {
    id: 'hi-5',
    text: 'Quem foi o líder da Revolução Cubana?',
    options: ['Che Guevara', 'Fidel Castro', 'Fulgencio Batista', 'Raúl Castro'],
    correctOptionIndex: 1,
    category: 'historia'
  },
  {
    id: 'hi-6',
    text: 'Qual foi o período conhecido como "Era dos Descobrimentos"?',
    options: ['Século XIV-XVI', 'Século XV-XVII', 'Século XVI-XVIII', 'Século XVII-XIX'],
    correctOptionIndex: 1,
    category: 'historia'
  },
  {
    id: 'hi-7',
    text: 'Quem foi o primeiro imperador romano?',
    options: ['Júlio César', 'Augusto', 'Nero', 'Calígula'],
    correctOptionIndex: 1,
    category: 'historia'
  },
  {
    id: 'hi-8',
    text: 'Em que ano terminou a Segunda Guerra Mundial?',
    options: ['1943', '1944', '1945', '1946'],
    correctOptionIndex: 2,
    category: 'historia'
  },
  {
    id: 'hi-9',
    text: 'Qual foi o nome do movimento que levou à independência da Índia do domínio britânico?',
    options: ['Movimento de Não-Violência', 'Movimento de Libertação Indiana', 'Movimento de Independência Indiana', 'Movimento Satyagraha'],
    correctOptionIndex: 2,
    category: 'historia'
  },
  {
    id: 'hi-10',
    text: 'Quem foi o líder sul-africano que lutou contra o apartheid e se tornou presidente?',
    options: ['Desmond Tutu', 'Nelson Mandela', 'Thabo Mbeki', 'Jacob Zuma'],
    correctOptionIndex: 1,
    category: 'historia'
  },
  {
    id: 'hi-11',
    text: 'Qual evento marcou o início da Idade Média na Europa?',
    options: ['Queda do Império Romano do Ocidente', 'Coroação de Carlos Magno', 'Início das Cruzadas', 'Peste Negra'],
    correctOptionIndex: 0,
    category: 'historia'
  },
  {
    id: 'hi-12',
    text: 'Quem foi o navegador português que liderou a primeira viagem de circunavegação do globo?',
    options: ['Vasco da Gama', 'Pedro Álvares Cabral', 'Fernão de Magalhães', 'Bartolomeu Dias'],
    correctOptionIndex: 2,
    category: 'historia'
  },
  {
    id: 'hi-13',
    text: 'Qual foi o nome do tratado que dividiu as terras do "Novo Mundo" entre Portugal e Espanha?',
    options: ['Tratado de Madrid', 'Tratado de Tordesilhas', 'Tratado de Utrecht', 'Tratado de Lisboa'],
    correctOptionIndex: 1,
    category: 'historia'
  },
  {
    id: 'hi-14',
    text: 'Em que ano ocorreu a Independência do Brasil?',
    options: ['1808', '1822', '1889', '1500'],
    correctOptionIndex: 1,
    category: 'historia'
  },
  {
    id: 'hi-15',
    text: 'Qual foi o nome do movimento revolucionário que derrubou a monarquia russa em 1917?',
    options: ['Revolução Bolchevique', 'Revolução Menchevique', 'Revolução de Fevereiro', 'Revolução de Outubro'],
    correctOptionIndex: 3,
    category: 'historia'
  },
  {
    id: 'hi-16',
    text: 'Quem foi o líder militar e político que unificou a China e se tornou seu primeiro imperador?',
    options: ['Confúcio', 'Sun Tzu', 'Qin Shi Huang', 'Mao Tsé-Tung'],
    correctOptionIndex: 2,
    category: 'historia'
  },
  {
    id: 'hi-17',
    text: 'Qual foi o nome do período de renovação cultural, artística e científica que ocorreu na Europa entre os séculos XIV e XVI?',
    options: ['Iluminismo', 'Renascimento', 'Barroco', 'Romantismo'],
    correctOptionIndex: 1,
    category: 'historia'
  },
  {
    id: 'hi-18',
    text: 'Em que ano caiu o Muro de Berlim?',
    options: ['1985', '1987', '1989', '1991'],
    correctOptionIndex: 2,
    category: 'historia'
  },
  
  // Geografia
  {
    id: 'ge-1',
    text: 'Qual é o maior oceano do mundo?',
    options: ['Atlântico', 'Índico', 'Pacífico', 'Ártico'],
    correctOptionIndex: 2,
    category: 'geografia'
  },
  {
    id: 'ge-2',
    text: 'Qual é o país mais populoso do mundo?',
    options: ['Índia', 'China', 'Estados Unidos', 'Indonésia'],
    correctOptionIndex: 1,
    category: 'geografia'
  },
  {
    id: 'ge-3',
    text: 'Qual é a capital da Austrália?',
    options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
    correctOptionIndex: 2,
    category: 'geografia'
  },
  {
    id: 'ge-4',
    text: 'Qual é o rio mais longo do mundo?',
    options: ['Amazonas', 'Nilo', 'Yangtzé', 'Mississippi'],
    correctOptionIndex: 1,
    category: 'geografia'
  },
  {
    id: 'ge-5',
    text: 'Qual é o maior deserto do mundo?',
    options: ['Saara', 'Gobi', 'Atacama', 'Antártico'],
    correctOptionIndex: 3,
    category: 'geografia'
  },
  {
    id: 'ge-6',
    text: 'Qual é o ponto mais alto da Terra?',
    options: ['Monte Kilimanjaro', 'Monte Everest', 'Monte Fuji', 'Monte McKinley'],
    correctOptionIndex: 1,
    category: 'geografia'
  },
  {
    id: 'ge-7',
    text: 'Qual é o maior país do mundo em área territorial?',
    options: ['China', 'Estados Unidos', 'Canadá', 'Rússia'],
    correctOptionIndex: 3,
    category: 'geografia'
  },
  {
    id: 'ge-8',
    text: 'Qual é a capital do Canadá?',
    options: ['Toronto', 'Vancouver', 'Montreal', 'Ottawa'],
    correctOptionIndex: 3,
    category: 'geografia'
  },
  {
    id: 'ge-9',
    text: 'Qual é o menor país do mundo em área territorial?',
    options: ['Mônaco', 'Vaticano', 'Nauru', 'San Marino'],
    correctOptionIndex: 1,
    category: 'geografia'
  },
  {
    id: 'ge-10',
    text: 'Qual é o maior arquipélago do mundo?',
    options: ['Filipinas', 'Indonésia', 'Japão', 'Maldivas'],
    correctOptionIndex: 1,
    category: 'geografia'
  },
  {
    id: 'ge-11',
    text: 'Qual é o lago mais profundo do mundo?',
    options: ['Lago Superior', 'Lago Vitória', 'Lago Baikal', 'Lago Tanganica'],
    correctOptionIndex: 2,
    category: 'geografia'
  },
  {
    id: 'ge-12',
    text: 'Qual é a capital da Argentina?',
    options: ['Santiago', 'Buenos Aires', 'Montevidéu', 'Lima'],
    correctOptionIndex: 1,
    category: 'geografia'
  },
  {
    id: 'ge-13',
    text: 'Qual é o estreito que separa a Ásia da América do Norte?',
    options: ['Estreito de Bering', 'Estreito de Gibraltar', 'Estreito de Malaca', 'Estreito de Ormuz'],
    correctOptionIndex: 0,
    category: 'geografia'
  },
  {
    id: 'ge-14',
    text: 'Qual é a capital do Egito?',
    options: ['Casablanca', 'Túnis', 'Cairo', 'Argel'],
    correctOptionIndex: 2,
    category: 'geografia'
  },
  {
    id: 'ge-15',
    text: 'Qual é o país com o maior número de fronteiras terrestres?',
    options: ['Rússia', 'China', 'Brasil', 'França'],
    correctOptionIndex: 0,
    category: 'geografia'
  },
  {
    id: 'ge-16',
    text: 'Qual é a cordilheira mais longa do mundo?',
    options: ['Himalaias', 'Alpes', 'Andes', 'Montanhas Rochosas'],
    correctOptionIndex: 2,
    category: 'geografia'
  },
  {
    id: 'ge-17',
    text: 'Qual é a capital da Nova Zelândia?',
    options: ['Auckland', 'Wellington', 'Christchurch', 'Hamilton'],
    correctOptionIndex: 1,
    category: 'geografia'
  },
  {
    id: 'ge-18',
    text: 'Qual é o maior golfo do mundo?',
    options: ['Golfo do México', 'Golfo Pérsico', 'Golfo de Bengala', 'Golfo de Aden'],
    correctOptionIndex: 0,
    category: 'geografia'
  },
  
  // Entretenimento
  {
    id: 'en-1',
    text: 'Qual filme ganhou o Oscar de Melhor Filme em 2020?',
    options: ['1917', 'Coringa', 'Parasita', 'Era Uma Vez em Hollywood'],
    correctOptionIndex: 2,
    category: 'entretenimento'
  },
  {
    id: 'en-2',
    text: 'Quem é o autor da série de livros "Harry Potter"?',
    options: ['J.R.R. Tolkien', 'J.K. Rowling', 'George R.R. Martin', 'C.S. Lewis'],
    correctOptionIndex: 1,
    category: 'entretenimento'
  },
  {
    id: 'en-3',
    text: 'Qual banda britânica lançou o álbum "Abbey Road"?',
    options: ['The Rolling Stones', 'The Beatles', 'Pink Floyd', 'Queen'],
    correctOptionIndex: 1,
    category: 'entretenimento'
  },
  {
    id: 'en-4',
    text: 'Qual ator interpretou o personagem Tony Stark/Homem de Ferro no Universo Cinematográfico Marvel?',
    options: ['Chris Evans', 'Chris Hemsworth', 'Robert Downey Jr.', 'Mark Ruffalo'],
    correctOptionIndex: 2,
    category: 'entretenimento'
  },
  {
    id: 'en-5',
    text: 'Qual é o nome do criador da série de TV "Os Simpsons"?',
    options: ['Seth MacFarlane', 'Matt Groening', 'Mike Judge', 'Trey Parker'],
    correctOptionIndex: 1,
    category: 'entretenimento'
  },
  {
    id: 'en-6',
    text: 'Qual é o filme de maior bilheteria de todos os tempos?',
    options: ['Avatar', 'Vingadores: Ultimato', 'Titanic', 'Star Wars: O Despertar da Força'],
    correctOptionIndex: 1,
    category: 'entretenimento'
  },
  {
    id: 'en-7',
    text: 'Qual é o nome da protagonista da série de jogos "The Legend of Zelda"?',
    options: ['Zelda', 'Link', 'Ganon', 'Epona'],
    correctOptionIndex: 1,
    category: 'entretenimento'
  },
  {
    id: 'en-8',
    text: 'Qual é o nome do diretor do filme "Pulp Fiction"?',
    options: ['Martin Scorsese', 'Quentin Tarantino', 'Steven Spielberg', 'Christopher Nolan'],
    correctOptionIndex: 1,
    category: 'entretenimento'
  },
  {
    id: 'en-9',
    text: 'Qual é o nome da atriz que interpretou Hermione Granger nos filmes de Harry Potter?',
    options: ['Emma Watson', 'Emma Stone', 'Jennifer Lawrence', 'Keira Knightley'],
    correctOptionIndex: 0,
    category: 'entretenimento'
  },
  {
    id: 'en-10',
    text: 'Qual é o nome do personagem principal da série de TV "Breaking Bad"?',
    options: ['Jesse Pinkman', 'Saul Goodman', 'Walter White', 'Hank Schrader'],
    correctOptionIndex: 2,
    category: 'entretenimento'
  },
  {
    id: 'en-11',
    text: 'Qual é o nome do primeiro filme da saga "Star Wars"?',
    options: ['O Império Contra-Ataca', 'Uma Nova Esperança', 'O Retorno de Jedi', 'A Ameaça Fantasma'],
    correctOptionIndex: 1,
    category: 'entretenimento'
  },
  {
    id: 'en-12',
    text: 'Qual é o nome do cantor que liderou a banda Queen?',
    options: ['Mick Jagger', 'Freddie Mercury', 'Elton John', 'David Bowie'],
    correctOptionIndex: 1,
    category: 'entretenimento'
  },
  {
    id: 'en-13',
    text: 'Qual é o nome do autor da série de livros "As Crônicas de Gelo e Fogo", que inspirou a série "Game of Thrones"?',
    options: ['J.R.R. Tolkien', 'George R.R. Martin', 'J.K. Rowling', 'Stephen King'],
    correctOptionIndex: 1,
    category: 'entretenimento'
  },
  {
    id: 'en-14',
    text: 'Qual é o nome do estúdio de animação responsável por filmes como "Toy Story" e "Os Incríveis"?',
    options: ['DreamWorks', 'Pixar', 'Studio Ghibli', 'Illumination'],
    correctOptionIndex: 1,
    category: 'entretenimento'
  },
  {
    id: 'en-15',
    text: 'Qual é o nome do personagem interpretado por Johnny Depp na série de filmes "Piratas do Caribe"?',
    options: ['Will Turner', 'Capitão Barbossa', 'Capitão Jack Sparrow', 'Davy Jones'],
    correctOptionIndex: 2,
    category: 'entretenimento'
  },
  {
    id: 'en-16',
    text: 'Qual é o nome do criador do universo Marvel Comics?',
    options: ['Stan Lee', 'Jack Kirby', 'Steve Ditko', 'Bob Kane'],
    correctOptionIndex: 0,
    category: 'entretenimento'
  },
  {
    id: 'en-17',
    text: 'Qual é o nome da série de TV que se passa em um parque temático futurista povoado por androides?',
    options: ['Black Mirror', 'Westworld', 'Altered Carbon', 'The Expanse'],
    correctOptionIndex: 1,
    category: 'entretenimento'
  },
  {
    id: 'en-18',
    text: 'Qual é o nome do diretor do filme "O Poderoso Chefão"?',
    options: ['Martin Scorsese', 'Francis Ford Coppola', 'Steven Spielberg', 'Alfred Hitchcock'],
    correctOptionIndex: 1,
    category: 'entretenimento'
  },
  
  // Esportes
  {
    id: 'es-1',
    text: 'Em que país foram realizados os primeiros Jogos Olímpicos modernos?',
    options: ['França', 'Grécia', 'Estados Unidos', 'Inglaterra'],
    correctOptionIndex: 1,
    category: 'esportes'
  },
  {
    id: 'es-2',
    text: 'Qual país venceu a Copa do Mundo de Futebol de 2018?',
    options: ['Brasil', 'Alemanha', 'França', 'Argentina'],
    correctOptionIndex: 2,
    category: 'esportes'
  },
  {
    id: 'es-3',
    text: 'Quantos jogadores compõem uma equipe de vôlei em quadra?',
    options: ['5', '6', '7', '8'],
    correctOptionIndex: 1,
    category: 'esportes'
  },
  {
    id: 'es-4',
    text: 'Qual é o esporte em que se utiliza um disco e um taco?',
    options: ['Golfe', 'Hóquei', 'Críquete', 'Beisebol'],
    correctOptionIndex: 1,
    category: 'esportes'
  },
  {
    id: 'es-5',
    text: 'Qual jogador de futebol tem o maior número de gols em Copas do Mundo?',
    options: ['Pelé', 'Ronaldo Fenômeno', 'Miroslav Klose', 'Lionel Messi'],
    correctOptionIndex: 2,
    category: 'esportes'
  },
  {
    id: 'es-6',
    text: 'Qual é o único país que participou de todas as edições da Copa do Mundo de Futebol?',
    options: ['Alemanha', 'Itália', 'Argentina', 'Brasil'],
    correctOptionIndex: 3,
    category: 'esportes'
  },
  {
    id: 'es-7',
    text: 'Qual é o nome do troféu dado ao vencedor da Copa do Mundo de Futebol?',
    options: ['Taça Jules Rimet', 'Troféu FIFA', 'Copa do Mundo FIFA', 'Taça dos Campeões'],
    correctOptionIndex: 2,
    category: 'esportes'
  },
  {
    id: 'es-8',
    text: 'Qual é o esporte olímpico mais antigo?',
    options: ['Atletismo', 'Natação', 'Ginástica', 'Luta livre'],
    correctOptionIndex: 0,
    category: 'esportes'
  },
  {
    id: 'es-9',
    text: 'Qual é o nome do estádio do Barcelona FC?',
    options: ['Santiago Bernabéu', 'Camp Nou', 'Wembley', 'Old Trafford'],
    correctOptionIndex: 1,
    category: 'esportes'
  },
  {
    id: 'es-10',
    text: 'Qual é o recorde mundial dos 100 metros rasos masculino?',
    options: ['9.58 segundos', '9.63 segundos', '9.69 segundos', '9.74 segundos'],
    correctOptionIndex: 0,
    category: 'esportes'
  },
  {
    id: 'es-11',
    text: 'Qual é o esporte conhecido como "O Esporte Rei"?',
    options: ['Basquete', 'Futebol', 'Tênis', 'Golfe'],
    correctOptionIndex: 1,
    category: 'esportes'
  },
  {
    id: 'es-12',
    text: 'Qual é o país com mais medalhas olímpicas na história?',
    options: ['Estados Unidos', 'União Soviética/Rússia', 'China', 'Alemanha'],
    correctOptionIndex: 0,
    category: 'esportes'
  },
  {
    id: 'es-13',
    text: 'Qual é o nome do torneio de tênis mais antigo do mundo?',
    options: ['US Open', 'Roland Garros', 'Australian Open', 'Wimbledon'],
    correctOptionIndex: 3,
    category: 'esportes'
  },
  {
    id: 'es-14',
    text: 'Qual é o esporte em que se utiliza um taco para acertar uma bola em buracos?',
    options: ['Críquete', 'Beisebol', 'Golfe', 'Hóquei'],
    correctOptionIndex: 2,
    category: 'esportes'
  },
  {
    id: 'es-15',
    text: 'Qual é o nome do maior evento de luta livre profissional do mundo?',
    options: ['WrestleMania', 'SummerSlam', 'Royal Rumble', 'Survivor Series'],
    correctOptionIndex: 0,
    category: 'esportes'
  },
  {
    id: 'es-16',
    text: 'Qual é o nome da competição de automobilismo mais prestigiada do mundo?',
    options: ['NASCAR', 'Fórmula 1', 'IndyCar', 'Rally Dakar'],
    correctOptionIndex: 1,
    category: 'esportes'
  },
  {
    id: 'es-17',
    text: 'Qual é o esporte que tem as posições de armador, ala e pivô?',
    options: ['Vôlei', 'Handebol', 'Basquete', 'Futebol Americano'],
    correctOptionIndex: 2,
    category: 'esportes'
  },
  {
    id: 'es-18',
    text: 'Qual é o nome do evento esportivo que reúne atletas com deficiência?',
    options: ['Jogos Olímpicos Especiais', 'Jogos Paralímpicos', 'Jogos Mundiais', 'Jogos da Amizade'],
    correctOptionIndex: 1,
    category: 'esportes'
  }
];

// Inicializar perguntas padrão no localStorage
export function initializeDefaultData() {
  if (typeof window === 'undefined') return;
  
  try {
    // Verificar se já existem perguntas no localStorage
    const storedQuestions = localStorage.getItem('adminQuestions');
    if (!storedQuestions) {
      // Se não existirem, inicializar com um array vazio
      localStorage.setItem('adminQuestions', JSON.stringify([]));
    }
  } catch (error) {
    console.error("Erro ao inicializar dados padrão:", error);
  }
}

// Função para obter uma categoria pelo ID
export function getCategoryById(categoryId: string): Category | undefined {
  // Verificar nas categorias padrão
  const defaultCategory = categories.find(cat => cat.id === categoryId);
  if (defaultCategory) return defaultCategory;
  
  // Verificar nas categorias adicionadas pelo administrador
  if (typeof window !== 'undefined') {
    try {
      const storedCategories = localStorage.getItem('adminCategories');
      if (storedCategories) {
        const adminCategories = JSON.parse(storedCategories);
        const adminCategory = adminCategories.find(cat => cat.id === categoryId);
        if (adminCategory) return adminCategory;
      }
    } catch (error) {
      console.error("Erro ao buscar categoria:", error);
    }
  }
  
  return undefined;
}

// Função para obter perguntas aleatórias de uma categoria
export function getRandomQuestions(categoryId: string, count: number = 15): Question[] {
  if (typeof window === 'undefined') return [];
  
  try {
    // Combinar perguntas padrão com as adicionadas pelo administrador
    let allQuestions = [...defaultQuestions];
    
    const storedQuestions = localStorage.getItem('adminQuestions');
    if (storedQuestions) {
      const adminQuestions = JSON.parse(storedQuestions);
      allQuestions = [...allQuestions, ...adminQuestions];
    }
    
    // Filtrar perguntas da categoria especificada (incluindo perguntas com múltiplas categorias)
    const categoryQuestions = allQuestions.filter(q => {
      if (Array.isArray(q.category)) {
        return q.category.includes(categoryId);
      } else {
        return q.category === categoryId;
      }
    });
    
    // Se não houver perguntas suficientes, retornar todas as disponíveis
    if (categoryQuestions.length <= count) {
      return categoryQuestions;
    }
    
    // Embaralhar e selecionar o número solicitado de perguntas
    const shuffled = [...categoryQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  } catch (error) {
    console.error("Erro ao obter perguntas aleatórias:", error);
    return [];
  }
}

// Função para salvar resultado do quiz
export function saveQuizResult(result: {
  categoryId: string;
  totalQuestions: number;
  correctAnswers: number;
  date: string;
}) {
  if (typeof window === 'undefined') return;
  
  try {
    const storedResults = localStorage.getItem('quizResults');
    const results = storedResults ? JSON.parse(storedResults) : [];
    results.push(result);
    localStorage.setItem('quizResults', JSON.stringify(results));
  } catch (error) {
    console.error("Erro ao salvar resultado do quiz:", error);
  }
}

// Função para obter resultados de quiz
export function getQuizResults() {
  if (typeof window === 'undefined') return [];
  
  try {
    const storedResults = localStorage.getItem('quizResults');
    return storedResults ? JSON.parse(storedResults) : [];
  } catch (error) {
    console.error("Erro ao obter resultados do quiz:", error);
    return [];
  }
}

// Função para salvar imagem (simulada - em uma aplicação real, usaria upload para servidor)
export function saveImage(imageFile: File): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Em uma aplicação real, aqui faria upload para um servidor
        // e retornaria a URL da imagem no servidor
        // Para esta demonstração, usamos o Data URL
        const imageUrl = reader.result as string;
        
        // Salvar no localStorage para persistência
        const storedImages = localStorage.getItem('questionImages');
        const images = storedImages ? JSON.parse(storedImages) : {};
        const imageId = `img-${Date.now()}`;
        images[imageId] = imageUrl;
        localStorage.setItem('questionImages', JSON.stringify(images));
        
        resolve(imageUrl);
      };
      
      reader.onerror = () => {
        reject(new Error('Erro ao processar imagem'));
      };
      
      reader.readAsDataURL(imageFile);
    } catch (error) {
      reject(error);
    }
  });
}

// Função para obter todas as perguntas de uma categoria
export function getAllQuestionsForCategory(categoryId: string): Question[] {
  if (typeof window === 'undefined') return [];
  
  try {
    // Combinar perguntas padrão com as adicionadas pelo administrador
    let allQuestions = [...defaultQuestions];
    
    const storedQuestions = localStorage.getItem('adminQuestions');
    if (storedQuestions) {
      const adminQuestions = JSON.parse(storedQuestions);
      allQuestions = [...allQuestions, ...adminQuestions];
    }
    
    // Filtrar perguntas da categoria especificada (incluindo perguntas com múltiplas categorias)
    return allQuestions.filter(q => {
      if (Array.isArray(q.category)) {
        return q.category.includes(categoryId);
      } else {
        return q.category === categoryId;
      }
    });
  } catch (error) {
    console.error("Erro ao obter perguntas da categoria:", error);
    return [];
  }
}

// Função para atualizar uma pergunta
export function updateQuestion(questionId: string, updatedQuestion: Partial<Question>): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    // Verificar se é uma pergunta padrão
    const isDefaultQuestion = defaultQuestions.some(q => q.id === questionId);
    
    if (isDefaultQuestion) {
      // Não permitir edição direta de perguntas padrão
      // Em vez disso, criar uma cópia modificada
      const originalQuestion = defaultQuestions.find(q => q.id === questionId);
      if (!originalQuestion) return false;
      
      const newQuestion = {
        ...originalQuestion,
        ...updatedQuestion,
        id: `custom-${Date.now()}` // Novo ID para a pergunta modificada
      };
      
      // Adicionar a nova pergunta às perguntas personalizadas
      const storedQuestions = localStorage.getItem('adminQuestions');
      const adminQuestions = storedQuestions ? JSON.parse(storedQuestions) : [];
      adminQuestions.push(newQuestion);
      localStorage.setItem('adminQuestions', JSON.stringify(adminQuestions));
      
      return true;
    } else {
      // Atualizar pergunta personalizada
      const storedQuestions = localStorage.getItem('adminQuestions');
      if (!storedQuestions) return false;
      
      const adminQuestions = JSON.parse(storedQuestions);
      const questionIndex = adminQuestions.findIndex(q => q.id === questionId);
      
      if (questionIndex === -1) return false;
      
      adminQuestions[questionIndex] = {
        ...adminQuestions[questionIndex],
        ...updatedQuestion
      };
      
      localStorage.setItem('adminQuestions', JSON.stringify(adminQuestions));
      return true;
    }
  } catch (error) {
    console.error("Erro ao atualizar pergunta:", error);
    return false;
  }
}

// Função para excluir uma pergunta
export function deleteQuestion(questionId: string): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    // Verificar se é uma pergunta padrão
    const isDefaultQuestion = defaultQuestions.some(q => q.id === questionId);
    
    if (isDefaultQuestion) {
      // Não permitir exclusão de perguntas padrão
      return false;
    } else {
      // Excluir pergunta personalizada
      const storedQuestions = localStorage.getItem('adminQuestions');
      if (!storedQuestions) return false;
      
      const adminQuestions = JSON.parse(storedQuestions);
      const updatedQuestions = adminQuestions.filter(q => q.id !== questionId);
      
      localStorage.setItem('adminQuestions', JSON.stringify(updatedQuestions));
      return true;
    }
  } catch (error) {
    console.error("Erro ao excluir pergunta:", error);
    return false;
  }
}

// Função para atualizar uma categoria
export function updateCategory(categoryId: string, updatedCategory: Partial<Category>): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    // Verificar se é uma categoria padrão
    const isDefaultCategory = categories.some(c => c.id === categoryId);
    
    if (isDefaultCategory) {
      // Não permitir edição direta de categorias padrão
      return false;
    } else {
      // Atualizar categoria personalizada
      const storedCategories = localStorage.getItem('adminCategories');
      if (!storedCategories) return false;
      
      const adminCategories = JSON.parse(storedCategories);
      const categoryIndex = adminCategories.findIndex(c => c.id === categoryId);
      
      if (categoryIndex === -1) return false;
      
      adminCategories[categoryIndex] = {
        ...adminCategories[categoryIndex],
        ...updatedCategory
      };
      
      localStorage.setItem('adminCategories', JSON.stringify(adminCategories));
      return true;
    }
  } catch (error) {
    console.error("Erro ao atualizar categoria:", error);
    return false;
  }
}

// Função para excluir uma categoria
export function deleteCategory(categoryId: string): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    // Verificar se é uma categoria padrão
    const isDefaultCategory = categories.some(c => c.id === categoryId);
    
    if (isDefaultCategory) {
      // Não permitir exclusão de categorias padrão
      return false;
    } else {
      // Excluir categoria personalizada
      const storedCategories = localStorage.getItem('adminCategories');
      if (!storedCategories) return false;
      
      const adminCategories = JSON.parse(storedCategories);
      const updatedCategories = adminCategories.filter(c => c.id !== categoryId);
      
      localStorage.setItem('adminCategories', JSON.stringify(updatedCategories));
      return true;
    }
  } catch (error) {
    console.error("Erro ao excluir categoria:", error);
    return false;
  }
}

// Tipos exportados
export type { Question, Category }
