import { ProductContext } from "@/context/ProductContext";
import { useContext } from "react";

export const useProduct = () => {
    const context = useContext(ProductContext);
    if (!context) throw new Error('useProduct must be use inside ProductProvider');
    return context;
  };