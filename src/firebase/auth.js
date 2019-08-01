import { auth } from "./firebase";

export const onLogIn = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const onLogOut = () => auth.signOut();

export const onResetPassWord = email => auth.sendPasswordResetEmail(email);

export const onUpdatePassword = password =>
  auth.currentUser.updatePassword(password);

export const currentUserUid = () => auth.currentUser.uid;
