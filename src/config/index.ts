import ReportData from '../data/ReportData';
import { IPerformanceConfig, IReportData } from '../typings/types';

export const config: IPerformanceConfig = {
    //Metrics
    reportData: new ReportData({logUrl: 'hole'}),
    isResourceTiming: false, 
    isElementTiming: false, 

    //loading
    maxTime: 15000,

}