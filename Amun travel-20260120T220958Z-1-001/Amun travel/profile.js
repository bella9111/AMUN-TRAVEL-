document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const tabPanes = document.querySelectorAll('.tab-pane');

    const switchTab = (tab) => {
        tabs.forEach(t => t.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        tab.classList.add('active');
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab));
    });

    const editAvatarBtn = document.querySelector('.edit-avatar');
    if (editAvatarBtn) {
        const avatarInput = document.createElement('input');
        avatarInput.type = 'file';
        avatarInput.accept = 'image/*';
        avatarInput.style.display = 'none';

        editAvatarBtn.addEventListener('click', () => {
            avatarInput.click();
        });

        avatarInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                document.querySelector('.profile-avatar img').src = e.target.result;
                alert('تم تحديث الصورة الشخصية بنجاح!');
            };
            reader.readAsDataURL(file);
        });
    }

    const settingsForm = document.querySelector('.settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('تم حفظ التغييرات بنجاح!');
        });
    }

    const bookingCards = document.querySelectorAll('.booking-card');
    bookingCards.forEach(card => {
        const viewBtn = card.querySelector('.action-button.view');
        const cancelBtn = card.querySelector('.action-button.cancel');

        if (viewBtn) {
            viewBtn.addEventListener('click', () => {
                alert('عرض تفاصيل الحجز');
            });
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                if (confirm('هل أنت متأكد من إلغاء هذا الحجز؟')) {
                    card.style.opacity = '0';
                    setTimeout(() => card.remove(), 300);
                }
            });
        }
    });

    const itineraryCards = document.querySelectorAll('.itinerary-card');
    itineraryCards.forEach(card => {
        const editBtn = card.querySelector('.action-button.edit');
        const deleteBtn = card.querySelector('.action-button.delete');

        if (editBtn) {
            editBtn.addEventListener('click', () => {
                alert('تحرير خطة السفر');
            });
        }

        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                if (confirm('هل أنت متأكد من حذف خطة السفر هذه؟')) {
                    card.style.opacity = '0';
                    setTimeout(() => card.remove(), 300);
                }
            });
        }
    });

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
                window.location.href = 'index.html';
            }
        });
    }
}); 