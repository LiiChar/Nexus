import { Button } from '@/components/ui/button'
import { Oauth } from '@/components/ui/oauth'
import { RegisterForm } from '@/components/ui/register-form'
import Link from 'next/link'
// import { RegisterForm } from '@/components/ui/register-form'


const page = () => {

    return (
        <section className="flex w-full h-dvh justify-center items-center px-64 ">
            <div className="min-height-main w-1/2 rounded-l-lg h-full bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-center items-center">
                <div className='text-center'>
                    <h2 className='text-2xl mb-2'>
                        <strong>Welcome Back!</strong>
                    </h2>
                    <p >
                        To keep connected with us please login</p>
                    <p className='mb-3'>
                        with your personal info
                    </p>
                    <Button className='bg-transparent border-2 border-white text-white hover:text-black'>
                        <Link href="log-in">LOG IN</Link>
                    </Button>
                </div>

            </div>
            <div className="min-height-main w-1/2 h-full flex flex-col justify-center bg-secondary rounded-r-lg">
                <div className="flex justify-center items-center pb-2">
                    <h1 className='text-4xl tracking-widest'>
                        Create Account
                    </h1>
                </div>
                <Oauth />
                <p className='text-center'>or use your email for registration</p>
                <RegisterForm />
            </div>
        </section>
    )
}

export default page