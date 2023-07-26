import React from "react";
import Image from "next/image";
import { Badge } from "@mui/material";
import styled from "@emotion/styled";

type PropType = {
  Path: string;
  Status?: boolean;
};

const CustomBadge = styled(Badge)(({}) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#2ecc71",
    color: "#2ecc71",
  },
}));

const Avatar = ({ Path, Status }: PropType) => {
  return Status ? (
    <CustomBadge overlap="circular" badgeContent=" " variant="dot">
      <Image
        src={Path}
        height={40}
        width={40}
        className="rounded-full mr-1"
        alt={""}
      />
    </CustomBadge>
  ) : (
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
