const { getLatestBooks } = require("../services/BookService")

class IndexController {

    async home(req, res) {
        let response = await getLatestBooks()
        
    	let data = {
    		title: "Home",
            books: response.data
    	}

    	res.render("index", data)
    }

    async explore(req, res) {
		let data = {
			title: "Explore"
		}
		res.render("explore", data)
	}
}

module.exports = new IndexController()