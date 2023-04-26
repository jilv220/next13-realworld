export async function fetchData(endpoint: string, queryParams?: Object) {
  // Create a new URL object with the endpoint
  const url = new URL(endpoint)

  if (queryParams) {
    // Convert non-string query parameters to strings
    const stringifiedQueryParams = Object.fromEntries(
      Object.entries(queryParams).map(([key, value]) => [key, String(value)])
    )

    // Add query parameters to the URL object using URLSearchParams
    const searchParams = new URLSearchParams(stringifiedQueryParams)
    url.search = searchParams.toString()
  }

  // Fetch data using the URL object with query parameters
  const response = await fetch(url)
  const data = await response.json()
  return data
}
