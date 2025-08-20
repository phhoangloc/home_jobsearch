'use client'
import { useEffect, useState } from 'react'
import React from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { ApiItem } from '@/api/client'
import { PostType } from '../page'
import Image from 'next/image'
import { jpyFormatter } from '@/lib/currency'
import moment from 'moment'
import Link from 'next/link'
import axios from 'axios'
const Page = () => {
    const param = useParams<{ slug: string }>()
    const slug = param.slug
    const searchParams = useSearchParams()
    const archivePlus = searchParams.get("archivePlus")
    const [_post, set_post] = useState<PostType>()

    useEffect(() => {
        const getItem = async (archivePlus: string, slug: string,) => {
            const result = await ApiItem({ archive: "post", archivePlus, slug })
            if (result.success) {
                set_post(result.data[0])
            } else {
                set_post(undefined)
            }
        }
        if (archivePlus) {
            getItem(archivePlus, slug)
        } else {
            getItem("post", slug)

        }
    }, [archivePlus, slug])

    const [_openMailModal, set_mailModal] = useState<boolean>(false)
    const [_to, set_to] = useState<string>("")
    const [_mail, set_mail] = useState<string>("")
    const [_subject, set_subject] = useState<string>("")
    const [_content, set_content] = useState<string>("")
    const [_warn, set_warn] = useState<string>("")
    const [_refresh, set_refresh] = useState<number>(0)

    useEffect(() => {
        if (_openMailModal && _post) {
            set_to(_post.contract)
        }
    }, [_openMailModal, _post])

    const sendMail = async (body: { receipt: string, subject: string, content: string, email: string }) => {
        const newBody: {
            receipt?: string,
            subject?: string,
            email: string,
            content: string
        } = body

        const result = await axios.post(process.env.api_url + "api/apply", newBody)
        if (result.data.success) {
            set_warn(result.data.data)
            setTimeout(() => {
                set_warn("")
                set_mail("")
                set_subject("")
                set_content("")
                set_refresh(n => n + 1)
                set_mailModal(false)
            }, 3000)
        }
    }
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
                <div className='w-max px-8 py-2 bg-sky-800 rounded-lg mx-auto mt-8 text-white cursor-pointer' onClick={() => { set_mailModal(true) }}>応募はこちらから</div>

            </div>
            <div className={` backdrop-brightness-75 w-screen h-screen top-0 left-0 flex flex-col justify-center  fixed ${_openMailModal ? "block" : "hidden"}`} key={_refresh}>
                <div className='w-11/12 max-w-(--lg) m-auto bg-white p-4 rounded-md shadow'>
                    <div>宛先:</div>
                    <div><input
                        onFocus={(e) => { e.currentTarget.style.outline = "none"; }}
                        className='border-b border-slate-300 w-full mb-4' value={_to} onChange={(e) => set_to(e.target.value)}></input>
                    </div>
                    <div>件名:</div>
                    <div>
                        <input onFocus={(e) => { e.currentTarget.style.outline = "none"; }}
                            className='border-b border-slate-300 w-full mb-4' value={_subject} onChange={(e) => set_subject(e.target.value)}>
                        </input>
                    </div>
                    <div>内容:</div>
                    <div>
                        <textarea
                            onFocus={(e) => { e.currentTarget.style.outline = "none"; }}
                            className='border-b border-slate-300 w-full h-28' value={_content} onChange={(e) => set_content(e.target.value)}>
                        </textarea>
                    </div>
                    <div>メール:</div>
                    <div><input
                        onFocus={(e) => { e.currentTarget.style.outline = "none"; }}
                        className='border-b border-slate-300 w-full mb-4' value={_mail} onChange={(e) => set_mail(e.target.value)}></input>
                    </div>
                    <div className='h-12 "'></div>
                    <div className=' text-sky-600 '>{_warn}</div>
                    <div className='flex gap-2'>
                        <button className='w-28 h-12 border border-sky-600 text-sky-600 rounded-md block ml-auto mr-0 cursor-pointer' onClick={() => {
                            set_warn("")
                            set_mail("")
                            set_subject("")
                            set_content("")
                            set_refresh(n => n + 1)
                            set_mailModal(false)
                        }}>キャンセル</button>
                        <button className='w-28 h-12 bg-sky-600 text-white rounded-md block m-0 cursor-pointer' onClick={() => sendMail({ receipt: _to, subject: _subject, content: _content, email: _mail })}>送信</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Page