import { apiGetBlogs } from "apis";
import BlogItem from "components/Blog/BlogItem";
import withBaseComponent from "hocs/withBaseComponent";
import React, { memo, useEffect, useState } from "react";

const InfoNews = ({ navigate }) => {
	const [blogsData, setBlogsData] = useState(null);
	const fetchBlogs = async () => {
		const response = await apiGetBlogs({ limit: 3 });
		if (response.success) {
			setBlogsData(response.blogs);
		}
	};
	useEffect(() => {
		fetchBlogs();
	}, []);
	return (
		<>
			<h2 className="py-[15px] text-xl font-[#151515] uppercase font-semibold border-b-2 border-main">
				TIN TỨC MỚI NHẤT
			</h2>
			<div className="flex flex-wrap gap-2 flex-5 max-h-[400px] justify-evenly mt-8">
				{blogsData?.map((blog, index) => (
					<BlogItem
						key={index}
						title={blog.title}
						description={blog.description}
						image={blog.image}
						views={blog.numberViews}
						time={blog.createdAt}
						handleOnClick={() => {
							navigate(`/blogs/${blog?._id}/${blog?.title}`);
						}}
					/>
				))}
			</div>
		</>
	);
};

export default withBaseComponent(memo(InfoNews));
