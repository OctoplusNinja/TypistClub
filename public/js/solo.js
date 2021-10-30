const quotes = [
	'Do not go gentle into that good night, Old age should burn and rave at close of day. Rage, rage against the dying of the light.',
	'It is a good life we lead brother, the best, may it never change, and may it never change us',
	"Maybe someday I'll cry on your shoulders... Just hold me till the last drop of my tears drops! I don't know about the laugh, but you'll be the reason I'll smile again."
];
let words = [];
let wordIndex = 0;
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');
var strted = false;
var elapsedTime = 0;
var wpm = 0;
let timer;

document.getElementById('start').addEventListener('click', () => {
	strted = false;
	const quoteIndex = Math.floor(Math.random() * quotes.length);
	const quote = quotes[quoteIndex];
	words = quote.split(' ');
	wordIndex = 0;
	const spanWords = words.map((word) => `<span>${word}</span>`);
	quoteElement.innerHTML = spanWords.join(' ');
	quoteElement.children[0].className = 'highlight';
	messageElement.innerText = '';
	typedValueElement.value = '';
	document.getElementById("start").classList.add("nodisplay");
	document.getElementById("typed-value").classList.remove("nodisplay");
	document.getElementById("wpm").classList.remove("nodisplay");
	typedValueElement.focus();
	timer = setInterval(() => {
		elapsedTime = new Date().getTime() - startTime;
		wpm = Math.round(((wordIndex) / (elapsedTime / 60000)) * 100) / 100;
		console.log(wpm);
		document.getElementById('wpm').innerText = "WPM: " + wpm;
	}, 1000);
});

typedValueElement.addEventListener('input', () => {
	if (!strted) {
		strted = true;
		startTime = new Date().getTime();
	}
	// console.log(wpm);
	document.getElementById('wpm').innerText = "WPM: " + wpm;
	const currentWord = words[wordIndex];
	const typedValue = typedValueElement.value;
	if (typedValue == currentWord && wordIndex === words.length - 1) {
		typedValueElement.value = '';
		elapsedTime = new Date().getTime() - startTime;
		wpm = Math.round((words.length / (elapsedTime / 60000)) * 100) / 100;
		const message = `You're WPM is ${wpm}`;
		messageElement.innerText = message;
		quoteElement.children[wordIndex].className = "";
		document.getElementById("typed-value").classList.add("nodisplay");
		document.getElementById("start").classList.remove("nodisplay");
		document.getElementById("wpm").classList.add("nodisplay");
		// clearInterval(timer);
	} else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
		typedValueElement.value = '';
		quoteElement.children[wordIndex].className = '';
		wordIndex++;
		quoteElement.children[wordIndex].className = 'highlight';
	} else if (currentWord.startsWith(typedValue)) {
		typedValueElement.className = "form-control form-control-lg is-valid";
		quoteElement.children[wordIndex].className = 'highlight';
	} else {
		typedValueElement.className = "form-control form-control-lg is-invalid";
		quoteElement.children[wordIndex].className = 'error';
	}
});