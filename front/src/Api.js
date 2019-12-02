import axios from 'axios';

const server = 'http://localhost:7000';

const request = (type, path, body) => axios
  .request({ url: `${server}${path}`, method: type, data: body })
  .then(req => req.data);

export const register = body => request('post', '/add_client', body);
export const addPet = body => request('post','/add_pet', body);
export const getPets = body => request('get', '/pets_by_dni/' + body);
export const getClients = body => request('get', '/clients_by_name/' + body);
export const getClientByDni = body => request('get', '/client_by_dni/' + body);