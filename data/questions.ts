import { Question, Subject } from '../types';

// Função auxiliar para criar questões de forma limpa
const createQuestion = (
  id: string, 
  notebookId: '1' | '2' | '3' | '4', 
  subject: Subject, 
  text: string, 
  correct: string, 
  explanation: string,
  opts: string[]
): Question => ({
  id,
  notebookId,
  subject,
  text,
  correctOptionId: correct,
  explanation,
  options: [
    { id: 'a', text: opts[0] },
    { id: 'b', text: opts[1] },
    { id: 'c', text: opts[2] },
    { id: 'd', text: opts[3] },
    { id: 'e', text: opts[4] },
  ]
});

export const STATIC_QUESTIONS: Question[] = [
  // =========================================================================
  // CADERNO 1: CONHECIMENTOS BANCÁRIOS
  // =========================================================================
  createQuestion('c1-01', '1', Subject.BANKING, 
    'O Sistema Financeiro Nacional (SFN) é estruturado por órgãos normativos, supervisores e operadores. Qual instituição abaixo atua como órgão normativo máximo do sistema?',
    'b', 
    'O Conselho Monetário Nacional (CMN) é o órgão superior do SFN, responsável por formular a política da moeda e do crédito.',
    ['Banco Central do Brasil (Bacen)', 'Conselho Monetário Nacional (CMN)', 'Comissão de Valores Mobiliários (CVM)', 'Banco do Brasil', 'Caixa Econômica Federal']
  ),
  createQuestion('c1-02', '1', Subject.BANKING, 
    'Sobre o Pix, sistema de pagamentos instantâneos criado pelo Bacen, é correto afirmar que:',
    'd', 
    'O Pix permite a realização de transferências e pagamentos em tempo real, 24 horas por dia, 7 dias por semana, inclusive feriados.',
    ['Funciona apenas em dias úteis, das 8h às 17h.', 'A chave Pix é obrigatória para receber transferências.', 'As transações levam até 30 minutos para serem liquidadas.', 'Está disponível 24 horas por dia, todos os dias do ano.', 'Cobra tarifa obrigatória para todas as pessoas físicas.']
  ),
  createQuestion('c1-03', '1', Subject.BANKING, 
    'O Fundo Garantidor de Créditos (FGC) protege os depositantes em caso de quebra da instituição financeira. Qual é o limite de garantia ordinária por CPF e por instituição?',
    'c', 
    'O limite atual é de R$ 250.000,00 por CPF/CNPJ, por instituição financeira ou conglomerado.',
    ['R$ 50.000,00', 'R$ 100.000,00', 'R$ 250.000,00', 'R$ 1.000.000,00', 'Sem limite definido']
  ),
  createQuestion('c1-04', '1', Subject.BANKING, 
    'A lavagem de dinheiro é tipificada como crime e consiste em três fases distintas. Qual é a sequência correta dessas fases?',
    'a', 
    'As fases são: Colocação (inserir o dinheiro sujo), Ocultação (dificultar o rastreio) e Integração (trazer de volta como lícito).',
    ['Colocação, Ocultação e Integração', 'Ocultação, Colocação e Integração', 'Integração, Planejamento e Execução', 'Colocação, Distribuição e Finalização', 'Ocultação, Dispersão e Coleta']
  ),
  createQuestion('c1-05', '1', Subject.BANKING, 
    'O Open Finance (Sistema Financeiro Aberto) tem como premissa principal:',
    'e', 
    'No Open Finance, o cliente é o titular dos seus dados e decide quando e com quem compartilhá-los.',
    ['O compartilhamento obrigatório de dados sigilosos entre bancos.', 'A criação de uma moeda única digital para todos os bancos.', 'O fim das agências físicas.', 'A cobrança de taxas para acesso ao internet banking.', 'O empoderamento do cliente, permitindo o compartilhamento de dados mediante consentimento.']
  ),
  createQuestion('c1-06', '1', Subject.BANKING, 
    'Qual a principal função do Comitê de Política Monetária (Copom)?',
    'b', 
    'O Copom define a meta da Taxa Selic, que é a taxa básica de juros da economia.',
    ['Fiscalizar bancos comerciais.', 'Definir a meta da Taxa Selic.', 'Emitir papel-moeda.', 'Controlar a inflação diretamente tabelando preços.', 'Gerenciar o Fundo de Garantia (FGTS).']
  ),
  createQuestion('c1-07', '1', Subject.BANKING, 
    'O que caracteriza um CDB (Certificado de Depósito Bancário)?',
    'a', 
    'O CDB é um título de renda fixa emitido por bancos para captar recursos.',
    ['Título emitido por bancos para captar recursos.', 'Título de dívida pública federal.', 'Ação de uma empresa listada na bolsa.', 'Contrato de seguro de vida.', 'Moeda digital descentralizada.']
  ),
  createQuestion('c1-08', '1', Subject.BANKING, 
    'Sobre o Drex (Real Digital), assinale a alternativa correta:',
    'c', 
    'O Drex é a CBDC (Central Bank Digital Currency) brasileira, uma representação digital do Real, emitida pelo Bacen.',
    ['É uma criptomoeda sem regulação.', 'É o mesmo que o Pix.', 'É a moeda digital oficial emitida pelo Banco Central do Brasil.', 'Substituirá o dinheiro físico em 2025.', 'É gerido por bancos privados.']
  ),
  createQuestion('c1-09', '1', Subject.BANKING, 
    'As Sociedades de Crédito, Financiamento e Investimento são conhecidas popularmente como:',
    'b', 
    'Financeiras são as instituições focadas em financiamento de bens de consumo.',
    ['Bancos de Investimento', 'Financeiras', 'Cooperativas de Crédito', 'Corretoras de Valores', 'Bancos Múltiplos']
  ),
  createQuestion('c1-10', '1', Subject.BANKING, 
    'Qual a finalidade da Taxa Referencial (TR)?',
    'd', 
    'A TR é utilizada como índice de correção da Poupança e do saldo do FGTS.',
    ['Definir os juros do cartão de crédito.', 'Regular o câmbio.', 'Servir de base para o imposto de renda.', 'Corrigir a Caderneta de Poupança e o FGTS.', 'Ajustar o salário mínimo.']
  ),
  createQuestion('c1-11', '1', Subject.BANKING, 
    'No contexto de câmbio, o que é o "Spread Bancário"?',
    'a', 
    'Spread é a diferença entre a taxa de captação (quanto o banco paga) e a taxa de aplicação (quanto o banco cobra).',
    ['Diferença entre a taxa de captação e a taxa de empréstimo.', 'Taxa única definida pelo governo.', 'Imposto sobre operações financeiras.', 'Lucro líquido do banco após impostos.', 'Valor cobrado pelo uso do Pix.']
  ),
  createQuestion('c1-12', '1', Subject.BANKING, 
    'Quem é o responsável por garantir o sigilo das operações bancárias?',
    'c', 
    'As instituições financeiras têm o dever legal de manter o sigilo das operações ativas e passivas.',
    ['Apenas o cliente.', 'O governo federal.', 'As instituições financeiras.', 'A Polícia Federal.', 'O Conselho de Segurança da ONU.']
  ),
  createQuestion('c1-13', '1', Subject.BANKING, 
    'O que é o "Cross-selling" no atendimento bancário?',
    'b', 
    'Venda cruzada (Cross-selling) é oferecer produtos complementares ao que o cliente já possui ou está adquirindo.',
    ['Vender produtos que o cliente não precisa.', 'Oferecer produtos complementares ao cliente.', 'Ignorar as necessidades do cliente.', 'Vender apenas seguros.', 'Atendimento exclusivo digital.']
  ),
  createQuestion('c1-14', '1', Subject.BANKING, 
    'As Cooperativas de Crédito diferenciam-se dos bancos comerciais pois:',
    'e', 
    'Nas cooperativas, os clientes são associados e participam das decisões e dos resultados (sobras).',
    ['Não precisam de autorização do Bacen.', 'Não podem emprestar dinheiro.', 'São instituições sem fins lucrativos focadas em caridade.', 'Atendem apenas agricultores.', 'Seus clientes são também donos (associados).']
  ),
  createQuestion('c1-15', '1', Subject.BANKING, 
    'A CVM (Comissão de Valores Mobiliários) é responsável por:',
    'a', 
    'A CVM fiscaliza e regula o mercado de capitais (bolsa de valores, fundos de investimento, S.A. de capital aberto).',
    ['Regular o mercado de valores mobiliários e S.A. de capital aberto.', 'Emitir moeda.', 'Fiscalizar cooperativas de crédito.', 'Definir a meta de inflação.', 'Gerenciar a dívida externa.']
  ),
  createQuestion('c1-16', '1', Subject.BANKING, 
    'O empréstimo consignado tem como característica principal:',
    'd', 
    'O desconto direto em folha reduz o risco de inadimplência, permitindo juros menores.',
    ['Não ter juros.', 'Ser exclusivo para empresas.', 'Exigir garantia de imóvel.', 'Ter as prestações descontadas diretamente na folha de pagamento.', 'Não permitir antecipação de parcelas.']
  ),
  createQuestion('c1-17', '1', Subject.BANKING, 
    'O que caracteriza um Banco Múltiplo?',
    'c', 
    'Um banco múltiplo deve possuir pelo menos duas carteiras, sendo uma delas obrigatoriamente Comercial ou de Investimento.',
    ['Possuir apenas carteira comercial.', 'Ser estatal.', 'Possuir ao menos duas carteiras, sendo uma Comercial ou de Investimento.', 'Atuar apenas no exterior.', 'Não poder emitir CDBs.']
  ),
  createQuestion('c1-18', '1', Subject.BANKING, 
    'O BNDES (Banco Nacional de Desenvolvimento Econômico e Social) tem como principal objetivo:',
    'b', 
    'O BNDES é o principal instrumento de financiamento de longo prazo para investimentos em todos os segmentos da economia.',
    ['Regular a taxa de juros.', 'Financiar projetos de desenvolvimento econômico e social de longo prazo.', 'Fiscalizar a bolsa de valores.', 'Emitir moeda.', 'Atuar como banco comercial para pessoas físicas.']
  ),
  createQuestion('c1-19', '1', Subject.BANKING,
    'O Pix Saque e o Pix Troco são modalidades que permitem:',
    'a',
    'Permitem que o usuário obtenha dinheiro em espécie em estabelecimentos comerciais, agentes credenciados e caixas eletrônicos.',
    ['Retirada de dinheiro em espécie em estabelecimentos.', 'Pagamento exclusivo de boletos.', 'Transferência internacional.', 'Empréstimo instantâneo.', 'Investimento automático.']
  ),
  createQuestion('c1-20', '1', Subject.BANKING,
    'O que é o "Cheque Especial"?',
    'c',
    'É uma linha de crédito pré-aprovada disponível na conta corrente para cobrir débitos quando não há saldo suficiente.',
    ['Um cheque que vale mais.', 'Um prêmio de loteria.', 'Uma linha de crédito pré-aprovada para cobertura de saldo.', 'Um investimento de alto risco.', 'Uma modalidade de poupança.']
  ),
  createQuestion('c1-21', '1', Subject.BANKING,
    'Qual a função das Corretoras de Câmbio?',
    'b',
    'São instituições autorizadas a intermediar operações de compra e venda de moeda estrangeira.',
    ['Imprimir dinheiro.', 'Intermediar compra e venda de moeda estrangeira.', 'Fiscalizar o Banco Central.', 'Conceder aposentadoria.', 'Vender imóveis.']
  ),

  // =========================================================================
  // CADERNO 2: TI, INOVAÇÃO E LGPD
  // =========================================================================
  createQuestion('c2-01', '2', Subject.IT, 
    'Um ataque que consiste em enviar e-mails falsos se passando por uma instituição legítima para roubar dados é chamado de:',
    'b', 
    'Phishing é a técnica de "pescar" dados do usuário através de engano.',
    ['DDoS', 'Phishing', 'Ransomware', 'Trojan', 'Spyware']
  ),
  createQuestion('c2-02', '2', Subject.IT, 
    'Qual tipo de malware "sequestra" os dados da vítima criptografando-os e exige um resgate para liberá-los?',
    'c', 
    'Ransomware é o software de resgate (ransom).',
    ['Worm', 'Adware', 'Ransomware', 'Botnet', 'Keylogger']
  ),
  createQuestion('c2-03', '2', Subject.IT, 
    'De acordo com a LGPD (Lei Geral de Proteção de Dados), o "Consentimento" é:',
    'a', 
    'Manifestação livre, informada e inequívoca pela qual o titular concorda com o tratamento de seus dados.',
    ['Manifestação livre e inequívoca do titular.', 'Decisão exclusiva da empresa.', 'Obrigatório apenas para dados bancários.', 'Dispensável em qualquer situação.', 'Uma taxa paga ao governo.']
  ),
  createQuestion('c2-04', '2', Subject.IT, 
    'O conceito de "SaaS" em Computação em Nuvem refere-se a:',
    'd', 
    'Software as a Service (Software como Serviço), como Google Drive, Office 365, Gmail.',
    ['Servidor como Serviço.', 'Segurança como Serviço.', 'Sistema como Suporte.', 'Software como Serviço.', 'Storage como Serviço.']
  ),
  createQuestion('c2-05', '2', Subject.IT, 
    'O que é Blockchain?',
    'e', 
    'Blockchain é um livro-razão (banco de dados) distribuído, imutável e descentralizado, base das criptomoedas.',
    ['Um tipo de vírus.', 'Um software da Caixa.', 'Uma rede social corporativa.', 'Um sistema de bloqueio de anúncios.', 'Um banco de dados distribuído e imutável de registros.']
  ),
  createQuestion('c2-06', '2', Subject.IT, 
    'Na segurança da informação, o princípio da "Integridade" garante que:',
    'b', 
    'Integridade garante que a informação não foi alterada indevidamente.',
    ['A informação só é acessada por quem tem permissão.', 'A informação não foi alterada ou corrompida.', 'A informação está sempre disponível.', 'A identidade do usuário é verdadeira.', 'O sistema nunca falha.']
  ),
  createQuestion('c2-07', '2', Subject.IT, 
    'Qual a função de um Firewall em uma rede corporativa?',
    'c', 
    'Firewall filtra o tráfego de rede, bloqueando acessos não autorizados.',
    ['Acelerar a internet.', 'Remover vírus do disco rígido.', 'Filtrar o tráfego de rede e bloquear acessos não autorizados.', 'Gerenciar senhas dos usuários.', 'Criar backups automáticos.']
  ),
  createQuestion('c2-08', '2', Subject.IT, 
    'O que são os "Cookies" no contexto de navegação web?',
    'a', 
    'Pequenos arquivos de texto salvos pelo navegador para lembrar preferências e rastrear sessões.',
    ['Pequenos arquivos de texto que armazenam preferências do usuário.', 'Vírus perigosos.', 'Programas de edição de texto.', 'Biscoitos digitais comestíveis.', 'Componentes físicos do computador.']
  ),
  createQuestion('c2-09', '2', Subject.IT, 
    'A autenticação de dois fatores (2FA) aumenta a segurança porque:',
    'd', 
    'Exige algo que você sabe (senha) e algo que você tem (celular/token), dificultando invasões.',
    ['Elimina a necessidade de senhas.', 'Torna o login mais rápido.', 'Impede o uso de celulares.', 'Exige duas formas distintas de comprovação de identidade.', 'Criptografa o disco rígido.']
  ),
  createQuestion('c2-10', '2', Subject.IT, 
    'Big Data é caracterizado pelos "5 Vs". Três deles são:',
    'b', 
    'Volume (quantidade), Velocidade (rapidez) e Variedade (tipos de dados) são os principais.',
    ['Valor, Venda e Verdade.', 'Volume, Velocidade e Variedade.', 'Vírus, Variação e Virtualização.', 'Visibilidade, Validade e Vida.', 'Vetor, Voz e Vídeo.']
  ),
  createQuestion('c2-11', '2', Subject.IT, 
    'O termo "Internet das Coisas" (IoT) refere-se a:',
    'c', 
    'Conexão de objetos cotidianos (geladeiras, carros, relógios) à internet.',
    ['Sites exclusivos para vendas.', 'Apenas smartphones modernos.', 'Objetos do dia a dia conectados à internet.', 'Redes sociais para robôs.', 'Internet via satélite apenas.']
  ),
  createQuestion('c2-12', '2', Subject.IT, 
    'Na LGPD, quem é o "Encarregado" (DPO)?',
    'a', 
    'É a pessoa indicada pelo controlador para atuar como canal de comunicação entre o controlador, os titulares e a ANPD.',
    ['Pessoa que faz a ponte entre a empresa, os titulares e a autoridade nacional.', 'O dono da empresa.', 'O advogado do cliente.', 'O hacker ético.', 'O fiscal do governo.']
  ),
  createQuestion('c2-13', '2', Subject.IT, 
    'O que significa a sigla VPN?',
    'e', 
    'Virtual Private Network cria um túnel seguro sobre uma rede pública.',
    ['Virtual Public Network', 'Very Private Number', 'Virus Protection Name', 'Virtual Personal Note', 'Virtual Private Network (Rede Privada Virtual)']
  ),
  createQuestion('c2-14', '2', Subject.IT, 
    'Em desenvolvimento ágil (Scrum), o que é uma "Sprint"?',
    'b', 
    'Sprint é um ciclo curto de desenvolvimento (geralmente 2 a 4 semanas) com entregas definidas.',
    ['Uma corrida de desenvolvedores.', 'Um ciclo de trabalho com duração fixa (time-box).', 'Uma reunião diária.', 'O líder do projeto.', 'O cliente final.']
  ),
  createQuestion('c2-15', '2', Subject.IT, 
    'A Ciência de Dados (Data Science) utiliza algoritmos para:',
    'd', 
    'Extrair conhecimento e insights de dados estruturados e não estruturados.',
    ['Reparar computadores.', 'Criar jogos.', 'Vender computadores.', 'Extrair insights e conhecimento de grandes volumes de dados.', 'Gerenciar cabos de rede.']
  ),
  createQuestion('c2-16', '2', Subject.IT, 
    'Qual a diferença básica entre HTTP e HTTPS?',
    'a', 
    'O "S" vem de Secure (Segurança/SSL), indicando que a comunicação é criptografada.',
    ['O HTTPS possui criptografia (segurança).', 'O HTTP é mais rápido.', 'O HTTPS é pago.', 'O HTTP não usa internet.', 'Não há diferença.']
  ),
  createQuestion('c2-17', '2', Subject.IT, 
    'O que é um ataque DDoS?',
    'b', 
    'Distributed Denial of Service visa tornar um serviço indisponível sobrecarregando-o com tráfego de múltiplas fontes.',
    ['Roubo de senhas.', 'Negação de Serviço Distribuído.', 'Interceptação de Wi-Fi.', 'Vírus que apaga arquivos.', 'Cópia ilegal de software.']
  ),
  createQuestion('c2-18', '2', Subject.IT, 
    'Na LGPD, o que são "Dados Sensíveis"?',
    'e', 
    'Dados sobre origem racial, convicção religiosa, opinião política, saúde ou vida sexual, que exigem proteção maior.',
    ['Dados públicos.', 'Nome e RG.', 'Dados de empresas.', 'Endereço de e-mail corporativo.', 'Dados sobre origem racial, saúde, religião, biometria, etc.']
  ),
  createQuestion('c2-19', '2', Subject.IT,
    'O que é a "Computação em Nuvem" do tipo IaaS?',
    'a',
    'Infrastructure as a Service (Infraestrutura como Serviço), onde se aluga hardware virtualizado (servidores, redes).',
    ['Infraestrutura como Serviço.', 'Internet como Serviço.', 'Informação como Serviço.', 'Inteligência como Serviço.', 'Instalação como Serviço.']
  ),
  createQuestion('c2-20', '2', Subject.IT,
    'Em Python, qual símbolo é usado para comentários de uma linha?',
    'c',
    'O símbolo # (hash/cerquilha) é usado para iniciar comentários em Python.',
    ['//', '/*', '#', '<!--', '--']
  ),
  createQuestion('c2-21', '2', Subject.IT,
    'Qual a principal característica de um banco de dados NoSQL?',
    'b',
    'São bancos de dados não relacionais, ideais para dados não estruturados e alta escalabilidade.',
    ['Usa apenas tabelas rigorosas.', 'Não relacional, flexível e escalável.', 'Não permite salvar números.', 'É mais lento que o SQL.', 'Só funciona offline.']
  ),
  createQuestion('c2-22', '2', Subject.IT,
    'O que é o "Product Owner" no Scrum?',
    'd',
    'É o responsável por maximizar o valor do produto e gerenciar o Backlog do Produto.',
    ['O dono da empresa.', 'O gerente de RH.', 'O programador sênior.', 'O responsável pelo valor do produto e backlog.', 'O testador de software.']
  ),

  // =========================================================================
  // CADERNO 3: MATEMÁTICA, FINANCEIRA E ESTATÍSTICA
  // =========================================================================
  createQuestion('c3-01', '3', Subject.MATH, 
    'Um capital de R$ 1.000,00 aplicado a juros simples de 2% ao mês durante 5 meses resultará em um montante de:',
    'c', 
    'J = C * i * t -> J = 1000 * 0.02 * 5 = 100. Montante = 1000 + 100 = 1100.',
    ['R$ 1.050,00', 'R$ 1.020,00', 'R$ 1.100,00', 'R$ 1.200,00', 'R$ 1.150,00']
  ),
  createQuestion('c3-02', '3', Subject.MATH, 
    'No sistema de amortização SAC (Sistema de Amortização Constante), é correto afirmar que:',
    'a', 
    'No SAC, a amortização (abatimento da dívida) é fixa, o que faz os juros e as prestações decrescerem ao longo do tempo.',
    ['As prestações são decrescentes.', 'As prestações são fixas.', 'A amortização é crescente.', 'Os juros são fixos.', 'O saldo devedor aumenta.']
  ),
  createQuestion('c3-03', '3', Subject.MATH, 
    'Qual a taxa efetiva anual correspondente a uma taxa nominal de 12% ao ano com capitalização mensal?',
    'b', 
    '12% a.a / 12 meses = 1% a.m. Efetiva anual = (1,01)^12 - 1 ≈ 12,68%.',
    ['12%', 'Aproximadamente 12,68%', '10%', '13%', '11,5%']
  ),
  createQuestion('c3-04', '3', Subject.PROBABILITY, 
    'Ao lançar dois dados honestos simultaneamente, qual a probabilidade de a soma das faces ser igual a 7?',
    'd', 
    'Pares possíveis: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). Total de casos: 6*6=36. P = 6/36 = 1/6.',
    ['1/2', '1/12', '1/36', '1/6', '1/4']
  ),
  createQuestion('c3-05', '3', Subject.MATH, 
    'Se 5 máquinas produzem 500 peças em 5 dias, quantas peças 10 máquinas produzirão em 10 dias?',
    'e', 
    'Regra de três composta: Dobrou máquinas (x2) e dobrou tempo (x2). Produção quadruplica. 500 * 4 = 2000.',
    ['500', '1000', '1500', '2500', '2000']
  ),
  createQuestion('c3-06', '3', Subject.MATH, 
    'O valor presente de um fluxo de caixa futuro é calculado através do:',
    'a', 
    'Desconto do fluxo futuro pela taxa de juros (Desconto Racional Composto).',
    ['Desconto Composto.', 'Soma simples.', 'Multiplicação pela inflação.', 'Índice Bovespa.', 'Fator de acumulação.']
  ),
  createQuestion('c3-07', '3', Subject.MATH, 
    'Em uma progressão aritmética (PA) onde o primeiro termo é 2 e a razão é 3, qual é o décimo termo?',
    'b', 
    'an = a1 + (n-1)r -> a10 = 2 + (9)*3 = 2 + 27 = 29.',
    ['27', '29', '32', '26', '30']
  ),
  createQuestion('c3-08', '3', Subject.PROBABILITY, 
    'Uma urna contém 3 bolas vermelhas e 2 azuis. Retirando-se uma bola ao acaso, qual a chance de ser azul?',
    'c', 
    'Total = 5. Azuis = 2. P = 2/5 = 40%.',
    ['20%', '30%', '40%', '50%', '60%']
  ),
  createQuestion('c3-09', '3', Subject.MATH, 
    'Qual o montante de R$ 1.000,00 aplicados a juros compostos de 10% ao mês por 2 meses?',
    'd', 
    'M = C * (1+i)^2 = 1000 * (1,10)^2 = 1000 * 1,21 = 1210.',
    ['1100', '1200', '1220', '1210', '1300']
  ),
  createQuestion('c3-10', '3', Subject.MATH, 
    'No sistema Price (Tabela Price), a principal característica é:',
    'a', 
    'Prestações (PMT) constantes e iguais durante todo o período.',
    ['Prestações constantes.', 'Amortização constante.', 'Juros constantes.', 'Parcelas crescentes.', 'Correção monetária fixa.']
  ),
  createQuestion('c3-11', '3', Subject.MATH, 
    'Um desconto de 20% seguido de um aumento de 20% sobre o novo valor resulta em:',
    'b', 
    '100 * 0,80 = 80. 80 * 1,20 = 96. Perda de 4%.',
    ['Valor original.', 'Diminuição de 4% em relação ao original.', 'Aumento de 4%.', 'Aumento de 2%.', 'Diminuição de 2%.']
  ),
  createQuestion('c3-12', '3', Subject.MATH, 
    'A mediana do conjunto de dados {2, 5, 8, 1, 6} é:',
    'c', 
    'Ordenando: {1, 2, 5, 6, 8}. O termo central é 5.',
    ['8', '6', '5', '2', '1']
  ),
  createQuestion('c3-13', '3', Subject.MATH, 
    'Se log 2 = 0,30, qual o valor de log 8?',
    'd', 
    'log 8 = log (2^3) = 3 * log 2 = 3 * 0,30 = 0,90.',
    ['0,30', '0,60', '0,80', '0,90', '1,00']
  ),
  createQuestion('c3-14', '3', Subject.MATH, 
    'O coeficiente de variação é uma medida de:',
    'e', 
    'Mede a dispersão relativa (Desvio Padrão / Média).',
    ['Tendência central.', 'Assimetria.', 'Curtose.', 'Posição.', 'Dispersão relativa.']
  ),
  createQuestion('c3-15', '3', Subject.MATH, 
    'Qual é a negação da proposição "Todo bancário é atento"?',
    'b', 
    'A negação de "Todo" é "Algum não é" ou "Pelo menos um não é".',
    ['Nenhum bancário é atento.', 'Pelo menos um bancário não é atento.', 'Todo bancário é distraído.', 'Alguém atento não é bancário.', 'João não é atento.']
  ),
  createQuestion('c3-16', '3', Subject.MATH, 
    'A taxa real de juros desconta o efeito da:',
    'a', 
    'Taxa Real = (1 + Nominal) / (1 + Inflação) - 1.',
    ['Inflação.', 'Câmbio.', 'Selic.', 'Poupança.', 'TR.']
  ),
  createQuestion('c3-17', '3', Subject.MATH, 
    'Se um investimento dobra de valor a cada 10 anos, em quanto tempo ele quadruplicará?',
    'c', 
    'Dobrar = x2. Quadruplicar = x4 (que é x2 e depois x2 de novo). Logo, 10 anos + 10 anos = 20 anos.',
    ['10 anos', '15 anos', '20 anos', '30 anos', '40 anos']
  ),
  createQuestion('c3-18', '3', Subject.PROBABILITY, 
    'Quantos anagramas possui a palavra CAIXA?',
    'b', 
    'Total 5 letras. A letra A repete 2 vezes. P5 / P2 = 120 / 2 = 60.',
    ['120', '60', '24', '100', '50']
  ),
  createQuestion('c3-19', '3', Subject.MATH,
    'Para calcular os juros compostos, utilizamos a fórmula M = C(1+i)^t. O que representa a variável "t"?',
    'd',
    'A variável t representa o Tempo de aplicação.',
    ['Taxa', 'Total', 'Temperatura', 'Tempo', 'Tarifa']
  ),
  createQuestion('c3-20', '3', Subject.PROBABILITY,
    'Lançando uma moeda honesta 3 vezes consecutivas, qual a probabilidade de obter 3 caras?',
    'a',
    '(1/2) * (1/2) * (1/2) = 1/8.',
    ['1/8', '1/2', '1/4', '3/8', '1/6']
  ),
  createQuestion('c3-21', '3', Subject.MATH,
    'Qual é a moda do conjunto {2, 3, 3, 5, 7, 3, 2}?',
    'b',
    'Moda é o valor que mais se repete. O número 3 aparece três vezes.',
    ['2', '3', '5', '7', '3,5']
  ),

  // =========================================================================
  // CADERNO 4: PORTUGUÊS, INGLÊS E ÉTICA
  // =========================================================================
  createQuestion('c4-01', '4', Subject.PORTUGUESE, 
    'Assinale a alternativa em que o uso da crase é OBRIGATÓRIO.',
    'b', 
    'Fui à (a+a) cidade. Locuções adverbiais femininas também exigem crase.',
    ['Fui a pé.', 'Fui à cidade vizinha.', 'Vou a Curitiba.', 'Entreguei o livro a ela.', 'Estou disposto a ajudar.']
  ),
  createQuestion('c4-02', '4', Subject.PORTUGUESE, 
    'Em "Os clientes __ chegaram foram atendidos", qual pronome completa corretamente a frase (sentido restritivo)?',
    'a', 
    'Que. Pronome relativo universal.',
    ['que', 'onde', 'cujo', 'quem', 'qual']
  ),
  createQuestion('c4-03', '4', Subject.PORTUGUESE, 
    'Qual palavra abaixo está grafada INCORRETAMENTE segundo a norma culta?',
    'c', 
    'A forma correta é "Exceção".',
    ['Análise', 'Paralisar', 'Excessão', 'Pesquisa', 'Misto']
  ),
  createQuestion('c4-04', '4', Subject.PORTUGUESE, 
    'No trecho "Embora estivesse cansado, estudou.", a conjunção "Embora" indica:',
    'd', 
    'Concessão: ideia de contraste que não impede a ação.',
    ['Causa', 'Condição', 'Tempo', 'Concessão', 'Proporção']
  ),
  createQuestion('c4-05', '4', Subject.ENGLISH, 
    'Choose the correct option to complete: "The company _____ high profits last year."',
    'b', 
    'Past tense of achieve/make. "Achieved" ou "Made". Neste caso, "Reported" ou "Had". Opção B "Had" é comum.',
    ['Have', 'Had', 'Has', 'Having', 'Will have']
  ),
  createQuestion('c4-06', '4', Subject.ENGLISH, 
    'What is the meaning of the phrasal verb "Look after"?',
    'a', 
    'To take care of someone or something.',
    ['To take care of', 'To search for', 'To look at', 'To ignore', 'To buy']
  ),
  createQuestion('c4-07', '4', Subject.ENGLISH, 
    'In the sentence "The interest rates are rising", what does "rising" mean?',
    'c', 
    'Going up / Increasing.',
    ['Falling', 'Stopping', 'Increasing', 'Playing', 'Decreasing']
  ),
  createQuestion('c4-08', '4', Subject.ETHICS, 
    'O princípio da impessoalidade na administração pública determina que:',
    'e', 
    'O administrador deve agir em prol do interesse público, sem favorecer ou prejudicar pessoas específicas.',
    ['O funcionário não deve ter personalidade.', 'O atendimento deve ser feito por robôs.', 'O servidor pode favorecer amigos.', 'O sigilo é absoluto.', 'Os atos devem visar o interesse público, sem favorecimentos pessoais.']
  ),
  createQuestion('c4-09', '4', Subject.ETHICS, 
    'Sobre o Código de Ética da CAIXA, é vedado ao empregado:',
    'b', 
    'Usar o cargo para obter vantagens pessoais é uma violação ética grave.',
    ['Participar de atividades comunitárias.', 'Valer-se do cargo para obter vantagem indevida.', 'Investir em poupança.', 'Ser cliente de outro banco.', 'Discordar de opiniões em reuniões.']
  ),
  createQuestion('c4-10', '4', Subject.PORTUGUESE, 
    'A palavra "Intermunicipal" é formada por qual processo de derivação?',
    'a', 
    'Prefixo "Inter" + "Municipal". Derivação Prefixal.',
    ['Prefixal', 'Sufixal', 'Parassintética', 'Regressiva', 'Imprópria']
  ),
  createQuestion('c4-11', '4', Subject.PORTUGUESE, 
    'Em "Vende-se casas", a concordância está:',
    'c', 
    'Incorreta. O correto é "Vendem-se casas" (Casas são vendidas).',
    ['Correta, pois o sujeito é indeterminado.', 'Correta, pois casas é objeto direto.', 'Incorreta, o verbo deveria estar no plural (Vendem-se).', 'Opcional.', 'Incorreta, deveria ser "Vende casas".']
  ),
  createQuestion('c4-12', '4', Subject.ENGLISH, 
    'Translate: "Withdrawal".',
    'd', 
    'Saque (retirar dinheiro da conta).',
    ['Depósito', 'Empréstimo', 'Investimento', 'Saque', 'Extrato']
  ),
  createQuestion('c4-13', '4', Subject.ENGLISH, 
    'Choose the synonym for "Wealthy":',
    'b', 
    'Rich.',
    ['Poor', 'Rich', 'Sad', 'Small', 'Angry']
  ),
  createQuestion('c4-14', '4', Subject.ETHICS, 
    'Compliance refere-se a:',
    'a', 
    'Estar em conformidade com leis, regulamentos e normas internas.',
    ['Estar em conformidade com normas e leis.', 'Reclamar dos clientes.', 'Competir agressivamente.', 'Sonegar impostos.', 'Ignorar regras internas.']
  ),
  createQuestion('c4-15', '4', Subject.ETHICS, 
    'A Lei de Conflito de Interesses aplica-se a:',
    'e', 
    'Agentes públicos federais, incluindo empregados de empresas públicas como a Caixa.',
    ['Apenas ao Presidente da República.', 'Apenas a empresas privadas.', 'Ninguém.', 'Apenas estagiários.', 'Agentes públicos, evitando que interesses privados se sobreponham aos públicos.']
  ),
  createQuestion('c4-16', '4', Subject.PORTUGUESE, 
    'Qual a figura de linguagem presente em "O banco me estendeu a mão na dificuldade"?',
    'b', 
    'Personificação (Prosopopeia): Atribuir ações humanas (estender a mão) a seres inanimados ou instituições (banco).',
    ['Metáfora', 'Personificação (Prosopopeia)', 'Antítese', 'Pleonasmo', 'Eufemismo']
  ),
  createQuestion('c4-17', '4', Subject.ETHICS, 
    'A moralidade administrativa difere da moralidade comum pois:',
    'a', 
    'Não basta ser legal, tem que ser honesto. Deve-se distinguir o Bem do Mal e também o Honesto do Desonesto.',
    ['Exige apenas o cumprimento da lei, mesmo que imoral.', 'É menos rigorosa.', 'Depende da religião do servidor.', 'Não se aplica a empresas públicas.', 'Confunde-se com a vida privada.']
  ),
  createQuestion('c4-18', '4', Subject.ENGLISH, 
    'Which word is a "False Friend" (Falso Cognato) in Portuguese?',
    'c', 
    'Actually significa "Na verdade" ou "Realmente", e não "Atualmente".',
    ['Future', 'Music', 'Actually', 'Radio', 'Video']
  ),
  createQuestion('c4-19', '4', Subject.PORTUGUESE,
    'Em "A menina que estuda passa", a oração sublinhada é:',
    'b',
    'É uma oração subordinada adjetiva restritiva (restringe o sentido de menina).',
    ['Oração Coordenada.', 'Oração Subordinada Adjetiva Restritiva.', 'Oração Subordinada Substantiva.', 'Oração Adverbial.', 'Sujeito Composto.']
  ),
  createQuestion('c4-20', '4', Subject.PORTUGUESE,
    'Qual a classe gramatical da palavra "rapidamente"?',
    'd',
    'É um advérbio de modo.',
    ['Substantivo', 'Adjetivo', 'Verbo', 'Advérbio', 'Pronome']
  ),
  createQuestion('c4-21', '4', Subject.ETHICS,
    'A gestão da ética nas empresas estatais visa principalmente:',
    'a',
    'Fortalecer a confiança da sociedade na instituição.',
    ['Fortalecer a confiança da sociedade.', 'Aumentar o lucro a qualquer custo.', 'Punir todos os funcionários.', 'Diminuir o trabalho.', 'Evitar contratações.']
  ),
  createQuestion('c4-22', '4', Subject.ENGLISH,
    'Complete: "If I _____ money, I would buy a car."',
    'c',
    'Second Conditional (Unreal present): If + Past Simple, Would + Verb. Correct: "had".',
    ['Have', 'Has', 'Had', 'Having', 'Will have']
  )
];