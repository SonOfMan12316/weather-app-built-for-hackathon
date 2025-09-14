import Header from '../HomePage/Header'
import { Search } from '../icons'
import { Button, Input } from '../ui'

const Home = () => {
  return (
    <div className="w-screen px-4 lg:px-16 xl:px-20 h-screen bg-ch-neutral-900 text-ch-neutral-900">
      <Header />
      <div className="py-5 sm:w-8/12 lg:w-full sm:mx-auto">
        <h1 className="font-bricolage font-bold text-xl sm:text-2xl text-white text-center">
          How’s the sky looking today?
        </h1>
      </div>
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 sm:w-9/12 lg:w-6/12 xl:w-[55%] sm:mx-auto">
        <div className="sm:w-10/12">
          <Input
            placeholder="Search for a place..."
            variant="search"
            icon={<Search />}
          />
        </div>
        <div className="sm:w-2/12 sm:max-w-[85px]">
          <Button size="xs">Search</Button>
        </div>
      </div>
    </div>
  )
}

export default Home
