import { SortOrderType } from '@/types/productTable';
import { useState, useCallback } from 'react';
//types

export default function useTable() {
  const [orderBy, setOrderBy] = useState('');

  const [order, setOrder] = useState<SortOrderType>('desc');

  const [page, setPage] = useState(1);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      if (id !== '') {
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(id);
      }
    },
    [order, orderBy]
  );

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(1);
    setRowsPerPage(parseInt(event.target.value, 10));
  }, []);

  return {
    order,
    page,
    orderBy,
    rowsPerPage,
    //
    //
    onSort,
    onChangePage,
    onChangeRowsPerPage,
    //
    setPage,
    setOrder,
    setOrderBy,
    setRowsPerPage
  };
}
