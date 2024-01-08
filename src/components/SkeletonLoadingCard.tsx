import React from "react";

const SkeletonLoadingCard = () => {
  return (
    <div className="flex flex-col gap-4 w-52">
      <div className="skeleton h-72 w-full rounded-lg"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-28"></div>
    </div>
  );
};

export default SkeletonLoadingCard;
