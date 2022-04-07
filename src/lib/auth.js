import auth from '@react-native-firebase/auth';

export function signIn({email, password}) {
  return auth().signInWithEmailAndPassword(email, password);
}

export function signUp({email, password}) {
  return auth().createUserWithEmailAndPassword(email, password);
}

// 앱을 가동할 때 or 로그인 상태가 변경될 때 사용자의 정보를 파라미터로 받아오는 특정 콜백 함수를 등록하는 함수
export function subscribeAuth(callback) {
  return auth().onAuthStateChanged(callback);
}

export function signOut() {
  return auth().signOut();
}
