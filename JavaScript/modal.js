        function changeImage(element) {
            const activeImg = document.getElementById('active-image');
            const modalImg = document.getElementById('modal-img');
            
            if (activeImg) activeImg.src = element.src;
            if (modalImg) modalImg.src = element.src;

            document.querySelectorAll('.thumb').forEach(thumb => thumb.classList.remove('active'));
            element.classList.add('active');
        }

        function openModal() {
            const activeImg = document.getElementById('active-image');
            const modal = document.getElementById('image-modal');
            const modalImg = document.getElementById('modal-img');
            
            if (modal && modalImg && activeImg) {
                modalImg.src = activeImg.src;
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        }

        function closeModal(event) {
            if (event.target.closest('.modal-nav-btn')) return;

            if (event.target.id === 'image-modal' || event.target.classList.contains('close-modal')) {
                const modal = document.getElementById('image-modal');
                if (modal) {
                    modal.classList.remove('show');
                    document.body.style.overflow = 'auto';
                }
            }
        }

        function navigateGallery(direction) {
            const thumbs = Array.from(document.querySelectorAll('.thumb'));
            if (thumbs.length === 0) return;

            const currentIndex = thumbs.findIndex(thumb => thumb.classList.contains('active'));
            let newIndex = currentIndex + direction;

            if (newIndex >= thumbs.length) newIndex = 0;
            if (newIndex < 0) newIndex = thumbs.length - 1;

            changeImage(thumbs[newIndex]);
            thumbs[newIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
        }

        document.addEventListener('keydown', function(event) {
            const modal = document.getElementById('image-modal');
            const isModalOpen = modal && modal.classList.contains('show');

            if (event.key === 'ArrowRight') {
                navigateGallery(1);
            } else if (event.key === 'ArrowLeft') {
                navigateGallery(-1);
            } else if (event.key === 'Escape' && isModalOpen) {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });