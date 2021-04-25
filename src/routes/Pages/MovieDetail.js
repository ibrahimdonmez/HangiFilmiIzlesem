import React from 'react'
import * as Http from 'utils/http.helper'
import jwt from 'jsonwebtoken';

class MovieDetail extends React.Component {

  constructor() {
    super();

    this.state = {
      MovieDetail: [],
      MovieHeader: [],
      Comments: [],
      comment: "",
      hasError: false,
      hasSuccess: false,
      errorMessage: "",
      successMessage: ""
    }
  }

  commentChanged(e) {
    this.setState({
      comment: e.target.value
    })
  }

  onAddComment(userName, e) {

    if (this.state.comment === "") {
      this.setState({
        hasError: true,
        hasSuccess: false,
        errorMessage: "Lütfen yorum kısmını boş bırakmayın."
      })
      return;
    }

    const Comment = {
      movieid: this.state.MovieDetailList._id,
      user: userName,
      comment: this.state.comment
    }
    Http.post('Comments/addComment', Comment)
      .then(res => {

        if (!res.durum) {

          this.setState({
            hasError: !res.durum,
            hasSuccess: res.durum,
            errorMessage: "Bilinmeyen bir hata oluştu."
          })
        }

        if (res.durum) {
          this.setState({
            hasError: !res.durum,
            hasSuccess: res.durum,
            successMessage: "Yorum başarıyla eklendi"
          })
          window.location.reload(false);
        }
      });

  }

  onDeleteCommentClick(_id, e) {
    const Comment = {
      _id: _id
    }

    Http.post('Comments/deleteComment', Comment).then(res => {
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

  componentDidMount() {
    // HTTP Call
    debugger;
    const movie = {
      movieName: this.props.location.state.movieName,
      _id: this.props.location.state.movieID
    }
    Http.post('MovieDetail/getMovieDetail', movie).then(res => {
      if (res.durum) {
        debugger;
        this.setState({
          MovieDetail: res.data
        })
        
      }

      if (!res.durum) {
        this.setState({
          hasError: !res.durum,
          errorMessage: res.message
        })
      }
    });

    Http.post('Movies/getMovieDetail', movie).then(res => {
      debugger;
      if (res.durum) {
        this.setState({
          MovieHeader: res.data
        })
        
      }

      if (!res.durum) {
        this.setState({
          hasError: !res.durum,
          errorMessage: res.message
        })
      }
    });

    Http.post('Comments/getComments', movie).then(res => {
      if (res.durum) {
        this.setState({
          Comments: res.data,
        })

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
      <div className="home-container">
        <div className="container">
          <div className="card" style={{ marginTop: "4%" }}>
            <div className="card-img-container">
              <img src={this.state.MovieDetail.imageURL} className="rounded mx-auto d-block" width="100%" alt="..."></img>
              <div className="card-img-overlay">
                <p className="card-text">{this.state.MovieHeader.movieName}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-9">
                <p className="card-text">
                  {this.state.MovieDetail.description}
                </p>
              </div>
              <div className="col-md-3"></div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="movie-detail">
                  <h3> Film Süresi</h3>
                  <p> {this.state.MovieHeader.duration} Dakika</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="movie-detail">
                  <h3> Kategori </h3>
                  <p> {this.state.MovieHeader.category} </p>
                </div>
              </div>
              <div className="col-md-3">  </div>
            </div>
            <div className="card" style={{ paddingRight: "5%" }}>
              <div className="card-body text-center">
                <h4 className="card-title">Yorumlar ( {this.state.Comments.length} )</h4>
              </div>
              <div className="comment-widgets">
                {this.state.Comments.length == 0 ?
                  <div className="d-flex flex-row comment-row m-t-0">
                    <div className="comment-text w-100">
                      <span className="m-b-15 d-block" style={{ marginLeft: "5%" }}>Henüz yorum yapan olmamış. İlk yorumu siz yapın! </span>
                    </div>
                  </div>
                  :
                  this.state.Comments.map((comment, index) => {
                    return (
                      <div className="d-flex flex-row comment-row m-t-0" key={comment._id} style={{ marginTop: "3%" }}>
                        <div className="p-2"><img src={require("../../styles/images/user.png")} alt="user" width="50" className="rounded-circle" /></div>
                        <div className="comment-text w-100">
                          <h6 className="font-medium">{comment.userName}</h6> <span className="m-b-15 d-block">{comment.Comment} </span>
                          <div className="comment-footer">
                            <span className="text-muted float-right">{comment.dateCreated.substr(0, 10)}</span>
                            {decodedUser.userRole == 0 ?
                            
                              <button type="button" className="btn btn-danger btn-sm" style={{ marginTop: "1%" }} onClick={this.onDeleteCommentClick.bind(this, comment._id)}>Sil</button>
                              :
                              ""
                            }

                          </div>
                        </div>
                      </div>
                    );
                  })}

              </div>
            </div>
            <div className="container" style={{ marginTop: "3%" }}>
              <div className="row">
                <div className="col-md-12 col-md-offset-3">
                  <div className="panel panel-info">
                    <div className="panel-body">
                      {decodedUser.userName == null ?
                        <textarea placeholder="Yorum yapmak için giriş yapmalısınız!" style={{width:"40%"}} disabled className="pb-cmnt-textarea" value={this.state.comment} onChange={this.commentChanged.bind(this)}></textarea>
                        :
                        <div>
                          <textarea placeholder="Yorum yap" className="form-control" value={this.state.comment} onChange={this.commentChanged.bind(this)}></textarea>
                          <form className="form-inline" style={{ margin: "0px" }}>
                            <button className="btn btn-primary pull-right" type="button" onClick={this.onAddComment.bind(this, decodedUser.userName)}>Paylas</button>
                          </form>
                        </div>
                      }

                      {this.state.hasError ? <div className="alert alert-danger" style={{ width: "516px", marginRight: "auto", "marginTop": "20px" }}> {this.state.errorMessage} </div> : null}
                      {this.state.hasSuccess ? <div className="alert alert-success" style={{ width: "516px", marginRight: "auto", "marginTop": "20px" }}> {this.state.successMessage} </div> : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}
export default MovieDetail;
