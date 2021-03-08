import  { useEffect, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAll, filterPost, setCurrentPage, setTotalPosts } from './PostsSlice';
import PostItem from './PostItem';
import Search from '../Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paginate from '../Pagination';

const Posts = () => {
    const dispatch = useDispatch();
    const { filteredResults, data, status, postsPerPage, currentPage, totalPosts } = useSelector(state => state.PostsSlice);

    const [search, setSearch] = useState('');

    const paginate = (pageNum) => {
        dispatch(setCurrentPage(pageNum))
    };

    useEffect(() => {
        dispatch(fetchAll());
        dispatch(setTotalPosts(filteredResults.length));
    }, []);

    useEffect(() => {
        let newResult = [...data];

        newResult = newResult.filter(post => {
            if(search == ""){
                return post;
            }else if(post.title.toLowerCase().includes(search.toLocaleLowerCase())){
                return post;
            }
        });

        dispatch(filterPost(newResult));
        dispatch(setTotalPosts(newResult.length));
    }, [search, currentPage]);

    const onSearch = (val) => {
        setSearch(val);
    }
    
    if(status == "loading") return <CircularProgress />;

    return (
        <>
            <Search 
                search={search}
                onSearch={onSearch} />
            { filteredResults.map(post => <PostItem key={post._id} {...post} /> ) }
            <Paginate 
                currentPage={currentPage} 
                postsPerPage={postsPerPage} 
                totalPosts={totalPosts}
                paginateItem={paginate}
            />
        </>
    );
};

export default Posts;