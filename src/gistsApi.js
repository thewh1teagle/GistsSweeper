async function apiReq(token, endPoint, params = {}, method = 'GET') {
  const headers = { Authorization: 'token ' + token }
  let url = `https://api.github.com/${endPoint}` 
  if (Object.keys(params).length > 0) {
    url += '?' + new URLSearchParams(params)
  } 
  const res = await fetch(url, {headers: headers, method: method})
  return res
}

async function gistsCount(user, token) {
  const res = await apiReq(token, `users/${user}`)
  const data = await res.json()
  return data.public_gists + data.private_gists
}


async function getPageGists(page, perPage, token, user) {
  const res = await apiReq(token, `users/${user}/gists`, {per_page: perPage, page: page})
  const data = await res.json()
  return data
}


function formatGists(gists) {
  const newGists = gists.map(gist => (
    {
      name: Object.keys(gist.files)[0],
      url: gist.html_url,
      description: gist.description || 'Empty',
      public: gist.public,
      id: gist.id
    }
  ))
  return newGists
}

export async function getGists(user, token) {
  const count = await gistsCount(user, token)
  const pagesCount = Math.ceil(count / 100)

  const gists = await Promise.all(Array.from({length: pagesCount}).map((_, i) => (
    getPageGists(i, 100, token, user)
  )))
  const merged = [].concat.apply([], gists);
  return formatGists(merged)
}



export async function deleteSelected(gistId, token) {
  const res = await apiReq(token, `gists/${gistId}`, {}, 'DELETE')
  return res.ok
}

export async function checkAuth(token) {
  const res = await apiReq(token, 'user')
  
  return res.ok
}





