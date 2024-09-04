

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';



const TabCategories = ({meals}) => {
  

  return (
    <Tabs>
      <div className='container px-6 py-10 mx-auto'>
        <h1 className='text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl '>
        Explore Meals by Category
        </h1>
        <p className='max-w-2xl mx-auto my-6 text-center text-orange-600 '>
        Browse meals by category to find your favorite Breakfast, Lunch, Dinner, or view All Meals.
        </p>
        <div className='flex items-center justify-center'>
        <TabList className='flex items-center -mx-4 space-x-2 overflow-x-auto overflow-y-hidden sm:justify-center flex-nowrap dark:bg-gray-100 dark:text-gray-800'>
            <Tab className="flex items-center flex-shrink-0 px-5 py-2 border-b-4 dark:border-gray-300 dark:text-gray-600">Breakfast</Tab>
            <Tab className="flex items-center flex-shrink-0 px-5 py-2 border-b-4 dark:border-gray-300 dark:text-gray-600">Lunch</Tab>
            <Tab className="flex items-center flex-shrink-0 px-5 py-2 border-b-4 dark:border-gray-300 dark:text-gray-600">Dinner</Tab>
            <Tab className="flex items-center flex-shrink-0 px-5 py-2 border-b-4 dark:border-gray-300 dark:text-gray-600">All Meals</Tab>
          </TabList>
        </div>

        
 
          <>
            <TabPanel>
              <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 '>
                
              </div>
            </TabPanel>

            <TabPanel>
              <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 '>
                
              </div>
            </TabPanel>

            <TabPanel>
              <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 '>
                
              </div>
            </TabPanel>

            <TabPanel>
              <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 '>
                
              </div>
            </TabPanel>
          </>
      
      </div>
    </Tabs>
  );
};

export default TabCategories;
