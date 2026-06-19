 // Making a nav toggle  

(function () {
    const headers = document.querySelectorAll('header');
headers.forEach(function (header) {
    const nav = header.querySelector('nav');
        if (!nav) return;
 
// creating the button 

    const toggleBtn = document.createElement('button');
toggleBtn.className = 'nav-toggle';
toggleBtn.setAttribute('aria-label', 'Toggle navigation menu');
toggleBtn.setAttribute('aria-expanded', 'false');
toggleBtn.innerHTML = '<span></span><span></span><span></span>';
 
nav.parentNode.insertBefore(toggleBtn, nav);
 
toggleBtn.addEventListener('click', function () {
    const isOpen = nav.classList.toggle('is-open');
toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

// making it to close the menu after clicking the link

nav.addEventListener('click', function (e) {
     if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
            }
        });
    });
})();

// creating the login and signup also the register form validation

(function () {
    const form = document.querySelector('.wrapper form');
         if (!form) return; // Not on this page
 
    const usernameInput = form.querySelector('input[placeholder="USERNAME"]');
    const passwordInput = form.querySelector('input[placeholder="PASSWORD"]');
    const confirmPasswordInput = form.querySelector('input[placeholder="CONFIRM PASSWORD"]');
    const confirmCheckbox = form.querySelector('.confirm input[type="checkbox"]');
 
// Masking the password field by default

    if (passwordInput) {
        passwordInput.setAttribute('type', 'password');
    }
 
// Show/hide password toggle — adds a small "Show" text button inside a password input-box 
// making it reusable so it applies to both the password field and (on register.html) the confirm field.

function addShowHideToggle(input) {
        if (!input) return;
    const box = input.closest('.input-box') || input.parentElement;
        box.style.position = 'relative';
 
    const toggleVisibilityBtn = document.createElement('button');
        toggleVisibilityBtn.type = 'button';
        toggleVisibilityBtn.textContent = 'Show';
        toggleVisibilityBtn.setAttribute('aria-label', 'Show password');
        toggleVisibilityBtn.style.position = 'absolute';
        toggleVisibilityBtn.style.right = '12px';
        toggleVisibilityBtn.style.top = '50%';
        toggleVisibilityBtn.style.transform = 'translateY(-50%)';
        toggleVisibilityBtn.style.background = 'none';
        toggleVisibilityBtn.style.border = 'none';
        toggleVisibilityBtn.style.color = 'rgb(106, 214, 24)';
        toggleVisibilityBtn.style.fontSize = '13px';
        toggleVisibilityBtn.style.fontFamily = "'Times New Roman', Times, serif";
        toggleVisibilityBtn.style.cursor = 'pointer';
        toggleVisibilityBtn.style.padding = '0';
 
    box.appendChild(toggleVisibilityBtn);
 
        toggleVisibilityBtn.addEventListener('click', function () {
            const isHidden = input.getAttribute('type') === 'password';
            input.setAttribute('type', isHidden ? 'text' : 'password');
        toggleVisibilityBtn.textContent = isHidden ? 'Hide' : 'Show';
        toggleVisibilityBtn.setAttribute(
                'aria-label',
                isHidden ? 'Hide password' : 'Show password'
            );
        });
    }
 
    addShowHideToggle(passwordInput);
    addShowHideToggle(confirmPasswordInput);
 
function clearError(input) {
        input.style.borderColor = '';
    const box = input.closest('.input-box') || input.parentElement;
    const existing = box.querySelector('.field-error-text');
        if (existing) existing.remove();
    }
 
function showError(input, message) {
        clearError(input);
             input.style.borderColor = 'rgb(224, 95, 95)';
    const box = input.closest('.input-box') || input.parentElement;
    const msg = document.createElement('small');
        msg.className = 'field-error-text';
        msg.textContent = message;
        msg.style.color = 'rgb(224, 95, 95)';
        msg.style.fontSize = '12px';
        msg.style.display = 'block';
        msg.style.marginTop = '4px';
        box.appendChild(msg);
    }
 
function validateForm() {
    let isValid = true;
 
        if (usernameInput) {
            clearError(usernameInput);
            if (usernameInput.value.trim() === '') {
                isValid = false;
                showError(usernameInput, 'Username is required.');
            }
        }
 
        if (passwordInput) {
            clearError(passwordInput);
            if (passwordInput.value.trim() === '') {
                isValid = false;
                showError(passwordInput, 'Password is required.');
            } else if (passwordInput.value.length < 6) {
                isValid = false;
                showError(passwordInput, 'Password must be at least 6 characters.');
            }
        }
 
// Confirm password validation only applies to the register form, not the login form.

        if (confirmPasswordInput) {
            clearError(confirmPasswordInput);
            if (confirmPasswordInput.value.trim() === '') {
                isValid = false;
                showError(confirmPasswordInput, 'Please confirm your password.');
            } else if (passwordInput && confirmPasswordInput.value !== passwordInput.value) {
                isValid = false;
                showError(confirmPasswordInput, 'Passwords do not match.');
            }
        }
 
        if (confirmCheckbox && !confirmCheckbox.checked) {
            isValid = false;
            const confirmBox = confirmCheckbox.closest('.confirm');
            let msg = confirmBox.querySelector('.field-error-text');
            if (!msg) {
                msg = document.createElement('small');
                msg.className = 'field-error-text';
                msg.style.color = 'rgb(224, 95, 95)';
                msg.style.fontSize = '12px';
                msg.style.display = 'block';
                msg.style.marginTop = '4px';
                confirmBox.appendChild(msg);
            }
            msg.textContent = confirmPasswordInput
                ? 'Please agree to the terms before creating an account.'
                : 'Please confirm it is you before logging in.';
        } else if (confirmCheckbox) {
            const confirmBox = confirmCheckbox.closest('.confirm');
            const msg = confirmBox.querySelector('.field-error-text');
            if (msg) msg.remove();
        }
 
        return isValid;
    }
 
form.addEventListener('submit', function (e) {
    e.preventDefault();
 
        if (validateForm()) {

// Form passed all checks.
// Currently action="" so there's nowhere for it to submit to yet For now it just logs:

            console.log(
                confirmPasswordInput
                    ? 'Signup form valid — ready to connect to a backend.'
                    : 'Login form valid — ready to connect to a backend.'
            );
        }
    });
 
// Clearing a field's error as soon as the user edits it

    [usernameInput, passwordInput, confirmPasswordInput].forEach(function (input) {
        if (!input) return;
        input.addEventListener('input', function () {
            clearError(input);
        });
    });
 
    if (confirmCheckbox) {
        confirmCheckbox.addEventListener('change', function () {
            const confirmBox = confirmCheckbox.closest('.confirm');
            const msg = confirmBox.querySelector('.field-error-text');
            if (msg && confirmCheckbox.checked) msg.remove();
        });
    }
})();

// making an auto-updating copyright year in the footer

(function () {
    const footerParagraphs = document.querySelectorAll('footer p');
 
footerParagraphs.forEach(function (p) {
    if (/copyright/i.test(p.textContent)) {
        const currentYear = new Date().getFullYear();
        p.textContent = p.textContent.replace(/\d{4}/, currentYear);
        }
    });
})();

// making a "click to copy" feature for the contact details on contact.html

(function () {
    const contactList = document.querySelector('main ul');
        if (!contactList) return; 

// Not on this page
 
    const items = contactList.querySelectorAll('li');
 
items.forEach(function (li) {
    const label = li.querySelector('h5');
        if (!label) return;
 
// Everything in the <li> after the </h5> tag is the value

    const fullText = li.textContent.trim();
    const labelText = label.textContent.trim();
    const value = fullText.slice(labelText.length).trim();
 
if (!value) return;
 
// Rebuilding the <li> contents

    const valueSpan = document.createElement('span');
        valueSpan.textContent = value;
        valueSpan.style.cursor = 'pointer';
        valueSpan.style.borderBottom = '1px dashed rgba(106, 214, 24, 0.5)';
        valueSpan.setAttribute('title', 'Click to copy');
        valueSpan.setAttribute('role', 'button');
        valueSpan.setAttribute('tabindex', '0');
 
        li.textContent = '';
        li.appendChild(label);
        li.appendChild(document.createTextNode(' '));
        li.appendChild(valueSpan);
 
function copyValue() {
    navigator.clipboard.writeText(value).then(function () {
        const original = valueSpan.textContent;
            valueSpan.textContent = 'Copied!';
            valueSpan.style.color = 'rgb(106, 214, 24)';
    setTimeout(function () {
            valueSpan.textContent = original;
            valueSpan.style.color = '';
                }, 1500);
            })
.catch(function () {
// making sure the user is notified if the copy fails
            });
        }
 
    valueSpan.addEventListener('click', copyValue);
    valueSpan.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            copyValue();
            }
        });
    });
})();