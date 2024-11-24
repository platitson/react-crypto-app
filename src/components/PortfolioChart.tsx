import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useCrypto } from "../context/cryptoContext";
import { capitalize } from "../utils";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PortfolioChart() {
  const { assets } = useCrypto();

  const data = {
    labels: assets.map((a) => capitalize(a.id)),
    datasets: [
      {
        label: "$",
        data: assets.map((a) => a.totalAmount),
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 206, 86)",
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
          "rgb(255, 159, 64)",
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div
      style={{
        display: "flex",
        marginBottom: "1rem",
        justifyContent: "center",
        height: "400px",
      }}
    >
      <Pie data={data} />
    </div>
  );
}
