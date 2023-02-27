import React from "react";
import Image from "next/image";

type PropType = {
  Path: string;
};

const Avatar = ({ Path }: PropType) => {
  return (
    <Image
      src={Path}
      height={40}
      width={40}
      className="rounded-full mr-1"
      alt={""}
    />
  );
};

export default Avatar;
