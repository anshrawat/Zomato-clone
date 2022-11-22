import React from 'react';
import Header from '../Common/Header';
import snack from '../../Assets/snacks.png'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import '../../Styles/Details.css'
import Modal from 'react-modal'

Modal.setAppElement('#root')
export default function RestaurantDetail() {
  
  let {rName}=useParams();
  const[restaurant,setRestaurant]=useState({})
  const[isMenuModalOpen,setIsMenuModalOpen]=useState(false)
  const[menu,setMenu]=useState([])
  const [totalPrice,setTotalPrice]=useState(0)
  const [isUserDModalOpen, setIsUserDModalOpen] = useState(false)
  const [user, setUser] = useState({name:'',email:'',contact:0})
  // useEffect is used to call api in function based component
  // second parameter is dependency array
  // if anything is passed to second array then it will behave as update function
  useEffect(() => {
    fetch(`http://localhost:6767/restaurant/details/${rName}`,{method:'GET'})
    .then(response=>response.json())
    .then(data=>{setRestaurant(data.data);console.log(data.data)})
  }, []) //behave like component didMount if second parameter in blank array
  
  const fetchMenu=()=>{
    fetch(`http://localhost:6767/menu/${rName}`,{method:'GET'})
    .then(response=>response.json())
    .then(data=>{setMenu(data.data)})
  }

  const calTotalPrice=(item)=>
  {
    let price=totalPrice + item.itemPrice;
    console.log("price ",price)
    setTotalPrice(price)
    console.log(totalPrice)
  }
  
  const loadScript=(src)=>{
    return new Promise((resolve)=>{
          const script=document.createElement("script");
          script.src=src;
          script.onload=()=>{
            resolve(true)
          }
          script.onerror=()=>{
            resolve(false)
          }
          document.body.appendChild(script)
    })
  }

  const openRazorpay=async()=>{
    try{
      //create order in razorpay by calling backend api
    let orderData;
    orderData=await fetch('http://localhost:6767/pay',{
      method:'POST',
      headers:{'Content-type':'application/json'},
      body:JSON.stringify({amount:totalPrice})
    }).then(resp=>resp.json())
      
    //console.log(orderData)
  
    //open razorpay window
      const options={
      key:"rrzp_test_fYlC1BfUGkXmsn",
      name:"zomato food delivery app",
      amount:orderData.amount,
      currency:orderData.currency,
      order_id:orderData.id,
      prefill:{
         email:'hahiri5791@shbiso.com',
         contact:'202-555-0183'
      },
      handler:function(response){
        //console.log(response)
        //call api that would save transaction in db
        fetch('http://localhost:6767/pay/save',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            razorpay_order_id:response.razorpay_order_id,
            razorpay_payment_id:response.razorpay_payment_id,
            razorpay_signature:response.razorpay_signature,
            razorpay_amount:orderData.amount
          })
        }).then(resp=>console.log(resp))
      }
    }

      const paymentWindow=new window.Razorpay(options);
     
      paymentWindow.open();
    }catch(error){
      console.log(error);
    }
  }
  const{name,thumb,cost,address,Cuisine}=restaurant
  let cuisineList= !(Cuisine==undefined) && Cuisine.length && Cuisine.map((item)=><div className='value' key={item.name}>{item.name}</div>)

  return (
    <div className='background'>
      <Header/>
      <div>
      <img src={thumb} alt="snacks" height="500px" width="100%" />
      </div>
      <div className='heading'>
         <h2>{name}</h2>
         <button className='btn btn-danger' 
                 style={{ float: 'right', backgroundColor: '#ce0505' }} 
                 onClick={()=>{
                    setIsMenuModalOpen(true);
                    fetchMenu();}}>
                 Place Online Order
          </button>
      </div>
      <div>
      <Tabs>
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Contact</Tab>
        </TabList>
        <TabPanel>
           <div className='about'>About the place</div>
           <div className='head'>Cuisine</div>
               {cuisineList}
           <div className="head">Average Cost</div>
           <div className="value">&#8377; {cost}</div>
        </TabPanel>
        
        <TabPanel>
           <div className="head">Phone Number</div>
           <div className="value">+91-123456789</div>
           <div className="head">{name}</div>
           <div className="value">{address}</div>
        </TabPanel>
      </Tabs>
      </div>
      
      <div>
        <Modal isOpen={isMenuModalOpen}>
           <div>
              <div className='row'>
                  <div className="col-sm-9">
                      <h2>Menu</h2>
                  </div>
                  <div className="col-sm-3">
                      <button className='btn btn-danger float-end' onClick={()=>setIsMenuModalOpen(false)}>X</button>
                  </div>
              </div>
              <ul>
                {
                  menu.length && menu.map((item,index)=><li key={index}>
                         <div>
                          {
                            item.isVeg ? <span className='text-success'>Veg</span>:<span className='text-danger'>Non-veg</span>
                          }
                         </div>
                         <div className='cuisines'>{item.itemName}</div>
                         <div className='cuisines'>&#8377;{item.itemPrice}</div>
                         <div className='cuisines'>{item.itemDescription}</div>
                         <div className="btn btn-secondary" onClick={()=>calTotalPrice(item)}>Add</div>
                  </li>)
                }
              </ul>
              <hr />
              <div>
                 <h3>Total Price:{totalPrice}</h3>
                 <button onClick={()=>{setIsMenuModalOpen(false);setIsUserDModalOpen(true);loadScript('https://checkout.razorpay.com/v1/checkout.js');openRazorpay();}}>Pay Now</button>
              </div>
           </div>
        </Modal>
      </div>
      
    </div>
  );
}
