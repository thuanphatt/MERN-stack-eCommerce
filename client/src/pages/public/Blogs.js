import { apiGetBlogs } from "apis";
import { Breakcrumb, Pagination } from "components";
import BlogItem from "components/Blog/BlogItem";
import withBaseComponent from "hocs/withBaseComponent";
import React, { memo, useEffect, useState } from "react";

const Blogs = ({ navigate }) => {
	const [blogsData, setBlogsData] = useState(null);
	const [blogNews, setBlogNews] = useState(null);
	const [counts, setCounts] = useState(null);
	const fetchBlogs = async () => {
		const response = await apiGetBlogs();
		if (response.success) {
			setBlogsData(response.blogs);
			setCounts(response.counts);
		}
	};
	const fetchBlogNews = async () => {
		const response = await apiGetBlogs({ sort: "-createdAt", limit: 3 });
		if (response.success) {
			setBlogNews(response.blogs);
		}
	};

	useEffect(() => {
		fetchBlogs();
		fetchBlogNews();
	}, []);
	return (
		<div className="w-full">
			<div className="w-full">
				<img
					src="https://globalcheck.com.vn/apt-upload/image/cache/data/banner/2021/2021-06/tin-tuc-optimized-2025x950resize_and_crop.jpg"
					alt="thumb"
					className="w-full object-contain"
				/>
			</div>
			<div className="h-[81px] bg-gray-100 flex justify-center items-center">
				<div className="w-main">
					<h3 className="uppercase font-semibold mb-1"> {blogsData?.title}</h3>
					<Breakcrumb title={blogsData?.title} category={blogsData?.category} />
				</div>
			</div>
			<div className="flex justify-between w-main mx-auto mt-4">
				<div className="flex flex-wrap gap-2 flex-5 max-h-[400px] justify-evenly">
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
				<div className="flex-1 flex flex-col gap-2 mt-2">
					<h2 className="text-2xl font-semibold border-b border-main mb-2">Tin tức mới nhất</h2>
					{blogNews?.map((blog, index) => (
						<div
							className="flex flex-col bg-white shadow-lg rounded-md overflow-hidden p-4 cursor-pointer"
							key={index}
							onClick={() => {
								navigate(`/blogs/${blog?._id}/${blog?.title}`);
							}}
						>
							<img src={blog.image} alt={blog.title} className="w-full h-40 object-cover object-center" />
							<h3 className="text-sm font-semibold mb-2 w-full">{blog.title}</h3>
						</div>
					))}
				</div>
			</div>
			<div className="w-full h-[50px]"></div>
			{blogsData && (
				<div className="w-main m-auto my-4 flex justify-end">
					<Pagination totalCount={counts} />
				</div>
			)}
		</div>
	);
};

export default withBaseComponent(memo(Blogs));
