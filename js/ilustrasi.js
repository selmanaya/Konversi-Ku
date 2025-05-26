document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('ilustrasi-canvas');
    
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId;
    
    // Fungsi untuk mendeteksi apakah device mobile
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Mengatur ukuran canvas dengan responsive ratio
    function resizeCanvas() {
        const container = canvas.parentElement;
        const containerWidth = container ? container.offsetWidth : window.innerWidth;
        
        // Set canvas width berdasarkan container
        canvas.width = Math.min(containerWidth, 800);
        
        // Tinggi canvas disesuaikan dengan lebar untuk mobile
        if (isMobile()) {
            canvas.height = Math.max(200, canvas.width * 0.4);
        } else {
            canvas.height = 300;
        }
        
        // Set CSS untuk memastikan canvas responsive
        canvas.style.width = '100%';
        canvas.style.height = 'auto';
        canvas.style.maxWidth = '100%';
        canvas.style.display = 'block';
    }
    
    resizeCanvas();
    
    // Throttle resize event untuk performa yang lebih baik
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resizeCanvas, 100);
    });
    
    // Fungsi untuk menggambar ilustrasi
    function drawIllustration() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Warna latar belakang
        const isDarkMode = document.body.classList.contains('dark-mode');
        const bgColor = isDarkMode ? '#1e293b' : '#f8fafc';
        const textColor = isDarkMode ? '#e2e8f0' : '#1e293b';
        const accentColor = '#3b82f6';
        
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Scaling factor untuk mobile
        const scale = isMobile() ? Math.min(canvas.width / 400, 1) : 1;
        
        // Menggambar chip dengan ukuran responsif
        const chipWidth = Math.min(canvas.width * 0.8, 400) * scale;
        const chipHeight = 80 * scale;
        const chipX = (canvas.width - chipWidth) / 2;
        const chipY = Math.max(20, (canvas.height * 0.15));
        
        // Chip background
        ctx.fillStyle = isDarkMode ? '#334155' : '#e2e8f0';
        ctx.fillRect(chipX, chipY, chipWidth, chipHeight);
        
        // Chip border
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = Math.max(1, 2 * scale);
        ctx.strokeRect(chipX, chipY, chipWidth, chipHeight);
        
        // Chip pins dengan ukuran responsif (tetap 8 pins)
        const pinCount = 8;
        const pinWidth = Math.max(6, 10 * scale);
        const pinHeight = Math.max(8, 15 * scale);
        const pinGap = (chipWidth - pinCount * pinWidth) / (pinCount + 1);
        
        ctx.fillStyle = accentColor;
        
        // Top pins
        for (let i = 0; i < pinCount; i++) {
            const x = chipX + pinGap * (i + 1) + pinWidth * i;
            ctx.fillRect(x, chipY - pinHeight, pinWidth, pinHeight);
        }
        
        // Bottom pins
        for (let i = 0; i < pinCount; i++) {
            const x = chipX + pinGap * (i + 1) + pinWidth * i;
            ctx.fillRect(x, chipY + chipHeight, pinWidth, pinHeight);
        }
        
        // Chip text dengan ukuran font responsif
        ctx.fillStyle = textColor;
        const fontSize = Math.max(10, 16 * scale);
        const smallFontSize = Math.max(8, 12 * scale);
        
        ctx.font = `${fontSize}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Text tetap sama untuk semua ukuran layar
        ctx.fillText('KONVERSI SISTEM BILANGAN', canvas.width / 2, chipY + chipHeight / 2 - 8 * scale);
        
        ctx.font = `${smallFontSize}px monospace`;
        ctx.fillText('BIN ⟷ DEC ⟷ OCT ⟷ HEX', canvas.width / 2, chipY + chipHeight / 2 + 12 * scale);
        
        // Menggambar aliran data dengan posisi responsif
        const time = Date.now() / 1000;
        const waveY = chipY + chipHeight + 60 * scale;
        const waveAmplitude = Math.max(8, 15 * scale);
        
        // Animasi aliran data
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = Math.max(1, 2 * scale);
        ctx.beginPath();
        
        for (let i = 0; i < canvas.width; i += Math.max(10, 20 * scale)) {
            const x = i;
            const y = waveY + Math.sin((x + time * 100) / 20) * waveAmplitude;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.stroke();
        
        // Menggambar bit-bit dengan ukuran responsif (tetap 10 bits)
        const bits = ['0', '1'];
        const bitCount = 10;
        const bitRadius = Math.max(4, 8 * scale);
        
        for (let i = 0; i < bitCount; i++) {
            const x = (i * canvas.width) / bitCount + ((time * 50) % (canvas.width / 5));
            const y = waveY + Math.sin((x + time * 100) / 20) * waveAmplitude;
            
            if (x < canvas.width) {
                ctx.fillStyle = bits[i % 2] === '1' ? '#4ade80' : '#f87171';
                ctx.beginPath();
                ctx.arc(x, y, bitRadius, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.fillStyle = isDarkMode ? '#000' : '#fff';
                ctx.font = `bold ${Math.max(6, 10 * scale)}px monospace`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(bits[i % 2], x, y);
            }
        }
        
        // Menggambar label dengan posisi responsif
        ctx.fillStyle = textColor;
        ctx.font = `${Math.max(10, 14 * scale)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'alphabetic';
        
        const labelText = 'Visualisasi Aliran Data Digital';
        const labelY = Math.min(canvas.height - 15, waveY + waveAmplitude + 35);
        ctx.fillText(labelText, canvas.width / 2, labelY);
        
        animationId = requestAnimationFrame(drawIllustration);
    }
    
    // Mulai animasi
    drawIllustration();
    
    // Pause animasi ketika tab tidak aktif untuk menghemat battery
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        } else {
            drawIllustration();
        }
    });
    
    // Stop animasi ketika elemen tidak terlihat (optional)
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (!entry.isIntersecting && animationId) {
                cancelAnimationFrame(animationId);
            } else if (entry.isIntersecting && !animationId) {
                drawIllustration();
            }
        });
    });
    
    observer.observe(canvas);
});
