'use client'
import React from 'react'
import Image from 'next/image'
import moment from 'moment'
import { useState, useEffect } from 'react'
import { NewsType } from '../page'
import { ApiItem } from '@/api/client'
import { useSearchParams } from 'next/navigation'
const Page = () => {
    const searchParam = useSearchParams()
    const archivePlus = searchParam.get("archivePlus")
    const [_news, set_news] = useState<NewsType[]>()
    useEffect(() => {
        const getNews = async () => {
            const result = await ApiItem({ archive: "news", limit: 10, archivePlus: archivePlus || undefined })
            if (result.success) {
                set_news(result.data)
            } else {
                set_news(undefined)
            }
        }
        getNews()
    }, [])
    return (
        <div className='p-10 min-h-screen bg-facility-bg'>
            <div className="max-w-(--lg) m-auto">
                <h2 className='text-2xl font-bold text-pinkTXT'>News</h2>
                <div className="h-1"></div>
                <div className='flex w-full'>
                    <h1 className='text-3xl border-l-4 border-pinkTXT pl-2 font-semibold tracking-[1px] text-titleTXT'>ニュース</h1>
                    <Image src={"/icon/icon1.png"} width={40} height={40} alt="icon1" className="w-10 h-10 aspect-square" />
                </div>
                <div className="h-12"></div>
                {
                    _news?.map((n, index) =>

                        <div className="px-4 py-8 border border-slate-200 mt-4 bg-white rounded " key={index}>
                            <h3 className="opacity-75">{moment(n?.editDate).format("YYYY年.MM月.DD日")}</h3>
                            <h3 className="font-bold text-lg text-center my-4 text-titleTXT">{n?.name}</h3>
                            <div className='dangerousBox' dangerouslySetInnerHTML={{ __html: n?.content ? n?.content : "" }} />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Page