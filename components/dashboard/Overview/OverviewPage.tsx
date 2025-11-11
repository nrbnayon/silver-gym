// components/dashboard/Overview/OverviewPage.tsx
import { statsData } from "@/data/statsData";
import {
  pieChartData,
  barChartYearlyData,
  barChartMonthlyData,
  lineChartData,
} from "@/data/chartData";
import StatsCard from "../Common/StatsCard";
import PieChartCard from "../Common/PieChartCard";
import BarChartCard from "../Common/BarChartCard";
import LineChartCard from "../Common/LineChartCard";
import TransactionTable from "../Common/TransactionTable";
import { transactionData } from "@/data/transactionData";

export default function OverviewPage() {
  // Generate current month and year dynamically
  const now = new Date();
  const month = now.toLocaleString("default", { month: "long" });
  const year = now.getFullYear();
  const currentMonthYear = `${month} ${year}`;

  return (
    <main className="w-full space-y-6">
      {/* Stats Card */}

      {/* Grid Layout for Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Bar Chart - Progress Analytics */}
        <div className="col-span-1 md:col-span-2 space-y-5">
          <StatsCard
            title="Monthly Transaction"
            date={currentMonthYear}
            stats={statsData}
          />
          <BarChartCard
            title="Progress Analytics"
            yearlyData={barChartYearlyData}
            monthlyData={barChartMonthlyData}
            totalValue="$79,556.65"
            subtitle="You achieved a 79% increase in revenue over the previous year"
            showToggle={true}
          />
        </div>

        {/* Pie Chart and Line Chart Container */}
        <div className="space-y-4 border-4 border-[#F9F9F9]  rounded-[20px] p-3 bg-white">
          {/* Pie Chart - This Month */}
          <PieChartCard
            title="This Month"
            data={pieChartData}
            centerValue="25K"
            description="Your expenses are only 22% of your income"
          />

          {/* Line Chart - Analytics */}
          <LineChartCard
            title="Analytics"
            data={lineChartData}
            percentage="22%"
          />
        </div>
      </div>
      <TransactionTable title="Today Transaction" data={transactionData} />
    </main>
  );
}
