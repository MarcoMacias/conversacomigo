# Docs/Http 🌐



### Autenticando um usuário
```http
  GET /admin/auth
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `Basic Authentication` | `auth` | **Obrigatório**. Este buffer é gerado ao selecionar a opção de autenticação "Basic Auth" |

#### Exemplo prático utilizando axios
```javascript
const { data } = await api.get("/admin/auth", {
  auth: {
    username: "zezinho",
    password: "123",
  },
});

console.log(data) // Retorna um token jwt.
```
**Obs:** Tenha em mente a necessidade de salvar ``data.token`` no localStorage para uso posterior.

<br>

---
### Salas Ativas
```http
  GET /admin/rooms
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `x-access-token` | `headers` | **Obrigatório**. Você necessita passar o token jwt para que o backend faça a verificação de nível de acesso. |

#### Exemplo prático utilizando axios
```javascript
const { data } = await api.get("/admin/rooms", {
 headers: {
  ['x-access-token']: 'tokenJWT'
 }
});

console.log(data) // Uma lista de salas
```
<br>

---

### Mensagens de uma Sala
```http
  GET /admin/rooms/:roomId/messages
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `roomId` | `query` | **Obrigatório**. Para conseguir obter todas as mensagens de uma sala você deve apontar a sala via id. |
| `x-access-token` | `headers` | **Obrigatório**. Você necessita passar o token jwt para que o backend faça a verificação de nível de acesso. |

#### Exemplo prático utilizando axios
```javascript
const { data } = await api.get("/admin/rooms/123/messages", {
 headers: {
  ['x-access-token']: 'tokenJWT'
 }
});

console.log(data) // Retorna uma lista de todas as mensagens enviadas
```

<br>

---

### Banindo um usuário
```http
  PUT /admin/users/:userId/ban
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `userId` | `query` | **Obrigatório**. Necessário para especificar ao sistema quaç usuário banir.. |
| `x-access-token` | `headers` | **Obrigatório**. Você necessita passar o token jwt para que o backend faça a verificação de nível de acesso. |

#### Exemplo prático utilizando axios
```javascript
const { data } = await api.put("/admin/users/1234/ban", {
 headers: {
  ['x-access-token']: 'tokenJWT'
 }
});
```
**Obs:** Vale ressaltar que o backend salva no database o ip do usuário banido assim evitando que ele utilize outro navegador para conectar.