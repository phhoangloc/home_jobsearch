'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { japanRegions } from '@/lib/area'
import CloseIcon from '@mui/icons-material/Close';
import { licenseList, workstatusList, worktypeList } from '@/lib/workstatus';
import { ApiItem } from '@/api/client';
import { useRouter } from 'next/navigation';
type FacilityType = {
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
const SearchTool = () => {

    const [_regionIndex, set_regionIndex] = useState<number>(-1)
    const [_modal, set_modal] = useState<boolean>(false)
    const [_location, set_location] = useState<string[]>([])
    const [_worktype, set_worktype] = useState<string>("")
    const [_workstt, set_workstt] = useState<string>("")
    const [_worklicense, set_worklicense] = useState<string>("")
    const [_facility, set_facility] = useState<string>("")

    const [_facilities, set_facilities] = useState<FacilityType[]>([])

    useEffect(() => {

        const getFacilities = async () => {
            const result = await ApiItem({ archive: "facility" })
            if (result.success) {
                set_facilities(result.data)
            }
        }

        getFacilities()
    }, [])
    const toPage = useRouter()
    return (
        <div className=' '>
            <div className='m-auto max-w-(--xl) text-white'>
                <h2 className='text-3xl font-bold'>Job Search</h2>
                <div className="h-1"></div>
                <div className='flex w-full'><h1 className='text-4xl border-l-4 pl-2 font-semibold'>仕事を探す</h1> <Image src={"/icon/icon2.png"} width={40} height={40} alt="icon2" /></div>
            </div>
            <div className='m-auto max-w-(--xl) grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-10 gap-2'>
                <div className=' relative col-span-1 sm:col-span-2 bg-white h-12 border shadow rounded '>
                    <p className='font-bold p-2 line-clamp-1 h-8' onClick={() => set_modal(true)}>{_location.length ? _location.join(",") : "エリア"}</p>
                    {_modal ?
                        <div className='absolute top-0 w-full bg-white border rounded shadow-md overflow-hidden f'>
                            <div className='border-b-2 border-slate-200 h-12 flex justify-between px-2'>
                                <p className='font-bold line-clamp-1 py-2 h-8'>{_location.length ? _location.join(",") : "エリア"}</p><CloseIcon className='my-auto cursor-pointer' onClick={() => set_modal(false)} />
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
                <div className='col-span-1 bg-white h-12 border shadow rounded text-lg'>
                    <select onChange={(e) => set_worktype(e.target.value)} className='pt-2 w-full flex flex-col justify-center h-full'>
                        <option className='h-12 flex flex-col justify-center' value={""}>{"職種"}</option>
                        {worktypeList.map((item, index) =>
                            <option className='' key={index} value={item.name} >{item.name}</option>
                        )}
                    </select>
                </div>
                <div className='col-span-1 bg-white h-12 border shadow rounded text-lg'>
                    <select onChange={(e) => set_workstt(e.target.value)} className='pt-2 w-full flex flex-col justify-center h-full'>
                        <option className='h-12 flex flex-col justify-center' value={""}>{"雇用形態"}</option>
                        {workstatusList.map((item, index) =>
                            <option className='' key={index} value={item.name} >{item.name}</option>
                        )}
                    </select>
                </div>
                <div className='col-span-1 bg-white h-12 border shadow rounded text-lg'>
                    <select onChange={(e) => set_worklicense(e.target.value)} className='pt-2 w-full flex flex-col justify-center h-full'>
                        <option className='h-12 flex flex-col justify-center' value={""}>{"資格の有無"}</option>
                        {licenseList.map((item, index) =>
                            <option className='' key={index} value={item.name} >{item.name}</option>
                        )}
                    </select>
                </div>
                <div className='col-span-1 bg-white h-12 border shadow rounded'>
                    <select onChange={(e) => set_facility(e.target.value)} className='pt-2 w-full flex flex-col justify-center h-full'>
                        <option className='h-12 flex flex-col justify-center' value={""}>{"施設"}</option>
                        {_facilities.map((item, index) =>
                            <option className='' key={index} value={item.name} >{item.name}</option>
                        )}
                    </select>
                </div>
            </div>
            <div className='my-10 flex w-max m-auto'>
                <div className='w-40 h-12 bg-sky-900 text-white flex flex-col justify-center text-center font-bold rounded-2xl shadow cursor-pointer' onClick={() => toPage.push(`/search?location=${_location}&wt=${_worktype}&wstt=${_workstt}&license=${_worklicense}&workplace=${_facility}`)}>検索</div>
            </div>
        </div>
    )
}

export default SearchTool