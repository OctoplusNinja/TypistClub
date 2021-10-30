const quotes = [
	"Do not go gentle into that good night, old age should burn and rave at close of day. Rage, rage against the dying of the light.",
	"It is a good life we lead brother, the best, may it never change, and may it never change us.",
	"Maybe someday I'll cry on your shoulders... Just hold me till the last drop of my tears drops! I don't know about the laugh, but you'll be the reason I'll smile again.",
];
let words = [];
let wordIndex = 0;
let startTime = Date.now();
const quoteElement = document.getElementById("quote");
const messageElement = document.getElementById("message");
const typedValueElement = document.getElementById("typed-value");

document.getElementById("start").addEventListener("click", () => {
	const quoteIndex = Math.floor(Math.random() * quotes.length);
	const quote = quotes[quoteIndex];
	words = quote.split(" ");
	wordIndex = 0;
	const spanWords = words.map((word) => `<span>${word}</span>`);
	quoteElement.innerHTML = spanWords.join(" ");
	quoteElement.children[0].className = "highlight";
	messageElement.innerText = "";
	typedValueElement.value = "";
	typedValueElement.focus();
	startTime = new Date().getTime();
});

typedValueElement.addEventListener("input", () => {
	const currentWord = words[wordIndex];
	const typedValue = typedValueElement.value;
	if (typedValue == currentWord && wordIndex === words.length - 1) {
		const elapsedTime = new Date().getTime() - startTime;
		const message = `You're WPM is ${
			words.length / (elapsedTime / (1000 * 60))
		}`;
		messageElement.innerText = message;
		quoteElement.children[wordIndex].className = "";

		document.getElementById("typed-value").classList.remove("act");
		document.getElementById("typed-value").classList.add("nodisplay");
		document.getElementById("start").classList.add("act");
		document.getElementById("start").classList.remove("nodisplay");
	} else if (typedValue.endsWith(" ") && typedValue.trim() === currentWord) {
		typedValueElement.value = "";
		wordIndex++;
		for (const wordElement of quoteElement.children) {
			wordElement.className = "";
		}
		quoteElement.children[wordIndex].className = "highlight";
	} else if (currentWord.startsWith(typedValue)) {
		typedValueElement.className = "form-control form-control-lg is-valid";
		quoteElement.children[wordIndex].className = "highlight";
	} else {
		typedValueElement.className = "form-control form-control-lg is-invalid";
		quoteElement.children[wordIndex].className = "error";
	}
});

document.getElementById("start").onclick = function () {
	document.getElementById("start").classList.remove("act");
	document.getElementById("start").classList.add("nodisplay");
	document.getElementById("typed-value").classList.add("act");
	document.getElementById("typed-value").classList.remove("nodisplay");
};
