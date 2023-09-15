 import parseColor from 'parse-color';
 import {FS, Image, Net, Utils} from '../../lib';
 import {escapeHTML} from '../../lib/utils';

 /**
	* Avatar Logic
  */

	const AVATAR_ERROR_WRITING_IMAGE = 'Unable to write image. Please try again or contact an administrator.';
	const AVATAR_UNKNOWN_ERROR = 'An unknown error occured. Please try again or contact an administrator.';

	interface AvatarStatus {
		enabled: boolean;
		requestedAvatar?: string;
		avatar?: string;
	}

	type AvatarConfig = Record<string, AvatarStatus>;

	export const avatars: AvatarConfig = JSON.parse(
		FS('config/chat-plugins/custom-avatars.json').readIfExistsSync() || "{}"
	);

	const saveAvatars = () => {
		FS('config/chat-plugins/custom-avatars.json').writeUpdate(() => JSON.stringify(avatars));
	};

	const updateAvatarStatus = (id: string, statusUpdate: Partial<AvatarStatus>) => {
		const avatarStatus = avatars[id];

		const newStatus: AvatarStatus = {
			enabled: false,
		};

		avatars[id] = {
			...newStatus,
			...avatarStatus,
			...statusUpdate,
		};

		saveAvatars();
	};

	const createAvatarHtml = (
		avatarName: string,
		isCustom = false,
	) => `<img src="//${Config.routes.client}/sprites/trainers${isCustom ? '-custom' : ''}/${avatarName}.png" title="${avatarName}" alt="${avatarName}" width="80" height="80" class="pixelated" />`; // eslint-disable-line max-len
	
	const createRawAvatarHtml = (
		avatarFileName: string,
		isRequest = false,
	) => `<avatar avatarfilename="${Utils.escapeHTML(avatarFileName)}"${isRequest ? ' "request" ' : " "} />`;

	const getUsername = (userId: string) => Users.get(userId)?.name || userId;

	const createPendingAvatarRequestHtml = (userId: string, avatarFileName: string, isBroadcast = false) => {
		const username = getUsername(userId);
		let pendingAvatarRequestHtml = '<details>';
		pendingAvatarRequestHtml += `<summary><b>${username}${isBroadcast ? ' Custom Avatar Request' : ''}</b></summary>`;
		pendingAvatarRequestHtml += createRawAvatarHtml(avatarFileName, true) + '<br />';
		pendingAvatarRequestHtml += `<button class="button" name="send" value="/custom avatar approve ${userId}">Approve</button>`;
		pendingAvatarRequestHtml += `<button class="button" name="send" value="/custom avatar deny ${userId}">Deny</button>`;
		return pendingAvatarRequestHtml + '</details>';
	};

	const sendPM = (message: string, userId: ID) => {
		const user = Users.get(userId);
	
		if (user) {
			user.send(`|pm|&|${user.getIdentity()}|${message}`);
		}
	};
	
	const notifyAvatarStaff = (requesterId: string, fileName: string) => {
		const staffRoom = Rooms.get('staff');
	
		if (staffRoom) {
			staffRoom.sendMods(`|uhtml|avatar-request-${requesterId}|${createPendingAvatarRequestHtml(requesterId, fileName, true)}`);
		}
	};
	
	const removeAvatarStaffNotificiation = (requesterId: string) => {
		const staffRoom = Rooms.get('staff');
	
		if (staffRoom) {
			staffRoom.sendMods(
				Utils.html`|uhtml|avatar-request-${requesterId}|`,
			);
		}
	};

	export const commands: Chat.ChatCommands = {
		custom: {
			avatars: 'avatar',
			avatar: {
				async request(target, room, user) {
					try {
						const imageUrl = target.trim();
						const imageResult = await Image.downloadImageWithVerification(imageUrl, {
							validTypes: ['png', 'gif'],
							maxDimensions: { width: 80, height: 80 },
							minDimensions: { width: 80, height: 80 },
							fileSize: 200000,
						});

						if('error' in imageResult) {
							throw new Chat.ErrorMessage(imageResult.error);
						}

						const { image, type } = imageResult;

						try {
							const fileName = `${user.id}.${type}`;
							await FS(`./config/avatars/requests/${fileName}`).write(image);

							updateAvatarStatus(user.id, { requestedAvatar: fileName});

							notifyAvatarStaff(user.id, fileName);

							return this.sendReplyBox(`Requested: ${createRawAvatarHtml(fileName, true)}`);
						} catch (error) {
							throw new Chat.ErrorMessage(AVATAR_ERROR_WRITING_IMAGE);
						}
					} catch (error) {
						throw new Chat.ErrorMessage(AVATAR_UNKNOWN_ERROR);
					}
				},
				showall: 'showapproved',
				showapproved() {
					this.runBroadcast();
					this.checkCan('avatar');

					const avatarList = Object.entries(avatars).filter(([userId, avatarStatus]) => avatarStatus.avatar !== undefined);

					if(!avatarList.length) {
						return this.sendReplyBox('<b><u>Approved Avatars</u></b><br /><div>No approved avatars.</div>')
					}

					/* eslint-disable max-len */
				const avatarListHtml = avatarList.map(
					([
						userId,
						avatarStatus,
					]) => `<span style="display: inline-block;"><div>${getUsername(userId)}</div><div>${createRawAvatarHtml(avatarStatus.avatar || '')}</div></span>`
				).join(' ');
				/* eslint-enable max-len */
	
				return this.sendReplyBox('<b><u>Approved Avatars</u></b><br />' + avatarListHtml);
				},
				showrequests: 'requests',
			requests() {
				this.checkCan('avatar');
	
				const requestList = Object.entries(avatars)
					.filter(([userId, avatarStatus]) => avatarStatus.requestedAvatar !== undefined);
	
				if (!requestList.length) {
					return this.sendReplyBox('<b><u>Avatar Requests</u></b><br />' + `<div>No requests available.</div>`);
				}
	
				const requestListHtml = requestList.map(
					([userId, avatarStatus]) => createPendingAvatarRequestHtml(userId, avatarStatus.requestedAvatar || ''),
				).join('<br />');
	
				return this.sendReplyBox('<b><u>Avatar Requests</u></b><br />' + requestListHtml);
			},
			approve(target) {
				this.checkCan('avatar');
	
				const targetId = toID(target);
				const avatarStatus = avatars[targetId];
	
				if (!avatarStatus || !avatarStatus.requestedAvatar) {
					throw new Chat.ErrorMessage(`No avatar request for ${targetId}`);
				}
	
				updateAvatarStatus(targetId, {
					avatar: avatarStatus.requestedAvatar,
					requestedAvatar: undefined,
				});
	
				FS(`./config/avatars/requests/${avatarStatus.requestedAvatar}`)
					.renameSync(`./config/avatars/${avatarStatus.requestedAvatar}`);
	
				sendPM(`/html <div class="infobox"><div>Avatar approved</div><div>${createRawAvatarHtml(avatarStatus.requestedAvatar)}</div></div>`, targetId);
				removeAvatarStaffNotificiation(targetId);
	
				return this.sendReplyBox(`<div><div>Approved avatar request of ${targetId}</div><div>${createRawAvatarHtml(avatarStatus.requestedAvatar)}</div></div>`);
			},
			deny(target) {
				this.checkCan('avatar');
	
				const targetId = toID(target);
				const avatarStatus = avatars[targetId];
	
				if (!avatarStatus || !avatarStatus.requestedAvatar) {
					throw new Chat.ErrorMessage(`No avatar request for ${targetId}`);
				}
	
				updateAvatarStatus(targetId, {
					requestedAvatar: undefined,
				});
	
				FS(`./config/avatars/requests/${avatarStatus.requestedAvatar}`).unlinkIfExistsSync();
	
				sendPM('Your avatar request was denied.', targetId);
				removeAvatarStaffNotificiation(targetId);
	
				return this.sendReply(`Denied avatar request of ${targetId}`);
			},
			on(target, room, user) {
				updateAvatarStatus(user.id, {enabled: true});
	
				return this.sendReplyBox('Enabled custom avatar.');
			},
			off(target, room, user) {
				updateAvatarStatus(user.id, {enabled: false});
	
				return this.sendReplyBox('Disabled custom avatar.');
			},
			'': 'help',
			help() {
				return this.parse('/help custom avatar');
			},
		},
			avatarhelp() {
				this.sendReplyBox(
					`<code>/custom avatar request [image url]</code>: requests a custom avatar. Requires: custom avatar access<br />` +
					`<code>/custom avatar showall</code>: shows all approved avatars. Requires: @ or above<br />` +
					`<code>/custom avatar showrequests</code>: shows all un-approved avatars. Requires: @ or above<br />` +
					`<code>/custom avatar approve [user]</code>: approves the user's avatar request. Requires: @ or above<br />` +
					`<code>/custom avatar deny [user]</code>: denies the user's avatar request. Requires: @ or above<br />` +
					`<code>/custom avatar on</code>: enables your own custom avatar.<br />` +
					`<code>/custom avatar off</code>: disables your own custom avatar.<br />` +
					`<code>/custom avatar blobbos</code>: enables the covetted Blobbos avatar.<br />`
				);
			},
			}
		};