import React, { FC, useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { IProduct } from '@/types/productTable';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart: FC<{ products: IProduct[] }> = ({ products }) => {
  const [data, setData] = useState<any>(null)
  const productMap = new Map()
  useEffect(() => {
    products.length && processData()
  }, [products])
  const processData = () => {
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
    const sortedData = [...productMap.entries()].sort(([a1, a2], [b1, b2]) => b2.length - a2.length)
    const keys: string[] = [], values: number[] = [];
    sortedData.slice(0, 5).forEach(([key, value]) => {
      keys.push(key)
      const percentage:number=(value.length*100)/products.length
      values.push(percentage)
    })
    if (sortedData.length > 5) {
      keys.push('other')
      const otherValues= (sortedData.slice(5, sortedData.length).reduce((acc,[key, value]) => value.length +  acc,0)*100)/products.length
      values.push(otherValues)
    }
    const chartData = {
      labels: keys,
      datasets: [
        {
          label: '%',
          data: values,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(53, 162, 235, 0.4)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(53, 162, 235,1)',
          ],
          borderWidth: 1,
        },
      ],
    };
    setData(chartData)
  }
  return (
    <div className='w-96 h-96 '>
      <p className='text-3xl font-semibold'>Brand Share</p>
      {
        data && <Doughnut data={data}  />
      }
    </div>
  )
}

export default DoughnutChart