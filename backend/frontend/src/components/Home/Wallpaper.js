import React, { Component } from 'react'
import homepage from '../../Assets/background.png'
import '../../Styles/Wallpaper.css'
import {Link} from 'react-router-dom'

export default class Wallpaper extends Component {

  constructor(){
    super();
    this.state={
      locations:[],
      restaurants:[]
    }
    console.log("wallpaper constructor is called...")
  }

  componentDidMount(){
    console.log("wallpaper componentDidMount is called...")
    //call api here
    fetch('http://localhost:6767/location',{method:'GET'})
    .then(response=>response.json())
    .then(data=>this.setState({locations:data.data}))
 }

  fetchRestaurants=(event)=>{
    console.log(event.target.value)
    fetch(`http://localhost:6767/restaurant/${event.target.value}`,{method:'GET'})
    .then(response=>response.json())
    .then(data=>this.setState({restaurants:data.data}))
  }
  static getDerivedStateFromProps(props,state){

     console.log("getDerivedStateFromProps constructor is called...")
     return{}
  }

  shouldComponentUpdate(){
    return true;
  }

  getSnapshotBeforeUpdate(prevProps,prevState){
    console.log(`getSnapshotBeforeUpdate is called with prev props:${prevProps} and prev state:${prevState.locations}`)
    return null;
  }

  componentDidUpdate(){
    console.log("wallpaper componentDidUpdate is called.....")
  }

  
  render() {

    let locationOptions=this.state.locations.length && this.state.locations.map((item)=><option key={item.name} value={item.city_id}>{item.name}</option>)
    let restaurantsList=this.state.restaurants.length && <ul>{
                        this.state.restaurants.map((item)=>
                             <li key={item.name}>
                                 <Link to={`/details/${item.name}`}>{item.name}</Link>
</li>)}
    </ul>
    console.log("wallpaper render is called...")
    return (
    <div>
      <img src={homepage} alt="" width="100%" height="450"/>
      <div className="logo">
        <p>e!</p>
      </div>
      <div className='headings'>
        Find the best restaurants, cafes, bars
      </div>
      <div className='locationSelector'>
           <select className='locationDropdown' onChange={this.fetchRestaurants}>
              <option value="0">Select</option>
                {locationOptions}
           </select>
           <div id="notebooks">
              <input type="text" className="restaurantsinput" placeholder='search restaurants'/>
                {restaurantsList}
           </div>
      </div>
    </div>
    )
  }
}
