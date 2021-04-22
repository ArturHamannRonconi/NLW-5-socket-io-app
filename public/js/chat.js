let socket

document.querySelector("#start_chat").addEventListener("click", event => {
  // const socket = io()
  if(!socket) socket = io()

  const chatHelp = document.querySelector('#chat_help')
  chatHelp.style.display = 'none'
    
  const chatSupport = document.querySelector('#chat_in_support')
  chatSupport.style.display = 'block'

  const email = document.querySelector('#email').value
  const text = document.querySelector('#txt_help').value
  
  socket.on('connect', () => {
    socket.emit('clientFirstAccess', { email, text }, (call, err) => {
      if(err) console.error(err)
      else    console.log(call)
    })
  })

});
