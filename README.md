This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



## Melhorias da API de reservas

### Validações

* [ ] Verificar se o `property_id` enviado realmente é válido.
* [ ] Verificar se `guests` é um número inteiro entre 1 e 4.
* [ ] Verificar se as datas enviadas são realmente datas válidas.
* [ ] Verificar se o preço da propriedade retornado pelo banco é válido.
* [ ] No futuro, usar Zod para organizar melhor as validações.

### Datas

* [ ] Corrigir possíveis problemas com horário e fuso horário.
* [ ] Melhorar a forma como as datas de entrada e saída são tratadas.
* [ ] Melhorar o cálculo da quantidade de noites.

### Sistema de reservas

* [ ] Impedir que duas pessoas consigam reservar a mesma propriedade para as mesmas datas ao mesmo tempo.
* [ ] Fazer o banco de dados também impedir reservas que se sobreponham.
* [ ] Verificar se é necessário usar uma transação ao criar uma reserva.
* [ ] Decidir se um usuário poderá fazer mais de uma reserva para a mesma propriedade.

### Pagamento

* [ ] Salvar no banco se o pagamento escolhido foi Pix ou cartão.
* [ ] Deixar claro que atualmente a API apenas registra o método de pagamento e não realiza um pagamento real.
* [ ] No futuro, integrar um sistema de pagamento real.

### Banco de dados

* [ ] Garantir que uma propriedade não possa ser reservada para datas ocupadas.
* [ ] Garantir que `user_id` e `property_id` sempre apontem para registros existentes.
* [ ] Garantir que campos obrigatórios não possam ficar vazios.
* [ ] Garantir que o número de hóspedes não possa receber valores inválidos.
* [ ] Verificar se o tipo usado para armazenar o preço é adequado.

### Testes

* [ ] Testar uma reserva normal.
* [ ] Testar uma propriedade que não existe.
* [ ] Testar uma pessoa que não está logada.
* [ ] Testar uma data de check-in no passado.
* [ ] Testar check-out antes do check-in.
* [ ] Testar check-in e check-out na mesma data.
* [ ] Testar quantidade de hóspedes inválida.
* [ ] Testar método de pagamento inválido.
* [ ] Testar uma propriedade que já está reservada.
* [ ] Testar duas reservas feitas ao mesmo tempo para a mesma propriedade.
* [ ] Testar dados incorretos ou inesperados enviados pelo usuário.

### Organização do código

* [ ] Padronizar os nomes das variáveis.
* [ ] Separar algumas partes da API em funções menores se ela continuar crescendo.
* [ ] Separar as regras de negócio da rota caso o código fique muito grande.
