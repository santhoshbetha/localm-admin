import "./search.css";
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios  from "axios";
import Spinner from 'react-bootstrap/Spinner';
import { url } from "../../api";

function numberInRange(num, low, high) {
    if (num > low && num < high) {
      return true;
    }
    return false;
}

function isObjEmpty(val){
    return (val == null || val.length <= 0 ||
            (Object.keys(val).length === 0 && val.constructor === Object)
           ) ? true : false;
};
  

export default function Search() {
    const navigate = useNavigate();
    const [searchtext, setSearchtext] = useState("")
    const [userdata, setUserdata] = useState({});
    const [loading, setLoading] = useState(false);

    async function searchuser(searchtext) {
        console.log('SEARCH USER:' , searchtext, url)
        try {
            const resp = await axios.get(`${url}/adminquery/?search=${searchtext}`)//TODO
            console.log("resp?.data?.data.userdata::", resp?.data?.data.userdata)
            await setUserdata(resp?.data?.data.userdata);
        } catch (error) {
            setUserdata({})
            alert('There was an error while retrieving the user')
        }
        setLoading(false);
      }

  const handleSearchSubmit = async (e) => {
        e.preventDefault()
        console.log("searchtext:", searchtext)
        
        var phoneregex = /^\d{10}$/;
        var emailregex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        var useridregex = /^\d{5,7}$/;
        if (searchtext.match(emailregex) || searchtext.match(phoneregex) || 
         (searchtext.match(useridregex) && numberInRange(Number(searchtext), 33333, 1033333)))
      //  if (searchtext.match(emailregex) || searchtext.match(phoneregex)) 
        {
          setLoading(true)
          await searchuser(searchtext)
        } else {
          console.log("invalid email or phone");
        }
        setSearchtext("")
  }
  return (
    <>
    {loading && (
        <div className='container2 show popup2'>
            <Spinner animation="border border-sm text-primary" role="status" >
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )}
    <div className=" w-100">
        <div className="container2">
            <div className="card d-flex align-items-center">
                <div className="card-header text-center fs-4 text-uppercase">
                    Search User
                </div>
                <div className="card-body">
                    <form className="" onSubmit={handleSearchSubmit}>
                        <div className="mb-4">
                            <label htmlFor="text" className="form-label mb-0">Email or Phone or UserId</label>
                            <input type="text" 
                            className="form-control border-bottom" 
                            name="searchtext" placeholder=""
                            value={searchtext}
                            onChange={(e) => setSearchtext(e.target.value)}
                            autoFocus
                            />
                        </div>
                        <div className="d-flex">
                            <button className="btn btn-outline-primary"
                            onClick={(e)=> {
                                e.preventDefault();
                                navigate(-1)
                            }}
                            >
                                Cancel
                            </button>
                            <button 
                            className="btn btn-primary ms-auto"
                            type="submit" 
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {(userdata == undefined) && (
                <div className="alert alert-warning" role="alert">
                Nothing found
                </div>
             )}
            {!isObjEmpty(userdata) &&
            <div className="mt-3 d-flex align-items-justify gap-3">
                <div className="col-6 border border-1">
                    <p><span className="text-info">UserId: </span>{userdata.userid}</p>
                    <p><span className="text-info">Name:</span> {userdata.firstname},  {userdata.lastname} </p>
                    <p><span className="text-info">Age:</span> {userdata.age} </p>
                    <p><span className="text-info">Gender:</span> {userdata.gender}</p>
                    <p><span className="text-info">Email:</span> {userdata.email}</p>
                    <p><span className="text-info">Phone:</span> {userdata.phonenumber}</p>
                    <p><span className="text-info">location:</span> {userdata.city}, {userdata.state}</p>
                    <p><span className="text-info">community:</span> {userdata.community}, {userdata.religion}</p>
                    <p><span className="text-info">co-ordinates:</span> {userdata.latitude}, {userdata.longitude}</p>
                </div>
                <div className="col-6 border border-1">
                    <p>Addons</p>
                    <p><span className="text-info">CommunitSearch:</span> {userdata.addons.communitySearch ? 'Yes' : 'No'}</p>
                    <p><span className="text-info">FullcitySearch:</span> {userdata.addons.fullcitySearch ? 'Yes' : 'No'}</p>
                    <p><span className="text-info">Location2:</span> {userdata.addons.location2.lat}, {userdata.addons.location2.lng}</p>
                    <p><span className="text-info">City2:</span> {userdata.addons.location2.city2}, <span className="text-info">State2:</span> {userdata.addons.location2.state2}</p>
                    <p><span className="text-info">Location3:</span> {userdata.addons.location3.lat}, {userdata.addons.location3.lng}</p>
                    <p><span className="text-info">City3:</span> {userdata.addons.location3.city3}, <span className="text-info">State2:</span> {userdata.addons.location3.state3}</p>
                    <p>Subscription Info</p>
                </div>
            </div>
            }
        </div>
    </div>
    </>
  )
}

