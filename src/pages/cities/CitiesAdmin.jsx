import "./citiesadmin.css";
import  { useState } from 'react';
import axios  from "axios";
import Spinner from 'react-bootstrap/Spinner';
import { useFormik } from 'formik';
import { cities } from "../cities";
import { url } from "../../api";

let states = ["Andaman and Nichobar Islands",
            "Andhra Pradesh",
            "Arunachal Pradesh",
            "Assam",
            "Bihar",
            "Chandigarh",
            "Chhattisgarh",
            "Dadra and Nagar Haveli and Daman and Diu",
            "Delhi",
            "Goa",
            "Gujarat",
            "Haryana",
            "Himachal Pradesh",
            "Jammu and Kashmir",
            "Jharkhand",
            "Karnataka",
            "Kerala",
            "Ladakh",
            "Lakshadweep",
            "Madhya Pradesh",
            "Maharashtra",
            "Manipur",
            "Meghalaya",
            "Mizoram",
            "Nagaland",
            "Odisha",
            "Puducherry",
            "Punjab",
            "Rajasthan",
            "Sikkim",
            "Tamil Nadu",
            "Telangana",
            "Tripura",
            "Uttar Pradesh",
            "Uttarakhand",
            "West Bengal"]

let cities2 = {
                "Maharashtra" : ["Mumbai",
                              "Pune",
                              "Nagpur",
                              "Thane",
                              "Pimpri-Chinchwad",
                              "Nashik",
                              "Kalyan-Dombivli",
                              "Vasai-Virar",
                              "Aurangabad, Maharashtra",
                              "Navi Mumbai",
                              "Solapur",
                              "Mira-Bhayandar",
                              "Bhiwandi",
                              "Amravati",
                              "Nanded",
                              "Kolhapur",
                              "Ulhasnagar",
                              "Sangli-Miraj & Kupwad",
                              "Malegaon",
                              "Jalgaon",
                              "Akola",
                              "Latur",
                              "Dhule",
                              "Ahmednagar",
                              "Chandrapur",
                              "Parbhani",
                              "Ichalkaranji",
                              "Jalna",
                              "Ambernath",
                              "Bhusawal",
                              "Panvel",
                              "Badalapur",
                              "Beed",
                              "Gondia",
                              "Satara",
                              "Barshi",
                              "Yavatmal",
                              "Achalpur",
                              "Osmanabad",
                              "Nandurbar",
                              "Wardha",
                              "Udgir",
                              "Hinganghat"
                            ],
                "Delhi": ["Delhi",
                          "New Delhi",
                          "Kirari Suleman Nagar",
                          "Sultan Pur Majra",
                          "Bhalswa Jahangir Pur",
                          "Burari",
                          "Karawal Nagar",
                          "Mustafabad",
                          "Gokal Pur",
                          "Mandoli",
                          "Dallupura",
                          "Hastsal",
                          "Nangloi Jat",
                          "Delhi Cantonment",
                          "Deoli"
                         ],
                "Karnataka"  :[ "Bangalore",
                              "Hubli–Dharwad",
                              "Mysore",
                              "Gulbarga",
                              "Mangalore",
                              "Belgaum",
                              "Davanagere",
                              "Bellary",
                              "Bijapur",
                              "Shimoga",
                              "Tumkur",
                              "Raichur",
                              "Bidar",
                              "Hospet",
                              "Gadag-Betageri",
                              "Bhadravathi",
                              "Robertsonpet",
                              "Chitradurga",
                              "Kolar",
                              "Mandya",
                              "Hassan",
                              "Udupi",
                              "Chikmagalur",
                              "Bagalkote",
                              "Ranebennur",
                              "Gangavathi"],
                "Telangana"  : ["Hyderabad",
                              "Warangal",
                              "Nizamabad",
                              "Karimnagar",
                              "Ramagundam",
                              "Secunderabad",
                              "Khammam",
                              "Nalgonda",
                              "Adilabad",
                              "Mahbubnagar",
                              "Suryapet",
                              "Miryalaguda"],
                "Gujarat"  : ["Ahmedabad",
                              "Surat",
                              "Vadodara",
                              "Rajkot",
                              "Bhavnagar",
                              "Jamnagar",
                              "Junagadh",
                              "Gandhidham",
                              "Nadiad",
                              "Gandhinagar",
                              "Anand",
                              "Morbi",
                              "Mehsana",
                              "Surendranagar Dudhrej",
                              "Bharuch",
                              "Vapi",
                              "Navsari",
                              "Veraval",
                              "Porbandar",
                              "Godhra",
                              "Bhuj",
                              "Botad",
                              "Patan",
                              "Palanpur",
                              "Jetpur Navagadh",
                              "Valsad",
                              "Kalol",
                              "Gondal",
                              "Deesa",
                              "Amreli"
                            ],
                "Tamil Nadu"  : ["Chennai",
                                  "Coimbatore",
                                  "Madurai",
                                  "Tiruchirappalli",
                                  "Salem",
                                  "Tirunelveli",
                                  "Ambattur",
                                  "Tiruppur",
                                  "Avadi",
                                  "Tiruvottiyur",
                                  "Thoothukudi",
                                  "Karur",
                                  "Nagercoil",
                                  "Thanjavur",
                                  "Pallavaram",
                                  "Dindigul",
                                  "Vellore",
                                  "Tambaram",
                                  "Cuddalore",
                                  "Alandur",
                                  "Kancheepuram",
                                  "Erode",
                                  "Tiruvannamalai",
                                  "Kumbakonam",
                                  "Rajapalayam",
                                  "Kurichi",
                                  "Madhavaram",
                                  "Pudukkottai",
                                  "Hosur",
                                  "Ambur",
                                  "Karaikudi",
                                  "Neyveli",
                                  "Nagapattinam"
                                ],
                "West Bengal"  : ["Kolkata",
                                  "Howrah",
                                  "Durgapur",
                                  "Asansol",
                                  "Siliguri",
                                  "Maheshtala",
                                  "Rajpur Sonarpur",
                                  "South Dum Dum",
                                  "Rajarhat",
                                  "Bhatpara",
                                  "Panihati",
                                  "Kamarhati",
                                  "Bardhaman",
                                  "Kulti",
                                  "Bally",
                                  "Barasat",
                                  "North Dum Dum",
                                  "Baranagar",
                                  "Uluberia",
                                  "Naihati",
                                  "Bidhannagar",
                                  "Kharagpur",
                                  "Malda",
                                  "Haldia",
                                  "Madhyamgram",
                                  "Berhampore",
                                  "Raiganj",
                                  "Serampore",
                                  "Hugli-Chuchura",
                                  "Midnapore",
                                  "Chandannagar",
                                  "Uttarpara",
                                  "Krishnanagar",
                                  "Barrackpore",
                                  "Santipur",
                                  "Balurghat",
                                  "Habra",
                                  "Jamuria",
                                  "Bankura",
                                  "North Barrackpur",
                                  "Raniganj",
                                  "Nabadwip",
                                  "Basirhat",
                                  "Halisahar",
                                  "Rishra",
                                  "Ashokenagar Kalyangarh",
                                  "Baidyabati",
                                  "Purulia",
                                  "Kanchrapara",
                                  "Dabgram",
                                  "Darjeeling",
                                  "Titagarh",
                                  "Dum Dum",
                                  "Champdani",
                                  "Bangaon",
                                  "Khardaha",
                                  "Jalpaiguri",
                                  "Bansberia",
                                  "Bhadreswar",
                                  "Kalyani"
                                 ],
                "Rajasthan"  : ["Jaipur",
                                  "Jodhpur",
                                  "Kota",
                                  "Bikaner",
                                  "Ajmer",
                                  "Udaipur",
                                  "Bhilwara",
                                  "Alwar",
                                  "Bharatpur",
                                  "Sikar",
                                  "Pali",
                                  "Sri Ganganagar",
                                  "Tonk",
                                  "Kishangarh",
                                  "Hanumangarh",
                                  "Beawar",
                                  "Dholpur",
                                  "Sawai Madhopur",
                                  "Churu",
                                  "Gangapur",
                                  "Jhunjhunu",
                                  "Baran",
                                  "Chittorgarh",
                                  "Hindaun",
                                  "Bhiwadi",
                                  "Bundi",
                                  "Nagaur",
                                  "Sujangarh",
                                  "Banswara"
                                ],
                "Uttar Pradesh"  : ["Lucknow",
                                  "Kanpur",
                                  "Ghaziabad",
                                  "Agra",
                                  "Meerut",
                                  "Varanasi",
                                  "Allahabad",
                                  "Bareilly",
                                  "Moradabad",
                                  "Aligarh",
                                  "Saharanpur",
                                  "Gorakhpur",
                                  "Noida",
                                  "Firozabad",
                                  "Loni",
                                  "Jhansi",
                                  "Muzaffarnagar",
                                  "Mathura",
                                  "Shahjahanpur",
                                  "Rampur",
                                  "Mau",
                                  "Farrukhabad",
                                  "Hapur",
                                  "Etawah",
                                  "Mirzapur",
                                  "Bulandshahr",
                                  "Sambhal",
                                  "Amroha",
                                  "Fatehpur",
                                  "Raebareli",
                                  "Khora, Ghaziabad",
                                  "Orai",
                                  "Bahraich",
                                  "Jaunpur",
                                  "Unnao",
                                  "Sitapur",
                                  "Faizabad",
                                  "Budaun",
                                  "Banda",
                                  "Lakhimpur",
                                  "Hathras",
                                  "Lalitpur",
                                  "Modinagar",
                                  "Deoria",
                                  "Pilibhit",
                                  "Hardoi",
                                  "Mainpuri",
                                  "Etah",
                                  "Basti",
                                  "Chandausi",
                                  "Gonda",
                                  "Akbarpur",
                                  "Khurja",
                                  "Azamgarh",
                                  "Ghazipur",
                                  "Mughalsarai",
                                  "Kanpur Cantonment",
                                  "Sultanpur",
                                  "Shikohabad",
                                  "Shamli",
                                  "Ballia",
                                  "Baraut",
                                  "Greater Noida",
                                  "Kasganj"
                                  ],
                "Madhya Pradesh"  : [ "Indore",
                                      "Bhopal",
                                      "Jabalpur",
                                      "Gwalior",
                                      "Ujjain",
                                      "Sagar",
                                      "Dewas",
                                      "Satna",
                                      "Ratlam",
                                      "Rewa",
                                      "Katni",
                                      "Singrauli",
                                      "Burhanpur",
                                      "Khandwa",
                                      "Bhind",
                                      "Morena",
                                      "Bhind",
                                      "Chhindwara",
                                      "Guna",
                                      "Shivpuri",
                                      "Vidisha",
                                      "Chhatarpur",
                                      "Damoh",
                                      "Mandsaur",
                                      "Khargone",
                                      "Neemuch",
                                      "Pithampur",
                                      "Narmadapuram",
                                      "Itarsi",
                                      "Sehore",
                                      "Chambal",
                                      "Betul",
                                      "Seoni",
                                      "Datia",
                                      "Nagda",
                                      "Dindori"],
                "Andhra Pradesh"  : ["Visakhapatnam",
                                      "Vijayawada",
                                      "Guntur",
                                      "Nellore",
                                      "Kurnool",
                                      "Kadapa",
                                      "Rajahmundry",
                                      "Kakinada",
                                      "Anantapur",
                                      "Vizianagaram",
                                      "Tenali",
                                      "Ongole",
                                      "Eluru",
                                      "Nandyal",
                                      "Machilipatnam",
                                      "Adoni",
                                      "Proddatur",
                                      "Chittoor",
                                      "Tirupati",
                                      "Hindupur",
                                      "Bhimavaram",
                                      "Madanapalle",
                                      "Guntakal",
                                      "Srikakulam",
                                      "Dharmavaram",
                                      "Gudivada",
                                      "Narasaraopet",
                                      "Tadipatri",
                                      "Kavali",
                                      "Tadepalligudem",
                                      "Amaravati"],
                "Bihar"  : ["Patna",
                              "Gaya",
                              "Bhagalpur",
                              "Muzaffarpur",
                              "Bihar Sharif",
                              "Darbhanga",
                              "Purnia",
                              "Arrah",
                              "Begusarai",
                              "Katihar",
                              "Munger",
                              "Chhapra",
                              "Danapur",
                              "Saharsa",
                              "Hajipur",
                              "Sasaram",
                              "Dehri",
                              "Siwan",
                              "Bettiah",
                              "Motihari",
                              "Kishanganj",
                              "Jamalpur",
                              "Jehanabad",
                              "Buxar",
                              "Aurangabad, Bihar"
                          ],
                "Punjab"  : ["Ludhiana",
                              "Amritsar",
                              "Jalandhar",
                              "Patiala",
                              "Bathinda",
                              "Hoshiarpur",
                              "Batala",
                              "Moga",
                              "Pathankot",
                              "Mohali",
                              "Abohar",
                              "Malerkotla",
                              "Khanna",
                              "Phagwara",
                              "Muktsar",
                              "Barnala",
                              "Firozpur",
                              "Faridkot",
                              "Kapurthala"
                            ],
                "Haryana"  : [
                              "Faridabad",
                              "Gurgaon",
                              "Rohtak",
                              "Hisar",
                              "Panipat",
                              "Karnal",
                              "Sonipat",
                              "Yamunanagar",
                              "Panchkula",
                              "Bhiwani",
                              "Ambala",
                              "Sirsa",
                              "Bahadurgarh",
                              "Jind",
                              "Thanesar",
                              "Kaithal",
                              "Rewari",
                              "Palwal",
                              "Jagadhri",
                              "Ambala Sadar"
                            ],

                "Jammu and Kashmir"  : [
                                        "Srinagar", 
                                        "Jammu",
                                        "Anantnag",
                                        "Baramulla",
                                        "Udhampur",
                                        "Pulwama",
                                        "Kupwara"
                                      ],
                "Jharkhand"  : [  "Dhanbad",
                                   "Ranchi",
                                   "Jamshedpur", 
                                    "Bokaro", 
                                    "Mango", 
                                    "Deoghar", 
                                    "Adityapur",
                                    "Phusro",
                                    "Hazaribagh",
                                    "Ramgarh", 
                                    "Medininagar",
                                    "Chas",
                                    "Giridih"
                                ],
                "Chhattisgarh"  : ["Raipur", "Bhilai", "Korba", "Bilaspur",
                                       "Durg", 
                                       "Rajnandgaon",
                                       "Raigarh",
                                       "Jagdalpur",
                                       "Ambikapur"
                                    ],
                "Chandigarh"  : ["Chandigarh"],
                "Assam": [
                                "Guwahati",
                                "Silchar",
                                "Dibrugarh",
                                "Jorhat",
                                 "Bongaigaon",
                                 "Tinsukia",
                                 "Tezpur",
                                 "Nagaon",
                                ],
                "Odisha"  : [
                             "Bhubaneswar", 
                             "Cuttack",
                             "Rourkela",
                              "Brahmapur/Berhampur", 
                              "Sambalpur",
                              "Puri",
                              "Gopalpur"
                            ],
                "Kerala"  : ["Thiruvananthapuram",
                             "Kochi",
                             "Kozhikode",
                             "Kollam", 
                             "Thrissur",
                             "Kannur",
                              "Alappuzha",
                              "Kottayam",
                              "Palakkad",
                              "Malappuram",
                              "Kanhangad"
                            ],
                "Andaman and Nichobar Islands"  : ["Port Blair"],
                "Goa": ["Vasco Da Gama"],
                "Himachal Pradesh"  : ["Shimla"],
                "Manipur"  : ["Imphal"],
                "Puducherry"  : ["Pondicherry/Puducherry", "Uzhavarkarai"],
                "Sikkim"  : ["Gangtok"],
                "Tripura"  : ["Agartala", ],
                "Uttarakhand"  : [
                                   "Dehradun",
                                   "Haridwar",
                                   "Haldwani",
                                   "Rudrapur",
                                   "Kashipur",
                                   "Roorkee",
                                   "Rishikesh",
                                   "Nainital",
                                   "Almora"
                                 ],
                "Dadra and Nagar Haveli and Daman and Diu"  : ["Dadra", "Silvassa"],
                "Arunachal Pradesh"  : ["Arunachal Pradesh"],
                "Nagaland"  : ["Nagaland"],
                "Ladakh"  : ["Ladakh"],
                "Lakshadweep": ["Lakshadweep"],
                "Mizoram"  : ["Aizawl", "Mizoram"],
                "Meghalaya" : [
                              "Shillong", 
                               "Tura",
                               "West Garo Hills" ,
                               "East Garo Hills", 
                               "Resubelpara", 
                               "Nongstoin",
                               "Mankachar"
                            ]
  }

