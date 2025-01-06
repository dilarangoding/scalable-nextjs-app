"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, Server, Activity } from 'lucide-react';

const ScalableApp = () => {
  const [serverLoad, setServerLoad] = useState(30);
  const [activeInstances, setActiveInstances] = useState(2);
  const [requestCount, setRequestCount] = useState(0);

  // Simulate increasing load
  const simulateLoad = () => {
    setRequestCount(prev => prev + 1);
    setServerLoad(prev => Math.min(prev + 15, 100));
    
    // Auto-scaling logic
    if (serverLoad > 70 && activeInstances < 5) {
      setActiveInstances(prev => prev + 1);
      setServerLoad(prev => Math.max(prev - 30, 20));
    }
  };

  // Simulate natural load decrease
  useEffect(() => {
    const timer = setInterval(() => {
      setServerLoad(prev => Math.max(prev - 5, 20));
      
      // Scale down if load is low
      if (serverLoad < 30 && activeInstances > 2) {
        setActiveInstances(prev => prev - 1);
      }
    }, 2000);
    
    return () => clearInterval(timer);
  }, [serverLoad, activeInstances]);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-6 h-6" />
            System Monitor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Server Load */}
            <div>
              <div className="flex justify-between mb-2">
                <span>Server Load</span>
                <span>{serverLoad}%</span>
              </div>
              <Progress value={serverLoad} className="h-2" />
            </div>

            {/* Active Instances */}
            <div className="flex items-center gap-4">
              <Server className="w-5 h-5" />
              <span>Active Instances: {activeInstances}</span>
            </div>

            {/* Request Counter */}
            <div className="flex items-center gap-4">
              <AlertCircle className="w-5 h-5" />
              <span>Total Requests: {requestCount}</span>
            </div>

            {/* Load Generator */}
            <Button 
              onClick={simulateLoad}
              className="w-full"
            >
              Generate Load
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Instance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(activeInstances)].map((_, i) => (
          <Card key={i}>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <Server className="w-4 h-4" />
                <span>Instance {i + 1}</span>
                <span className="text-green-500">Active</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ScalableApp;