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

function goToPage(pageNum) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById('page' + pageNum).classList.add('active');

    if (pageNum === 2) {
        initGallery();
    } else if (pageNum === 3) {
        initHeartCollage();
    }
}

function openTicket() {
    const wrapper = document.querySelector('.ticket-wrapper');
    if (wrapper.classList.contains('tearing')) return; 
    
    wrapper.classList.add('tearing');
    
    setTimeout(() => {
        goToPage(2);
    }, 700);
}

let isDown = false;
let startX;
let scrollLeft;
let hasAttachedDragEvent = false;

function initGallery() {
    const galleryElement = document.getElementById('gallery');
    galleryElement.innerHTML = ''; 
    
    galleryData.forEach((item, index) => {
        const slide = document.createElement('div');
        slide.className = 'gallery-item';
        
        slide.innerHTML = `
            <div class="img-box" style="animation-delay: 0.2s">
                <img src="${item.image}" alt="Pic ${index + 1}" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'280\\' height=\\'280\\'><rect width=\\'280\\' height=\\'280\\' fill=\\'%23ccc\\'/><text x=\\'50%\\' y=\\'50%\\' dominant-baseline=\\'middle\\' text-anchor=\\'middle\\' font-size=\\'20\\'>Pic</text></svg>'">
            </div>
            <div class="text-box" style="animation-delay: 0.4s">${item.text}</div>
            <div class="swipe-hint">swipe 👉</div>
        `;
        galleryElement.appendChild(slide);
    });

    const lastSlide = document.createElement('div');
    lastSlide.className = 'gallery-item';
    lastSlide.innerHTML = `
        <div class="text-box" style="font-size: 24px; animation-delay: 0.2s;">ความทรงจำทั้งหมด...</div>
        <button class="finish-btn" onclick="goToPage(3)">เปิดดูของขวัญ</button>
    `;
    galleryElement.appendChild(lastSlide);

    // ผูกระบบลาก (Drag) บนคอมพิวเตอร์ครั้งเดียวเพื่อไม่ให้กินทรัพยากร
    if (!hasAttachedDragEvent) {
        galleryElement.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - galleryElement.offsetLeft;
            scrollLeft = galleryElement.scrollLeft;
        });
        galleryElement.addEventListener('mouseleave', () => { isDown = false; });
        galleryElement.addEventListener('mouseup', () => { isDown = false; });
        galleryElement.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - galleryElement.offsetLeft;
            const walk = (x - startX) * 2; 
            galleryElement.scrollLeft = scrollLeft - walk;
        });
        hasAttachedDragEvent = true;
    }
}

function initHeartCollage() {
    const heartContainer = document.getElementById('heart-collage');
    heartContainer.innerHTML = ''; 
    
    const hbdText = document.getElementById('hbd-text');
    hbdText.classList.remove('show');
    
    // โครงสร้างหลักรูปหัวใจ
    const positions = [
        { top: '30%', left: '15%', rot: -15 }, 
        { top: '30%', left: '55%', rot: 15 },  
        { top: '15%', left: '35%', rot: 0 },   
        { top: '55%', left: '20%', rot: -5 },  
        { top: '55%', left: '50%', rot: 5 },   
        { top: '75%', left: '35%', rot: 0 }    
    ];

    galleryData.forEach((item, index) => {
        const img = document.createElement('img');
        img.src = item.image;
        img.className = 'collage-img';
        img.onerror = function() {
            this.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><rect width='80' height='80' fill='%23ccc'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='14'>Pic</text></svg>";
        };

        let pos = (index < positions.length) ? positions[index] : {
            top: (30 + Math.random() * 30) + '%',
            left: (30 + Math.random() * 30) + '%',
            rot: (Math.random() * 40) - 20
        };

        img.style.top = pos.top;
        img.style.left = pos.left;
        img.style.setProperty('--rot', `${pos.rot}deg`); 
        
        const delay = 0.3 + (index * 0.2);
        img.style.animationDelay = `${delay}s`; 
        img.style.zIndex = index;

        heartContainer.appendChild(img);
    });

    const textDelay = 0.3 + (galleryData.length * 0.2) + 0.3; 
    hbdText.style.animationDelay = `${textDelay}s`;
    
    void hbdText.offsetWidth; 
    hbdText.classList.add('show');
}