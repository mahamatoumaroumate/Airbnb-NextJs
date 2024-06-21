import { ReactNode } from 'react'

const layout = ({ children }: { children: ReactNode }) => {
  return <div className='mt-10'>{children}</div>
}
export default layout
