import React from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
const Breakcrumb = () => {
  const breadcrumbs = useBreadcrumbs();
  console.log(breadcrumbs);
  return <div className="text-sm">Breakcrumb</div>;
};

export default Breakcrumb;
