import http from '@/utils/http'

// 登录
export function userLogin (data) {
  return http({
    url: '/user/login',
    method: 'post',
    data: data
  })
}

// 登出
export function userLogout () {
  return http({
    url: '/logout',
    method: 'post'
  })
}
