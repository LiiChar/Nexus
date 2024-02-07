import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export const Header = () => {
    return (
        <header className='flex justify-between px-16 items-center bg-secondary sticky'>
            <div>
                <div>Creative</div>
                <div>Nexus</div>
            </div>
            <Avatar className="cursor-pointer transition-all hover:scale-[1.1]">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </header>
    )
}
