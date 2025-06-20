'use client'

import { authService } from '@/services/authService';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import AuthLayout from '../components/AuthLayout';

export default function RegisterPage() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return;
        }

        try {
            const response = await authService.register({
                Email: email,
                Password: password,
                NameSurname: name,
                RolID: 1 // Default role for new users
            });

            if (response) {
                router.push('/login');
            }
        } catch (error) {
        }
    }

    return (
        <AuthLayout>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input className="form-control form-control-lg" type="text" name="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input className="form-control form-control-lg" type="email" name="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input className="form-control form-control-lg" type="password" name="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input className="form-control form-control-lg" type="password" name="confirmPassword" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div className="d-grid gap-2 mt-3">
                    <button type="submit" className="btn btn-lg btn-primary">Sign up</button>
                </div>
            </form>
            <div className="text-center mt-3">
                Already have an account? <a href="/auth/login">Sign in</a>
            </div>
        </AuthLayout>
    )
}
