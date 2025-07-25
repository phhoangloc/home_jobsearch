'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation';
const Header = () => {

    const [_menu, set_menu] = useState<boolean>(false)
    const toPage = useRouter()
    return (
        <div className="bg-header-bg">
            <div className='max-w-(--xxl) m-auto h-[100px] flex'>
                <div className='relative h-full'>
                    <Image src="/img/ロゴ仮.png" width={500} height={500} alt="logo" className='h-full w-auto p-4 cursor-pointer' />
                </div>
                <div className='flex flex-col justify-end w-full'>
                    <MenuIcon onClick={() => set_menu(true)} className='lg:!hidden cursor-pointer' />


                    <div className={`fixed w-screen h-screen z-10 top-0 left-0 bg-white transition-all duration-500 flex flex-col justify-center lg:!hidden ${_menu ? "translate-x-[0]" : "translate-x-[100%]"}`}>
                        <CloseIcon className='absolute top-1 right-1 cursor-pointer ' onClick={() => set_menu(false)} />
                        <p className='text-center text-blueTXT text-lg py-1 hover:font-bold cursor-pointer' onClick={() => toPage.push("/")} >ホーム </p>
                        <p className='text-center text-blueTXT text-lg py-1 hover:font-bold cursor-pointer' onClick={() => toPage.push("/search?location=&wt=&wstt=&license=&workplace=")} >仕事を探す </p>
                        <p className='text-center text-blueTXT text-lg py-1 hover:font-bold cursor-pointer' onClick={() => toPage.push("/facility")}>施設一覧</p>
                        <p className='text-center text-blueTXT text-lg py-1 hover:font-bold cursor-pointer' onClick={() => toPage.push("/news")}>ニュース</p>
                        <p className='text-center text-blueTXT text-lg py-1 hover:font-bold cursor-pointer' onClick={() => toPage.push("/contact")}>お問い合わせ</p>
                    </div>
                    <div className={`hidden lg:flex mr-0 ml-auto mb-4`}>
                        <CloseIcon className='absolute top-1 right-1 cursor-pointer lg:!hidden ' onClick={() => set_menu(false)} />
                        <p className='text-center text-blueTXT font-bold cursor-pointer w-[125px] hover:text-sky-600' onClick={() => toPage.push("/")} >ホーム </p>
                        <p className='text-center text-blueTXT font-bold cursor-pointer w-[125px] hover:text-sky-600' onClick={() => toPage.push("/search?location=&wt=&wstt=&license=&workplace=")} >仕事を探す </p>
                        <p className='text-center text-blueTXT font-bold cursor-pointer w-[125px] hover:text-sky-600' onClick={() => toPage.push("/facility")}>施設一覧</p>
                        <p className='text-center text-blueTXT font-bold cursor-pointer w-[125px] hover:text-sky-600' onClick={() => toPage.push("/news")}>ニュース</p>
                        <p className='text-center text-blueTXT font-bold cursor-pointer w-[125px] hover:text-sky-600' onClick={() => toPage.push("/contact")}>お問い合わせ</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header