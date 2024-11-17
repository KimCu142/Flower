import { Component } from 'react'
import { Orchids } from '../Orchids';
import Content from './Content';
export class MainContent extends Component {
  constructor(){
    super();
    this.state={
orchids: Orchids,
    };
  }
  
    render() {
    return<Content orchids={this.state.orchids}/> 

    
  }
}
export default MainContent;
