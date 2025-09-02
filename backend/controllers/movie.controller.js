import { fetchFromTMDB } from "../services/tmdb.service.js";

export const getTrendingMovie=async(req,res)=>
{
    try
    {
        const data=await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
        const randomMovie=data.results[Math.floor(Math.random()*data.results?.length)];
        res.status(200).json({success:true,content:randomMovie});
    }
    catch (error)
    {
        console.log(`\nError in getTrendingMovie controller: ${error.message}\n`);
        res.status(500).json({success:false, message: "Internal Server Error" });
    }
}