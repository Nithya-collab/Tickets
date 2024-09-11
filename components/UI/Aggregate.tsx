"use client"
import { AreaChart, Area, Tooltip, XAxis } from "recharts";

// import RFChart from "../Chart/RFChart";

interface AggregateProps {
  heading: string;
  sub: string;
  aggregate: string;
}

const Aggregate: React.FC<AggregateProps> = (AggregateProps) => {
  return (
    <>
      <div className="mx-auto w-80 sm:w-60 border-2 shadow-lg bg-amber-50 dark:text-black">
        <div className="p-3">
            <h1 className="text-2xl">{AggregateProps.heading}</h1>
            <small>{AggregateProps.sub}</small>
            <p className="text-4xl float-right">{AggregateProps.aggregate}</p>
        </div>
        {/* <RFChart
        //   labels={['Total', 'sold', 'available']}
          data={{ labels: ['Total', 'sold', 'available', 'ef', 'fg'], datasets: [{values: [70, 40, 30, 30, 18, 12]}] }}
          colors={['red']}
          type="line"
        //   chartClasses="w-72"
        /> */}
        <AreaChart width={240} height={80} data={[{name: 'Week 1', perf: 40}, {name: 'Week 2', perf: 60}, {name: 'Week 3', perf: 20}, {name: 'Week 4', perf: 80}]}>
            <Area type="monotone" dataKey="perf" stroke="#8884d8" />
            <Tooltip />
            <XAxis height={0} dataKey="name"/>
        </AreaChart>
      </div>
    </>
  );
};

export default Aggregate;
