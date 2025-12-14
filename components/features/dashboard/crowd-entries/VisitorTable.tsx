import React from "react";
// import Image from "next/image";

// Types
interface Visitor {
  id: number;
  name: string;
  avatar: string;
  sex: "Male" | "Female";
  entry: string;
  exit?: string;
  dwell?: string;
}

// Dummy data (replace with API data if needed)
const visitors: Visitor[] = [
  {
    id: 1,
    name: "Alice Johnson",
    avatar: "https://i.pravatar.cc/40?img=1",
    sex: "Female",
    entry: "11:05 AM",
  },
  {
    id: 2,
    name: "Brian Smith",
    avatar: "https://i.pravatar.cc/40?img=2",
    sex: "Male",
    entry: "11:03 AM",
  },
  {
    id: 3,
    name: "Catherine Lee",
    avatar: "https://i.pravatar.cc/40?img=3",
    sex: "Female",
    entry: "11:00 AM",
  },
  {
    id: 4,
    name: "David Brown",
    avatar: "https://i.pravatar.cc/40?img=4",
    sex: "Male",
    entry: "10:50 AM",
    exit: "11:10 AM",
    dwell: "00:20",
  },
  {
    id: 5,
    name: "Eva White",
    avatar: "https://i.pravatar.cc/40?img=5",
    sex: "Female",
    entry: "11:20 AM",
    exit: "11:30 AM",
    dwell: "00:10",
  },
  {
    id: 6,
    name: "Frank Green",
    avatar: "https://i.pravatar.cc/40?img=6",
    sex: "Male",
    entry: "11:50 AM",
    exit: "12:10 PM",
    dwell: "00:20",
  },
];

const VisitorTable: React.FC = () => {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-gray-100 text-left text-gray-600">
          <tr>
            <th className="px-6 py-4 font-medium">Name</th>
            <th className="px-6 py-4 font-medium">Sex</th>
            <th className="px-6 py-4 font-medium">Entry</th>
            <th className="px-6 py-4 font-medium">Exit</th>
            <th className="px-6 py-4 font-medium">Dwell Time</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {visitors.map((v) => (
            <tr key={v.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  {/* <Image
                    src={v.avatar}
                    alt={v.name}
                    className="h-9 w-9 rounded-full object-cover"
                  /> */}
                  <span className="font-medium text-gray-800">{v.name}</span>
                </div>
              </td>

              <td className="px-6 py-4 text-gray-600">{v.sex}</td>
              <td className="px-6 py-4 text-gray-600">{v.entry}</td>
              <td className="px-6 py-4 text-gray-600">{v.exit ?? "--"}</td>
              <td className="px-6 py-4 text-gray-600">{v.dwell ?? "--"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 py-4">
        <button className="px-2 text-gray-500 hover:text-black">‹</button>
        <button className="rounded border px-3 py-1 text-sm">1</button>
        <button className="px-3 py-1 text-sm text-gray-600">2</button>
        <button className="px-3 py-1 text-sm text-gray-600">3</button>
        <span className="px-2">…</span>
        <button className="px-3 py-1 text-sm text-gray-600">5</button>
        <button className="px-2 text-gray-500 hover:text-black">›</button>
      </div>
    </div>
  );
};

export default VisitorTable;

