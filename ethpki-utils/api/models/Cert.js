import { api } from '../config';

const Cert = {
  get: (certId) => api.get(`cert/info/${certId}`),
  getAll: () => api.get('cert/list'),
  isSinged: (certId) => api.get(`cert/issinged/${certId}`),
  sign: (data) => api.post('cert/sign', data),
  update: (data) => api.put('cert/update', data),
  append: (data) => api.post('cert/append', data),
  revoke: (data) => api.put('cert/revoke', data),
}

export default Cert;