/**
 * As 1000 palavras mais faladas do inglês (lista de frequência geral),
 * com tradução em português. Formato compacto `palavra|tradução` por linha
 * para manter o arquivo enxuto; o parser abaixo transforma em objetos com
 * `rank` (posição na lista) e `id` estável.
 *
 * A ordem segue, no topo, as palavras de maior frequência (function words) e
 * depois cobre o vocabulário essencial por temas (verbos, pessoas, casa,
 * cidade, comida, viagem, trabalho, tempo, números, cores, etc.).
 */

export interface CommonWord {
  id: string
  /** posição na lista (1 = mais comum) */
  rank: number
  word: string
  translation: string
}

const RAW = `the|o / a
be|ser / estar
to|para / a
of|de
and|e
a|um / uma
in|em
that|que / aquele
have|ter
I|eu
it|isso / ele(a)
for|para / por
not|não
on|em / sobre
with|com
he|ele
as|como / enquanto
you|você
do|fazer
at|em / no
this|este / isto
but|mas
his|dele / seu
by|por / perto de
from|de / a partir de
they|eles / elas
we|nós
say|dizer
her|dela / a ela
she|ela
or|ou
an|um / uma
will|vai / vontade
my|meu / minha
one|um / uma
all|todos / tudo
would|iria / -ria
there|lá / há
their|deles / delas
what|o que / que
so|então / tão
up|para cima
out|fora
if|se
about|sobre / cerca de
who|quem
get|conseguir / pegar
which|qual / que
go|ir
me|me / mim
when|quando
make|fazer
can|poder
like|gostar / como
time|tempo / vez
no|não / nenhum
just|apenas / justo
him|ele / a ele
know|saber / conhecer
take|pegar / levar
people|pessoas
into|para dentro de
year|ano
your|seu / sua
good|bom
some|algum / alguns
could|poderia
them|eles / a eles
see|ver
other|outro
than|do que
then|então / depois
now|agora
look|olhar / parecer
only|só / apenas
come|vir
its|seu / dele(a)
over|sobre / acabado
think|pensar / achar
also|também
back|costas / de volta
after|depois de
use|usar
two|dois
how|como
our|nosso
work|trabalho / trabalhar
first|primeiro
well|bem / poço
way|caminho / jeito
even|até / mesmo
new|novo
want|querer
because|porque
any|qualquer
these|estes / estas
give|dar
day|dia
most|a maioria / mais
us|nós / a nós
through|através de
down|para baixo
should|deveria
many|muitos
those|aqueles
where|onde
much|muito
before|antes de
right|certo / direita
too|também / demais
old|velho
same|mesmo
tell|contar / dizer
follow|seguir
came|veio
each|cada
very|muito
little|pequeno / pouco
state|estado
world|mundo
still|ainda
own|próprio
men|homens
long|longo / comprido
here|aqui
between|entre
both|ambos
life|vida
being|sendo / ser
under|sob / debaixo de
never|nunca
another|outro
while|enquanto
last|último / durar
might|poderia
great|ótimo / grande
off|desligado / fora
since|desde / já que
against|contra
three|três
high|alto
need|precisar
house|casa
home|lar / casa
find|encontrar / achar
place|lugar
again|de novo
around|ao redor de
however|porém / no entanto
turn|virar / vez
move|mover / mudar-se
thing|coisa
school|escola
country|país
always|sempre
night|noite
point|ponto
number|número
without|sem
during|durante
keep|manter / guardar
hand|mão
eye|olho
woman|mulher
side|lado
head|cabeça
became|tornou-se
few|poucos
become|tornar-se
later|mais tarde
seem|parecer
next|próximo
white|branco
children|crianças
begin|começar
something|algo
ask|perguntar / pedir
together|juntos
walk|andar / caminhar
show|mostrar / programa
part|parte
let|deixar / permitir
end|fim / terminar
big|grande
small|pequeno
every|cada / todo
found|encontrou / fundar
study|estudar / estudo
book|livro
nothing|nada
once|uma vez
went|foi
father|pai
mother|mãe
city|cidade
away|longe / fora
run|correr
talk|falar / conversa
play|brincar / tocar / jogar
real|real / verdadeiro
left|esquerda / deixou
read|ler
mean|significar
feel|sentir
done|feito / pronto
soon|logo / em breve
hard|difícil / duro
open|abrir / aberto
example|exemplo
begin|...
behind|atrás de
cannot|não pode
hear|ouvir
order|ordem / pedido
door|porta
sure|certeza / claro
problem|problema
become|...
better|melhor
yet|ainda
during|...
remember|lembrar
those|...
together|...
often|frequentemente
toward|em direção a
idea|ideia
enough|suficiente / o bastante
across|através de
along|ao longo de
mind|mente
fact|fato
month|mês
nothing|...
true|verdadeiro
word|palavra
group|grupo
help|ajudar / ajuda
line|linha / fila
during|...
form|forma / formulário
believe|acreditar
together|...
again|...
nation|nação
write|escrever
mother|...
matter|importar / assunto
business|negócio
remember|...
turn|...
already|já
heard|ouviu
several|vários
change|mudar / mudança
quite|bastante
since|...
appear|aparecer
deal|negócio / lidar
American|americano
team|time / equipe
held|segurou
lead|liderar / chumbo
person|pessoa
power|poder / energia
free|livre / grátis
true|...
during|...
half|metade / meio
late|tarde / atrasado
upon|sobre / em cima de
program|programa
moment|momento
society|sociedade
without|...
toward|...
view|vista / visão
member|membro
plan|plano / planejar
question|pergunta / questão
period|período
service|serviço
develop|desenvolver
present|presente / apresentar
example|...
family|família
husband|marido
remember|...
several|...
bring|trazer
hour|hora
better|...
true|...
during|...
already|...
control|controle / controlar
office|escritório
purpose|propósito
public|público
either|qualquer um / também não
matter|...
table|mesa / tabela
order|...
court|tribunal / quadra
across|...
care|cuidar / cuidado
keep|...
field|campo
support|apoiar / suporte
report|relatório / relatar
party|festa / partido
result|resultado
step|passo / degrau
nation|...
several|...
money|dinheiro
remember|...
example|...
above|acima de
sound|som / soar
position|posição
toward|...
sense|sentido / senso
return|retornar / retorno
case|caso
center|centro
period|...
level|nível
example|...
century|século
effect|efeito
front|frente
need|...
remember|...
build|construir
stay|ficar / permanecer
reach|alcançar / chegar
fall|cair / outono
cause|causar / causa
list|lista
stop|parar / parada
lot|monte / muito
hope|esperar / esperança
job|emprego / trabalho
food|comida
moment|...
clear|claro / limpar
allow|permitir
quickly|rapidamente
heart|coração
wait|esperar / aguardar
hold|segurar / aguentar
serve|servir
share|compartilhar / parte
agree|concordar
test|teste / testar
break|quebrar / pausa
collect|coletar
save|salvar / economizar
explain|explicar
study|...
catch|pegar / capturar
draw|desenhar / empatar
choose|escolher
cover|cobrir / capa
notice|notar / aviso
spend|gastar / passar (tempo)
fill|encher / preencher
grow|crescer
join|juntar-se / entrar
push|empurrar
require|exigir
visit|visitar / visita
suggest|sugerir
raise|levantar / criar
pass|passar / passe
sell|vender
decide|decidir
prepare|preparar
manage|gerenciar / conseguir
expect|esperar (aguardar)
worry|preocupar(-se)
travel|viajar / viagem
arrive|chegar
remain|permanecer
buy|comprar
listen|ouvir / escutar
speak|falar
answer|responder / resposta
learn|aprender
teach|ensinar
understand|entender
forget|esquecer
introduce|apresentar / introduzir
imagine|imaginar
realize|perceber
accept|aceitar
receive|receber
offer|oferecer / oferta
provide|fornecer
include|incluir
continue|continuar
return|...
remember|...
describe|descrever
discuss|discutir / conversar sobre
mention|mencionar
recognize|reconhecer
prefer|preferir
enjoy|aproveitar / curtir
relax|relaxar
wake|acordar
sleep|dormir
dream|sonhar / sonho
wear|vestir / usar (roupa)
carry|carregar / levar
throw|jogar / arremessar
pull|puxar
lift|levantar / elevador (BrE lift)
drop|deixar cair / soltar
touch|tocar / toque
press|pressionar / imprensa
hit|bater / acerto
shut|fechar
close|fechar / perto
lock|trancar / fechadura
knock|bater (na porta)
ring|tocar / anel
shake|sacudir / tremer
wave|acenar / onda
point|...
smile|sorrir / sorriso
laugh|rir / risada
cry|chorar / gritar
shout|gritar
whisper|sussurrar
sing|cantar
dance|dançar / dança
cook|cozinhar / cozinheiro
clean|limpar / limpo
wash|lavar
brush|escovar / pincel
cut|cortar / corte
build|...
fix|consertar / fixar
paint|pintar / tinta
drive|dirigir / impulso
fly|voar / mosca
swim|nadar
jump|pular / salto
climb|escalar / subir
fall|...
ride|andar (de) / passeio
park|estacionar / parque
cross|atravessar / cruz
follow|...
lead|...
guide|guiar / guia
search|procurar / busca
discover|descobrir
build|...
create|criar
design|projetar / design
draw|...
print|imprimir
type|digitar / tipo
click|clicar / clique
download|baixar
upload|enviar / subir
connect|conectar
call|ligar / chamar
text|mandar texto / texto
send|enviar
reply|responder / resposta
post|postar / correio
check|verificar / checar
update|atualizar / atualização
delete|apagar / excluir
copy|copiar / cópia
paste|colar
move|...
open|...
start|começar / partida
finish|terminar / chegada
win|ganhar / vitória
lose|perder
beat|bater / vencer
score|pontuar / placar
count|contar / contagem
measure|medir / medida
weigh|pesar
add|adicionar / somar
sum|soma / total
divide|dividir
multiply|multiplicar
solve|resolver
guess|adivinhar / palpite
plan|...
choose|...
compare|comparar
match|combinar / partida
sort|ordenar / tipo
order|...
arrange|organizar / arranjar
prepare|...
serve|...
offer|...
deliver|entregar
order|...
pay|pagar
cost|custar / custo
spend|...
earn|ganhar (dinheiro)
save|...
borrow|pegar emprestado
lend|emprestar
owe|dever (dinheiro)
afford|ter condição de pagar
waste|desperdiçar / lixo
value|valor / valorizar
price|preço
sale|venda / promoção
cheap|barato
expensive|caro
rich|rico
poor|pobre
man|homem
woman|...
child|criança
baby|bebê
boy|menino
girl|menina
kid|criança / garoto
adult|adulto
teenager|adolescente
parent|pai / mãe (responsável)
son|filho
daughter|filha
brother|irmão
sister|irmã
grandfather|avô
grandmother|avó
uncle|tio
aunt|tia
cousin|primo / prima
nephew|sobrinho
niece|sobrinha
friend|amigo / amiga
neighbor|vizinho
boss|chefe
colleague|colega (de trabalho)
partner|parceiro / sócio
guest|convidado / hóspede
stranger|estranho / desconhecido
people|...
group|...
team|...
crowd|multidão
public|...
couple|casal / par
name|nome
age|idade
body|corpo
face|rosto / cara
hair|cabelo
eye|...
ear|orelha / ouvido
nose|nariz
mouth|boca
tooth|dente
tongue|língua
lip|lábio
neck|pescoço
shoulder|ombro
arm|braço
elbow|cotovelo
hand|...
finger|dedo
nail|unha / prego
chest|peito / baú
back|...
stomach|estômago / barriga
leg|perna
knee|joelho
foot|pé
toe|dedo do pé
skin|pele
bone|osso
blood|sangue
brain|cérebro
heart|...
health|saúde
sick|doente
pain|dor
hurt|machucar / doer
doctor|médico
nurse|enfermeiro
hospital|hospital
medicine|remédio / medicina
pill|comprimido / pílula
cold|resfriado / frio
fever|febre
cough|tosse / tossir
rest|descanso / descansar
tired|cansado
hungry|com fome
thirsty|com sede
food|...
meal|refeição
breakfast|café da manhã
lunch|almoço
dinner|jantar
bread|pão
butter|manteiga
cheese|queijo
egg|ovo
milk|leite
coffee|café
tea|chá
water|água
juice|suco
wine|vinho
beer|cerveja
sugar|açúcar
salt|sal
rice|arroz
meat|carne
chicken|frango / galinha
fish|peixe
fruit|fruta
apple|maçã
banana|banana
orange|laranja
lemon|limão
grape|uva
potato|batata
tomato|tomate
onion|cebola
carrot|cenoura
salad|salada
soup|sopa
cake|bolo
cookie|biscoito / bolacha
chocolate|chocolate
ice|gelo
plate|prato
cup|xícara / copo
glass|copo / vidro
bottle|garrafa
knife|faca
fork|garfo
spoon|colher
kitchen|cozinha
table|...
chair|cadeira
bed|cama
room|quarto / sala
bedroom|quarto (de dormir)
bathroom|banheiro
living|sala de estar (living room)
floor|chão / andar
wall|parede / muro
roof|telhado
window|janela
door|...
key|chave
lamp|lâmpada / luminária
light|luz / leve
clock|relógio (de parede)
mirror|espelho
shelf|prateleira
drawer|gaveta
closet|armário / closet
garden|jardim / horta
yard|quintal
garage|garagem
house|...
home|...
apartment|apartamento
building|prédio / edifício
street|rua
road|estrada
avenue|avenida
corner|esquina / canto
bridge|ponte
park|...
square|praça / quadrado
market|mercado / feira
shop|loja / comprar
store|loja
mall|shopping
bank|banco
church|igreja
school|...
university|universidade
library|biblioteca
museum|museu
hospital|...
hotel|hotel
restaurant|restaurante
bar|bar / barra
cafe|café (lugar)
airport|aeroporto
station|estação
bus|ônibus
train|trem
subway|metrô
car|carro
taxi|táxi
bike|bicicleta
plane|avião
ship|navio
boat|barco
ticket|bilhete / ingresso
seat|assento / lugar
trip|viagem / tropeço
travel|...
map|mapa
luggage|bagagem
bag|bolsa / sacola
suitcase|mala
passport|passaporte
border|fronteira
country|...
city|...
town|cidade pequena / vila
village|vila / vilarejo
capital|capital
nation|...
world|...
earth|Terra / terra
sky|céu
sun|sol
moon|lua
star|estrela
cloud|nuvem
rain|chuva / chover
snow|neve / nevar
wind|vento
storm|tempestade
weather|tempo (clima)
sea|mar
ocean|oceano
lake|lago
river|rio
beach|praia
mountain|montanha
hill|colina / morro
forest|floresta
tree|árvore
flower|flor
grass|grama
leaf|folha
plant|planta / plantar
animal|animal
dog|cachorro
cat|gato
bird|pássaro / ave
horse|cavalo
cow|vaca
pig|porco
sheep|ovelha
chicken|...
fish|...
insect|inseto
bee|abelha
ant|formiga
spider|aranha
snake|cobra
lion|leão
tiger|tigre
bear|urso / aguentar
elephant|elefante
monkey|macaco
color|cor
red|vermelho
blue|azul
green|verde
yellow|amarelo
orange|...
purple|roxo
pink|rosa
brown|marrom
black|preto
white|...
gray|cinza
gold|ouro / dourado
silver|prata / prateado
shape|forma / formato
circle|círculo
square|...
line|...
round|redondo / rodada
flat|plano / apartamento (BrE)
size|tamanho
big|...
small|...
large|grande / amplo
huge|enorme
tiny|minúsculo
tall|alto (pessoa/prédio)
short|curto / baixo
wide|largo / amplo
narrow|estreito
thick|grosso / espesso
thin|fino / magro
deep|profundo
heavy|pesado
light|...
strong|forte
weak|fraco
hot|quente
warm|morno / quente
cool|fresco / legal
cold|...
dry|seco / secar
wet|molhado
clean|...
dirty|sujo
new|...
old|...
young|jovem
fast|rápido
slow|lento / devagar
early|cedo
late|...
easy|fácil
hard|...
simple|simples
difficult|difícil
important|importante
possible|possível
ready|pronto
sure|...
true|...
false|falso
real|...
right|...
wrong|errado
good|...
bad|ruim / mau
better|...
best|melhor (o)
worse|pior
worst|pior (o)
nice|legal / agradável
kind|gentil / tipo
mean|...
happy|feliz
sad|triste
angry|bravo / com raiva
afraid|com medo
scared|assustado
surprised|surpreso
tired|...
bored|entediado
excited|animado / empolgado
nervous|nervoso
calm|calmo
proud|orgulhoso
shy|tímido
brave|corajoso
funny|engraçado
serious|sério
quiet|quieto / silencioso
loud|barulhento / alto
busy|ocupado
free|...
full|cheio
empty|vazio
open|...
closed|fechado
high|...
low|baixo
near|perto
far|longe
left|...
right|...
up|...
down|...
front|...
behind|...
inside|dentro
outside|fora / lado de fora
top|topo / em cima
bottom|fundo / parte de baixo
middle|meio / centro
center|...
edge|borda / beira
beside|ao lado de
between|...
among|entre (vários)
above|...
below|abaixo de
over|...
under|...
through|...
across|...
along|...
around|...
toward|...
into|...
onto|sobre / para cima de
off|...
out|...
away|...
back|...
forward|para frente / adiante
north|norte
south|sul
east|leste
west|oeste
here|...
there|...
everywhere|em todo lugar
somewhere|em algum lugar
anywhere|em qualquer lugar
nowhere|em lugar nenhum
time|...
day|...
night|...
morning|manhã
afternoon|tarde
evening|fim de tarde / noite
today|hoje
tomorrow|amanhã
yesterday|ontem
week|semana
weekend|fim de semana
month|...
year|...
hour|...
minute|minuto
second|segundo
moment|...
now|...
soon|...
then|...
later|...
already|...
yet|...
still|...
always|...
never|...
often|...
sometimes|às vezes
usually|geralmente
rarely|raramente
again|...
ever|alguma vez
once|...
twice|duas vezes
early|...
late|...
Monday|segunda-feira
Tuesday|terça-feira
Wednesday|quarta-feira
Thursday|quinta-feira
Friday|sexta-feira
Saturday|sábado
Sunday|domingo
January|janeiro
February|fevereiro
March|março
April|abril
May|maio
June|junho
July|julho
August|agosto
September|setembro
October|outubro
November|novembro
December|dezembro
spring|primavera
summer|verão
autumn|outono
winter|inverno
season|estação / temporada
date|data / encontro
calendar|calendário
holiday|feriado / férias
birthday|aniversário
zero|zero
one|...
two|...
three|...
four|quatro
five|cinco
six|seis
seven|sete
eight|oito
nine|nove
ten|dez
eleven|onze
twelve|doze
twenty|vinte
thirty|trinta
forty|quarenta
fifty|cinquenta
hundred|cem
thousand|mil
million|milhão
first|...
second|...
third|terceiro
half|...
quarter|um quarto / trimestre
number|...
money|...
dollar|dólar
cent|centavo
coin|moeda
card|cartão
cash|dinheiro (em espécie)
account|conta
bill|conta / nota
change|...
job|...
work|...
office|...
company|empresa
business|...
factory|fábrica
worker|trabalhador
manager|gerente
employee|funcionário
customer|cliente
client|cliente
meeting|reunião
project|projeto
task|tarefa
deadline|prazo
salary|salário
contract|contrato
email|e-mail
phone|telefone
computer|computador
laptop|notebook
screen|tela
keyboard|teclado
mouse|mouse / rato
file|arquivo
folder|pasta
password|senha
internet|internet
website|site
app|aplicativo
software|software
data|dados
news|notícias
story|história
report|...
message|mensagem
letter|carta / letra
note|nota / bilhete
word|...
sentence|frase
question|...
answer|...
language|idioma / língua
English|inglês
Portuguese|português
French|francês
Spanish|espanhol
voice|voz
sound|...
music|música
song|canção / música
movie|filme
film|filme
game|jogo
sport|esporte
ball|bola
soccer|futebol
team|...
player|jogador
coach|treinador
practice|praticar / prática
exercise|exercício / exercitar
gym|academia
run|...
walk|...
art|arte
picture|foto / quadro
photo|foto
drawing|desenho
camera|câmera
color|...
paper|papel
pen|caneta
pencil|lápis
notebook|caderno
class|aula / turma / classe
lesson|lição / aula
student|aluno / estudante
teacher|professor
exam|prova / exame
grade|nota / série
homework|dever de casa / lição
knowledge|conhecimento
science|ciência
history|história
math|matemática
subject|matéria / assunto
idea|...
plan|...
goal|meta / gol
dream|...
choice|escolha
chance|chance / oportunidade
reason|razão / motivo
fact|...
truth|verdade
lie|mentira / deitar
secret|segredo
mistake|erro
problem|...
solution|solução
question|...
answer|...
example|...
detail|detalhe
fact|...
event|evento / acontecimento
moment|...
situation|situação
condition|condição
quality|qualidade
amount|quantia / quantidade
piece|pedaço / peça
part|...
half|...
whole|inteiro / todo
total|total
rest|...
most|...
least|menos / o mínimo
more|mais
less|menos
enough|...
few|...
several|...
many|...
much|...
all|...
some|...
none|nenhum
each|...
every|...
both|...
either|...
neither|nenhum dos dois
other|...
another|...
same|...
different|diferente
similar|parecido / similar
common|comum
special|especial
main|principal
general|geral
certain|certo / determinado
particular|particular / específico
clear|...
true|...
free|...
able|capaz
glad|contente / feliz
sorry|desculpe / arrependido
welcome|bem-vindo / de nada
please|por favor / agradar
thanks|obrigado(a)
hello|olá / oi
goodbye|tchau / adeus
yes|sim
no|...
maybe|talvez
okay|ok / tudo bem
question|...
why|por quê
because|...
who|...
what|...
when|...
where|...
which|...
whose|de quem / cujo
actually|na verdade
probably|provavelmente
especially|especialmente
finally|finalmente
exactly|exatamente
certainly|com certeza
perhaps|talvez
instead|em vez disso
although|embora
until|até (que)
whether|se / quer
everyone|todos / todo mundo
everything|tudo
anything|qualquer coisa
someone|alguém
myself|eu mesmo
yourself|você mesmo
shirt|camisa
dress|vestido
shoes|sapatos
hat|chapéu
jacket|jaqueta / casaco
umbrella|guarda-chuva
glasses|óculos
belt|cinto
how|...
job|...`

