// Initialize users array and create default admin if it doesn't exist
let users = JSON.parse(localStorage.getItem('users')) || [];

// Create default admin user if not exists
if (!users.some(user => user.email === 'admin123@gmail.com')) {
    const defaultAdmin = {
        name: 'Admin',
        email: 'admin123@gmail.com',
        password: 'admin123',
        allowed: true
    };
    users.push(defaultAdmin);
    localStorage.setItem('users', JSON.stringify(users));
}

document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if user already exists
    if (users.some(user => user.email === email)) {
        alert('Email already registered!');
        return;
    }

    const newUser = {
        name,
        email,
        password,
        allowed: email === 'admin123@gmail.com' && password === 'admin123' ? true : false
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    if (email === 'admin123@gmail.com' && password === 'admin123') {
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        window.location.href = 'index.html';
    } else {
        alert('Registration successful! Waiting for admin approval.');
        window.location.href = 'login.html';
    }
});
