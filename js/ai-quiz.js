// js/ai-quiz.js
document.addEventListener('DOMContentLoaded', () => {
  const quizForm = document.getElementById('quizPromptForm');
  const quizInput = document.getElementById('quizPromptInput');
  const quizContainer = document.getElementById('quizContainer');

  quizForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const topic = quizInput.value.trim();
    if (!topic) return;

    const lang = document.documentElement.lang || (window.location.pathname.includes('eng') ? 'en' : 'ro');

    quizContainer.innerHTML = lang === 'en'
      ? '<div style="display:flex;align-items:center;justify-content:center;min-height:300px;height:60vh;width:100%;font-size:2rem;text-align:center;">Generating quiz...</div>'
      : '<div style="display:flex;align-items:center;justify-content:center;min-height:300px;height:60vh;width:100%;font-size:2rem;text-align:center;">Se generează testul...</div>';

    const response = await fetch('/api/quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: topic,
        lang: lang
      })
    });

    const data = await response.json();
    let questions = [];

    try {
      if (data.reply.trim().startsWith('[')) {
        questions = JSON.parse(data.reply);
      } else {
        const match = data.reply.match(/```json\s*([\s\S]*?)```/i) || data.reply.match(/({[\s\S]*})/);
        if (match) {
          questions = JSON.parse(match[1]);
        } else {
          questions = JSON.parse(data.reply);
        }
      }
    } catch (err) {
      quizContainer.innerHTML = `
        <p style="color:red;text-align:center;">Eroare la generarea testului. Încearcă din nou!</p>
        <pre style="max-width:100%;overflow:auto;background:#eee;padding:8px;">${data.reply}</pre>
      `;
      return;
    }

    // afiseaza intrebarile
    renderQuiz(questions, lang);
  });

  let lastQuizQuestions = []; 

  function renderQuiz(questions, lang) {
    if (!Array.isArray(questions) || questions.length === 0) {
      quizContainer.innerHTML = lang === 'en'
        ? '<p style="color:red;text-align:center;">No questions generated. Try another topic!</p>'
        : '<p style="color:red;text-align:center;">Nu s-au generat întrebări. Încearcă alt subiect!</p>';
      return;
    }

    lastQuizQuestions = questions; 

    quizContainer.innerHTML = lang === 'en'
      ? '<h2 style="text-align:center;">AI Generated Quiz</h2>'
      : '<h2 style="text-align:center;">Test AI generat</h2>';
    const form = document.createElement('form');
    form.id = 'quizQuestionsForm';

    questions.forEach((q, idx) => {
      const qDiv = document.createElement('div');
      qDiv.className = 'quiz-question';
      qDiv.innerHTML = `<b>${idx + 1}. ${q.question}</b>`;

      const optionsDiv = document.createElement('div');
      optionsDiv.className = 'quiz-options';

      if (q.options && Array.isArray(q.options)) {
        q.options.forEach((opt, oidx) => {
          const optId = `q${idx}_opt${oidx}`;
          const letter = opt.trim().charAt(0);
          optionsDiv.innerHTML += `
            <label>
              <input type="radio" name="q${idx}" value="${letter}" required>
              ${opt}
            </label>
          `;
        });
      } else {
        optionsDiv.innerHTML = `<input type="text" name="q${idx}" class="answer" required>`;
      }

      qDiv.appendChild(optionsDiv);
      form.appendChild(qDiv);
    });

    // buton submit
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.className = 'quiz-submit-btn';
    submitBtn.textContent = (lang === 'en') ? 'Send' : 'Trimite';

    form.appendChild(submitBtn);
    quizContainer.appendChild(form);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      checkQuizAnswers(form, questions);
    });
  }

  function checkQuizAnswers(form, questions) {
    let correctCount = 0;
    const total = questions.length;
    const userAnswers = [];

    questions.forEach((q, idx) => {
      let userAnswer = '';
      if (q.options && Array.isArray(q.options)) {
        const checked = form.querySelector(`input[name="q${idx}"]:checked`);
        userAnswer = checked ? checked.value : '';
      } else {
        const input = form.querySelector(`input[name="q${idx}"]`);
        userAnswer = input ? input.value.trim() : '';
      }
      userAnswers.push(userAnswer);

      if (q.correct && userAnswer.toUpperCase() === q.correct.toUpperCase()) {
        correctCount++;
      }
    });

    let resultHtml = `<h2 style="text-align:center;">Rezultat: ${correctCount} / ${total} corecte</h2>`;
    questions.forEach((q, idx) => {
      let isCorrect = q.correct && userAnswers[idx].toUpperCase() === q.correct.toUpperCase();
      resultHtml += `
        <div class="quiz-question" style="border-left: 6px solid ${isCorrect ? '#4caf50' : '#f44336'};">
          <b>${idx + 1}. ${q.question}</b><br>
          <span>Răspunsul tău: <b>${userAnswers[idx] || '-'}</b></span><br>
          <span>Răspuns corect: <b>${q.correct}</b></span>
        </div>
      `;
    });
    quizContainer.innerHTML = resultHtml;
  }
});