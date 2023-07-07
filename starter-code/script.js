"use strict";

const displaySection = document.querySelector(".display__section");
const selectFonts = document.querySelector(".select__icon");
const fontsBox = document.querySelector(".fonts__box ");
const toggleTheme = document.getElementById("check");
const inputField = document.querySelector(".input__field");

const greyText = document.querySelectorAll(".grey__text");
const inputSection = document.querySelector(".input__section");
// const playAudio = document.querySelector(".play__box");
// const audio = document.querySelector("audio");
const meaningBox = document.querySelector(".part__of__speech__box");
// console.log(dividingLine);
// console.log(greyText);
// console.log(darkText);

// console.log(toggleTheme);

const updateTheme = function () {
  const body = document.querySelector("body");
  const darkText = document.querySelectorAll(".black__text");
  const inputBgColor = document.querySelectorAll(".input__bg__color");
  const dividingLine = document.querySelectorAll(".divding__line");
  const inputField = document.querySelector(".input__field");
  const moonLogo = document.querySelector(".moon__icon");

  if (this.checked) {
    console.log("Checkbox is checked");
    body.style.backgroundColor = "#050505";
    darkText.forEach((text) => (text.style.color = "#fff"));
    inputBgColor.forEach((bg) => (bg.style.backgroundColor = "#1f1f1f"));
    dividingLine.forEach((line) => (line.style.backgroundColor = "#3a3a3a"));
    inputField.style.setProperty("--placeholder-color", "#fff");
    moonLogo.style.stroke = "#a445ed";

    // Perform actions when the checkbox is checked
  } else {
    console.log("Checkbox is unchecked");
    body.style.backgroundColor = "#fff";
    darkText.forEach((text) => (text.style.color = "#2d2d2d"));
    inputBgColor.forEach((bg) => (bg.style.backgroundColor = "#f4f4f4"));
    dividingLine.forEach((line) => (line.style.backgroundColor = "#e9e9e9"));
    inputField.style.setProperty("--placeholder-color", "#2d2d2d");
    moonLogo.style.stroke = "#838383";
  }
};

toggleTheme.addEventListener("change", updateTheme);

const renderWord = function (data, displaySection) {
  const audio = data.phonetics.find((element) => element.audio !== "");
  console.log(audio);

  const html = `
          <div class="heading__box">
            <div class="main__word__box">
              <h1 class="main__word black__text">${data.word}</h1>
              <p class="transcribed__word">${
                data.phonetic ? data.phonetic : ""
              }</p>
            </div>
            <div class="play__box">
              <svg
                class="play__icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 75 75"
              >
                <g fill-rule="evenodd">
                  <circle cx="37.5" cy="37.5" r="37.5" opacity=".25" />
                  <path d="M29 27v21l21-10.5z" />
                </g>
              </svg>
              <audio
              src="${audio.audio}"
            ></audio>
            </div>
          </div>        
          </div>
    `;

  displaySection.insertAdjacentHTML("afterbegin", html);
  const playAudio = document.querySelector(".play__box");
  const sound = document.querySelector("audio");
  console.log(playAudio);
  playAudio.addEventListener("click", function () {
    sound.play();
    console.log("hi");
  });
};

const renderMeaning = function (data) {
  let html = "";
  data.forEach((item) => {
    console.log(item);
    let definitionsHtml = ``;
    item.definitions
      .map((definition) => {
        definitionsHtml += `<li class="definitions black__text">${
          definition.definition
        }</li> ${
          definition.example
            ? `<p class="definition__expression grey__text">"${definition.example}"</p>`
            : ""
        }`;
      })
      .join("");
    let synonymsHtml = "";
    if (item.synonyms && item.synonyms.length > 0) {
      synonymsHtml = `
        <div class="synonym__box">
          <p class="synonym grey__text">
            Synonyms &mdash; ${item.synonyms
              .map((syn) => `<span class="synonym__word">${syn}</span>`)
              .join(", ")}
          </p>
        </div>
      `;
    }
    let antonymsHtml = "";
    if (item.antonyms && item.antonyms.length > 0) {
      antonymsHtml = `
        <div class="synonym__box">
          <p class="synonym grey__text">
            Antonyms &mdash; ${item.antonyms
              .map((syn) => `<span class="synonym__word">${syn}</span>`)
              .join(", ")}
          </p>
        </div>
      `;
    }

    html += `
            <div class="noun__box">
              <p class="part__of__speech noun black__text">${
                item.partOfSpeech ? item.partOfSpeech : ""
              }</p>
              <div class="rectangle__line divding__line"></div>
            </div>
            <div class="noun__meaning meaning__box">
              <p class="meaning__word grey__text">Meaning</p>
              <ul class="meaning__list">
              ${definitionsHtml}
              </ul>
             ${synonymsHtml}
             ${antonymsHtml}
          </div>
  `;
  });
  // console.log(html);
  // console.log(data);
  displaySection.insertAdjacentHTML("beforeend", html);
  // console.log(data.meanings.forEach((msg) => msg));
  // data.meanings.forEach((msg) => console.log(msg));
  //   <p class="definition__expression grey__text">
  //   “Keyboarding is the part of this job I hate the most.”
  // </p>
};

const searchWord = async function (word) {
  const res = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  const data = await res.json();
  console.log(data[0]);

  // console.log(firstAudioData);
  displaySection.innerHTML = "";
  renderWord(data[0], displaySection);
  renderMeaning(data[0].meanings);
};
inputSection.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("hi");
  searchWord(inputField.value.trim());
});

// searchWord();
// playAudio.addEventListener("click", async function () {
//   await audio.play();
//   console.log("hi");
// });
