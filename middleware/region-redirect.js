/* eslint-disable no-extra-boolean-cast */
export default function({ params, route, redirect }) {
  // hypothetical set of all supported locales
  const locales = ['en-US']

  // if the current prefix is neither 'en' nor 'ge'
  if (!locales.includes(params.region)) {
    // redirect to the same path with default locale as prefix
    return redirect('/' + locales[0] + route.fullPath)
  }
}
