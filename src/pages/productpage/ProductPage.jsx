import React from "react";
import "./ProductPage.css";
// import ReactImageZoom from "react-image-zoom";
import { useState } from "react";
import Navbar from "../../components/navbar";
import Truck from "./truck.png";
import Price from "./price-tag.png";
import data from "../../products";
import { useEffect } from "react";
import Posts from "./Posts.js";
import Ratings from "./rating.png";
import { Link } from "react-router-dom";
import { addItemToCart, getCart } from "./../../pages/cart/useLocalStorage";
import Footer from "../../components/Footer/Footer";

function ProductPage() {
  let id = window.location.pathname.split("/")[2];
  const {
    className,
    price,
    name,
    rating,
    image,
    review,
    discription,
    catogeries,
  } = data[id - 1];
  const [dispImg, setDispImg] = useState(image[0]);
  // const zoomProps = {
  //   width: 300,
  //   height: 450,
  //   zoomWidth: 100,
  //   img: dispImg,
  // };

  const [formData, setformData] = useState({
    text: "",
    rate: "",
  });

  const [arrData, setarrData] = useState([]);

  const [error, setError] = useState("");

  const handleOnFormDataChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setformData((currentData) => ({ ...currentData, [name]: value }));
  };

  const handeleOnSubmit = (e) => {
    const { text, rate } = formData;

    // localStorage.setItem('text', text);
    // localStorage.setItem('rate ', text ? rate  : '');
    e.preventDefault();

    // componentDidMount(){
    //   const text = localStorage.getItem('text') === 'true';
    //   const rate  = text ? localStorage.getItem('rate ') : '';
    //   this.setState({ rate ,text });
    // }

    if (!text) {
      setError("Review is required");
      return;
    }

    if (!rate) {
      setError("Rating is required");
      return;
    }

    setError("");

    setarrData((arrData) => [...arrData, { text, rate }]);

    setformData({ text: "", rate: "" });

    console.log(arrData);
    // console.log(setarrData)
    // console.log(formData);
  };

  const addItem = () => {
    addItemToCart({
      id,
      name,
      price,
      rating,
      discription,
      quantity: 1,
      img: image[0],
    });
    setItemInCart(true);
  };

  const increasedPrice = (str) => {
    let res = str.replace(/\D/g, "");
    // parseInt(str.replace(/\D/g, ""));
    return parseInt(res) * 1.25;
  };

  const [itemInCart, setItemInCart] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const cartItems = getCart();

    cartItems.map((item) => {
      if (item.id == id) setItemInCart(true);
    });
  }, []);

  return (
    <div>
      <div className="productPage__container">
        {/* <Navbar /> */}
        <div className="productPage__left">
          <div className="productPage__sideImagesContainer">
            {image.map((item, index) => (
              <div
                onClick={() => setDispImg(item)}
                className="sideImage"
                style={{ backgroundImage: `url(${item})` }}
              >
                {/* <img src={item} alt="" /> */}
              </div>
            ))}
          </div>
          <div className="productPage__displayImageContainer">
            <div
              className="productPage__displayImage"
              style={{ backgroundImage: `url(${dispImg})` }}
            ></div>
            {/* <ReactImageZoom {...zoomProps} /> */}
          </div>
        </div>
        <div className="productPage__right">
          {/* <h1>{catogeries.charAt(0).toUpperCase() + catogeries.slice(1)}</h1> */}
          <h1 className="productPage__right__name">{name}</h1>
          <h1 className="productPage__right__rating">
            <img
              className="star"
              src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/docomo/205/white-medium-star_2b50.png"
              alt=""
            />
            {rating}
          </h1>
          <div className="prod-price">
            <h1 className="productPage__right__price">{price}</h1>
            <h1 className="productPage__right__price prod-price-strike">
              ₹{increasedPrice(price)}
            </h1>
            <h1 className="productPage__right__price">( 25% OFF )</h1>
          </div>
          <h1 className="prod-taxes">inclusive of all taxes</h1>
          <div className="prodButtons">
            {itemInCart ? (
              <Link to="/cart">
                <button className="prod-addToBag">
                  <i className="fas fa-shopping-bag btnProd-icons"></i> GO TO
                  CART BAG
                </button>
              </Link>
            ) : (
              <button className="prod-addToBag" onClick={addItem}>
                <i className="fas fa-shopping-bag btnProd-icons"></i> ADD TO BAG
              </button>
            )}
            <button className="prod-wishList">
              <i className="far fa-heart btnProd-icons"></i> WISHLIST
            </button>
          </div>
          <hr />
          <div className="product-details">
            <h1 className="product-details-heading">
              PRODUCT DETAILS{" "}
              <i className="fas fa-newspaper prod-detail-icon"></i>
            </h1>
            <h3 className="productPage__right__description">{discription}</h3>
            {/* {console.log(discription)} */}
          </div>
          <br /> <br />
          <div>
            <div className="head">
              <h1 className="product-details-heading">DELIVERY OPTIONS </h1>
              <img src={Truck} alt="img" />
            </div>

            <div className="Address-address-box Address-pincode-input Address-pdp-box">
              <input type="tel" placeholder="Enter a PIN code" />
              <button
                type="submit"
                className="Address-address-button"
                style={{ color: "rgb(191, 192, 198)" }}
              />
            </div>
            <p className="sub">
              Please enter PIN code to check delivery time & Pay on Delivery
              Availability
            </p>
            <ul className="wePromise">
              <li>100% Original Products</li>
              <li>Pay on delivery might be available</li>
              <li>Easy 30 days returns and exchanges</li>
              <li>Try & Buy might be available</li>
            </ul>
            <br />
            <div className="head">
              <h1 className="product-details-heading">BEST OFFERS </h1>
              <img src={Price} alt="img" />
            </div>

            <h2 className="subH">
              <b>
                {" "}
                Best Price <span className="offer_price">Rs.213</span>
              </b>
            </h2>
            <ul className="giveBullets">
              <li>
                Applicable on: Orders above Rs. 2499 (only on first purchase)
              </li>
              <li>
                Coupon code: <b>DJP400</b>
              </li>
              <li>
                Coupon Discount: Rs. 400 off (check cart for final savings)
              </li>
            </ul>

            <h2 className="sub_">View Eligible Products</h2>
            <br />
            <h1 className="product-details-heading">EMI option available</h1>
            <li>EMI starting from Rs.87/month</li>
            <h2 className="sub_">View Plan</h2>
            <br />
            <p>Product Code: 14033232</p>
            <p>
              Seller:
              <span>
                <b>Pankaj</b>
              </span>
            </p>
            <p className="sub">View Supplier Information</p>
          </div>
          <br />
          <div className="product_reviews">
            <div className="same">
              <h1 className="product-details-heading">Ratings</h1>
              <img src={Ratings} alt="img" className="rate___" />
            </div>

            <div className="review_info">
              <div className="allRatings">
                {rating}{" "}
                <img
                  className="star_"
                  src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/docomo/205/white-medium-star_2b50.png"
                  alt=""
                />
                <p>
                  58 ratings <br />& 12 reviews
                </p>
              </div>

              {/* <div>
                <div className="index-flexRow index-margin22">
                  <div className="index-separator"></div>
                  <div>
                    <div className="index-flexRow index-ratingBarContainer">
                      <div className="index-rating">
                        <span className="index-ratingLevel">5</span>
                        <span className="myntraweb-sprite index-grayStarIcon sprites-productRatingsGrayIcon"></span>
                      </div>
                      <progress
                        min="0"
                        max="58"
                        value="49"
                        data-rating="5"
                      ></progress>
                      <div className="index-count">49</div>
                    </div>
                    <div className="index-flexRow index-ratingBarContainer">
                      <div className="index-rating">
                        <span className="index-ratingLevel">4</span>
                        <span className="myntraweb-sprite index-grayStarIcon sprites-productRatingsGrayIcon"></span>
                      </div>
                      <progress
                        min="0"
                        max="58"
                        value="6"
                        data-rating="4"
                      ></progress>
                      <div className="index-count">6</div>
                    </div>
                    <div className="index-flexRow index-ratingBarContainer">
                      <div className="index-rating">
                        <span className="index-ratingLevel">3</span>
                        <span className="myntraweb-sprite index-grayStarIcon sprites-productRatingsGrayIcon"></span>
                      </div>
                      <progress
                        min="0"
                        max="58"
                        value="0"
                        data-rating="3"
                      ></progress>
                      <div className="index-count"></div>
                    </div>
                    <div className="index-flexRow index-ratingBarContainer">
                      <div className="index-rating">
                        <span className="index-ratingLevel">2</span>
                        <span className="myntraweb-sprite index-grayStarIcon sprites-productRatingsGrayIcon"></span>
                      </div>
                      <progress
                        min="0"
                        max="58"
                        value="2"
                        data-rating="2"
                      ></progress>
                      <div className="index-count">2</div>
                    </div>
                    <div className="index-flexRow index-ratingBarContainer">
                      <div className="index-rating">
                        <span className="index-ratingLevel">1</span>
                        <span className="myntraweb-sprite index-grayStarIcon sprites-productRatingsGrayIcon"></span>
                      </div>
                      <progress
                        min="0"
                        max="58"
                        value="1"
                        data-rating="1"
                      ></progress>
                      <div className="index-count">1</div>
                    </div>
                  </div>
                </div>
                ;
              </div> */}
              {/* <input type="text" onChange={(e) => setPro_review(e.target.value)}/><button>Add</button> */}
            </div>

            <div className="form">
              {/* <h2>{formData}</h2> */}
              <p>Share you valuable Review :</p>
              <form>
                <input
                  type="text"
                  value={formData.text}
                  required
                  name="text"
                  placeholder="Valuable Review"
                  onChange={handleOnFormDataChange}
                />

                <input
                  className="input_num"
                  type="number"
                  min="0"
                  max="5"
                  value={formData.rate}
                  required
                  name="rate"
                  placeholder="Rating"
                  onChange={handleOnFormDataChange}
                />

                <p>{error}</p>

                <button
                  className="submitBtn"
                  type="submit"
                  onClick={handeleOnSubmit}
                >
                  Post{" "}
                </button>
                
              </form>
            </div>

            <div>
            <Posts post={arrData} />
              {review.map((item) => (
                <div className="review__container">
                  <h1 className="review__text">{item}</h1>
                  <div className="review__rate ">
                    <img
                      className="review__avatar"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8H1cJiq2N6D8u6lQMkP_-iPVu7d2XZbevhfUNM6obwXcUkeMDvJEsak3kTjvqAr67DDY&usqp=CAU"
                      alt=""
                    />{" "}
                    <h1>Pratyush | 7 Aug 2021 </h1>{" "}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* </div> */} 
      <Footer />
    </div>
  );
}

export default ProductPage;
