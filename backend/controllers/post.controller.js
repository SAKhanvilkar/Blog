import ImageKit from "imagekit";
import Post from "../models/post-model.js"
import User from "../models/user-model.js"


export const getPosts = async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 2;

      const query = {};
      console.log(req.query);

      const cat = req.query.cat;
      const author = req.query.author;
      const searchQuery = req.query.search;
      const sortQuery = req.query.sort;
      const featured = req.query.featured;
      
      if(cat){
        query.category.cat;
      }

      if(searchQuery){
        query.title = {$regex: searchQuery, $options: "i"};
      }

      if(author){
        const user = await User.findOne({username:author}).select("_id");

        if(!user){
          res.status(404).json("post not found");
        }
        
        query.user = user._id;
      }

      let sortObj = {createdAt:-1}

      if(sortQuery){
        switch (sortQuery) {
          case "newest":
            sortObj = {createdAt:-1}
            break;
            case "oldest":
              sortObj = {createdAt:1}
            break;
            case "popular":
              sortObj = {visit:-1}
            break;
            case "trendeing":
              sortObj = {visit:-1}
              query.createdAt = {
                $gte: new Date(new Date().getTime() - 7*24*60*60*1000),
              }
            break;
        
          default:
            break;
        }
      }

      if(featured){
        query.isFeatured == true;
      }
      const posts = await Post.find(query)
      .populate("user","username")
      .sort(sortObj)
      .limit(limit)
      .skip((page-1)*limit);
      
      const totalPosts = await Post.countDocuments();
      const hasMore = page * limit < totalPosts;
      res.status(200).json({ posts, hasMore });
  } catch (error) {
      console.log(error);
  }
};
  

export const getPost = async (req,res)=>{
    const post = await Post.findOne({slug: req.params.slug}).populate(
      "user",
      "username img");
    res.status(200).json(post)
}

export const createPosts = async (req, res) => {
  try {
    // Clerk's middleware should have already verified the token and
    // populated req.auth with user information.
    console.log("Request Headers:", req.headers); // Log ALL headers
    console.log("Authorization Header:", req.headers.authorization); // Log Authorization header specifically
    console.log("req.auth:", req.auth); // Log req.auth object
    console.log("CLERK_SECRET_KEY in route:", process.env.CLERK_SECRET_KEY)
    if (!req.auth.userId) {  // Check if user is authenticated
      return res.status(401).json({ message: "Not authenticated" });
    }

    const clerkUserId = req.auth.userId;


      // 2. Use the verified user ID to find the user in your database
      const user = await User.findOne({ clerkUserId });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // ... (rest of your post creation logic remains the same)
      let slug = req.body.title.replace(/ /g, "-").toLowerCase();
      let existingPost = await Post.findOne({ slug });
      let counter = 2;
  
      while (existingPost) {
        slug = `${slug}-${counter}`;
        existingPost = await Post.findOne({ slug });
        counter++;
      }
  
      const newPost = await new Post({ user: user._id, slug, ...req.body });
      const post = await newPost.save();
      res.status(201).json(post);
  
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ message: "Server Error" });
    }
  };

export const deletePosts = async (req,res)=>{

  const clerkUserId = req.auth.userId;

  if(!clerkUserId){
    return res.status(401).json("not authenticated")
  }

  const role = req.auth.sessionClaims?.metadata?.role || "user"

  if(role==="admin"){
    await Post.findByIdAndDelete(req.params.id)
    return res.status(200).json("post has been deleted")
  }

  const user = await User.findOne({clerkUserId})
  
    const deletePost = await Post.findByIdAndDelete({_id:req.params.id, user:user._id})

    if(!deletePost){
      return res.status(403).json("You can delete only your post")
    }
    res.status(200).json("post has been deleted")
};

export const featurePost = async (req,res)=>{

  const clerkUserId = req.auth.userId;
  const postId = req.body.postId;

  if(!clerkUserId){
    return res.status(401).json("not authenticated")
  }

  const role = req.auth.sessionClaims?.metadata?.role || "user"

  if(role !=="admin"){
    return res.status(200).json("You cannot feature post!")
  }

  
  const post = await Post.findById(postId);

  if(!post){
    return res.status(404).json("post not found");
  }
  
  const isFeatured = post.isFeatured;

  const updatedPost = await Post.findByIdAndUpdate(postId,{
    isFeatured:!isFeatured,
  },
    {new:true},
  );

    res.status(200).json(updatedPost)
};


export const uploadAuth = async (req, res) => {
  try {
      const imagekit = new ImageKit({
          urlEndpoint: process.env.IK_URL_ENDPOINT,
          publicKey: process.env.IK_PUBLIC_KEY,
          privateKey: process.env.IK_PRIVATE_KEY,
      });
      const result = await imagekit.getAuthenticationParameters();
      res.send(result);
  } catch (error) {
      console.error("ImageKit authentication error:", error);
      res.status(500).json({ message: "ImageKit authentication failed", error: error.message });
  }
};