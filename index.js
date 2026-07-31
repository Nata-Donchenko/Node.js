function highlightForbiddenWords(text, forbiddenWords) {
    forbiddenWords.forEach((word) => {
        text = text.replaceAll(word, `<del>${word}</del>`);
    });
    return text;
}
document.getElementById('submit')?.addEventListener('click', () => {
    const textEl = document.getElementById('input');
    const wordsEl = document.getElementById('wordsInput');
    const resultEl = document.getElementById('result');
    const text = textEl.value;
    const forbiddenWords = wordsEl.value.split(',').map((w) => w.trim());
    const highlighted = highlightForbiddenWords(text, forbiddenWords);
    if (resultEl) {
        resultEl.innerHTML = highlighted;
    }
});
export {};
