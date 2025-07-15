//ALL IN ALL ITS WORKING FINE, BUT THE IMAGE REQUIREMENT IS QUESTIONABLE WHEN ITS MAIN PURPOSE IS TO JUST GENRATE RANDOM QOUTES.
const QUOTES_API = "https://aot-api.vercel.app/quote";

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

    const quote = data.quote || "No quote found.";
    const author = data.author || "Unknown";

    const reader = new FileReader();
    reader.onload = () => {
      const photoURL = reader.result;

      outputDiv.innerHTML = `
        <div class="result-card">
          <img src="${photoURL}" alt="Uploaded Photo" />
          <h2>${username}</h2>
          <p class="quote">"${quote}"</p>
          <p class="author">— ${author}</p>
        </div>
      `;
    };

    reader.readAsDataURL(photoFile);
  } catch (error) {
    console.error(error);
    alert("An error occurred while fetching the quote.");
  }
});
