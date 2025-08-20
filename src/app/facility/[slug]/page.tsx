'use client'
import { useEffect, useState } from 'react'
import React from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { ApiItem } from '@/api/client'
import Image from 'next/image'
import Link from 'next/link'
import HomeIcon from '@mui/icons-material/Home';

export type FacilityType = {
    id: number,
    archive: string,
    name: string,
    slug: string,
    worktype: string,
    postno: string,
    content: string,
    contenttitle: string,
    imageId: number,
    image: {
        name: string
    },
    address: string,
    location: string,
    area: string,
    phone: string,
    fax: string,
    email: string,
    homepage: string,
    map: string,
    video: string,
}
const Page = () => {
    const param = useParams<{ slug: string }>()
    const slug = param.slug

    const searchParams = useSearchParams()
    const archivePlus = searchParams.get("archivePlus")

    const [_post, set_post] = useState<FacilityType>()
    useEffect(() => {
        const getItem = async (archivePlus: string, slug: string,) => {
            const result = await ApiItem({ archive: "facility", archivePlus, slug })
            if (result.success) {
                set_post(result.data[0])
            } else {
                set_post(undefined)
            }
        }
        if (archivePlus) {
            getItem(archivePlus, slug)
        } else {
            getItem("facility", slug)

        }
    }, [archivePlus, slug])

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
            <div className="bg-white w-11/12 max-w-(--lg) m-auto  p-2 md:p-8 lg:p-12 mb-12 shadow">
                <h2 className='text-center text-xl font-bold text-titleTXT opacity-50'>{_post?.contenttitle}</h2>
                <h1 className='text-center text-2xl font-bold text-titleTXT mb-12'>{_post?.name}</h1>
                <div className='relative'>
                    {process.env.ftp_url && _post?.image?.name ?
                        <Image src={process.env.ftp_url + _post?.image?.name} width={500} height={500} style={{ width: "100%", height: "auto" }} alt='cover' />
                        : <div className='h-full w-full flex-col justify-center'><h1>NO IMAGE</h1></div>
                    }
                </div>
                <div className="h-12"></div>
                <h3 className='text-lg font-bold opacity-50'><span>〒{_post?.postno ? formatPostNo(_post?.postno) : null}</span> </h3>
                <h3 className='text-xl font-bold'>{_post?.address}</h3>
                <div className='social_icon'>
                    {_post?.homepage ?
                        <Link className='flex gap-2' href={_post.homepage} target='_blank'>
                            <HomeIcon className='!w-6 !h-6 my-auto' />
                            <p className='flex flex-col justify-center' onMouseEnter={(e) => e.currentTarget.style.color = "#006699"} onMouseLeave={(e) => e.currentTarget.style.color = "inherit"} style={{ lineHeight: "45px" }}>{_post?.homepage}</p>
                        </Link> :
                        null}
                    {/* <Image src={"/img/twitterx-50.png"} width={30} height={30} alt='x' />
                                <InstagramIcon />
                                <YouTubeIcon /> */}
                </div>
                <div className='dangerousBox' dangerouslySetInnerHTML={{ __html: _post?.map ? _post?.map : "" }} />
                <div className="h-12"></div>
                <div className='dangerousBox min-h-96' dangerouslySetInnerHTML={{ __html: _post?.content || "" }} />
                <div className="h-12"></div>
                <div className="min-h-96 w-full bg-black flex flex-col justify-center">
                    {_post?.video?.length ? <iframe style={{ width: "100%", aspectRatio: "1.75" }} src={"https://www.youtube.com/embed/" + _post?.video} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe> :
                        <h1 className='text-white text-center font-bold'>NO VIDEO</h1>}
                </div>
            </div>
        </div>
    )
}

export default Page