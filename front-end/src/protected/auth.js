class Auth {
    constructor() {
        const authToken = localStorage.getItem('AuthToken');
        this.authenticated = {
            authenticated: authToken ? true : false,
            token: authToken ? authToken : ''
        };
    }

    login(cb) {
        this.authenticated = {
            authenticated: localStorage.getItem('AuthToken') ? true : false,
            token: localStorage.getItem('AuthToken') ? localStorage.getItem('AuthToken') : ''
        };
        cb();
    }

    logout(cb) {
        localStorage.removeItem('AuthToken');
        this.authenticated = {
            authenticated: false,
            token: ''
        };
        cb();
    }

    isAuthenticated() {
        return this.authenticated;
    }

    authentication = (history) => {
        const authToken = localStorage.getItem('AuthToken');
        if (authToken === null) {
            history.push('/')
        }
    }
}

export default new Auth();