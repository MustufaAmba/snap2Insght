import { getProducts } from '@/utils/api';
import CloseIcon from '@mui/icons-material/Close';
import { Box, CircularProgress, IconButton, Modal } from '@mui/material'
import React, { FC, useEffect, useState, useMemo } from 'react'
import ProductContainer from './product/ProductContainer';
import { IProduct, IProductTableColumn, SortOrderType } from '@/types/productTable';
import ProductTable from './product/ProductTable';
import { useProduct } from '@/hooks/useProduct';

const style = {
  position: 'absolute',
  top: '50%',
  display:'block',
  left: '50%',
  width:'90%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CONSTANT_WIDTH = 800;
const CONSTANT_HEIGHT = 700

const ImageOverlay: FC<any> = ({ overlayProps, handleClose }) => {
  const [originalHeight,setOriginalHeight]=useState(0)
  const [originalWidth,setOriginalWidth]=useState(0)
   const {currentProduct} = useProduct()
  const { scaleDownWidth, scaleDownHeight } = useMemo(() => {
    return {
      scaleDownWidth: CONSTANT_WIDTH/originalWidth,
      scaleDownHeight: CONSTANT_HEIGHT/originalHeight
    }
  }, [originalWidth, originalHeight])

  const [products, setProducts] = useState<IProduct[]|[]>([])
  const [paginatedProducts,setPaginatedProducts]=useState<IProduct[]|[]>([])
  useEffect(() => {
    const image = new Image()
    image.src = overlayProps.url
    image.onload = ()=> {
        setOriginalHeight(image.height);
        setOriginalWidth(image.width)
    };
    (async () => {
      const response = await getProducts(overlayProps.id)
      if(response?.data)
      {
        setProducts(response.data)
        setPaginatedProducts(response.data.slice(0,5))
      }
    })()
  }, [])

  const tableHeadSource: IProductTableColumn[] = [
    {
      id: 'upc',
      align: 'left',
      isSortable: true,
      label:'UPC'
    },
    {
      id: 'productName',
      align: 'left',
      isSortable: true,
      label:'Product Short Name'
    },
    {
      id: 'noOfFacings',
      align: 'left',
      isSortable: true,
      label:'No of Facings'
    },
    {
      id: 'brandName',
      align: 'left',
      isSortable: true,
      label:'Brand Name'
    },
    {
      id: 'shelfLevel',
      align: 'left',
      isSortable: true,
      label:'Shelf level'
    },
  ];
  const handleTableAction = (page = 1, order: SortOrderType = 'desc', orderBy = 'AppointmentFrom', pageSize = 5)=>{
    console.log({page, order, orderBy, pageSize});
    // setPaginatedProducts(products.slice(page*10,pageSize*page))
  }

  return (
    <Modal
      open={overlayProps.open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className='flex gap-8'>
        <div className='relative' style={{width:`${CONSTANT_WIDTH}px`}}>
          <IconButton className=' bg-black !fixed top-5 !right-7 hover:bg-black rounded-full text-white' onClick={handleClose}><CloseIcon /></IconButton>
          <img src={overlayProps.url} alt='overlay-image' style={{width:`${CONSTANT_WIDTH}px`,height:`${CONSTANT_HEIGHT}px`}} />
          {
            products.length ? products.map((product: any,index) => {
              return <ProductContainer product={product} scaleDownHeight={scaleDownHeight} scaleDownWidth={scaleDownWidth} key={`${product.upc}-${index}`}/>
            }) : <CircularProgress/>
          }
        </div>
        <div className="w-1/2">
        <ProductTable tableDataSource={paginatedProducts}onTableAction={handleTableAction} isPagination   tableColumnSource={tableHeadSource}loading={!products.length} totalRows={products.length}  />
        </div>

        </div>
     
      </Box>
    </Modal>
  )
}

export default ImageOverlay
// w-[${width}px] h-[${height}px] top-[${y}px] left-[${x}px]
// for 1000px height and width
// width = 30.64
// height = 40.85