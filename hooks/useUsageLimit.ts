import { useLocalStorage } from './useLocalStorage';

const USAGE_LIMIT = 20;

export const useUsageLimit = () => {
    const [usageLog, setUsageLog] = useLocalStorage<number[]>('silo-build-usage-log', []);

    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getTime();

    const currentMonthUsage = usageLog.filter(ts => ts >= firstDayOfMonth).length;
    const isBlocked = currentMonthUsage >= USAGE_LIMIT;

    const recordUsage = () => {
        if (isBlocked) {
            console.error("Usage limit reached. Cannot record new usage.");
            return false;
        }
        setUsageLog(prev => [...prev, new Date().getTime()]);
        return true;
    };
    
    return {
        count: currentMonthUsage,
        limit: USAGE_LIMIT,
        isBlocked,
        recordUsage
    };
};
