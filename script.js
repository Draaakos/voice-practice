function processStart(exerciseNumber) {
  const language = 'en-US'

  if(!('webkitSpeechRecognition' in window)) {
    alert('api no sorportada')
    return;
  }

  // It is for create the configuration
  const recognition = createLanguage(language)
  recognition.start()
  recognition.onresult = event => {
    if(event.results[0].isFinal) {
      const text = event.results[0][0].transcript;
      const validateText = checkResults(text, exerciseNumber)

      const division = document.getElementById(`result${exerciseNumber}`)
      
      if(division.childNodes.length) {
        division.innerHTML = ""
      } 

      validateText.forEach(item => {
        const span = document.createElement('span')
        span.classList = item.status ? "correct" : "incorrect"
        span.innerHTML = item.word
        division.appendChild(span)
      })
    }
  }
}

function createLanguage(lang) {
  recognition = new webkitSpeechRecognition()
  recognition.lang = lang
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  return recognition
}

function checkResults(text, exerciseNumber) {
  const textExercise = document.getElementById(`exercise${exerciseNumber}`).textContent
  const formatterExercise = textExercise.split(" ")
  const formatterText = text.split(" ")
  console.log(text)

  return formatterExercise.map((word, index, arr) => {
    return {
      word: index === arr.length -1 ? word : `${word} `, 
      status: word === formatterText[index]
    }
  })
}