// Simple local storage-based user management (for demonstration)
const users = JSON.parse(localStorage.getItem('users')) || [];
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

document.addEventListener('DOMContentLoaded', () => {
    const dashboard = document.getElementById('dashboard');
    const adminPanel = document.getElementById('adminPanel');
    const userList = document.getElementById('userList');
    const logoutBtn = document.getElementById('logout');

    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Check if admin
    if (currentUser.email === 'admin@admin.com' && currentUser.password === 'admin123') {
        adminPanel.style.display = 'block';
        renderAdminPanel();
    } else if (currentUser.allowed) {
        dashboard.style.display = 'block';
    } else {
        alert('Your access is pending admin approval');
    }

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });

    function renderAdminPanel() {
        userList.innerHTML = '';
        users.forEach(user => {
            if (user.email !== 'admin@admin.com') {
                const userDiv = document.createElement('div');
                userDiv.className = 'user-item';
                userDiv.innerHTML = `
                    <span>${user.name} - ${user.email}</span>
                    <div>
                        <button class="allow-btn" onclick="updateUserStatus('${user.email}', true)">Allow</button>
                        <button class="deny-btn" onclick="updateUserStatus('${user.email}', false)">Deny</button>
                    </div>
                `;
                userList.appendChild(userDiv);
            }
        });
    }
});

function updateUserStatus(email, allowed) {
    const userIndex = users.findIndex(u => u.email === email);
    if (userIndex !== -1) {
        users[userIndex].allowed = allowed;
        localStorage.setItem('users', JSON.stringify(users));
        location.reload();
    }
}
