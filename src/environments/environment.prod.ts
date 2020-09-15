export const environment = {
    production: true,
    API_URL: 'https://18.222.182.193:8082/rest/api/v1',
    auth: {
        clientID: 'xuanchuongdp',
        clientSecret: 'secret',
        domain: 'https://18.222.182.193:8082',
        audience: 'YOUR-AUTH0-API-IDENTIFIER',
        redirect: 'http://localhost:4200',
        scope: 'openid profile email'
    },
};
