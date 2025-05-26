document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('ilustrasi-canvas');
    
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId;
    let isAnimating = false;
    
    // Fungsi untuk mendeteksi apakah device mobile
    function isMobile() {
        return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    // Mengatur ukuran canvas dengan pixel ratio untuk layar high-DPI
    function resizeCanvas() {
        const container = canvas.parentElement;
        const containerWidth = container ? container.offsetWidth : window.innerWidth;
        const devicePixelRatio = window.devicePixelRatio || 1;
        
        // Set ukuran display
        const displayWidth = Math.min(containerWidth - 20, 800); // padding 20px
        const displayHeight = isMobile() ? Math.max(250, displayWidth * 0.5) : 300;
        
        // Set ukuran canvas dengan pixel ratio
        canvas.width = displayWidth * devicePixelRatio;
        canvas.height = displayHeight * devicePixelRatio;
        
        // Set ukuran CSS
        canvas.style.width = displayWidth + 'px';
        canvas.style.height = displayHeight + 'px';
        canvas.style.display = 'block';
        canvas.style.margin = '0 auto';
        canvas.style.maxWidth = '100%';
        
        // Scale context untuk high-DPI displays
        ctx.scale(devicePixelRatio, devicePixelRatio);
        
        // Force redraw
        if (isAnimating) {
            drawSingleFrame();
        }
    }
    
    // Fungsi untuk menggambar satu frame
    function drawSingleFrame() {
        const displayWidth = parseInt(canvas.style.width);
        const displayHeight = parseInt(canvas.style.height);
        
        ctx.clearRect(0, 0, displayWidth, displayHeight);
        
        // Warna latar belakang
        const isDarkMode = document.body.classList.contains('dark-mode');
        const bgColor = isDarkMode ? '#1e293b' : '#f8fafc';
        const textColor = isDarkMode ? '#e2e8f0' : '#1e293b';
        const accentColor = '#3b82f6';
        
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, displayWidth, displayHeight);
        
        // Scaling factor untuk mobile
        const scale = Math.min(displayWidth / 400, 1.2);
        
        // Menggambar chip dengan ukuran responsif
        const chipWidth = Math.min(displayWidth * 0.75, 350) * scale;
        const chipHeight = Math.max(60, 80 * scale);
        const chipX = (displayWidth - chipWidth) / 2;
        const chipY = Math.max(15, displayHeight * 0.15);
        
        // Chip background
        ctx.fillStyle = isDarkMode ? '#334155' : '#e2e8f0';
        ctx.fillRect(chipX, chipY, chipWidth, chipHeight);
        
        // Chip border
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = Math.max(1, 2 * scale);
        ctx.strokeRect(chipX, chipY, chipWidth, chipHeight);
        
        // Chip pins
        const pinCount = 8;
        const pinWidth = Math.max(4, 8 * scale);
        const pinHeight = Math.max(6, 12 * scale);
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
        const fontSize = Math.max(10, Math.min(16, 14 * scale));
        const smallFontSize = Math.max(8, Math.min(12, 10 * scale));
        
        ctx.font = `${fontSize}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Cek apakah text muat, jika tidak kurangi font size
        let mainText = 'KONVERSI SISTEM BILANGAN';
        let textWidth = ctx.measureText(mainText).width;
        if (textWidth > chipWidth * 0.9) {
            ctx.font = `${fontSize * 0.8}px monospace`;
        }
        
        ctx.fillText(mainText, displayWidth / 2, chipY + chipHeight / 2 - 8);
        
        ctx.font = `${smallFontSize}px monospace`;
        let subText = 'BIN ⟷ DEC ⟷ OCT ⟷ HEX';
        textWidth = ctx.measureText(subText).width;
        if (textWidth > chipWidth * 0.9) {
            ctx.font = `${smallFontSize * 0.8}px monospace`;
        }
        
        ctx.fillText(subText, displayWidth / 2, chipY + chipHeight / 2 + 12);
        
        // Menggambar aliran data
        const time = Date.now() / 1000;
        const waveY = chipY + chipHeight + Math.max(40, 60 * scale);
        const waveAmplitude = Math.max(6, 12 * scale);
        
        // Animasi aliran data
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = Math.max(1, 2 * scale);
        ctx.beginPath();
        
        const step = Math.max(8, 15 * scale);
        for (let i = 0; i < displayWidth; i += step) {
            const x = i;
            const y = waveY + Math.sin((x + time * 80) / 15) * waveAmplitude;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.stroke();
        
        // Menggambar bit-bit
        const bits = ['0', '1'];
        const bitCount = isMobile() ? 8 : 10;
        const bitRadius = Math.max(3, 6 * scale);
        
        for (let i = 0; i < bitCount; i++) {
            const x = (i * displayWidth) / bitCount + ((time * 40) % (displayWidth / 4));
            const y = waveY + Math.sin((x + time * 80) / 15) * waveAmplitude;
            
            if (x >= -bitRadius && x <= displayWidth + bitRadius) {
                ctx.fillStyle = bits[i % 2] === '1' ? '#4ade80' : '#f87171';
                ctx.beginPath();
                ctx.arc(x, y, bitRadius, 0, Math.PI * 2);
                ctx.fill();
                
                // Text dalam bit
                if (bitRadius > 4) {
                    ctx.fillStyle = isDarkMode ? '#000' : '#fff';
                    ctx.font = `bold ${Math.max(6, 8 * scale)}px monospace`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(bits[i % 2], x, y);
                }
            }
        }
        
        // Label bawah
        if (displayHeight > 200) {
            ctx.fillStyle = textColor;
            ctx.font = `${Math.max(10, 12 * scale)}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'alphabetic';
            
            const labelY = Math.min(displayHeight - 10, waveY + waveAmplitude + 25);
            ctx.fillText('Visualisasi Aliran Data Digital', displayWidth / 2, labelY);
        }
    }
    
    // Fungsi animasi utama
    function animate() {
        if (!isAnimating) return;
        
        try {
            drawSingleFrame();
            animationId = requestAnimationFrame(animate);
        } catch (error) {
            console.warn('Canvas animation error:', error);
            // Fallback: draw static frame
            setTimeout(() => drawSingleFrame(), 100);
        }
    }
    
    // Start animasi
    function startAnimation() {
        if (!isAnimating) {
            isAnimating = true;
            animate();
        }
    }
    
    // Stop animasi
    function stopAnimation() {
        isAnimating = false;
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    }
    
    // Initialize
    resizeCanvas();
    startAnimation();
    
    // Event listeners dengan debouncing
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resizeCanvas();
        }, 150);
    });
    
    // Pause/resume berdasarkan visibility
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopAnimation();
        } else {
            startAnimation();
        }
    });
    
    // Intersection Observer untuk performance
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startAnimation();
                } else {
                    stopAnimation();
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(canvas);
    }
    
    // Error handling untuk mobile browsers
    canvas.addEventListener('webglcontextlost', function(e) {
        e.preventDefault();
        stopAnimation();
        setTimeout(() => {
            resizeCanvas();
            startAnimation();
        }, 1000);
    });
});
