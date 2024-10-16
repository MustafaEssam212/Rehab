import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const IncomeOutgoingChart = ({ income, outgoing, month }) => {


    
  const data = {
    labels: [`شهر ${month}`], // Label for the x-axis
    datasets: [
      {
        label: 'العائد',
        data: [income], // Data for income
        backgroundColor: '#309C53',
        barThickness: 100,
      },
      {
        label: 'الصادر',
        data: [outgoing], // Data for outgoing
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        barThickness: 100,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
        labels: {
            font: {
              size: 16, // Font size for legend
            },
          },
      },
      title: {
        display: false,
        text: 'العائد والصادر',
        font: {
            size: 20,
          },
      },
    },
    scales: {
      y: {
        stacked: false,
        ticks: {
            font: {
              size: 14, // Font size for y-axis labels
            },
          },
      },
      x: {
        stacked: false,
        ticks: {
            font: {
              size: 18, // Font size for x-axis labels
            },
          },
      },
    },
  };

  return(
    <div style={{width: '100%', height: '100%', position: 'relative'}}>
        <Bar data={data} options={options} height={100} width={100} />
    </div>
  )
};

export default IncomeOutgoingChart;