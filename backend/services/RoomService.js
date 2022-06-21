import { RoomModel } from "../models";

class RoomService {
	async create(payload) {
		const { topic, roomType, ownerId } = payload;
		const room = await RoomModel.create({
			topic,
			roomType,
			ownerId,
			speakers: [ownerId],
		});
		return room;
	}

	async getAllRooms(roomTypes) {
		const rooms = await RoomModel.find({ roomType: { $in: roomTypes } })
			.populate("speakers")
			.populate("ownerId")
			.exec();
		return rooms;
	}

	async getRoom(roomId) {
		const room = await RoomModel.findOne({ _id: roomId });
		return room;
	}
}

export default new RoomService();
