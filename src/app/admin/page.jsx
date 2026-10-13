"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Lock, Mail, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  
  sendEmailVerification,
  signOut,
} from 'firebase/auth';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    const credential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Refresh the user's profile from Firebase.
await credential.user.reload();

// console.log('Email:', credential.user.email);
// console.log('Email verified:', credential.user.emailVerified);

    if (!credential.user.emailVerified) {
      await sendEmailVerification(credential.user);

      setError(
        'Verification email sent. Please check your inbox and spam folder, click the verification link, then sign in again.'
      );

      await signOut(auth);
      return;
    }

    router.push('/admin/dashboard');
  } catch (err) {
    console.error('Login error:', err);
    setError(
      err.code === 'auth/too-many-requests'
        ? 'Too many attempts. Please try again later.'
        : 'Unable to sign in or send verification email. Please try again.'
    );
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500 mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-slate-400">Sign in to manage your real estate portal</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-semibold">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@vridhirealestate.com"
                  required
                  className="pl-10 h-12 border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700 font-semibold">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="pl-10 h-12 border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors cursor-pointer"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-400 text-sm mt-6">
          Protected area. Authorized access only.
        </p>
      </div>
    </div>
  );
}
