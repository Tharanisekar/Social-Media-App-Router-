import {Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Missing from "./Missing";
import Nav from "./Nav";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import Post from "./Post";
import PostLayout from "./PostLayout";
import { useEffect, useState } from "react";
import {format} from "date-fns";



function App() {
  const[posts,setPosts]=useState([
    {
      id:1,
      title:"My first Post",
      datetime:"July 01,2023 11:11:11 AM",
      body:"If not now,when?"
    },
    {
      id:2,
      title:"My 2nd Post",
      datetime:"July 03,2023 2:06:30 AM",
      body:"Dont be ordinary be extraordinary"
    },
    {
      id:3,
      title:"My 3rd Post",
      datetime:"August 29,2024 10:23:09 PM",
      body:"Happy girl are the Prettiest"
    },
    {
      id:4,
      title:"My Fourth Post",
      datetime:"september 5,2023 4:11:11 AM",
      body:"she is clothed with happiness"
    }
  ])
  const[search,setSearch]=useState('')
  const[searchResults,setSearchResults]=useState([])
  const[postTitle,setPostTitle]=useState('');
  const[postBody,setPostBody]=useState('');
  const navigate =useNavigate()

  useEffect(()=>{
    const filteredResults = posts.filter((post)=>((post.body).toLowerCase()).includes(search.toLowerCase())
  || ((post.title).toLowerCase()).includes(search.toLowerCase()))
  
  setSearchResults(filteredResults.reverse())
},[posts,search])

  const handleSubmit=(e)=>{
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id+1:1;
    const datetime = format (new Date(), 'MMMM dd, yyyy pp');
    const newPost ={id,title:postTitle,datetime,body:postBody};
    const allPosts =[...posts,newPost];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('')
    navigate('/');
  }

  const handleDelete =(id)=>{
 const postsList=posts.filter(post=>post.id !== id);
 setPosts(postsList); 
navigate('/') }

  return (
    <div className="App">
      
      <Header title="Tharani Webpage"/>
      <Nav 
        search={search}
        setSearch={setSearch}
      />
      <Routes>
      <Route path="/" element ={<Home posts={searchResults}/>} />
      <Route path="post"> 
      <Route index element={<NewPost 
      handleSubmit={handleSubmit}
      postTitle={postTitle}
      setPostTitle={setPostTitle}
      postBody={postBody}
      setPostBody={setPostBody}
      />} />
      <Route path=":id" element={<PostPage posts={posts} handleDelete={handleDelete}/>} />
      </Route>
      <Route path="about" element={<About/>}/>
      <Route path="*" element={<Missing />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
