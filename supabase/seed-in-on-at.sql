-- 15 exercícios sobre IN / ON / AT (baseados no material da Ana).
-- Distribuição: 5 múltipla escolha · 5 preencher lacuna · 3 reescrever · 2 associar.
-- Ficam vinculados à conta dona (contato@anapaulaperci.com), source = 'manual'.
-- Rode uma vez no SQL editor do Supabase.

with owner as (
  select id from auth.users where lower(email) = 'contato@anapaulaperci.com' limit 1
)
insert into ingles.exercises
  (type, topic, difficulty, question, options, correct_answer, explanation, source, user_id)
select v.type, v.topic, v.difficulty, v.question, v.options::jsonb, v.correct_answer, v.explanation, 'manual', owner.id
from owner, (values
  -- ───────── MÚLTIPLA ESCOLHA (5) ─────────
  ('multiple_choice','prepositions','easy',
   'The book is ___ the shelf.',
   '["A) in","B) on","C) at"]',
   'on',
   'Superfícies usam "on" (on the shelf, on the table). O livro está apoiado sobre a prateleira.'),
  ('multiple_choice','prepositions','easy',
   'The train leaves ___ noon.',
   '["A) in","B) on","C) at"]',
   'at',
   'Horários e momentos exatos usam "at": at noon, at 3 o''clock, at bedtime.'),
  ('multiple_choice','prepositions','easy',
   'Her birthday is ___ December.',
   '["A) in","B) on","C) at"]',
   'in',
   'Meses e períodos longos usam "in": in December, in 2025, in the morning.'),
  ('multiple_choice','prepositions','medium',
   'We have a call ___ Monday.',
   '["A) in","B) on","C) at"]',
   'on',
   'Dias da semana e datas usam "on": on Monday, on July 4th, on my birthday.'),
  ('multiple_choice','prepositions','medium',
   'I''ll meet you ___ the mall entrance.',
   '["A) in","B) on","C) at"]',
   'at',
   'Pontos específicos usam "at": at the entrance, at the bus stop, at 123 Main Street.'),

  -- ───────── PREENCHER LACUNA (5) ─────────
  ('fill_blank','prepositions','easy',
   'There''s a nice picture ___ the wall.',
   null,
   'on',
   '"On" também vale para superfícies verticais em contato: on the wall, on the door.'),
  ('fill_blank','prepositions','medium',
   'She''s really good ___ cooking.',
   null,
   'at',
   'Habilidades usam "at": good at cooking, good at school, at math.'),
  ('fill_blank','prepositions','medium',
   'I was born ___ 1995.',
   null,
   'in',
   'Anos usam "in": in 1995, in the 90s. Tempo longo → in.'),
  ('fill_blank','prepositions','medium',
   'Let''s meet ___ the bus stop.',
   null,
   'at',
   'Ponto específico do trajeto usa "at": at the bus stop, at the corner.'),
  ('fill_blank','prepositions','hard',
   'He''s ___ the taxi, on his way.',
   null,
   'in',
   'Veículos pequenos (car, taxi, van) usam "in": in the car, in a taxi. Transporte grande/público usa "on".'),

  -- ───────── REESCREVER CORRIGINDO (3) ─────────
  ('rewrite','prepositions','hard',
   'I arrived at Brazil last night.',
   null,
   'I arrived in Brazil last night.',
   'Chegar a países/cidades usa "in": arrived in Brazil. "At" fica para pontos específicos (arrived at the airport).'),
  ('rewrite','prepositions','hard',
   'She is in the bus to work.',
   null,
   'She is on the bus to work.',
   'Transporte público e grande (bus, train, plane, boat) usa "on": on the bus, on the plane.'),
  ('rewrite','prepositions','medium',
   'We''ll see you at Monday.',
   null,
   'We''ll see you on Monday.',
   'Dias da semana usam "on", nunca "at": on Monday.'),

  -- ───────── ASSOCIAR ELEMENTOS (2) ─────────
  ('match','prepositions','medium',
   'Associe cada frase à preposição certa (com o contexto).',
   '{"left":["I have a class ___ 8 a.m.","The cat is sleeping ___ the sofa.","They live ___ Portugal."],"right":["at (horário exato)","on (superfície)","in (país)"],"pairs":[[0,0],[1,1],[2,2]]}',
   'at (horário) · on (superfície) · in (país)',
   'at = horário exato (at 8 a.m.); on = superfície (on the sofa); in = país (in Portugal).'),
  ('match','prepositions','medium',
   'Associe cada frase à preposição certa (com o contexto).',
   '{"left":["She lives ___ the third floor.","My exam is ___ Friday.","He''s great ___ drawing."],"right":["on (andar do prédio)","on (dia da semana)","at (habilidade)"],"pairs":[[0,0],[1,1],[2,2]]}',
   'on (andar) · on (dia) · at (habilidade)',
   'Andares usam "on" (on the third floor); dias usam "on" (on Friday); habilidades usam "at" (good at drawing).')
) as v(type,topic,difficulty,question,options,correct_answer,explanation);
