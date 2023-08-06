import { SortOrderType } from '@/types/productTable';
import { useState, useCallback } from 'react';
//types

export default function useTable() {
  const [orderBy, setOrderBy] = useState('');

  const [order, setOrder] = useState<SortOrderType>('desc');


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


  return {
    order,
    orderBy,
    //
    onSort,
    //
    setOrder,
    setOrderBy,
  };
}
