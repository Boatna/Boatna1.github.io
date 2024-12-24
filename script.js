// ตรวจสอบข้อมูลก่อนการส่งฟอร์ม
document.querySelector('form').addEventListener('submit', function(event) {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    // เช็คว่าได้กรอกข้อมูลชื่อและอีเมลหรือไม่
    if (name === '' || email === '') {
        alert('กรุณากรอกข้อมูลให้ครบถ้วน');
        event.preventDefault(); // หยุดการส่งฟอร์ม
    } else {
        alert('สมัครสมาชิกเรียบร้อยแล้ว!');
    }
});

// ฟังก์ชันสำหรับการแสดงข้อความเมื่อผู้ใช้เลือกสมัครสมาชิกแล้ว
function showConfirmationMessage() {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = 'ขอบคุณที่สมัครสมาชิก! กรุณาตรวจสอบอีเมลของคุณเพื่อยืนยันการสมัคร';
    messageDiv.style.backgroundColor = 'lightgreen';
    messageDiv.style.padding = '10px';
    messageDiv.style.marginTop = '20px';
    document.getElementById('register').appendChild(messageDiv);
}

// เพิ่มฟังก์ชันเมื่อฟอร์มถูกส่ง
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // หยุดการส่งฟอร์มชั่วคราว
    showConfirmationMessage();
});
// ฟังก์ชันสำหรับสร้างไฟล์ Excel
function saveToExcel(name, email) {
    // สร้างข้อมูล
    const data = [
        ['Name', 'Email'], // หัวข้อคอลัมน์
        [name, email]      // ข้อมูล
    ];

    // แปลงข้อมูลเป็น worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    // สร้าง workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Members');

    // ดาวน์โหลดไฟล์ Excel
    XLSX.writeFile(workbook, 'members.xlsx');
}

// จัดการฟอร์มเมื่อกดสมัคร
document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // ป้องกันการส่งฟอร์มปกติ

    // รับค่าชื่อและอีเมลจากผู้ใช้
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // ตรวจสอบว่ากรอกครบหรือไม่
    if (name === '' || email === '') {
        alert('กรุณากรอกข้อมูลให้ครบถ้วน');
        return;
    }

    // บันทึกข้อมูลใน Excel
    saveToExcel(name, email);

    // แจ้งให้ผู้ใช้ทราบ
    alert('บันทึกข้อมูลเรียบร้อยแล้ว! ไฟล์ Excel จะถูกดาวน์โหลด');
});
