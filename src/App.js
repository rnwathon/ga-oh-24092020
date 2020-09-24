import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';

// Pages
import Home from './Pages/Home/Home';
import Detail from './Pages/Detail/Detail';

function App() {
  return (
    <>
      <Navbar color="dark" dark expand="md" className="mb-3">
        <NavbarBrand href="/">TV Series</NavbarBrand>
      </Navbar> 
      <Router>
        <Switch>
          {/* Home Page: Nampilin semua tv series */}
          <Route path="/" component={Home} exact />
          {/* Detail Page: nampilin detail dari tv seriesnya */}
          <Route path="/detail" component={Detail} />
          {/* 404 Page */}
          <Route render={() => "404"} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
