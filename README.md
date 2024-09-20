# Testes de Automação com Playwright

Este projeto contém testes automatizados para o site [SauceDemo](https://www.saucedemo.com/), usando Playwright.

## Estrutura dos Testes

### Testes de Login
- **Login com credenciais válidas**: Verifica se o login é bem-sucedido com credenciais corretas.
- **Login com credenciais inválidas**: Confirma que uma mensagem de erro aparece para credenciais erradas.

### Testes de Carrinho
- **Adicionar item ao carrinho**: Verifica se o item é adicionado corretamente ao carrinho.
- **Remover item do carrinho**: Testa a remoção de um item do carrinho.
- **Compra de um item com sucesso**: Realiza o fluxo completo de compra até a finalização.
- **Finalização com dados incompletos**: Garante que o processo de checkout falha quando os dados estão incompletos.
- **Tentativa de compra sem itens**: Valida que o sistema impede compras sem itens no carrinho.

### Testes de Funcionalidade
- **Visualizar detalhes de um item**: Garante que os detalhes de um produto são exibidos corretamente.
- **Alteração da ordem dos itens**: Testa a funcionalidade de ordenação por preço.
- **Logout com sucesso**: Verifica se o logout redireciona corretamente para a página de login.
