import { RoomDTO } from "../dtos";
import { RoomService } from "../services";

class RoomController {
	async create(req, res) {
		const { topic, roomType } = req.body;

		if (!topic || !roomType) {
			return res.status(400).send({ message: "Room Created" });
		}

		try {
			const room = await RoomService.create({
				topic,
				roomType,
				ownerId: req.user.id,
			});

			const roomDTO = new RoomDTO(room);
			return res.status(201).send({
				message: "Room Created",
				room: roomDTO,
			});
		} catch (error) {
			return res.status(500).json({ message: "Could not Create Room" });
		}
	}

	async index(req, res) {
		try {
			const rooms = await RoomService.getAllRooms(["open"]);
			const allRooms = rooms.map((room) => new RoomDTO(room));
			return res.status(200).json(allRooms);
		} catch (error) {
			return res.status(500).json({ message: "Could not Fetch Rooms" });
		}
	}

	async show(req, res) {
		try {
			const room = await RoomService.getRoom(req.params.roomId);
			return res.status(200).json(room);
		} catch (error) {
			return res
				.status(500)
				.json({ message: "Could not Fetch the Room" });
		}
	}
}

export default new RoomController();
