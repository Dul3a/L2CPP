answers = {
    'cout': 1,
    'int': 1,
    'ifstream': 0.5,
    'close()': 0.5,
    '%': 1,
    '<':1,
    '1': 0.5,
    '10': 0.5,
    '<5': 0.5,
    '+=': 0.5,
    '15': 1,
    'HELLO, WORLD!': 1
}

function checkAnswers() {
    var total_score = 1;
    var answersElements = document.querySelectorAll('.answer');
    console.log(answersElements);
    for(i = 0; i < answersElements.length; i++){
        var answer = answersElements[i];
        var answer_text = answer.value;

        if(answer_text in answers){
            answer.style.backgroundColor = 'green';
            total_score += answers[answer_text];
        } else {
            answer.style.backgroundColor = 'red';
        }
    }
    alert(`Your total score is: ${total_score}`);
}