const getCity = (stateIn) => cities.filter(function (city) {
//  return city.state === "Maharashtra";
    return city.state === stateIn;
}).map( (city, idx) => {
    return <option key={idx}
            value={city.name}>{city.name} 
            </option>;
})

export default function CitiesAdmin() {
    const [loading, setLoading] = useState(false);
    const [malecount, setMalecount] = useState(0)
    const [femalecount, setFemalecount] = useState(0)

    async function getUserCount(state, city) {
        console.log('GET USERS:' , state, city)
        try {
            const resp = await axios.post(`${url}/getusercount`,
                                            {
                                                state: state,
                                                city: city
                                            })
            console.log("resp:", resp.data.data)
            setMalecount(Number(resp.data.data.malecount))
            setFemalecount(Number(resp.data.data.femalecount))
            setLoading(false)
            
        } catch (error) {
            console.log("getcount error", error)
            setLoading(false)
        }
        setLoading(false)
    }

    async function setOnetimefees(state, city, gender, setvalue) {
        console.log('GET USERS:' , state, city)
        try {
            const resp = await axios.post(`${url}/setOnetimefees`,
                                            {
                                                state: state,
                                                city: city,
                                                gender: gender,
                                                setvalue: setvalue
                                            })
            console.log("resp:", resp.data.data)
            setLoading(false)
            alert("onetimefees set successful")
            
        } catch (error) {
            console.log("getcount error", error)
            alert("onetimefees set failed, try again")
            setLoading(false)
        }
        setLoading(false)
    }
  
    const formik = useFormik({
        initialValues: {
            state: "",
            city: "",
            gender: "",
            state2: "",
            city2: "",
            setvalue: true
        },
      });
  
    const handleSubmit1 = async (e) => {
        e.preventDefault()
        console.log("formik values", formik.values);
        setLoading(true)
        getUserCount (formik.values.state, formik.values.city);
    }

    const handleSubmit2 = async (e) => {
        e.preventDefault()
        console.log("formik values", formik.values);
        setLoading(true)
        setOnetimefees (formik.values.state2, formik.values.city2, formik.values.gender, formik.values.setvalue);
    }

    function handleOnetimefees(e) {
        e.preventDefault()
        let statee;
        let citi
        for (var statesindex = 0; statesindex < states.length; statesindex++) {
            statee = states[statesindex]
            for (citi = 0; citi < cities2[statee].length; citi++) {
               //console.log(statee, cities2[statee][citi])
            }
        }

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
                <h3 className="text-start">GET USER COUNT</h3>
                <form className="mt-2" onSubmit={handleSubmit1}>
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
                                className="btn btn-success"
                            >
                                Get User count
                            </button>
                        </div>
                    </div>
                </form>
                <div className="d-flex mt-3">
                    <div className="col-4">
                       Male Count: {malecount}
                    </div>
                    <div className="col-6">
                       Female Count: {femalecount}
                    </div>
                </div>
            </div>

            <div className="container2 mt-5">
                <h3 className="text-start">SET ONETIME FEES</h3>
                <form className="mt-2" onSubmit={handleSubmit2}>
                    <div className="row">
                        <div className="control-group col-md-3">
                            <label className="control-label">State or Union territory</label>
                            <div className="controls">
                                <select className="custom-select d-block w-100 form-control"
                                    name="state2"
                                    required
                                    value={formik.values.state2}
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
                        <div className="control-group col-md-3 mt-2 mt-md-0">
                            <label className="control-label">City or Nearby City</label>
                            <div className="controls">
                                <select
                                    className="form-control"
                                    aria-label="Floating label select example"
                                    name= "city2"
                                    value={formik.values.city2}
                                    onChange={e => {
                                        formik.handleChange(e)
                                        //formik.values.city = e.target.value
                                    }}
                                    >
                                    <option value="choose">
                                        Choose...
                                    </option>
                                    {getCity(formik.values.state2)}
                                </select>
                            </div>
                        </div>
                        <div className="control-group col-md-2 mt-2 mt-md-0">
                            <label className="control-label">Gender</label>
                            <div className="controls">
                                <select
                                    className="form-control"
                                    aria-label="Floating label select example"
                                    name= "gender"
                                    value={formik.values.gender}
                                    onChange={e => {
                                        formik.handleChange(e)
                                        //formik.values.city = e.target.value
                                    }}
                                    >
                                    <option value="">Choose...</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </div>
                        </div>
                        <div className="control-group col-md-1 mt-2 mt-md-0">
                            <label className="control-label">SET_OR_UNSET</label>
                            <div className="controls">
                                <input className="form-check-input" type="checkbox"  name="setvalue"
                                    checked={formik.values.setvalue}
                                    value={formik.values.setvalue}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </div>
                        <div className="control-group col-md-2 mt-3 mt-md-4">
                            <button
                                type="submit"
                                className="btn btn-success"
                            >
                                SET ONETIME FEES
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <div className="container2 mt-5">
               <h3 className="text-start">SET ONETIME FEES FOR ALL</h3>
               <button
                    type="submit"
                    className="btn btn-success col-3"
                    onClick={handleOnetimefees}
                >
                    SET ONETIME FEES aLL
                </button>
            </div>
        </div>
        </>
    )
}
