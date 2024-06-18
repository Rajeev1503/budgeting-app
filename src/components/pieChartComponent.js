import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent = ({ data }) => {
  const chartData = {
    datasets: [
      {
        data: data,
        backgroundColor: ['#4caf50', '#ffeb3b', '#9e9e9e'],
        hoverBackgroundColor: ['#66bb6a', '#ffee58', '#bdbdbd'],
      },
    ],
  };

  return (
  <div className='flex flex-row gap-4'>
    <div className='w-[300px]'><Doughnut data={chartData} /></div>
    <div>ghfdkjghk</div>
    </div>
  )
};

export default PieChartComponent;