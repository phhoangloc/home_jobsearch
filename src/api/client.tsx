import axios from "axios"

export type BodyType = {
    archive: string,
    archivePlus?: string
    id?: string,
    slug?: string,
    search?: string,
    category?: string,
    skip?: number,
    limit?: number,
    sort?: string,
    update?: number,
    area?: string,
    location?: string,
    worktype?: string,
    workplace?: string,
    workstatus?: string,
    license?: string,
    tag?: string,
    startDate?: string,
    endDate?: string,

}

export const ApiLogin = async (body: { username: string, password: string }) => {
    const result = await axios.post(process.env.api_url + "api/login", body, {
        withCredentials: true
    })
    return result.data
}

export const ApiSignup = async (body: { username: string, password: string, email: string }) => {
    const result = await axios.post(process.env.api_url + "api/signup", body, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return result.data
}
export const ApiItem = async ({ archive, archivePlus, search, id, slug, category, sort, skip, limit, area, location, worktype, workplace, workstatus, license, tag, startDate, endDate }: BodyType) => {
    try {
        const result = await axios.get(process.env.api_url + "api/" +
            archive +
            "?archive=" + `${archivePlus ? archivePlus : archive ? archive : ""}` +
            "&search=" + `${search ? search : ""}` +
            "&id=" + `${id ? id : ""}` +
            "&slug=" + `${slug ? slug : ""}` +
            "&category=" + `${category ? category : ""}` +
            "&skip=" + `${skip ? skip : ""}` +
            "&sort=" + `${sort ? sort : ""}` +
            "&limit=" + `${limit ? limit : ""}` +
            "&area=" + `${area ? area : ""}` +
            "&location=" + `${location ? location : ""}` +
            "&workplace=" + `${workplace ? workplace : ""}` +
            "&workstatus=" + `${workstatus ? workstatus : ""}` +
            "&worktype=" + `${worktype ? worktype : ""}` +
            "&license=" + `${license ? license : ""}` +
            "&tag=" + `${tag ? tag : ""}` +
            "&startdate=" + `${startDate ? startDate : ""}` +
            "&enddate=" + `${endDate ? endDate : ""}` +
            "&draft=0"
        )
        return result.data
    } catch (error) {
        return {
            success: false,
            error
        }
    }
}
export const getAddress = async (pNo: string) => {
    const result = await axios.get("https://zipcloud.ibsnet.co.jp/api/search?zipcode=" + pNo)
    return result.data
}