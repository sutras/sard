export const tigerList = Array(12)
  .fill(0)
  .map((_, i) => {
    return {
      id: i++,
      url: `https://fastly.jsdelivr.net/npm/@sard/assets/images/tiger${i}.jpg`,
    }
  })

export const catList = Array(12)
  .fill(0)
  .map((_, i) => {
    return {
      id: i++,
      url: `https://fastly.jsdelivr.net/npm/@sard/assets/images/cat${i}.jpg`,
    }
  })

export const tigerAndCatList = [...tigerList, ...catList]
