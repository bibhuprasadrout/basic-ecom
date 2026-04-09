import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config/Constants";
import PropsTypes from "prop-types";

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

// This handles switching between a clean text display and an input field
const ProfileField = ({
  label,
  value,
  isEditing,
  children,
  colSpan = "col-span-1",
}) => {
  return (
    <div className={`form-control ${colSpan}`}>
      <label className='label text-xs sm:text-sm font-semibold text-base-content/60 uppercase tracking-wider pb-1'>
        {label}
      </label>
      {isEditing ? (
        // When editing, render the input field passed as children
        children
      ) : (
        // When reading, render clean, styled text. Fallback to a dash if empty.
        <div className='px-1 py-2 text-base font-medium text-base-content min-h-10'>
          {value || (
            <span className='text-base-content/30 italic'>Not provided</span>
          )}
        </div>
      )}
    </div>
  );
};

ProfileField.propTypes = {
  label: PropsTypes.string.isRequired,
  value: PropsTypes.any,
  isEditing: PropsTypes.bool.isRequired,
  children: PropsTypes.node,
  colSpan: PropsTypes.string,
};

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [pageError, setPageError] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}auth/profile`, {
          withCredentials: true,
        });
        const userData = res.data.user;
        console.log("Fetched user data:", userData);
        setUser(userData);
        const formattedDate = userData.birthDate
          ? new Date(userData.birthDate).toISOString().split("T")[0]
          : "";
        setFormData({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          middleName: userData.middleName || "",
          maidenName: userData.maidenName || "",
          phone: userData.phone || "",
          gender: userData.gender || "",
          birthDate: formattedDate,
          image: userData.image || "",
          bloodGroup: userData.bloodGroup || "",
          company: {
            name: userData.company?.name || "",
            title: userData.company?.title || "",
          },
          address: {
            address: userData.address?.address || "",
            locality: userData.address?.locality || "",
            landMark: userData.address?.landMark || "",
            city: userData.address?.city || "",
            state: userData.address?.state || "",
            pin: userData.address?.pin || "",
          },
        });
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setPageError(
          "Failed to load your profile data. Please try again later.",
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: "", text: "" });
    try {
      const res = await axios.patch(`${BASE_URL}/profile`, formData, {
        withCredentials: true,
      });
      setUser(res.data.data);
      setIsEditing(false);
      setMessage({ type: "success", text: "Profile updated successfully!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to update profile.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // Reset form data back to original user state if cancelled
    const formattedDate = user?.birthDate
      ? new Date(user.birthDate).toISOString().split("T")[0]
      : "";
    setFormData({
      ...formData,
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      middleName: user?.middleName || "",
      maidenName: user?.maidenName || "",
      phone: user?.phone || "",
      gender: user?.gender || "",
      birthDate: formattedDate,
      image: user?.image || "",
      bloodGroup: user?.bloodGroup || "",
      company: {
        name: user?.company?.name || "",
        title: user?.company?.title || "",
      },
      address: {
        address: user?.address?.address || "",
        locality: user?.address?.locality || "",
        landMark: user?.address?.landMark || "",
        city: user?.address?.city || "",
        state: user?.address?.state || "",
        pin: user?.address?.pin || "",
      },
    });
    setIsEditing(false);
  };

  const inputClass =
    "input input-bordered w-full focus:outline-none focus:border-base-300 focus:ring-0 disabled:opacity-70 disabled:bg-base-200";
  const selectClass =
    "select select-bordered w-full focus:outline-none focus:border-base-300 focus:ring-0 disabled:opacity-70 disabled:bg-base-200";

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-[60vh]'>
        <span className='loading loading-spinner loading-lg text-primary'></span>
      </div>
    );
  }

  if (pageError) {
    return (
      <div className='flex flex-col justify-center items-center min-h-[60vh] gap-4 text-center px-4'>
        <h2 className='text-2xl font-bold text-error'>Oops!</h2>
        <p className='text-base-content/70'>{pageError}</p>
        <button
          onClick={() => window.location.reload()}
          className='btn btn-outline'>
          Refresh Page
        </button>
      </div>
    );
  }
  return (
    <div className='max-w-5xl mx-auto px-4 py-8 bg-base-100 min-h-screen'>
      {/* Header Area */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8'>
        <div>
          <h1 className='text-3xl font-bold'>My Profile</h1>
          <p className='text-base-content/60 mt-1'>
            Manage your personal and account details.
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className='btn btn-primary px-8 shadow-sm'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-5 h-5'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10'
              />
            </svg>
            Edit Profile
          </button>
        )}
      </div>

      {message.text && (
        <div
          className={`alert ${message.type === "error" ? "alert-error" : "alert-success"} mb-6 rounded-lg text-white shadow-md`}>
          <span>{message.text}</span>
        </div>
      )}

      <div className='bg-base-100 rounded-2xl shadow-xl border border-base-200 overflow-hidden'>
        <form onSubmit={handleSave}>
          {/* Top Banner & Avatar Section */}
          <div className='bg-base-200/50 p-6 sm:p-10 border-b border-base-200 flex flex-col sm:flex-row gap-8 items-center sm:items-start'>
            <div className='avatar'>
              <div className='w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4 shadow-lg bg-base-100'>
                <img
                  src={formData.image || "https://dummyjson.com/image/130x200"}
                  alt='Profile'
                  className='object-cover'
                />
              </div>
            </div>

            <div className='flex-1 w-full flex flex-col justify-center h-full pt-2'>
              {isEditing ? (
                <div className='form-control w-full max-w-md'>
                  <label className='label text-sm font-semibold text-base-content/70'>
                    Profile Image URL
                  </label>
                  <input
                    type='url'
                    name='image'
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder='https://...'
                    className={inputClass}
                  />
                </div>
              ) : (
                <div className='text-center sm:text-left'>
                  <h2 className='text-2xl font-bold'>{`${user?.firstName} ${user?.lastName}`}</h2>
                  <p className='text-base-content/60 mt-1'>
                    {user?.company?.title || "Valued Customer"}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className='p-6 sm:p-10 flex flex-col gap-10'>
            {/* Account Security (Always Read-Only) */}
            <section>
              <h3 className='text-xl font-bold text-primary mb-6 flex items-center gap-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                  stroke='currentColor'
                  className='w-6 h-6'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z'
                  />
                </svg>
                Account Credentials
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 p-6 bg-base-200/30 rounded-xl border border-base-200'>
                <ProfileField
                  label='Username'
                  value={user?.userName}
                  isEditing={false}
                />
                <ProfileField
                  label='Email Address'
                  value={user?.email}
                  isEditing={false}
                />
              </div>
            </section>

            {/* Personal Details */}
            <section>
              <h3 className='text-xl font-bold text-primary mb-6 flex items-center gap-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                  stroke='currentColor'
                  className='w-6 h-6'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
                  />
                </svg>
                Personal Details
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6'>
                <ProfileField
                  label='First Name'
                  value={formData.firstName}
                  isEditing={isEditing}>
                  <input
                    type='text'
                    name='firstName'
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    pattern='[A-Za-z ]{2,}'
                    className={inputClass}
                  />
                </ProfileField>

                <ProfileField
                  label='Last Name'
                  value={formData.lastName}
                  isEditing={isEditing}>
                  <input
                    type='text'
                    name='lastName'
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    pattern='[A-Za-z ]{2,}'
                    className={inputClass}
                  />
                </ProfileField>

                <ProfileField
                  label='Middle Name'
                  value={formData.middleName}
                  isEditing={isEditing}>
                  <input
                    type='text'
                    name='middleName'
                    value={formData.middleName}
                    onChange={handleInputChange}
                    pattern='[A-Za-z ]*'
                    className={inputClass}
                  />
                </ProfileField>

                <ProfileField
                  label='Maiden Name'
                  value={formData.maidenName}
                  isEditing={isEditing}>
                  <input
                    type='text'
                    name='maidenName'
                    value={formData.maidenName}
                    onChange={handleInputChange}
                    pattern='[A-Za-z ]*'
                    className={inputClass}
                  />
                </ProfileField>

                <ProfileField
                  label='Mobile Number'
                  value={formData.phone}
                  isEditing={isEditing}>
                  <input
                    type='tel'
                    name='phone'
                    value={formData.phone}
                    onChange={handleInputChange}
                    pattern='[6-9][0-9]{9}'
                    className={inputClass}
                  />
                </ProfileField>
              </div>
            </section>

            <div className='divider opacity-30'></div>

            {/* Physical & Medical */}
            <section>
              <h3 className='text-xl font-bold text-primary mb-6 flex items-center gap-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                  stroke='currentColor'
                  className='w-6 h-6'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z'
                  />
                </svg>
                Physical & Medical
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6'>
                <ProfileField
                  label='Date of Birth'
                  value={formData.birthDate}
                  isEditing={isEditing}>
                  <input
                    type='date'
                    name='birthDate'
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    className={inputClass}
                  />
                </ProfileField>

                <ProfileField
                  label='Gender'
                  value={<span className='capitalize'>{formData.gender}</span>}
                  isEditing={isEditing}>
                  <select
                    name='gender'
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={selectClass}>
                    <option value='' disabled>
                      Select Gender
                    </option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                    <option value='other'>Other</option>
                  </select>
                </ProfileField>

                <ProfileField
                  label='Blood Group'
                  value={formData.bloodGroup}
                  isEditing={isEditing}>
                  <select
                    name='bloodGroup'
                    value={formData.bloodGroup}
                    onChange={handleInputChange}
                    className={selectClass}>
                    <option value='' disabled>
                      Select Type
                    </option>
                    <option value='A+'>A+</option>
                    <option value='A-'>A-</option>
                    <option value='B+'>B+</option>
                    <option value='B-'>B-</option>
                    <option value='O+'>O+</option>
                    <option value='O-'>O-</option>
                    <option value='AB+'>AB+</option>
                    <option value='AB-'>AB-</option>
                  </select>
                </ProfileField>
              </div>
            </section>

            <div className='divider opacity-30'></div>

            {/* Professional Details */}
            <section>
              <h3 className='text-xl font-bold text-primary mb-6 flex items-center gap-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                  stroke='currentColor'
                  className='w-6 h-6'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z'
                  />
                </svg>
                Professional Details
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6'>
                <ProfileField
                  label='Company Name'
                  value={formData.company.name}
                  isEditing={isEditing}>
                  <input
                    type='text'
                    name='company.name'
                    value={formData.company.name}
                    onChange={handleInputChange}
                    maxLength='50'
                    className={inputClass}
                  />
                </ProfileField>
                <ProfileField
                  label='Job Title'
                  value={formData.company.title}
                  isEditing={isEditing}>
                  <input
                    type='text'
                    name='company.title'
                    value={formData.company.title}
                    onChange={handleInputChange}
                    maxLength='30'
                    className={inputClass}
                  />
                </ProfileField>
              </div>
            </section>

            <div className='divider opacity-30'></div>

            {/* Default Address */}
            <section>
              <h3 className='text-xl font-bold text-primary mb-6 flex items-center gap-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                  stroke='currentColor'
                  className='w-6 h-6'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z'
                  />
                </svg>
                Default Shipping Address
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6'>
                <ProfileField
                  label='Flat, House no., Building'
                  value={formData.address.address}
                  isEditing={isEditing}
                  colSpan='md:col-span-2'>
                  <input
                    type='text'
                    name='address.address'
                    value={formData.address.address}
                    onChange={handleInputChange}
                    maxLength='130'
                    className={inputClass}
                  />
                </ProfileField>

                <ProfileField
                  label='Locality, Sector'
                  value={formData.address.locality}
                  isEditing={isEditing}>
                  <input
                    type='text'
                    name='address.locality'
                    value={formData.address.locality}
                    onChange={handleInputChange}
                    maxLength='30'
                    className={inputClass}
                  />
                </ProfileField>

                <ProfileField
                  label='Landmark'
                  value={formData.address.landMark}
                  isEditing={isEditing}>
                  <input
                    type='text'
                    name='address.landMark'
                    value={formData.address.landMark}
                    onChange={handleInputChange}
                    maxLength='30'
                    className={inputClass}
                  />
                </ProfileField>

                <ProfileField
                  label='City'
                  value={formData.address.city}
                  isEditing={isEditing}>
                  <input
                    type='text'
                    name='address.city'
                    value={formData.address.city}
                    onChange={handleInputChange}
                    maxLength='30'
                    className={inputClass}
                  />
                </ProfileField>

                <ProfileField
                  label='State'
                  value={formData.address.state}
                  isEditing={isEditing}>
                  <select
                    name='address.state'
                    value={formData.address.state}
                    onChange={handleInputChange}
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
                </ProfileField>

                <ProfileField
                  label='PIN Code'
                  value={formData.address.pin}
                  isEditing={isEditing}>
                  <input
                    type='text'
                    name='address.pin'
                    value={formData.address.pin}
                    onChange={handleInputChange}
                    pattern='[1-9][0-9]{5}'
                    maxLength='6'
                    className={inputClass}
                  />
                </ProfileField>

                <ProfileField
                  label='Country'
                  value='India'
                  isEditing={isEditing}>
                  <input
                    type='text'
                    value='India'
                    disabled
                    className={`${inputClass} bg-base-200 opacity-70`}
                  />
                </ProfileField>
              </div>
            </section>

            {/* Action Buttons */}
            {isEditing && (
              <div className='flex justify-end gap-4 mt-4 border-t border-base-300 pt-8'>
                <button
                  type='button'
                  onClick={handleCancel}
                  disabled={isSaving}
                  className='btn btn-ghost px-6'>
                  Cancel
                </button>
                <button
                  type='submit'
                  disabled={isSaving}
                  className='btn btn-primary px-10 shadow-md'>
                  {isSaving ? (
                    <span className='loading loading-spinner loading-sm'></span>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
