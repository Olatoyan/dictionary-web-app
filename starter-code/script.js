"use strict";
const body = document.querySelector("body");

const displaySection = document.querySelector(".display__section");
const errorSection = document.querySelector(".error__section");
const selectFonts = document.querySelector(".select__fonts");
const fontsBox = document.querySelector(".fonts__box ");
const fontName = document.querySelector(".font__name");
const toggleTheme = document.getElementById("check");
const inputField = document.querySelector(".input__field");
const greyText = document.querySelectorAll(".grey__text");
const inputSection = document.querySelector(".input__section");
const meaningBox = document.querySelector(".part__of__speech__box");
const inputError = document.querySelector(".error__input");
const spinner = document.querySelector(".loading__box");

const displaySpinner = function () {
  displaySection.innerHTML = "";
  errorSection.innerHTML = "";
  spinner.style.display = "flex";
};
const closeSpinner = function () {
  spinner.style.display = "none";
};
const displayFonts = function () {
  fontsBox.style.opacity = "1";
  fontsBox.style.visibility = "visible";
};

const closeFonts = function (e) {
  fontsBox.style.opacity = "0";
  fontsBox.style.visibility = "hidden";
};

body.addEventListener("click", function (e) {
  if (e.target.closest(".fonts__box")) return;
  if (!e.target.closest(".select__fonts") && !e.target.closest(".font__name")) {
    fontsBox.style.opacity = "0";
    fontsBox.style.visibility = "hidden";
  }
});

// document.addEventListener("click", function (e) {
//   const clickedElement = e.target;
//   if (!fontsBox.contains(clickedElement)) {
//     closeFonts();
//   }
// });

const toggleFonts = function (e) {
  e.stopPropagation();
  console.log(e.target);
  if (e.target.classList.contains("sans-serif")) {
    const name = e.target.textContent;
    fontName.textContent = name;
    body.style.fontFamily = "Inter, sans-serif";
    console.log("hi");
    closeFonts();
  }
  if (e.target.classList.contains("serif")) {
    const name = e.target.textContent;
    fontName.textContent = name;
    body.style.fontFamily = "Lora, serif";
    closeFonts();
  }
  if (e.target.classList.contains("mono")) {
    const name = e.target.textContent;
    fontName.textContent = name;
    body.style.fontFamily = "inconsolata, monospace";
    closeFonts();
  }
};

fontsBox.addEventListener("click", toggleFonts);

selectFonts.addEventListener("click", displayFonts);

const updateTheme = function () {
  const body = document.querySelector("body");
  const darkText = document.querySelectorAll(".black__text");
  const inputBgColor = document.querySelectorAll(".input__bg__color");
  const dividingLine = document.querySelectorAll(".divding__line");
  const inputField = document.querySelector(".input__field");
  const moonLogo = document.querySelector(".moon__icon");
  const fontsBox = document.querySelector(".fonts__box ");

  if (toggleTheme.checked) {
    console.log("Checkbox is checked");
    body.style.backgroundColor = "#050505";
    darkText.forEach((text) => (text.style.color = "#fff"));
    inputBgColor.forEach((bg) => (bg.style.backgroundColor = "#1f1f1f"));
    dividingLine.forEach((line) => (line.style.backgroundColor = "#3a3a3a"));
    inputField.style.setProperty("--placeholder-color", "#fff");
    moonLogo.style.stroke = "#a445ed";
    fontsBox.style.backgroundColor = "#1f1f1f";
    fontsBox.style.boxShadow = "0 0.5rem 3rem 0 #a445ed";

    // Perform actions when the checkbox is checked
  } else {
    console.log("Checkbox is unchecked");
    body.style.backgroundColor = "#fff";
    darkText.forEach((text) => (text.style.color = "#2d2d2d"));
    inputBgColor.forEach((bg) => (bg.style.backgroundColor = "#f4f4f4"));
    dividingLine.forEach((line) => (line.style.backgroundColor = "#e9e9e9"));
    inputField.style.setProperty("--placeholder-color", "#2d2d2d");
    moonLogo.style.stroke = "#838383";
    fontsBox.style.backgroundColor = "#fff";
    fontsBox.style.boxShadow = " 0 0.5rem 3rem rgba(0, 0, 0, 0.2)";
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
            <div class="play__box ${audio ? audio !== undefined : "hidden"}"">
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
              ${audio ? `<audio src="${audio.audio}"></audio>` : ""}
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

const renderSourceUrl = function (data) {
  const html = `
    <div class="last__divider divding__line"></div>
      <div class="source__box">
        <span class="source__word grey__text">Source</span>
        <div class="link__box">
        <a
          href="${data[0]}"
          class="source__link black__text"
          target="_blank"
          >${data[0]}</a
        >
        <img
          src="assets/images/icon-new-window.svg"
          alt="new window"
          class="source__icon"
        />
    </div>
    </div>
  `;

  displaySection.insertAdjacentHTML("beforeend", html);
  console.log(data);
};

const renderError = function (data) {
  const html = `
      <img src="assets/images/unnamed.png" alt="sad image" class="sad" />
      <h2 class="error__heading black__text">${data.title}</h2>
      <span class="error__message grey__text">
       ${data.message} ${data.resolution}
      </span>
  `;

  console.log(html);
  errorSection.insertAdjacentHTML("beforeend", html);
};

const searchWord = async function (word) {
  try {
    displaySpinner();
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = await res.json();
    console.log(data[0]);
    console.log(data);
    if (!res.ok) {
      throw new Error(JSON.stringify(data));
    }
    // console.log(firstAudioData);
    displaySection.innerHTML = "";
    errorSection.innerHTML = "";
    renderWord(data[0], displaySection);
    renderMeaning(data[0].meanings);
    renderSourceUrl(data[0].sourceUrls);
    closeSpinner();
    updateTheme();
  } catch (err) {
    // renderError(data);
    console.log(err);
    const data = JSON.parse(err.message);
    displaySection.innerHTML = "";
    errorSection.innerHTML = "";

    errorSection.style.display = "flex";

    renderError(data);
  }
};
inputSection.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("hi");
  if (inputField.value.trim() === "") {
    inputError.style.display = "block";
    inputSection.style.border = "1px solid #ef5252";
  } else {
    inputError.style.display = "none";
    inputSection.style.border = "none";
    searchWord(inputField.value.trim());
  }
});

// searchWord();
// playAudio.addEventListener("click", async function () {
//   await audio.play();
//   console.log("hi");
// });
