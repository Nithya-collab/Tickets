"use client";
import ReactFrappeChart from "react-frappe-charts";

interface RFChartProps {
  type: any;
  // type: ChartType | undefined,
//   chartClasses: string;
//   labels: Array<string>;
  colors?: Array<string>;
  height?: number;
  data: any;
  // data: ChartData
}

const RFChart: React.FC<RFChartProps> = (RFChartProps) => {
  return (
    <div className="p-2 m-2">
      <ReactFrappeChart
        type={RFChartProps.type}
        // className={RFChartProps.chartClasses}
        // labels={RFChartProps.labels}
        height={80}
        colors={RFChartProps.colors}
        data={RFChartProps.data}
      />
    </div>
  );
};

export default RFChart;
