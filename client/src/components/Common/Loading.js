import React, { memo } from "react";
import { ClipLoader } from "react-spinners";
const Loading = () => {
	return <ClipLoader color="#79AC78" />;
};

export default memo(Loading);
