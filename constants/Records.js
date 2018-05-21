import { Record } from 'immutable'
import options from './optionConstants'

export const Asset = Record(
  {
    displayName: 'New Asset',
    housePrice: null,
    rentalPrice: null,
    utilities: null,
    maintenance: null,
    mortgageRate: null,
    downPayment: null,
  },
  'Asset',
)
