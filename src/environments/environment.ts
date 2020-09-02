export const environment = {
    production: false,
    auth: {
        clientID: 'secret',
        clientSecret: 'secret',
        domain: 'http://18.222.182.193:8082',
        audience: 'YOUR-AUTH0-API-IDENTIFIER',
        redirect: 'http://localhost:4200',
        scope: 'openid profile email'
    },
    API_URL: `http://18.222.182.193:8082/rest/api/v1`,
};
