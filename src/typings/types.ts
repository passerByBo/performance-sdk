export interface IYidengDataConsumption {
  beacon: number;
  css: number;
  fetch: number;
  img: number;
  other: number;
  script: number;
  total: number;
  xmlhttprequest: number;
}

export interface IReportData {
  sendToAnalytics(level: AskPriority, body: string): void;
}
export interface IPerformanceNavigationTiming {
  fetchTime?: number;
  workerTime?: number;
  totalTime?: number;
  downloadTime?: number;
  timeToFirstByte?: number;
  headerSize?: number;
  dnsLookupTime?: number;
  tcpTime?: number;
  whiteTime?: number;
  domTime?: number;
  loadTime?: number;
  parseDomTime?: number;
}

export interface IPerformanceNetworkInformation {
  downlink?: number;
  effectiveType?: EffectiveConnectionType;
  onchange?: () => void;
  rtt?: number;
  saveData?: boolean;
}

export type EffectiveConnectionType =
  | "2g"
  | "3g"
  | "4g"
  | "5g"
  | "slow-2g"
  | "lte";

//性能监控参数接口
export interface IPerformanceOptions {
  //Metrics 指标
  //捕获错误
  captureError?: boolean;
  // 资源加载时间
  resourceTiming?: boolean;
  //节点加载时间
  elementTiming?: boolean;

  //Analytics分析工具
  analyticsTracker?: (options: IAnalyticsTrackerOptions) => void;

  //Looging
  maxMeasureTime?: number;
  logUrl?: string;
}
//分析工具追踪器
export interface IAnalyticsTrackerOptions {
  metricName: string;
  data: IPerformanceData;
  eventProperties: object;
  navigatorInformation: INavigatorInfo;
  vitalsScore: IVitalsScore;
}
export type IVitalsScore = "good" | "needsImprovement" | "poor" | null;

export type IPerformanceData =
  | number
  | IPerformanceNavigationTiming
  | IPerformanceNetworkInformation;

export interface INavigatorInfo {
  deviceMemory?: number;
  hardwareConcurrency?: number;
  isLowEndDevice?: boolean;
  isLowEndExperience?: boolean;
  serviceWorkerStatus?: "controlled" | "supported" | "unsupported";
}

//请求响应优先级
export enum AskPriority {
  URGENT = 1,
  IDLE = 2,
}

/**
 * @param isResourceTiming - 是否开启资源数据
 * @param isElementTiming - 是否开启性能数据
 * @param analyticsTracker - 最大请求时间
 * @param analyticsTracker - void方法参数IAnalyticsTrackerOptions
 * @param maxTime - 自定义分析工具
 * @interface 系统配置接口
 * @public
 */

export interface IPerformanceConfig {
  reportData: IReportData;
  isResourceTiming: boolean;
  isElementTiming: boolean;
  analysisTracker?: (options: IAnalyticsTrackerOptions) => void;
  maxTime: number;
}

export interface IPerfObservers {
  [measureName:string]: any;
}

export type IPerformanceObserverType = 
| 'first-input'
  | 'largest-contentful-paint'
  | 'layout-shift'
  | 'longtask'
  | 'measure'
  | 'navigation'
  | 'paint'
  | 'element'
  | 'resource';

  //度量指标数据
export interface IMetricMap {
  [measureName: string]: boolean;
}
export declare interface IPerformanceEntry {
  decodedBodySize?: number;
  duration: number;
  entryType: IPerformanceObserverType;
  initiatorType?: IPerformanceEntryInitiatorType;
  loadTime: number;
  name: string;
  renderTime: number;
  startTime: number;
  hadRecentInput?: boolean;
  value?: number;
  identifier?: string;
}

// https://wicg.github.io/event-timing/#sec-performance-event-timing
export interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: DOMHighResTimeStamp;
  target?: Node;
}

export interface IPerfumeData{
  
}

