
import './App.css';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/auth/Auth';
import Layout from './components/Layout';
import Home from './components/Pages/Home';
import Profile from './components/Pages/Profile';
import Blog from './components/Pages/Blog';
import Contact from './components/Pages/Contact';
import About from './components/Pages/About';
import Users from './components/Pages/Users';
import EditUser from './components/Pages/EditUser';
import Posts from './components/Pages/Posts';
import AddEditUserPosts from './components/Pages/AddEditUserPosts';
import SignUp from './components/SignUp';
import NotFound from './components/Pages/NotFound';
import { SessionProvider, useSession } from './components/auth/SessionContext';
import AutoNavigate from './components/Pages/AutoNavigate';


const App = () => {

  const loginId = sessionStorage.getItem('userId');
  const { userId } = useSession();

  const id = loginId === 0 ? userId : loginId;

  console.log("userId ", id);
  console.log("loginId ", loginId);

  let routes;

  if (id === "0") {

    routes = <BrowserRouter>
      
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

    </BrowserRouter>
  } else {
    routes = (<BrowserRouter>
      
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/users' element={<Users />} />
        <Route path='/editUser/:userId' element={<EditUser />} />
        <Route path='/posts' element={<Posts />} />
        <Route path='/addEditUserPost' element={<AddEditUserPosts />} />
        <Route path='/addEditUserPost/:postId' element={<AddEditUserPosts />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>)
  }

  return (
    <>
      <AuthProvider>
        <div className='App'>
          {routes}
        </div>
      </AuthProvider>
    </>

  );
};

export default App;
