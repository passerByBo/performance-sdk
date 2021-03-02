import { config } from '../config';
import { po, poDisconnect } from './performanceObserver';
import { perfObservers } from './observeInstances';
import { initLayoutShift } from './cumulativeLayoutShift';
import { initFirstInputDelay } from './firstInput';
import { perfObservers } from './observeInstances';
export const initPerformanceObserver = (): void => {
    console.log('⏰ 性能收集开始', Math.random());
    perfObservers[0] = po('paint', initFirstPaint);
    perfObservers[1] = po('first-input', initFirstInputDelay);
    perfObservers[2] = po('largest-contentful-paint', initLargestContentfulPaint);
}