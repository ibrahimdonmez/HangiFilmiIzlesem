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

    onAddFavorite(userID, userFavoriteMovieList, movieID, e) {
        debugger;
        userFavoriteMovieList.push(movieID);
        const Movie = {
            userID: userID,
            userFavoriteMovieList: userFavoriteMovieList
        }
        console.log(userFavoriteMovieList);
        Http.post('Users/addFavoriteMovie', Movie).then(res => {
            if (res.durum) {
                window.location.reload(false);
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
                                            <div className="movie-header" style={{ backgroundImage: `url(${Movie.imageURL})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%' }}>
                                                {decodedUser.userName == null ? 
                                                    null 
                                                    :
                                                    <img src={require("../../styles/images/addFavorite.png")} onClick={this.onAddFavorite.bind(this, decodedUser.userID, decodedUser.userMovieList, Movie._id)} style={{ marginLeft: "85%", marginTop: "3%", borderRadius: "25px", border: "2px solid rgb(200 0 255 / 30%)", backgroundColor: "rgb(186 91 212 / 90%)" }} width="35px" />
                                                }
                                                <div className="header-icon-container">
                                                    <a href="#">
                                                        <i className="material-icons header-icon">???</i>
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
                                                        <label>Film S??resi</label>
                                                        <span>{Movie.duration} Dakika</span>
                                                    </div>
                                                    <div className="info-section">
                                                        <label>Yay??n Tarihi</label>
                                                        <span>{Movie.releaseDate}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}

                        {this.state.MovieList == 0 ? <h2 style={{ color: "#da0605", marginLeft: "27%" }}> Araman??za Uygun Film Bulunamad??! </h2> : null}
                    </div>
                </div>
            </div>
        )
    }
}

export default MovieList;
