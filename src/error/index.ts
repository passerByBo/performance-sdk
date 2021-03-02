import { config } from "../config";
import { W } from "../data/constants";
import { AskPriority } from "../typings/types";

type ErrorInfo = {};

class ErrorTrace {
  private errordefo: ErrorInfo;
  constructor() {
    this.errordefo = {};
  }

  //全局捕获同步+异步错误
  private globalError() {
    console.log("上报sdk");
    console.log("[ ❌全局捕获错误 ]");

    W.onerror = (
      eventOrMessage: Event | string,
      scriptURI?: string,
      lineno?: number,
      colno?: number,
      error?: Error
    ): boolean => {
      console.log("[ 我知道错误了 ]", eventOrMessage);
      const errorInfo = JSON.stringify({
        scriptURI,
        lineno,
        colno,
        error,
      });
      //通过错误信息还原sourcemap源文件地址
      console.log(errorInfo);
      config.reportData.sendToAnalytics(AskPriority.IDLE, errorInfo);
      return true;
    };
  }

  //资源挂载失败如404png
  private networkError() {
    W.addEventListener(
      "error",
      function (e: ErrorEvent) {
        if (e.target !== W) {
          console.log("🖼网络错误", e.target);
        }
      },
      true
    );
  }

  //异步Promise错误
  private promiseError() {
    W.addEventListener("unhandledrejection", function (e) {
      e.preventDefault();
      console.log("我知道 promise 的错误了", e.reason);
      return true;
    });
  }

  //iframe错误
  private iframeError() {
    const frames = W.frames;
    for (let i = 0; i < frames.length; i++) {
      frames[i].addEventListener(
        "error",
        (e) => {
          console.log("addEventListener");
          console.log(e);
        },
        true
      );
    }
  }

  public run() {
    this.networkError();
    //触发全体数据监听错误
    this.globalError();
    //触发promise的错误
    this.promiseError();
  }
}
