import Image from 'next/image'
import Link from 'next/link'
import { useCountries } from '../lib/getCountries'
import { addToFavorite, deleteFromFavorite } from '../actions'
import { AddToFavoriteButton, DeleteFromFavoriteButton } from './SubmitButtons'

interface iAppProps {
  imagePath: string
  description: string
  price: number
  location: string
  userId: string | undefined
  isInFavoriteList: boolean
  favoriteId: string
  homeId: string
  pathName: string
}
const ListingCard = ({
  description,
  imagePath,
  location,
  price,
  userId,
  isInFavoriteList,
  favoriteId,
  homeId,
  pathName,
}: iAppProps) => {
  const { getCountryByValue } = useCountries()
  const country = getCountryByValue(location)
  return (
    <div className='flex flex-col mb-8'>
      <div className='relative h-72'>
        <Image
          fill
          src={`https://mcixqhlrpmuoyfiwxizo.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt='img'
          className='rounded-lg h-full object-cover mb-3'
        />
        {userId && (
          <div className='z-10 absolute top-2 right-2'>
            {isInFavoriteList ? (
              <form action={deleteFromFavorite}>
                <input type='hidden' name='favoriteId' value={favoriteId} />
                <input type='hidden' name='userId' value={userId} />
                <input type='hidden' name='pathName' value={pathName} />
                <DeleteFromFavoriteButton />
              </form>
            ) : (
              <form action={addToFavorite}>
                <input type='hidden' name='homeId' value={homeId} />
                <input type='hidden' name='userId' value={userId} />
                <input type='hidden' name='pathName' value={pathName} />
                <AddToFavoriteButton />
              </form>
            )}
          </div>
        )}
      </div>
      <Link href={`/home/${homeId}`} className='mt-2 px-1'>
        <h3 className='font-medium text-base grid grid-cols-[25px,auto] items-center gap-2'>
          <Image
            src={country?.flagUrl as string}
            alt='country'
            width={22}
            height={10}
          />
          {country?.label} / {country?.region}
        </h3>
        <p className='text-muted-foreground text-sm line-clamp-2'>
          {description}
        </p>
        <p className='pt-2 text-muted-foreground'>
          <span className='font-medium text-black text-lg'>${price}</span> Night
        </p>
      </Link>
    </div>
  )
}
export default ListingCard
