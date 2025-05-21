import pic from "../components/images/pic.png";
import React, { useState, useEffect } from 'react';


export function Settings() {
  const [activeDiv, setActiveDiv] = useState("");
  const [loginHistory, setLoginHistory] = useState([]);
  useEffect(() => {
    setLoginHistory([
      { date: '2025-05-01', time: '10:30 AM', device: 'Chrome - Windows' },
      { date: '2025-05-02', time: '02:15 PM', device: 'Firefox - MacOS' },
      { date: '2025-05-03', time: '06:50 PM', device: 'Edge - Windows' }
    ]);
  }, []);
 


  //design
  const sidebarButtonStyle = (buttonName) => ({
    padding: '10px 20px',
    backgroundColor: activeDiv === buttonName ? '#003366' : 'white',
    color: activeDiv === buttonName ? 'white' : '#003366',
    border: '1px solid #003366',
    borderRadius: '6px',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'center',
    marginBottom: '10px',
    fontWeight: 'bold',
  });


  const tableHeaderStyle = {
    padding: '12px',
    fontWeight: 'bold',
    textAlign: 'left',
    borderBottom: '2px solid #ccc',
    color: '#003366'
  };
 
  const tableCellStyle = {
    padding: '12px',
    borderBottom: '1px solid #ddd',
  };
 
  const logoutButtonStyle = {
    padding: '6px 12px',
    backgroundColor: '#ffffff',
    border: '1px solid #003366',
    color: '#003366',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
  };
 


  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '40px' }}>
     
   
      <div style={{ width: '250px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <img src={pic} alt="Profile" style={{ width: '60px', height: '60px', borderRadius: '50%' }} />
          <div>
            <h1 style={{ fontSize: '18px', margin: '0' }}>Name</h1>
            <h2 style={{ fontSize: '14px', color: '#666', margin: '0' }}>Email address</h2>
          </div>
        </div>


        <button onClick={() => setActiveDiv("security")} style={sidebarButtonStyle("security")}>Security</button>
        <button onClick={() => setActiveDiv("loginActivity")} style={sidebarButtonStyle("loginActivity")}>Login Activity</button>
      </div>


      <div style={{ flex: 1 }}>
        {activeDiv === "security" && ( //security
          <div>
            <form style={{ maxWidth: '900px', margin: '0 auto', background: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '2px solid #003366' }}>
              <b>
              <h3>Change Password</h3>
              <hr />
              <br />
              <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label style={{ width: '150px' }}>Old Password</label>
                <input type="password" style={{ flex: 1, padding: '8px', borderRadius: '20px', border: '2px solid #003366' }} />
              </div>
              <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label style={{ width: '150px' }}>New Password</label>
                <input type="password" style={{ flex: 1, padding: '8px', borderRadius: '20px', border: '2px solid #003366' }} />
              </div>
              <button type="button" style={{ width: '100%', padding: '8px', borderRadius: '20px', border: '2px solid #003366'  }}>Change Password</button>
            </b>
            </form>
          </div>
        )}




        {activeDiv === "loginActivity" && ( //login actvity
          <div>
            <div style={{
              overflowY: 'scroll',
              maxHeight: '300px',
              overflowY: 'auto',
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              marginTop: '10px'
            }}>
              <div style={{
  border: '2px solid #003366',
  borderRadius: '8px',
  padding: '0',
  marginTop: '10px',
  overflow: 'hidden'
}}>
  <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0' }}>
    <thead>
      <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ccc' }}>
        <th style={tableHeaderStyle}>Date</th>
        <th style={tableHeaderStyle}>Time</th>
        <th style={tableHeaderStyle}>Device</th>
        <th style={tableHeaderStyle}>&nbsp;</th>
      </tr>
    </thead>
    <tbody>
  {loginHistory.map((log, index) => (
    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9' }}>
      <td style={tableCellStyle}>{log.date}</td>
      <td style={tableCellStyle}>{log.time}</td>
      <td style={tableCellStyle}>{log.device}</td>
      <td style={tableCellStyle}>
        <button style={logoutButtonStyle}>Logout</button>
      </td>
    </tr>
  ))}
</tbody>


  </table>
</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


export default Settings;

