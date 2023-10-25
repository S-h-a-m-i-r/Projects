import auth0 from 'auth0-js'

const auth = new auth0.WebAuth({
	domain: process.env.REACT_APP_TOSS_DOMAIN || '',
	audience: process.env.REACT_APP_TOSS_AUDIENCE,
	clientID: process.env.REACT_APP_TOSS_CLIENT_ID || '',
	redirectUri: `${window.location.origin}`,
	responseType: 'token',
	scope: 'TOSSAPI',
})

const useLogin = () => {
	const onLogin = () => {
		return auth.authorize()
	}

	const onAuthorizeUser = (): string | null => {
		if (!window) {
			return null
		}

		const userAccessToken = window.location.hash.split('&')[0].split('=')[1]
		return userAccessToken.replaceAll('"', '')
	}

	return {
		onLogin,
		onAuthorizeUser,
	}
}

export default useLogin
