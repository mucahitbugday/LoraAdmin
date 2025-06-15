'use client'

import { authService } from '@/services/authService';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import AuthLayout from '../components/AuthLayout';

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState('admin@gmail.com');
    const [password, setPassword] = useState('123');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await authService.login({ Email: email, Password: password });

            if (response) {
                // showSuccess('Giriş başarılı! Yönlendiriliyorsunuz...');
                router.push('/admin');
            }
        } catch (error) {
        }
    }

    return (
        <AuthLayout>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input className="form-control form-control-lg" type="email" name="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input className="form-control form-control-lg" type="password" name="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <div className="form-check align-items-center">
                        <input id="customControlInline" type="checkbox" className="form-check-input" value="remember-me" name="remember-me" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                        <label className="form-check-label text-small" htmlFor="customControlInline">Remember me</label>
                    </div>
                </div>
                <div className="d-grid gap-2 mt-3">
                    <button type="submit" className="btn btn-lg btn-primary">Sign in</button>
                </div>
            </form>
            <div className="text-center mt-3">
                Don't have an account? <a href="/auth/register">Sign up</a>
            </div>
        </AuthLayout>
    )
}
