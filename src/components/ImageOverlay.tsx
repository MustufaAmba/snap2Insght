import { getProducts } from '@/utils/api';
import CloseIcon from '@mui/icons-material/Close';
import { Box, CircularProgress, IconButton, Modal, TextField } from '@mui/material'
import React, { FC, useEffect, useState, useMemo } from 'react'
import ProductContainer from './product/ProductContainer';
import { IProduct, IProductTableColumn, SortOrderType } from '@/types/productTable';
import ProductTable from './product/ProductTable';
import DoughnutChart from './DoughnutChart';
import BarChart from './BarChart';

const style = {
  position: 'absolute',
  top: '50%',
  display: 'block',
  left: '50%',
  width: '90%',
  height: '90vh',
  overflowY: 'scroll',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CONSTANT_WIDTH = 800;
const CONSTANT_HEIGHT = 700

interface IImageOverlayProps {
  overlayProps: {
    open: boolean,
    id: string,
    url: string
  },
  handleClose: () => void
}
const ImageOverlay: FC<IImageOverlayProps> = ({ overlayProps, handleClose }) => {
  const [originalHeight, setOriginalHeight] = useState(0)
  const [originalWidth, setOriginalWidth] = useState(0)
  const [currentFilter, setCurrentFilter] = useState('')
  const { scaleDownWidth, scaleDownHeight } = useMemo(() => {
    return {
      scaleDownWidth: CONSTANT_WIDTH / originalWidth,
      scaleDownHeight: CONSTANT_HEIGHT / originalHeight
    }
  }, [originalWidth, originalHeight])

  const [products, setProducts] = useState<IProduct[] | []>([])
  const [groupedData, setGroupedData] = useState<IProduct[] | []>([])
  useEffect(() => {
    const image = new Image()
    image.src = overlayProps.url
    image.onload = () => {
      setOriginalHeight(image.height);
      setOriginalWidth(image.width)
    };
    fetchAndProcessData(overlayProps.id, currentFilter)
  }, [])
  useEffect(() => {
    if (currentFilter.length) {
      const getData = setTimeout(() => {
        fetchAndProcessData(overlayProps.id, currentFilter)
      }, 1000)
      return () => clearTimeout(getData)
    }
  }, [currentFilter])

  const fetchAndProcessData = async (imageUUID: string, query: string, order: SortOrderType = 'desc', orderBy = 'productName') => {
    try {
      const response = await getProducts(imageUUID, query, order, orderBy)
      if (response?.data) {
        const productMap = new Map()
        setProducts(response.data)
        response.data.forEach((product: any) => {
          const { upc } = product
          if (productMap.has(upc)) {
            const prevProducts = productMap.get(upc)
            productMap.set(upc, [...prevProducts, product])
          }
          else {
            productMap.set(upc, [product])
          }
        })
        const keys = [...productMap.keys()]
        const orderedData: any = []
        keys.forEach((key) => {
          const value = productMap.get(key)
          const { upc, shelfLevel, brandName, productName, imageUUID } = value[0]
          orderedData.push({ upc, shelfLevel, brandName, productName, imageUUID, noOfFacings: value.length })
        })
        setGroupedData(orderedData)
      }
    }
    catch (error) {
      console.log({ error })
    }
  }

  const tableHeadSource: IProductTableColumn[] = [
    {
      id: 'upc',
      align: 'left',
      isSortable: true,
      label: 'UPC'
    },
    {
      id: 'productName',
      align: 'left',
      isSortable: true,
      label: 'Product Short Name'
    },
    {
      id: 'noOfFacings',
      align: 'left',
      isSortable: false,
      label: 'No of Facings'
    },
    {
      id: 'brandName',
      align: 'left',
      isSortable: true,
      label: 'Brand Name'
    },
    {
      id: 'shelfLevel',
      align: 'left',
      isSortable: true,
      label: 'Shelf level'
    },
  ];

  const handleTableAction = async (order: SortOrderType = 'desc', orderBy = 'productName') => {
    console.log({ orderBy, order })
    await fetchAndProcessData(overlayProps.id, currentFilter, order, orderBy)
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
          <IconButton className=' bg-black !fixed top-5 !right-7 hover:bg-black rounded-full text-white' onClick={handleClose}><CloseIcon /></IconButton>
          <div className='relative' style={{ width: `${CONSTANT_WIDTH}px` }}>
            <img src={overlayProps.url} alt='overlay-image' style={{ width: `${CONSTANT_WIDTH}px`, height: `${CONSTANT_HEIGHT}px` }} />
            {
              products.length ? products.map((product, index) => {
                return <ProductContainer product={product} scaleDownHeight={scaleDownHeight} scaleDownWidth={scaleDownWidth} key={`${product.upc}-${index}`} />
              }) : <CircularProgress />
            }
          </div>
          <div className="w-1/2 px-4">
            <TextField variant='filled' placeholder='Filter Products' className='w-full' value={currentFilter} onChange={(e) => setCurrentFilter(e.target.value)} />
            <ProductTable tableDataSource={groupedData} onTableAction={handleTableAction} tableColumnSource={tableHeadSource} loading={!products.length} />
          </div>
        </div>
        <div className='grid grid-cols-12 my-10'>
          <div className="col-span-6">
            <DoughnutChart products={products} />
          </div>
          <div className="col-span-6">
            <BarChart products={products} />
          </div>
        </div>
      </Box>
    </Modal>
  )
}

export default ImageOverlay