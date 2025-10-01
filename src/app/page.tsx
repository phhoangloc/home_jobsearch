'use client'
import ButtonWeb from "@/components/button"
import Image from "next/image"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useRouter } from "next/navigation";
import SearchTool from "@/components/searchTool";
import { useEffect, useState } from "react";
import { ApiItem } from "@/api/client";
import { PostType } from "./search/page";
import CloseIcon from '@mui/icons-material/Close';
import { japanRegions } from "@/lib/area";
import moment from "moment";
export type InterviewType = {
  id: number,
  archive: string,
  name: string,
  slug: string,
  worktype: string,
  content: string,
  contenttitle: string,
  imageId: number,
  image: {
    name: string
  },
  workplaceId: number,
  workplace: {
    name: string,
    location: string,
    address: string
  },
  video: string
}
export type NewsType = {
  name: string,
  content: string,
  editDate: Date
}
export default function Home() {
  const toPage = useRouter()
  const [_tag, set_tag] = useState<string[]>([])
  const [_post, set_post] = useState<PostType[]>([])
  const [_interview, set_interview] = useState<InterviewType[]>([])

  const [_modal, set_modal] = useState<boolean>(false)
  const [_regionIndex, set_regionIndex] = useState<number>(-1)
  const [_location, set_location] = useState<string[]>([])

  const [_name, set_name] = useState<string>("")
  const [_email, set_email] = useState<string>("")
  const [_content, set_content] = useState<string>("")

  const [_news, set_news] = useState<NewsType>()
  useEffect(() => {
    const getTag = async () => {
      const result = await ApiItem({ archive: "tag", limit: 20 })
      if (result.success) {
        set_tag(result.data.filter((t: { post: [] }) => t.post.length > 0).map((t: { name: string }) => t.name))
      }
    }
    getTag()
  }, [])
  useEffect(() => {
    const getPost = async () => {
      const result = await ApiItem({ archive: "post", limit: 4 })
      if (result.success) {
        const posts = result.data
        set_post(posts)
      } else {
        set_post([])
      }
    }
    getPost()
  }, [])
  useEffect(() => {
    const getInterview = async () => {
      const result = await ApiItem({ archive: "interview", limit: 2 })
      if (result.success) {
        const posts = result.data
        set_interview(posts)
      } else {
        set_interview([])
      }
    }
    getInterview()
  }, [])

  useEffect(() => {
    const getNews = async () => {
      const result = await ApiItem({ archive: "news", limit: 1 })
      if (result.success) {
        const posts = result.data[0]
        set_news(posts)
      } else {
        set_news(undefined)
      }
    }
    getNews()
  }, [])
  return (
    <div>
      <div className="min-h-screen relative">
        <div>
          <div className="h-screen lg:flex w-full absolute max-h-[1100px]">
            <div className="w-full h-1/2 lg:w-1/2 lg:h-full relative">
              <Image src={"/img/cover3.jpg"} fill className="object-cover" alt="cover-left" />
            </div>
            <div className="w-full h-1/2 lg:w-1/2 lg:h-full relative">
              <Image src={"/img/cover2.jpg"} fill className="object-cover" alt="cover-left" />
            </div>
          </div>

          <div className="text-center w-full h-max flex flex-col justify-center text-4xl md:text-6xl lg:text-7xl text-white font-bold sticky top-[50vh] leading-[1.5] ">
            <h2 style={{ textShadow: "1px 1px 3px #444" }}>手話を活かして
              <br></br>働くということ。
            </h2>
          </div>
          <div className="h-[150vh] max-h-[1100px]"></div>
        </div>
        <div className="h-max flex flex-col justify-end max-w-[1200px] m-auto px-4">
          <p className="text-center text-lg">
            手話を通じてコミュニケーションの架け橋となる仲間を探しています。
            <br></br>
            あなたの手話スキルを活かし、誰もが理解し合える環境づくりに貢献しませんか?
          </p>
          <div className="relative z-[1] flex my-10 m-auto w-full max-w-[768px]">
            <ButtonWeb name="業界を知る" bg="#F6CA1C" color="#594a36" icon={<KeyboardArrowRightIcon style={{ width: "40px", height: "40px", padding: "5px", boxSizing: "border-box" }} />} onClick={() => toPage.push("/#j")} />
            <ButtonWeb name="仕事を探す" bg="#53B5E1" color="white" icon={<KeyboardArrowRightIcon style={{ width: "40px", height: "40px", padding: "5px", boxSizing: "border-box", color: "white" }} />} onClick={() => toPage.push("/#i")} />
          </div>
          <div className="h-36"></div>
        </div>
      </div>
      <div className=" bg-search-bg p-4 md:p-8" id="i">
        <SearchTool />
        <div className="flex gap-2 w-full max-w-(--xl) mx-auto my-12 flex-wrap">
          {_tag.map((t, index) => <div onClick={() => toPage.push("/search?tag=" + t)} className="h-6 w-max flex flex-col justify-center p-4 rounded-[18px] bg-white cursor-pointer" key={index}>{t}</div>)}
        </div>
        <div className='mx-auto mb-4 max-w-(--xl) text-white'>
          <h2 className='text-2xl font-bold'>Job Information Pickup</h2>
          <div className="h-1"></div>
          <div className='flex w-full'><h1 className='text-3xl border-l-4 pl-2 font-semibold'>求人情報ピックアップ
          </h1> <Image src={"/icon/icon4.png"} width={40} height={40} alt="icon2" className="w-10 h-10 aspect-square" /></div>
        </div>
        <div className="flex gap-1 w-full max-w-(--xl) m-auto">
          {_post.map((p, index) =>
            <div className="bg-white sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 sm:p-3 lg:p-4 shadow hidden rounded nth-[1]:block nth-[2]:sm:block nth-[3]:md:block nth-[4]:lg:block" key={index}>
              <div className="relative aspect-square ">
                <Image src={process.env.ftp_url + p.image.name} fill className="object-cover" alt="post-cover" />
              </div>
              <div className="h-4"></div>
              <div className="h-[100px] overflow-hidden leading-5 text-sm" dangerouslySetInnerHTML={{ __html: p.content.split("。")[0] + "。。。" }}></div>
              <div className='w-5/6 h-8 mx-auto mt-4 bg-sky-900 text-white flex flex-col justify-center text-center font-bold rounded-2xl shadow cursor-pointer' onClick={() => toPage.push("/post/" + p.slug)}>詳しく見る</div>

            </div>)}
        </div>
        <div className='w-max h-10 mx-auto mt-12 bg-sky-800 text-white flex flex-col justify-center text-center font-bold shadow cursor-pointer px-4' onClick={() => toPage.push("/post/")}>すべての求人情報をチェック</div>

      </div>
      <div className="max-w-(--xl) m-auto  p-4 md:p-8" id="h">
        <div className='mx-auto mb-4 max-w-(--xl) '>
          <h2 className='text-2xl font-bold text-pinkTXT'>Interview</h2>
          <div className="h-1"></div>
          <div className='flex w-full'><h1 className='text-3xl border-l-4 border-pinkTXT pl-2 font-semibold tracking-[1px] text-titleTXT'>先輩たちの声
          </h1> <Image src={"/icon/icon3.png"} width={40} height={40} alt="icon2" className="w-10 h-10 aspect-square" /></div>
        </div>
        <div className="flex flex-col gap-4 md:flex-row my-12">
          <div className="w-full">
            <div className="cover" style={{ height: "inherit" }}>

              {_interview[1]?.video?.length ? <iframe style={{ width: "100%", aspectRatio: 1.5 }} src={"https://www.youtube.com/embed/" + _interview[1]?.video} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe> :
                <div style={{ width: "100%", height: "100%", background: "#444", color: "white", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center", maxHeight: "300px" }}> NO VIDEO</div>}
            </div>

            <div className="mt-4">
              <h3 className="font-bold text-xl">{_interview[1]?.contenttitle}</h3>
              <h4 className="font-bold opacity-75">{_interview[1]?.name}</h4>
              <h4 className="opacity-75">{_interview[1]?.workplace?.name}</h4>
            </div>
          </div>
          <div className="w-full">
            <div className="cover" style={{ height: "inherit" }}>
              {_interview[0]?.video?.length ? <iframe style={{ width: "100%", aspectRatio: 1.5 }} src={"https://www.youtube.com/embed/" + _interview[0]?.video} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe> :
                <div style={{ width: "100%", height: "100%", background: "#444", color: "white", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center", maxHeight: "300px" }}> NO VIDEO</div>}
            </div>
            <div className="mt-4">
              <h3 className="font-bold text-xl">{_interview[0]?.contenttitle}</h3>
              <h4 className="font-bold opacity-75">{_interview[0]?.name}</h4>
              <h4 className="opacity-75">{_interview[0]?.workplace?.name}</h4>
            </div>
          </div>
        </div>
        <div className='w-max h-10 mx-auto mt-12 bg-sky-800 text-white flex flex-col justify-center text-center font-bold shadow cursor-pointer px-4' onClick={() => toPage.push("/interview/")}>すべての先輩たちの声</div>
      </div>
      <div className="bg-white" id="j">

        <div className="max-w-(--xl) m-auto p-4 md:p-8" id="j">
          <div className='mx-auto mb-4 max-w-(--xl) '>
            <h2 className='text-2xl font-bold text-pinkTXT'>Industry Introduction</h2>
            <div className="h-1"></div>
            <div className='flex w-full'><h1 className='text-3xl border-l-4 border-pinkTXT pl-2 font-semibold tracking-[1px] text-titleTXT'>業界紹介
            </h1> <Image src={"/icon/icon4.png"} width={40} height={40} alt="icon2" className="w-10 h-10 aspect-square" /></div>
          </div>
          <p className="my-24 text-lg">
            手話を学び、仕事に活かすということは聴覚に障害のある方々とのコミュニケーションをサポートするだけでなく、全ての人々が平等に情報やサービスにアクセスできる社会を築くために欠かせない存在となります。<br></br>
            <br></br>
            言語の壁を超え、心をつなぐ手段として、手話は重要なコミュニケーションの形を提供していきます。<br></br>
            <br></br>
            手話を使った通訳や支援だけでなく、サービス業、医療、教育、エンターテインメントなど、さまざまな分野で手話の活用が広がっています。手話の需要は今後さらに高まっていくでしょう。
            <br></br>
            <br></br>
            <b>活躍する場所</b><br></br>
            ・障がい者施設、老人福祉施設などの社会福祉施設<br></br>
            ・行政機関、医療機関などの公共サービス<br></br>
            ・接客・案内などのサービス業
          </p>
          <div className="md:flex w-full max-w-(--md) mx-auto">
            <ButtonWeb name="施設を探す" bg="#F6CA1C" color="#594a36" icon={<KeyboardArrowRightIcon style={{ width: "40px", height: "40px", padding: "5px", boxSizing: "border-box" }} />} onClick={() => toPage.push("#f")} />
            <ButtonWeb name="先輩たちの声を聞いてみる" bg="#e68a01" color="white" icon={<KeyboardArrowRightIcon style={{ width: "40px", height: "40px", padding: "5px", boxSizing: "border-box" }} />} onClick={() => toPage.push("/interview/")} />
          </div>
        </div>
      </div>
      <div className="bg-facility-bg  p-4 md:p-8" id="f">
        <div className='mx-auto mb-4 max-w-(--xl)  '>
          <h2 className='text-2xl font-bold text-pinkTXT'>Facility Search</h2>
          <div className="h-1"></div>
          <div className='flex w-full'>
            <h1 className='text-3xl border-l-4 border-pinkTXT pl-2 font-semibold tracking-[1px] text-titleTXT'>働く場を探す
            </h1>
            <Image src={"/icon/icon5.png"} width={40} height={40} alt="icon2" className="w-10 h-10 aspect-square" />
          </div>
          <div className='m-auto max-w-(--xl) grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-10 gap-2'>
            <div className=' relative col-span-1 sm:col-span-2 bg-white h-12 border shadow rounded '>
              <p className='font-bold p-2 line-clamp-1 h-8' onClick={() => set_modal(true)}>{_location.length ? _location.join(",") : "全国"}</p>
              {_modal ?
                <div className='absolute top-0 w-full bg-white border rounded shadow-md overflow-hidden f'>
                  <div className='border-b-2 border-slate-200 h-12 flex justify-between px-2'>
                    <p className='font-bold line-clamp-1 h-8 my-2' onClick={() => set_modal(true)}>{_location.length ? _location.join(",") : "全国"}</p>
                    <CloseIcon className='my-auto cursor-pointer' onClick={() => set_modal(false)} />
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
            </div>          </div>
          <div className="h-24"></div>
          <h2 className='text-2xl font-bold text-pinkTXT'>News</h2>
          <div className="h-1"></div>
          <div className='flex w-full'><h1 className='text-3xl border-l-4 border-pinkTXT pl-2 font-semibold tracking-[1px] text-titleTXT'>ニュース
          </h1> <Image src={"/icon/icon1.png"} width={40} height={40} alt="icon1" className="w-10 h-10 aspect-square" /></div>

          <div className="px-4 py-8 border border-slate-200 mt-4 bg-white rounded ">
            <h3 className="opacity-75">{moment(_news?.editDate).format("YYYY年.MM月.DD日")}</h3>
            <h3 className="font-bold text-lg text-center my-4 text-titleTXT">{_news?.name}</h3>
            <div className='dangerousBox' dangerouslySetInnerHTML={{ __html: _news?.content ? _news?.content : "" }} />
          </div>
          <div className="w-max ml-auto mr-0 mt-4 text-white">
            <ButtonWeb name="ニュース⼀覧" bg="#e68a01" icon={<KeyboardArrowRightIcon style={{ height: "30px", width: "30px", margin: "5px 5px 5px auto" }} />}
              onClick={() => toPage.push("/news")} />
          </div>
        </div>
      </div>
      <div className="bg-search-bg">
        <div className="p-4 md:p-8 max-w-(--xl) m-auto">
          <div className="text-white">
            <h2 className='text-2xl font-bold'>Contact</h2>
            <div className="h-1"></div>
            <div className='flex w-full'>
              <h1 className='text-3xl border-l-4 pl-2 font-semibold tracking-[1px] '>お問い合わせ</h1>
            </div>
          </div>
          <div className="h-12"></div>
          <div className="contact grid max-w-(--sm) mx-auto bg-white py-10 p-4 md:p-8 lg:p-12 rounded shadow">
            <h1 className="font-bold text-2xl text-center text-titleTXT">お問い合わせ</h1>
            <div>名称</div>
            <input className="h-12 w-full border rounded border-slate-300" onChange={(e) => set_name(e.currentTarget.value)} value={_name} />
            <div className="h-4"></div>
            <div>eメール</div>
            <input className="h-12 w-full border rounded border-slate-300" onChange={(e) => set_email(e.currentTarget.value)} value={_email} />
            <div className="h-4"></div>
            <div>内容</div>
            <textarea className="h-36 w-full border rounded border-slate-300" value={_content} onChange={(e) => set_content(e.currentTarget.value)} />
            <button className="bg-search-bg w-max mx-auto mt-4 text-lg px-4 py-2 rounded text-white" onClick={() => console.log("お問い合わせは送信されました。応答が届きましたら、ボイスメールをご確認ください。")} >送信</button>
          </div>
        </div>
      </div>
    </div>
  )
}
