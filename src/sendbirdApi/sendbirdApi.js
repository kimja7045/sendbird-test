import SendBird from 'sendbird';
import { SENDBIRD_KEY } from '@env';

export const sendbirdApi = new SendBird({
  appId: SENDBIRD_KEY,
});

export const connectSendbird = async ({ id, nickname, profileImage }) => {
  const onConnectSendbird = (userId) => {
    return new Promise((resolve, reject) => {
      sendbirdApi.connect(userId, (user, error) => {
        error ? reject('Sendbird login failed.') : resolve(user);
      });
    });
  };

  const updateCurrentUserInfoAtSendbird = (name, profileUrl) => {
    return new Promise((resolve, reject) => {
      sendbirdApi.updateCurrentUserInfo(name, profileUrl, (user, error) => {
        error ? reject('Unable to update user profile.') : resolve(user);
      });
    });
  };

  try {
    if (!id || !nickname) return null;

    await onConnectSendbird(id.toString());
    const user = await updateCurrentUserInfoAtSendbird(nickname, profileImage);
    return user;
  } catch (error) {
    console.log('!!sendbird error', error);
    return null;
  }
};
