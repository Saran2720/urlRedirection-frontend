
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useTheme } from '../contexts/ThemeContext';

interface PlatformData {
  name: string;
  value: number;
  color: string;
}

const AnalyticsChart: React.FC = () => {
  const { theme } = useTheme();
  const [data, setData] = useState<PlatformData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);

  const mockData: PlatformData[] = [
    { name: 'Desktop', value: 45, color: '#3B82F6' },
    { name: 'Mobile', value: 35, color: '#8B5CF6' },
    { name: 'Tablet', value: 20, color: '#06B6D4' },
  ];

useEffect(() => {
  const fetchAnalyticsData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/dashboard/summary`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }

      const result = await response.json();

      const platformColors: Record<string, string> = {
        Desktop: '#3B82F6',
        Mobile: '#8B5CF6',
        Tablet: '#06B6D4',
        Android: '#10B981',
        iOS: '#F59E0B',
        Unknown: '#9CA3AF'
      };

      const parsedData: PlatformData[] = Object.entries(result).map(([name, value]) => ({
        name,
        value: Number(value),
        color: platformColors[name] || '#999'
      }));

      setData(parsedData);
    } catch (error) {
      console.error('Analytics error:', error);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setAnimationComplete(true);
      }, 100);
    }
  };

  fetchAnalyticsData(); 

}, []);


  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white dark:bg-gray-800 p-2 rounded-md shadow-lg border border-gray-200 dark:border-gray-600">
          <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
            {data.name}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {data.value}% of total clicks
          </p>
        </div>
      );
    }
    return null;
  };

  const LoadingSkeleton = () => (
    <div className="w-full h-48 sm:h-56 flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full loading-skeleton mx-auto"></div>
        <div className="space-y-2">
          <div className="h-3 w-20 sm:w-24 loading-skeleton mx-auto rounded"></div>
          <div className="h-2 w-16 sm:w-20 loading-skeleton mx-auto rounded"></div>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="glass-card rounded-xl p-3 sm:p-4 lg:p-6 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-4 sm:mb-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold gradient-text mb-2">
            Click Analytics
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm px-2">
            Traffic breakdown by platform
          </p>
        </motion.div>

        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full overflow-hidden"
          >
            <div className="w-full h-56 sm:h-64 flex justify-center">
              <div className="w-48 sm:w-56 h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      outerRadius="65%"
                      innerRadius="40%"
                      paddingAngle={3}
                      dataKey="value"
                      animationBegin={0}
                      animationDuration={2000}
                      animationEasing="ease-out"
                      startAngle={90}
                      endAngle={450}
                    >
                      {data.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                          className="hover:opacity-80 transition-opacity duration-200"
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                      verticalAlign="bottom" 
                      height={24}
                      wrapperStyle={{
                        paddingTop: '8px',
                        fontSize: '10px',
                        color: theme === 'dark' ? '#e5e7eb' : '#374151'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}

        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-3 gap-2 sm:gap-3 mt-4 sm:mt-6"
          >
            {data.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="text-center p-2 sm:p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200/50 dark:border-gray-600/50"
              >
                <div 
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full mx-auto mb-1"
                  style={{ backgroundColor: item.color }}
                ></div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-xs">
                  {item.name}
                </h4>
                <p className="text-sm sm:text-lg font-bold text-gray-900 dark:text-gray-100">
                  {item.value}%
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AnalyticsChart;
