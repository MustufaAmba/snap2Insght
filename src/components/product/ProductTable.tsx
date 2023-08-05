import React, { FC, useEffect } from 'react';
// @mui
import { Table, TableBody, TableContainer, Box, TableRow, TableCell, TablePagination, CircularProgress } from '@mui/material';
// components
import ProductTableCustomHead from './ProductTableCustomHead';
//hooks
import useTable from '@/hooks/useTable';
import { IProductTableProps } from '@/types/productTable';
import { useProduct } from '@/hooks/useProduct';
import { IProduct } from '../../types/productTable';
//types

const ProductTable: FC<IProductTableProps> = ({
    tableDataSource,
    tableColumnSource,
    onTableAction,
    loading,
    totalRows,
    isPagination = true,
}) => {
    const { order, orderBy, onSort, page, rowsPerPage, onChangeRowsPerPage, onChangePage } =
        useTable();
    const { setCurrentProduct } = useProduct()
    useEffect(() => {
        onTableAction(page, order, orderBy, rowsPerPage);
    }, [page, order, orderBy, rowsPerPage]);

    const handleRowClick = (product: IProduct) => {
        setCurrentProduct(product)
    }

    return (
        <Box>
            <TableContainer>
                <Table>
                    <ProductTableCustomHead
                        order={order}
                        orderBy={orderBy}
                        headLabel={tableColumnSource}
                        rowCount={tableDataSource?.length}
                        onSort={(key) => onSort(key)}
                    />
                    <TableBody>
                        {(loading ? <CircularProgress /> : tableDataSource.map((product,rowIndex) => {
                            return <TableRow onClick={() => handleRowClick(product)} className='cursor-pointer' key={`${product.upc}-${rowIndex}`}>
                                {
                                    tableColumnSource.map(({ id }) => {
                                        return <TableCell key={id}>
                                            {product[id as keyof typeof product]}
                                        </TableCell>
                                    })
                                }
                            </TableRow>
                        })
                        )}
                    </TableBody>
                </Table>
                {isPagination ? (
                
                        <TablePagination
                            className='w-full flex justify-end'
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            count={totalRows}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={onChangePage}
                            onRowsPerPageChange={onChangeRowsPerPage}
                        />

                    //   <TablePaginationCustom
                    //     count={totalRows}
                    //     page={page}
                    //     isPagination={isPagination}
                    //     isLoadMore={isLoadMore}
                    //     totalRowsInTable={tableDataSource.length}
                    //     rowsPerPage={rowsPerPage}
                    //     onPageChange={onChangePage}
                    //     onRowsPerPageChange={onChangeRowsPerPage}
                    //   />
                ) : null}
            </TableContainer>
        </Box>
    );
};
;
export default ProductTable;
