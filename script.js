
const searchBtn = document.querySelector('#searchBtn');
const definition = document.querySelector('.definition');
const word1 = document.querySelector('.word_1');
const phonetic = document.querySelector('.phonetic');
const origin = document.querySelector('.origin');


searchBtn.addEventListener('click', findWord)

async function findWord() {
    const word = document.querySelector('.input').value; // collect word from user
    const res = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+word); // fetch the api with input word
    const data = await res.json(); 

    word1.innerHTML = data[0].word;
    phonetic.innerHTML  = `[ ${data[0].phonetic} ]`;
    origin.innerHTML = data[0].origin;
    
    document.querySelector('.definition').innerHTML = ''; // clears the document 
    for (let i = 0; i < data[0].meanings.length ; i++) {
        definition.innerHTML += `<p>${data[0].meanings[i].definitions[0].definition}</p>`;
    }
};



