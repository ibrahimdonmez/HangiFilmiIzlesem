import React from 'react';
import { Link } from 'react-router';
import '../styles/AdminHeader.scss';

class AdminHeader extends React.Component {

    constructor() {
        super();
        this.state = { 
            isNavOpen: false
        }
    }

    ButtonClicked() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        })
    }

    signOut() {
        localStorage.removeItem('userToken');
    }

    render() {
        return (
            <div>
                <img className="sidebar-img" src={require("../styles/images/sidebar.jpg")} width="38px" />
                <div className="Sidebar">
                
                    <div className="bg-dark border-right" id="sidebar-wrapper">
                        <div className="sidebar-heading">
                            <Link className="navbar-brand sidebar-title" activeClassName="active" to="/Admin">
                                Ne Film İzlesem ?
                            <img src={require("../styles/images/MovieIcon.png")} style={{ marginLeft: "5%" }} width="50px" />
                            </Link>
                        </div>

                        <div className="list-group list-group-flush">
                            <Link className="list-group-item list-group-item-action bg-dark" activeClassName="active" to="/Admin"> ADMİN PANELİ </Link>
                            <Link className="list-group-item list-group-item-action bg-dark" activeClassName="active" to="/Admin/FilmListesi"> Film Listesi </Link>
                            <Link className="list-group-item list-group-item-action bg-dark" activeClassName="active" to="/Admin/Filmler"> Filmler </Link>
                            <Link className="list-group-item list-group-item-action bg-dark" activeClassName="active" to="/Admin/FilmEkle"> Film Ekle </Link>
                            <Link className="list-group-item list-group-item-action bg-dark" activeClassName="active" to="/Admin/Kullanicilar"> Kayıtlı Kullanıcılar </Link>
                            <Link className="list-group-item list-group-item-action bg-dark" activeClassName="active" to="/Admin/GeriBildirimler"> Geri Bildirimler </Link>
                            <Link className="list-group-item list-group-item-action bg-dark" activeClassName="active" to="/Admin/iletisim"> İletişim </Link>
                            <Link className="list-group-item list-group-item-action bg-dark" activeClassName="active" to="/Admin/hakkimizda"> Hakkımızda </Link>
                            <Link className="list-group-item list-group-item-action bg-dark" activeClassName="active" to="/" onClick = {this.signOut.bind(this)}> Çıkış Yap </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default AdminHeader;
