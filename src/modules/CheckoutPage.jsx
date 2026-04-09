import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config/Constants";

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Lakshadweep",
  "Puducherry",
];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Geolocation State
  const [coordinates, setCoordinates] = useState({ lat: "", lng: "" });
  const [isLocating, setIsLocating] = useState(false);
  const [locationSuccess, setLocationSuccess] = useState(false);

  // 1. Read Order Summary data from Redux
  const { data: cart } = useSelector((state) => state.cart);
  const items = cart?.items || [];
  const grandTotal = cart?.totalPrice || 0;
  const totalItems = cart?.totalItems || 0;

  // 2. Security Check: If they manually navigate to /checkout with an empty cart, kick them out
  if (items.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[60vh]'>
        <h2 className='text-2xl font-bold mb-4'>Your cart is empty</h2>
        <Link to='/products' className='btn btn-primary'>
          Go Shopping
        </Link>
      </div>
    );
  }

  // --- HTML5 Geolocation Handler ---
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          lat: position.coords.latitude.toString(),
          lng: position.coords.longitude.toString(),
        });
        setLocationSuccess(true);
        setIsLocating(false);
      },
      (err) => {
        console.error(err);
        setError(
          "Failed to get your location. Please ensure location permissions are granted.",
        );
        setIsLocating(false);
      },
    );
  };

  // 3. Handle Form Submission
  const handleProceedToPayment = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    // Mapping precisely to your new nested Mongoose Schema
    const shippingAddress = {
      firstName: formData.get("firstName")?.trim(),
      lastName: formData.get("lastName")?.trim(),
      phone: formData.get("phone")?.trim(),
      address: {
        address: formData.get("address")?.trim(),
        landMark: formData.get("landMark")?.trim(),
        locality: formData.get("locality")?.trim(),
        city: formData.get("city")?.trim(),
        state: formData.get("state")?.trim(),
        stateCode: formData.get("state")?.trim().substring(0, 2).toUpperCase(), // Quick fallback for stateCode
        pin: formData.get("pin")?.trim(),
        country: "India",
        coordinates: {
          lat: coordinates.lat,
          lng: coordinates.lng,
        },
      },
    };

    try {
      // Send address to our new backend endpoint
      const res = await axios.post(
        `${BASE_URL}/orders`,
        { shippingAddress },
        { withCredentials: true }, // Crucial for passing the JWT cookie
      );

      // The backend returns the new pending Order ID.
      const newOrderId = res.data.data._id;

      // Navigate to the (future) payment page, passing the orderId in the URL state
      navigate(`/payment/${newOrderId}`);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to save shipping information.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Reusable CSS class to remove the glowing focus ring from DaisyUI/Tailwind
  const inputClass =
    "input input-bordered w-full focus:outline-none focus:border-base-300 focus:ring-0";
  const selectClass =
    "select select-bordered w-full focus:outline-none focus:border-base-300 focus:ring-0";

  return (
    <div className='max-w-7xl mx-auto px-4 py-8 bg-base-100 min-h-screen'>
      <h1 className='text-3xl font-bold mb-8'>Checkout</h1>

      {error && (
        <div className='alert alert-error mb-6 rounded-md'>
          <span>{error}</span>
        </div>
      )}

      <div className='flex flex-col lg:flex-row gap-8'>
        {/* --- LEFT COLUMN: Shipping Form --- */}
        <div className='flex-1'>
          <div className='card bg-base-200 border border-base-300 shadow-sm'>
            <div className='card-body'>
              <div className='flex justify-between items-center border-b border-base-300 pb-2 mb-4'>
                <h2 className='card-title text-xl'>Shipping Information</h2>

                {/* Geolocation Button */}
                <button
                  type='button'
                  onClick={handleGetLocation}
                  disabled={isLocating || locationSuccess}
                  className={`btn btn-sm ${locationSuccess ? "btn-success text-white" : "btn-outline btn-primary"}`}>
                  {isLocating
                    ? "Locating..."
                    : locationSuccess
                      ? "✓ Location Saved"
                      : "📍 Use Current Location"}
                </button>
              </div>

              <form
                onSubmit={handleProceedToPayment}
                className='flex flex-col gap-4'>
                <div className='flex gap-4'>
                  <div className='form-control flex-1'>
                    <label className='label text-sm font-semibold text-base-content/70'>
                      First Name
                    </label>
                    <input
                      type='text'
                      name='firstName'
                      required
                      pattern='[A-Za-z ]{2,}'
                      className={inputClass}
                    />
                  </div>
                  <div className='form-control flex-1'>
                    <label className='label text-sm font-semibold text-base-content/70'>
                      Last Name
                    </label>
                    <input
                      type='text'
                      name='lastName'
                      required
                      pattern='[A-Za-z ]{2,}'
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className='form-control'>
                  <label className='label text-sm font-semibold text-base-content/70'>
                    Mobile Number
                  </label>
                  <input
                    type='tel'
                    name='phone'
                    required
                    pattern='[6-9][0-9]{9}'
                    placeholder='9876543210'
                    className={inputClass}
                  />
                </div>

                <div className='form-control'>
                  <label className='label text-sm font-semibold text-base-content/70'>
                    Flat, House no., Building, Company, Apartment
                  </label>
                  <input
                    type='text'
                    name='address'
                    required
                    maxLength='130'
                    className={inputClass}
                  />
                </div>

                <div className='flex gap-4'>
                  <div className='form-control flex-1'>
                    <label className='label text-sm font-semibold text-base-content/70'>
                      Area, Street, Sector, Village (Locality)
                    </label>
                    <input
                      type='text'
                      name='locality'
                      maxLength='30'
                      className={inputClass}
                    />
                  </div>
                  <div className='form-control flex-1'>
                    <label className='label text-sm font-semibold text-base-content/70'>
                      Landmark
                    </label>
                    <input
                      type='text'
                      name='landMark'
                      maxLength='30'
                      placeholder='e.g. Near Apollo Hospital'
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className='flex gap-4'>
                  <div className='form-control flex-1'>
                    <label className='label text-sm font-semibold text-base-content/70'>
                      Town/City
                    </label>
                    <input
                      type='text'
                      name='city'
                      required
                      maxLength='30'
                      className={inputClass}
                    />
                  </div>
                  <div className='form-control flex-1'>
                    <label className='label text-sm font-semibold text-base-content/70'>
                      State
                    </label>
                    <select
                      name='state'
                      required
                      defaultValue=''
                      className={selectClass}>
                      <option value='' disabled>
                        Select State
                      </option>
                      {INDIAN_STATES.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className='flex gap-4'>
                  <div className='form-control flex-1'>
                    <label className='label text-sm font-semibold text-base-content/70'>
                      PIN Code
                    </label>
                    <input
                      type='text'
                      name='pin'
                      required
                      pattern='[1-9][0-9]{5}'
                      maxLength='6'
                      placeholder='e.g. 600001'
                      className={inputClass}
                    />
                  </div>
                  <div className='form-control flex-1'>
                    <label className='label text-sm font-semibold text-base-content/70'>
                      Country
                    </label>
                    <input
                      type='text'
                      disabled
                      value='India'
                      className={`${inputClass} bg-base-300 text-base-content/60`}
                    />
                  </div>
                </div>

                <button
                  type='submit'
                  disabled={isLoading}
                  className='btn btn-primary mt-6 text-lg w-full'>
                  {isLoading ? "Saving..." : "Continue to Payment"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Order Summary (Remains Unchanged) --- */}
        <div className='w-full lg:w-96 shrink-0'>
          <div className='card bg-base-200 border border-base-300 shadow-sm sticky top-24'>
            <div className='card-body'>
              <h2 className='card-title text-xl border-b border-base-300 pb-2'>
                Order Summary
              </h2>
              <div className='flex flex-col gap-3 my-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar'>
                {items.map((item) => (
                  <div
                    key={item.productRef._id}
                    className='flex gap-3 items-center'>
                    <img
                      src={item.productRef.thumbnail}
                      alt={item.productRef.title}
                      className='w-12 h-12 rounded object-cover border border-base-300'
                    />
                    <div className='flex-1'>
                      <p className='text-sm font-bold line-clamp-1'>
                        {item.productRef.title}
                      </p>
                      <p className='text-xs text-base-content/70'>
                        Qty: {item.unitsToBuy}
                      </p>
                    </div>
                    <div className='font-semibold text-sm'>
                      ${item.finalItemPrice.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              <div className='divider my-0'></div>
              <div className='flex justify-between text-base-content/80 mt-2'>
                <span>Subtotal ({totalItems} items):</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
              <div className='flex justify-between text-base-content/80'>
                <span>Shipping:</span>
                <span className='text-success'>Free</span>
              </div>
              <div className='divider my-2'></div>
              <div className='flex justify-between items-center text-xl font-extrabold text-primary'>
                <span>Total:</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
/* Explanation: This React component represents the checkout page. It reads the cart data from Redux to display an order summary and provides a form for the user to enter their shipping information. When the form is submitted, it sends the shipping address to the backend to create a pending order. If successful, it navigates the user to a payment page (not implemented yet) where they will complete their purchase. The component also includes error handling and loading states for better user experience. Additionally, it prevents users from accessing the checkout page with an empty cart by showing a message and a link back to shopping. */
