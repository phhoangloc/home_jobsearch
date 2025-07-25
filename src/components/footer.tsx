'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

const Footer = () => {
    const toPage = useRouter()
    return (
        <div className='bg-white p-10 text-blueTXT'>
            <div className="md:flex max-w-(--lg) m-auto justify-between">
                <div className='text-center mb-4'>
                    <h4 className='font-bold text-xl cursor-pointer hover:text-sky-600' onClick={() => toPage.push("/home#j")}>業界を知る</h4>
                    <p onClick={() => toPage.push("/home#f")} className='cursor-pointer hover:text-sky-600 hover:font-semibold'>施設紹介</p>
                    <p onClick={() => toPage.push("/home#h")} className='cursor-pointer hover:text-sky-600 hover:font-semibold'>先輩たちの声</p>
                </div>
                <div className='text-center mb-4'>
                    <h4 className='font-bold text-xl cursor-pointer hover:text-sky-600' onClick={() => toPage.push("/home/search/n/a/b/s/c")}>仕事を探す</h4>

                </div>
                <div className='text-center mb-4'>
                    <h4 className='font-bold text-xl cursor-pointer hover:text-sky-600' onClick={() => toPage.push("/home/facility")}>施設一覧</h4>
                </div>
                <div className='text-center mb-4'>
                    <h4 className='font-bold text-xl cursor-pointer hover:text-sky-600' onClick={() => toPage.push("/home/news")}>ニュース</h4>
                </div>
                <div className='text-center mb-4'>
                    <h4 className='font-bold text-xl cursor-pointer hover:text-sky-600' onClick={() => toPage.push("/home/contact")}>お問い合わせ</h4>
                </div>
            </div>
            <div className="fixed w-[125px] aspect-square bottom-1 right-1 rounded-[50%] backdrop-brightness-75 flex flex-col justify-center text-center font-bold text-white text-xl">

                <a href="#">トップ<br></br>へ</a>
            </div>
        </div>
    )
}

export default Footer