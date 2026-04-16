const ContactUs = () => {
  return (
    <div className='bg-base-100 min-h-screen py-12 px-4'>
      <div className='max-w-5xl mx-auto'>
        <h1 className='text-4xl sm:text-5xl font-black text-primary mb-8 tracking-tighter text-center'>
          Contact Us
        </h1>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 bg-base-200 rounded-3xl p-6 sm:p-12 shadow-xl'>
          {/* Contact Info */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-bold'>Get in Touch</h2>
            <p className='text-base-content/70'>
              Have a question about your order or our platform? Drop us a
              message and our team will get back to you within 24 hours.
            </p>
            <div className='space-y-4'>
              <div className='flex items-center gap-4'>
                <div className='btn btn-circle btn-primary btn-outline'>📍</div>
                <span>Chennai, Tamil Nadu, India</span>
              </div>
              <div className='flex items-center gap-4'>
                <div className='btn btn-circle btn-primary btn-outline'>📧</div>
                <span>bibhuprasadrout07@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className='space-y-4'>
            <div className='form-control'>
              <label className='label font-bold'>Name</label>
              <input
                type='text'
                placeholder='Your Name'
                className='input input-bordered bg-base-100'
              />
            </div>
            <div className='form-control'>
              <label className='label font-bold'>Email</label>
              <input
                type='email'
                placeholder='email@example.com'
                className='input input-bordered bg-base-100'
              />
            </div>
            <div className='form-control'>
              <label className='label font-bold'>Message</label>
              <textarea
                className='textarea textarea-bordered bg-base-100 h-32'
                placeholder='How can we help?'></textarea>
            </div>
            <button className='btn btn-primary w-full'>Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ContactUs;
