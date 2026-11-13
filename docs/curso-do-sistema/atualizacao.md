# Atualização do sistema

- **Tela:** `/app/settings/atualizacao`
- **Resumo:** Onde quem instalou o sistema vê a versão em uso, descobre que saiu uma versão nova, lê o que muda e pede a atualização sem abrir o servidor.
- **Fonte:** `curso/licoes/atualizacao.json`

## Atualizando para a versão nova

**Objetivo:** Reconhecer o aviso de versão nova, ler o que muda e pedir a atualização pela tela.

**Quem pode:** admin

**Palavras de busca:** atualizar o sistema, versão nova, nova versão disponível, qual versão estou usando, o que mudou na versão, atualizar agora

1. **O aviso de versão nova** — No rodapé do menu fica a versão em uso. Quando sai uma versão nova, aparece logo abaixo o aviso "Nova versão", com o número dela. Só quem administra a instalação vê esse aviso, porque só essa pessoa pode atualizar. Clique nele.
   - Rota: `/app/inbox`
2. **A versão instalada e a nova** — A tela abre com o número da versão nova no título. No quadro logo abaixo ficam a "Versão instalada", a última versão oficial publicada e a data em que o servidor confirmou o que está rodando. A "Revisão" é o código exato da versão, útil se for pedir ajuda.
   - Rota: `/app/settings/atualizacao`
3. **O que muda** — Mais abaixo, "O que muda" lista as novidades da versão nova, como o próprio projeto as publicou. Se alguma delas pedir uma ação sua, um quadro amarelo "Requer atenção" aparece antes do botão, e aí vale ler antes de atualizar.
4. **O botão Atualizar agora** — Ao lado de "Atualizar agora", a tela avisa o que acontece: o sistema sai do ar por cerca de 2 minutos e volta sozinho, e antes disso é feita uma cópia de segurança dos dados. Escolha um horário de pouco movimento e clique.
5. **Pedido enviado** — O pedido fica anotado e o servidor confere de poucos em poucos minutos se há algo a fazer: a atualização pode levar uns cinco minutos para começar, e a tela parada nesse tempo é normal. O relógio mostra há quanto tempo o pedido espera. Pode fechar a página: o pedido não se perde, e a tela acompanha sozinha cada etapa até o sistema voltar.

