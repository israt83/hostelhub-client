import Card from './Card'
import Container from '../Shared/Container'
import Heading from '../Shared/Heading'
import LoadingSpinner from '../Shared/LoadingSpinner'
import { useQuery } from '@tanstack/react-query'
import useAxiosCommon from '../../hooks/useAxiosCommon'
import { useSearchParams } from 'react-router-dom'


const Meals = () => {
  const axiosCommon = useAxiosCommon()
  // eslint-disable-next-line no-unused-vars
  const [params, setParams] = useSearchParams()
  const category = params.get('category')

  console.log(category)
  const { data: meals = [], isLoading } = useQuery({
    queryKey: ['meals', category],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/meals?category=${category}`)

      return data
    },
  })


  if (isLoading) return <LoadingSpinner />

  return (
    <Container>
      {meals && meals.length > 0 ? (
        <div className='pt-12 grid grid-cols-1 sm:grid-cols-1  lg:grid-cols-3  gap-8'>
          {meals.map(meal => (
            <Card key={meal._id} meal={meal} />
          ))}
        </div>
      ) : (
        <div className='flex items-center justify-center min-h-[calc(100vh-300px)] '>
          <Heading
            center={true}
            title='No Meals Available In This Category!'
            subtitle='Please Select Other Categories.'
          />
        </div>
      )}
    </Container>
  )
}

export default Meals
