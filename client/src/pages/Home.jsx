import { getPosts } from '../api'
import { useState, useEffect } from 'react'
import { BlogCard } from '../components/BlogCard'

export const Home = () => {
  return (
    <div className='bg-green-400 mt-2'>
      <h1>Welcome Home</h1>
    </div>
  )
}


// export function Home() {

//   const [posts,setPosts] = useState([]) // Should pass in empty [] to avoid error if we are mapping datas

//   useEffect(() => {
//     async function loadAllPosts() {
//         const data = await getPosts()
//         data.sort((d1, d2) => new Date(d2.dateCreated).getTime() - new Date(d1.dateCreated).getTime())
//         setPosts(data)
//     }
//     // loadAllPosts()
// }, [])

//     return (
//       <div className='posts'>
//         {posts.map((post) => {
//           return (
//             <>
//               <BlogCard post={post}/>
//             </>
//           );
//         })}
//       </div>
//     )
//   }
  