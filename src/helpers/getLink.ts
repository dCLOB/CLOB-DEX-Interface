import { generatePath } from 'react-router-dom'

export const getLink = (route: string, params = {}) => {
  let updatedRoute = route
  try {
    updatedRoute = generatePath(route, params)

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  } catch {
    Object.keys(params).forEach((param) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      updatedRoute = updatedRoute.replace(`:${param}`, params[param])
    })
  }
  return updatedRoute
}

export default getLink