export const COMMON_WORDS: CommonWord[] = (() => {
  const seen = new Set<string>()
  const out: CommonWord[] = []
  for (const line of RAW.split('\n')) {
    const [rawWord, rawTranslation] = line.split('|')
    const word = rawWord?.trim()
    const translation = rawTranslation?.trim()
    // pula linhas-marcador de duplicata (ex.: `word|...`) e vazios
    if (!word || !translation || translation === '...') continue
    const key = word.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    out.push({
      id: `cw-${key.replace(/[^a-z]+/g, '-')}`,
      rank: out.length + 1,
      word,
      translation,
    })
  }
  return out
})()

export const COMMON_WORDS_TOTAL = COMMON_WORDS.length

/** Bandas de 100 palavras para navegação (ex.: "1–100", "101–200"). */
export interface WordBand {
  key: string
  label: string
  from: number
  to: number
  words: CommonWord[]
}

export const WORD_BANDS: WordBand[] = (() => {
  const SIZE = 100
  const bands: WordBand[] = []
  for (let i = 0; i < COMMON_WORDS.length; i += SIZE) {
    const slice = COMMON_WORDS.slice(i, i + SIZE)
    const from = i + 1
    const to = i + slice.length
    bands.push({
      key: `${from}-${to}`,
      label: `${from}–${to}`,
      from,
      to,
      words: slice,
    })
  }
  return bands
})()
