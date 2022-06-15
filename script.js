/* Declarando variaveis */
var buttonPause = document.querySelector('.botao-pause').style.display = 'none'
var buttonAfter = document.querySelector('fa-forward')
var buttonBefore = document.querySelector('fa-backward')
var imagem = document.querySelector('.capa')
var musica = document.querySelector('#musica')
var duracao = document.querySelector('.maxTime')
var nomeMusica = document.querySelector('.nomeMusica')
var artista = document.querySelector('.artista')
var indexMusica = 0
var musicas = [
  {titulo: 'Musica 1', artista: 'Bruno Dubal', src: 'audio/audio1.mp3', img: 'imagens/capas/capa.png'}, 
  {titulo: 'Musica 2', artista: 'Julia Alves', src: 'audio/audio2.mp3', img: 'imagens/capas/capa2.png'}, 
  {titulo: 'Musica 3', artista: 'Michael Jackson', src: 'audio/audio3.mp3', img: 'imagens/capas/capa3.jpg'}
]

/* Iniciando pagina */
renderizarMusica(indexMusica)

/* Declarando eventos */
document.querySelector('#progress').addEventListener('click', (e) => {
  let barra = document.querySelector('#progress')
  barra.setAttribute('value', e.offsetX * 10 / 250)
  musica.currentTime = e.offsetX * musica.duration / 250
})
document.querySelector('#volume').addEventListener('click', volumeMusica)
document.querySelector('.botao-play').addEventListener('click', playMusica)
document.querySelector('.botao-pause').addEventListener('click', pausarMusica)
document.querySelector('#anterior').addEventListener('click', voltarMusica)
document.querySelector('#proxima').addEventListener('click', proximaMusica)
document.querySelector('.vol').addEventListener('click', volume)
musica.addEventListener('timeupdate', atualizarTempo)

/* Functions */
function volumeMusica(){
  let vol = document.querySelector('#volume')
  musica.volume = vol.value/100
}

function volume(){
  let vol =  document.querySelector('#volume')
  if(vol.style.display == 'block'){
    vol.style.display = 'none'
  } else {
    vol.style.display = 'block'
  }
}

function voltarMusica(){
  indexMusica --
  if (indexMusica < 0){
    indexMusica = musicas.length - 1
  }
  renderizarMusica(indexMusica)
  playMusica()
}

function proximaMusica(){
  indexMusica ++
  if (indexMusica > musicas.length - 1){
    indexMusica = 0
  }
  renderizarMusica(indexMusica)
  playMusica()
}

function segundosParaMinutos(segundos){
  var campoMinutos = Math.floor(segundos / 60)
  var campoSegundos = segundos % 60
  if (campoSegundos < 10){
    campoSegundos = '0' + segundos
  } 
  
  return campoMinutos+':'+campoSegundos
}

function renderizarMusica(index){
  musica.setAttribute('src', musicas[index].src)
  musica.addEventListener('loadeddata', () => {
    nomeMusica.textContent = musicas[index].titulo;
    artista.textContent = musicas[index].artista
    imagem.src = `${musicas[index].img}`
    duracao.textContent = segundosParaMinutos(Math.floor(musica.duration))
  })
}

function playMusica(){
  musica.play()
  document.querySelector('.botao-pause').style.display = 'block'
  document.querySelector('.botao-play').style.display = 'none'
}

function pausarMusica(){
  musica.pause()
  document.querySelector('.botao-pause').style.display = 'none'
  document.querySelector('.botao-play').style.display = 'block'
}

function atualizarTempo(){
  let barra = document.querySelector('#progress')
  barra.setAttribute('value', musica.currentTime / musica.duration * 100)
  let tempoDecorrido = document.querySelector('.cont')
  tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime))
  if(musica.currentTime === musica.duration){
    proximaMusica()
  }
}