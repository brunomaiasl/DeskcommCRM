# Módulos (Admin)

- **Tela:** `/admin/modulos`
- **Resumo:** Onde quem instalou o sistema acrescenta partes extras ao servidor, como Comandas e Honorários, que passam a valer para todas as empresas dele.
- **Fonte:** `curso/licoes/admin-modulos.json`

## Conhecendo a tela de Módulos

**Objetivo:** Achar a tela de Módulos no Admin e reconhecer um módulo ainda não instalado e um já instalado.

**Quem pode:** admin

**Palavras de busca:** módulos do sistema, módulos da instalação, instalar comandas, instalar honorários, partes extras do sistema, admin módulos

1. **Onde fica a tela** — No Admin, o item "Módulos" do menu abre os "Módulos da instalação". Um módulo é uma parte extra do sistema, com lugar próprio para guardar os dados dele. Ele só ocupa espaço no servidor depois de instalado. E a instalação vale para todas as empresas deste servidor, não só para a sua clínica.
   - Rota: `/admin/modulos`
2. **Um módulo ainda não instalado** — Cada módulo aparece num cartão com o nome e uma frase sobre o que ele faz. "Honorários (advocacia)" guarda o contrato de cobrança de cada caso e o calendário de parcelas: serve para escritórios de advocacia. Enquanto o módulo não está instalado, o cartão mostra o botão "Instalar" à direita.
3. **Um módulo já instalado** — "Comandas" guarda a comanda de cada atendimento: os itens, a forma de pagamento, as comissões e os pontos de fidelidade. Neste servidor ele já foi instalado, por isso o cartão mostra o selo verde "Instalado" e não tem mais o botão. O caixa da clínica funciona com ou sem este módulo.

## Instalando um módulo

**Objetivo:** Saber o que acontece ao clicar em "Instalar" e onde o módulo aparece para a equipe depois.

**Quem pode:** admin

**Palavras de busca:** como instalar um módulo, ativar comandas no sistema, onde aparece o módulo instalado, módulo suspenso, desinstalar módulo, honorários advocacia

1. **O botão Instalar** — Para instalar, clique em "Instalar" no cartão do módulo. Enquanto o servidor prepara o espaço do módulo, o botão troca para "Instalando…" por alguns segundos (na foto ele ainda está parado). Não há versão para escolher nem empresa para marcar: um clique instala para o servidor inteiro. Instale só o que alguma empresa deste servidor vai usar. Esta tela não tem botão para desinstalar.
   - Rota: `/admin/modulos`
2. **Depois de instalar** — Quando a instalação termina, a lista se atualiza sozinha: o cartão ganha o selo "Instalado" e o botão some, como aconteceu aqui com "Comandas". Se um dia uma atualização do sistema não conseguir refazer o módulo, o selo vira "Suspenso", em vermelho, e as telas dele somem das empresas até a próxima atualização dar certo. Logo abaixo da descrição aparece o motivo, num texto técnico: copie e mande para quem cuida do seu servidor. Esta tela não tem botão para tentar de novo.
3. **Onde a equipe encontra o módulo** — Instalado, o módulo ganha uma tela dentro de cada empresa. A de "Comandas" fica no CRM: abra "Ver tudo em CRM" e procure a parte "O dia a dia da venda". Antes de instalar, esse cartão não aparece. O de "Honorários" aparece em "Ver tudo em Análise", na parte "Dinheiro". Se uma empresa escolheu um por um os itens do menu, a tela nova só aparece depois que alguém dela a marcar em Configurações, no "Menu lateral".
   - Rota: `/app/crm`

