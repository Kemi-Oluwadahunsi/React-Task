// import React from "react";
// import { useState, useEffect } from "react";

// const AdminDashboardPage = () => {
//    const [videos, setVideos] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     fetchVideos();
//   }, [currentPage]); // Fetch videos when currentPage changes

//   const fetchVideos = async () => {
//     try {
//       const response = await fetch(
//         "https://reacttask.mkdlabs.com/v1/api/rest/video/PAGINATE",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "x-project": "cmVhY3R0YXNrOmQ5aGVkeWN5djZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw==",
//             "Bearer": "<token>",
//           },
//           body: JSON.stringify({
//             payload: {},
//             page: currentPage,
//             limit: 10,
//           }),
//         }
//       );
//       if (response.ok) {
//         const data = await response.json();
//         setVideos(data.list);
//       } else {
//         console.error("Failed to fetch videos");
//       }
//     } catch (error) {
//       console.error("Error fetching videos:", error);
//     }
//   };

//   const handleNextPage = () => {
//     setCurrentPage(currentPage + 1);
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   return (
//     <div className="bg-gray-500">
//       <div className="bg-black w-3/4 flex flex-col gap-8 m-auto h-screen text-gray-700 border px-20">
//         <div className="flex justify-between">
//           <h1 className="text-[3rem] font-extrabold text-white">APP</h1>
//           <button className="px-2 h-10 w-28 py-0 rounded-3xl bg-green-300">
//             Logout
//           </button>
//         </div>

//         <div className="flex justify-between">
//           <h3 className="text-2xl">Today's leaderboard</h3>
//           <div className="flex justify-around place-items-center gap-3 text-sm bg-gray-400 rounded-lg p-3">
//             <span className="">30 May 2022 .</span>
//             <span className="px-2 rounded-2xl bg-green-300 flex place-items-center">SUBMISSION OPEN</span>
//             <span>. 11:34</span>
//           </div>
//         </div>

//         <div className="flex justify-between">
//           <div className="flex gap-4">
//             <span>#</span>
//             <span>Title</span>
//           </div>

//           <span>Author</span>

//           <div className="gap-4">
//             <span>Most Liked</span>
//             <span>
//               <i></i>
//             </span>
//           </div>
//         </div>

//         <div className="card">
//           {videos.map((video) => (
//             <div key={video.id} className="left">
//               <span>{video.id}</span>
//               <img src={video.photo} alt={video.title} />
//               <h5>{video.title}</h5>
//             </div>
//           ))}
//         </div>

//         <div className="flex justify-center mt-5">
//           <button
//             className="mr-3 px-4 py-2 bg-green-500 text-white rounded"
//             onClick={handlePrevPage}
//           >
//             Previous
//           </button>
//           <button
//             className="px-4 py-2 bg-green-500 text-white rounded"
//             onClick={handleNextPage}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default AdminDashboardPage;

import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboardPage = () => {
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchVideos();
  }, [currentPage]); // Fetch videos when currentPage changes

  const fetchVideos = async () => {
    try {
      const response = await fetch(
        "https://reacttask.mkdlabs.com/v1/api/rest/video/PAGINATE",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-project":
              "cmVhY3R0YXNrOmQ5aGVkeWN5djZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw==",
            Bearer: "<token>",
          },
          body: JSON.stringify({
            payload: {},
            page: currentPage,
            limit: 10,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setVideos(data.list);
      } else {
        console.error("Failed to fetch videos");
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Clear localStorage
    navigate("/"); // Navigate to AdminLoginPage
  };

  return (
    <div className="bg-gray-500">
      <div className="bg-black w-3/4 flex flex-col gap-8 m-auto h-screen text-gray-700 border px-20">
        <div className="flex justify-between">
          <h1 className="text-[3rem] font-extrabold text-white">APP</h1>
          <button
            className="px-2 h-10 w-28 py-0 rounded-3xl bg-green-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <div className="flex justify-between">
          <h3 className="text-2xl">Today's leaderboard</h3>
          <div className="flex justify-around place-items-center gap-3 text-sm bg-gray-400 rounded-lg p-3">
            <span className="">30 May 2022 .</span>
            <span className="px-2 rounded-2xl bg-green-300 flex place-items-center">
              SUBMISSION OPEN
            </span>
            <span>. 11:34</span>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex gap-4">
            <span>#</span>
            <span>Title</span>
          </div>

          <span>Author</span>

          <div className="gap-4">
            <span>Most Liked</span>
            <span>
              <i></i>
            </span>
          </div>
        </div>

        <div className="card">
          {videos.map((video) => (
            <div key={video.id} className="left">
              <span>{video.id}</span>
              <img src={video.photo} alt={video.title} />
              <h5>{video.title}</h5>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-5">
          <button
            className="mr-3 px-4 py-2 bg-green-500 text-white rounded"
            onClick={handlePrevPage}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboardPage;
