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
  // === 데이터 전송
  const send = (method, uri, data, _headers, _files = []) => {
    return new Promise(async (resolve, reject) => {
      let options = {
        baseURL: apiServer,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Cache: "no-cache",
          withCredentials: true,
          "x-access-token": Cookies.get("x-access-token") || "",
          ..._headers
        }
      };
      let sendData = data;
      let result;
      console.log("*** sendAjax: ", uri, data, _files);

      // 파일 업로드 처리
      if (_files.length) {
        options.headers["Content-Type"] = "multipart/form-data";
        sendData = new FormData();
        _files.map(item =>
          // console.log("> file item: ", item);
          sendData.append(item.name, item.file)
        );
        if (data) {
          sendData.append("data", JSON.stringify(data));
        }
      }

      // console.log("> send", method, uri);
      try {
        if (method === "get" || method === "delete") {
          result = await axios[method](uri, options);
        } else if (
          method === "post" ||
          method === "update" ||
          method === "patch"
        ) {
          result = await axios[method](uri, sendData, options);
        }
        // console.log("> result.data", result.data);
        // 발급 요청이 있을 경우.
        if (result.data.refreshToken === true) {
          options.headers["x-refresh-token"] = Cookies.get("x-refresh-token");
          // console.log("> send refresh token: ", refreshTokenUrl, options);
          const refreshTokenResult = await axios.get(refreshTokenUrl, options);
          const { token, refreshToekn } = refreshTokenResult.data;
          // console.log("> 리프레시 토큰 발급 실패 유무: ", unauthorization);
          // 토큰 재발급이 완료되었을 경우 재발급
          if (token) {
            Cookies.set("x-access-token", token, { expires: 365 });
          }
          if (refreshToekn) {
            Cookies.set("x-refresh-token", refreshToekn, { expires: 365 });
          }
          return send(method, uri, data);
        }
        resolve(result);
      } catch (e) {
        console.log("*** sendAjax Error", e.response);
        // // reject(e);
        reject({ ...e });
      }
    });
  };

  return {
    get: ({ uri, headers }) => send("get", uri, headers),
    post: ({ uri, data, headers, files }) =>
      send("post", uri, data, headers, files),
    patch: ({ uri, data, headers, files }) =>
      send("patch", uri, data, headers, files),
    update: ({ uri, data, headers }) => send("update", uri, data, headers),
    delete: ({ uri, headers }) => send("delete", uri, headers)
  };
})();
