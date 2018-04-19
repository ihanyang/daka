import api from '@/api'

export function login() {
    return new Promise((resolve, reject) => {
        wx.login({
            success: async (res) => {
                const data = await api.login({
                    code: res.code,
                    flag: 'app02'
                })

                //console.log(response)

                wx.setStorageSync('session', data.data.session)

                resolve()
            },
            fail() {
                reject()
            }
        })
    })
}

export function sendTime(time) {
    const app = getApp()

    api.sendTime({
        studyTime: (+ new Date() - app.enterTime) / 1000
    })

    app.enterTime = null
}

export function getDefaultAvatar() {
    return 'http://jhsy-img.caizhu.com/daka/FoQRQHVQwZRd4mhGQ4qsPxDsqmnz.png'
}

export function timeFormat(timestamp) {
    const now = Date.now()
    const date = new Date()
    const aa = + new Date(date.getFullYear(), date.getMonth())

    const v = date.getDay() === 0 ? 6 : date.getDay() - 1
    const bb = + new Date(date.getFullYear(), date.getMonth(), date.getDate() - v)

    const agoDate = new Date(timestamp)

    const yearNow = date.getFullYear()
    const monthNow = date.getMonth()
    const dateNow = date.getDate()

    const yearAgo = agoDate.getFullYear()
    const monthAgo = agoDate.getMonth()
    const dateAgo = agoDate.getDate()

    const hourAgo = agoDate.getHours()
    const minutesAgo = agoDate.getMinutes()

    let str

    // 1小时内
    if (now - timestamp <= 60 * 60 * 1000) {
        str =  ~~ ((now - timestamp) / (60 * 1000))

        return str <= 0 ? '刚刚' : `${str}分钟前`
    }

    // 24小时内
    if (yearNow === yearAgo && monthNow === monthAgo && dateNow === dateAgo) {
        str =  ~~ ((now - timestamp) / (60 * 60 * 1000))

        return `${str}小时前`
    }

    // 昨天
    if (yearNow === yearAgo && monthNow === monthAgo) {
        if (dateNow - dateAgo === 1) {
            return `昨天 ${hourAgo}:${minutesAgo}`.replace(/\b(\w)\b/g, '0$1')
        }
    }

    if (yearNow === yearAgo && monthNow - monthAgo === 1) {
        const max = 2 * 24 * 60 * 60 * 1000
        const min = 1
        const timeDiff = now - timestamp

        if (timeDiff >= min && timeDiff < max) {
            return `昨天 ${hourAgo}:${minutesAgo}`
        }
    }

    // 小于一年
    if (date.getFullYear() === agoDate.getFullYear()) {
        return `${agoDate.getMonth() + 1}月${agoDate.getDate()}日 ${hourAgo}:${minutesAgo}`.replace(/\b(\w)\b/g, '0$1')
    }

    // 大于一年
    return `${agoDate.getFullYear()}-${agoDate.getMonth() + 1}-${agoDate.getDate()}`.replace(/\b(\w)\b/g, '0$1')
}