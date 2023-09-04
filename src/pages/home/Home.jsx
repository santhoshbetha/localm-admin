
import "./home.css";
import { useEffect,  useState } from "react";
import axios from "axios";

export default function Home() {
  const [userData, setUserData] = useState("");

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./login";
  };

  useEffect(() => {
    console.log("useeffect home 1")
    fetch("http://localhost:7700/adminUserData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("userData:", data);
        setUserData(data.data);

        if (data.data == "token expired") {
         // alert("Token expired login again");
          console.log("Token expired login again")
          window.localStorage.clear();
          window.location.href = "./login";
        }
      });
  }, []);

  return (
    <div className="home">
        <div className="auth-wrapper">
            <div className="auth-inner">
                <div>
                    Name<h1>{userData?.fname}</h1>
                    Email <h2>{userData?.email}</h2>
                    <br />
                    <button
                      className="btn btn-primary"
                      onClick={logOut} 
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
}

/*
                    Name<h1>{userData.fname}</h1>
                    Email <h1>{userData.email}</h1>
*/