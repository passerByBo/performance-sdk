/**
 * 性能监控SDK
 *
 */
import { config } from './config';
import { D, W, WN, WP } from './data/constants';
import { IReportData, IPerformanceOptions } from "./typings/types";
import ReportData from './data/reportData';
import { getNavigationTiming } from './performance/getNavigationTiming';
import analyticsTracker from './data/analyticsTracker';
import ErrorTrace from './error';
import { isPerformanceSupported } from './tools/isSupported';
import { didVisibilityChange } from './helpers/onVisibilityChange';
import {
  disconnectPerfObserversHidden,
  initPerformanceObserver,
} from './performance/observe';
import { logData } from './data/log';
import { getNetworkInformation } from './helpers/getNetworkInformation';
import { reportStorageEstimate } from './data/storageEstimate';
export default class Performance {
  private v = "1.0.0";
  //报告
  private reportData: IReportData;

  constructor(options: IPerformanceOptions = {}) {
    //扩展基础配置
    const logUrl = options.logUrl;

    if (!logUrl) {
      throw new Error(`性能监控平台${this.v} 提示未传递logUrl`)
    }

    //向后台传送数据
    const insReportData = new ReportData({ logUrl });

    config.reportData = insReportData;
    //对外暴露上传接口
    this.reportData = insReportData;

    //集合数据汇总
    const _analyticsTracker = options.analyticsTracker;
    if (_analyticsTracker) {
      config.analysisTracker = options.analyticsTracker;
    } else {
      config.analysisTracker = analyticsTracker;
    }

    config.isResourceTiming = !!options.resourceTiming;
    config.isElementTiming = !!options.elementTiming;
    config.maxTime = options.maxMeasureTime || config.maxTime;

    if (options.captureError) {
      //开启错误追踪
      const errorTrace = new ErrorTrace();
      errorTrace.run();
    }

    //如果浏览器不支持性能指标只能放弃
    if (!isPerformanceSupported()) {
      return;
    }

    //浏览器支持的起FRP这样的Observer统计性能
    if ('PerformanceObserver' in W) {
      initPerformanceObserver();
    }

    //初始化
    if(typeof D.hidden !== 'undefined'){
      // Opera 12.10 and Firefox 18 and later support
      D.addEventListener(
        'visibilitychange',
        didVisibilityChange.bind(this, disconnectPerfObserversHidden)
      )
    }

    //记录系统DNS请求+白屏时间
    logData('navigationTiming', getNavigationTiming())

    //记录用户的网速 H5+多普勒测速
    logData('networkInformation', getNetworkInformation());

     //管理离线缓存数据
     if (WN && WN.storage && typeof WN.storage.estimate === 'function') {
      WN.storage.estimate().then(reportStorageEstimate);
    }
  }
}
