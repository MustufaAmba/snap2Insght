import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  return (
    <div className='w-full  p-5'>
      <ul className='flex list-none gap-4 justify-center'>
        <li className='font-bold text-lg'><Link href='/'>Form</Link></li>
        <li className='font-bold text-lg'><Link href='/gallery'>Gallery</Link></li>
      </ul>
    </div>
  )
}

export default NavBar