import { createSelector } from 'reselect'
import { pmt } from '../utils/finance'

const getAssets = state => state.user.assets

const per = 12
const nper = 25 * per

export const getProfits = createSelector(getAssets, assets => {
  let profits = {}
  Object.entries(assets).forEach(([key, asset]) => {
    const {
      housePrice,
      rentalPrice,
      downPayment,
      mortgageRate,
      maintenance,
      utilities,
    } = asset

    const loan = housePrice * (1 - downPayment)
    const payments = pmt(mortgageRate, per, nper, -loan)

    const profit = Math.floor(
      (rentalPrice - payments - maintenance - utilities) * 12,
    )
    profits[key] = profit
  })
  return profits
})
