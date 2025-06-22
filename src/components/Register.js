import React, { useState } from 'react';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('patient'); // Default role

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, role }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Registration successful', data);
                alert('Registration successful!');
                // Redirect to login page or dashboard
                window.location.href = '/login';
            } else {
                console.error('Registration failed', data);
                alert(data.error);
            }
        } catch (error) { 
           console.error('Registration error', error);
            alert('Registration failed');
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
            <label>
                Role:
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="patient">Patient</option>
                    <option value="caretaker">Caretaker</option>
                </select>
            </label>
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;
