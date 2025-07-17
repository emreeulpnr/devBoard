import React from "react";

type Props = {
  percentage: number;
};

const ProgressBar: React.FC<Props> = ({ percentage }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div
        className="bg-blue-500 h-4 rounded-full transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;
