// กำหนดค่าเริ่มต้น EmailJS
emailjs.init("3OtPXwynx-n6DBY7g"); // ใส่ Public Key จาก EmailJS

// ดักจับการ Submit Form
document.getElementById('task-form').addEventListener('submit', function (e) {
    e.preventDefault(); // ป้องกันการ Refresh หน้า

    // ดึงค่าจากฟอร์ม
    const empID = document.getElementById('empID').value.trim();
    const empName = document.getElementById('empName').value.trim();
    const empDepartment = document.getElementById('empDepartment').value.trim();
    const taskSelect = document.getElementById('taskSelect').value.trim();
    const taskDesc = document.getElementById('taskDesc').value.trim();
    const taskFile = document.getElementById('taskFile').files[0]; // ไฟล์ที่แนบ

    // ตรวจสอบว่ากรอกข้อมูลครบถ้วน
    if (!empID || !empName || !empDepartment || !taskSelect || !taskDesc) {
        alert('กรุณากรอกข้อมูลให้ครบถ้วน');
        return;
    }

    // ตรวจสอบว่ามีไฟล์แนบหรือไม่
    if (!taskFile) {
        alert('กรุณาแนบไฟล์ก่อนส่งงาน');
        return;
    }

    // ตรวจสอบประเภทไฟล์ (Optional)
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf', 'xls', 'xlsx', 'doc', 'docx'];
    const fileExtension = taskFile.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
        alert('ประเภทไฟล์ไม่รองรับ กรุณาแนบไฟล์รูปภาพหรือเอกสารเท่านั้น');
        return;
    }

    // อ่านไฟล์เป็น Base64
    const reader = new FileReader();
    reader.onload = function () {
        const base64File = reader.result.split(',')[1]; // ตัดข้อมูล metadata ออก

        // ส่งอีเมลผ่าน EmailJS
        emailjs.send("service_sivr5ba", "template_xyz0f6d", {
            emp_id: empID,
            emp_name: empName,
            emp_department: empDepartment,
            task_select: taskSelect,
            task_desc: taskDesc,
            task_file: base64File, // ไฟล์ในรูปแบบ Base64
            task_file_name: taskFile.name
        }).then(
            function (response) {
                alert('ส่งงานสำเร็จแล้ว!');
                document.getElementById('task-form').reset(); // ล้างฟอร์ม
            },
            function (error) {
                alert('การส่งงานล้มเหลว: ' + error.text);
            }
        );
    };
    reader.onerror = function () {
        alert('เกิดข้อผิดพลาดในการอ่านไฟล์');
    };

    reader.readAsDataURL(taskFile); // แปลงไฟล์เป็น Base64
});
