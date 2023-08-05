import { getFiles } from '@/utils/api'
import React, { useEffect, useState } from 'react'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ImageOverlay from './ImageOverlay';
import { CircularProgress } from '@mui/material';
import { SortOrderType } from '@/types/productTable';
const ImageGallery = () => {
  const [sort, setSort] = useState<SortOrderType>('asc')
  const [openOverlay, setOpenOverlay] = useState({
    open: false,
    id: '',
    url: ''
  })
  const [images, setImages] = useState([])

  useEffect(() => {
    fetchFiles(sort)
  }, [sort])

  const fetchFiles = async (sortOrder: SortOrderType) => {
    const response = await getFiles(sortOrder)
    setImages(response.data)
  }

  const handleOpenOverlay = (imageData: any) => {
    setOpenOverlay({
      open: true,
      id: imageData.imageUUID,
      url: imageData.url
    })
  }
  const handleClose = () => {
    setOpenOverlay({
      open: false,
      id: '',
      url: ''
    })
  }

  return (
    <div className='px-4'>
      <div className='flex justify-end my-2'>
        <p className='cursor-pointer bg-blue-500 text-white rounded-lg py-2 px-4 flex items-center' onClick={() => setSort(prev => prev === 'asc' ? 'desc' : 'asc')}>
          Date
          {sort === 'asc' ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
        </p>
      </div>
      <div className='grid grid-cols-12 gap-4'>
        {
          images.length ? images.map((imageData: any, index) => {
            return <div className='col-span-3 border border-neutral-950  cursor-pointer rounded-lg' onClick={() => handleOpenOverlay(imageData)} key={imageData.imageUUID} >
              <img src={imageData.url} className=' object-contain w-full h-[400px]' alt={`image-${index}`} />
            </div>
          }) : <CircularProgress />
        }
      </div>
      {
        openOverlay.open && <ImageOverlay overlayProps={openOverlay} handleClose={handleClose} />
      }
    </div>
  )
}

export default ImageGallery