async function gistsCount(username, token) {
  let headers = { Authorization: 'token ' + token }
  const res = await fetch(`https://api.github.com/users/${username}`, {headers: headers})
  let data = await res.json()
  let publicGists = data.public_gists
  return publicGists
}




async function getGists(page, perPage, token, user) {

  let params = new URLSearchParams({
    per_page: perPage,
    page: page
  })
  let headers = { Authorization: 'token ' + token }
  let res = await fetch(`https://api.github.com/users/${user}/gists?` + params, { method: 'GET', headers: headers })
  let json = await res.json()
  return json
}

export async function getAllGists(user, token) {
  let count = await gistsCount(user, token)
  console.log(`gist count: ${count}`)
  let pagesCount = Math.ceil(count / 100)
  console.log(`pages count: ${pagesCount}`)
  let gists = []
  for (let i = 1; i <= pagesCount; i++) {
    let gist = await getGists(i, 100, token, user)
    gists = gists.concat(gist)
  }
  return gists
}


export function formatGists(gists) {
  console.log(`gists: ${gists}`)
  let newGists = []
  for (let gist of gists) {
    newGists.push({
      name: Object.keys(gist.files)[0],
      url: gist.html_url,
      description: gist.description || 'Empty',
      public: gist.public,
      id: gist.id
    })
  }
//   return [{
//       name: 'hi',
//       url: '',
//       description: '',
//       public: true,
//       id: 1
//   }]
  return newGists
}


export async function deleteSelected(gistId, token) {
    let headers = { Authorization: 'token ' + token }
    let res = await fetch(`https://api.github.com/gists/${gistId}`, {method: 'DELETE', headers:headers})
    return res.ok
}

export async function checkAuth(user, token) {
  let headers = { Authorization: 'token ' + token }
  let res = await fetch(`https://api.github.com/user`, {method: 'GET', headers:headers})
  return res.ok
}