const baseUrl = 'http://10.120.14.164';
const getAccessToken = async () => {

    // Check if the access token is already cached
   const cachedToken = localStorage.getItem('access_token');
    const expirationTime = localStorage.getItem('access_token_expires_at');

    if (cachedToken && expirationTime && new Date().getTime() < expirationTime) {
      // Use the cached token if it exists and is still valid
     
      return cachedToken;
    }
    
  
    const response = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
      },
      body: JSON.stringify({
        api_key: 'hsPI5xPWXwzMBOHnNFh2Cbb8lfLssXdDyGSJPKcnp1MZJdHC9G1emInZYxJZKsx0',
      }),
    });
  
    if (!response.ok) {
      throw new Error('Authentication failed');
    }
  
    const  {access_token, expires_in}  = await response.json();

    // Calculate the expiration time in milliseconds
    const expirationTimeMillis = new Date().getTime() + expires_in *1000;

    // Cache the new access token and its expiration time
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('access_token_expires_at', expirationTimeMillis);
    
    
    return access_token;
  };

  export {getAccessToken, baseUrl};
 
  