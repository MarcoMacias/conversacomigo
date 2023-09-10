/*****************************************************************************
 *
 *  PROJECT:     Conversa Comigo
 *  LICENSE:     See LICENSE in the top level directory
 *  AUTHOR:      Vítor Ribeiro (flashii) Powered by: https://varsel.com.br
 *
 *****************************************************************************/
import { Either, left, right } from "@core/logic/Either";
import { RoomNotFound } from "./errors/RoomNotFound";
import worker from "src/main";
import { RoomMapper } from "@modules/websocket/namespaces/Master/mappers/RoomMapper";

type GetRoomMessagesRequest = {
  roomId: string;
};

type RoomMessages = {
  messages: RoomMessages[];
};

type GetRoomMessagesResponse = Either<RoomNotFound, RoomMessages>;

export class GetRoomMessages {
  constructor() {}

  async execute({
    roomId,
  }: GetRoomMessagesRequest): Promise<GetRoomMessagesResponse> {
    const room = worker.namespace.rooms.find((room) => room.id === roomId);

    if (!room) {
      return left(new RoomNotFound());
    }

    return right({
      messages: (RoomMapper.toPersistence(room)
        .messages as unknown) as RoomMessages[],
    });
  }
}
