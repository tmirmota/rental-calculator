const conv_number = (expr, decplaces) => {
  // This function is from David Goodman's Javascript Bible.

  var str = '' + Math.round(eval(expr) * Math.pow(10, decplaces))

  while (str.length <= decplaces) {
    str = '0' + str
  }

  var decpoint = str.length - decplaces

  return str.substring(0, decpoint) + '.' + str.substring(decpoint, str.length)
}

export const pmt = (rate, per, nper, pv) => {
  nper = parseFloat(nper)
  pv = parseFloat(pv)
  per = parseFloat(per)

  if (per == 0 || nper == 0) {
    return 0
  }

  rate = eval(rate / (per * 100))

  if (rate == 0) {
    // Interest rate is 0

    pmt_value = -pv / nper
  } else {
    x = Math.pow(1 + rate, nper)

    pmt_value = -(rate * (x * pv) / (-1 + x))
  }

  pmt_value = conv_number(pmt_value, 2)

  return pmt_value
}
