import SplashScreen from './SplashScreen';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Home from './Home';
import Menu from './Menu';
import Checkout from './Checkout';
import Payment from './Payment';

// Named exports tetap tersedia (opsional)
export { SplashScreen, SignIn, SignUp, Home, Payment, Menu, Checkout };

// Default export object supaya bisa di-import sebagai one default
export default {
  SplashScreen,
  SignIn,
  SignUp,
  Home,
  Payment,
  Menu,
  Checkout,
};