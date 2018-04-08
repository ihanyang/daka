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

                ! wx.getStorageSync('session') && wx.setStorageSync('session', data.data.session)

                resolve()
            },
            fail() {
                reject()
            }
        })
    })
}