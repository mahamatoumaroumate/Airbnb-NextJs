'use client'

import { useState } from 'react'
import { categoryItems } from '../lib/categoryItems'
import { Card, CardHeader } from '@/components/ui/card'
import Image from 'next/image'

const SelectCategory = () => {
  const [selectCategory, setSelectCategory] = useState<string | undefined>(
    undefined
  )

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-10 w-3/5 mx-auto mb-36'>
      <input
        type='hidden'
        name='categoryName'
        value={selectCategory as string}
      />
      {categoryItems.map((item) => (
        <div className='cursor-pointer' key={item.id}>
          <Card
            className={selectCategory === item.name ? 'border-primary' : ''}
            onClick={() => setSelectCategory(item.name)}
          >
            <CardHeader>
              <Image
                width={32}
                height={32}
                src={item.imageUrl}
                alt={item.name}
                className='w-8 h-8'
              />
            </CardHeader>
            <h3 className='font-medium m-4'>{item.title}</h3>
          </Card>
        </div>
      ))}
    </div>
  )
}
export default SelectCategory
