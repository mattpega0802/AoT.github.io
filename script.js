const QUOTES_API = "https://attackontitanquotes.vercel.app/";

const getQuoteBtn = document.getElementById("getQuote");
const usernameInput = document.getElementById("username");
const photoInput = document.getElementById("photoInput");
const outputDiv = document.getElementById("output");

getQuoteBtn.addEventListener("click", async () => {
  const username = usernameInput.value.trim();
  const photoFile = photoInput.files[0];

  if (!username) {
    alert("Please enter your name.");
    return;
  }

  if (!photoFile) {
    alert("Please upload your picture.");
    return;
  }

  try {
    const response = await fetch(QUOTES_API);
    if (!response.ok) throw new Error("Failed to fetch quote.");
    const data = await response.json();

    const quote = data.quote;
    const character = data.character;

    const reader = new FileReader();
    reader.onload = () => {
      const photoURL = reader.result;

      outputDiv.innerHTML = `
        <div class="result-card">
          <img src="${photoURL}" alt="Uploaded Photo" />
          <h2>${username}</h2>
          <p class="quote">"${quote}"</p>
          <p class="author">— ${character}</p>
        </div>
      `;
    };

    reader.readAsDataURL(photoFile);
  } catch (error) {
    console.error(error);
    alert("An error occurred while fetching the quote.");
  }
});
