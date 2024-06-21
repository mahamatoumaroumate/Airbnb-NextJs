import { createReservation } from '@/app/actions'
import CategoryShowCase from '@/app/components/CategoryShowCase'
import HomeMap from '@/app/components/HomeMap'
import SelectCalendar from '@/app/components/SelectCalendar'
import { ReservationSubmitButton } from '@/app/components/SubmitButtons'
import { useCountries } from '@/app/lib/getCountries'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import prisma from '@/lib/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

async function getData(homeId: string) {
  const data = await prisma.home.findUnique({
    where: {
      id: homeId,
    },
    select: {
      photo: true,
      title: true,
      description: true,
      guests: true,
      bedrooms: true,
      bathrooms: true,
      categoryName: true,
      price: true,
      country: true,
      createdAt: true,
      Reservation: {
        where: {
          homeId,
        },
      },
      User: {
        select: {
          profileImage: true,
          firstName: true,
        },
      },
    },
  })
  return data
}
const SingleHome = async ({ params }: { params: { id: string } }) => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const data = await getData(params.id)
  const { getCountryByValue } = useCountries()
  const country = getCountryByValue(data?.country as string)
  return (
    <div className='w-[75%] mx-auto mt-10 mb-10'>
      <h1 className='font-medium text-2xl mb-5'>{data?.title}</h1>
      <div className='relative h-[20rem] md:h-[550px]'>
        <Image
          alt='Image of Home'
          src={`https://mcixqhlrpmuoyfiwxizo.supabase.co/storage/v1/object/public/images/${data?.photo}`}
          className='rounded-lg h-full object-cover w-full '
          fill
        />
      </div>
      <div className='grid md:grid-cols-2 mt-8 md:gap-24 gap-10'>
        <div className='w-full'>
          <h3 className='font-medium text-base grid grid-cols-[25px,auto] items-center gap-2'>
            <Image
              src={country?.flagUrl as string}
              alt='country'
              width={22}
              height={10}
            />
            {country?.label} / {country?.region}
          </h3>
          <div className=' flex gap-x-2 text-muted-foreground'>
            <p>{data?.guests} Guest</p> * <p>{data?.bedrooms} Bedrooms</p> *{' '}
            <p>{data?.bathrooms} Bathrooms</p>
          </div>
          <div className='flex items-center mt-6'>
            <img
              src={
                data?.User?.profileImage ??
                'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'
              }
              alt='user profile'
              className='w-11 h-11 rounded-full'
            />
            <div className='flex flex-col ml-4'>
              <p className='text-xl font-semibold'>{data?.User?.firstName}</p>
              <p className='text-sm text-muted-foreground'>
                Host since{' '}
                {new Date(data?.createdAt as Date).toLocaleDateString(
                  undefined,
                  {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }
                )}
              </p>
            </div>
          </div>
          <Separator className='my-7' />
          <CategoryShowCase categoryName={data?.categoryName as string} />
          <Separator className='my-7' />
          <p className='text-muted-foreground'>{data?.description}</p>
          <Separator className='my-7' />
          <HomeMap locationValue={country?.value as string} />
        </div>
        <form action={createReservation}>
          <input type='hidden' name='homeId' value={params.id} />
          <input type='hidden' name='userId' value={user?.id} />
          <SelectCalendar reservation={data?.Reservation} />
          {user?.id ? (
            <ReservationSubmitButton />
          ) : (
            <Button className='w-full ' asChild>
              <Link href='/api/auth/login'>Make a Reservation</Link>
            </Button>
          )}
        </form>
      </div>
    </div>
  )
}
export default SingleHome
