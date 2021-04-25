import React from 'react'
import { browserHistory } from 'react-router';
import * as Http from 'utils/http.helper'

class AddMovie extends React.Component {

  constructor() {
    super();

    this.state = {
      movieName: "",
      category: "",
      duration: "",
      image: "",
      imageDetail: "",
      releaseDate: "",
      description: "",
      hasError: false,
      hasSuccess: false,
      errorMessage: "",
      SuccessMessage: "Film başarıyla eklendi!"
    }
  }

  componentDidMount() {
    // HTTP Call

  }

  onInputChanged(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onAddMovie(e) {
    e.preventDefault();

    if (this.state.movieName === "" || this.state.category === "" || this.state.duration === "" || this.state.image === "" || this.state.releaseDate === "" || this.state.description === "") {
      this.setState({
        hasError: true,
        errorMessage: "Lütfen tüm alanları doldurunuz!"
      });

      return;
    }

    Http.post('Movies/addMovie', this.state)
      .then(res => {
        if (!res.durum) {

          this.setState({
            hasError: !res.durum,
            hasSuccess: res.durum,
            errorMessage: res.error.code === 11000 ? "Bu film zaten sistemde kayıtlı" : "Beklenmeyen bir hata oluştu!"
          })
        }

        else if (res.durum) {
          const movieDetail = {
            _id: res.movie._id,
            image: this.state.imageDetail,
            description: this.state.description
          }
          console.log(movieDetail);

          Http.post('MovieDetail/addMovieDetail', movieDetail)
            .then(res => {
              if (res.durum) {
                this.setState({
                  hasError: !res.durum,
                  hasSuccess: res.durum,
                })
              }
            });
        }

      });
  }

  renderError() {
    return <div className="alert alert-danger" style={{ width: "516px", "marginLeft": "auto", marginRight: "auto", "marginTop": "20px" }}>{this.state.errorMessage}</div>;
  }

  renderSuccess() {
    return <div className="alert alert-success" style={{ width: "516px", "marginLeft": "auto", marginRight: "auto", "marginTop": "20px" }}>{this.state.SuccessMessage}</div>;
  }

  render() {
    const Error = this.renderError.bind(this);
    const Success = this.renderSuccess.bind(this);
    return (
      <div className="add-movie-container" style={{ marginTop: "-10%" }}>
        <div className="container">
          <form onSubmit={this.onAddMovie.bind(this)}>
            <h1>Film Ekle</h1>

            <div className="row">
              <div className="form-group col-md-6">
                <label>Film Adı</label>
                <input className="form-control" name="movieName" placeholder="örn: Inception" value={this.state.movieName} onChange={this.onInputChanged.bind(this)} autoComplete="off" />
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="movieCategory">Film Kategorisi</label>
                <select className="form-control" name="category" id="movieCategory" value={this.state.category} onChange={this.onInputChanged.bind(this)} autoComplete="off">
                  <option value="" disabled="disabled"></option>
                  <option value="Aksiyon">Aksiyon</option>
                  <option value="Macera">Macera</option>
                  <option value="Animasyon">Animasyon</option>
                  <option value="Komedi">Komedi</option>
                  <option value="Aksiyon">Bilim Kurgu</option>
                  <option value="Drama">Drama</option>
                  <option value="Korku">Korku</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="form-group col-md-6">
                <label>Resim</label>
                <input className="form-control" name="image" placeholder="Url bırakınız..." value={this.state.image} onChange={this.onInputChanged.bind(this)} autoComplete="off" />
              </div>

              <div className="form-group col-md-6">
                <label>Detay Resmi</label>
                <input className="form-control" name="imageDetail" placeholder="Url bırakınız..." value={this.state.imageDetail} onChange={this.onInputChanged.bind(this)} autoComplete="off" />
              </div>
            </div>

            <div className="row">
              <div className="form-group col-md-6">
                <label>Film Süresi</label>
                <input className="form-control" name="duration" placeholder="örn: 125 Dakika" value={this.state.duration} onChange={this.onInputChanged.bind(this)} autoComplete="off" />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="releaseDate">Yayınlanma Tarihi</label>
                <input className="form-control" name="releaseDate" placeholder="örn: 25 Nisan 2020" value={this.state.releaseDate} onChange={this.onInputChanged.bind(this)} autoComplete="off" />
              </div>
            </div>

            <div className="row">
              <div className="form-group col-md-12">
                <label>Açıklama</label>
                <textarea className="form-control" id="description" name="description" rows="3" value={this.state.description} onChange={this.onInputChanged.bind(this)}></textarea>
              </div>
            </div>

            {this.state.hasError ? <Error /> : null}
            {this.state.hasSuccess ? <Success /> : null}
            <button type="submit" className="btn btn-primary" style={{ marginBottom: "15%" }}>Film Ekle</button>
          </form>

        </div>
      </div>
    )
  }
}

export default AddMovie;