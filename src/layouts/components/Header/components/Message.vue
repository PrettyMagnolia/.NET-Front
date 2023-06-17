<template>
  <div class="message">
    <el-popover placement="bottom" :width="310" trigger="click">
      <template #reference>
        <el-badge :value="messageList.length" class="item">
          <i :class="'iconfont icon-xiaoxi'" class="toolBar-icon" />
        </el-badge>
      </template>
      <el-tabs v-model="activeName">
        <el-tab-pane :label="`消息通知(${messageList.length})`" name="first">
          <div style="height: 300px; overflow-y: auto;">
            <div class="message-list" v-for="message in messageList" :key="message.messageId">
              <div class="message-item">
                <img
                  src="@/assets/images/msg01.png"
                  alt=""
                  class="message-icon"
                >
                <div class="message-content">
                  <span class="message-title">{{ message.content }}</span>
                  <span class="message-date">{{ message.createTime }}</span>
                </div>
              </div>
            </div>
          </div>
          
        </el-tab-pane>
      </el-tabs>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getAllMessage } from "@/api/modules/message";
import { Message } from "@/api/interface/index";

import * as signalR from "@microsoft/signalr";

const activeName = ref("first");
const messageList = ref<Message.MessageList[]>([]);

// let hubUrl = "https://localhost:7067/hub";
// let hubUrl = "http://47.113.230.127:5000/hub";
let hubUrl = "http://localhost:5000/hub";

onMounted(() => {
  //.net core 版本中默认不会自动重连，需手动调用 withAutomaticReconnect
  const connection = new signalR.HubConnectionBuilder()
    .withAutomaticReconnect() //断线自动重连
    .withUrl(hubUrl) //传递参数Query["access_token"]
    .build();
  // 心跳包设置
  connection.serverTimeoutInMilliseconds = 24e4;
  connection.keepAliveIntervalInMilliseconds = 12e4;

  connection.on("ReceiveMessage", (message) => {
    console.log("Received message:", message);
    getAllMessage()
    .then((res) => {
      messageList.value = res.data;
      console.log("获取到的消息信息为", messageList.value);
    })
    .catch((err) => {
      console.log(err);
    });
  });

  // 开始连接
  connection
    .start()
    .then(() => console.log("Connected!!!!!"))
    .catch((err) => console.error(err));

  getAllMessage()
    .then((res) => {
      messageList.value = res.data;
      console.log("获取到的消息信息为", messageList.value);
    })
    .catch((err) => {
      console.log(err);
    });
});
</script>

<style scoped lang="scss">
.message-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 260px;
  line-height: 45px;
}
.message-list {
  display: flex;
  flex-direction: column;
  .message-item {
    display: flex;
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid var(--el-border-color-light);
    &:last-child {
      border: none;
    }
    .message-icon {
      width: 40px;
      height: 40px;
      margin: 0 20px 0 5px;
    }
    .message-content {
      display: flex;
      flex-direction: column;
      .message-title {
        margin-bottom: 5px;
      }
      .message-date {
        font-size: 12px;
        color: var(--el-text-color-secondary);
      }
    }
  }
}
</style>
