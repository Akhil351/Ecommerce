const UserProfile = () => {
    const user = {
      id: "12345", // Assuming some ID
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phoneNumber: "+1234567890",
      avatar: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png",
      bio: "Passionate software developer with expertise in React and modern web technologies.",
    };
  
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          {/* Cover Image */}
          <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-500"></div>
          
          {/* Profile Info */}
          <div className="relative px-4 py-5 sm:px-6">
            <div className="absolute -mt-16 left-4">
              <img
                className="h-24 w-24 rounded-full border-4 border-white"
                src={user.avatar}
                alt={`${user.firstName} ${user.lastName}`}
              />
            </div>
            
            <div className="ml-32 flex justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{`${user.firstName} ${user.lastName}`}</h1>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                Edit Profile
              </button>
            </div>
          </div>
  
          
  
          {/* Bio */}
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900">Bio</h3>
            <p className="mt-1 text-sm text-gray-500">{user.bio}</p>
          </div>
  
          {/* Contact */}
          <div className="bg-gray-50 px-4 py-5 sm:px-6">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="ml-2 text-sm text-gray-500">{user.email}</span>
            </div>
            <div className="flex items-center mt-2">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6a9 9 0 1118 0c0 4.97-3.91 9-9 9S3 10.97 3 6zm14.07 6.29c1.53-1.11 2.93-2.6 3.72-4.29-1.71-.8-3.2-2.2-4.29-3.72-1.56 1.16-2.89 2.59-3.67 4.14a8.955 8.955 0 01-.79-5.86C10.74 6.68 10 9.43 10 12a9 9 0 11 8.07-9.71z" />
              </svg>
              <span className="ml-2 text-sm text-gray-500">{user.phoneNumber}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default UserProfile;
  