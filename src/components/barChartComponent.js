import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import formatDate from "@/utils/dateFormater";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
export const options = {
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Bar Chart - Stacked',
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};
const BarChartComponent = ({ dataGenerator }) => {

  function generateOneWeek() {
    const today = new Date();
    const week = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      week.push(formatDate(date.toISOString()));
    }
    return week.reverse();
  }

  const chartData = {
    labels: generateOneWeek(),
    datasets: dataGenerator
  };

  console.log((chartData));

  return <Bar options={options} data={chartData} />;
};

export default BarChartComponent;
