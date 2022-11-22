import React, { Component } from 'react'
import Mealtype from './Mealtype';
import '../../Styles/Wallpaper.css'
export default class Quicksearch extends Component {

   constructor(){
      super();
      this.state={
         mealtypes:[]
      };
   }
   componentDidMount(){
      fetch('http://localhost:6767/mealtype',{method:'GET'})
      .then(response=>response.json())
      .then(data=>this.setState({mealtypes:data.data}))
   }


  render() {
   let quickSearchList=this.state.mealtypes.length && this.state.mealtypes.map((item)=><Mealtype item={item} key={item.name}></Mealtype>)
    return (
      <div>
          <div className="quickSearch">
             <p className="quicksearchHeading">
                Quick Searches
             </p>
             <p className="quicksearchSubheading">
                Discover restaurants by type of meal
             </p>
             <div className="container-fluid">
                <div className="row">
                    {quickSearchList}
                </div>
             </div>
          </div>
      </div>
    )
  }
}
