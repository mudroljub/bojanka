const platno = document.getElementById('platno')
const sadrzaj = platno.getContext('2d')
const boje = document.getElementsByClassName('boja')

const tanka = 1
const srednja = 5
const debela = 15

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
  platno.width = platno.clientWidth
  platno.height = platno.clientHeight
  sadrzaj.lineWidth = srednja // default debljina četkice
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

platno.addEventListener('pointerdown', e => {
  pritisnuto = true
  platno.setPointerCapture(e.pointerId)
  azurirajMisha(e)
})
platno.addEventListener('pointermove', crtaj)
platno.addEventListener('pointerup', () => pritisnuto = false)
platno.addEventListener('pointercancel', () => pritisnuto = false)

document.getElementById('cetkica1').addEventListener('click', () => uzmiDebljinu(tanka))
document.getElementById('cetkica2').addEventListener('click', () => uzmiDebljinu(srednja))
document.getElementById('cetkica3').addEventListener('click', () => uzmiDebljinu(debela))
document.getElementById('brisac').addEventListener('click', obrisiPlatno)
document.getElementById('stapic').addEventListener('click', () => magicno = !magicno)
