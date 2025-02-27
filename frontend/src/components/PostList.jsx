import React from 'react';
import PostListItem from './PostListItem';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearchParams } from 'react-router-dom';

const fetchPost = async (pageParam,searchParams) => {
    const searchParamsObj = Object.fromEntries([...searchParams])
    // console.log(searchParamsObj);
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/post`, {
        params: { page: pageParam, limit:10,...searchParamsObj},
    });
    return res.data;
};

export default function PostList() {
    const [searchParams, setSearchParams] = useSearchParams()
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ['post',searchParams.toString],
        queryFn: (pageParam = 1) => fetchPost(pageParam,searchParams),
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => {
          return lastPage.hasMore ? pages.length + 1 : undefined;
        },
    });

    // console.log(data);

    if (status === 'loading') return 'Loading...';
    if (status === 'error') return 'something went wrong';

    const allPosts = data?.pages?.flatMap((page) => page.posts) || [];

    return (
        <InfiniteScroll
            dataLength={allPosts.length} // Use allPosts.length
            next={fetchNextPage} // Use fetchNextPage
            hasMore={hasNextPage} // Use hasNextPage
            loader={<h4>Loading...</h4>}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
        >
            {allPosts.map((post) => (
                <PostListItem key={post._id} post={post} />
            ))}
        </InfiniteScroll>
    );
}