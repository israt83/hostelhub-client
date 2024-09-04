import { TbBeach, TbMountain,  } from 'react-icons/tb'
import {
 
  
  GiWindmill,
} from 'react-icons/gi'

import { IoDiamond } from 'react-icons/io5'
import { MdOutlineVilla } from 'react-icons/md'

export const categories = [
  {
    label: 'Beach',
    icon: TbBeach,
    description: 'This property is close to the beach!',
  },
  {
    label: 'Windmills',
    icon: GiWindmill,
    description: 'This property is has windmills!',
  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'This property is modern!',
  },
  {
    label: 'Countryside',
    icon: TbMountain,
    description: 'This property is in the countryside!',
  },
 
  {
    label: 'Lux',
    icon: IoDiamond,
    description: 'This property is brand new and luxurious!',
  },
]
