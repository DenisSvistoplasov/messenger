import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';
import { DocumentData, Query, Timestamp, Unsubscribe, arrayUnion, collection, doc, documentId, getDoc, getDocs, increment, limit, onSnapshot, orderBy, query, setDoc, startAfter, updateDoc, where, writeBatch } from "firebase/firestore";
import { auth, db } from "../firebase";
import { IDialog } from "@/types/dialog";
import { IMessage } from "@/types/message";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { loginToEmail } from "@/utils/login_email";
import { IUser } from '@/types/user';
import { IDBDialog, IDBMessage, IDBUser } from '@/types/DBTypes';
import { createId } from '@/utils/utils';

const MESSAGES_COUNT_LIMIT = 1000;
const UNCONNECTED_USERS_COUNT_LIMIT = 10;

const dialogsRef = collection(db, 'dialogs');
const messagesRef = collection(db, 'messages');
const usersRef = collection(db, 'users');


export const dialogAPI = {
  onDialogsChange(userId = '', handler: (res: IDialog[]) => void) {
    const q = query(dialogsRef, where('userIds', 'array-contains', userId));

    return onSnapshot(q, querySnapshot => {
      const dialogsDB: IDBDialog[] = [];
      querySnapshot.forEach(doc => dialogsDB.push(doc.data() as IDBDialog));

      const userIds = dialogsDB.map(dialog => dialog.userIds.find(id => id != userId) || '');

      if (userIds.length > 0) {
        userAPI.getUsersData(userIds).then(users => {

          const dialogs: IDialog[] = dialogsDB.map(dialog => {
            const interlocutorId = dialog.userIds.find(id => id != userId);
            return {
              dialogId: dialog.dialogId,
              unreadMessagesCount: dialog.unreadMessageCounts[userId],
              userData: users.find(user => user.id === interlocutorId) as IDBUser
            };
          });

          handler(dialogs);
        }).catch(console.warn);
      }
      else {
        handler([]);
      }
    });
  },

  createDialogWithMessage(userId = '', interlocutorId = '', text: string) {
    const dialogId = userId + '_vs_' + interlocutorId;
    const dialog: IDBDialog = {
      dialogId,
      lastMessageCreatedAt: Timestamp.now(),
      unreadMessageCounts: {
        [userId]: 0,
        [interlocutorId]: 1
      },
      userIds: [userId, interlocutorId]
    };

    return Promise.all([
      setDoc(doc(dialogsRef, dialogId), dialog),
      messageAPI.createMessage(dialogId, userId, interlocutorId, text)
    ]).then(() => dialogId);
  },

  updateDialogAsNewMessageCreated(dialogId: string, recipientId: string) {
    return updateDoc(doc(dialogsRef, dialogId), {
      lastMessageCreatedAt: Timestamp.now(),
      ['unreadMessageCounts.' + recipientId]: increment(1)
    });
  }
};


export const messageAPI = {
  sendMessage(dialogId: string, senderId: string, recipientId: string, text: string, messageId?: string) {
    return Promise.all([
      messageAPI.createMessage(dialogId, senderId, recipientId, text, messageId).then(() => console.log('message created: ' + text)),
      dialogAPI.updateDialogAsNewMessageCreated(dialogId, recipientId).then(() => console.log('dialog updated for message: ' + text))
    ]).then(() => console.log('message is sent: ' + text));
  },

  createMessage(dialogId: string, senderId: string, recipientId: string, text: string, messageId?: string) {
    messageId = messageId || createId(text);
    const message: IDBMessage = {
      messageId,
      createdAt: Timestamp.now(),
      dialogId,
      recipientId,
      senderId,
      text,
      isUnread: true
    };

    return setDoc(doc(messagesRef, messageId), message).then(() => console.log('message is created:' + text));
  },

  onMessagesChange(dialogId: string, handler: (messages: IMessage[]) => void) {
    const q = query(messagesRef, where('dialogId', '==', dialogId), orderBy('createdAt'), limit(MESSAGES_COUNT_LIMIT));

    return onSnapshot(q, querySnapshot => {
      const messages: IMessage[] = [];

      querySnapshot.forEach(doc => {
        const messageDB = doc.data() as IDBMessage;
        messages.push({ ...messageDB, createdAt: messageDB.createdAt.toDate().toString() } as IMessage);
      });
      console.log('messages changed!');
      handler(messages);
    });
  },

  markMessageAsRead(userId: string, dialogId: string, messageId: string, text?: string) {
    console.log('markMessageAsRead: ', text);
    const dialogPromise = updateDoc(doc(dialogsRef, dialogId), {
      ['unreadMessageCounts.' + userId]: increment(-1)
    });
    const messagePromise = updateDoc(doc(messagesRef, messageId), {
      isUnread: false
    });

    return Promise.all([dialogPromise, messagePromise]).then(() => console.log('The message is read: ', text));
  },

  onMessageIsRead(messageId: string, handler: () => void) {
    const unsubscribe = onSnapshot(doc(messagesRef, messageId), querySnapshot => {
      const message = querySnapshot.data() as IDBMessage;
      if (message.isUnread === false) {
        handler();
        unsubscribe();
      }
    });
    return unsubscribe;
  }

};

