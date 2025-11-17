  document.addEventListener('DOMContentLoaded', function() {
            // Search functionality
            const searchInput = document.querySelector('.search-input-wrapper input');
            searchInput.addEventListener('input', function(e) {
                const searchTerm = e.target.value.toLowerCase();
                const resourceItems = document.querySelectorAll('.resource-item');
                
                resourceItems.forEach(item => {
                    const title = item.querySelector('.resource-title').textContent.toLowerCase();
                    if (title.includes(searchTerm)) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });

            // Category click functionality
            const categoryCards = document.querySelectorAll('.category-card');
            categoryCards.forEach(card => {
                card.addEventListener('click', function() {
                    const category = this.querySelector('.category-name').textContent;
                    alert(`Showing resources for: ${category}`);
                });
            });

            // Download button functionality
            const downloadBtns = document.querySelectorAll('.download-btn');
            downloadBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const resourceTitle = this.closest('.resource-item').querySelector('.resource-title').textContent;
                    alert(`Downloading: ${resourceTitle}`);
                });
            });

            // Upload button functionality
            const uploadBtn = document.querySelector('.upload-btn');
            uploadBtn.addEventListener('click', function() {
                alert('Upload resource feature would open here');
            });
        });