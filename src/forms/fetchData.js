import { getAccessToken, baseUrl } from '../token_authorization/getAccessToken';

export async function fetchData(endpoint, method, body){
  const headers = new Headers();

  const accessToken = await getAccessToken(); 

  let url = `${baseUrl}/api/v1${endpoint}`;

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization',`Bearer ${accessToken}`);
  headers.append('Accept', 'application/json');

  const res = await fetch(url, {
    method: method || 'GET',
    headers: headers,
    body: body ? JSON.stringify(body) : null
  });

  if(!res){
    return {success: false};
  }

  const data = res.ok && res.body ? await res.json() : null;

  return { data: data, success: res.ok};

}




