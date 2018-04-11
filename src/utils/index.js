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
    return 'http://oocffpuei.bkt.clouddn.com/FoQRQHVQwZRd4mhGQ4qsPxDsqmnz'
}