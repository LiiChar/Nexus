import { HomeIcon, HeartIcon, BellIcon } from '@heroicons/react/24/outline'


export const Oauth = () => {
    return (
        <div className='h-12 flex justify-between items-center px-24'>
            <HomeIcon className="cursor-pointer hover:stroke-sky-500 transition-all hover:scale-[1.1]" width={32} height={32} />
            <HeartIcon className="cursor-pointer hover:stroke-sky-500 transition-all hover:scale-[1.1]" width={32} height={32} />
            <BellIcon className="cursor-pointer hover:stroke-sky-500 transition-all hover:scale-[1.1]" width={32} height={32} />
        </div>
    )
}
