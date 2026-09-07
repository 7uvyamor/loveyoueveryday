// ==========================================
// 1. ตั้งค่าข้อมูลรูปภาพและข้อความที่นี่
// สามารถเปลี่ยน URL รูป และ ข้อความ ได้ตามต้องการ
// หากรูปอยู่โฟลเดอร์เดียวกัน ให้ใส่ชื่อไฟล์ได้เลย เช่น image: "pic1.jpg"
// ==========================================
const galleryData = [
    {
        image: "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=300&q=80",
        text: "รูปที่ 1: วันแรกที่เราเจอกัน"
    },
    {
        image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=300&q=80",
        text: "รูปที่ 2: รอยยิ้มที่น่ารักที่สุด"
    },
    {
        image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=300&q=80",
        text: "รูปที่ 3: ไปเที่ยวด้วยกัน"
    },
    {
        image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=300&q=80",
        text: "รูปที่ 4: ของขวัญชิ้นแรก"
    },
    {
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
        text: "รูปที่ 5: มีความสุขมากๆ นะ"
    }
];

// ==========================================
// 2. ระบบนำทางระหว่างหน้า (Navigation)
// ==========================================
function goToPage(pageNum) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById('page' + pageNum).classList.add('active');
}

// ==========================================
// 3. สร้างหน้าที่ 2 (Museum Gallery)
// ==========================================
function initGallery() {
    const galleryElement = document.getElementById('gallery');
    
    galleryData.forEach((item, index) => {
        const slide = document.createElement('div');
        slide.className = 'gallery-item';
        
        slide.innerHTML = `
            <div class="img-box">
                <img src="${item.image}" alt="Pic ${index + 1}" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'280\\' height=\\'280\\'><rect width=\\'280\\' height=\\'280\\' fill=\\'%23ccc\\'/><text x=\\'50%\\' y=\\'50%\\' dominant-baseline=\\'middle\\' text-anchor=\\'middle\\' font-size=\\'20\\'>Pic</text></svg>'">
            </div>
            <div class="text-box">${item.text}</div>
            <div class="swipe-hint">swipe 👉</div>
        `;
        galleryElement.appendChild(slide);
    });

    // เพิ่มหน้าสุดท้ายใน Gallery เพื่อเป็นปุ่มกดไปหน้า 3
    const lastSlide = document.createElement('div');
    lastSlide.className = 'gallery-item';
    lastSlide.innerHTML = `
        <div class="text-box" style="font-size: 24px;">ความทรงจำทั้งหมด...</div>
        <button class="finish-btn" onclick="goToPage(3)">เปิดดูของขวัญ</button>
    `;
    galleryElement.appendChild(lastSlide);
}

// ==========================================
// 4. สร้างหน้าที่ 3 (รูปหัวใจ)
// ==========================================
function initHeartCollage() {
    const heartContainer = document.getElementById('heart-collage');
    
    // ตำแหน่ง X, Y และองศาการหมุน เพื่อจำลองโครงสร้างรูปหัวใจ (ตำแหน่งโดยประมาณ)
    const positions = [
        { top: '30%', left: '15%', rot: -15 }, // ซ้ายบน
        { top: '30%', left: '55%', rot: 15 },  // ขวาบน
        { top: '15%', left: '35%', rot: 0 },   // ตรงกลางร่องหัวใจ
        { top: '55%', left: '20%', rot: -5 },  // ซ้ายล่าง
        { top: '55%', left: '50%', rot: 5 },   // ขวาล่าง
        { top: '75%', left: '35%', rot: 0 }    // ล่างสุด
    ];

    galleryData.forEach((item, index) => {
        const img = document.createElement('img');
        img.src = item.image;
        img.className = 'collage-img';
        
        // หากรูปภาพโหลดไม่ได้ ให้ใช้รูปกล่องเทาแทน
        img.onerror = function() {
            this.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><rect width='80' height='80' fill='%23ccc'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='14'>Pic</text></svg>";
        };

        // นำตำแหน่งจาก Array มาใช้ ถ้ามีรูปเยอะกว่าตำแหน่งที่เตรียมไว้ ให้สุ่มตำแหน่งตรงกลางๆ
        let pos;
        if (index < positions.length) {
            pos = positions[index];
        } else {
            pos = {
                top: (30 + Math.random() * 30) + '%',
                left: (30 + Math.random() * 30) + '%',
                rot: (Math.random() * 40) - 20
            };
        }

        img.style.top = pos.top;
        img.style.left = pos.left;
        img.style.transform = `rotate(${pos.rot}deg)`;
        img.style.zIndex = index; // จัดลำดับการซ้อนทับ

        heartContainer.appendChild(img);
    });
}

// เริ่มต้นการทำงานเมื่อโหลดหน้าเสร็จ
window.onload = () => {
    initGallery();
    initHeartCollage();
};