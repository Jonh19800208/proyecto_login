document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if user already exists
    if (users.some(user => user.email === email)) {
        alert('Email already registered!');
        return;
    }

    const newUser = {
        name,
        email,
        password,
        allowed: email === 'admin@admin.com' && password === 'admin123' ? true : false
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    if (email === 'admin@admin.com' && password === 'admin123') {
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        window.location.href = 'index.html';
    } else {
        alert('Registration successful! Waiting for admin approval.');
        window.location.href = 'login.html';
    }
});
