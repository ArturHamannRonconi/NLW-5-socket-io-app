let socketAdminId = null
let emailUser
let socket

document.querySelector("#start_chat").addEventListener("click", event => {
  socket = io()

  const chatHelp = document.querySelector('#chat_help')
  chatHelp.style.display = 'none'
    
  const chatSupport = document.querySelector('#chat_in_support')
  chatSupport.style.display = 'block'

  const email = document.querySelector('#email').value
  emailUser = email
  const text = document.querySelector('#txt_help').value
  
  socket.on('connect', () => socket.emit('clientFirstAccess', { email, text }))

  socket.on('clientListMessages', messages => {
    const templateClient = document.querySelector('#message-user-template').innerHTML
    const templateAdmin = document.querySelector('#admin-template').innerHTML
    const messageTemplate = document.querySelector('#messages')

    const rendered = (template, data) =>
      Mustache.render(template, data)

    const showMessageOnScreen = args =>
      messageTemplate.innerHTML += rendered(args.template, args.data)

    messages.forEach(message => {
      message.isClientMessage
      ? showMessageOnScreen({ template: templateClient, data: { message: message.text, email } })
      : showMessageOnScreen({ template: templateAdmin, data: { message_admin: message.text } })
    })
  })

  socket.on('adminSendToClient', message => {
    socketAdminId = message.socket_id
    const template_admin = document.querySelector('#admin-template').innerHTML
    const rendered =  Mustache.render(template_admin, { message_admin: message.text })

    document.querySelector('#messages').innerHTML += rendered

  })

});


document.querySelector('#send_message_button').addEventListener('click', () => {
  const text = document.querySelector('#message_user')

  socket.emit('clientSendToAdmin', { text: text.value, socketAdminId })

  const templateClient = document.querySelector('#message-user-template').innerHTML
  const rendered = Mustache.render(templateClient, { message: text.value, email: emailUser})

  document.querySelector('#messages').innerHTML += rendered
  text.value = ''
})