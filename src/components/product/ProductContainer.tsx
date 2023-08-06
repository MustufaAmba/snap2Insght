import { useProduct } from '@/hooks/useProduct'
import { Tooltip } from '@mui/material'
import React, { FC } from 'react'

const ProductContainer: FC<any> = ({ product, scaleDownHeight, scaleDownWidth }) => {
    const { x, y, width, height, productName, upc } = product
    const { currentProduct } = useProduct()
    return (
        <Tooltip title={productName} arrow slotProps={{ arrow: { style: { color: '#000' } }, tooltip: { style: { background: '#000' } } }}>
            <div style={{ width: `${width * scaleDownWidth}px`, height: `${height * scaleDownHeight}px`, top: `${y * scaleDownHeight}px`, left: `${x * scaleDownWidth}px`,borderColor:`${currentProduct && currentProduct.upc === upc ? '#eab308d9' : '#1d4ed8'}` }} className='border-4 absolute z-10'>
            </div>
        </Tooltip>

    )
}

export default ProductContainer