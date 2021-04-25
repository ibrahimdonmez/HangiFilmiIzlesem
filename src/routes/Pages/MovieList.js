import React from 'react'
import { Link } from 'react-router';
import * as Http from 'utils/http.helper'
import MovieDetail from './MovieDetail';
import jwt from 'jsonwebtoken';

class MovieList extends React.Component {

    constructor() {
        super();

        this.state = {
            MovieList: [],
            hasError: false,
            errorMessage: ""
        }
    }

    componentDidMount() {
        // HTTP Call
        const decodedUser = localStorage.length != 0 ? jwt.verify(localStorage.getItem('userToken'), 'Empayfi',) : "";
        Http.post('Movies/getMovieList').then(res => {
            if (res.durum) {
                res.data.forEach(element => {
                    console.log(res);
                    this.setState(res => {
                        const MovieList = res.MovieList.push(element);
                    })
                });
            }

            if (!res.durum) {
                this.setState({
                    hasError: !res.durum,
                    errorMessage: res.message
                })
            }

        });
    }

    render() {
        const decodedUser = localStorage.length != 0 ? jwt.verify(localStorage.getItem('userToken'), 'Empayfi',) : "";
        return (
            <div style={{ paddingTop: "5%" }}>
                <div className="card-container">
                    <div className="row">
                        {this.state.MovieList.map((Movie, index) => {
                            return (
                                <div className="col-md-3" style={{ marginTop: "1%" }} key={Movie._id}>
                                    <div className="movie-card">
                                        <Link to={{
                                            pathname: (window.location.pathname) == "/Admin/FilmListesi" ? "/Admin/FilmDetayi" : "/FilmDetayi",
                                            state: {
                                                movieID: Movie._id,
                                                movieName: Movie.movieName,
                                                userID: decodedUser.userID
                                            }
                                        }}>
                                            <div className="movie-header" style={{ backgroundImage: `url(${Movie.imageURL})`,backgroundRepeat: 'no-repeat', backgroundSize:'100% 100%' }}>
                                                <div className="header-icon-container">
                                                    <a href="#">
                                                        <i className="material-icons header-icon"></i>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="movie-content">
                                                <div className="movie-content-header">
                                                    <a href="#">
                                                        <h1 className="movie-title">{Movie.movieName}</h1>
                                                    </a>
                                                </div>
                                                <div className="movie-info">
                                                    <div className="info-section">
                                                        <label>Kategori</label>
                                                        <span>{Movie.category}</span>
                                                    </div>
                                                    <div className="info-section">
                                                        <label>Film Süresi</label>
                                                        <span>{Movie.duration} Dakika</span>
                                                    </div>
                                                    <div className="info-section">
                                                        <label>Eklenme Tarihi</label>
                                                        <span>{Movie.releaseDate}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}

                        {this.state.MovieList == 0 ? <h2 style={{ color: "#da0605", marginLeft: "27%" }}> Aramanıza Uygun Film Bulunamadı! </h2> : null}
                    </div>
                </div>






            </div>
        )
    }
}

export default MovieList;
