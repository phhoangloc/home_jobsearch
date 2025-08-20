'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import SearchTool from '@/components/searchTool'
import { ApiItem } from '@/api/client'
import Image from 'next/image'
import moment from 'moment'
import { jpyFormatter } from '@/lib/currency'
export type PostType = {
    id: number,
    archive: string,
    title: string,
    slug: string,
    worktype: string,
    tag: {
        postId: number,
        tag: {
            id: number,
            name: string
        }
    }[],
    workstatus: string,
    worktime: string,
    worksalary: string,
    bonus: string,
    contract: string,
    contractName: string,
    workbenefit: string,
    lisense: string,
    dayoff: string,
    content: string,
    contenttitle: string,
    imageId: number,
    image: {
        name: string
    },
    workplaceId: number,
    workplace: {
        name: string,
        postno: string,
        address: string,
        location: string,
        image: {
            name: string
        }
    },
    startDate: Date,
    endDate: Date
}
const Page = () => {

    const searchParam = useSearchParams()
    const location = searchParam.get("location") || ""
    const worktype = searchParam.get("wt") || ""
    const workstt = searchParam.get("wstt") || ""
    const license = searchParam.get("license") || ""
    const workplace = searchParam.get("workplace") || ""

    const [_posts, set_posts] = useState<PostType[]>([])

    useEffect(() => {
        const getPost = async (location: string, worktype: string, workstatus: string, license: string, workplace: string) => {
            const result = await ApiItem({ archive: "post", location, worktype, workstatus, license, workplace })
            console.log(result)
            if (result.success) {
                set_posts(current => [...current, ...result.data].filter((item, index, self) => index === self.findIndex((i) => i.id === item.id)))
            }
        }
        set_posts([])
        const locationArr = location?.split(",")
        locationArr.forEach(lo => {
            getPost(lo, worktype, workstt, license, workplace)
        });


    }, [license, location, workplace, workstt, worktype])

    const toPage = useRouter()
    return (

        <div className='bg-search-bg p-10'>
            <SearchTool />

            <div className='mx-auto mb-4 max-w-(--xl) text-white'>
                <h2 className='text-2xl font-bold'>Job Information</h2>
                <div className="h-1"></div>
                <div className='flex w-full'>
                    <h1 className='text-3xl border-l-4 pl-2 font-semibold'>求人情報</h1>
                    <Image src={"/icon/icon4.png"} width={40} height={40} alt="icon2" className="w-10 h-10 aspect-square" />
                </div>
            </div>
            <div className="max-w-(--xl) m-auto">
                {_posts.length ?
                    _posts.map((item, index) =>
                        <div key={index} className='bg-white p-2 md:px-4 lg:p-8 rounded shadow mb-12'>
                            <div className="flex flex-col-reverse md:flex-row  gap-4">
                                <div className="w-full md:w-1/2 ">
                                    <h2 className='font-bold text-lg text-titleTXT'>{item.workplace?.name}</h2>
                                    <h4 className='text-sm'>〒{item.workplace?.postno}</h4>
                                    <h3>{item.workplace?.address.split("　")[0]}</h3>
                                    <h3>{item.workplace?.address.split("　")[1] ? item.workplace?.address.split("　")[1] : ""}</h3>
                                    <div style={{ paddingTop: "10px", margin: "10px 10px 0px 0px", borderTop: "1px solid #aaa" }}>
                                        <h4 className='text-center font-bold text-lg mt-2 text-titleTXT'>{item.title}</h4>
                                        <div className='flex flex-wrap gap-2 my-2'>

                                            {item.tag.map(t => t.tag).map((tag, index) => <div className='text-sm py-1 px-4 rounded-2xl bg-blueTXT/15' key={index}>{tag.name}</div>)}
                                        </div>
                                        <h4 className='h-12'>職種：<span className='font-bold'>{item.worktype}</span></h4>
                                        <h4 className='h-12'>雇用形態：<span className='font-bold'>{item.workstatus}</span></h4>
                                        <h4 className='h-12'>通勤時間：<span className='font-bold'>{item.worktime}</span></h4>
                                        <h4 className='h-12'>有給休暇：<span className='font-bold'>{item.workbenefit}</span></h4>
                                        <h4 className='h-12'>月給：<span className='font-bold'>{jpyFormatter.format(Number(item.worksalary))}</span></h4>
                                        <h4 className='h-12'>掲載日:<span className='font-bold'> {moment(item.startDate).format("YYYY年/MM月/DD日")}</span></h4>
                                        <h4 className='h-12'>掲載終了日:<span className='font-bold'> {moment(item.endDate).format("YYYY年/MM月/DD日")}</span></h4>
                                    </div>
                                </div>
                                <div className="relative w-full md:w-1/2 sm:block aspect-square rounded overflow-hidden">
                                    {item.workplace?.image?.name ?
                                        <Image src={process.env.FTP_URL + "img/career/" + item.workplace?.image?.name} fill style={{ objectFit: "cover" }} alt="home" /> :
                                        <Image src={"/img/home.jpg"} fill style={{ objectFit: "cover" }} alt="home" />}
                                </div>

                            </div>
                            <button className='block max-w px-8 py-2 bg-sky-900 rounded-lg mx-auto mt-8 text-white cursor-pointer' onClick={() => toPage.push("/post/" + item.slug)} >詳細を見る</button>
                            <div className="h-12"></div>
                        </div>
                    ) :
                    <div className='h-60'>
                        <h2 className='text-center'>結果がありません。</h2>
                    </div>}
            </div>
        </div>
    )
}

export default Page