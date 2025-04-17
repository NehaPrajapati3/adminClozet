import React, { useState, useEffect } from "react";
import "./addnewseller.css";
import { LuUserRoundCog } from "react-icons/lu";
import { RiUserFill } from "react-icons/ri";
import { PiWarningCircleBold } from "react-icons/pi";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";

const AddNewSeller = () => {
   const [logoFile, setLogoFile] = useState(null);
   const [coverPhotoFile, setCoverPhotoFile] = useState(null);
   let storeToEdit;

   const [newStore, setNewStore] = useState({
     storeName: storeToEdit?.storeName || "",
     storeAddress: storeToEdit?.storeAddress || "",
     storeTaxInfo: storeToEdit?.storeTaxInfo || "",
     latitude: storeToEdit?.latitude || "",
     longitude: storeToEdit?.longitude || "",
     zone: storeToEdit?.zone || "",
     mapAddress: storeToEdit?.mapAddress || "",
     logo: storeToEdit?.logo || "",
     coverPhoto: storeToEdit?.coverPhoto || "",
     firstName: storeToEdit?.firstName || "",
     lastName: storeToEdit?.lastName || "",
     mobileNo: storeToEdit?.mobileNo || "",
     email: storeToEdit?.email || "",
     password: storeToEdit?.password || "",
     confirmPassword: storeToEdit?.confirmPassword || "",
   });

   useEffect(() => {
     if (storeToEdit) {
       setNewStore({
         ...newStore,
         storeName: storeToEdit?.storeName || "",
         storeAddress: storeToEdit?.storeAddress || "",
         storeTaxInfo: storeToEdit?.storeTaxInfo || "",
         latitude: storeToEdit?.latitude || "",
         longitude: storeToEdit?.longitude || "",
         zone: storeToEdit?.zone || "",
         mapAddress: storeToEdit?.mapAddress || "",
         logo: storeToEdit?.logo || "",
         coverPhoto: storeToEdit?.coverPhoto || "",
         firstName: storeToEdit?.firstName || "",
         lastName: storeToEdit?.lastName || "",
         mobileNo: storeToEdit?.mobileNo || "",
         email: storeToEdit?.email || "",
         password: storeToEdit?.password || "",
         confirmPassword: storeToEdit?.confirmPassword || "",
       });
     }
   }, [storeToEdit]);

   const handleAddOrUpdate = async (e) => {
     e.preventDefault();

     try {
       
      console.log(`REACT_APP_API_URL: ${process.env.REACT_APP_API_URL}`);

       const formData = new FormData();
       for (const key in newStore) {
         formData.append(key, newStore[key]);
       }

       // Add logo file if selected
       if (logoFile) {
         formData.append("logo", logoFile);
       }

       // Add coverPhoto file if selected
       if (coverPhotoFile) {
         formData.append("coverPhoto", coverPhotoFile);
       }

       let res;
       if (storeToEdit?._id) {
         // Update store
         res = await axios.put(
           `${process.env.REACT_APP_API_URL}/api/v1/store/edit/${storeToEdit._id}`,
           formData,
           {
             headers: { "Content-Type": "multipart/form-data" },
             withCredentials: true,
           }
         );
       } else {
         // Add new store
         res = await axios.post(
           `${process.env.REACT_APP_API_URL}/api/v1/store/add`,
           formData,
           {
             headers: { "Content-Type": "multipart/form-data" },
             withCredentials: true,
           }
         );
       }

       if (res.data.success) {
         toast.success(res.data.message);
       }
     } catch (error) {
       toast.error(error?.response?.data?.message || "Something went wrong!");
       console.log(error);
     }

     // Reset form after submission
     setNewStore({
      //  storeName: "",
      //  storeAddress: "",
      //  storeTaxInfo: "",
      //  latitude: "",
      //  longitude: "",
      //  zone: "",
      //  mapAddress: "",
      //  logo: "",
      //  coverPhoto: "",
      //  firstName: "",
      //  lastName: "",
      //  mobileNo: "",
      //  email: "",
      //  password: "",
      //  confirmPassword: "",
     });
   };
  return (
    <>
      <div className="addnew-seller-section">
        <div className="addnew-seller-header">
          <form onSubmit={handleAddOrUpdate}>
            <div className="addnew-e-top">
              <div className="addnew-e-heading">
                <div className="addnew-e-icon">
                  <LuUserRoundCog />
                </div>
                <h2>Add New Seller</h2>
              </div>
            </div>
            <div className="e-genral-info-box">
              <div className="e-genral-info">
                <div className="e-genral-info-top">
                  <div className="e-genral-heading">
                    <div className="e-genral-icon">
                      <RiUserFill />
                    </div>
                    <h3>Genral Information</h3>
                  </div>
                </div>
                <div className="addnew-e-form-box">
                  <div className="addnew-left">
                    <div className="addnew-input-box">
                      <div className="boxf">
                        <label>Store Name</label>
                      </div>
                      <div className="add-input">
                        <input
                          name="storeName"
                          value={newStore.storeName}
                          onChange={(e) =>
                            setNewStore({
                              ...newStore,
                              storeName: e.target.value,
                            })
                          }
                          type="text"
                          placeholder=" "
                        />
                      </div>
                    </div>
                    <div className="addnew-input-box">
                      <div className="boxf">
                        <label>Store Address</label>
                      </div>
                      <div className="add-input">
                        <input
                          name="storeAddress"
                          value={newStore.storeAddress}
                          onChange={(e) =>
                            setNewStore({
                              ...newStore,
                              storeAddress: e.target.value,
                            })
                          }
                          type="text"
                          placeholder=""
                        />
                      </div>
                    </div>
                    <div className="addnew-input-box">
                      <div className="boxf">
                        <label>Vat/tax (%)</label>
                      </div>
                      <div className="add-input">
                        <input
                          name="storeTaxInfo"
                          value={newStore.storeTaxInfo}
                          onChange={(e) =>
                            setNewStore({
                              ...newStore,
                              storeTaxInfo: e.target.value,
                            })
                          }
                          type="text"
                          placeholder=""
                        />
                      </div>
                    </div>
                    <div className="addnew-input-box">
                      <div className="boxf">
                        <label>Latitude</label>
                      </div>
                      <div className="add-input">
                        <input
                          name="latitude"
                          value={newStore.latitude}
                          onChange={(e) =>
                            setNewStore({
                              ...newStore,
                              latitude: e.target.value,
                            })
                          }
                          type="text"
                          placeholder=""
                        />
                      </div>
                    </div>
                    <div className="addnew-input-box">
                      <div className="boxf">
                        <label>Longitude</label>
                      </div>
                      <div className="add-input">
                        <input
                          name="longitude"
                          value={newStore.longitude}
                          onChange={(e) =>
                            setNewStore({
                              ...newStore,
                              longitude: e.target.value,
                            })
                          }
                          type="text"
                          placeholder=""
                        />
                      </div>
                    </div>
                    <div className="addnew-input-box">
                      <div className="boxp">
                        <label>Zone</label>
                      </div>
                      <div className="add-inputs">
                        <div className="select-menu">
                          <FormControl className="f-bg" size="large" fullWidth>
                            <InputLabel className="s-bg">
                              Select Zone
                            </InputLabel>
                            <Select
                              value={newStore.zone}
                              onChange={(e) =>
                                setNewStore({
                                  ...newStore,
                                  zone: e.target.value,
                                })
                              }
                            >
                              <MenuItem value="">None</MenuItem>
                              <MenuItem value="Demo1">Demo1</MenuItem>
                              <MenuItem value="Demo2">Demo2</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                    </div>
                    <div className="addnew-input-box">
                      <div className="boxf">
                        <label>First Name</label>
                      </div>
                      <div className="add-input">
                        <input
                          name="firstname"
                          value={newStore.firstName}
                          onChange={(e) =>
                            setNewStore({
                              ...newStore,
                              firstName: e.target.value,
                            })
                          }
                          type="text"
                          placeholder=" Ex: Sakeel Ameer"
                        />
                      </div>
                    </div>
                    <div className="addnew-input-box">
                      <div className="boxf">
                        <label>Last Name</label>
                      </div>
                      <div className="add-input">
                        <input
                          type="text"
                          name="lastname"
                          value={newStore.lastName}
                          onChange={(e) =>
                            setNewStore({
                              ...newStore,
                              lastName: e.target.value,
                            })
                          }
                          placeholder=" Ex: Sakeel Ameer"
                        />
                      </div>
                    </div>
                    <div className="addnew-input-box">
                      <div className="boxp">
                        <label>Phone</label>
                      </div>
                      <div className="add-input">
                        <input
                          type="number"
                          name="phoneno"
                          value={newStore.mobileNo}
                          onChange={(e) =>
                            setNewStore({
                              ...newStore,
                              mobileNo: e.target.value,
                            })
                          }
                          placeholder=" Ex: 1113*****"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="addnew-right">
                    <div className="seller-image">
                      <div className="image-e-top">
                        <h4>Store Image Ratio (1:1)</h4>
                      </div>
                      <div className="image-show-box">
                        <div className="image-show"></div>
                      </div>
                      <div className="image-size">
                        <div className="image-size-heading">
                          <h4>Store Logo Image Size Max 2 MB *</h4>
                        </div>
                        <div className="image-choose">
                          <input
                            name="logo"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setLogoFile(e.target.files[0])}
                          />
                        </div>
                      </div>
                      <div className="image-size">
                        <div className="image-size-heading">
                          <h4>Store Cover Image Size Max 2 MB *</h4>
                        </div>
                        <div className="image-choose">
                          <input
                            name="coverPhoto"
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              setCoverPhotoFile(e.target.files[0])
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="account-info">
                  <div className="account-epp-info">
                    <div className="account-epp-top">
                      <div className="epp-heading">
                        <div className="epp-icon">
                          <RiUserFill />
                        </div>
                        <h3>Account Information</h3>
                      </div>
                    </div>
                    <div className="e-p-c">
                      <div className="e-box">
                        <div className="e-lable">
                          <lable>Email</lable>
                        </div>
                        <div className="e-input">
                          <input
                            type="email"
                            name="selleremail"
                            placeholder="Ex: exa@gmail.com"
                            value={newStore.email}
                            onChange={(e) =>
                              setNewStore({
                                ...newStore,
                                email: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="e-box">
                        <div className="e-lable">
                          <lable>Password</lable>
                          <div className="pass-war-icon">
                            <PiWarningCircleBold />
                          </div>
                        </div>
                        <div className="e-input">
                          <input
                            type="password"
                            placeholder="password"
                            value={newStore.password}
                            onChange={(e) =>
                              setNewStore({
                                ...newStore,
                                password: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="e-box">
                        <div className="e-lable">
                          <lable>Confirm Password</lable>
                        </div>
                        <div className="e-input">
                          <input
                            type="password"
                            placeholder="confirm password"
                            value={newStore.confirmPassword}
                            onChange={(e) =>
                              setNewStore({
                                ...newStore,
                                confirmPassword: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="srbtn-box">
                      <div className="r1btn">
                        <Button className="rst-btn">Reset</Button>
                        <Button type="submit" className="subt-btn">
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default AddNewSeller;
