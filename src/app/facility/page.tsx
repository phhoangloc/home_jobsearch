'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Pagination from '@/components/pagination'
import { ApiItem } from '@/api/client'
import Image from 'next/image'
import { FacilityType } from './[slug]/page'
import { japanRegions } from '@/lib/area'
import CloseIcon from '@mui/icons-material/Close';

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

    const [_modal, set_modal] = useState<boolean>(false)
    const [_location, set_location] = useState<string[]>([])
    const [_regionIndex, set_regionIndex] = useState<number>(-1)

    useEffect(() => {
        set_location(location.split(","))
    }, [location])
    return (
        <div className='p-10 bg-facility-bg'>
            <div className='mx-auto mb-4 max-w-(--xl) text-white'>
                <h2 className='text-2xl font-bold text-pinkTXT'>Facility</h2>
                <div className="h-1"></div>
                <div className='flex w-full'>
                    <h1 className='text-3xl border-l-4 border-pinkTXT pl-2 font-semibold tracking-[1px] text-titleTXT'>施設紹介</h1>
                </div>
            </div>
            <div className='m-auto max-w-(--xl) grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-10 gap-2'>
                <div className=' relative col-span-1 sm:col-span-2 bg-white h-12 border shadow rounded '>
                    <p className='flex h-full flex-col justify-center font-bold px-2' onClick={() => set_modal(true)}>{_location.toString() || "全国"}</p>
                    {_modal ?
                        <div className='absolute top-0 w-full bg-white border rounded shadow-md overflow-hidden f'>
                            <div className='border-b-2 border-slate-200 h-12 flex justify-between px-2'>
                                <p className='flex h-full flex-col justify-center font-bold'>エリア</p><CloseIcon className='my-auto cursor-pointer' onClick={() => set_modal(false)} />
                            </div>
                            <div className="flex">

                                <div className='border-r-2 border-slate-200 w-20'>
                                    {japanRegions.map((region, index) => <div className={`h-8 w-20 px-1 flex flex-col justify-center border-b border-slate-200 last:border-0 cursor-pointer ${index == _regionIndex ? "bg-search-bg text-white" : ""}`} key={index} onClick={() => set_regionIndex(index)}>{region.region}</div>)}
                                </div>
                                <div className="w-full">
                                    <div className='h-8 flex flex-col justify-center text-center font-bold'>{japanRegions[_regionIndex]?.region}</div>
                                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
                                        {japanRegions[_regionIndex]?.prefectures.map((pre, index) =>
                                            <div className='px-1 flex gap-1' key={index}>
                                                <input type='checkbox' checked={_location.includes(pre.name)} onChange={() => { set_location(lo => lo.includes(pre.name) ? lo.filter(l => l !== pre.name) : [...lo, pre.name]) }}></input>
                                                <p className='h-8 flex flex-col justify-center'>{pre.name}</p>
                                            </div>)}
                                    </div>
                                </div>

                            </div>

                        </div> : null}

                </div>
                <div className={`col-span-2 lg:col-span-1 h-12 `}>
                    <div className={`w-1/2 m-auto h-full lg:w-full flex flex-col justify-center text-center font-bold rounded bg-sky-800 text-white`} onClick={() => toPage.push(`/facility?location=${_location}`)}>検索</div>
                </div>
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