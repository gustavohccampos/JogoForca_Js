//contador de erros
let erro = 0

//validar se jogo esta iniciado
let iniciado = 0

//pegar a palavra
var palavra = ''
var palavraIngles = ''

//contar quantidade de letras da palavra
var count = 0

//transformar a palavra em array
var parray = {}

//LER a Tecla digitada
document.onkeypress = function (e) {
  keypress = keyPressed(e)
  //Chama a função para validar a tecla digitada
  if (erro < 5) {
    tecla(keyPressed(e), palavraIngles, count, parray)
    if (checkLetras(parray, palavraIngles) == true) {
      document.getElementById('mensagemOk').innerHTML =
        '<p>Parabéns! Você Ganhou!!!Acertou a palavra: ' +
        palavraIngles.toUpperCase() +
        ' </p>'
    }
  }
}

//Função para capturar a tecla digitada
function keyPressed(e) {
  e = e || window.event
  var key = e.keyCode || e.which
  return String.fromCharCode(key)
}

//funcao reiniciar o jogo
function reiniciar() {
  console.log(
    'palavra:' +
      palavra +
      ' - palavra ingles:' +
      palavraIngles +
      ' - count:' +
      count +
      ' - Parray:' +
      parray
  )

  for (var i = 0; i < parray.length; i++) {
    var elemento = document.querySelector('#letra' + i)
    elemento.parentNode.removeChild(elemento)
  }
  palavra = ''
  palavraIngles = ''
  parray = []
  count = 0
  erro = 0
  iniciado = 1
  document.getElementById('forca').innerHTML = '<img src="forca.png" />'
  document.getElementById('mensagemFim').textContent = ''
  document.getElementById('mensagemOk').textContent = ''

  fetch('palavras.txt')
    .then(response => response.text())
    .then(text => {
      const array = text.split('\r\n')
      let tamanho = array.length

      var aleatorio = ~~(Math.random() * tamanho)

      let index = array[aleatorio].indexOf(',')

      document.getElementById('palavra').innerHTML =
        '<div id="palavra">A palavra é: <p>' +
        array[aleatorio].split(',', 1) +
        '</p>'
      ;('</div>')

      palavraIngles = array[aleatorio].substring(index + 1)
      parray = palavraIngles.split('')
      count = parray.length
      palavra = array[aleatorio].substring(0, index)

      //monta o campo das letras para preencher
      contarLetras(palavraIngles, count, parray)
      console.log(
        'palavra:' +
          palavra +
          ' - palavra ingles:' +
          palavraIngles +
          ' - count:' +
          count +
          ' - Parray:' +
          parray
      )
    })
}

//funcao para contar as letras que a palavra possui
function contarLetras(palavra, count, parray) {
  for (var i = 0; i < count; i++) {
    letras.innerHTML += "<li id='letra" + i + "'>_</li>"
  }
}

//funcao para Validar a tecla e computar como erro ou acerto
function tecla(tecla, palavra, count, parray) {
  for (var i = 0; i < palavra.length; i++) {
    if (parray[i] == tecla) {
      document.getElementById('letra' + i).innerHTML = tecla
    }
  }

  if (!palavra.includes(tecla)) {
    erro++
    document.getElementById('forca').innerHTML =
      '<img src="forca' + erro + '.png" />'
    if (erro == 5) {
      document.getElementById('mensagemFim').innerHTML =
        '<p>Que pena, Fim de Jogo!Tente outra vez</p><p>A palavra correta é: ' +
        palavraIngles.toUpperCase() +
        '</p>'
    }
  }
}

//funcao para checkar as letras digitadas e conferir com a palavra final
function checkLetras(parray, palavra) {
  let juntarLetras = ''
  for (var i = 0; i < parray.length; i++) {
    juntarLetras += document.getElementById('letra' + i).textContent
  }
  if (juntarLetras == palavra) {
    document.getElementById('forca').innerHTML = '<img src="fim.png" />'
    return true
  } else return false
}

console.log(
  'palavra:' +
    palavra +
    ' - palavra ingles:' +
    palavraIngles +
    ' - count:' +
    count +
    ' - Parray:' +
    parray
)
