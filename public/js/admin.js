const socket = io()
const connectionsUsers = []
let connectionInSupport = []

const rendered = (temp, data) => Mustache.render(temp, data)

socket.on('adminListAllUsers', connections => {
  const messagesTemplate  = document.querySelector('#list_users')
  const template = document.querySelector('#template').innerHTML

  messagesTemplate.innerHTML = ''

  connections.forEach(connection => {
    connectionsUsers.push(connection)

    messagesTemplate.innerHTML += rendered(template, {
      email: connection.User.email,
      id: connection.socket_id
    })

  })
})



const createBloonChat = chat => {
  const createDiv = document.createElement('div')
  createDiv.className = chat.className
  createDiv.innerHTML = chat.spanText
  return createDiv
}

function call(id) {
  const connection = connectionsUsers
    .find(connection => connection.socket_id === id)

  connectionInSupport.push(connection)

  const template = document.querySelector('#admin_template').innerHTML

  document.querySelector('#supports').innerHTML += rendered(template, {
    email: connection.User.email,
    id: connection.User.id
  })

  socket.emit('adminUserInSupport', connection.User.id)

  socket.emit('adminListMessagesByUser', connection.User.id, messages => {
    const divMessages = document.querySelector(`#allMessages${connection.User.id}`)
    
    messages.forEach(message => {
      message.isClientMessage
      ? divMessages.appendChild(createBloonChat({
        className: 'admin_message_client',
        spanText: `${connection.User.email}<br>${message.text}`,
        chat: message.created_at
      }))
      : divMessages.appendChild(createBloonChat({
        className: 'admin_message_admin',
        spanText: `Atendente: <span>${message.text}</span>`,
        chat: undefined
      }))

    })

  })
}

function sendMessage(id) {
  const text = document.querySelector(`#send_message_${id}`)
  socket.emit('adminSendMessage', { text: text.value, user_id: id })

  const divMessages = document.querySelector(`#allMessages${id}`)

  
  divMessages.appendChild(createBloonChat({
    className: 'admin_message_admin',
    spanText: `Atendente: <span>${text.value}</span>`,
    chat: undefined
  }))

  text.value = ''
}

socket.on('adminReceiveMessage', data => {
  const connection = connectionInSupport.find(connection => connection.socket_id === data.socket_id)
  const divMessages = document.querySelector(`#allMessages${connection.User.id}`) 

  divMessages.appendChild(createBloonChat({
    className: 'admin_message_client',
    spanText: `${connection.User.email}<br>${data.message.text}`,
    chat: data.message.created_at
  }))
})
