export let normalizeDate = function (par1) {
  let array = par1.split('T')[0].split('-')
  return array[1] + "/" + array[2] + "/" + array[0]
}

