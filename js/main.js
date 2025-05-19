// Fungsi untuk menangani navigasi mobile
document.addEventListener('DOMContentLoaded', function() {
    // Mengatur tahun saat ini di footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Menangani toggle sidebar mobile
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    
    if (mobileMenuToggle && sidebar && sidebarOverlay) {
        mobileMenuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            sidebarOverlay.classList.toggle('active');
        });
        
        sidebarOverlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        });
    }
    
    // Menangani tab
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Menghapus kelas active dari semua tab button dan tab pane
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });
            
            // Menambahkan kelas active ke tab button yang diklik
            this.classList.add('active');
            
            // Menampilkan tab pane yang sesuai
            const tabId = this.getAttribute('data-tab');
            const tabPane = document.getElementById(tabId);
            
            if (tabPane) {
                tabPane.classList.add('active');
            }
        });
    });
});