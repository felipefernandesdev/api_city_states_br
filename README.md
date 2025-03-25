```markdown
# 🚀 API Cidades & Estados - Documentação Oficial 🌍✨

Bem-vindo ao coração da **API Cidades & Estados**! Esta é uma solução simples, elegante e poderosa para acessar informações sobre estados e cidades do Brasil. Feita com ❤️ e Node.js, esta API foi projetada para ser fácil de usar e integrar em seus projetos.

---

## 📋 Sumário

1. [Visão Geral](#visão-geral)
2. [Endpoints Disponíveis](#endpoints-disponíveis)
3. [Como Usar a API](#como-usar-a-api)
4. [Exemplos de Requisições](#exemplos-de-requisições)
5. [Sobre o Autor](#sobre-o-autor)
6. [Contato](#contato)

---

## 🌆 Visão Geral

A **API Cidades & Estados** é uma ferramenta desenvolvida para fornecer dados geográficos de forma rápida e eficiente. Com ela, você pode obter informações detalhadas sobre estados e cidades do Brasil, facilitando o desenvolvimento de sistemas que dependem desses dados.

- **Versão Atual:** `1.0.0`
- **Ambiente:** Pode ser usado tanto em modo de desenvolvimento quanto em produção.
- **Tecnologias Utilizadas:** Node.js, Express.js.

---

## 🛣️ Endpoints Disponíveis

| Método | Endpoint                          | Descrição                                                                 |
|--------|-----------------------------------|---------------------------------------------------------------------------|
| GET    | `/`                               | Retorna uma mensagem de boas-vindas com informações sobre a API.          |
| GET    | `/estados`                        | Lista todos os estados do Brasil.                                        |
| GET    | `/estados/:uf`                    | Retorna informações de um estado específico com base na UF (sigla).      |
| GET    | `/estado/nome/:nome`              | Retorna informações de um estado específico com base no nome.            |
| GET    | `/estados/:uf/cidades`            | Lista todas as cidades de um estado específico com base na UF.           |
| GET    | `/cidades/:nome`                  | Retorna informações de uma cidade específica com base no nome.           |

---

## 🔧 Como Usar a API

Para começar a usar a API, basta fazer requisições HTTP para os endpoints listados acima. A API responde em formato JSON, facilitando a integração com qualquer aplicação.

### Exemplo de URL Base
```
https://api-cidades-estados.com
```

### Autenticação
Atualmente, a API não requer autenticação. No entanto, futuras versões podem incluir métodos de autenticação para maior segurança.

---

## 📡 Exemplos de Requisições

### 1. Listar Todos os Estados
**Endpoint:** `/estados`  
**Método:** `GET`  
**Resposta:**
```json
[
  {
    "id": 1,
    "nome": "Acre",
    "uf": "AC"
  },
  {
    "id": 2,
    "nome": "Alagoas",
    "uf": "AL"
  }
]
```

---

### 2. Obter Informações de um Estado por UF
**Endpoint:** `/estados/:uf`  
**Exemplo:** `/estados/SP`  
**Resposta:**
```json
{
  "id": 25,
  "nome": "São Paulo",
  "uf": "SP"
}
```

---

### 3. Listar Cidades de um Estado
**Endpoint:** `/estados/:uf/cidades`  
**Exemplo:** `/estados/SP/cidades`  
**Resposta:**
```json
[
  {
    "id": 1,
    "nome": "São Paulo"
  },
  {
    "id": 2,
    "nome": "Campinas"
  }
]
```

---

### 4. Obter Informações de uma Cidade por Nome
**Endpoint:** `/cidades/:nome`  
**Exemplo:** `/cidades/São Paulo`  
**Resposta:**
```json
{
  "id": 1,
  "nome": "São Paulo",
  "estado": "SP"
}
```

---

## 👨‍💻 Sobre o Autor

Esta API foi criada com muito carinho e dedicação por **Felipe Sousa**, um desenvolvedor apaixonado por tecnologia e inovação. Com foco em soluções práticas e eficientes, Felipe busca sempre proporcionar experiências incríveis para seus usuários.

---

## 📞 Contato

Se você tiver dúvidas, sugestões ou quiser colaborar, fique à vontade para entrar em contato:

- **E-mail:** [fesousadev@gmail.com](mailto:fesousadev@gmail.com)  
- **WhatsApp:** [(88) 99215-7767](https://wa.me/5588992157767)  

---

✨ **Obrigado por usar a API Cidades & Estados!** ✨  
Esperamos que ela seja útil para o seu projeto. Não se esqueça de compartilhar suas experiências e feedbacks conosco. 💻🌍❤️
```