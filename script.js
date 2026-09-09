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
        <div class="text-box" style="font-size: 24px; animation-delay: 0.2s;">ทำทั้งหมดเพราะอยากจะบอกว่า...</div>
        <button class="finish-btn" onclick="goToPage(3)">เปิดตรงนี้ต่อ</button>
    `;
    galleryElement.appendChild(lastSlide);

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

let hasAttachedFinalDragEvent = false;

function initHeartCollage() {
    const heartContainer = document.getElementById('heart-collage');
    heartContainer.innerHTML = ''; 
    
    const hbdText = document.getElementById('hbd-text');
    hbdText.classList.remove('show');
    
    // พิกัดสำหรับ 14 รูป เพื่อให้เรียงออกมาเป็นรูปหัวใจพอดี
    const positions = [
        { top: '5%', left: '16%', rot: -15 },   // 1
        { top: '5%', left: '56%', rot: 15 },    // 2
        { top: '15%', left: '36%', rot: 0 },    // 3
        { top: '22%', left: '2%', rot: -25 },   // 4
        { top: '22%', left: '70%', rot: 25 },   // 5
        { top: '35%', left: '18%', rot: -10 },  // 6
        { top: '35%', left: '54%', rot: 10 },   // 7
        { top: '40%', left: '36%', rot: 5 },    // 8
        { top: '45%', left: '7%', rot: -15 },   // 9
        { top: '45%', left: '65%', rot: 15 },   // 10
        { top: '58%', left: '22%', rot: -10 },  // 11
        { top: '58%', left: '50%', rot: 10 },   // 12
        { top: '65%', left: '36%', rot: -5 },   // 13
        { top: '78%', left: '36%', rot: 0 }     // 14
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

    // --- เพิ่มระบบลาก (Drag) ให้หน้าสุดท้าย ---
    const finalGalleryElement = document.getElementById('final-gallery');
    if (finalGalleryElement && !hasAttachedFinalDragEvent) {
        let isFinalDown = false;
        let startXFinal;
        let scrollLeftFinal;

        finalGalleryElement.addEventListener('mousedown', (e) => {
            isFinalDown = true;
            startXFinal = e.pageX - finalGalleryElement.offsetLeft;
            scrollLeftFinal = finalGalleryElement.scrollLeft;
        });
        finalGalleryElement.addEventListener('mouseleave', () => { isFinalDown = false; });
        finalGalleryElement.addEventListener('mouseup', () => { isFinalDown = false; });
        finalGalleryElement.addEventListener('mousemove', (e) => {
            if (!isFinalDown) return;
            e.preventDefault();
            const x = e.pageX - finalGalleryElement.offsetLeft;
            const walk = (x - startXFinal) * 2; 
            finalGalleryElement.scrollLeft = scrollLeftFinal - walk;
        });
        hasAttachedFinalDragEvent = true;
    }
}