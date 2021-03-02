/**
 * 性能监控SDK
 *
 */
import { config } from './config';
import { IReportData, IPerformanceOptions } from "./typings/types";
import ReportData from './data/reportData';
import analyticsTracker from './data/analyticsTracker';
import ErrorTrace from './error';
export default class Performance {
  private v = "1.0.0";
  //报告
  private reportData: IReportData;

  constructor(options: IPerformanceOptions = {}) {
         //扩展基础配置
         const logUrl = options.logUrl;

         if(!logUrl){
           throw new Error(`性能监控平台${this.v} 提示未传递logUrl`)
         }

         //向后台传送数据
         const insReportData = new ReportData({logUrl});

         config.reportData = insReportData;
         //对外暴露上传接口
         this.reportData = insReportData;

         //集合数据汇总
         const _analyticsTracker = options.analyticsTracker;
         if(_analyticsTracker){
           config.analysisTracker = options.analyticsTracker;
         } else {
           config.analysisTracker = analyticsTracker;
         }

         config.isResourceTiming = !!options.resourceTiming;
         config.isElementTiming = !!options.elementTiming;
         config.maxTime = options.maxMeasureTime || config.maxTime;

         if(options.captureError){
           //开启错误追踪
           const errorTrace = new ErrorTrace();
           errorTrace.run();
         }
  }
}
