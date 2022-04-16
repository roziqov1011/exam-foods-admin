import './App.css'
import { useQuery, useMutation } from '@apollo/client'
import { useState } from 'react'
import { BRANCHES, COUNTRIES, MENUS, NEW_BRANCH, NEW_MENU, NEW_REGION, ORDERS, RESTARANS } from './Query'
import food from './img/food.jpg'






function App() {

const [ categoryID, setCountryID ] = useState("")
const [ restaranID, setRestaranID ] = useState("")
const [ branchID, setBranchID ] = useState("")
const { data } = useQuery(COUNTRIES)
const { data:orders } = useQuery(ORDERS)
console.log(orders);
const { data: regionData } = useQuery(RESTARANS, {
variables: { categoryID }
})

const { data: branchData } = useQuery(BRANCHES, {
variables: { restaranID }
})

const { data: menuData } = useQuery(MENUS, {
variables: { branchID }
})

const [ newRegion ] = useMutation(NEW_REGION, {
update: (cache, data) => {
console.log(data,cache)
}
})
const [ newBranch ] = useMutation(NEW_BRANCH, {
update: (cache, data) => {
  console.log(data,cache)
}
})

const [ newMenu ] = useMutation(NEW_MENU, {
update: (cache, data) => {
  console.log(data,cache)
}
})

const handleSubmit = e => {
e.preventDefault()

const { select, name } = e.target.elements

newRegion({
variables: {
name: name.value,
categoryID: select.value
}
})
}

const handleSubmitBranch = e => {
e.preventDefault()

const { select, name } = e.target.elements

newBranch({
variables: {
name: name.value,
restaranID: select.value
}
})
}

const handleSubmitMenu = e => {
e.preventDefault()

const { select, name, price } = e.target.elements

newMenu({
variables: {
name: name.value,
price: price.value-0,
branchID: select.value
}
})

console.log({name: name.value,
price: price.value-0,
branchID: select.value});


}




let categorys = document.querySelector('.categorys ')
let categorys1 = document.querySelector('.categorys1 ')
let categorys2 = document.querySelector('.categorys2 ')
let restarans = document.querySelector('.restarans')
let restarans2 = document.querySelector('.restarans2')
let formrestaurant = document.querySelector('.formrestaurant')
let formbranch = document.querySelector('.formbranch')
let formmenu = document.querySelector('.formmenu')


return (<>



  <div className="collapse" id="navbarToggleExternalContent">
    
  </div>
  <nav className="navbar navbar-dark bg-primary">
    <div className="container-fluid">
      <button className="navbar-toggler border-3 border-light text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
      <i className="bi bi-cart3"></i>
      </button>


<div className="offcanvas offcanvas-start" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
    <h4>Byurtma berilgan ovqatlar</h4>
  {orders && orders.Orders.map((e,i)=>(
     <div key={i} className="card card-body">
       <img src={food} alt="" className='card-img' />
       <h4>{e.name}</h4>
       <h4>{e.price} so'm</h4>
     </div>
   ))}
  </div>
</div>
      <h2>🧑‍✈️ Admin panel </h2>
    </div>
   
  </nav>

 <div className='add-wrap'>
 <div className='btn-wrap'>
  <button onClick={()=>{formrestaurant.style.display = 'block'; formbranch.style.display = 'none'; formmenu.style.display = 'none'}} className='btn btn-primary btnrestaurant'>+ Add restaurant</button>
  <button onClick={()=>{formrestaurant.style.display = 'none'; formbranch.style.display = 'block'; formmenu.style.display = 'none'}} className='btn btn-primary btnbranche'>+ Add branche</button>
  <button onClick={()=>{formrestaurant.style.display = 'none'; formbranch.style.display = 'none'; formmenu.style.display = 'block'}} className='btn btn-primary btnmenu'>+ Add menu</button>
  </div>
  <div className='d-flex wrap-form'>
    <form className='w-25 p-50 mt-3 formrestaurant' onSubmit={handleSubmit}>
      <i>Category</i>
      <select className='form-control mb-3 categorys' name='select' onChange={()=> setCountryID(categorys.value)} required>
        <option value={"default_value"} hidden={true}>Choose</option>
        {
        data && data.categorys.map((e, i) => (
        <option key={i} value={e.id}>{e.name}</option>
        ))
        }
      </select>
      <input className='form-control mb-3' name='name' type="text" placeholder="restarans" autoComplete='off' required />
      <button className='btn btn-primary' type='submit'>save</button>
    </form>

    <form className='w-25 p-50 mt-3 formbranch' onSubmit={handleSubmitBranch}>
    <i>Category</i>
      <select className='form-control mb-3 categorys1' name='select1' onChange={()=> setCountryID(categorys1.value)} required>
        <option value={"default_value"} hidden={true}>Choose</option>
        {
        data && data.categorys.map((e, i) => (
        <option key={i} value={e.id}>{e.name}</option>
        ))
        }
      </select>
    <i>Restaurant</i>
      <select className='form-control mb-3 restarans' name='select' onChange={()=> setRestaranID(restarans.value)} required>
        <option value={"default_value"} hidden={true}>Choose</option>
        {
        regionData && regionData.Restarans.map((e, i) => (
        <option key={i} value={e.id}>{e.name}</option>
        ))
        }
      </select>
      <input className='form-control mb-3' name='name' type="text" placeholder="branches" autoComplete='off'required />
      <button className='btn btn-primary' type='submit'>save</button>
    </form>

    <form className='w-25 p-50 mt-3 formmenu' onSubmit={handleSubmitMenu}>
    <i>Category</i>
      <select className='form-control mb-3 categorys2' name='select1' onChange={()=> setCountryID(categorys2.value)}required>
        <option value={"default_value"} hidden={true}>Choose</option>
        {
        data && data.categorys.map((e, i) => (
        <option key={i} value={e.id}>{e.name}</option>
        ))
        }
      </select>
    <i>Restaurant</i>
      <select className='form-control mb-3 restarans2' name='select1' onChange={()=> setRestaranID(restarans2.value)} required>
        <option value={"default_value"} hidden={true}>Choose</option>
        {
        regionData && regionData.Restarans.map((e, i) => (
        <option key={i} value={e.id}>{e.name}</option>
        ))
        }
      </select>
      <i>Menu</i>
      <select className='form-control mb-3' name='select' required>
        <option value={"default_value"} hidden={true}>Choose</option>
        {
        branchData && branchData.Branches.map((e, i) => (
        <option key={i} value={e.id}>{e.name}</option>
        ))
        }
      </select>
      <input className='form-control mb-3' name='name' type="text" placeholder="Food" autoComplete='off' required/>
      <input className='form-control mb-3' name='price' type="number" placeholder="Price" autoComplete='off' required/>
      <button className='btn btn-primary' type='submit'>save</button>
    </form>
  </div>
 </div>

  <div className='card-wrap'>


    <div className='card-list'>
      {
      data && data.categorys.map((e, i) => (
      <div onClick={()=> setCountryID(e.id)} key={i} className="card" >
        <div className="card-body">
          <h5 className="card-title">{e.name}</h5>
          <button href="#" className="btn btn-primary">{e.name}</button>
        </div>
      </div>
      ))
      }
    </div>

    <div className='card-list'>
    {
    regionData && regionData.Restarans.map((e, i) => (
    <div onClick={()=> setRestaranID(e.id)}  key={i} className="card">
     <div className="card-body">
          <h5 className="card-title">{e.name}</h5>
          <button href="#" className="btn btn-primary">{e.name}</button>
        </div>
    </div>
    ))
    }
    </div>

    <div className='card-list'>
    {
    branchData && branchData.Branches.map((e, i) => (
    <div key={i}  onClick={()=> setBranchID(e.id)}  className="card">
      <div className="card-body">
          <h5 className="card-title">{e.name}</h5>
          <button  href="#" className="btn btn-primary">{e.name}</button>
        </div>
    </div>
    ))
    }
    </div>

    <div className='card-list'>
    {
    menuData && menuData.Menus.map((e, i) => (
    <div  key={i} className="card">
      <div className="card-body">
          <button className="btn btn-primary">{e.name}</button>
          <p href="#" className=" mt-3">{e.price } so'm</p>
        </div>
    </div>
    ))
    }
    </div>
  </div>

</>)
}

export default App