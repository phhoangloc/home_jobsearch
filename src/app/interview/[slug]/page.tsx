'use client'
import { ApiItem } from '@/api/client'
import { InterviewType } from '@/app/page'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
const Page = () => {
    const param = useParams<{ slug: string }>()
    const slug = param.slug

    const [_post, set_post] = useState<InterviewType>()
    useEffect(() => {
        const getItem = async (slug: string,) => {
            const result = await ApiItem({ archive: "interview", slug })
            if (result.success) {
                set_post(result.data[0])
            } else {
                set_post(undefined)
            }
        }
        getItem(slug)
    }, [slug])

    const formatPostNo = (input: string) => {
        if (input) {
            const digits = input.replace(/\D/g, '');

            if (digits.length === 7) {
                return digits.replace(/(\d{3})(\d{4})/, '$1-$2');
            }
        }
    }
    console.log(_post)
    return (
        <div className='p-10'>
            <div className='mx-auto mb-4 max-w-(--xl) text-white'>
                <h2 className='text-2xl font-bold text-pinkTXT'>Interview</h2>
                <div className="h-1"></div>
                <div className='flex w-full'>
                    <h1 className='text-3xl border-l-4 border-pinkTXT pl-2 font-semibold tracking-[1px] text-titleTXT'>先輩たちの声</h1>
                </div>
                <div className="h-12"></div>
                <div className="bg-white w-11/12 max-w-(--lg) m-auto  p-2 md:p-8 lg:p-12 mb-12 shadow">

                    <div className='relative'>
                        {process.env.ftp_url && _post?.image?.name ?
                            <Image src={process.env.ftp_url + _post?.image?.name} width={500} height={500} style={{ width: "100%", height: "auto" }} alt='cover' />
                            : <div className='h-full w-full flex-col justify-center'><h1>NO IMAGE</h1></div>
                        }
                    </div>
                    <div className="h-12"></div>
                    <div className='max-w-(--md) m-auto text-slate-950' >
                        <h1 className='text-center text-2xl font-bold text-titleTXT mb-12'>{_post?.name}</h1>
                        <h2 className='text-2xl font-bold'>{_post?.workplace.name}</h2>
                        <h3 className='text-xl'>{_post?.workplace.address}</h3>
                        <div className="h-12"></div>
                        {_post?.contenttitle ? <h2 className='text-2xl font-bold mb-1 text-center text-titleTXT opacity-75'>{`${_post?.contenttitle}`}</h2> : null}
                        <div className=' dangerousBox' dangerouslySetInnerHTML={{ __html: _post?.content || "" }} />
                    </div>
                    <div className="content" style={{ maxWidth: "768px", margin: "50px auto", }}>
                        {_post?.video?.length ? <iframe style={{ width: "100%", aspectRatio: "1.75" }} src={"https://www.youtube.com/embed/" + _post?.video} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe> :
                            <div style={{ width: "100%", height: "100%", background: "#444", color: "white", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center", maxHeight: "300px" }}> NO VIDEO</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page