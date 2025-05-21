import { useState, useRef } from "react";
import profilePic from '../components/images/pic.png';

export function User() {
  const [defaultPic, setProfilePic] = useState(profilePic);
  const fileInputRef = useRef(null);

  const imageClick = () => {
    fileInputRef.current.click();
  };

  const changeFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['image/png', 'image/jpeg', 'image/bmp'];
    if (!validTypes.includes(file.type)) {
      alert('Only PNG, JPG, or BMP files are allowed');
      e.target.value = null;
      return;
    }

    const url = URL.createObjectURL(file);
    setProfilePic(url);
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-gradient-to-br from-gray-200 to-white rounded-2xl shadow-lg px-10 py-6">
      <form className="w-full max-w-2xl bg-transparent">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile</h2>

        {/* pfp */}
        <div className="flex justify-center mb-6 relative">
          <img src={defaultPic} alt="User Pic" className="w-24 h-24 rounded-full object-cover cursor-pointer border-4 border-white shadow" onClick={imageClick}/>
          <input type="file" accept="image/png, image/jpeg, image/bmp" ref={fileInputRef} className="hidden" onChange={changeFile}/>
        </div>

        {/* user card */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Last name</label>
            <input type="text" className="w-full mt-1 p-2 border rounded-md" placeholder="Last name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">First name</label>
            <input type="text" className="w-full mt-1 p-2 border rounded-md" placeholder="First name" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input type="text" className="w-full mt-1 p-2 border rounded-md" placeholder="Enter username" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
            <input type="tel" className="w-full mt-1 p-2 border rounded-md" placeholder="+63 000 000 0000" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">E-mail address</label>
            <input type="email" className="w-full mt-1 p-2 border rounded-md" placeholder="myname@example.com" />
          </div>
        </div>

        {/* btns */}
        <div className="flex justify-end space-x-4">
          <button type="button" className="px-5 py-2 border rounded-md text-gray-700 bg-white hover:bg-gray-100">Cancel</button>
          <button type="submit" className="px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-950">Save</button>
        </div>
      </form>
    </div>
  );
}
