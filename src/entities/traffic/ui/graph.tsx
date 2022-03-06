import { XAxis, YAxis, ResponsiveContainer, LineChart, Line } from "recharts";
import { Traffic } from "shared/api";

interface Props {
  data: Traffic[];
}

const kbToMb = (kbit: number) => kbit / 1024;

export const TrafficGraph = ({ data }: Props) => {
  const renderData = data.map((el, idx) => ({
    date: `${idx}`,
    out: kbToMb(el.out),
    in: kbToMb(el.in),
  }));
  return (
    <ResponsiveContainer minWidth="100%" minHeight="280px" height={"100%"}>
      <LineChart data={renderData.filter((_, idx) => idx % 5 === 0)}>
        <XAxis dataKey="date" />
        <YAxis />
        <Line type="monotone" dataKey="out" stroke="#8884d8" dot={false} />
        <Line type="monotone" dataKey="in" stroke="#82ca9d" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};
