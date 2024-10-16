import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

// Custom Subtitle Plugin with colored circles
const subtitlePlugin = {
  id: 'customSubtitle',
  beforeDraw(chart) {
    const { ctx, chartArea: { top, width }, options } = chart;

    // Subtitle settings
    const subtitleText = options.plugins.customSubtitle.text;
    const colors = options.plugins.customSubtitle.colors;
    const fontSize = options.plugins.customSubtitle.fontSize || 14;

    // Circle and text position settings
    const startX = width / 2 - 100; // Adjust the starting X position
    const startY = top - 20; // Adjust the Y position relative to chart top
    const circleRadius = 8; // Radius for circles

    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = '#000'; // Subtitle color

    // Draw the subtitle text
    ctx.fillText(subtitleText, startX, startY + 10);

    // Draw the circles and labels for each dataset category
    colors.forEach((color, index) => {
      // Circle position
      const circleX = startX + 20 + (index * 60); // Adjust circle X position based on index
      const circleY = startY + 30;

      // Draw circle
      ctx.beginPath();
      ctx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);
      ctx.fillStyle = color; // Use the corresponding color
      ctx.fill();
      ctx.closePath();

      // Draw corresponding label text
      ctx.fillStyle = '#000'; // Label text color
      ctx.fillText(`Label ${index + 1}`, circleX + 15, circleY + 5); // Adjust label position
    });
  },
};

const CircleStats = ({ dataPoints }) => {
  const data = {
 
    labels: dataPoints.map((point) => point.label),
    datasets: [
      {

        data: dataPoints.map((point) => point.value),
        backgroundColor: dataPoints.map((point) => point.color),
        borderColor: '#fff',
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: 'Main Title',
        font: {
          size: 15,
        },
      },
      customSubtitle: {
        text: 'Statistics Summary', // Subtitle text
        colors: dataPoints.map((point) => point.color), // Colors for circles
        fontSize: 12, // Optional: change font size for subtitle
      },
    },
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Doughnut data={data} options={options}  height={100} width={100} />
    </div>
  );
};

export default CircleStats;