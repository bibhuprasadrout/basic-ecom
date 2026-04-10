const RootlevelFallbackUi = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-[60vh] gap-4'>
      {/* DaisyUI Loading Spinner */}
      <span className='loading loading-spinner loading-lg text-primary'></span>

      <div className='flex flex-col items-center'>
        <h2 className='text-xl font-bold animate-pulse text-base-content/80'>
          Loading basic-ecom...
        </h2>
        <p className='text-sm text-base-content/50'>Fetching your data</p>
      </div>
    </div>
  );
};
export default RootlevelFallbackUi;
