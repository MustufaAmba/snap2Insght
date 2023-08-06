import React, { FC, useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions
} from 'chart.js';
import { Bar} from 'react-chartjs-2';
import { IProduct } from '@/types/productTable';
import { SelectChangeEvent, Select, MenuItem, InputLabel } from '@mui/material';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChart: FC<{ products: IProduct[] }> = ({ products }) => {
    const [brandOptions, setBrandOptions] = useState<string[]>([])
    const [brand, setBrand] = useState('')
    const [data, setData] = useState<any>(null)

    useEffect(() => {
        products.length && processData()
    }, [products,brand])

    const processData = () => {
        const productMap = new Map()
        products.forEach((product) => {
            const { brandName } = product
            if (productMap.has(brandName)) {
                const prevProducts = productMap.get(brandName)
                productMap.set(brandName, [...prevProducts, product])
            }
            else {
                productMap.set(brandName, [product])
            }
        })
        const brands = [...productMap.keys()]
        setBrandOptions(brands)
        const filteredBrands = productMap.get(brand||brands[0]) as IProduct[]
        const top = (filteredBrands.filter((brand)=>brand.shelfLevel==='Top').length*100)/filteredBrands.length
        const middle = (filteredBrands.filter((brand)=>brand.shelfLevel==='Middle').length*100)/filteredBrands.length
        const bottom= (filteredBrands.filter((brand)=>brand.shelfLevel==='Bottom').length*100)/filteredBrands.length
        setData({
            labels: ['Top', 'Middle', 'Bottom'],
            datasets: [
                {
                    label: 'Products %',
                    data: [top, middle, bottom],
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ],
        })
    }

    const handleBrandChange = (event: SelectChangeEvent) => {
        setBrand(event.target.value)
    }

    const options:ChartOptions = {
        indexAxis: 'y' as const,
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'right' as const,
            },
            title: {
                display: true,
                text: 'Brand Shelf location',
            },
        },
        
    };
    return <div className='w-[600px] h-96'>
        <InputLabel id="brand-select">Select a brand</InputLabel>
        <Select
            value={brand}
            labelId="brand-select"
            className='w-72'
            label='Select a brand'
            variant='filled'
            onChange={handleBrandChange}
        >
            {
                brandOptions.map(brandName =>
                    <MenuItem key={brandName} value={brandName}>{brandName}</MenuItem>
                )
            }

        </Select>
        {data&&brand&&<Bar options={options} data={data} />}
    </div>
}
export default BarChart