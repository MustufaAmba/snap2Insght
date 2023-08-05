import { Dispatch, SetStateAction } from "react";

export interface IProductTableHeadProps  {
    order?: SortOrderType;
    orderBy?: string;
    headLabel: IProductTableColumn[];
    rowCount?: number;
    onSort?: (id: string) => void;
  };
export type SortOrderType = 'asc' | 'desc';
export interface IProductTableColumn  {
    id: string;
    label: string;
    align: 'left' | 'center' | 'right' | 'justify' | 'inherit' | undefined;
    isSortable?: boolean;
  };
  export interface IProductTableProps  {
    tableDataSource:IProduct[]|[];
    tableColumnSource: IProductTableColumn[];
    onTableAction: (page: number, order: SortOrderType, orderBy: string, pageSize: number) => void;
    loading: boolean;
    totalRows: number;
    isPagination?: boolean;
  };
  export interface IProduct {
    imageUUID:string,
    upc: string,
    x: string,
    y:string,
    width:string,
    height:string,
    brandName:string, 
    shelfLevel:string,
    productName:string
  }

  export interface IProductContextInitialState {
    currentProduct:null|IProduct,
    setCurrentProduct:Dispatch<SetStateAction<IProduct|null>>
  }

  export type IProductContextValueProps = IProductContextInitialState