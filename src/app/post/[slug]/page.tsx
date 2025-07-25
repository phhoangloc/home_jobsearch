'use client'
import { useEffect, useState } from 'react'
import React from 'react'
import { useParams } from 'next/navigation'
import { ApiItem } from '@/api/client'
import { PostType } from '../page'
import Image from 'next/image'
import { jpyFormatter } from '@/lib/currency'
import moment from 'moment'
const Page = () => {
    const param = useParams<{ slug: string }>()
    const slug = param.slug

    const [_post, set_post] = useState<PostType>()
    useEffect(() => {
        const getItem = async (slug: string,) => {
            const result = await ApiItem({ archive: "post", slug })
            if (result.success) {
                set_post(result.data[0])
            } else {
                set_post(undefined)
            }
        }
        getItem(slug)
    }, [slug])
    return (
        <div>
            <div className="pt-20 pb-10 flex flex-col justify-center">
                <div className='text-2xl text-center font-bold text-titleTXT' >求人情報</div>
            </div>
            <div className="bg-white w-11/12 max-w-(--lg) m-auto  p-2 md:p-8 lg:p-12 mb-12 shadow">
                <div className='relative'>
                    {process.env.ftp_url && _post?.image?.name ?
                        <Image src={process.env.ftp_url + _post?.image?.name} width={500} height={500} style={{ width: "100%", height: "auto" }} alt='cover' />
                        : null}
                </div>
                <h2 className='text-center m-auto font-bold text-titleTXT mt-20 text-xl'><span>{_post?.contenttitle}</span><br></br>{_post?.title}</h2>
                <div className="w-full max-w-(--sm) m-auto" >
                    <div className='sm:flex gap-2 leading-7'><h4 className='w-24 font-bold text-sky-900'>職種</h4><div>{_post?.worktype}</div></div>
                    <div className='sm:flex gap-2 leading-7'>
                        <h4 className='w-24 font-bold text-sky-900'>勤務地</h4>
                        <p className='font-bold'>{_post?.workplace?.name}<br></br>
                            <span className='text-sm opacity-75'>〒{_post?.workplace?.postno}</span> <br></br>
                            <span className='opacity-75'>{_post?.workplace?.address}</span>
                        </p>
                    </div>
                    <div className='sm:flex gap-2 leading-7'><h4 className='w-24 font-bold text-sky-900'>勤務時間</h4><p>{_post?.worktime}</p></div>
                    <div className='sm:flex gap-2 leading-7'><h4 className='w-24 font-bold text-sky-900'>雇⽤形態</h4><div>{_post?.workstatus}</div></div>
                    <div className='sm:flex gap-2 leading-7'><h4 className='w-24 font-bold text-sky-900'>給与</h4><p>{jpyFormatter.format(Number(_post?.worksalary))}</p></div>
                    <div className='sm:flex gap-2 leading-7'><h4 className='w-24 font-bold text-sky-900'>賞与</h4><p>{_post?.bonus}</p></div>
                    {_post?.workbenefit ? <div className='sm:flex gap-2 leading-7'><h4 className='w-24 font-bold text-sky-900'>福利厚生</h4><p>{_post?.workbenefit}</p></div> : null}
                    <div className='sm:flex gap-2 leading-7'><h4 className='w-24 font-bold text-sky-900'>掲載日</h4><p>{moment(_post?.startDate).format("YYYY年/MM月/DD日")}</p></div>
                    <div className='sm:flex gap-2 leading-7'><h4 className='w-24 font-bold text-sky-900'>掲載終了日</h4><p>{moment(_post?.endDate).format("YYYY年/MM月/DD日")}</p></div>
                </div>
                <div className="h-12"></div>
                <div className='bg-sky-800 w-max text-white py-1 px-4 rounded-t-xl ml-2'> <p>詳細</p></div>
                <div className='border border-sky-800 rounded p-2 md:p-8 lg:p-12 leading-7 dangerousBox' dangerouslySetInnerHTML={{ __html: _post?.content || "" }} />
                <div className='w-max px-8 py-2 bg-sky-800 rounded-lg mx-auto mt-8 text-white' ><a href={`mailto:${_post?.contract}?subject=仕事に応募します。&body=この仕事を応募したいです。よろしくお願いいたします。`}>応募はこちらから</a></div>

            </div>
        </div>
    )
}

export default Page