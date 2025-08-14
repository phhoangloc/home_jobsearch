'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Pagination from '@/components/pagination'
import { ApiItem } from '@/api/client'
import Image from 'next/image'
import { FacilityType } from './[slug]/page'
import { japanRegions } from '@/lib/area'
const Page = () => {

    const searchParam = useSearchParams()
    const area = searchParam.get("area") || ""
    const location = searchParam.get("location") || ""
    const page = searchParam.get("page") || 0
    const pageNo = Number(page)

    const [_facilities, set_facilities] = useState<FacilityType[]>([])
    const [_limit] = useState<number>(12)

    useEffect(() => {
        const getPost = async (area: string, location: string, page: number, limit: number) => {
            const result = await ApiItem({ archive: "facility", area, location, skip: page * limit, limit })
            console.log(result)
            if (result.success) {
                set_facilities(result.data)
            } else {
                set_facilities([])
            }
        }

        getPost(area, location, pageNo, _limit)


    }, [_limit, pageNo, area, location])

    const toPage = useRouter()

    const formatPostNo = (input: string) => {
        if (input) {
            const digits = input.replace(/\D/g, '');

            if (digits.length === 7) {
                return digits.replace(/(\d{3})(\d{4})/, '$1-$2');
            }
        }
    }

    return (
        <div className='p-10 bg-facility-bg'>
            <div className='mx-auto mb-4 max-w-(--xl) text-white'>
                <h2 className='text-2xl font-bold text-pinkTXT'>Facility</h2>
                <div className="h-1"></div>
                <div className='flex w-full'>
                    <h1 className='text-3xl border-l-4 border-pinkTXT pl-2 font-semibold tracking-[1px] text-titleTXT'>施設紹介</h1>
                </div>
            </div>
            <div className="flex flex-wrap max-w-(--xl) m-auto">
                <div className='w-48 text-slate-700 shadow rounded-md text-center m-2 font-bold p-1 bg-white cursor-pointer' onClick={() => { toPage.push("?area=&page=") }}>全国</div>
                {japanRegions.map((r, index) => <div className='w-48 text-slate-700 shadow rounded-md text-center m-2 font-bold p-1 bg-white cursor-pointer' key={index} onClick={() => { toPage.push("?area=" + r.region + "&page=") }}>{r.region}</div>)}
            </div>

            <div className="max-w-(--xl) m-auto flex flex-wrap">
                {set_facilities.length ?
                    _facilities.map((d, index) =>
                        <div className="w-full md:w-1/2  md:p-4" key={index}>
                            <div className="cover">
                                {d?.image?.name ?
                                    <Image src={process.env.ftp_url + d?.image?.name} width={500} height={500} style={{ width: "auto", height: "100%" }} alt="home" /> :
                                    <Image src={"/img/home.jpg"} fill style={{ objectFit: "cover" }} alt="home" />}
                            </div>
                            <div className="mt-4">
                                <h3 className='font-bold text-lg'>{d.name}</h3>
                                <p className=' opacity-75'>〒{formatPostNo(d.postno)}</p>
                                <p className=' opacity-75'>{d.address.split("　")[0]}</p>
                                <p className=' opacity-75'>{d.address.split("　")?.[1] ? d.address.split("　")?.[1] : "---"}</p>
                                <button className='block max-w px-8 py-2 bg-sky-950 rounded-lg mx-auto mt-2 text-white cursor-pointer' onClick={() => toPage.push("/facility/" + d.slug)} >詳細を見る</button>

                            </div>
                        </div>
                    ) :
                    <div>
                        <h2 style={{ textAlign: "center" }}>結果がありません。</h2>
                    </div>}
            </div>
            <Pagination page={pageNo} next={() => { toPage.push("?area=" + area + "&lo=" + location + "&page=" + (pageNo + 1)) }} prev={() => { toPage.push("?area=" + area + "&lo=" + location + "&page=" + (pageNo - 1)) }} end={_facilities.length < _limit} onClick={(p) => { { toPage.push("?area=" + area + "&lo=" + location + "&page=" + (p)) } }} />
        </div>
    )
}

export default Page