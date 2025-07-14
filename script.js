const QUOTES_API = "https://attackontitanquotes.vercel.app/";

const getQuoteBtn = document.getElementById("getQuote");
const usernameInput = document.getElementById("username");
const photoInput = document.getElementById("photoInput");
const outputDiv = document.getElementById("output");

getQuoteBtn.addEventListener("click", async () => {
  const username = usernameInput.value.trim();
  const photoFile = photoInput.files[0];

  // Validate
  if (!username) {
    alert("Please enter your name.");
    return;
  }
  if (!photoFile) {
    alert("Please upload your picture.");
    return;
  }

  try {
    // Fetch a random quote
    const response = await fetch(QUOTES_API);
    if (!response.ok) throw new Error("Failed to fetch quote.");
    const data = await response.json();

    const quote = data.quote;
    const character = data.character;

    // Read photo as data URL
    const reader = new FileReader();
    reader.onload = () => {
      const photoURL = reader.result;

      // Render output
      outputDiv.innerHTML = `
        <img src="${photoURL}" alt="Uploaded Photo"/>
        <p>"${quote}"<br>— ${character}</p>
      `;
    };
    reader.readAsDataURL(photoFile);
  } catch (error) {
    console.error(error);
    alert("An error occurred while fetching the quote.");
  }
});