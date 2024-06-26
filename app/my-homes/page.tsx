import prisma from '@/lib/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import NoItems from '../components/NoItems'
import ListingCard from '../components/ListingCard'
import { unstable_noStore as noStore } from 'next/cache'
import { Button } from '@/components/ui/button'
import { deleteHome } from '../actions'
async function getData(userId: string) {
  noStore()
  const data = await prisma.home.findMany({
    where: {
      userId,
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
    },
    select: {
      id: true,
      country: true,
      photo: true,
      description: true,
      price: true,
      Favorite: {
        where: {
          userId,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return data
}
const MyHomes = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  if (!user) return redirect('/')
  const data = await getData(user?.id)
  return (
    <section className='container mx-auto px-5 lg:px-10 mt-10'>
      <h2 className='text-3xl font-semibold tracking-tight'>Your Homes</h2>
      {data.length === 0 ? (
        <NoItems
          title='You do not have any Homes listed'
          description='Please list a home on airbnb so that you can see it right here'
        />
      ) : (
        <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 mt-8'>
          {data.map((item) => (
            <div key={item.id}>
              <ListingCard
                imagePath={item.photo as string}
                homeId={item.id}
                price={item.price as number}
                description={item.description as string}
                location={item.country as string}
                userId={user?.id}
                pathName='/my-homes'
                favoriteId={item.Favorite[0]?.id}
                isInFavoriteList={item.Favorite.length > 0 ? true : false}
              />
              <form action={deleteHome} className='mt-[-30px]'>
                <input type='hidden' name='homeId' value={item.id} />
                <input type='hidden' name='userId' value={user?.id} />
                <input type='hidden' name='pathName' value='/my-homes' />
                <Button type='submit'>Delete</Button>
              </form>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
export default MyHomes
