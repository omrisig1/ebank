import { Response, Request } from 'express';

export async function testRoute(req: Request, res: Response) {
  const user = 1;
  res.status(200).json(user);
}

export async function testRoute2(req: Request, res: Response) {
  const user = 1;
  res.status(200).json(user);
}

// // import USER_DAL from "../../db/mongo_user_dal.js";
// import  {Response, Request, NextFunction} from 'express';
// import { UrlError } from "../../error_messages.js";
// import * as user_service2 from "./user.service.js";
// import * as song_service2 from "../song/song.service.js";
// import * as playlist_service2 from "../playlist/playlist.service.js";

// import * as user_service from "./user.sql.service.js";
// import * as song_service from "../song/song.sql.service.js";
// import * as playlist_service from "../playlist/playlist.sql.service.js";
// // import user_model from "../user/user.model.mjs";

// export async function createUser (req: Request, res: Response){
//     const user = await user_service.create(req.body);
//     res.status(200).json(user);
// }

// export async function getAllUsers(req: Request, res: Response) {
//     const users = await user_service.getAllUsers();
//     res.status(200).json(users);

// }

// export async function getUserByID(req: Request, res: Response) {
//     const user = await user_service.getUserByID(req.params.id);
//     if (!user) {
//         throw new UrlError('Url not found for request: '+req.baseUrl+req.url);
//     }
//     res.status(200).json(user);
// }

// export async function deleteUser(req: Request, res: Response){
//     const user = await user_service.deleteUserByID(req.params.id);
//     if (!user) return res.status(404).json({ status: "No user found." });
//     res.status(200).json(user);
// }

// export async function updateUser(req: Request, res: Response){
//     const user = await  user_service.updateUser(req.params.id,req.body);
//     res.status(200).json(user);
// }

// export async function paginate(req: Request, res: Response){
//     const users = await user_service.getAllUsers();
//     res.status(200).json(users);
// }

// export async function createPlayList(req: Request, res: Response) {
//     const playlist = await user_service.createPlaylist(req.body);
//     res.status(200).json(playlist);
// }

// export async function removeFromPlaylist(req: Request, res: Response){
//   const playlist = await user_service.removeFromPlaylist(req.body.playlist_id, req.body.song_id);
//     res.status(200).json(playlist);
// }

// export async function addToPlaylist(req: Request, res: Response){
//    const playlist = await song_service.addSongToPlaylist(req.body.song_id, req.body.playlist_id);
//     res.status(200).json(playlist);
// };
