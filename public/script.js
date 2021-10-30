const quotes = [
	'Do not go gentle into that good night, Old age should burn and rave at close of day. Rage, rage against the dying of the light.',
	'It is a good life we lead brother, the best, may it never change, and may it never change us',
	"Maybe someday I'll cry on your shoulders... Just hold me till the last drop of my tears drops! I don't know about the laugh, but you'll be the reason I'll smile again."
];
let words = [];
let wordIndex = 0;
let startTime = Date.now();
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');

document.getElementById('start').addEventListener('click', () => {
	const quoteIndex = Math.floor(Math.random() * quotes.length);
	const quote = quotes[quoteIndex];
	words = quote.split(' ');
	wordIndex = 0;
	const spanWords = words.map((word) => `<span>${word}</span>`);
	quoteElement.innerHTML = spanWords.join(' ');
	quoteElement.children[0].className = 'highlight';
	messageElement.innerText = '';
	typedValueElement.value = '';
	typedValueElement.focus();
	startTime = new Date().getTime();
});

typedValueElement.addEventListener('input', () => {
	const currentWord = words[wordIndex];
	const typedValue = typedValueElement.value;
	if (typedValue == currentWord && wordIndex === words.length - 1) {
		const elapsedTime = new Date().getTime() - startTime;
		const message = `You're WPM is ${words.length / (elapsedTime / (1000 * 60))}`;
		messageElement.innerText = message;
	} else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
		typedValueElement.value = '';
		wordIndex++;
		for (const wordElement of quoteElement.children) {
			wordElement.className = '';
		}
		quoteElement.children[wordIndex].className = 'highlight';
	} else if (currentWord.startsWith(typedValue)) {
		typedValueElement.className = '';
		quoteElement.children[wordIndex].className = 'highlight';
	} else {
		typedValueElement.className = 'error';
		quoteElement.children[wordIndex].className = 'error';
	}
});
