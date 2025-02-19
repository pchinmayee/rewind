import { Link } from 'react-router-dom'

export default function Bottom({ navItems }) {
  return (
    <nav className='fixed bottom-0 py-4 pb-6  w-screen bg-rewind-dark-primary md:hidden'>
      <ul className='flex justify-evenly items-center'>
        {navItems.map((item, index) => (
          <li key={index}>
            <Link to={item?.link} className='hover:text-rewind-secondary'>
              <img src={item?.icon} />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
