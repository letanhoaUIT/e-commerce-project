import { Line } from 'react-chartjs-2';

const LineChart = ({ title, data }) => {
    return (
        <div className="p-5 bg-white shadow-lg rounded-lg mb-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
            <Line
                data={data}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                }}
            />
        </div>
    );
};

export default LineChart;
