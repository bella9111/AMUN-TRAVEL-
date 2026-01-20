document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const validateField = (input, options = {}) => {
        const { minLength, maxLength, isEmail } = options;
        let isValid = true;
        const value = input.value.trim();
        
        if (input.required && !value) {
            showError(input, 'you must fill this field');
            return false;
        }

        if (minLength && value.length < minLength) {
            showError(input, `has to be ${minLength}  characters or more`);
            isValid = false;
        }

        if (maxLength && value.length > maxLength) {
            showError(input, `Can't exceed ${maxLength} characters`);
            isValid = false;
        }

        if (isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            showError(input, 'please enyter a valid email address');
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

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        const isNameValid = validateField(name, { minLength: 2 });
        const isEmailValid = validateField(email, { isEmail: true });
        const isMessageValid = validateField(message, { minLength: 10 });
        
        if (isNameValid && isEmailValid && isMessageValid) {
            alert('form submitted successfully');
            contactForm.reset();
        }
    });

    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            item.classList.toggle('active');
        });
    });
});