# Docs/Http 🌐



### Autenticando um usuário
```http
  GET /auth
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `basic_auth_buffer` | `string` | **Obrigatório**. Este buffer é gerado ao selecionar a opção de autenticação "Basic Auth" |

#### Exemplo prático utilizando axios
```javascript
const { data } = await api.get("/auth", {
  auth: {
    username: "zezinho",
    password: "123",
  },
});

console.log(data) // Retorna um token jwt.
```
