const { nanoid } = require("nanoid");
const Url = require("../models/url");

module.exports.createShortUrl = async (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: "Long URL is required" });
  }

  try {
    const urlCode = nanoid(8);

    const newUrl = new Url({
      shortId: urlCode,
      originalUrl: longUrl,
    });
    // Save the new URL to the database
    await newUrl.save();
    res.status(201).redirect('/' , { urlCode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports.getOriginalUrl = async (req, res) => {
  let shortId = req.params.shortId;
  try {
    const url = await Url.findOne({ shortId: shortId });
    if( !url ) return res.status(404).json({ error: "No URL found" });

    const urlEntry = await Url.findOneAndUpdate(
      { shortId: shortId },
      {
        $push: {
          visitCount: {
            timestamp: Date.now(),
            user_ip: req.ip || "Unknown IP",
          },
        },
      }
    );
    res.redirect( urlEntry.originalUrl );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports.getAnalyticsForm = (req , res)=>{
    res.render('urlAnalytics.ejs')
}

module.exports.urlAnalytics = async( req , res )=>{
    const shortId = req.params.shortId;
    try {
        const url = await Url.findOne({ shortId: shortId });
        console.log(url);
        if( !url ){
            return res.status(404).json({ error: "No URL found" });
        } 

        res.status(200).json({ totalClicks : url.visitCount.length,analytics : url.visitCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });        
    }
}



module.exports.deleteShortUrl = async (req, res) => {
  try {
    const url = await Url.findOneAndDelete({ shortId: req.params.shortId });

    if (url) {
      return res.status(200).json({ message: "URL deleted successfully" });
    } else {
      return res.status(404).json({ error: "No URL found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
