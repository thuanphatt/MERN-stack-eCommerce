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
				<div className="md:w-main w-full md:px-0 px-4">
					<h3 className="uppercase font-semibold mb-1"> Tin tức</h3>
					<Breakcrumb category="Tin tức" />
				</div>
			</div>

			<div className="md:w-main w-full mx-auto flex md:flex-row flex-col md:items-center gap-2 my-6 md:px-0 px-4">
				{Array.from(new Set(blogsData?.map((blog) => blog.category)))?.map((category, index) => (
					<span key={index} className="border-r pr-4 font-semibold">
						{category}
					</span>
				))}
			</div>
			<div className="flex justify-between md:w-main w-full mx-auto gap-4 md:px-0 px-4">
				<div className="grid md:grid-cols-3 grid-cols-1 w-main flex-3 gap-4">
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
								window.scrollTo({
									top: 0,
									behavior: "smooth",
								});
							}}
						/>
					))}
				</div>
				<div className="flex-1 flex-col gap-2 md:flex hidden">
					<h2 className="text-2xl font-semibold border-b border-main mb-2">Tin tức mới nhất</h2>
					{blogNews?.map((blog, index) => (
						<div
							className="flex flex-col bg-white shadow-lg rounded-md overflow-hidden p-4 cursor-pointer"
							key={index}
							onClick={() => {
								navigate(`/blogs/${blog?._id}/${blog?.title}`);
								window.scrollTo({
									top: 0,
									behavior: "smooth",
								});
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
				<div className="md:w-main w-full m-auto my-4 flex justify-end md:px-0 px-4">
					<Pagination totalCount={counts} />
				</div>
			)}
		</div>
	);
};

export default withBaseComponent(memo(Blogs));
