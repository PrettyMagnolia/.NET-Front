import { Message } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 实验模块
 */
// * 获取所有实验
export const getAllMessage = () => {
	return http.get<Message.MessageList[]>(PORT1 + `/message`, {}, { headers: { noLoading: true } }); // 正常 post json 请求  ==>  application/json
};
