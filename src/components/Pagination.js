import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';

const Paginate = ({ postsPerPage, totalPosts, currentPage, paginateItem, nextPage, prevPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    const totalNumberOfPages = Math.ceil(totalPosts/postsPerPage);

    return (
        <div>
            <Pagination 
                count={totalNumberOfPages} 
                page={currentPage} 
                renderItem={(pageNumbers) => {
                    // {{pageNumbers.map(num => (
                    //     <PaginationItem key={num} onClick={() => paginate(num)}>{num}</PaginationItem>
                    // ))} }
                    console.log(pageNumbers, "pageNumbers")
                    return (
                        <PaginationItem {...pageNumbers} onClick={() => paginateItem(pageNumbers.page)}/>
                    )
                }} />
        </div>
    )
}

export default Paginate