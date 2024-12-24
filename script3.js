function checkQuiz1() {
    const answers = {
        q1: 'a', // คำตอบที่ถูกต้องของข้อ 1
        q2: 'a'  // คำตอบที่ถูกต้องของข้อ 2
    };

    let score = 0; // คะแนนเริ่มต้น
    let totalQuestions = Object.keys(answers).length;

    // ตรวจสอบคำตอบ
    for (let question in answers) {
        const selectedOption = document.querySelector(`input[name="${question}"]:checked`);
        if (selectedOption && selectedOption.value === answers[question]) {
            score++;
        }
    }

    // แสดงคะแนนในป๊อปอัป
    alert(`คุณได้คะแนน ${score} จาก ${totalQuestions} ข้อ`);
}
