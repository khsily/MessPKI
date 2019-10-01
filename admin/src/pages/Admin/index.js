import React, { Component } from 'react';
import { sha512 } from 'js-sha512';

import './Admin.scss';
import { User, Cert } from 'ethpki-utils/api/models';
import certForm from '../../certForm.json';

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      certs: [],
    }

    this.handleCreateCert = this.handleCreateCert.bind(this);
  }

  async componentDidMount() {
    const { cert } = this.props;
    await cert.register();
    await this.loadData();
  }

  render() {
    return (
      <section id='admin'>
        <ul className='user-list'>
          {this.state.users.map((v, i) => (
            <li key={i}>
              <span>{v.name}</span>
              {this.isSigned(v.hash) ?
                <button className='revoke-btn' onClick={() => this.revokeCert(v.hash)}>인증서 폐기</button>
                :
                <button onClick={() => this.handleCreateCert(v)}>인증서 발행</button>
              }
            </li>
          ))}
        </ul>
      </section>
    );
  }

  async loadData() {
    const { data: users } = await User.getAll();
    const { data: certs } = await Cert.getAll();
    this.setState({ users, certs });
  }

  getCertInfo(userHash) {
    const { certs } = this.state;
    return certs.find((v) => v.user_hash === userHash);
  }

  isSigned(userHash) {
    const certInfo = this.getCertInfo(userHash);
    if (certInfo) return certInfo.is_signed;
    else return false;
  }

  async handleCreateCert(userInfo) {
    const certId = await this.appendCert(userInfo);
    await this.signCert(certId, userInfo);
  }

  async appendCert(userInfo) {
    const { cert } = this.props;

    try {
      const certInfo = this.getCertInfo(userInfo.hash);
      if (certInfo) return certInfo.cert_id;

      let data = certForm;
      data.userInfo = userInfo;
      data.publickey = userInfo.publickey;

      data = JSON.stringify(data);
      const hash = sha512(data);

      const certId = await cert.append(data, hash);
      await Cert.append({
        cert_id: certId,
        user_hash: userInfo.hash,
      });
      return certId;
    } catch (e) {
      alert('인증서 발행에 실패하였습니다.');
      console.error(e);
    }
  }

  async signCert(certId, userInfo) {
    const { cert } = this.props;

    try {
      const { hash: certHash } = await cert.getCertInfo(certId);
      const { hash: userHash } = userInfo;

      const { data: sign } = await Cert.sign({
        user_hash: userHash,
        cert_hash: certHash,
      });

      const signId = await cert.sign(certId, sign);
      await Cert.update({ cert_id: certId, sign_id: signId });

      await this.loadData();
      console.log(`Certifcate(${certId}) has been signed on signId(${signId})`);
    } catch (e) {
      alert('인증서 서명에 실패하였습니다.');
      console.error(e);
    }
  }

  async revokeCert(userHash) {
    const { cert } = this.props;

    try {
      const certInfo = this.getCertInfo(userHash);
      const { cert_id } = certInfo;
      await cert.revoke(cert_id);
      await Cert.revoke({ cert_id });
      await this.loadData();
    } catch (e) {
      alert('인증서 폐기에 실패하였습니다.');
      console.error(e);
    }
  }
}

export default Admin;