import { IProduct, IProductContextInitialState, IProductContextValueProps } from '@/types/productTable';
import { noop } from '@/utils/noop';
import React, { FC, ReactNode, createContext, useMemo, useState } from 'react'
const initialState: IProductContextInitialState = {
    currentProduct: null,
    setCurrentProduct: noop
}
export const ProductContext = createContext(initialState);

const ProductProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [currentProduct, setCurrentProduct] = useState<null | IProduct>(null)
    const value: IProductContextValueProps = useMemo(() => {
        return {
            currentProduct,
            setCurrentProduct
        }
    }, [currentProduct, setCurrentProduct])
    return (
        <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
    )
}

export default ProductProvider