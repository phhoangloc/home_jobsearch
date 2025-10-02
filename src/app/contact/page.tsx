'use client'
import axios from 'axios'
import React, { useState } from 'react'

const Page = () => {
    const [_name, set_name] = useState<string>("")
    const [_email, set_email] = useState<string>("")
    const [_content, set_content] = useState<string>("")
    const [_refresh, set_refresh] = useState<number>(0)
    const [_warn, set_warn] = useState<string>("")

    const sendMail = async (body: { name: string, email: string, content: string }) => {
        const newBody: {
            receipt?: string,
            subject?: string,
            name: string,
            email: string,
            content: string
        } = body
        newBody.receipt = "h-loc@astem-co.co.jp,kimura@com-sagano.com"
        newBody.subject = "若年層モデル事業就職サイトからの問い合わせ"

        const result = await axios.post(process.env.api_url + "api/mail", newBody)
        if (result.data.success) {
            set_warn(result.data.data)
            setTimeout(() => {
                set_warn("")
                set_name("")
                set_email("")
                set_content("")
                set_refresh(n => n + 1)
            }, 3000)
        }
    }

    return (
        <div className='bg-sky-500'>
            <div className="  p-10 max-w-(--xl) m-auto">
                <div className="text-white">
                    <h2 className='text-2xl font-bold'>Contact</h2>
                    <div className="h-1"></div>
                    <div className='flex w-full'>
                        <h1 className='text-3xl border-l-4 pl-2 font-semibold tracking-[1px] '>お問い合わせ</h1>
                    </div>
                </div>
                <div className="contact grid max-w-(--sm) mx-auto bg-white py-10 p-4 md:p-8 lg:p-12 rounded shadow" key={_refresh}>
                    <h1 className="font-bold text-2xl text-center text-titleTXT">お問い合わせ</h1>
                    <div className="h-2"></div>
                    <div className='text-center text-titleTXT opacity-75'>このお問い合わせは手話研修センターに送信されます。</div>
                    <div className="h-4"></div>
                    <div>名称</div>
                    <input className="h-12 border rounded border-slate-300" onChange={(e) => set_name(e.currentTarget.value)} value={_name} />
                    <div className="h-4"></div>
                    <div>eメール</div>
                    <input className="h-12 border rounded border-slate-300" onChange={(e) => set_email(e.currentTarget.value)} value={_email} />
                    <div className="h-4"></div>
                    <div>内容</div>
                    <textarea className="h-36 border rounded border-slate-300" value={_content} onChange={(e) => set_content(e.currentTarget.value)} />
                    <button className="bg-sky-600 w-max mx-auto mt-4 text-lg px-4 py-2 rounded text-white" onClick={() => sendMail({ name: _name, email: _email, content: _content })} >送信</button>
                    <div className='my-2 text-red-500 text-center'>{_warn}</div>
                </div>
            </div>
        </div>
    )
}

export default Page