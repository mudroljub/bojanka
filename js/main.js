const platno = document.getElementById('platno')
const sadrzaj = platno.getContext('2d')
const boje = document.getElementsByClassName('boja')

const mish = {
  x: 0,
  y: 0
}

let pritisnuto = false
let magicno = false

/** FUNCTIONS **/

function slucajnaBoja() {
  let color = 'rgba('
  for (let i = 0; i < 3; i++) {
    color += Math.floor(Math.random() * 255) + ','
  }
  return color += '1)'
}

function praviPaletu() {
  boje[0].style.backgroundColor = '#fff' // prva je uvek bela
  for (let i = 1; i < boje.length; i++) {
    boje[i].style.backgroundColor = slucajnaBoja()
    boje[i].addEventListener('click', () => platno.color = boje[i].style.backgroundColor)
  }
  platno.color = boje[boje.length - 1].style.backgroundColor // poslednja je default
}

function obrisiPlatno() {
  sadrzaj.fillStyle = '#fff'
  sadrzaj.fillRect(0, 0, platno.width, platno.height)
  praviPaletu()
}

function postaviPlatno() { // uvek ga obriše
  platno.width = window.innerWidth * 0.9
  platno.height = window.innerHeight * 0.9
  sadrzaj.lineWidth = 10 // default debljina četkice
}

function azurirajMisha(e) {
  mish.x = e.pageX - platno.offsetLeft
  mish.y = e.pageY - platno.offsetTop
}

function crtaj(e) {
  if (!pritisnuto) return
  sadrzaj.beginPath()
  sadrzaj.moveTo(mish.x, mish.y)
  sadrzaj.lineCap = 'round'
  sadrzaj.lineTo(e.pageX - platno.offsetLeft, e.pageY - platno.offsetTop)
  sadrzaj.strokeStyle = platno.color
  sadrzaj.stroke()
  if (!magicno) azurirajMisha(e)
}

function uzmiDebljinu(broj) {
  sadrzaj.lineWidth = broj
}

/** EVENTS **/

window.onload = function() {
  praviPaletu()
  postaviPlatno()
}

window.onresize = postaviPlatno

platno.addEventListener('touchmove', crtaj)
platno.addEventListener('mouseup', () => pritisnuto = false)
platno.addEventListener('mousedown', () => pritisnuto = true)
platno.addEventListener('mousedown', azurirajMisha)
platno.addEventListener('mousemove', crtaj)

document.getElementById('cetkica1').addEventListener('click', () => uzmiDebljinu(5))
document.getElementById('cetkica2').addEventListener('click', () => uzmiDebljinu(10))
document.getElementById('cetkica3').addEventListener('click', () => uzmiDebljinu(20))
document.getElementById('brisac').addEventListener('click', obrisiPlatno)
document.getElementById('stapic').addEventListener('click', () => magicno = !magicno)
