'use client'

import { useState, useEffect } from 'react';

const Home = () => {
  const [cpuUsage, setCpuUsage] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const response = await fetch('/api/cpu');
      const data = await response.json();
      console.log(data);  
      setCpuUsage(data.cpuUsage);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>CPU Usage: {cpuUsage}%</h1>
    </div>
  );
};

export default Home;