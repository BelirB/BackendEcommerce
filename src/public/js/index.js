document.querySelector('#logOut').addEventListener('click', async () => {
  await fetch("/api/sessions/logout")

  window.location.href = "/";
})

function moverA(pagina) {
  fetch(pagina)
}

document.querySelector('#copyright').innerHTML = `<p>&copy; Copyright ${new Date().getFullYear()}<span class="pstr"> Armado Bruyne</span>. PCs Armadas</p>`