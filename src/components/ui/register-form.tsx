'use client'
import React, { useState } from 'react'
import { Input } from './input'
import { Label } from './label'
import { Button } from './button'
import { useAuthStore } from '@/store/useAuthStore'
import { useRouter } from 'next/navigation'

export const RegisterForm = () => {
    const { push } = useRouter()
    const { setUser } = useAuthStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleRegister = () => {
        setUser({
            img: "",
            name: username,
            token: "fd",
        })
        push('/')
    }

    return (
        <form className='px-8' action={handleRegister}>
            <Label htmlFor="name" >Name</Label>
            <Input className='mb-2' value={username} onChange={((e) => setUsername(e.target.value))} id="name" required autoFocus placeholder='Enter your username' />
            <Label htmlFor="email" >Email address</Label>
            <Input className='mb-2' id="email" required autoFocus placeholder='Enter your email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <Label htmlFor="password" >Password</Label>
            <Input className='mb-4' id="password" required autoFocus placeholder='Enter your password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button className='float-right hover:stroke-sky-500 transition-all' type='submit'>Registration</Button>
        </form>
    )
}
