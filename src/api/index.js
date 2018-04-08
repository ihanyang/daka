function fetch(url, data = {}, method = 'POST') {
    let header = {}
    const session = wx.getStorageSync('session')

    if (session && url !== '/wxapplib/wxapp/login') {
        data = {session, ... data}
    }

    if (method === 'POST') {
        header = {
            'content-type': 'application/x-www-form-urlencoded'
        }
    }

    return new Promise((resolve, reject) => {
        wx.request({
            url: `${baseURL}${url}`,
            data,
            method,
            header,
            success(res) {
                resolve(res.data)
            },
            fail(e) {
                reject(`接口：${url} 调用失败` + JSON.stringify(e))
            }
        })
    })
}

// import Fly from 'flyio'
// import qs from 'qs'

//const fly = new Fly()
const baseURL = 'http://jhtest.jinghao.com'


// fly.config.baseURL = baseURL

// fly.interceptors.request.use((request) => {
//     const session = wx.getStorageSync('session')
//     wx.showNavigationBarLoading()
//     console.log(request.body)

//     request.body += `&session=${session}`
//     console.log(request.body)

//     return request
// })

// fly.interceptors.response.use((response, promise) => {
//     wx.hideNavigationBarLoading()

//     if (response.data.flag === 1) {
//         return promise.resolve(response.data)
//     }

//     wx.showModal({
//         title: '提示',
//         content: response.data.msg,
//         showCancel: false
//     })

//     return promise.reject(response.data.msg)
// }, (err, promise) => {
//     wx.hideNavigationBarLoading()

//     wx.showToast({
//         title: err.message,
//         icon: 'none'
//     })

//     return promise.resolve()
// })

const api = {
    login: (params) => fetch('/wxapplib/wxapp/login', params),

    saveUserInfo: (params) => fetch('/wxapplib/wxapp/saveUserInfo', params),
    getHomeData: (params) => fetch('/api/clock/home', params),
    getMyDaKaList: (params) => fetch('/api/clock/planList', params),

    getDiscoverTagList: (params) => fetch('/api/clock/tagList', params),
    getDiscoverDaKaList: (params) => fetch('/api/clock/pubPlanList', params),

    createDaKa: (params) => fetch('/api/clock/addPlan', params),

    getDetailData: (params) => fetch('/api/clock/planDetail', params),
    daka: (params) => fetch('/api/clock/clockIn', params),
    joinGroup: (params) => fetch('/api/clock/joinPlan', params),

    getInviteCard: (params) => fetch('/api/clock/getInviteCard', params),
}

export default api