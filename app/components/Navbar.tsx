import Image from 'next/image'
import Link from 'next/link'
import desktopLogo from '../../public/airbnb-desktop.png'
import mobileLogo from '../../public/airbnb-mobile.webp'
import UserNav from './UserNav'
import SearchModalComponent from './SearchModalComponent'
const Navbar = () => {
  return (
    <nav className='w-full border-b'>
      <div className='hidden sm:flex items-center justify-between container mx-auto px-5 lg:px-10 py-5'>
        <Link href='/'>
          <Image
            src={desktopLogo}
            alt='DesktopLogo'
            className='w-32 hidden lg:block'
          />
          <Image
            src={mobileLogo}
            alt='mobileLogo'
            className='w-12 block lg:hidden'
          />
        </Link>
        <SearchModalComponent />
        <UserNav />
      </div>
      <div className='relative block sm:hidden'>
        <Link href='/' className='flex items-center'>
          <Image
            src={mobileLogo}
            alt='mobileLogo'
            className='w-12 block lg:hidden'
          />
          <h1 className='text-2xl text-primary font-semibold'>airbnb</h1>
        </Link>
        <div className='absolute right-2 top-2'>
          <UserNav />
        </div>
        <div className='my-6'>
          <SearchModalComponent />
        </div>
      </div>
    </nav>
  )
}
export default Navbar
