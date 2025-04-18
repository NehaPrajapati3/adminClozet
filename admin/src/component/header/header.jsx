import React, { useContext } from "react";
import "./header.css";
import { Button } from "@mui/material";
import { MdMenuOpen } from "react-icons/md";
import { MdOutlineMenu } from "react-icons/md";
import { MyContext } from "../../home/home";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";


const Header = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      //console.log("Inside logout");

      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/logout`
      );
      // console.log("Inside logout after res");
      // console.log(`Res is ${res}`);

      navigate("/login");
      toast.success(res.data.message);
      dispatch(logout(null));
      console.log("user loged out succesfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="header-section">
        <div className="top-left-side">
          <div className="logo-box">
            <div className="symbole">
              <img src="./images/symbol.png" alt="" />
            </div>
            <div className="logo-text">
              <img src="./images/logotext.png" alt="" />
            </div>
          </div>
          <div className="sidebar-btn">
            <Button
              onClick={() => context.setSidebardrop(!context.sidebardrop)}
            >
              {context.sidebardrop === false ? (
                <MdMenuOpen />
              ) : (
                <MdOutlineMenu />
              )}
            </Button>
          </div>
          <div className="bg-slate-700 text-slate-50 absolute right-10">
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
