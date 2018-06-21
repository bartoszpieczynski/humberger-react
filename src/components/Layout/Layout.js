import React, { Component } from "react";
import Wrapper from "../../hoc/Wrapper";
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from "./Layout.css";
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';


class Layout extends Component {
   
   state = {
      showSideDrawer: false
   }

   sideDrawerClosedHandler = () => {
      this.setState({showSideDrawer: false})
   }

   sideDrawerHandler = () => {
      let isShown = this.state.SideDrawer;
      this.setState({showSideDrawer: !isShown})
   }

   render () {
      return (
        <Wrapper>
           <Toolbar show={this.sideDrawerHandler}/>
           <SideDrawer 
            closed={this.sideDrawerClosedHandler}
            open={this.state.showSideDrawer} />
           <main className={classes.Content}>
              {this.props.children}
           </main>
        </Wrapper>
     );
   }
}
   

export default Layout;
