"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

interface RawDataPoint {
  id: string;
  timestamp: string;
  duration: number;
  sentiment_score: number;
  resolution: 'resolved' | 'escalated' | 'pending';
  customer_type: 'premium' | 'standard' | 'basic';
}

interface AggregatedData {
  hour_bucket: string;
  total_calls: number;
  avg_duration: number;
  resolution_rate: number;
  avg_sentiment: number;
  last_updated: string;
}

export function ETLPipelineDemo() {
  const [rawData, setRawData] = useState<RawDataPoint[]>([]);
  const [aggregatedData, setAggregatedData] = useState<AggregatedData[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [stats, setStats] = useState({
    totalProcessed: 0,
    lastETLRun: '',
    queueSize: 0
  });

  const dataIngestionRef = useRef<NodeJS.Timeout>();
  const etlProcessingRef = useRef<NodeJS.Timeout>();
  const rawDataRef = useRef<RawDataPoint[]>([]);

  // Keep rawDataRef in sync with rawData state
  useEffect(() => {
    rawDataRef.current = rawData;
  }, [rawData]);

  // Generate random call data
  const generateRandomCall = (): RawDataPoint => {
    const resolutions: Array<'resolved' | 'escalated' | 'pending'> = ['resolved', 'resolved', 'resolved', 'escalated', 'pending'];
    const customerTypes: Array<'premium' | 'standard' | 'basic'> = ['premium', 'standard', 'basic'];
    
    return {
      id: `call_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      duration: Math.floor(Math.random() * 600) + 60, // 60-660 seconds
      sentiment_score: Math.random(),
      resolution: resolutions[Math.floor(Math.random() * resolutions.length)],
      customer_type: customerTypes[Math.floor(Math.random() * customerTypes.length)]
    };
  };

  // Get hour bucket for aggregation
  const getHourBucket = (timestamp: string): string => {
    const date = new Date(timestamp);
    date.setMinutes(0, 0, 0);
    return date.toISOString();
  };

  // Process raw data through ETL
  const runETLProcess = useCallback(() => {
    const currentTime = new Date().toISOString();
    const currentRawData = rawDataRef.current;
    
    console.log('Running ETL process with', currentRawData.length, 'records');
    
    if (currentRawData.length === 0) {
      console.log('No raw data to process');
      setStats(prev => ({
        ...prev,
        lastETLRun: currentTime,
        queueSize: 0
      }));
      return;
    }
    
    // Process all raw data
    const buckets = new Map<string, {
      calls: RawDataPoint[];
      total_duration: number;
      resolved_count: number;
      sentiment_sum: number;
    }>();

    currentRawData.forEach(call => {
      const bucket = getHourBucket(call.timestamp);
      if (!buckets.has(bucket)) {
        buckets.set(bucket, {
          calls: [],
          total_duration: 0,
          resolved_count: 0,
          sentiment_sum: 0
        });
      }
      
      const bucketData = buckets.get(bucket)!;
      bucketData.calls.push(call);
      bucketData.total_duration += call.duration;
      bucketData.sentiment_sum += call.sentiment_score;
      if (call.resolution === 'resolved') {
        bucketData.resolved_count++;
      }
    });

    // Create aggregated results
    const newAggregatedData: AggregatedData[] = Array.from(buckets.entries()).map(([bucket, data]) => ({
      hour_bucket: bucket,
      total_calls: data.calls.length,
      avg_duration: Math.round(data.total_duration / data.calls.length),
      resolution_rate: data.resolved_count / data.calls.length,
      avg_sentiment: data.sentiment_sum / data.calls.length,
      last_updated: currentTime
    }));

    console.log('Generated aggregated data:', newAggregatedData);

    setAggregatedData(newAggregatedData);
    setStats(prev => ({
      ...prev,
      totalProcessed: currentRawData.length,
      lastETLRun: currentTime,
      queueSize: currentRawData.length
    }));
  }, []);

  // Start data ingestion (random intervals)
  const startDataIngestion = useCallback(() => {
    const scheduleNext = () => {
      // Random interval between 1-4 seconds
      const interval = Math.random() * 3000 + 1000;
      dataIngestionRef.current = setTimeout(() => {
        const newCall = generateRandomCall();
        setRawData(prev => [...prev.slice(-19), newCall]); // Keep last 20 records
        scheduleNext();
      }, interval);
    };
    scheduleNext();
  }, []);

  // Start ETL processing (regular 5-second intervals)
  const startETLProcessing = useCallback(() => {
    etlProcessingRef.current = setInterval(() => {
      runETLProcess();
    }, 5000);
  }, [runETLProcess]);

  // Control simulation
  const toggleSimulation = () => {
    if (isRunning) {
      // Stop simulation
      if (dataIngestionRef.current) clearTimeout(dataIngestionRef.current);
      if (etlProcessingRef.current) clearInterval(etlProcessingRef.current);
      setIsRunning(false);
    } else {
      // Start simulation
      startDataIngestion();
      startETLProcessing();
      setIsRunning(true);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (dataIngestionRef.current) clearTimeout(dataIngestionRef.current);
      if (etlProcessingRef.current) clearInterval(etlProcessingRef.current);
    };
  }, []);

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const formatHour = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      hour12: true
    });
  };

  return (
    <div className="my-8 p-6 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Live ETL Pipeline Simulation</h3>
        <button
          onClick={toggleSimulation}
          className={`px-4 py-2 rounded font-medium transition-colors ${
            isRunning 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {isRunning ? 'Stop Pipeline' : 'Start Pipeline'}
        </button>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Records Processed</div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.totalProcessed}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
          <div className="text-sm text-gray-600 dark:text-gray-400">Queue Size</div>
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.queueSize}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
          <div className="text-sm text-gray-600 dark:text-gray-400">Last ETL Run</div>
          <div className="text-lg font-mono text-green-600 dark:text-green-400">
            {stats.lastETLRun ? formatTime(stats.lastETLRun) : 'Not started'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Raw Data Ingestion */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
          <h4 className="font-semibold mb-3 flex items-center">
            <span className={`w-3 h-3 rounded-full mr-2 ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></span>
            Raw Data Ingestion
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {rawData.slice(-8).map(call => (
              <div key={call.id} className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded border-l-4 border-blue-500">
                <div className="font-mono text-blue-600 dark:text-blue-400">{call.id}</div>
                <div className="text-gray-600 dark:text-gray-400">
                  Duration: {call.duration}s | Sentiment: {call.sentiment_score.toFixed(2)} | Status: {call.resolution}
                </div>
                <div className="text-gray-500 dark:text-gray-500">{formatTime(call.timestamp)}</div>
              </div>
            ))}
            {rawData.length === 0 && (
              <div className="text-gray-500 dark:text-gray-400 text-center py-8">
                No data yet. Start the pipeline to see live ingestion.
              </div>
            )}
          </div>
        </div>

        {/* Aggregated Data Output */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
          <h4 className="font-semibold mb-3 flex items-center">
            <span className="w-3 h-3 rounded-full bg-purple-500 mr-2"></span>
            Aggregated Analytics
          </h4>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {aggregatedData.map(data => (
              <div key={data.hour_bucket} className="border border-purple-200 dark:border-purple-800 rounded p-3 bg-purple-50 dark:bg-purple-900/20">
                <div className="font-semibold text-purple-700 dark:text-purple-300">
                  {formatHour(data.hour_bucket)}
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs mt-2">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Calls: </span>
                    <span className="font-semibold">{data.total_calls}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Avg Duration: </span>
                    <span className="font-semibold">{data.avg_duration}s</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Resolution: </span>
                    <span className="font-semibold">{(data.resolution_rate * 100).toFixed(1)}%</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Sentiment: </span>
                    <span className="font-semibold">{data.avg_sentiment.toFixed(2)}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  Updated: {formatTime(data.last_updated)}
                </div>
              </div>
            ))}
            {aggregatedData.length === 0 && (
              <div className="text-gray-500 dark:text-gray-400 text-center py-8">
                No aggregated data yet. ETL processing runs every 5 seconds.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-600 dark:text-gray-400 text-center">
        💡 <strong>Simulation Details:</strong> Raw data ingests at random intervals (1-4s). ETL processing aggregates data every 5 seconds, simulating real-world micro-batch processing.
      </div>
    </div>
  );
} 