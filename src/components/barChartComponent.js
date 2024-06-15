import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChartComponent = ({ data }) => {
  const chartData = {
    labels: ['5th Mar', '6th Mar', '7th Mar', '8th Mar', '9th Mar', 'Yesterday', 'Today'],
    datasets: [
      {
        label: 'Essentials',
        data: data.essentials,
        backgroundColor: '#4caf50',
      },
      {
        label: 'Non-Essentials',
        data: data.nonEssentials,
        backgroundColor: '#ffeb3b',
      },
      {
        label: 'Miscellaneous',
        data: data.miscellaneous,
        backgroundColor: '#9e9e9e',
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default BarChartComponent;