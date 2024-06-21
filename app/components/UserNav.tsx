import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
  getKindeServerSession,
} from '@kinde-oss/kinde-auth-nextjs/server'
import { MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { createAirbnbHome } from '../actions'

const UserNav = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const createAirbnbHomeId = createAirbnbHome.bind(null, {
    userId: user?.id as string,
  })
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className='rounded-full border px-2 py-1 lg:px-4 lg:py-2 flex items-center gap-x-3'>
          <MenuIcon className='w-6 h-6 lg:w-5 lg:h-5' />
          <img
            src={
              user?.picture ??
              'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'
            }
            alt='user img'
            className='rounded-full h-8 w-8 hidden lg:block'
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {user ? (
          <>
            <DropdownMenuItem>
              <form className='w-full' action={createAirbnbHomeId}>
                <button type='submit' className='w-full text-start'>
                  Airbnb your home
                </button>
              </form>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href='/my-homes' className='w-full'>
                My Listings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href='/favorites' className='w-full'>
                My Favorites
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href='/reservations' className='w-full'>
                My Reservation
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogoutLink>Logout</LogoutLink>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            {' '}
            <DropdownMenuItem>
              <RegisterLink>Register</RegisterLink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LoginLink>Login</LoginLink>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default UserNav
