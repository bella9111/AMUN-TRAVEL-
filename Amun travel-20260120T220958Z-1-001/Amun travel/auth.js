document.addEventListener('DOMContentLoaded', () => {
    const authModal = document.getElementById('authModal');
    const loginBtnDark = document.getElementById('loginBtnDark');
    const signupBtnDark = document.getElementById('signupBtnDark');
    const closeModal = document.querySelector('.close-modal');
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    const logoutBtn = document.createElement('button');
    logoutBtn.id = 'logoutBtn';
    logoutBtn.textContent = 'Logout';
    logoutBtn.classList.add('hidden');

    let currentUser = null;

    const showModal = () => {
        authModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };

    const hideModal = () => {
        authModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    const switchTab = (tabName) => {
        authTabs.forEach(tab => tab.classList.toggle('active', tab.dataset.tab === tabName));
        authForms.forEach(form => form.classList.toggle('active', form.id === `${tabName}Form`));
    };

    const validateField = (input, options = {}) => {
        const { minLength, maxLength, isEmail, matchField } = options;
        let isValid = true;
        const value = input.value.trim();

        if (input.required && !value) {
            showError(input, 'This field is required');
            return false;
        }

        if (minLength && value.length < minLength) {
            showError(input, `Must be at least ${minLength} characters`);
            isValid = false;
        }

        if (maxLength && value.length > maxLength) {
            showError(input, `Cannot exceed ${maxLength} characters`);
            isValid = false;
        }

        if (isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            showError(input, 'Please enter a valid email');
            isValid = false;
        }

        if (matchField && value !== document.getElementById(matchField).value.trim()) {
            showError(input, 'Fields do not match');
            isValid = false;
        }

        if (isValid) clearError(input);
        return isValid;
    };

    const showError = (input, message) => {
        const formGroup = input.closest('.form-group');
        let errorElement = formGroup.querySelector('.error-message');

        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }

        errorElement.textContent = message;
        input.classList.add('error');
    };

    const clearError = (input) => {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) errorElement.remove();
        input.classList.remove('error');
    };

    const showToast = (message, type = 'success') => {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail');
        const password = document.getElementById('loginPassword');

        const isEmailValid = validateField(email, { isEmail: true });
        const isPasswordValid = validateField(password, { minLength: 8 });

        if (isEmailValid && isPasswordValid) {
            localStorage.setItem('user', JSON.stringify({
                email: email.value.trim(),
                name: 'Demo User'
            }));

            hideModal();
            window.location.href = 'profile.html';
        }
    });

    document.getElementById('registerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('registerName');
        const email = document.getElementById('registerEmail');
        const password = document.getElementById('registerPassword');
        const confirmPassword = document.getElementById('registerConfirmPassword');

        const isNameValid = validateField(name, { minLength: 2 });
        const isEmailValid = validateField(email, { isEmail: true });
        const isPasswordValid = validateField(password, { minLength: 8 });
        const isConfirmValid = validateField(confirmPassword, { matchField: 'registerPassword' });

        if (isNameValid && isEmailValid && isPasswordValid && isConfirmValid) {
            localStorage.setItem('user', JSON.stringify({
                email: email.value.trim(),
                name: name.value.trim()
            }));

            hideModal();
            window.location.href = 'profile.html';
        }
    });

    logoutBtn.addEventListener('click', () => {
        currentUser = null;
        localStorage.removeItem('user');
        updateAuthUI();
        showToast('Logged out successfully');
    });

    const updateAuthUI = () => {
        const authButtonsDark = document.querySelector('.auth-buttons-dark');

        if (currentUser) {
            loginBtnDark.classList.add('hidden');
            signupBtnDark.classList.add('hidden');
            logoutBtn.classList.remove('hidden');

            if (!authButtonsDark.contains(logoutBtn)) {
                authButtonsDark.appendChild(logoutBtn);
            }

            const profileLink = document.querySelector('a[href="profile.html"]');
            if (profileLink) {
                profileLink.textContent = currentUser.name;
            }
        } else {
            loginBtnDark.classList.remove('hidden');
            signupBtnDark.classList.remove('hidden');
            logoutBtn.classList.add('hidden');
        }
    };

    loginBtnDark.addEventListener('click', () => {
        showModal();
        switchTab('login');
    });

    signupBtnDark.addEventListener('click', () => {
        showModal();
        switchTab('register');
    });

    closeModal.addEventListener('click', hideModal);

    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchTab(tab.dataset.tab);
        });
    });

    const savedUser = localStorage.getItem('user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateAuthUI();
    }
});