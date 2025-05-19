document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('ilustrasi-canvas');
    
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Mengatur ukuran canvas
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = 300;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
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
        
        // Menggambar chip
        const chipWidth = canvas.width * 0.6;
        const chipHeight = 120;
        const chipX = (canvas.width - chipWidth) / 2;
        const chipY = 50;
        
        // Chip background
        ctx.fillStyle = isDarkMode ? '#334155' : '#e2e8f0';
        ctx.fillRect(chipX, chipY, chipWidth, chipHeight);
        
        // Chip border
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 2;
        ctx.strokeRect(chipX, chipY, chipWidth, chipHeight);
        
        // Chip pins
        const pinCount = 8;
        const pinWidth = 10;
        const pinHeight = 15;
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
        
        // Chip text
        ctx.fillStyle = textColor;
        ctx.font = '16px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('KONVERSI SISTEM BILANGAN', canvas.width / 2, chipY + chipHeight / 2);
        
        ctx.font = '12px monospace';
        ctx.fillText('BIN ⟷ DEC ⟷ OCT ⟷ HEX', canvas.width / 2, chipY + chipHeight / 2 + 24);
        
        // Menggambar aliran data
        const time = Date.now() / 1000;
        
        // Animasi aliran data
        ctx.strokeStyle = accentColor;
        ctx.beginPath();
        
        for (let i = 0; i < canvas.width; i += 20) {
            const x = i;
            const y = 220 + Math.sin((x + time * 100) / 20) * 15;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.stroke();
        
        // Menggambar bit-bit
        const bits = ['0', '1'];
        
        for (let i = 0; i < 10; i++) {
            const x = (i * canvas.width) / 10 + ((time * 50) % (canvas.width / 5));
            const y = 220 + Math.sin((x + time * 100) / 20) * 15;
            
            if (x < canvas.width) {
                ctx.fillStyle = bits[i % 2] === '1' ? '#4ade80' : '#f87171';
                ctx.beginPath();
                ctx.arc(x, y, 8, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.fillStyle = isDarkMode ? '#000' : '#fff';
                ctx.font = 'bold 10px monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(bits[i % 2], x, y);
            }
        }
        
        // Menggambar label
        ctx.fillStyle = textColor;
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Visualisasi Aliran Data Digital', canvas.width / 2, 270);
        
        requestAnimationFrame(drawIllustration);
    }
    
    drawIllustration();
});