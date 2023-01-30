const searchBtn = document.querySelector("#searchBtn");
const definition = document.querySelector(".definition");
const word_1 = document.querySelector(".word_1");
const phonetic = document.querySelector(".phonetic");
const sound = document.querySelector(".sound");
const origin = document.querySelector(".origin");
const word2 = document.querySelector("#word");
const audio = document.querySelector(".audio");
const syn = document.querySelector(".syn");
const syn_heading = document.querySelector(".syn_heading");
const badWord = document.querySelector(".badWord");

// Fires searchBtn when you press Enterkey in the input field
word2.addEventListener("keyup", function (e) {
    if (e.code === "Enter") {
        searchBtn.click();
    }
});

searchBtn.addEventListener("click", findWord);

async function findWord() {

    let word = document.querySelector(".input").value; // collect word from user
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`); // fetch the api with input word
    const data = await res.json();

    if (data.title == "No Definitions Found" || word == ' ') {


        badWord.innerHTML = `<p> Sorry, no definitions found for ${word} &#128533;</p>`;

        badWord.classList.add("wobble-hor-top");

        // clears the document of any existing entries
        sound.classList.remove("sound_1"); // removes the sound icon visibility

        syn_heading.classList.remove("syn_heading_1"); //removes the Synonymns heading

        const cls = document.querySelectorAll(".cls");
        cls.forEach(function (e) {
            e.innerHTML = "";
        });

    } else {

        // Clears error message
        document.querySelector(".badWord").innerHTML = "";

        badWord.classList.remove("wobble-hor-top");

        word_1.innerHTML = data[0].word;
        phonetic.innerHTML = `[ ${data[0].phonetic} ]`;

        // Add sound button to the DOM
        sound.classList.add("sound_1"); // makes the icon visible on click

        // Play word
        sound.addEventListener("click", function () {
            audio.innerHTML = `<audio id="myAudio"> <source src="${data[0].phonetics[?(@.audio!=="")].audio}"> </audio>`;
            const myAudio = document.querySelector("#myAudio");
            myAudio.play();
        });

        // Origin
        origin.innerHTML = `<p> origin <br> ${data[0].origin} </p>`;

        // Definitions
        document.querySelector(".definition").innerHTML = ""; // clears the document
        for (let i = 0; i < data[0].meanings.length; i++) {
            definition.innerHTML += `<p>${data[0].meanings[i].partOfSpeech}</p>
            <p>${data[0].meanings[i].definitions[0].definition}</p>
            <p>${data[0].meanings[i].definitions[0].example}</p>
            <br>`;
        };

        // Synonyms
        document.querySelector(".syn").innerHTML = ""; // clears the document
        syn_heading.classList.add("syn_heading_1"); //adds Synonymn heading

        let synNum = data[0].meanings[0].definitions[0].synonyms.slice(0, 7).length; //capping the number of synonyms
        // loops through to display list of synonyms
        for (let i = 0; i < synNum; i++) {
            syn.innerHTML += `<li><a class="synLists">${data[0].meanings[0].definitions[0].synonyms[i]}</a></li>`;

            // Making the synonyms recursive 
            let synLists = document.querySelectorAll('.synLists');

            synLists.forEach(function (e) {

                e.addEventListener('click', function (event) {
                    // Converts synLists to an array and then outputs the index of clicked item to A 
                    let A = Array.from(synLists).indexOf(event.target);
                    document.querySelector(".input").value = syn.innerText.split('\n')[A];

                    findWord();
                    
                    // Scroll back to the top
                    window.scrollTo({top: 0, behavior: 'smooth'});

                });
            });
        };
    };
};

