  // import React, { useState, useCallback,useEffect } from 'react';
  // import './Checkout.scss';
  // import Checkout1 from '../Checkout1/Checkout1';
  // import { Link, useNavigate } from 'react-router-dom';
  // import { Autocomplete, useLoadScript } from '@react-google-maps/api';
  // import axios from 'axios';

  // const libraries = ['places'];

  // const BookingForm = () => {
  //   const [formData, setFormData] = useState({
  //     bname: '',
  //     bphone: '',
  //     bemail: '',
  //     bsize: '',
  //     baddress: '',
  //     baddressh: '',
  //     bdrop: '',
  //     bpickup: '',
  //     startDate: '',
  //     endDate: '',
  //     drivers: [{
  //       name: '',
  //       phone: '',
  //       email: '',
  //       license: null,
  //       insurance: null,
  //       experience: ''
  //     }]
  //   });
  //   const [size, setSize] = useState('');

  //   const navigate = useNavigate();
  //   const { isLoaded, loadError } = useLoadScript({
  //     googleMapsApiKey: 'AIzaSyAHWgq2_Us0Dq7UcVoP4FRGYcDqDh6XH_M',
  //     libraries,
  //   });
  //   const getSize = async () => {
  //     try {
  //       const vehicleId = localStorage.getItem('vehicle_Id');
  //       if (!vehicleId) {
  //         console.error('Vehicle ID not found in local storage');
  //         return;
  //       }

  //       const response = await axios.get(`http://44.196.192.232:5001/api/vehicle/vehicles/${vehicleId}`);
  //       const data = response.data;
  //       console.log('API response data:', data); // Verify the data structure
  //       setSize(data.vseats);
  //       setFormData(prevData => ({
  //         ...prevData,
  //         bsize: data.vseats
  //       }));
  //     } catch (error) {
  //       console.log("Error fetching vehicle details", error);
  //     }
  //   };
  //   useEffect(() => {
  //     getSize();
  //   }, []);
    


  //   const handleInputChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData({
  //       ...formData,
  //       [name]: value,
  //     });
  //   };

  //   const handleDriverChange = (index, e) => {
  //     const { name, value } = e.target;
  //     const updatedDrivers = [...formData.drivers];
  //     updatedDrivers[index][name] = value;
  //     setFormData({
  //       ...formData,
  //       drivers: updatedDrivers
  //     });
  //   };

  //   const addDriver = () => {
  //     setFormData({
  //       ...formData,
  //       drivers: [...formData.drivers, {
  //         name: '',
  //         phone: '',
  //         email: '',
  //         license: null,
  //         insurance: null,
  //         experience: ''
  //       }]
  //     });
  //   };

  //   const removeDriver = (index) => {
  //     const updatedDrivers = formData.drivers.filter((_, i) => i !== index);
  //     setFormData({
  //       ...formData,
  //       drivers: updatedDrivers
  //     });
  //   };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     try {
  //       const response = await fetch('http://44.196.192.232:5001/api/book/create', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify(formData)
  //       });

  //       if (response.ok) {
  //         navigate('/agreement');
  //       } else {
  //         console.error('Failed to save booking data');
  //       }
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };

  //   const handlePlaceChanged = useCallback((field, ref) => {
  //     if (ref.current) {
  //       const place = ref.current.getPlace();
  //       setFormData({
  //         ...formData,
  //         [field]: place.formatted_address,
  //       });
  //     }
  //   }, [formData]);

  //   if (loadError) return <div>Error loading maps: {loadError.message}</div>;
  //   if (!isLoaded) return <div>Loading Maps...</div>;

  //   return (
  //     <>
  //       <form className="booking-form" onSubmit={handleSubmit}>
  //         <h1>Enter Your Booking Details</h1>
  //         <div className="home3-details">
  //           <div className="location-input">
  //             <div className="input-wrapper">
  //               <label><i className="fa-solid fa-location-dot"></i> Delivery</label>
  //               <Autocomplete onLoad={(ref) => handlePlaceChanged('deliveryLocation', ref)}>
  //                 <input
  //                   type="text"
  //                   name="deliveryLocation"
  //                   placeholder="Enter Your Delivery Location"
  //                   value={formData.deliveryLocation}
  //                   onChange={handleInputChange}
  //                 />
  //               </Autocomplete>
  //             </div>
  //             <div className="input-wrapper">
  //               <label><i className="fa-solid fa-location-dot"></i> Pickup</label>
  //               <Autocomplete onLoad={(ref) => handlePlaceChanged('pickupLocation', ref)}>
  //                 <input
  //                   type="text"
  //                   name="pickupLocation"
  //                   placeholder="Enter Your Pickup Location"
  //                   value={formData.pickupLocation}
  //                   onChange={handleInputChange}
  //                 />
  //               </Autocomplete>
  //             </div>
  //           </div>

  //           {/* <div className="date-input">
  //             <div className="date-wrapper">
  //               <input
  //                 type="date"
  //                 name="startDate"
  //                 className="date-box"
  //                 value={formData.startDate}
  //                 onChange={handleInputChange}
  //               />
  //               <span className="placeholder">
  //                 {formData.startDate ? new Date(formData.startDate).toLocaleDateString() : 'Start Date'}
  //                 <span className="icon" onClick={() => startDateRef.current?.click()}>
  //                   <i className="fa-regular fa-calendar-days"></i>
  //                 </span>
  //               </span>
  //             </div>
  //             <div className="date-wrapper">
  //               <input
  //                 type="date"
  //                 name="endDate"
  //                 className="date-box"
  //                 value={formData.endDate}
  //                 onChange={handleInputChange}
  //               />
  //               <span className="placeholder">
  //                 {formData.endDate ? new Date(formData.endDate).toLocaleDateString() : 'End Date'}
  //                 <span className="icon" onClick={() => endDateRef.current?.click()}>
  //                   <i className="fa-regular fa-calendar-days"></i>
  //                 </span>
  //               </span>
  //             </div>
  //           </div> */}
  //         <div className="dates">
  //           <div className="date-1">
  //           <label><i className="fa-regular fa-calendar-days"></i>Start Date</label>
  //           <input
  //                 type="date"
  //                 name="startDate"
  //                 className="date-box"
  //                 value={formData.startDate}
  //                 onChange={handleInputChange}
  //               />
  //           </div>
  //           <div className="date-1">
  //           <label><i className="fa-regular fa-calendar-days"></i>End Date</label>
  //           <input
  //                 type="date"
  //                 name="endDate"
  //                 className="date-box"
  //                 value={formData.endDate}
  //                 onChange={handleInputChange}
  //               />
  //           </div>
            
  //         </div>
          


  //         </div>
  //         <div className="form-grid">
  //           <div className="form-group">
  //             <label><i className="fa-solid fa-person"></i> Name</label>
  //             <input type="text" name="bname" placeholder="Enter Your Name" value={formData.bname} onChange={handleInputChange} />
  //           </div>
  //           <div className="form-group">
  //             <label><i className="fa-solid fa-phone"></i> Phone Number</label>
  //             <input type="text" name="bphone" placeholder="Enter Phone Number" value={formData.bphone} onChange={handleInputChange} />
  //           </div>
  //           <div className="form-group">
  //             <label><i className="fa-solid fa-envelope"></i> Email</label>
  //             <input type="email" name="bemail" placeholder="Enter Email Address" value={formData.bemail} onChange={handleInputChange} />
  //           </div>
  //           <div className="form-group">
  //             <label><i className="fa-solid fa-cart-shopping"></i> Size of Cart</label>
  //             <input type="text" name="bsize" placeholder="Enter Cart Size" value={formData.bsize} onChange={handleInputChange} />
  //           </div>
  //           <div className="form-group">
  //             <label><i className="fa-solid fa-house"></i> Rental Address</label>
  //             <input type="text" name="baddress" placeholder="Enter Rental Address" value={formData.baddress} onChange={handleInputChange} />
  //           </div>
  //           <div className="form-group">
  //             <label><i className="fa-solid fa-house"></i> Home Address</label>
  //             <input type="text" name="baddressh" placeholder="Enter Home Address" value={formData.baddressh} onChange={handleInputChange} />
  //           </div>
  //         </div>
  //         <div className="drivers-section">
  //           {formData.drivers.map((driver, index) => (
  //             <div key={index} className="driver-details">
  //               <div className="form-grid">
  //                 <div className="form-group">
  //                   <label><i className="fa-solid fa-person"></i> Name</label>
  //                   <input type="text" name="name" placeholder="Enter Driver Name" value={driver.name} onChange={(e) => handleDriverChange(index, e)} />
  //                 </div>
  //                 <div className="form-group">
  //                   <label><i className="fa-solid fa-phone"></i> Phone Number</label>
  //                   <input type="text" name="phone" placeholder="Enter Phone Number" value={driver.phone} onChange={(e) => handleDriverChange(index, e)} />
  //                 </div>
  //                 <div className="form-group">
  //                   <label><i className="fa-solid fa-envelope"></i> Email</label>
  //                   <input type="email" name="email" placeholder="Enter Email Address" value={driver.email} onChange={(e) => handleDriverChange(index, e)} />
  //                 </div>
  //                 <div className="form-group">
  //                   <label><i className="fa-solid fa-address-book"></i> Driver License</label>
  //                   <input type="file" name="license" onChange={(e) => handleDriverChange(index, e)} />
  //                 </div>
  //                 <div className="form-group">
  //                   <label><i className="fa-solid fa-address-book"></i> Insurance Policy</label>
  //                   <input type="file" name="insurance" onChange={(e) => handleDriverChange(index, e)} />
  //                 </div>
  //                 <div className="form-group">
  //                   <label><i className="fa-solid fa-calendar-days"></i> Years of Experience</label>
  //                   <input type="text" name="experience" placeholder="Enter Driving Experience" value={driver.experience} onChange={(e) => handleDriverChange(index, e)} />
  //                 </div>
  //               </div>
  //               <button type="button" className="remove-driver" onClick={() => removeDriver(index)}><i className="fa-solid fa-minus"></i> Remove Driver</button>
  //             </div>
  //           ))}
  //         </div>
  //         <button type="button" className="add-driver" onClick={addDriver}><i className="fa-solid fa-plus"></i> Add Driver</button>
  //         <div className="checkout-button">
  //           <button type="submit" className="submit-check">Submit</button>
          
  //         </div>
  //       </form>
  //       <Checkout1 />
  //     </>
  //   );
  // };

  // export default BookingForm;
  import React, { useState, useCallback, useEffect, useRef } from 'react';
  import './Checkout.scss';
  import Checkout1 from '../Checkout1/Checkout1';
  import { useNavigate } from 'react-router-dom';
  import { Autocomplete, useLoadScript } from '@react-google-maps/api';
  import axios from 'axios';

  const libraries = ['places'];

  const BookingForm = () => {
    const [formData, setFormData] = useState({
      bname: '',
      bphone: '',
      vehiclesId:'',
      bemail: '',
      bsize: '',
      baddress: '',
      baddressh: '',
      bdrop: '',
      bpickup: '',
      startDate: '',
      endDate: '',
      drivers: [{
        name: '',
        phone: '',
        email: '',
        license: null,
        insurance: null,
        experience: ''
      }]
    });

    const navigate = useNavigate();
    const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: 'AIzaSyAHWgq2_Us0Dq7UcVoP4FRGYcDqDh6XH_M',
      libraries,
    });  

    const deliveryRef = useRef(null);
    const pickupRef = useRef(null);

    const getSize = async () => {
      try {
        const vehicleId = localStorage.getItem('vehicleId');
        if (!vehicleId) {
          console.error('Vehicle ID not found in local storage');
          return;
        }

        const response = await axios.get(`http://44.196.192.232:5001/api/vehicle/vehicles/${vehicleId}`);
        const data = response.data;
        console.log('API response data:', data); // Verify the data structure
        setFormData(prevData => ({
          ...prevData,
          vehiclesId: vehicleId,
          bsize: data.vseats
          
        }));
      } catch (error) {
        console.log("Error fetching vehicle details", error);
      }
    };

    useEffect(() => {
      getSize();
    }, []);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const handleDriverChange = (index, e) => {
      const { name, value } = e.target;
      const updatedDrivers = [...formData.drivers];
      updatedDrivers[index][name] = value;
      setFormData({
        ...formData,
        drivers: updatedDrivers
      });
    };

    const addDriver = () => {
      setFormData({
        ...formData,
        drivers: [...formData.drivers, {
          name: '',
          phone: '',
          email: '',
          license: null,
          insurance: null,
          experience: ''
        }]
      });
    };

    const removeDriver = (index) => {
      const updatedDrivers = formData.drivers.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        drivers: updatedDrivers
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const response = await fetch('http://44.196.192.232:5001/api/book/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          const result = await response.json();  // Parse the response JSON to get the ID
          console.log('bookid ',result.id);
          
          localStorage.setItem('bookFormId', result.id);
          navigate('/agreement');
        } else {
          console.error('Failed to save booking data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const handlePlaceChanged = useCallback((field, ref) => {
      if (ref.current) {
        const place = ref.current.getPlace();
        setFormData((prevData) => ({
          ...prevData,
          [field]: place.formatted_address || place.name, // Use formatted_address or name
        }));
      }
    }, []);

    if (loadError) return <div>Error loading maps: {loadError.message}</div>;
    if (!isLoaded) return <div>Loading Maps...</div>;

    return (
      <>
        <form className="booking-form" onSubmit={handleSubmit}>
          <h1>Enter Your Booking Details</h1>
          <div className="home3-details">
            <div className="location-input">
            <div className="input-wrapper">
    {/* <label><i className="fa-solid fa-location-dot"></i> Delivery</label> */}
    {/* <Autocomplete 
      onLoad={(ref) => deliveryRef.current = ref} 
      onPlaceChanged={() => handlePlaceChanged('bdrop', deliveryRef)} // Update this key to 'bdrop'
    >
      <input
        type="text"
        name="bdrop"  // Update the name to match formData key
        placeholder="Enter Your Delivery Location"
        value={formData.bdrop}  // Update the value to use formData.bdrop
        onChange={handleInputChange}
      />
    </Autocomplete> */}
  </div>
  <div className="input-wrapper">
    {/* <label><i className="fa-solid fa-location-dot"></i> Pickup</label>
    <Autocomplete 
      onLoad={(ref) => pickupRef.current = ref} 
      onPlaceChanged={() => handlePlaceChanged('bpickup', pickupRef)} // Update this key to 'bpickup'
    >
      <input
        type="text"
        name="bpickup"  // Update the name to match formData key
        placeholder="Enter Your Pickup Location"
        value={formData.bpickup}  // Update the value to use formData.bpickup
        onChange={handleInputChange}
      />
    </Autocomplete> */}
  </div>
            </div>

            {/* <div className="dates">
              <div className="date-1">
                <label><i className="fa-regular fa-calendar-days"></i>Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  className="date-box"
                  value={formData.startDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="date-1">
                <label><i className="fa-regular fa-calendar-days"></i>End Date</label>
                <input
                  type="date"
                  name="endDate"
                  className="date-box"
                  value={formData.endDate}
                  onChange={handleInputChange}
                />
              </div>
            </div> */}
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label><i className="fa-solid fa-person"></i> Name</label>
              <input type="text" name="bname" placeholder="Enter Your Name" value={formData.bname} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label><i className="fa-solid fa-phone"></i> Phone Number</label>
              <input type="text" name="bphone" placeholder="Enter Phone Number" value={formData.bphone} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label><i className="fa-solid fa-envelope"></i> Email</label>
              <input type="email" name="bemail" placeholder="Enter Email Address" value={formData.bemail} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label><i className="fa-solid fa-cart-shopping"></i> Size of Cart</label>
              <input type="text" name="bsize" placeholder="Enter Cart Size" value={formData.bsize} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label><i className="fa-solid fa-house"></i> Rental Address</label>
              <input type="text" name="baddress" placeholder="Enter Rental Address" value={formData.baddress} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label><i className="fa-solid fa-house"></i> Home Address</label>
              <input type="text" name="baddressh" placeholder="Enter Home Address" value={formData.baddressh} onChange={handleInputChange} />
            </div>
          </div>

          <div className="drivers-section">
            {formData.drivers.map((driver, index) => (
              <div key={index} className="driver-details">
                <div className="form-grid">
                  <div className="form-group">
                    <label><i className="fa-solid fa-person"></i> Name</label>
                    <input type="text" name="name" placeholder="Enter Driver Name" value={driver.name} onChange={(e) => handleDriverChange(index, e)} />
                  </div>
                  <div className="form-group">
                    <label><i className="fa-solid fa-phone"></i> Phone Number</label>
                    <input type="text" name="phone" placeholder="Enter Phone Number" value={driver.phone} onChange={(e) => handleDriverChange(index, e)} />
                  </div>
                  <div className="form-group">
                    <label><i className="fa-solid fa-envelope"></i> Email</label>
                    <input type="email" name="email" placeholder="Enter Email Address" value={driver.email} onChange={(e) => handleDriverChange(index, e)} />
                  </div>
                  <div className="form-group">
                    <label><i className="fa-solid fa-id-card"></i> License</label>
                    <input type="file" name="license" onChange={(e) => handleDriverChange(index, e)} />
                  </div>
                  <div className="form-group">
                    <label><i className="fa-solid fa-shield-alt"></i> Insurance</label>
                    <input type="file" name="insurance" onChange={(e) => handleDriverChange(index, e)} />
                  </div>
                  <div className="form-group">
                    <label><i className="fa-solid fa-clock"></i> Experience</label>
                    <input type="text" name="experience" placeholder="Enter Driving Experience" value={driver.experience} onChange={(e) => handleDriverChange(index, e)} />
                  </div>
                </div>
                <button type="button" onClick={() => removeDriver(index)}  className="remove-driver" >Remove Driver</button>
              </div>
            ))}
            <button type="button"className="add-driver" onClick={addDriver}>Add Driver</button>
          </div>
            <div className="checkout-button">
            <button type="submit"  className="submit-check">Submit</button>
            </div>

          
        </form>
      </>
    );
  };

  export default BookingForm;
