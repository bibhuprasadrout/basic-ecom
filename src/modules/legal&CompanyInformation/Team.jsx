const Team = () => {
  const members = [
    {
      name: "Bibhu Prasad Rout",
      role: "Founder & Lead Developer",
      img: "https://i.pravatar.cc/150?u=khoka07",
    },
    {
      name: "Support Team",
      role: "Customer Success",
      img: "https://i.pravatar.cc/150?u=support",
    },
  ];

  return (
    <div className='bg-base-100 min-h-screen py-12 px-4'>
      <div className='max-w-5xl mx-auto text-center'>
        <h1 className='text-4xl sm:text-5xl font-black text-primary mb-12 tracking-tighter'>
          Meet Our Team
        </h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
          {members.map((m) => (
            <div
              key={m.name}
              className='card bg-base-200 shadow-xl p-8 hover:scale-105 transition-transform'>
              <div className='avatar justify-center mb-4'>
                <div className='w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                  <img src={m.img} alt={m.name} />
                </div>
              </div>
              <h2 className='card-title justify-center text-xl'>{m.name}</h2>
              <p className='text-primary font-medium'>{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Team;
