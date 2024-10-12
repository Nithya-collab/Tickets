import os from 'os';
const si = require('systeminformation');

// promises style - new since version 3

export const dynamic = 'force-dynamic'

export async function GET() {
  let cpuLoad;
  await si.currentLoad()
    .then(data => cpuLoad = Math.floor(data.currentLoad))
    .catch(error => console.error(error));
  const cpus = os.cpus();
  const totalIdle = cpus.reduce((acc, cpu) => acc + cpu.times.idle, 0);
  const totalTick = cpus.reduce((acc, cpu) => acc + cpu.times.user + cpu.times.nice + cpu.times.sys + cpu.times.idle + cpu.times.irq, 0);
  
  const cpuPercentage = 100 - Math.floor((totalIdle / totalTick) * 100);
  console.log(cpuPercentage);

  return Response.json({ cpuUsage: cpuLoad });
};