'use client'
import React, { useState } from 'react'

const Page = () => {
    const [_name, set_name] = useState<string>("")
    const [_email, set_email] = useState<string>("")
    const [_content, set_content] = useState<string>("")
    return (
        <div>
            <div className="  p-10 max-w-(--xl) m-auto">
                <div className="text-white">
                    <h2 className='text-2xl font-bold'>Contact</h2>
                    <div className="h-1"></div>
                    <div className='flex w-full'>
                        <h1 className='text-3xl border-l-4 pl-2 font-semibold tracking-[1px] '>お問い合わせ</h1>
                    </div>
                </div>
                <div className="contact grid max-w-(--sm) mx-auto bg-white py-10 p-4 md:p-8 lg:p-12 rounded shadow">
                    <h1 className="font-bold text-2xl text-center text-titleTXT">お問い合わせ</h1>
                    <div>名称</div>
                    <input className="h-12 border rounded border-slate-300" onChange={(e) => set_name(e.currentTarget.value)} value={_name} />
                    <div className="h-4"></div>
                    <div>eメール</div>
                    <input className="h-12 border rounded border-slate-300" onChange={(e) => set_email(e.currentTarget.value)} value={_email} />
                    <div className="h-4"></div>
                    <div>内容</div>
                    <textarea className="h-36 border rounded border-slate-300" value={_content} onChange={(e) => set_content(e.currentTarget.value)} />
                    <button className="bg-search-bg w-max mx-auto mt-4 text-lg px-4 py-2 rounded text-white" onClick={() => console.log("お問い合わせは送信されました。応答が届きましたら、ボイスメールをご確認ください。")} >送信</button>
                </div>
            </div>
        </div>
    )
}

export default Page