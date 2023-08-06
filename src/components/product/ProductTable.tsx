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
}) => {
    const { order, orderBy, onSort} =
        useTable();
    const { setCurrentProduct } = useProduct()
    useEffect(() => {
        onTableAction( order, orderBy );
    }, [ order, orderBy]);

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
                        {(loading ? <CircularProgress /> : tableDataSource.map((product, rowIndex) => {
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
            </TableContainer>
        </Box>
    );
};
;
export default ProductTable;
