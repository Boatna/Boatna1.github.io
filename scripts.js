// ตรวจสอบข้อมูลใน localStorage ก่อน
const empID = localStorage.getItem("empID");
const empName = localStorage.getItem("empName");

// ฟังก์ชันเมื่อกดปุ่มเข้าสู่ระบบ
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();  // ป้องกันการส่งฟอร์มเพื่อโหลดหน้าใหม่

    const enteredEmpID = document.getElementById("empID").value;
    const enteredEmpName = document.getElementById("empName").value;

    // เช็คว่าข้อมูลที่กรอกถูกต้องหรือไม่
    if (enteredEmpID && enteredEmpName) {
        // เก็บข้อมูลลงใน localStorage
        localStorage.setItem("empID", enteredEmpID);
        localStorage.setItem("empName", enteredEmpName);

        // เปลี่ยนหน้าไปยัง submit.html
        window.location.href = "submit.html";
    } else {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน!");
    }
});

// ฟังก์ชันเมื่อกดปุ่มส่งงาน
document.getElementById("task-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const taskSelect = document.getElementById("taskSelect").value;
    const taskDesc = document.getElementById("taskDesc").value;
    const taskFile = document.getElementById("taskFile").files[0];

    if (taskSelect && taskDesc && taskFile) {
        // ส่งข้อมูลไปที่อีเมล (ใช้ EmailJS หรือ API ที่ต้องการ)
        const emailContent = `ชื่อ: ${empName}\nID พนักงาน: ${empID}\nหัวข้อ: ${taskSelect}\nคำอธิบาย: ${taskDesc}`;

        // ตัวอย่างการส่งข้อมูลผ่าน EmailJS (ใช้ EmailJS หรือวิธีอื่นๆ)
        const formData = new FormData();
        formData.append("subject", taskSelect);
        formData.append("description", taskDesc);
        formData.append("file", taskFile);

        // ส่งข้อมูลผ่าน EmailJS
        emailjs.sendForm('service_sivr5ba', 'template_xyz0f6d', formData)
            .then(function(response) {
                alert("ส่งงานเรียบร้อยแล้ว!");
                window.location.href = "index.html";  // กลับไปยังหน้าล็อกอิน
            }, function(error) {
                alert("เกิดข้อผิดพลาดในการส่งงาน: " + error);
            });
    } else {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน!");
    }
});
