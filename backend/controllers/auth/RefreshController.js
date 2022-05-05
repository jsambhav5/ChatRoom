class RefreshController {
	async hello(req, res) {
		return res.status(200).send("Hello World!");
	}
}

export default new RefreshController();
