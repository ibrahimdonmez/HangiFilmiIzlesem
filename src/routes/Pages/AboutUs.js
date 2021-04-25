import React from 'react'

export const AboutUs = () => (
  <div className="home-container">
    <div className="aboutus-section">
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-sm-6 col-xs-12">
            <div className="aboutus">
              <h2>
                Hakkımızda
              </h2>
              <p className="aboutus-text">
                Siteyi her geçen gün dahada güncelleyerek daha fazla filme ulaşmanızı ve hoşlandığınız filmleri karşınıza çıkarmaya çalışıyoruz.
              </p>
              <p className="aboutus-text">
                En güncel filmleri sizlere gösteriyoruz.
              </p>
            </div>
          </div>
          <div className="col-md-4 col-sm-6 col-xs-12">
            <div className="aboutus-banner">
              <img src={require("../../styles/images/movieTime.jpg")} style={{marginLeft:'8%', marginTop:'8%'}} width="300px" alt=""></img>
            </div>
          </div>
          <div className="col-md-5 col-sm-6 col-xs-12">
            <div className="feature">
              <div className="feature-box">
                <div className="clearfix">
                  <div className="iconset">
                    <img src={require("../../styles/images/movie.png")} width="53px"></img>
                  </div>
                  <div className="feature-content">
                    <h4>
                      İzleyeceğin filme karar ver
                    </h4>
                    <p>
                      Bugün ne tür film izlemek istiyorsun ? 
                    </p>
                  </div>
                </div>
              </div>
              <div className="feature-box">
                <div className="clearfix">
                  <div className="iconset">
                    <img src={require("../../styles/images/search.png")} width="53px"></img>
                  </div>
                  <div className="feature-content">
                    <h4>
                      İzlenebilecek filmler
                    </h4>
                    <p>
                      İstediğin türden sana en uygun filmi bul.
                   </p>
                  </div>
                </div>
              </div>
              <div className="feature-box">
                <div className="clearfix">
                  <div className="iconset">
                    <img src={require("../../styles/images/watchingicon.png")} width="53px"></img>
                  </div>
                  <div className="feature-content">
                    <h4>
                      Filmi İzle
                    </h4>
                    <p>
                      Filmi İzlemeye Başla :)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default AboutUs;
