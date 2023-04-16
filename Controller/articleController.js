const { set } = require("mongoose");
const articles = require("../Model/articles")
const { format } = require("date-fns")
const { formatDistanceToNow } = require("date-fns");
const article = require("../Model/articles");
// add new peom and prevent duplication also!!!
const addNewArticle = async(req, res) => {
    if(!req?.body?.articleTitle || !req?.body?.articleGenre || !req?.body?.articleDetails || !req?.body?.articleAuthor){
        return res.status(400).json({message : "article title, article genre, article author and article details are required"});
    }
    try{
        const isDuplicate = await articles.exists({  
            articleTitle: req.body.articleTitle ,
            articleGenre: req.body.articleGenre ,
            articleDetails: req.body.articleDetails,
            articleAuthor : req.body.articleAuthor
          });
      
          if (isDuplicate) {
            return res
              .status(400)
              .json({ message: "Article title, genre or details already exist" });
          }
        const result = await articles.create({
            articleTitle: req.body.articleTitle,
            articleGenre: req.body.articleGenre,
            articleDetails: req.body.articleDetails,
            articleAuthor : req.body.articleAuthor,
            createdAt: format(new Date(), "MMMM-dd',' yyyy hh:mm aaa")
        });
       
        console.log("new article added");
        return res.status(201).json({message: "New article added."});
    } catch(error){
        console.log(error);
        return res.status(500).json({message : "Internal Server Error"});
    }
};

const getAllArticles =  async (req, res) => {
    try {
      const article = await articles.find({});
      return res.status(200).json({ article });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Unable to get articles" });
    }
  }

 const getSingleArticle = async(req,res) => {
    try{
       const singleArticle = await article.findById(req.params.id)
       if(!singleArticle) return res.status(404).json({message: "article not found"})
       res.status(200).json(singleArticle)
    }catch(err) {
        console.log(err)
        res.status(500).json({message: "Unable to get the article"})
    }
 } 

 const updateArticle = async (req, res) => {
  try {
    if (!req?.body) return res.status(400).json({ message: "Nothing to be updated" });
    
    const updatedArticle = await article.findByIdAndUpdate(req.params.id, {
      articleTitle: req.body.articleTitle,
      articleGenre: req.body.articleGenre,
      articleDetails: req.body.articleDetails,
      articleAuthor: req.body.articleAuthor,
      updatedAt: format(new Date(), "MMMM-dd',' yyyy hh:mm aaa")
    }, { new: true });

    res.status(200).json({ updatedArticle });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
}


 const deleteArticle =  async(req, res) => {
    try {
      const deletedStory = await article.findByIdAndDelete(req.params.id);
      if (deletedStory) {
        res.status(200).json({ message: "Article deleted" });
      } else {
        res.status(404).json({ message: "Article not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }

 module.exports = {
    addNewArticle,
    getAllArticles,
    getSingleArticle,
    updateArticle,
    deleteArticle
 } 