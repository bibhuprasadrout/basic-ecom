import PolicyLayout from "./PolicyLayout";
const PrivacyPolicy = () => (
  <PolicyLayout title='Privacy Policy'>
    <h3 className='font-bold text-lg mt-4'>1. Information Collection</h3>
    <p>
      We collect information you provide directly to us when you create an
      account, such as your name and email.
    </p>
    <h3 className='font-bold text-lg mt-4'>2. Data Usage</h3>
    <p>
      Your data is used solely to process orders and improve your shopping
      experience.
    </p>
  </PolicyLayout>
);

export default PrivacyPolicy;
