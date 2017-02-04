var platno = document.getElementById('platno');
var sadrzaj = platno.getContext('2d');
var boje = document.getElementsByClassName("boja");
var slike_drzac = document.getElementById("slike_drzac");
var pritisnuto;

var slike = ["strumf-bojanka.gif", "duga-bojanka.jpg", "gljive-bojanke.jpg", "ninjago.png", "poni-bojanka.png", "mali-poni-bojanka.jpg", "klovn.jpeg", "avion-bojanka.jpg", "pepa-i-dzordz.gif", "angry-birds.jpg", "leonardo.jpg", "rafaelo.jpg", "kornjaca.gif", "gormit.jpg", "gormiti.gif", "ariela.jpg", "jasmina.jpg", "pokahontas.jpg", "snezana.gif"];

function postaviSlike() {
  for (var i = 0; i < slike.length; i++) {
    var ime_slike = slike[i];
    slike[i] = new Image();
    slike[i].className = "slike";
    slike[i].src = "slike/" + ime_slike;
    slike_drzac.appendChild(slike[i]);
    slike[i].addEventListener("click", postaviSliku);
  }
}

function postaviSliku() {
  obrisiPlatno();
  var prirodna_sirina = this.naturalWidth;
  var prirodna_visina = this.naturalHeight;

  // ako je uspravno
  if (platno.height >= platno.width) {
    var nova_sirina = platno.width - 10;
    var nova_visina = prirodna_visina * (nova_sirina / prirodna_sirina);
    // ako je slika viša od platna
    if (nova_visina >= platno.height) {
      nova_visina = platno.height - 20;
      nova_sirina = prirodna_sirina * (nova_visina / prirodna_visina);
    }
  }
  // ako je položeno
  else {
    var nova_visina = platno.height - 20;
    var nova_sirina = prirodna_sirina * (nova_visina / prirodna_visina);
    // ako je slika šira od platna
    if (nova_sirina >= platno.width) {
      nova_sirina = platno.width - 40;
      nova_visina = prirodna_visina * (nova_sirina / prirodna_sirina);
    }
  }

  var polazno_x = (platno.width - nova_sirina) / 2;
  var polazno_y = (platno.height - nova_visina) / 2;
  sadrzaj.drawImage(this, polazno_x, polazno_y, nova_sirina, nova_visina);
}

function rastegniPlatno() { // neminovno ga obriše
  platno.width = window.innerWidth * 0.9;
  platno.height = window.innerHeight * 0.9;
  sadrzaj.lineWidth = 10; // početna debljina četkice
}

function praviPaletu() {
  for (var i = 0; i < boje.length; i++) {
    boje[i].style.backgroundColor = slucajnaBoja();
    boje[i].addEventListener("click", function() {
      platno.color = this.style.backgroundColor;
    });
  } // kraj for
  boje[0].style.backgroundColor = "#fff"; // prva je uvek bela
  platno.color = boje[boje.length - 1].style.backgroundColor; // poslednja boja je za crtanje
}

function postaviPocetnu(e) {
  platno.X = e.pageX - platno.offsetLeft
  platno.Y = e.pageY - platno.offsetTop
  console.log(platno)
}

function lepoCrtaj(e) {
  if (pritisnuto) {
    sadrzaj.beginPath();
    sadrzaj.moveTo(platno.X, platno.Y);
    sadrzaj.lineCap = 'round';
    sadrzaj.lineTo(e.pageX - platno.offsetLeft, e.pageY - platno.offsetTop);
    sadrzaj.closePath(); // opciono
    sadrzaj.strokeStyle = platno.color;
    sadrzaj.stroke();
    postaviPocetnu(e);
  }
}

function slucajnaBoja() {
  color = 'rgba(';
  for (var i = 0; i < 3; i++) {
    color += Math.floor(Math.random() * 255) + ',';
  }
  return color += '1)';
}

function obrisiPlatno() {
  sadrzaj.fillStyle = '#fff';
  sadrzaj.fillRect(0, 0, platno.width, platno.height);
  praviPaletu();
}

function uzmiDebljinu(broj) {
  sadrzaj.lineWidth = broj;
}


/************ ANDROID *************/

platno.addEventListener("touchmove", function() {
  lepoCrtaj(event);
});
