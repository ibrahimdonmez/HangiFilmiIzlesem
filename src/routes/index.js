// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout';
import PublicLayout from '../layouts/PublicLayout';
import PrivateLayout from '../layouts/PrivateLayout';
import Home from './Home'
import Admin from './Admin/Admin';
import AboutUs from './Pages/AboutUs';
import Movies from './Pages/Movies';
import Contact from './Pages/Contact'
import Users from './Pages/Users';
import AddMovie from './Pages/AddMovie';
import MovieList from './Pages/MovieList';
import MovieDetail from './Pages/MovieDetail';
import FeedBacks from './Pages/FeedBacks';
import FavoriteMovies from './Pages/FavoriteMovies';

export const createRoutes = (store) => ({
  component   : CoreLayout,
  childRoutes : [
    {
      path        : '/',
      component : PublicLayout,
      indexRoute  : Home,
      childRoutes : [
        {
          path : "/hakkimizda",
          component : AboutUs
        },
        {
          path : "/FilmListesi",
          component : MovieList,
        },
        {
          path : "/iletisim",
          component : Contact
        },
        {
          path : "/FilmDetayi",
          component : MovieDetail
        },
        {
          path : "/Favoriler",
          component : FavoriteMovies
        }
      ]
    },
    {
      path: '/Admin',
      component : PrivateLayout,
      indexRoute : {
        component : Admin
      },
      childRoutes : [
        {
          path : "/Admin/hakkimizda",
          component : AboutUs
        },
        {
          path : "/Admin/Filmler",
          component : Movies
        },
        {
          path : "/Admin/FilmListesi",
          component : MovieList
        },
        {
          path : "/Admin/iletisim",
          component : Contact
        },
        {
          path : "/Admin/Kullanicilar",
          component : Users
        },
        {
          path : "/Admin/FilmEkle",
          component : AddMovie
        },
        {
          path : "/Admin/FilmDetayi",
          component : MovieDetail
        },
        {
          path : "/Admin/GeriBildirimler",
          component : FeedBacks
        }
      ]
    }
  ]
})

export default createRoutes