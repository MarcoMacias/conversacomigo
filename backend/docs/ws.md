# Docs/Websocket 😁🛠


## Client: 
#### Events/"onClientSearch"
> Este evento é disparado do lado do cliente manipulado pelo proprio usuário. Quando o evento onClientSearch é emitido o usuário é registrado no sistema(caso ainda não exista naquela sessão) e começa uma busca via heartbeat para achar outro parceiro no mesmo uf, gender.

```javascript
socket.emit("onClientSearch", { uf: string, gender: string })
```

#### Events/"onClientSendMessage"
> Este evento é disparado do lado do cliente manipulado pelo proprio usuário. Quando o evento onClientSendMessage é emitido pelo usuário junto a mensagem todos na sala recebem a mensagem. Inclusive o jogador local.
```javascript
socket.emit("onClientSendMessage", message: string)
```


## Server:
#### Events/"onServerNotifyCreate"
> Este evento é disparado do lado servidor quando uma nova sala é criada com aquele usuário em especifico junto a compinação parceraria dele.
```javascript
// @type: users
{
  gender: string
  id: string
  room: string
  uf: string
}

socket.on("onServerNotifyCreate", (users) => {
  const talkingWith = users.find(user => user.id !== socket.id)
  console.log(talkingWith) // Retorna o socket.id do parceiro da conversa.
});
```

#### Events/"onRoomReceiveMessage"
> Este evento é disparado quando um usuário (tanto o local como o parceiro) envia uma mensagem.
```javascript
// @type: users
{
  message: string
  user: string
  date: ISO Date
}

socket.on("onRoomReceiveMessage", (data) => {
  console.log(data) // Retorna os tipos acima.
});
```

#### Events/"onServerRoomClose"
> O Evento de fechamento de sala é disparado quando um ou mais parceiros fecham a sala cujo estão. <b>bservação</b>: Este evento é disparado também quando um dos parceiros emitem o evento <b>"onServerNotifyCreate"</b>
```javascript
socket.on("onServerRoomClose", () => {
  window.location.reload() // Recarrega a página (eliminando assim o usuário restante na sala)
});
```



Você pode ver uma POC do sistema (Simplificado) em: <b>e2e/index.html</b>
