const express = require('express');
const bodyParser = require('body-parser');
const xlsx = require('xlsx');
const fs = require('fs');

const app = express();
const port = 3000;

// ตั้งค่า body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// เส้นทางสำหรับการบันทึกข้อมูล
app.post('/save', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;

    // สร้างไฟล์ Excel หรืออัปเดตไฟล์เดิม
    const filePath = './members.xlsx';
    let workbook;
    let worksheet;

    if (fs.existsSync(filePath)) {
        // เปิดไฟล์ Excel เดิม
        workbook = xlsx.readFile(filePath);
        worksheet = workbook.Sheets['Members'] || xlsx.utils.aoa_to_sheet([]);
    } else {
        // สร้างไฟล์ Excel ใหม่
        workbook = xlsx.utils.book_new();
        worksheet = xlsx.utils.aoa_to_sheet([['Name', 'Email']]);
    }

    // เพิ่มข้อมูลใหม่ในชีต
    const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
    data.push([name, email]);
    const updatedWorksheet = xlsx.utils.aoa_to_sheet(data);

    // บันทึกชีตกลับไปยังไฟล์
    workbook.Sheets['Members'] = updatedWorksheet;
    xlsx.utils.book_append_sheet(workbook, updatedWorksheet, 'Members');
    xlsx.writeFile(workbook, filePath);

    // ส่งข้อความตอบกลับ
    res.send('ข้อมูลถูกบันทึกเรียบร้อยแล้ว!');
});

// เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
