'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Pagination from '@/components/pagination'
import { ApiItem } from '@/api/client'
import Image from 'next/image'
import { InterviewType } from '../page'
const Page = () => {

    const searchParam = useSearchParams()
    const page = searchParam.get("page") || 0
    const pageNo = Number(page)

    const [_interview, set_interview] = useState<InterviewType[]>([])
    const [_limit] = useState<number>(12)

    useEffect(() => {
        const getPost = async (page: number, limit: number) => {
            const result = await ApiItem({ archive: "interview", skip: page * limit, limit })
            console.log(result)
            if (result.success) {
                set_interview(result.data)
            } else {
                set_interview([])
            }
        }

        getPost(pageNo, _limit)


    }, [_limit, pageNo])

    const toPage = useRouter()

    return (
        <div className='p-10 bg-facility-bg'>
            <div className='mx-auto mb-4 max-w-(--xl) text-white'>
                <h2 className='text-2xl font-bold text-pinkTXT'>Interview</h2>
                <div className="h-1"></div>
                <div className='flex w-full'>
                    <h1 className='text-3xl border-l-4 border-pinkTXT pl-2 font-semibold tracking-[1px] text-titleTXT'>先輩たちの声</h1>
                </div>
            </div>

            <div className="max-w-(--xl) m-auto flex flex-wrap">
                {_interview.length ?
                    _interview.map((d, index) =>
                        <div className="w-full md:w-1/2  md:p-4" key={index}>
                            <div className="cover" onClick={() => toPage.push("/home/facility/" + d?.slug)}>
                                {d?.image?.name ?
                                    <Image src={process.env.ftp_url + d?.image?.name} width={500} height={500} style={{ width: "auto", height: "100%" }} alt="home" /> :
                                    <Image src={"/img/home.jpg"} fill style={{ objectFit: "cover" }} alt="home" />}
                            </div>
                            <div className="mt-4">
                                <h3 className='font-bold text-lg'>{d.name}</h3>
                                <p className='font-bold opacity-50'>{d.workplace.name}</p>
                                <p className='font-bold opacity-50'>{d.workplace.address}</p>
                                <p className='italic my-2 opacity-75 text-lg'>{d.contenttitle}</p>
                                <button className='block max-w px-8 py-2 bg-sky-950 rounded-lg mx-auto mt-4 text-white cursor-pointer' onClick={() => toPage.push("/interview/" + d.slug)} >詳細を見る</button>

                            </div>
                        </div>
                    ) :
                    <div>
                        <h2 style={{ textAlign: "center" }}>結果がありません。</h2>
                    </div>}
            </div>
            <Pagination page={pageNo} next={() => { toPage.push("&page=" + (pageNo + 1)) }} prev={() => { toPage.push("&page=" + (pageNo - 1)) }} end={_interview.length < _limit} onClick={(p) => { { toPage.push("&page=" + (p)) } }} />
        </div>
    )
}

export default Page