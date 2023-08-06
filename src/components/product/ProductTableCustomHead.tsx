import { FC } from 'react';

// @mui
import { Box, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';
//types
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { IProductTableHeadProps } from '@/types/productTable';
const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)'
} as const;

const ProductTableCustomHead
  : FC<IProductTableHeadProps> = ({ order, orderBy, headLabel, onSort }) => {
    return (
      <TableHead>
        <TableRow>
          {headLabel.map((headCell, index) =>

          (
            <TableCell
              key={`${headCell.id}${index}`}
              align={headCell.align || 'left'}

              sortDirection={orderBy === headCell.id ? order : false}>
              {onSort && headCell.isSortable ? (
                <TableSortLabel
                  hideSortIcon
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={() => onSort(headCell.id)}
                  IconComponent={ArrowDropDownIcon}
                  className='font-semibold'
                  sx={{
                    textTransform: 'capitalize',
                    '.MuiTableSortLabel-icon': {
                      marginLeft: 0
                    }
                  }}>
                  {headCell.label}

                  {orderBy === headCell.id ? (
                    <Box sx={{ ...visuallyHidden }}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              ) : (
                <p className='font-semibold'>      {headCell.label}</p>

              )}
            </TableCell>
          )
          )}
        </TableRow>
      </TableHead>
    );
  };
export default ProductTableCustomHead
  ;
