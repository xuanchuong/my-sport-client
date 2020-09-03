export const environment = {
    production: false,
    auth: {
        clientID: 'xuanchuongdp',
        clientSecret: 'secret',
        domain: 'http://localhost:8080',
        audience: 'YOUR-AUTH0-API-IDENTIFIER',
        redirect: 'http://localhost:4200',
        scope: 'openid profile email'
    },
    API_URL: `http://localhost:8080/rest/api/v1`,
};
