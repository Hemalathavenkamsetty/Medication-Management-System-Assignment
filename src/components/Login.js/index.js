import React, { useState } from 'react';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Login successful', data);
                // Store the token in local storage or a cookie
                localStorage.setItem('token', data.token);
                localStorage.setItem('role', data.role);
                localStorage.setItem('userId', data.userId);
                // Redirect to the appropriate dashboard based on the user's role
                if (data.role === 'patient') {
                    window.location.href = '/patient-dashboard';
                } else if (data.role === 'caretaker') { 
                  window.location.href = '/caretaker-dashboard';
                }
            } else {
                console.error('Login failed', data);
                alert(data.error);
            }
        } catch (error) {
            console.error('Login error', error);
            alert('Login failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;
