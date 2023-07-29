import React, { useContext, useEffect, useRef, useState } from "react";

import "./InputForm.css";
import { UserContext } from "../../store/UserContext";
import { useNavigate } from "react-router-dom";

function InputForm({
  isRoom,
  isHotel,
  isAddHotel,
  titlePage,
  hotelId,
  isEditHotel,
  roomId,
  isEditRoom,
}) {
  const { token, hotelData, hotelDataHandler, roomData, roomDataHandler } =
    useContext(UserContext);
  const [hotels, setHotels] = useState();
  const [rooms, setRooms] = useState();
  const [hotel, setHotel] = useState();
  const [name, setName] = useState(hotelData?.name || "");
  const [city, setCity] = useState(hotelData?.city || "");
  const [distance, setDistance] = useState(hotelData?.distance || 0);
  const [desc, setDesc] = useState(hotelData?.desc || "");
  const [img, setImg] = useState(hotelData?.photos || "");
  const [type, setType] = useState(hotelData?.type || "");
  const [address, setAddress] = useState(hotelData?.address || "");
  const [title, setTitle] = useState(hotelData?.title || "");
  const [price, setPrice] = useState(hotelData?.price || 0);
  const [feature, setFeature] = useState(hotelData?.featured || false);
  const [room, setRoom] = useState(hotelData?.rooms || "");

  const [roomTitle, setRoomTitle] = useState(roomData?.title || "");
  const [roomPrice, setRoomPrice] = useState(roomData?.price || 0);
  const [maxPeople, setMaxPeople] = useState(roomData?.maxPeople || 0);
  const [roomNumber, setRoomNumber] = useState(roomData?.roomNumbers || "");
  const [roomDesc, setRoomDroomDesc] = useState(roomData?.desc || "");

  const namRef = useRef();
  const cityRef = useRef();
  const distanceRef = useRef();
  const descRef = useRef();
  const imgRef = useRef();
  const typeRef = useRef();
  const addressRef = useRef();
  const titleRef = useRef();
  const priceRef = useRef();
  const featureRef = useRef();
  const roomRef = useRef();
  const maxPeopleRef = useRef();
  const roomNumberRef = useRef();

  // get hotel data
  useEffect(() => {
    if (hotelData) {
      setName(hotelData?.name);
      setCity(hotelData?.city);
      setDistance(hotelData?.distance);
      setDesc(hotelData?.desc);
      setImg(hotelData?.photos);
      setType(hotelData?.type);
      setAddress(hotelData?.address);
      setTitle(hotelData?.title);
      setPrice(hotelData?.price);
      setFeature(hotelData?.featured);
      setRoom(hotelData?.rooms);
    }
  }, [hotelData]);

  // get room data
  useEffect(() => {
    if (roomData) {
      setRoomTitle(roomData?.title);
      setRoomPrice(roomData?.price);
      setMaxPeople(roomData?.maxPeople);
      setRoomNumber(roomData?.roomNumbers);
      setRoomDroomDesc(roomData?.desc);
      setHotel(roomData?.hotel);
    }
  }, [roomData]);

  const navigate = useNavigate();

  // get hotel
  useEffect(() => {
    const fetchData = async () => {
      if (isEditHotel || isAddHotel) return;
      try {
        const res = await fetch(
          `http://localhost:5000/api/v1/hotel/getHotel?token=${token}`
        );
        const data = await res.json();
        setHotels(data.hotel);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [token, isEditHotel, isAddHotel]);

  // get room
  useEffect(() => {
    const fetchData = async () => {
      if (!isAddHotel) return;
      try {
        const res = await fetch(
          `http://localhost:5000/api/v1/room/getRoom?token=${token}`
        );
        const data = await res.json();
        setRooms(data.room.map((room) => room.title));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [token, isAddHotel]);

  // get hotel by id
  useEffect(() => {
    const fetchData = async () => {
      if (!isEditHotel) return;
      try {
        const res = await fetch(
          `http://localhost:5000/api/v1/hotel/getHotelById?token=${token}&hotelId=${hotelId}`
        );

        const hotelData = await res.json();
        hotelDataHandler(hotelData.hotel);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [token, isEditHotel, hotelId, hotelDataHandler]);

  // get rooms by id
  useEffect(() => {
    const fetchData = async () => {
      if (!isEditRoom) return;
      try {
        const res = await fetch(
          `http://localhost:5000/api/v1/room/getRoomById?token=${token}&roomId=${roomId}`
        );

        const roomData = await res.json();
        roomDataHandler(roomData.room);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [token, roomDataHandler, isEditRoom, roomId]);

  // create hotel
  const handleCreateHotel = async (e) => {
    e.preventDefault();

    if (!isAddHotel) return;

    if (
      !namRef?.current?.value ||
      !cityRef?.current?.value ||
      !distanceRef?.current?.value ||
      !descRef?.current?.value ||
      !imgRef?.current?.value ||
      !typeRef?.current?.value ||
      !addressRef?.current?.value ||
      !titleRef?.current?.value ||
      !priceRef?.current?.value ||
      !featureRef?.current?.value ||
      !roomRef?.current?.value
    ) {
      alert("PLease enter valid values");
      return;
    }

    if (
      typeRef?.current?.value !== "hotel" &&
      typeRef?.current?.value !== "apartment" &&
      typeRef?.current?.value !== "resort" &&
      typeRef?.current?.value !== "resort" &&
      typeRef?.current?.value !== "villa" &&
      typeRef?.current?.value !== "cabin"
    ) {
      alert(
        "PLease enter one of type here: hotel, apartment, resort, villa, cabin"
      );
      return;
    }

    const data = {
      name: namRef?.current?.value,
      city: cityRef?.current?.value,
      distance: distanceRef?.current?.value,
      desc: descRef?.current?.value,
      photos: imgRef?.current?.value,
      type: typeRef?.current?.value,
      address: addressRef?.current?.value,
      price: priceRef?.current?.value,
      featured: featureRef?.current?.value,
      rooms: roomRef?.current?.value,
    };

    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/hotel/createHotel?token=${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const hotel = await res.json();

      if (res.status === 400) {
        alert(hotel.message);
        return;
      }

      navigate("/hotel");
    } catch (error) {
      console.log(error);
    }
  };

  // create room
  const handleCreateRoom = async (e) => {
    e.preventDefault();

    if (
      !titleRef?.current?.value ||
      !priceRef?.current?.value ||
      !descRef?.current?.value ||
      !maxPeopleRef?.current?.value ||
      !roomNumberRef?.current?.value
    ) {
      alert("PLease enter valid values");
      return;
    }

    const data = {
      title: titleRef?.current?.value,
      price: priceRef?.current?.value,
      maxPeople: maxPeopleRef?.current?.value,
      desc: descRef?.current?.value,
      roomNumbers: roomNumberRef?.current?.value,
      hotel: hotel,
    };

    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/room/createRoom?token=${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const room = await res.json();

      if (res.status === 400) {
        alert(room.message);
        return;
      }
      navigate("/room");
    } catch (error) {
      console.log(error);
    }
  };

  // update hotel
  const handleUpdateHotel = async (e) => {
    e.preventDefault();

    if (!isEditHotel) return;

    if (
      !namRef?.current?.value ||
      !cityRef?.current?.value ||
      !distanceRef?.current?.value ||
      !descRef?.current?.value ||
      !imgRef?.current?.value ||
      !typeRef?.current?.value ||
      !addressRef?.current?.value ||
      !titleRef?.current?.value ||
      !priceRef?.current?.value ||
      !featureRef?.current?.value ||
      !roomRef?.current?.value
    ) {
      alert("PLease enter valid values");
      return;
    }
    if (
      typeRef?.current?.value !== "hotel" &&
      typeRef?.current?.value !== "apartment" &&
      typeRef?.current?.value !== "resort" &&
      typeRef?.current?.value !== "resort" &&
      typeRef?.current?.value !== "villa" &&
      typeRef?.current?.value !== "cabin"
    ) {
      alert(
        "PLease enter one of type here: hotel, apartment, resort, villa, cabin"
      );
      return;
    }

    const data = {
      name: namRef?.current?.value,
      city: cityRef?.current?.value,
      distance: distanceRef?.current?.value,
      desc: descRef?.current?.value,
      photos: imgRef?.current?.value,
      type: typeRef?.current?.value,
      address: addressRef?.current?.value,
      price: priceRef?.current?.value,
      featured: featureRef?.current?.value,
      rooms: roomRef?.current?.value,
    };

    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/hotel/updateHotel?token=${token}&hotelId=${hotelId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const hotel = await res.json();

      if (res.status === 400) {
        alert(hotel.message);
        return;
      }

      navigate("/hotel");
    } catch (error) {
      console.log(error);
    }
  };

  // update room
  const handleUpdateRoom = async (e) => {
    e.preventDefault();

    if (!isEditRoom) return;

    if (
      !titleRef?.current?.value ||
      !priceRef?.current?.value ||
      !descRef?.current?.value ||
      !maxPeopleRef?.current?.value ||
      !roomNumberRef?.current?.value
    ) {
      alert("PLease enter valid values");
      return;
    }

    const data = {
      title: titleRef?.current?.value,
      price: priceRef?.current?.value,
      maxPeople: maxPeopleRef?.current?.value,
      desc: descRef?.current?.value,
      roomNumbers: roomNumberRef?.current?.value,
      hotel: hotel,
    };

    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/room/updateRoom?token=${token}&roomId=${roomId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const room = await res.json();

      if (res.status === 400) {
        alert(room.message);
        return;
      }

      navigate("/room");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="addform-container">
      <h4 className="form-head">{titlePage}</h4>
      <div className="form-body">
        <div className="form-content">
          {isAddHotel && (
            <form onSubmit={handleCreateHotel}>
              <div className="form-input-container d-flex justify-content-between">
                <div className="form-input">
                  <div className="form-input-item ">
                    <label>Name</label>
                    <input type="text" ref={namRef} placeholder="My Hotel" />
                  </div>
                  <div className="form-input-item ">
                    <label>City</label>
                    <input type="text" ref={cityRef} placeholder="City" />
                  </div>
                  <div className="form-input-item ">
                    <label>Distance from City Center</label>
                    <input
                      type="number"
                      ref={distanceRef}
                      placeholder="Distance"
                    />
                  </div>
                  <div className="form-input-item ">
                    <label>Description</label>
                    <input
                      type="text"
                      ref={descRef}
                      placeholder="Description"
                    />
                  </div>

                  <div className="form-input-item ">
                    <label>Images</label>
                    <input className="input-img" ref={imgRef} type="text" />
                  </div>
                </div>
                <div className="form-input">
                  <div className="form-input-item ">
                    <label>Type</label>
                    <input type="text" ref={typeRef} placeholder="Type" />
                  </div>
                  <div className="form-input-item ">
                    <label>Address</label>
                    <input type="text" ref={addressRef} placeholder="Address" />
                  </div>
                  <div className="form-input-item ">
                    <label>Title</label>
                    <input type="text" ref={titleRef} placeholder="Title" />
                  </div>
                  <div className="form-input-item ">
                    <label>Price</label>
                    <input type="number" ref={priceRef} placeholder="Price" />
                  </div>
                  <div className="form-input-item ">
                    <label>Featured</label>
                    <select className="feature" ref={featureRef}>
                      <option value={false}>No</option>
                      <option value={true}>Yes</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-input-item">
                <label>Room</label>
                <textarea
                  className="rooms"
                  value={rooms}
                  onChange={(e) => setRooms(e.target.value)}
                  ref={roomRef}
                />
              </div>
              <button type="submit" className="btn btn-send">
                Send
              </button>
            </form>
          )}

          {isEditHotel && (
            <form onSubmit={handleUpdateHotel}>
              <div className="form-input-container d-flex justify-content-between">
                <div className="form-input">
                  <div className="form-input-item ">
                    <label>Name</label>
                    <input
                      type="text"
                      ref={namRef}
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      placeholder="My Hotel"
                    />
                  </div>
                  <div className="form-input-item ">
                    <label>City</label>
                    <input
                      type="text"
                      ref={cityRef}
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                      placeholder="City"
                    />
                  </div>
                  <div className="form-input-item ">
                    <label>Distance from City Center</label>
                    <input
                      type="number"
                      ref={distanceRef}
                      value={distance}
                      onChange={(e) => {
                        setDistance(e.target.value);
                      }}
                      placeholder="Distance"
                      min={0}
                    />
                  </div>
                  <div className="form-input-item ">
                    <label>Description</label>
                    <input
                      type="text"
                      ref={descRef}
                      value={desc}
                      onChange={(e) => {
                        setDesc(e.target.value);
                      }}
                      placeholder="Description"
                    />
                  </div>

                  <div className="form-input-item ">
                    <label>Images</label>
                    <input
                      className="input-img"
                      ref={imgRef}
                      value={img}
                      onChange={(e) => {
                        setImg(e.target.value);
                      }}
                      type="text"
                    />
                  </div>
                </div>
                <div className="form-input">
                  <div className="form-input-item ">
                    <label>Type</label>
                    <input
                      type="text"
                      ref={typeRef}
                      value={type}
                      onChange={(e) => {
                        setType(e.target.value);
                      }}
                      placeholder="Type"
                    />
                  </div>
                  <div className="form-input-item ">
                    <label>Address</label>
                    <input
                      type="text"
                      ref={addressRef}
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                      placeholder="Address"
                    />
                  </div>
                  <div className="form-input-item ">
                    <label>Title</label>
                    <input
                      type="text"
                      ref={titleRef}
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      placeholder="Title"
                    />
                  </div>
                  <div className="form-input-item ">
                    <label>Price</label>
                    <input
                      type="number"
                      ref={priceRef}
                      value={price}
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                      placeholder="Price"
                      min={0}
                    />
                  </div>
                  <div className="form-input-item ">
                    <label>Featured</label>
                    <select
                      className="feature"
                      ref={featureRef}
                      value={feature}
                      onChange={(e) => {
                        setFeature(e.target.value);
                      }}
                    >
                      <option value={false}>No</option>
                      <option value={true}>Yes</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-input-item">
                <label>Room</label>
                <textarea
                  className="rooms"
                  onChange={(e) => setRoom(e.target.value)}
                  value={room}
                  ref={roomRef}
                />
              </div>
              <button type="submit" className="btn btn-send">
                Send
              </button>
            </form>
          )}

          {isRoom && (
            <form onSubmit={handleCreateRoom}>
              <div className="form-input-container d-flex justify-content-between">
                <div className="form-input">
                  <div className="form-input-item ">
                    <label>Title</label>
                    <input type="text" ref={titleRef} placeholder="Title" />
                  </div>
                  <div className="form-input-item ">
                    <label>Price</label>
                    <input type="number" ref={priceRef} placeholder="Price" />
                  </div>
                </div>
                <div className="form-input">
                  <div className="form-input-item ">
                    <label>Description</label>
                    <input
                      type="text"
                      ref={descRef}
                      placeholder="Description"
                    />
                  </div>
                  <div className="form-input-item ">
                    <label>Max People</label>
                    <input
                      type="number"
                      ref={maxPeopleRef}
                      placeholder="Max People"
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="form-input-item ">
                  <label>Rooms</label>
                  <input
                    ref={roomNumberRef}
                    type="text"
                    className="rooms-number"
                    placeholder="Please give comma between rooms numbers"
                  />
                </div>

                <div className="form-input-item ">
                  <label>Choose a hotel</label>
                  <select
                    className="hotel-choose"
                    onChange={(e) => setHotel(e.target.value)}
                  >
                    <option defaultValue> Choose hotel</option>
                    {hotels?.map((hotel) => (
                      <option key={hotel._id} value={hotel.name}>
                        {hotel.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <button type="submit" className="btn btn-send">
                    Send
                  </button>
                </div>
              </div>
            </form>
          )}

          {isEditRoom && (
            <form onSubmit={handleUpdateRoom}>
              <div className="form-input-container d-flex justify-content-between">
                <div className="form-input">
                  <div className="form-input-item ">
                    <label>Title</label>
                    <input
                      type="text"
                      ref={titleRef}
                      value={roomTitle}
                      onChange={(e) => {
                        setRoomTitle(e.target.value);
                      }}
                      placeholder="Title"
                    />
                  </div>
                  <div className="form-input-item ">
                    <label>Price</label>
                    <input
                      type="number"
                      ref={priceRef}
                      value={roomPrice}
                      onChange={(e) => setRoomPrice(e.target.value)}
                      placeholder="Price"
                    />
                  </div>
                </div>
                <div className="form-input">
                  <div className="form-input-item ">
                    <label>Description</label>
                    <input
                      type="text"
                      ref={descRef}
                      value={roomDesc}
                      onChange={(e) => setRoomDroomDesc(e.target.value)}
                      placeholder="Description"
                    />
                  </div>
                  <div className="form-input-item ">
                    <label>Max People</label>
                    <input
                      type="number"
                      ref={maxPeopleRef}
                      value={maxPeople}
                      onChange={(e) => setMaxPeople(e.target.value)}
                      placeholder="Max People"
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="form-input-item ">
                  <label>Rooms</label>
                  <input
                    ref={roomNumberRef}
                    value={roomNumber}
                    onChange={(e) => {
                      setRoomNumber(e.target.value);
                    }}
                    type="text"
                    placeholder="Please give comma between rooms numbers"
                    className="rooms-number"
                  />
                </div>

                <div className="form-input-item ">
                  <label>Choose a hotel</label>
                  <select
                    className="hotel-choose"
                    value={hotel}
                    onChange={(e) => setHotel(e.target.value)}
                  >
                    <option defaultValue> Choose hotel</option>
                    {hotels?.map((hotel) => (
                      <option key={hotel._id} value={hotel.name}>
                        {hotel.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <button type="submit" className="btn btn-send">
                    Send
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default InputForm;
