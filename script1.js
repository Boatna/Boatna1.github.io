function checkQuiz1() {
    var score = 0;
    var totalQuestions = 10;

    // คำถามที่ 1
    var q1 = document.forms["quiz1"]["q1"].value;
    if (q1 == "b") {
        score++;
    }

    // คำถามที่ 2
    var q2 = document.forms["quiz1"]["q2"].value;
    if (q2 == "a") {
        score++;
    }

    // คำถามที่ 3
    var q3 = document.forms["quiz1"]["q3"].value;
    if (q3 == "a") {
        score++;
    }

    // คำถามที่ 4
    var q4 = document.forms["quiz1"]["q4"].value;
    if (q4 == "a") {
        score++;
    }

    // คำถามที่ 5
    var q5 = document.forms["quiz1"]["q5"].value;
    if (q5 == "b") {
        score++;
    }

    // คำถามที่ 6
    var q6 = document.forms["quiz1"]["q6"].value;
    if (q6 == "b") {
        score++;
    }

    // คำถามที่ 7
    var q7 = document.forms["quiz1"]["q7"].value;
    if (q7 == "c") {
        score++;
    }

    // คำถามที่ 8
    var q8 = document.forms["quiz1"]["q8"].value;
    if (q8 == "a") {
        score++;
    }

    // คำถามที่ 9
    var q9 = document.forms["quiz1"]["q9"].value;
    if (q9 == "b") {
        score++;
    }

    // คำถามที่ 10
    var q10 = document.forms["quiz1"]["q10"].value;
    if (q10 == "a") {
        score++;
    }

    // แสดงผลลัพธ์ใน HTML
    var result = document.getElementById("result1");
    result.innerHTML = "คุณได้คะแนน: " + score + " จาก " + totalQuestions + " ข้อ";
    result.style.color = score === totalQuestions ? "green" : "red";

    // เก็บคะแนนลงใน localStorage
    localStorage.setItem("quizScore", score);

    // แสดงคะแนนในป๊อปอัพ
    document.getElementById('score').value = score; // อัพเดตค่าใน input score ที่ป๊อปอัพ

    // เปิดป๊อปอัพหลังจากคำนวณคะแนน
    document.getElementById('popup').style.display = 'flex';
}

// เปิดป๊อปอัพเมื่อกดปุ่ม "ตรวจสอบคำถาม"
document.getElementById('check-answer').addEventListener('click', checkQuiz1);

// ปิดป๊อปอัพเมื่อกดปุ่ม "ปิด"
document.getElementById('close-popup').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none';
});

document.getElementById('submit-data').addEventListener('click', function() {
    var name = document.getElementById('name').value;
    var department = document.getElementById('department').value;
    var score = document.getElementById('score').value;

    // ตรวจสอบข้อมูลที่กรอก
    if (name && department && score !== "") {
        // สร้าง Canvas เพื่อวาดรูปคะแนน
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");

        canvas.width = 600;
        canvas.height = 400;

        // พื้นหลังของรูปภาพ
        ctx.fillStyle = "#f5f5f5";  // พื้นหลังสีเทาอ่อน
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // เพิ่มกรอบรอบๆ รูปภาพ
        ctx.strokeStyle = "#333";  // กรอบสีเทาเข้ม
        ctx.lineWidth = 5;
        ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

        // เขียนข้อความในรูปภาพ
        ctx.font = "bold 30px 'Prompt', sans-serif";  // ฟอนต์หนาขนาด 30px
        ctx.fillStyle = "#2c3e50";  // สีฟอนต์เป็นสีน้ำเงินเข้ม
        ctx.fillText("คะแนนของคุณ: " + score + "/10", 50, 50);

        // ข้อความชื่อ
        ctx.font = "25px 'Prompt', sans-serif";  // ฟอนต์ขนาดเล็กลงเล็กน้อย
        ctx.fillStyle = "#34495e";  // สีน้ำเงินอ่อน
        ctx.fillText("ชื่อ: " + name, 50, 100);

        // ข้อความแผนก
        ctx.font = "25px 'Prompt', sans-serif";  
        ctx.fillStyle = "#34495e";
        ctx.fillText("แผนก: " + department, 50, 150);

        // สร้างแถบสีด้านล่าง
        ctx.fillStyle = "#2980b9";  // สีฟ้า
        ctx.fillRect(0, canvas.height - 60, canvas.width, 60);

        // เขียนข้อความในแถบสีด้านล่าง
        ctx.font = "bold 20px 'Prompt', sans-serif";
        ctx.fillStyle = "#fff";  // สีฟอนต์ขาว
        ctx.fillText("ขอบคุณที่ทำแบบทดสอบ!", 50, canvas.height - 20);

        // สร้างลิงค์ดาวน์โหลดไฟล์ภาพ
        var link = document.createElement('a');
        link.href = canvas.toDataURL("image/png");
        link.download = 'ข้อมูลผู้ใช้.png';
        link.click();

        // ปิดป๊อปอัพ
        document.getElementById('popup').style.display = 'none';
    } else {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
});

