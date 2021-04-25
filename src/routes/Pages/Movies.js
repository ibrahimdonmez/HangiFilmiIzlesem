import React from 'react'
import { browserHistory } from 'react-router';
import * as Http from 'utils/http.helper'

class Movies extends React.Component {

    constructor() {
        super();

        this.state = {
            movieList: [],
            hasError: false,
            errorMessage: ""
        }
    }

    componentDidMount() {
        // HTTP Call
        Http.post('Movies/getMovieList', null).then(res => {
            if (res.durum) {
                res.data.forEach(element => {
                    this.setState(res => {
                        const movieList = res.movieList.push(element);
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

    onDeleteMovieClick(_id, movieName) {
        const movie = {
            _id: _id,
            movieName: movieName
        }

        Http.post('Movies/deleteMovie', movie).then(res => {
            if (res.durum) {
                window.location.reload(false);
            }

            if (!res.durum) {
                Http.post('MovieDetail/deleteMovieDetail', movie).then(res => {
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

        });
    }

    render() {
        return (
            <div className="container" style={{ marginTop: "-10%" }}>
                <h1>Filmler</h1>
                <div className="table-responsive">
                    <table className="table col-md-12" id="myTable" >
                        <thead className="thead-dark">
                            <tr>
                                <th width="11%">ID</th>
                                <th width="20%">Film Adı</th>
                                <th width="5%">Film Kategorisi</th>
                                <th width="5%">Film Süresi</th>
                                <th width="15%">Oluşturma tarihi</th>
                                <th width="5%">İşlem</th>
                            </tr>
                        </thead>
                        <tbody className="table-success">

                            {this.state.movieList.map((movies, index) => {
                                return (
                                    <tr key={movies._id}>
                                        <td>{movies._id}</td>
                                        <td>{movies.movieName}</td>
                                        <td>{movies.category}</td>
                                        <td>{movies.duration}</td>
                                        <td>{movies.dateCreated.substr(0, 10)}</td>
                                        <td><img src={require("../../styles/images/delete.png")} width="30px" onClick={this.onDeleteMovieClick.bind(this, movies._id, movies.movieName)} /> </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}


export default Movies;
