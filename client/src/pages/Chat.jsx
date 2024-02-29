import '../components/chat/chat.scss'

const chat = () => {
  return (
    <div className="page-container">
      <h1 className="title">Chatear</h1>
      <div class="element">
        <div class="supGroupInput">
          <div class="groupInput">
            <label for="chatBox">Escribe tu mensaje:</label>
            <input id="chatBox" type="text" name="chatBox" class="input" />
          </div>
          <div class="groupInput">
            <label for="chatUser">Ingresa tu e-mail</label>
            <input id="chatUser" type="email" name="chatUser" class="input" />
            <i id='checkUser' class='bx bx-check visibleOff'></i>
          </div>
          <button id="clearMessages">Borrar todos los mensajes</button>
        </div>
        <div id="messageLogs">
          <p>.</p>
        </div>
      </div>
    </div>
  )
}

export default chat