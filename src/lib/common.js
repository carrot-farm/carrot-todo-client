/*
  ========================================
    프로젝트별 공통 함수
  ========================================
*/
import Cookies from "js-cookie";
import axios from "axios";

import { googleLoginUrl, apiServer, refreshTokenUrl } from "config";

// ===== 구글 로그인 창 오픈
export const googleLogin = () => {
  return new Promise((resolve, reject) => {
    let fn;
    // 로그인 창 오픈
    window.open(
      googleLoginUrl,
      "googleLoginWindow",
      "width=500,height=600,left=50,top=50"
    );

    // 메세지 수신
    fn = window.addEventListener("message", e => {
      resolve(e.data);
      // console.log("*** googleLogin", e.data);
      window.removeEventListener("message", fn);
    });
  });
};

// ===== jwt 토큰 저장
export const saveAccessToken = (token, refreshToken) => {
  if (token) {
    Cookies.set("x-access-token", token, { expires: 365 });
  }
  if (refreshToken) {
    Cookies.set("x-refresh-token", refreshToken, { expires: 365 });
  }
};

// ===== 데이터를 보내고 토큰을 자동 발급 하거나 한다.
export const sendAjax = (() => {
  // 데이터 전송
  const send = (method, url, data) => {
    return new Promise(async (resolve, reject) => {
      let options = {
        baseURL: apiServer,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Cache: "no-cache",
          withCredentials: true,
          "x-access-token": Cookies.get("x-access-token") || ""
        }
      };
      let result;

      // console.log("> send", method, url);
      try {
        if (method === "get" || method === "delete") {
          result = await axios[method](url, options);
        } else if (
          method === "post" ||
          method === "update" ||
          method === "patch"
        ) {
          result = await axios[method](url, data, options);
        }
        // console.log("> result.data", result.data);
        // 발급 요청이 있을 경우.
        if (result.data.refreshToken === true) {
          options.headers["x-refresh-token"] = Cookies.get("x-refresh-token");
          // console.log("> send refresh token: ", refreshTokenUrl, options);
          const refreshTokenResult = await axios.get(refreshTokenUrl, options);
          const { token, refreshToekn } = refreshTokenResult.data;
          // 토큰 재발급이 완료되었을 경우 재발급
          if (token) {
            Cookies.set("x-access-token", token, { expires: 365 });
          }
          if (refreshToekn) {
            Cookies.set("x-refresh-token", refreshToekn, { expires: 365 });
          }
          return send(method, url, data);
        }
        resolve(result);
      } catch (e) {
        console.log("*** send Error", e.response);
        reject(e);
      }
    });
  };

  return {
    get: url => send("get", url),
    post: (url, data) => send("post", url, data),
    patch: (url, data) => send("patch", url, data),
    update: (url, data) => send("update", url, data),
    delete: url => send("delete", url)
  };
})();