export function onMessagesChange(dialogId: string, userId: string, getHandler: (messages: IMessage[]) => void, updateHandler: (messages: IMessage[]) => void) {
  const returningData = {
    unsubscribe: null as null | Unsubscribe,
    messagesPromise: null as null | Promise<any>
  };
  let lastMessageCreatedAt: Timestamp;

  const q1 = query(messagesRef, where('senderId', '==', userId), where('dialogId', '==', dialogId), orderBy('createdAt'), limit(MESSAGES_COUNT_LIMIT));
  const q2 = query(messagesRef, where('recipientId', '==', userId), where('dialogId', '==', dialogId), orderBy('createdAt'), limit(MESSAGES_COUNT_LIMIT));

  const messages: IMessage[] = [];
  const sentMessagesPromise = getDocs(q1).then(querySnapshot => {

    querySnapshot.forEach(doc => {
      const messageDB = doc.data() as IDBMessage;
      messages.push({ ...messageDB, createdAt: messageDB.createdAt.toDate().toString() } as IMessage);
      lastMessageCreatedAt = messageDB.createdAt;
    });
  }).catch(console.dir);

  const receivedMessagesPromise = getDocs(q2).then(querySnapshot => {
    querySnapshot.forEach(doc => {
      const messageDB = doc.data() as IDBMessage;
      messages.push({ ...messageDB, createdAt: messageDB.createdAt.toDate().toString() } as IMessage);
      lastMessageCreatedAt = messageDB.createdAt;
    });
  }).catch(console.dir);

  returningData.messagesPromise = Promise.all([sentMessagesPromise, receivedMessagesPromise]).then(() => {
    messages.sort((message1, message2) => new Date(message1.createdAt) > new Date(message2.createdAt) ? 1 : -1);
    getHandler(messages);
    onNewIncomingMessage();
  });

  return returningData;

  function onNewIncomingMessage() {
    returningData.unsubscribe?.();

    const q = lastMessageCreatedAt ?
      query(messagesRef, where('recipientId', '==', userId), where('dialogId', '==', dialogId), orderBy('createdAt'), startAfter(lastMessageCreatedAt)) :
      query(messagesRef, where('recipientId', '==', userId), where('dialogId', '==', dialogId), orderBy('createdAt'));

    returningData.unsubscribe = onSnapshot(q, querySnapshot => {
      const messages: IMessage[] = [];

      querySnapshot.forEach(doc => {
        const messageDB = doc.data() as IDBMessage;
        messages.push({ ...messageDB, createdAt: messageDB.createdAt.toDate().toString() } as IMessage);
        lastMessageCreatedAt = messageDB.createdAt;
      });

      if (!querySnapshot.empty) {
        updateHandler(messages);
        onNewIncomingMessage();
      }
    });
  }
}


export function allMessagesAreRead(dialogId: string, userId: string) {
  return updateDoc(doc(dialogsRef, dialogId), {
    ['unreadMessageCounts.' + userId]: 0
  });
}

export function markMessageAsRead(userId: string, dialogId: string, messageId: string) {
  const dialogPromise = updateDoc(doc(dialogsRef, dialogId), {
    ['unreadMessageCounts.' + userId]: increment(-1)
  });
  const messagePromise = updateDoc(doc(messagesRef, messageId), {
    isUnread: false
  });

  return Promise.all([dialogPromise, messagePromise]);
}

export const authAPI = {
  signIn(login: string, password: string) {
    return signInWithEmailAndPassword(auth, loginToEmail(login), password);
  },

  signUp(login: string, password: string) {
    const signUpPromise = createUserWithEmailAndPassword(auth, loginToEmail(login), password);
    signUpPromise.then(userCredential => {
      return  userAPI.createUser(userCredential.user.uid, login);
    });
    return signUpPromise;
  },

  logOut() {
    auth.signOut();
  }
};

export const userAPI = {
  createUser(userId: string, login: string) {
    return setDoc(doc(usersRef, userId), {
      id: userId,
      login
    } as IUser);
  },
  updateUserData(userId: string, userData: Partial<IUser>) {
    return updateDoc(doc(usersRef, userId), { ...userData });
  },

  getUserData(userId: string) {
    return getDoc(doc(usersRef, userId))
      .then(snapshot => snapshot.data() as IDBUser);
  },

  onUserDataChange(userId: string, handler: (userData: IDBUser | undefined) => void) {
    return onSnapshot(doc(usersRef, userId), documentSnapshot => {
      handler(documentSnapshot.data() as IDBUser | undefined);
    });
  },

  async getUsersData(userIds: string[]) {
    const q = query(usersRef, where(documentId(), 'in', userIds));
    let snapshots = await getDocs(q);
    let res: IDBUser[] = [];
    snapshots.forEach(doc => res.push(doc.data() as IDBUser));
    return res;
  },

  onAllUsersChange(handler: (users: IUser[]) => void) {
    return onSnapshot(usersRef, (querySnapshot) => {
      const users: IUser[] = [];
      querySnapshot.forEach(doc => users.push(doc.data() as IDBUser));
      handler(users);
    });
  },

  onUnconnectedUsersChange(connectedUserIds: string[], handler: (users: IUser[]) => void) {
    const q = query(usersRef, where(documentId(), 'not-in', connectedUserIds), limit(UNCONNECTED_USERS_COUNT_LIMIT));
    return onSnapshot(q, (querySnapshot) => {
      const users: IUser[] = [];
      querySnapshot.forEach(doc => users.push(doc.data() as IDBUser));
      handler(users);
    });
  },

  getAllUsers() {
    return getDocs(usersRef)
      .then((querySnapshot) => {
        const users: IUser[] = [];
        querySnapshot.forEach(doc => users.push(doc.data() as IDBUser));
        return users;
      });
  },

}


