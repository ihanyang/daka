import Fly from 'flyio/dist/npm/wx'

const fly = new Fly()
const baseURL = process.env.NODE_ENV === 'production' ? 'https://api.jinghao.com' : 'http://jhtest.jinghao.com'

fly.config.baseURL = baseURL

fly.interceptors.request.use((request) => {
    let {body} = request
    const session = getApp().session

    //console.log(request)

    wx.showLoading({
        title: '正在加载',
        mask: true
    })

    if (! body) {
        body = {}
    }

    session && (body.session = session)

    request.body = Object.keys(body).map((item) => `${encodeURIComponent(item)}=${encodeURIComponent(body[item])}&`).join('').replace(/&$/, '')

    //request.headers['Content-Type'] = 'application/x-www-form-urlencoded'
})

fly.interceptors.response.use((response) => {
    wx.hideLoading()
    //console.log(response)

    const {data} = response

    if (typeof data === 'string') {
        wx.showModal({
            title: '提示',
            content: '系统错误，请稍候重试',
            showCancel: false
        })

        return null
    }

    if (data.flag !== 1) {
        wx.showModal({
            title: '提示',
            content: data.msg,
            showCancel: false
        })

        return null
    }

    return data
}, (error) => {
    console.log(error)
})

// 全局
export function login(params) {
    return fly.post('/wxapplib/wxapp/login', params).then((response) => {
        return response
    })
}
export function saveUserInfo(params) {
    return fly.post('/wxapplib/wxapp/saveUserInfo', params).then((response) => {
        return response
    })
}
export function addFormId(params) {
    return fly.post('/wxapplib/wxapp/addFormId', params).then((response) => {
        return response
    })
}
export function getCheckStatus(params) {
    return fly.post('/api/system/getAppConfig', params).then((response) => {
        return response
    })
}
export function getQiNiuToken(params) {
    return fly.post('/api/system/getUploadToken', params).then((response) => {
        return response
    })
}
export function sendTime(params) {
    return fly.post('/api/clock/studyTime', params).then((response) => {
        return response
    })
}

// 首页
export function getHomeData(params) {
    return fly.post('/api/clock/home', params).then((response) => {
        return response
    })
}
export function getHomeDaKaList(params) {
    return fly.post('/api/clock/planList', params).then((response) => {
        return response
    })
}

// 发现页面
export function getDiscoverTagList(params) {
    return fly.post('/api/clock/tagList', params).then((response) => {
        return response
    })
}
export function getDiscoverDaKaList(params) {
    return fly.post('/api/clock/pubPlanList', params).then((response) => {
        return response
    })
}

// 新建打卡
export function addNewDaka(params) {
    return fly.post('/api/clock/addPlan', params).then((response) => {
        return response
    })
}

// 打卡详情页面
export function getDetailData(params) {
    return fly.post('/api/clock/planDetail', params).then((response) => {
        return response
    })
}
export function daka(params) {
    return fly.post('/api/clock/clockIn', params).then((response) => {
        return response
    })
}
export function join(params) {
    return fly.post('/api/clock/joinPlan', params).then((response) => {
        return response
    })
}
export function getExperienceList(params) {
    return fly.post('/api/clock-post/list', params).then((response) => {
        return response
    })
}
export function getNewMessage(params) {
    return fly.post('/api/clock/newMessageNum', params).then((response) => {
        return response
    })
}

// 邀请卡页面
export function getInviteCard(params) {
    return fly.post('/api/clock/getInviteCard', params).then((response) => {
        return response
    })
}

// 编辑详情
export function editDetailData(params) {
    return fly.post('/api/clock/editPlan', params).then((response) => {
        return response
    })
}

// 打卡心得评论页面
export function postExperience(params) {
    return fly.post('/api/clock-post/reply', params).then((response) => {
        return response
    })
}

// 设置页面
export function getDakaSetting(params) {
    return fly.post('/api/clock/getPlanRemind', params).then((response) => {
        return response
    })
}
export function setDakaSetting(params) {
    return fly.post('/api/clock/setPlanRemind', params).then((response) => {
        return response
    })
}

//import {login} from '@/utils'

export function fetch(url, data = {}, method = 'POST') {
    let header = {}
    const session = getApp().session

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
    }).then((data) => {
        // if (data.flag === -100) {
        //     wx.showModal({
        //         title: '我去打撒',
        //         content: 23432
        //     })
        //     login().then(() => {
        //         wx.reLaunch({
        //             url: '/pages/index/index'
        //         })
        //     })

        //     return
        // }

        return data
    })
}