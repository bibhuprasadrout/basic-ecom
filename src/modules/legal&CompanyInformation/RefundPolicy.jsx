import PolicyLayout from "./PolicyLayout";
const RefundPolicy = () => (
  <PolicyLayout title='Refund Policy'>
    <p>
      At basic-ecom, we do not offer any refunds. If you are not satisfied with
      your purchase, you can request an exchange which shall be subject to our
      exchange policy.
    </p>
    <ul className='list-disc pl-5 mt-4'>
      <li>Items must be in original condition.</li>
      <li>Proof of purchase is required.</li>
    </ul>
  </PolicyLayout>
);
export default RefundPolicy;
