document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.getElementById('comment-form');
    const commentsContainer = document.getElementById('comments-container');
    
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nama = document.getElementById('nama').value;
            const komentar = document.getElementById('komentar').value;
            
            if (!nama || !komentar) return;
            
            // Membuat elemen komentar baru
            const newComment = document.createElement('div');
            newComment.className = 'comment';
            
            const currentDate = new Date().toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
            
            newComment.innerHTML = `
                <div class="comment-header">
                    <div class="comment-avatar">${nama.charAt(0)}</div>
                    <div class="comment-info">
                        <h4>${nama}</h4>
                        <span class="comment-date">${currentDate}</span>
                    </div>
                </div>
                <div class="comment-body">
                    <p>${komentar}</p>
                </div>
                <div class="comment-actions">
                    <button class="comment-action"><i class="fas fa-thumbs-up"></i> <span class="like-count">0</span></button>
                    <button class="comment-action"><i class="fas fa-reply"></i> Balas</button>
                    <button class="comment-action"><i class="fas fa-flag"></i> Laporkan</button>
                </div>
            `;
            
            // Menambahkan komentar baru ke awal daftar komentar
            commentsContainer.insertBefore(newComment, commentsContainer.firstChild);
            
            // Reset form
            document.getElementById('nama').value = '';
            document.getElementById('komentar').value = '';
        });
    }
    
    // Menangani like komentar
    if (commentsContainer) {
        commentsContainer.addEventListener('click', function(e) {
            if (e.target.closest('.comment-action') && e.target.closest('.comment-action').querySelector('.fa-thumbs-up')) {
                const likeButton = e.target.closest('.comment-action');
                const likeCount = likeButton.querySelector('.like-count');
                
                if (likeCount) {
                    likeCount.textContent = parseInt(likeCount.textContent) + 1;
                }
            }
        });
    }
});