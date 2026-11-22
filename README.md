# NONGMAKA ECO WORLD — Phase 2: Interactive Daily Missions

เวอร์ชันนี้ต่อยอดจาก Phase 1 และมีระบบกิจกรรมจริงในโลก 3D: **ให้อาหารปลา**, **เก็บไข่ไก่**, **รดน้ำผัก**, แอนิเมชันอุปกรณ์/เอฟเฟกต์, ภารกิจประจำวัน, ปุ่มเริ่มวันใหม่ และบันทึกความก้าวหน้าอัตโนมัติด้วย localStorage

## วิธีเล่น
1. เดินไปใกล้จุดกิจกรรมของแต่ละฐาน (จุดบ่อปลาอยู่ด้านขวาของบ่อ, จุดไก่อยู่บริเวณหน้าโรงเรือน, จุดผักอยู่ริมแปลง)
2. เมื่อมีปุ่มกิจกรรมขึ้น ให้กด `E` หรือแตะปุ่มสีเหลือง
3. ดูแอนิเมชันและสถานะภารกิจในแผงด้านขวา
4. เมื่อทำครบ 3 ฐาน กด **วันถัดไป** เพื่อเริ่มภารกิจชุดใหม่
5. ระบบจะจำวันและจำนวนไข่ในเบราว์เซอร์เครื่องเดิม (ไม่ใช่ระบบสมาชิก)

**ควบคุมคอมพิวเตอร์:** WASD/ลูกศร เดิน, ลากเมาส์หมุนกล้อง, E ทำกิจกรรม

**ควบคุมมือถือ:** จอยด้านซ้ายเดิน, ลากฉากหมุนกล้อง, แตะปุ่มกิจกรรม

**หมายเหตุ:** ระยะที่ 2 เป็นกิจกรรมจำลองและแอนิเมชัน ยังไม่ใช่ระบบเติบโตตามชีววิทยา, ระบบเศรษฐกิจ, Firebase หรือการคำนวณเวลา 1 วันในเกม = 10 นาที; การเปลี่ยนวันใช้ปุ่มเมื่อทำภารกิจครบ

## เปิดบน Mac เพื่อพัฒนา

ต้องมี Node.js รุ่นที่รองรับ Vite 7 (Node.js 20.19+ หรือ 22.12+)

```bash
npm install
npm run dev
```

เปิด URL ที่แสดงใน Terminal (โดยทั่วไป http://localhost:5173/)

ทดสอบการ build:

```bash
npm run build
```

## เผยแพร่ GitHub Pages (ฟรี)

1. แตก ZIP และเปิดโฟลเดอร์ `nongmaka-eco-world`
2. สร้าง Repository แบบ Public ที่ https://github.com/new ชื่อ `nongmaka-eco-world`
3. อัปโหลด **ไฟล์และโฟลเดอร์ที่อยู่ภายใน** `nongmaka-eco-world` ไปยังราก Repository (อย่าอัปโหลด ZIP ทั้งก้อน)
4. สำคัญ: อัปโหลด `.github/workflows/deploy.yml` ด้วย — บน Mac กด `Command + Shift + .` เพื่อแสดงโฟลเดอร์ที่ซ่อนอยู่
5. ไปที่ **Settings → Pages → Build and deployment → Source: GitHub Actions**
6. เปิดแท็บ **Actions** รอ workflow `Deploy NONGMAKA ECO WORLD to GitHub Pages` เสร็จ
7. เปิด `https://YOUR-USERNAME.github.io/nongmaka-eco-world/`

หากเคยอัปโหลด Phase 1 แล้ว ให้ **แทนที่ไฟล์ที่มีชื่อซ้ำทั้งหมด** รวมถึง `index.html`, `src/main.js`, `src/style.css` และ `README.md` ส่วน `.github/workflows/deploy.yml` ใช้ของเดิมได้

ถ้า Actions แจ้ง error ให้ตรวจว่าไฟล์ `package.json`, `vite.config.js`, `index.html`, `src/main.js` อยู่ที่ root ถูกต้อง และ Pages ใช้ GitHub Actions

## โครงสร้าง

- `src/main.js`: โลก Three.js, ตัวละคร, กิจกรรม, แอนิเมชัน, ระบบภารกิจ, การบันทึก
- `src/style.css`: UI และ responsive controls
- `index.html`: โครงสร้างหน้าจอ
- `.github/workflows/deploy.yml`: build และ deploy
- `vite.config.js`: base path สำหรับ GitHub Pages

## ข้อจำกัด

- ไม่มีบัญชีผู้ใช้และยังไม่ซิงก์ข้ามอุปกรณ์
- กิจกรรมเก็บไข่แสดงไข่กลับมาเมื่อเริ่มวันใหม่ (จำลอง)
- แอนิเมชันใช้โมเดลเรขาคณิต Low-poly จากโค้ด
- หากล้างข้อมูลเว็บไซต์หรือใช้โหมดส่วนตัว ข้อมูลบันทึกอาจหายไป
