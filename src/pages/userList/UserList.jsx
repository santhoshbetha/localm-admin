import "./userList.css";
import { DataGrid } from  '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { cities } from "../cities";
import { useFormik } from 'formik';
import Spinner from 'react-bootstrap/Spinner';
import axios  from "axios";
import { url } from "../../api";
import { UserListDataContext } from "../../context/userContext/UserContext";

const getCity = (stateIn) => cities.filter(function (city) {
  //  return city.state === "Maharashtra";
    return city.state === stateIn;
}).map( (city, idx) => {
    return <option key={idx}
            value={city.name}>{city.name} 
           </option>;
})

export default function UserList() {
    //const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const {userListData, setUserListData} = useContext(UserListDataContext);

    let newdata = [];
 
    async function getusers(state, city) {
      console.log('GET USERS:' , state, city)
      try {
          const resp = await axios.post(`${url}/getusers`,
                                        {
                                          state: state,
                                          city: city
                                        })
          console.log("resp:", resp.data.data.userdata, resp.data.data.userdata.length)
          
         
          for (var i = 0; i < resp.data.data.userdata.length; i++) {
            //console.log(myStringArray[i]);
            newdata.push({...resp.data.data.userdata[i], id: i})
            //Do something
          }

          console.log("newdata::", newdata)
          
          //await setData(newdata);
          await setUserListData(newdata);
      } catch (error) {
        setUserListData([])
      }
      setLoading(false)
    }

    const handleDelete = (id) => {
      setUserListData(userListData.filter((item) => item.id !== id));
    };

    const columns = [
        { field: "userid", 
          headerName: "Userid", 
          width: 90,
          renderCell: (params) => {
            return (
              <div className="userListUser">
                {params.row.userid}
              </div>
            );
          },
        },
        {
          field: "firstname",
          headerName: "First Name",
          width: 120,
          renderCell: (params) => {
            return (
              <div className="userListUser">
                {params.row.firstname}
              </div>
            );
          },
        },
        { 
          field: "email", 
          headerName: "Email", 
          width: 200 
        },
        {
          field: "adharverified",
          headerName: "Verified Status",
          width: 100,
        },
        {
          field: "phonenumber",
          headerName: "Phone Number",
          width: 160,
        },
        {
          field: "action",
          headerName: "Action",
          width: 150,
          renderCell: (params) => {
            return (
              <>
                <Link to={"/user/" + params.row.id}
                  state={{ userdata: params.row }}
                >
                  <button className="userListEdit">
                    Edit
                  </button>
                </Link>

                <DeleteOutline
                  className="userListDelete"
                  onClick={() => handleDelete(params.row.id)}
                />
              </>
            );
          },
        },
    ];

    const formik = useFormik({
      initialValues: {
          state: "",
          city: "",
      },
    });

    const handleSubmit = async (e) => {
      e.preventDefault()
      console.log("formik values", formik.values);
      setLoading(true)
      getusers (formik.values.state, formik.values.city);
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
      <div className="container2">
          <>
          <form className="mt-2" onSubmit={handleSubmit}>
             <div className="row">
               <div className="control-group col-md-4">
                    <label className="control-label">State or Union territory</label>
                    <div className="controls">
                        <select className="custom-select d-block w-100 form-control"
                        name="state"
                        required
                        value={formik.values.state}
                        onChange={e => {
                            formik.handleChange(e) 
                          // formik.values.state = e.target.value
                        }}
                        >
                            <option value="">Choose...</option>
                            <option>Andaman and Nichobar Islands</option>
                            <option>Andhra Pradesh</option>
                            <option>Arunachal Pradesh</option>
                            <option>Assam</option>
                            <option>Bihar</option>
                            <option>Chandigarh</option>
                            <option>Chhattisgarh</option>
                            <option>Dadra and Nagar Haveli and Daman and Diu</option>
                            <option>Delhi</option>
                            <option>Goa</option>
                            <option>Gujarat</option>
                            <option>Haryana</option>
                            <option>Himachal Pradesh</option>
                            <option>Jammu and Kashmir</option>
                            <option>Jharkhand</option>
                            <option>Karnataka</option>
                            <option>Kerala</option>
                            <option>Ladakh</option>
                            <option>Lakshadweep</option>
                            <option>Madhya Pradesh</option>
                            <option>Maharashtra</option>
                            <option>Manipur</option>
                            <option>Meghalaya</option>
                            <option>Mizoram</option>
                            <option>Nagaland</option>
                            <option>Odisha</option>
                            <option>Puducherry</option>
                            <option>Punjab</option>
                            <option>Rajasthan</option>
                            <option>Sikkim</option>
                            <option>Tamil Nadu</option>
                            <option>Telangana</option>
                            <option>Tripura</option>
                            <option>Uttar Pradesh</option>
                            <option>Uttarakhand</option>
                            <option>West Bengal</option>
                        </select>
                    </div>
                </div>
                <div className="control-group col-md-4 mt-2 mt-md-0">
                    <label className="control-label">City or Nearby City</label>
                    <div className="controls">
                        <select
                            className="form-control"
                            aria-label="Floating label select example"
                            name= "city"
                            value={formik.values.city}
                            onChange={e => {
                                formik.handleChange(e)
                                //formik.values.city = e.target.value
                            }}
                            >
                            <option value="choose">
                                Choose...
                            </option>
                            {getCity(formik.values.state)}
                        </select>
                    </div>
                </div>
                <div className="control-group col-md-2 mt-2 mt-md-4">
                  <button
                      type="submit"
                      className="btn btn-info"
                  >
                      Load
                  </button>
                </div>
            </div>
          </form>
          <div className="userList mt-2">
            <DataGrid
              rows={userListData}
              disableSelectionOnClick
              columns={columns}
              pageSize={8}
              checkboxSelection
            />
          </div>
           </>
      </div>
      </>
    );
}

