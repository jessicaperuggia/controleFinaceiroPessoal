import axios from 'axios';

const url = axios.create({ baseURL: 'api/transaction', });

console.log(url);