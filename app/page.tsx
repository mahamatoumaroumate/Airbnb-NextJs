import Navbar from './components/Navbar'
import MapFilterItems from './components/MapFilterItems'
import prisma from '@/lib/db'
import ListingCard from './components/ListingCard'
import { Suspense } from 'react'
import SkeletonCard from './components/SkeletonCard'
import NoItems from './components/NoItems'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { unstable_noStore as noStore, revalidatePath } from 'next/cache'
import { Button } from '@/components/ui/button'
async function getData({
  searchParams,
  userId,
}: {
  searchParams?: {
    filter?: string
    country?: string
    guest?: string
    room?: string
    bathroom?: string
  }
  userId: string | undefined
}) {
  noStore()
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
      categoryName: searchParams?.filter ?? undefined,
      country: searchParams?.country ?? undefined,
      guests: searchParams?.guest ?? undefined,
      bedrooms: searchParams?.room ?? undefined,
      bathrooms: searchParams?.bathroom ?? undefined,
    },
    select: {
      photo: true,
      id: true,
      price: true,
      description: true,
      country: true,
      Favorite: {
        where: {
          userId: userId ?? undefined,
        },
      },
    },
  })

  return data
}

const Home = async ({
  searchParams,
}: {
  searchParams?: { filter?: string }
}) => {
  return (
    <div className='container mx-auto px-5 lg:px-10'>
      <Navbar />
      <MapFilterItems />
      <Suspense key={searchParams?.filter} fallback={<SkeletonLoading />}>
        <ShowItems searchParams={searchParams} />
      </Suspense>
    </div>
  )
}
export default Home
async function ShowItems({
  searchParams,
}: {
  searchParams?: {
    filter?: string
    country?: string
    guest?: string
    room?: string
    bathroom?: string
  }
}) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const data = await getData({ searchParams: searchParams, userId: user?.id })
  return (
    <>
      {data.length === 0 ? (
        <>
          <NoItems
            title='Sorry no listings found for this category...'
            description='Please check a other category or create your own listing!'
          />
        </>
      ) : (
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 mt-10 '>
          {data.map((item) => (
            <ListingCard
              key={item.id}
              price={item.price as number}
              location={item.country as string}
              imagePath={item.photo as string}
              description={item.description as string}
              userId={user?.id}
              favoriteId={item.Favorite[0]?.id}
              isInFavoriteList={item.Favorite.length > 0 ? true : false}
              homeId={item.id}
              pathName='/'
            />
          ))}
        </div>
      )}
    </>
  )
}
function SkeletonLoading() {
  return (
    <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 pt-10'>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  )
}
