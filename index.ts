function highlightForbiddenWords(text: string, forbiddenWords: string[]): string {
  forbiddenWords.forEach((word) => {
     text = text.replaceAll(word, `<del>${word}</del>`);
  });

  return text;
}

document.getElementById('submit')?.addEventListener('click', () => {
  const textEl = document.getElementById('input') as HTMLTextAreaElement;
  const wordsEl = document.getElementById('wordsInput') as HTMLInputElement;
  const resultEl = document.getElementById('result');

  const text = textEl.value;
  const forbiddenWords = wordsEl.value.split(',').map((w) => w.trim());

  const highlighted = highlightForbiddenWords(text, forbiddenWords);

  if (resultEl) {
    resultEl.innerHTML = highlighted;
  }
});