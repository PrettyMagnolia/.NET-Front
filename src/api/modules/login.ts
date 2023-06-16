import { Login, ResUserInfo } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 登录模块
 */
// * 用户登录
export const loginApi = (params: Login.ReqLoginForm) => {
	return http.post<Login.ResLogin>(PORT1 + `/login`, params, { headers: { noLoading: true } }); // 正常 post json 请求  ==>  application/json
};

// * 用户账户激活
export const activateApi = (params: Login.ReqActivate) => {
	return http.post<string>(PORT1 + `/activate`, params, { headers: { noLoading: true } });
}

// * 获取用户信息
export const getUserInfoApi = () => {
	return http.get<ResUserInfo>(PORT1 + `/account`, {}, { headers: { noLoading: true } });
}

// * 获取按钮权限
export const getAuthButtonListApi = () => {
	return http.get<Login.ResAuthButtons>(PORT1 + `/auth/buttons`, {}, { headers: { noLoading: true } });
};

// * 获取菜单列表
export const getAuthMenuListApi = () => {
	console.log("获取菜单列表");
	return http.get<Menu.MenuOptions[]>(PORT1 + `/menu/list`, {}, { headers: { noLoading: true } });
};

// * 用户退出登录
export const logoutApi = () => {
	// return http.post(PORT1 + `/logout`);
	return Promise.resolve();
};

// * 用户修改密码
export const changePasswordApi = (password: string) => {
	return http.post<string>(PORT1 + `/change-password?password=${password}`, { }, {});
}
