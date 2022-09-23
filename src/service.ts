
function doSomething() {

console.log('doing')
}

async function postData<T>(url = '',method="POST",  data: Record<string, any> = {}): Promise<T> {
    // Default options are marked with *
    const headers: HeadersInit = new Headers()
    //headers.set('Accept-Language', i18n.language)
    headers.set('Content-Type', 'application/json')

    const config = {
      method: method, // *GET, POST, PUT, DELETE, etc.
      headers,
      body: JSON.stringify(data),
    } as any
  
    if (method === 'GET') {
      const queryString = Object.keys(data)
        .map(key => key + '=' + data[key])
        .join('&')
      url = queryString ? `${url}?${queryString}` : url
      delete config.body
    }
  
    const response = await fetch(url, config)
    return response.json()
  }

export default {doSomething, postData}